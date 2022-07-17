import { ethers } from 'ethers'

const giveawayLogger = {
  log: require('debug')('w3b:store:giveaway:'),
  error: require('debug')('w3b:store:giveaway:error:'),
}

export const state = () => ({
  GIVEAWAY_CONTRACT_ADDRESS_LIST: {
    aavegotchi: '0xFa7Cc1F458eBeba7b54E3b867836c15A80BF0B94',
  },
})

export const actions = {
  // const singleTransfer = 'TransferSingle(address,address,address,uint256,uint256)'
  // const batchTranfer =
  //   'TransferBatch(address,address,address,uint256[],uint256[])'

  async enterGiveaway(
    { commit, dispatch, state, rootGetters },
    { project, quantity, raffleType }
  ) {
    try {
      const projectABI = require(`@/components/giveaway/assets/${project}ABI.json`)
      giveawayLogger.log(
        'projectABI ',
        projectABI,
        project,
        quantity,
        raffleType
      )

      const userProvider = new ethers.providers.Web3Provider(window.ethereum)

      const giveawayInstance = new ethers.Contract(
        state.GIVEAWAY_CONTRACT_ADDRESS_LIST[project],
        projectABI,
        userProvider.getSigner()
      )
      giveawayLogger.log('giveawayInstance ', giveawayInstance)

      const enterGiveawayTx = await giveawayInstance.mint(raffleType, quantity)

      return enterGiveawayTx.wait()
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
  getGiveawayContract: (state) => (project) =>
    state.GIVEAWAY_CONTRACT_ADDRESS_LIST[project],
  getActiveChainBlockExplorerURL: (state) =>
    (
      state.networksData.find((item) => item.chainId === state.activeNetwork) ||
      {}
    ).blockExplorerUrls?.[0],
}
