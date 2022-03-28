export const state = () => ({
  networksData: [
    {
      chainId: '0x4',
      name: 'rinkeby',
      apiURL: 'https://api-rinkeby.etherscan.io',
    },
    {
      chainId: '0x38',
      name: 'BSC',
      code: 56,
      apiURL: 'https://api.bscscan.com',
      chainName: 'Binance Smart Chain',
      nativeCurrency: {
        name: 'BNB',
        symbol: 'BNB',
        decimals: 18,
      },
      rpcUrls: [
        'https://bsc-dataseed.binance.org/',
        'https://bsc-dataseed1.defibit.io/',
        'https://bsc-dataseed1.ninicoin.io/',
      ],
      blockExplorerUrls: ['https://bscscan.com'],
      iconUrls: [
        'https://s2.coinmarketcap.com/static/img/coins/200x200/1839.png',
      ],
    },
    {
      chainId: '0xfa',
      name: 'FANTOM',
      code: 250,
      apiURL: 'https://api.ftmscan.com',
      chainName: 'Fantom Opera Mainnet',
      rpcUrls: [
        'https://rpcapi.fantom.network/',
        'https://rpc.fantom.network/',
      ],
      iconUrls: ['https://ftmscan.com/images/logo-ftmscan.svg?v=0.0.2'],
      blockExplorerUrls: ['https://ftmscan.com/'],
      nativeCurrency: {
        name: 'Fantom',
        symbol: 'FTM',
        decimals: 18,
      },
    },
    {
      chainId: '0xa86a',
      name: 'Avalanche',
      code: 43114,
      apiURL: 'https://api.avax.network',
      chainName: 'Avalanche Network',
      rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
      iconUrls: [
        'https://snowtrace.io/images/svg/brands/mainbrand-1.svg?v=23.1.3.0',
      ],
      blockExplorerUrls: ['https://snowtrace.io/'],
      nativeCurrency: {
        name: 'Avalanche',
        symbol: 'AVAX',
        decimals: 18,
      },
    },
    {
      chainId: '0x89',
      name: 'POLYGON',
      code: 137,
      chainName: 'Polygon Mainnet',
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
      code: 137,
      chainName: 'Polygon Mainnet',
      rpcUrls: ['https://rpc-mumbai.matic.today'],
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
  activeNetwork: '0xa86a', // Avalanche
})

export const mutations = {
  setActiveNetwork(state, payload) {
    state.activeNetwork = payload
  },
}
export const getters = {
  getActiveChain: (state) =>
    state.networksData.find((item) => item.chainId === state.activeNetwork),
}
