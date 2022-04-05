import axios from 'axios'

const detailsLog = require('debug')('w3b:store:details')
const detailsError = require('debug')('w3b:store:details:error')

const BASE_URL = (id) => `https://webazaar-meta-api.herokuapp.com/detail/${id}`

export const actions = {
  async getAssetDetails(
    { commit, rootState },
    { asset, contractAddress, contractType }
  ) {
    detailsLog('******* getAssetDetails ***** ')
    detailsLog(asset, contractAddress, contractType)
    try {
      if (contractType?.toLowerCase() === 'erc20') {
        const project = rootState.trader.projects.find(
          (p) => p.contractAddress === contractAddress
        )
        return { ...project, ...asset, contractAddress, contractType }
      } else {
        const response = await axios.get(BASE_URL(asset.id))
        if (response.data.id) {
          return { ...response.data, ...asset, contractAddress, contractType }
        } else {
          return null
        }
      }
    } catch (ex) {
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
