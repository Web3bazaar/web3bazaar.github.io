export const state = () => ({
  networks: [
    {
      chainId: '0xa86a',
      name: 'Avalanche',
      code: 43114,
    },
    {
      chainId: '0x38',
      name: 'BSC',
      code: 56,
    },
    {
      chainId: '0xfa',
      name: 'FANTOM',
      code: 250,
    },
    {
      chainId: '0x89',
      name: 'POLYGON',
      code: 137,
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
    state.networks.find((item) => item.chainId === state.activeNetwork),
}
