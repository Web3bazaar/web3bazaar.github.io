export const state = () => ({
  networksData: [
    // {
    //   chainId: '0x4',
    //   name: 'rinkeby',
    //   apiURL: 'https://api-rinkeby.etherscan.io',
    // },
    // {
    //   chainId: '0x38',
    //   name: 'BSC',
    //   code: '56',
    //   apiURL: 'https://api.bscscan.com',
    //   chainName: 'Binance Smart Chain',
    //   nativeCurrency: {
    //     name: 'BNB',
    //     symbol: 'BNB',
    //     decimals: 18,
    //   },
    //   rpcUrls: [
    //     'https://bsc-dataseed.binance.org/',
    //     'https://bsc-dataseed1.defibit.io/',
    //     'https://bsc-dataseed1.ninicoin.io/',
    //   ],
    //   blockExplorerUrls: ['https://bscscan.com'],
    //   iconUrls: [
    //     'https://s2.coinmarketcap.com/static/img/coins/200x200/1839.png',
    //   ],
    // },
    // {
    //   chainId: '0xfa',
    //   name: 'FANTOM',
    //   code: '250',
    //   apiURL: 'https://api.ftmscan.com',
    //   chainName: 'Fantom',
    //   rpcUrls: [
    //     'https://rpcapi.fantom.network/',
    //     'https://rpc.fantom.network/',
    //   ],
    //   iconUrls: ['https://ftmscan.com/images/logo-ftmscan.svg?v=0.0.2'],
    //   blockExplorerUrls: ['https://ftmscan.com/'],
    //   nativeCurrency: {
    //     name: 'Fantom',
    //     symbol: 'FTM',
    //     decimals: 18,
    //   },
    // },
    // {
    //   chainId: '0xa86a',
    //   name: 'Avalanche',
    //   code: '43114',
    //   apiURL: 'https://api.avax.network',
    //   chainName: 'Avalanche',
    //   rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
    //   iconUrls: [
    //     'https://snowtrace.io/images/svg/brands/mainbrand-1.svg?v=23.1.3.0',
    //   ],
    //   blockExplorerUrls: ['https://snowtrace.io/'],
    //   nativeCurrency: {
    //     name: 'Avalanche',
    //     symbol: 'AVAX',
    //     decimals: 18,
    //   },
    // },
    {
      chainId: '0x89',
      name: 'POLYGON',
      code: '137',
      chainName: 'Polygon',
      rpcUrls: ['https://polygon-rpc.com/'],
      iconUrls: ['https://polygonscan.com/images/logo.svg?v=0.0.3'],
      blockExplorerUrls: ['https://polygonscan.com/'],
      nativeCurrency: {
        name: 'Matic',
        symbol: 'MATIC',
        decimals: 18,
      },
      apiURL: 'https://api.polygonscan.com',
    },
    {
      chainId: '0x13881',
      name: 'mumbai',
      code: '80001',
      chainName: 'Mumbai testnet',
      rpcUrls: [
        'https://rpc-mumbai.matic.today',
        'https://matic-mumbai.chainstacklabs.com',
      ],
      iconUrls: ['https://polygonscan.com/images/logo.svg?v=0.0.3'],
      blockExplorerUrls: ['https://mumbai.polygonscan.com/'],
      nativeCurrency: {
        name: 'Matic',
        symbol: 'MATIC',
        decimals: 18,
      },
      apiURL: 'https://api.polygonscan.com',
    },
  ],
  activeNetwork: '0x13881', // mumbai
})

export const actions = {
  // const singleTransfer = 'TransferSingle(address,address,address,uint256,uint256)'
  // const batchTranfer =
  //   'TransferBatch(address,address,address,uint256[],uint256[])'

  async switchNetwork({ commit, dispatch, state, rootGetters }, { chainId }) {
    try {
      if (chainId === '0x1') {
        alert('Change in Metamask:(')
        return false
      }
      const data = Object.assign(
        {},
        state.networksData.find((item) => item.chainId === chainId)
      )
      delete data.apiURL
      delete data.code
      delete data.name
      delete data.w3bChainWalletAddress
      delete data.tokenAddress
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [data],
      })
      const newChainId = await dispatch(
        'connector/fetchChainId',
        window.ethereum,
        { root: true }
      )
      if (newChainId === chainId) {
        commit('networks/setActiveNetwork', chainId, { root: true })
        return true
      } else {
        throw new Error('Network did not change to ' + chainId)
      }
    } catch (error) {
      // console.log(error)
      // throw new Error(error)
      return error
    }
  },
}

export const mutations = {
  setActiveNetwork(state, payload) {
    state.activeNetwork = payload
  },
}
export const getters = {
  getActiveChain: (state) =>
    state.networksData.find((item) => item.chainId === state.activeNetwork),
  getActiveChainBlockExplorerURL: (state) =>
    (
      state.networksData.find((item) => item.chainId === state.activeNetwork) ||
      {}
    ).blockExplorerUrls?.[0],
}
