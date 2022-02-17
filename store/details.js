import axios from 'axios'

const BASE_URL = (id) => `https://webazaar-meta-api.herokuapp.com/detail/${id}`

export const actions = {
  async getAssetDetails({ commit }, { asset }) {
    try {
      console.log('******* getAssetDetails ***** ')
      console.log(asset)

      const response = await axios.get(BASE_URL(asset.id))
      if (response.data.image) {
        return { ...response.data, ...asset }
      } else {
        return null
      }
    } catch (ex) {
      throw new Error('Not able to retrieve data from heroku api: ', ex)
    }
  },
  getListDetails({ dispatch }, { listIds }) {
    const promises = []

    try {
      listIds.forEach((asset) => {
        promises.push(dispatch('getAssetDetails', { asset }))
      })

      return Promise.all(promises).catch((err) => {
        throw err
      })
    } catch (ex) {
      console.error('Error calling heroku api -> ', ex)
      throw ex
    }
  },
}
