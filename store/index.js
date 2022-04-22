import { ethers } from 'ethers'

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

export const actions = {
  async getTradesInfo({ commit, dispatch, rootGetters }) {
    logger.log('******* getTradesInfo ***** ')
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
            },
            { root: true }
          )
        )
      }

      const resolvedPromises = await Promise.all(promises)

      //  resolvedPromises.map

      for (let i = 0; i < resolvedPromises.length; i++) {
        const e = resolvedPromises[i]

        if (e.tradeStatus === 4) continue

        if (
          e?.creator?.address ===
          ethers.utils.getAddress(rootGetters['connector/account'])
        ) {
          tradesCreator.push({
            tradeStatus: e.tradeStatus,
            tradeId: e.tradeId,
            itemFrom: {
              address: e.creator.address,
              // base_img: await this.getBaseImgUrl(
              //   e.creator.contractAddress,
              //   e.creator.idAsset,
              //   e.creator.traderType
              // ),
              // project_name: this.getProjectName(e.creator.contractAddress),
              itemAmount: e.creator.amount,
              // item_name: this.getItemName(
              //   e.creator.contractAddress,
              //   e.creator.idAsset
              // ),
              // externalUrl: this.getExternalUrl(
              //   e.creator.contractAddress,
              //   e.creator.idAsset
              // ),
              ...(await dispatch('getProjectInfo', {
                contractAddress: e.creator.contractAddress,
                idAsset: e.creator.idAsset,
                contractTypeIndex: e.creator.traderType,
              })),
              ...e.creator,
            },
            itemTo: {
              address: e.executer.address,
              itemAmount: e.executer.amount,
              ...(await dispatch('getProjectInfo', {
                contractAddress: e.executer.contractAddress,
                idAsset: e.executer.idAsset,
                contractTypeIndex: e.executer.traderType,
              })),
              ...e.executer,
            },
          })
        }

        if (
          e?.executer?.address ===
          ethers.utils.getAddress(rootGetters['connector/account'])
        ) {
          tradesExecutor.push({
            tradeStatus: e.tradeStatus,
            tradeId: e.tradeId,
            itemFrom: {
              address: e.creator.address,
              itemAmount: e.creator.amount,
              ...(await dispatch('getProjectInfo', {
                contractAddress: e.creator.contractAddress,
                idAsset: e.creator.idAsset,
                contractTypeIndex: e.creator.traderType,
              })),
              ...e.creator,
            },
            itemTo: {
              address: e.executer.address,
              itemAmount: e.executer.amount,
              ...(await dispatch('getProjectInfo', {
                contractAddress: e.executer.contractAddress,
                idAsset: e.executer.idAsset,
                contractTypeIndex: e.executer.traderType,
              })),
              ...e.executer,
            },
          })
        }
        commit('modals/closeModal')
        commit('tradesCreator', tradesCreator.slice())
        commit('tradesExecutor', tradesExecutor.slice())
      }

      return true
    } catch (ex) {
      logger.error(ex)
      console.error(ex)
      //   throw new Error('Not able to retrieve data from heroku api: ', ex)
    }
  },

  async getProjectInfo(
    { state, dispatch, rootGetters },
    { contractAddress, idAsset, contractTypeIndex }
  ) {
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

    const { projectName, assetExternalLink, projectLink } =
      state.trader.projects.find(
        (p) => p.contractAddress === contractAddress
      ) || {}

    const externalUrl = assetExternalLink + idAsset

    return {
      baseImg: image || tokenImage,
      projectName,
      itemName: name,
      externalUrl,
      projectLink,
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
