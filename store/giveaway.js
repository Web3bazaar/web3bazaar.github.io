import { ethers } from 'ethers'

const BASE_URL = process.env.BASE_URL

const PROXY_ENDPOINT = '/proxy'

const raffleTicketsUrl =
  'https://raw.githubusercontent.com/Web3bazaar/raffle-tickets/main/projects/'

const giveawayLogger = {
  log: require('debug')('w3b:store:giveaway:'),
  error: require('debug')('w3b:store:giveaway:error:'),
}

export const state = () => ({
  currentGiveawaysProjects: [],
})

export const actions = {
  // const singleTransfer = 'TransferSingle(address,address,address,uint256,uint256)'
  // const batchTranfer =
  //   'TransferBatch(address,address,address,uint256[],uint256[])'

  async GET_GIVEAWAYS_DATA({ commit, dispatch, state, rootGetters }) {
    giveawayLogger.log('GET_GIVEAWAYS_DATA')

    commit('clearProjects')

    try {
      const index = 'index.json'

      const { data: indexResult } = await this.$axios.post(
        BASE_URL + PROXY_ENDPOINT,
        {
          url: raffleTicketsUrl + index,
          method: 'get',
        }
      )
      giveawayLogger.log(indexResult)

      for (const projectEndpoint of indexResult) {
        const { data: giveawayResult } = await this.$axios.post(
          BASE_URL + PROXY_ENDPOINT,
          {
            url: raffleTicketsUrl + projectEndpoint,
            method: 'get',
          }
        )
        giveawayLogger.log(giveawayResult)

        if (giveawayResult.giveawayEndDate) {
          const now = new Date()
          const distance = new Date(giveawayResult.giveawayEndDate) - now
          if (distance < 0) {
            giveawayResult.giveawayEnded = true
          }
          commit('addProject', giveawayResult)
        }
      }

      giveawayLogger.log(state.currentGiveawaysProjects)
    } catch (error) {
      // console.log(error)
      // throw new Error(error)
      return error
    }
  },
  getProjectData({ state, rootGetters }, { projectName }) {
    giveawayLogger.log('getProjectData', projectName)
    // const { data: giveawayResult } = await this.$axios.post(
    //   BASE_URL + PROXY_ENDPOINT,
    //   {
    //     url: raffleTicketsUrl + projectName + '/index.json',
    //     method: 'get',
    //   }
    // )
    // giveawayLogger.log('getProjectData', giveawayResult)

    const { chainId } = rootGetters['networks/getActiveChain']
    giveawayLogger.log(
      'activeChain : ',
      chainId,
      state.currentGiveawaysProjects
    )
    return state.currentGiveawaysProjects.find(
      (e) => e.nameId === projectName && e.chainId === chainId
    )
  },

  async getProjectMaxSupply({ state }, { nameId, raffleContractAddress }) {
    giveawayLogger.log('getProjectMaxSupply', nameId, raffleContractAddress)
    const projectABI = require(`@/components/giveaway/abi/${nameId}.json`)

    const userProvider = new ethers.providers.Web3Provider(window.ethereum)
    const contract = new ethers.Contract(
      raffleContractAddress,
      projectABI,
      await userProvider.getSigner()
    )

    const maxSupply = (await contract.MAX_SUPPLY()).toString()
    const totalIssued = (await contract.getId()).toString()
    giveawayLogger.log('maxSupply', maxSupply, 'totalIssued', totalIssued)
    return { maxSupply, totalIssued }
  },
  async enterGiveaway(
    { commit, dispatch, state, rootGetters },
    { projectName, raffleContractAddress, quantity, raffleType }
  ) {
    try {
      const projectABI = require(`@/components/giveaway/abi/${projectName}.json`)
      giveawayLogger.log(
        'projectABI ',
        projectABI,
        projectName,
        quantity,
        raffleType
      )

      const userProvider = new ethers.providers.Web3Provider(window.ethereum)

      const giveawayInstance = new ethers.Contract(
        raffleContractAddress,
        projectABI,
        userProvider.getSigner()
      )
      giveawayLogger.log('giveawayInstance ', giveawayInstance)

      const enterGiveawayTx = await giveawayInstance.mint(raffleType, quantity)

      return enterGiveawayTx
    } catch (error) {
      // console.log(error)
      throw new Error(error)

      // return error
    }
  },
}

export const mutations = {
  addProject(state, payload) {
    state.currentGiveawaysProjects.push(payload)
  },
  clearProjects(state) {
    state.currentGiveawaysProjects = []
  },
}
export const getters = {}
