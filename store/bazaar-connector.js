import { ethers } from 'ethers'
import Web3Utils from 'web3-utils'
import Web3ABI from 'web3-eth-abi'

const bazaarConnectorLog = {
  log: require('debug')('w3b:store:bazaarConnector'),
  error: require('debug')('w3b:store:error:bazaarConnector'),
}

const BAZAAR_CONTRACT_ADDRESS = process.env.BAZAAR_CONTRACT_ADDRESS

const BN = Web3Utils.BN
const EtherUnit = Web3Utils.toWei('1')

const TRADE_TYPE = {
  NON: 0,
  ERC20: 1,
  ERC1155: 2,
  ERC721: 3,
  NATIVE: 4,
}

export const actions = {
  /**
   *
   * contractAddress - web3bazaar contract address
   * creatorAssetContract - creator address
   * creatorAssetId - creator assset ID
   * creatorAmount - amount for creator trader
   * creatorAssetType - creator asset type
   *
   * executorWalletAdd - executer wallet address
   * executorAssetContract -executer wallet address
   * executorAssetId - executer asset id
   * executorAmount - executer amount for erc1155/erc20
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
    const creatorAssetTypeParsed = TRADE_TYPE[creatorAssetType]

    // executorWalletAdd = '0xA7Cc2E2050A607c813437C1c074f82322Cc0C8aE'
    // executorAssetContract = '0xbB18df3ca10583Daa4327161d10F65B1A7c63282'
    // executorAssetId = 100
    // executorAmount = 5
    const executorAssetTypeParsed = TRADE_TYPE[executorAssetType]

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

      const _creatorAmount = new BN(creatorAmount).mul(new BN(EtherUnit))
      const _executorAmount = new BN(executorAmount).mul(new BN(EtherUnit))

      const startTradeTx = await bazaarInstance.startTrade(
        creatorAssetContract, // Web3ABI.encodeParameter('address', creatorAssetContract),
        Web3ABI.encodeParameter('uint256', creatorAssetId),
        Web3ABI.encodeParameter('uint256', _creatorAmount),
        Web3ABI.encodeParameter('uint8', creatorAssetTypeParsed),
        executorWalletAdd, // Web3ABI.encodeParameter('address', executorWalletAdd),
        executorAssetContract, // Web3ABI.encodeParameter('address', executorAssetContract),
        Web3ABI.encodeParameter('uint256', executorAssetId),
        Web3ABI.encodeParameter('uint256', _executorAmount),
        Web3ABI.encodeParameter('uint8', executorAssetTypeParsed),
        {}
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
      const claimBackResult = await webazaarInstance.claimBlack(tradeId, 0, {})
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

    const creatorTradeInfo = await webazaarInstance.getTradeInfoCreator(
      tradeId,
      {}
    )
    const executerTradeInfo = await webazaarInstance.getTradeInfoExecutor(
      tradeId,
      {}
    )

    const tradeInfo = {
      tradeId,
      creator: {
        address: creatorTradeInfo[0],
        contractAddress: creatorTradeInfo[1],
        idAsset: creatorTradeInfo[2].toString(),
        amount: creatorTradeInfo[3].toString(),
        traderStatus: creatorTradeInfo[4],
        traderType: creatorTradeInfo[5],
      },
      executer: {
        address: executerTradeInfo[0],
        contractAddress: executerTradeInfo[1],
        idAsset: executerTradeInfo[2].toString(),
        amount: executerTradeInfo[3].toString(),
        traderStatus: executerTradeInfo[4],
        traderType: executerTradeInfo[5],
      },
      tradeStatus: creatorTradeInfo[6],
    }

    bazaarConnectorLog.log('getTradeInfoCreator :  ', tradeInfo)

    return tradeInfo
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
    bazaarConnectorLog.log('******* getOpenTrades *******')

    const webazaarABI = require('../const/abis/webazaar.json')

    const userProvider = new ethers.providers.Web3Provider(window.ethereum)

    const webazaarInstance = new ethers.Contract(
      BAZAAR_CONTRACT_ADDRESS,
      webazaarABI,
      userProvider.getSigner()
    )

    const openTrades = await webazaarInstance.tradePerUser(walletAddress)
    bazaarConnectorLog.log('Open trades for users ', openTrades)

    return openTrades
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

        return tx
      } else {
        const tx = await contractInstance.setApprovalForAll(
          BAZAAR_CONTRACT_ADDRESS,
          Web3ABI.encodeParameter('bool', approveValue),
          {}
        )
        bazaarConnectorLog.log('is approved for all: ', tx)

        return tx
      }
    } catch (error) {
      bazaarConnectorLog.error('isApproved', error)
      throw error?.data || error
    }
  },
}
