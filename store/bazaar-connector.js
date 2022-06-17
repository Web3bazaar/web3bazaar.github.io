import { ethers } from 'ethers'
// import Web3Utils from 'web3-utils'
import Web3ABI from 'web3-eth-abi'

// const abiCoder = ethers.utils.defaultAbiCoder

const bazaarConnectorLog = {
  log: require('debug')('w3b:store:bazaarConnector'),
  error: require('debug')('w3b:store:error:bazaarConnector'),
}

const BAZAAR_CONTRACT_ADDRESS = process.env.BAZAAR_CONTRACT_ADDRESS

// const BN = Web3Utils.BN
// const EtherUnit = Web3Utils.toWei('1')

export const actions = {
  /**
   *
   * contractAddress - web3bazaar contract address
   * creatorAssetContract - creator address
   * creatorAssetId - creator assset ID
   * creatorAmount - amount for creator trader
   * creatorAssetType - creator asset type
   *
   * executorWalletAdd - executor wallet address
   * executorAssetContract -executor wallet address
   * executorAssetId - executor asset id
   * executorAmount - executor amount for erc1155/erc20
   * executorAssetType - ERC20| ERC721 | ERC1155
   *
   * @param {*} param0
   * @param {*} param1
   * @returns
   */
  async startTrade(
    { commit, rootState },
    {
      creatorAssetContract,
      creatorAssetId,
      creatorAmount,
      creatorAssetType,
      executorWalletAdd,
      executorAssetContract,
      executorAssetId,
      executorAmount,
      executorAssetType,
    }
  ) {
    // samples

    // creatorAssetContract = '0x02390dBA46A107F0728DAA98f920aec171502B22'
    // creatorAssetId = 1
    // creatorAmount = 2
    // creatorAssetType = TRADE_TYPE.ERC721
    // const creatorAssetTypeParsed = TRADE_TYPE[creatorAssetType]

    // executorWalletAdd = '0xA7Cc2E2050A607c813437C1c074f82322Cc0C8aE'
    // executorAssetContract = '0xbB18df3ca10583Daa4327161d10F65B1A7c63282'
    // executorAssetId = 100
    // executorAmount = 5
    // const executorAssetTypeParsed = TRADE_TYPE[executorAssetType]

    const webBazaarABI = require('../const/abis/webazaar.json')
    bazaarConnectorLog.log('webazaar abi : ', webBazaarABI)

    try {
      const userProvider = new ethers.providers.Web3Provider(window.ethereum)
      // const gasPrice = await estimate(userProvider);

      const bazaarInstance = new ethers.Contract(
        BAZAAR_CONTRACT_ADDRESS,
        webBazaarABI,
        userProvider.getSigner()
      )

      // ethers.utils.parseUnits(creatorAmount.toString(), 18)
      // ethers.utils.parseUnits(executorAmount.toString(), 18)~

      const startTradeTx = await bazaarInstance.startTrade(
        creatorAssetContract, // abiCoder.encode(['address[]'], [creatorAssetContract]), //  creator assets Array
        creatorAssetId, // abiCoder.encode(['uint256[]'], [creatorAssetId]), // Array
        creatorAmount, // abiCoder.encode(['uint256[]'], [creatorAmount]), // Amounts Array
        creatorAssetType, // abiCoder.encode(['uint8[]'], [creatorAssetType]),
        executorWalletAdd, // Web3ABI.encodeParameter('address', executorWalletAdd),
        executorAssetContract, // abiCoder.encode(['address[]'], [executorAssetContract]), // Web3ABI.encodeParameter('address', executorAssetContract),
        executorAssetId, // abiCoder.encode(['uint256[]'], [executorAssetId]),
        executorAmount, //   abiCoder.encode(['uint256[]'], [executorAmount]),
        executorAssetType //  abiCoder.encode(['uint8[]'], [executorAssetType])
      )
      // await startTradeTx.wait()

      bazaarConnectorLog.log(
        'result from start Trade ',
        startTradeTx
        // Web3ABI.decodeParameter('bool', startTradeTx.data)
      )

      return startTradeTx // Web3ABI.decodeParameter('bool', startTradeTx.data)
    } catch (error) {
      console.error(error)
      bazaarConnectorLog.error(error)
      throw error
    }
  },

  async claimBack({ commit }, { tradeId }) {
    bazaarConnectorLog.log('******* Claim Back *******')

    const webazaarABI = require('../const/abis/webazaar.json')

    const userProvider = new ethers.providers.Web3Provider(window.ethereum)

    // const gasPrice = await estimate(userProvider);

    const webazaarInstance = new ethers.Contract(
      BAZAAR_CONTRACT_ADDRESS,
      webazaarABI,
      userProvider.getSigner()
    )

    try {
      const claimBackResult = await webazaarInstance.cancelTrade(tradeId)
      return claimBackResult
    } catch (err) {
      bazaarConnectorLog.error(err)
      throw err
    }
  },

  async claim({ commit }, { tradeId }) {
    bazaarConnectorLog.log('******* Claim *******', tradeId)

    const webazaarABI = require('../const/abis/webazaar.json')

    const userProvider = new ethers.providers.Web3Provider(window.ethereum)

    const webazaarInstance = new ethers.Contract(
      BAZAAR_CONTRACT_ADDRESS,
      webazaarABI,
      userProvider.getSigner()
    )
    try {
      const claimResult = await webazaarInstance.claim(tradeId, 0, {})
      return claimResult
    } catch (err) {
      bazaarConnectorLog.error(err)
      throw err
    }
  },

  async getTradeInfo({ commit }, { walletAddress, tradeId }) {
    const webazaarABI = require('../const/abis/webazaar.json')

    const userProvider = new ethers.providers.Web3Provider(window.ethereum)

    const webazaarInstance = new ethers.Contract(
      BAZAAR_CONTRACT_ADDRESS,
      webazaarABI,
      userProvider.getSigner()
    )
    const [creatorWalletAddress, executorWalletAddress, tradeStatus] =
      await webazaarInstance['getTrade(uint256)'](tradeId)

    if (tradeStatus !== 1) {
      return { tradeStatus, tradeId }
    }

    const [
      creatorTokenAddress,
      creatorTokenIds,
      creatorTokenAmount,
      creatorTokenType,
    ] = await webazaarInstance['getTrade(uint256,address)'](
      tradeId,
      creatorWalletAddress
    )

    const [
      executorTokenAddress,
      executorTokenIds,
      executorTokenAmount,
      executorTokenType,
    ] = await webazaarInstance['getTrade(uint256,address)'](
      tradeId,
      executorWalletAddress
    )

    bazaarConnectorLog.log(
      '******* creatorTradeInfo *******',
      creatorTokenAddress,
      creatorTokenIds,
      creatorTokenAmount,
      creatorTokenType,
      executorTokenAddress,
      executorTokenIds,
      executorTokenAmount,
      executorTokenType
    )

    return {
      creatorWalletAddress,
      creatorTokenAddress,
      creatorTokenIds,
      creatorTokenAmount,
      creatorTokenType,
      executorWalletAddress,
      executorTokenAddress,
      executorTokenIds,
      executorTokenAmount,
      executorTokenType,
      tradeStatus,
      tradeId,
    }
  },
  async executeTrade({ commit }, { walletAddress, tradeId, contractType }) {
    bazaarConnectorLog.log('******* executeTrade *******')

    const webazaarABI = require('../const/abis/webazaar.json')

    const userProvider = new ethers.providers.Web3Provider(window.ethereum)

    const webazaarInstance = new ethers.Contract(
      BAZAAR_CONTRACT_ADDRESS,
      webazaarABI,
      userProvider.getSigner()
    )
    try {
      const executeTrade = await webazaarInstance.executeTrade(tradeId)

      bazaarConnectorLog.log('Open trades for users ', executeTrade)
      return executeTrade
    } catch (err) {
      bazaarConnectorLog.error(err)
      throw err
    }
  },
  async getOpenTrades({ commit }, { walletAddress }) {
    bazaarConnectorLog.log('******* getOpenTrades *******', walletAddress)

    const webazaarABI = require('../const/abis/webazaar.json')
    bazaarConnectorLog.log('webazaarABI')

    const userProvider = new ethers.providers.Web3Provider(window.ethereum)
    bazaarConnectorLog.log('userProvider')

    const webazaarInstance = new ethers.Contract(
      BAZAAR_CONTRACT_ADDRESS,
      webazaarABI,
      userProvider.getSigner()
    )
    bazaarConnectorLog.log('webazaarInstance')

    const openTrades = await webazaarInstance.tradePerUser(walletAddress)
    bazaarConnectorLog.log('Open trades for users ', openTrades)

    return openTrades
  },

  async checkIsApprovedArray({ commit, dispatch }, { assets, walletAddress }) {
    bazaarConnectorLog.log('******* checkIsApprovedArray *******', assets)
    try {
      const contractAddressArray = []
      const contractTypeArray = []
      for (const asset in assets) {
        if (Object.hasOwnProperty.call(assets, asset)) {
          const { contractAddress, contractType } = assets[asset]

          const isApproved = await dispatch(
            'bazaar-connector/isApproved',
            {
              contractAddress,
              contractType,
              walletAddress,
            },
            { root: true }
          )

          if (!isApproved) {
            contractAddressArray.push(contractAddress)
            contractTypeArray.push(contractType)
          }
        }
      }

      return { contractAddressArray, contractTypeArray }
    } catch (error) {
      bazaarConnectorLog.error('checkIsApprovedArray', error)
      throw error?.data || error
    }
  },

  async isApproved(
    { commit },
    { contractAddress, contractType, walletAddress }
  ) {
    bazaarConnectorLog.log(
      '******* isApproved *******',
      contractAddress,
      contractType,
      walletAddress
    )
    try {
      const webazaarABI = require(`../const/abis/${contractType?.toLowerCase?.()}.json`)

      const userProvider = new ethers.providers.Web3Provider(window.ethereum)

      const webazaarInstance = new ethers.Contract(
        contractAddress,
        webazaarABI,
        userProvider.getSigner()
      )
      if (contractType.toLowerCase() === 'erc20') {
        const allowance = await webazaarInstance.allowance(
          walletAddress,
          BAZAAR_CONTRACT_ADDRESS
        )
        bazaarConnectorLog.log('is approved for all: ', allowance.toString())

        return allowance.toString() > 0
      } else {
        const isApproved = await webazaarInstance.isApprovedForAll(
          walletAddress,
          BAZAAR_CONTRACT_ADDRESS
        )
        bazaarConnectorLog.log('is approved for all: ', isApproved)

        return isApproved
      }
    } catch (error) {
      bazaarConnectorLog.error('isApproved', error)
      throw error?.data || error
    }
  },
  async setApprovalArray(
    { commit, dispatch },
    {
      contractAddressArray,
      contractTypeArray,
      walletAddress,
      approveValue = true,
    }
  ) {
    bazaarConnectorLog.log(
      '******* setApprovalArray *******',
      contractAddressArray,
      contractTypeArray,
      walletAddress,
      approveValue
    )
    try {
      const promises = []

      for (let i = 0; i < contractAddressArray.length; i++) {
        promises.push(
          dispatch(
            'bazaar-connector/setApproval',
            {
              contractAddress: contractAddressArray[i],
              contractType: contractTypeArray[i],
              walletAddress,
            },
            { root: true }
          )
        )
      }

      const resolvedPromises = await Promise.all(promises)
      bazaarConnectorLog.log(resolvedPromises)
      return resolvedPromises
    } catch (error) {
      bazaarConnectorLog.error('isApproved', error)
      throw error?.data || error
    }
  },
  async setApproval(
    { commit },
    { contractAddress, contractType, walletAddress, approveValue = true }
  ) {
    bazaarConnectorLog.log(
      '******* setApproval *******',
      contractAddress,
      contractType,
      walletAddress,
      approveValue
    )
    try {
      const webazaarABI = require(`../const/abis/${contractType?.toLowerCase?.()}.json`)

      const userProvider = new ethers.providers.Web3Provider(window.ethereum)

      const contractInstance = new ethers.Contract(
        contractAddress,
        webazaarABI,
        userProvider.getSigner()
      )

      if (contractType.toLowerCase() === 'erc20') {
        const approveAmount = ethers.utils.parseUnits('100000')

        const tx = await contractInstance.approve(
          BAZAAR_CONTRACT_ADDRESS,
          approveAmount
        )

        return await tx.wait()
      } else {
        const tx = await contractInstance.setApprovalForAll(
          BAZAAR_CONTRACT_ADDRESS,
          Web3ABI.encodeParameter('bool', approveValue),
          {}
        )
        bazaarConnectorLog.log('is approved for all: ', tx)
        commit(
          'modals/setPopupState',
          {
            type: 'loading',
            isShow: true,
            data: {
              state: 'mining',
            },
          },
          { root: true }
        )
        return await tx.wait()
      }
    } catch (error) {
      bazaarConnectorLog.error('isApproved', error)
      if (error?.code === 4001) throw new Error('REJECTED')

      throw error?.data || error
    }
  },
}
