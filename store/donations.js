const donationsLogger = {
  log: require('debug')('w3b:store:donations'),
  error: require('debug')('w3b:store:error:donations'),
}

export const state = () => ({
  baseValue: {
    '0x13881': 1000,
    '0x38': 5,
  },
})

export const mutations = {}

export const actions = {
  // const singleTransfer = 'TransferSingle(address,address,address,uint256,uint256)'
  // const batchTranfer =
  //   'TransferBatch(address,address,address,uint256[],uint256[])'

  donateAmount({ commit, dispatch, state, rootGetters }, { amount }) {
    donationsLogger.log(amount)
  },
}

export const getters = {
  getBaseValue: (state) => (chainId) => state.baseValue[chainId],
}
