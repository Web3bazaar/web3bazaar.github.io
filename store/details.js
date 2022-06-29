import axios from 'axios'

const detailsLog = require('debug')('w3b:store:details')
const detailsError = require('debug')('w3b:store:details:error')

// const BASE_URL_721 = (id) => `https://webazaar-meta-api.herokuapp.com/detail/${id}`
// const BASE_URL_1155 = (id) => `https://webazaar-meta-api.herokuapp.com/detail/${id}`

const BASE_URL = process.env.BASE_URL

const PROXY_ENDPOINT = '/proxy'

export const actions = {
  async getAssetMetadata(
    _,
    { apiMetadata, tokenId, project: { defaultImage } }
  ) {
    try {
      const response = await axios.post(BASE_URL + PROXY_ENDPOINT, {
        url: apiMetadata?.replace?.('{id}', tokenId),
        method: 'get',
      })
      if (response.data) {
        return { ...response.data }
      } else {
        return {}
      } //     )
    } catch (e) {
      console.log(e)
      return { ...JSON.parse(e.metadata || '{}'), image: defaultImage }
    }
    // if (e.contract_type === 'ERC721') {
    //   return (
    //     await axios.get(
    //       metadataURL + tokenId
    //     )
    //   ).data
    // } else if (e.contract_type === 'ERC1155') {
    //   return (
    //     await axios.get(
    //       'https://webazaar-meta-api.herokuapp.com/1155/detail/' + e.token_id
    //     )
    //   ).data
    // } else {
    // return JSON.parse(e.metadata || '{}')
    // }
  },
  async getAssetDetails(
    { commit, rootState },
    { asset, contractAddress, contractType, tokenId }
  ) {
    detailsLog('******* getAssetDetails ***** ')
    detailsLog(asset, contractAddress, contractType)
    try {
      const project = rootState.trader.projects.find(
        (p) => p.contractAddress === contractAddress
      )
      detailsLog('project found:', project, rootState.trader.projects)

      if (!project) return {}

      if (contractType?.toLowerCase() === 'erc20') {
        return { ...project, ...asset, contractAddress, contractType }
      } else {
        detailsLog(project.apiMetadata)

        const response = await axios.post(BASE_URL + PROXY_ENDPOINT, {
          url: project.apiMetadata?.replace?.('{id}', tokenId),
          method: 'get',
        })
        if (response.data) {
          return { ...response.data, ...asset, contractAddress, contractType }
        } else {
          return {}
        }
      }
    } catch (ex) {
      detailsError(ex)
      throw new Error('Not able to retrieve data from heroku api: ', ex)
    }
  },
}
