import { ethers } from 'ethers'

const MUMBAI_API_KEY = '2XSDG5S2EBJ8SDMXU9YJ7B7N75I6V8HPGW'

const BAZAAR_CONTRACT_ADDRESS = process.env.BAZAAR_CONTRACT_ADDRESS

const BASE_URL = 'https://api-testnet.polygonscan.com/api'

const polygonscanUrlGenerator = (fromBlock) => `${BASE_URL}
?module=logs&action=getLogs
&fromBlock=${fromBlock}
&toBlock=latest
&address=${BAZAAR_CONTRACT_ADDRESS}
&apikey=${MUMBAI_API_KEY}`

const getLatestBlockUrl = (timestamp) => `${BASE_URL}
?module=block
&action=getblocknobytime
&timestamp=${timestamp}
&closest=before
&apikey=${MUMBAI_API_KEY}`

const contractTypes = ['', 'ERC20', 'ERC1155', 'ERC721', 'NATIVE']

const logger = {
  log: require('debug')('w3b:store:'),
  error: require('debug')('w3b:store:error:'),
}

export const state = () => ({
  hasTradesPendingCreator: false,
  hasTradesPendingExecutor: false,
  tradesCreator: [],
  tradesExecutor: [],
})

function getLast3DaysDate() {
  const now = new Date()

  return Math.round(
    new Date(now.getFullYear(), now.getMonth(), now.getDate() - 3).getTime() /
      1000
  )
}

export const actions = {
  async getLastedBlockInfo({ commit, dispatch, rootGetters }) {
    const timestamp = getLast3DaysDate()

    const { result: latestBlock } = (
      await this.$axios.get(getLatestBlockUrl(timestamp))
    ).data

    const { result: eventLogs } = (
      await this.$axios.get(polygonscanUrlGenerator(latestBlock))
    ).data

    return eventLogs
  },
  async getTradesInfo({ commit, dispatch, rootGetters }) {
    logger.log('******* getTradesInfo ***** ')

    const eventLogsList = await dispatch('getLastedBlockInfo')

    try {
      commit(
        'modals/setPopupState',
        {
          type: 'loading',
          isShow: true,
          data: {
            state: 'loading',
            reading: true,
          },
        },
        { root: true }
      )

      const tradesCreator = []
      const tradesExecutor = []

      const tradesIdsList = await dispatch(
        'bazaar-connector/getOpenTrades',
        {
          walletAddress: rootGetters['connector/account'],
        },
        { root: true }
      )
      logger.log('tradesIdsList', tradesIdsList)

      const promises = []

      for (let i = 0; i < tradesIdsList.length; i++) {
        const e = tradesIdsList[i]
        promises.push(
          dispatch(
            'bazaar-connector/getTradeInfo',
            {
              walletAddress: rootGetters['connector/account'],
              tradeId: e._hex,
              eventLogsList,
            },
            { root: true }
          )
        )
      }

      const resolvedPromises = await Promise.all(promises)
      logger.log('resolvedPromises', resolvedPromises)

      //  resolvedPromises.map

      for (let i = 0; i < resolvedPromises.length; i++) {
        const e = resolvedPromises[i]
        logger.log('Trade:  ', e)
        if (!e) continue

        // if (e.tradeStatus !== 1 && !found) continue

        if (
          e?.creatorWalletAddress ===
          ethers.utils.getAddress(rootGetters['connector/account'])
        ) {
          tradesCreator.push({
            tradeStatus: e.tradeStatus,
            tradeId: e.tradeId,
            creator: {
              address: e.creatorWalletAddress,
              assetsByProject: await dispatch('groupAssetsByProject', {
                tokenAddress: e.creatorTokenAddress,
                tokenIds: e.creatorTokenIds,
                tokenAmount: e.creatorTokenAmount,
                tokenType: e.creatorTokenType,
              }),
              ...e.creator,
            },
            executor: {
              address: e.executorWalletAddress,
              assetsByProject: await dispatch('groupAssetsByProject', {
                tokenAddress: e.executorTokenAddress,
                tokenIds: e.executorTokenIds,
                tokenAmount: e.executorTokenAmount,
                tokenType: e.executorTokenType,
              }),
            },
          })
        } else if (
          e?.executorWalletAddress ===
          ethers.utils.getAddress(rootGetters['connector/account'])
        ) {
          tradesExecutor.push({
            tradeStatus: e.tradeStatus,
            tradeId: e.tradeId,
            creator: {
              address: e.creatorWalletAddress,
              assetsByProject: await dispatch('groupAssetsByProject', {
                tokenAddress: e.creatorTokenAddress,
                tokenIds: e.creatorTokenIds,
                tokenAmount: e.creatorTokenAmount,
                tokenType: e.creatorTokenType,
              }),
              ...e.creator,
            },
            executor: {
              address: e.executorWalletAddress,
              assetsByProject: await dispatch('groupAssetsByProject', {
                tokenAddress: e.executorTokenAddress,
                tokenIds: e.executorTokenIds,
                tokenAmount: e.executorTokenAmount,
                tokenType: e.executorTokenType,
              }),
            },
          })
        }
      }
      commit('tradesCreator', tradesCreator.slice())
      commit('tradesExecutor', tradesExecutor.slice())
      commit('modals/closeModal')

      return true
    } catch (ex) {
      logger.error(ex)
      console.error(ex)
      //   throw new Error('Not able to retrieve data from heroku api: ', ex)
    }
  },
  groupAssetsByProject(
    { state, dispatch, rootGetters },
    { tokenAddress, tokenIds, tokenAmount, tokenType }
  ) {
    const projects = {}

    const totalAssetsLength = tokenAddress.length

    for (let i = 0; i < totalAssetsLength; i++) {
      const contractAddress = tokenAddress[i]

      const newObj = {
        idAsset: tokenIds[i].toString(),
        contractAddress: tokenAddress[i],
        contractType: contractTypes[tokenType[i]],
        contractTypeIndex: tokenType[i],
        amount: tokenAmount[i].toString(),
      }

      const {
        projectName,
        assetExternalLink,
        projectLink,
        background_image: backgroundImage,
      } = state.trader.projects.find(
        (p) => p.contractAddress === contractAddress
      ) || {}

      if (contractAddress in projects) {
        projects[contractAddress].assets.push(newObj)
      } else {
        projects[contractAddress] = {}
        projects[contractAddress].contractAddress = contractAddress
        projects[contractAddress].projectName = projectName
        projects[contractAddress].assetExternalLink = assetExternalLink
        projects[contractAddress].projectLink = projectLink
        projects[contractAddress].backgroundImage = backgroundImage
        projects[contractAddress].contractType = contractTypes[tokenType[i]]
        projects[contractAddress].contractTypeIndex = tokenType[i]

        projects[contractAddress].assets = []
        projects[contractAddress].assets.push(newObj)
      }
    }
    logger.log('projects', projects)

    return projects
  },
  async getProjectInfo(
    { state, dispatch, rootGetters },
    { contractAddress, idAsset, contractTypeIndex }
  ) {
    logger.log('getProjectInfo idAsset', idAsset)

    const { image, tokenImage, name } = await dispatch(
      'details/getAssetDetails',
      {
        walletAddress: rootGetters['connector/account'],
        asset: {
          id: idAsset,
        },
        contractAddress,
        contractType: contractTypes[contractTypeIndex],
      },
      { root: true }
    )

    const {
      projectName,
      assetExternalLink,
      projectLink,
      background_image: backgroundImage,
      blockExplorerUrl,
    } = state.trader.projects.find(
      (p) => p.contractAddress === contractAddress
    ) || {}

    const externalUrl =
      contractTypeIndex === 1 ? blockExplorerUrl : assetExternalLink + idAsset

    return {
      baseImg: image || tokenImage,
      projectName,
      itemName: name,
      externalUrl,
      projectLink,
      backgroundImage,
      contractType: contractTypes[contractTypeIndex],
    }
  },
}

export const mutations = {
  tradesCreator(state, value) {
    state.tradesCreator = value
  },
  tradesExecutor(state, value) {
    state.tradesExecutor = value
  },
}

export const getters = {
  hasTradesPendingCreator: (state) => state.tradesCreator.length > 0,
  hasTradesPendingExecutor: (state) => state.tradesExecutor.length > 0,
}
