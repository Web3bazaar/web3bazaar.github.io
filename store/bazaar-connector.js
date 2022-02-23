import { ethers } from 'ethers'
import Web3Utils from 'web3-utils'
import Web3ABI from 'web3-eth-abi'

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
      wa,
      contractAddress,
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
    contractAddress = '0xbB18df3ca10583Daa4327161d10F65B1A7c63282'

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

    const webazaarABI = require('../const/abis/webazaar.json')
    console.log('webazaar abi : ', webazaarABI)

    const userProvider = new ethers.providers.Web3Provider(window.ethereum)
    // const gasPrice = await estimate(userProvider);

    const bazaarInstance = new ethers.Contract(
      contractAddress,
      webazaarABI,
      userProvider.getSigner()
    )

    const _creatorAmount = new BN(creatorAmount).mul(new BN(EtherUnit))
    const _executorAmount = new BN(executorAmount).mul(new BN(EtherUnit))

    const approveReturn = await bazaarInstance.startTrade(
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

    console.log(
      'result from start Trade ',
      Web3ABI.decodeParameter('bool', approveReturn.data)
    )

    return approveReturn
  },

  async claimBack({ commit }, { wa, contractAddress }) {
    console.log('******* Claim Back *******')

    // webazaar contract address
    contractAddress = '0xbB18df3ca10583Daa4327161d10F65B1A7c63282'
    // tradeID
    const tradeId = 2

    const webazaarABI = require('../const/abis/webazaar.json')
    console.log('webazaarABI :  ', webazaarABI)

    const userProvider = new ethers.providers.Web3Provider(window.ethereum)

    // const gasPrice = await estimate(userProvider);

    const webazaarInstance = new ethers.Contract(
      contractAddress,
      webazaarABI,
      userProvider.getSigner()
    )

    const claimBackResult = await webazaarInstance.claimBlack(tradeId, 0, {})

    return claimBackResult
  },

  async claim({ commit }, { wa, contractAddress }) {
    console.log('******* Claim Back *******')

    // webazaar contract address
    contractAddress = '0xbB18df3ca10583Daa4327161d10F65B1A7c63282'
    // tradeID
    const tradeId = 2

    const webazaarABI = require('../const/abis/webazaar.json')
    console.log('webazaarABI :  ', webazaarABI)

    const userProvider = new ethers.providers.Web3Provider(window.ethereum)

    // const gasPrice = await estimate(userProvider);

    const webazaarInstance = new ethers.Contract(
      contractAddress,
      webazaarABI,
      userProvider.getSigner()
    )

    const claimResult = await webazaarInstance.claim(tradeId, 0, {})

    return claimResult
  },

  async getTradeInfo({ commit }, { wa, contractAddress, tradeId }) {
    // webazaar contract address
    contractAddress = '0xbB18df3ca10583Daa4327161d10F65B1A7c63282'
    // tradeID
    tradeId = 2

    const webazaarABI = require('../const/abis/webazaar.json')
    console.log('webazaarABI :  ', webazaarABI)

    const userProvider = new ethers.providers.Web3Provider(window.ethereum)

    // const gasPrice = await estimate(userProvider);

    const webazaarInstance = new ethers.Contract(
      contractAddress,
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

    console.log('getTradeInfoCreator :  ', tradeInfo)

    return tradeInfo
  },

  async getOpenTrades({ commit }, { wa }) {
    console.log('******* getOpenTrades *******')

    // webazaar contract address
    const contractAddress = '0xbB18df3ca10583Daa4327161d10F65B1A7c63282'
    // tradeID
    // const tradeId = 2

    const webazaarABI = require('../const/abis/webazaar.json')
    console.log('webazaarABI :  ', webazaarABI)

    const userProvider = new ethers.providers.Web3Provider(window.ethereum)

    // const gasPrice = await estimate(userProvider);

    const webazaarInstance = new ethers.Contract(
      contractAddress,
      webazaarABI,
      userProvider.getSigner()
    )

    const openTrades = await webazaarInstance.tradePerUser(wa, 0, {})
    console.log('Open trades for users ', openTrades)

    return openTrades
  },
}
