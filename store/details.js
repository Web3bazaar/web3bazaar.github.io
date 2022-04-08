import axios from 'axios'

const detailsLog = require('debug')('w3b:store:details')
const detailsError = require('debug')('w3b:store:details:error')

// const BASE_URL_721 = (id) => `https://webazaar-meta-api.herokuapp.com/detail/${id}`
// const BASE_URL_1155 = (id) => `https://webazaar-meta-api.herokuapp.com/detail/${id}`

export const actions = {
  async getAssetDetails(
    { commit, rootState },
    { asset, contractAddress, contractType }
  ) {
    detailsLog('******* getAssetDetails ***** ')
    detailsLog(asset, contractAddress, contractType)
    try {
      const project = rootState.trader.projects.find(
        (p) => p.contractAddress === contractAddress
      )

      if (!project) return {}

      if (contractType?.toLowerCase() === 'erc20') {
        return { ...project, ...asset, contractAddress, contractType }
      } else {
        detailsLog(project.api_metadata)

        const response = await axios.get(
          project.api_metadata?.replace?.('{id}', asset.id)
        )
        if (response.data.id) {
          return { ...response.data, ...asset, contractAddress, contractType }
        } else {
          return {}
        }
      }
    } catch (ex) {
      console.error(ex)
      throw new Error('Not able to retrieve data from heroku api: ', ex)
    }
  },
  getListDetails({ dispatch }, { listIds, contractAddress, contractType }) {
    detailsLog('******* getListDetails ***** ')
    detailsLog(listIds, contractType)
    const promises = []
    try {
      listIds.forEach((asset) => {
        promises.push(
          dispatch('getAssetDetails', { asset, contractAddress, contractType })
        )
      })

      return Promise.all(promises).catch((err) => {
        throw err
      })
    } catch (ex) {
      detailsError('Error calling heroku api -> ', ex)
      throw ex
    }
  },
}
