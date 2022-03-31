import { ethers } from 'ethers'

const donationsLogger = {
  log: require('debug')('w3b:store:donations'),
  error: require('debug')('w3b:store:error:donations'),
}

export const state = () => ({
  baseValue: {
    '0x13881': {
      amount: 1000,
      tokenAddress: '0x0000000000000000000000000000000000001010',
      w3bChainWalletAddress: '0xE68A8D60bAD90B5142901b89eCEbE248de42d5a1',
    },
    '0x38': {
      amount: 5,
      tokenAddress: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    },
    '0x89': {
      amount: 1000,
      tokenAddress: '0x0000000000000000000000000000000000001010',
      w3bChainWalletAddress: '0xE68A8D60bAD90B5142901b89eCEbE248de42d5a1',
    },
  },
})

export const mutations = {}

export const actions = {
  // const singleTransfer = 'TransferSingle(address,address,address,uint256,uint256)'
  // const batchTranfer =
  //   'TransferBatch(address,address,address,uint256[],uint256[])'

  async donateAmount({ commit, dispatch, state, rootGetters }, { amount }) {
    try {
      donationsLogger.log(amount)

      const amountFormatted = ethers.utils.formatUnits(
        ethers.utils.parseUnits(amount + ''),
        0
      )
      donationsLogger.log('amountFormated', amountFormatted)

      // get w3b address based on active chain
      const {
        w3bChainWalletAddress,
        tokenAddress: nativeTokenContractAddress,
      } = state[rootGetters['networks/getActiveChain']?.chainId]
      donationsLogger.log('w3bWalletAddress', w3bChainWalletAddress)
      donationsLogger.log(
        'nativeTokenContractAddress',
        nativeTokenContractAddress
      )

      const genericErc20Abi = require(`../const/abis/erc20.json`)

      const userProvider = new ethers.providers.Web3Provider(window.ethereum)
      const erc20Contract = new ethers.Contract(
        nativeTokenContractAddress,
        genericErc20Abi,
        userProvider.getSigner()
      )

      const tx = await erc20Contract.transfer(
        w3bChainWalletAddress,
        amountFormatted
      )
      // {
      //   chainId: 1337,
      //   confirmations: 0,
      //   data: '0xa9059cbb0000000000000000000000005555763613a12d8f3e73be831dff8598089d3dca0000000000000000000000000000000000000000000000001111d67bb1bb0000',
      //   from: '0x77C44C0D1D37050e9250415Ee96401B5ac270856',
      //   gasLimit: { BigNumber: "51558" },
      //   gasPrice: { BigNumber: "1" },
      //   hash: '0x363cd9c6eb0671a84963a043ab5ec9b639b256811cc5c26039ff43e4cdc1edec',
      //   nonce: 2,
      //   r: '0x5eb78cca0a8660df59715292eebdf58cfc9cfad0a5640715d153bce9ee69aed1',
      //   s: '0x3f0cede8bd2f61111e6dfcd5840e648686c20ee28211ce2059d040d2fa7b5355',
      //   to: '0x759713d039e21Da4F3DC2313D75e769f6E66D4e4',
      //   type: null,
      //   v: 2709,
      //   value: { BigNumber: "0" },
      //   wait: [Function]
      // }
      donationsLogger.log('tx before wait', tx)

      // Wait for the transaction to be mined...
      await tx.wait()
      donationsLogger.log('tx after wait', tx)
      return tx
    } catch (error) {
      donationsLogger.error('tx error', error)
    }
  },
}

export const getters = {
  getBaseValue: (state) => (chainId) => state.baseValue[chainId]?.amount,
  getW3BDonationAddress: (state) => (chainId) =>
    state.baseValue[chainId]?.w3bChainWalletAddress,
}
