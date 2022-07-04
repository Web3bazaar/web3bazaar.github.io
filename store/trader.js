import axios from 'axios'

import { ethers } from 'ethers'

const traderLogger = {
  log: require('debug')('w3b:store:trader'),
  error: require('debug')('w3b:store:error:trader'),
}

const BASE_URL = 'https://nft-ownership-backend.herokuapp.com/api/v1'
const GET_PROJECT_DATA_ENDPOINT = '/projects'
const GET_USER_NFT_DATA_ENDPOINT = '/chainquery'

const getNFTList = async function (params, self) {
  try {
    traderLogger.log('******* getNFTList ***** ', params)

    const response = await axios.post(
      BASE_URL + GET_USER_NFT_DATA_ENDPOINT,
      params
    )
    traderLogger.log('******* response ***** ', response)

    return response.data.data
  } catch (ex) {
    throw new Error('Not able to retrieve data form event log : ', ex)
  }
}

// const getAssetMetadata = async function (
//   e,
//   metadataURL,
//   tokenId,
//   { defaultImage },
//   self
// ) {
//   try {
//     return (await self.$axios.get(metadataURL.replace('{id}', tokenId))).data
//     //     )
//   } catch (e) {
//     console.log(e)
//     return { ...JSON.parse(e.metadata || '{}'), image: defaultImage }
//   }
//   // if (e.contract_type === 'ERC721') {
//   //   return (
//   //     await axios.get(
//   //       metadataURL + tokenId
//   //     )
//   //   ).data
//   // } else if (e.contract_type === 'ERC1155') {
//   //   return (
//   //     await axios.get(
//   //       'https://webazaar-meta-api.herokuapp.com/1155/detail/' + e.token_id
//   //     )
//   //   ).data
//   // } else {
//   // return JSON.parse(e.metadata || '{}')
//   // }
// }

export const state = () => ({
  creatorSelectedAssets: [],
  executorSelectedAssets: [],
  executorAddress: '',
  projects: [
    {
      assetName: 'Bazaar ERC721 Collection',
      description: 'Test contract for weebazaar ERC721',
      backgroundBanner: require('@/assets/img/banners/Twitter 3.jpg'),
      contractAddress: '0x8ba96897cA8A95B39C639BEa1e5E9ce60d22BD2B',
      baseUrl: 'https://api-testnet.polygonscan.com/',
      chainId: '0x13881',
      contractType: 'ERC721',
      decimals: 1,
      discord: '',
      twitter: '',
      apiMetadata: 'https://webazaar-meta-api.herokuapp.com/721/detail/{id}',
      blockExplorerUrl:
        'https://mumbai.polygonscan.com/address/0x8ba96897cA8A95B39C639BEa1e5E9ce60d22BD2B',
      assetExternalLink:
        'https://mumbai.polygonscan.com/token/0x8ba96897cA8A95B39C639BEa1e5E9ce60d22BD2B?a=',
      projectLink:
        'https://mumbai.polygonscan.com/address/0x8ba96897cA8A95B39C639BEa1e5E9ce60d22BD2B',
    },
    {
      assetName: 'Bazaar ERC1155 Collection',
      description: 'Test contract for weebazaar ERC1155',
      backgroundBanner: require('@/assets/img/banners/Twitter 3.jpg'),

      contractAddress: '0xC70d6b33882dE18BDBD0a372B142aC96ceb1366f',
      baseUrl: 'https://api-testnet.polygonscan.com/',
      chainId: '0x13881',
      contractType: 'ERC1155',
      decimals: 1,
      discord: '',
      twitter: '',
      apiMetadata: 'https://webazaar-meta-api.herokuapp.com/1155/detail/{id}',
      blockExplorerUrl:
        'https://mumbai.polygonscan.com/address/0xC70d6b33882dE18BDBD0a372B142aC96ceb1366f',
      assetExternalLink:
        'https://mumbai.polygonscan.com/token/0xC70d6b33882dE18BDBD0a372B142aC96ceb1366f?a=',
      projectLink:
        'https://mumbai.polygonscan.com/address/0xC70d6b33882dE18BDBD0a372B142aC96ceb1366f',
    },
    {
      assetName: 'BAZCOIN',
      description: 'Test contract for weebazaar ERC20',
      tokenImage: require('@/assets/img/site-logos/Web3Bazaar_ProfilePicture_NonTransparent_300px.png'),
      contractAddress: '0x89A84dc58ABA7909818C471B2EbFBc94e6C96c41',
      baseUrl: 'https://api-testnet.polygonscan.com/',
      chainId: '0x13881',
      contractType: 'ERC20',
      discord: '',
      twitter: '',
      apiMetadata: 'https://webazaar-meta-api.herokuapp.com/detail/{id}',
      projectLink:
        'https://mumbai.polygonscan.com/token/0x89A84dc58ABA7909818C471B2EbFBc94e6C96c41',
    },
  ],
})

export const actions = {
  // const singleTransfer = 'TransferSingle(address,address,address,uint256,uint256)'
  // const batchTranfer =
  //   'TransferBatch(address,address,address,uint256[],uint256[])'

  async listOwnedIds(
    { commit, dispatch, state, rootGetters },
    { wa, creator }
  ) {
    try {
      const activeChain = rootGetters['networks/getActiveChain']
      traderLogger.log('activeChain : ', activeChain)
      console.log('ACTIVE chain ', activeChain )

      const params = {
        wallet: wa,
        options: {
          // chain: 'mumbai',
          chain: activeChain.chainId,
        },
      }
      const { nfts: nftsList } = await getNFTList(params)
      traderLogger.log('getNFTList result:', nftsList)

      // if (!nftsList || !nftsList.length || nftsList.length === 0) {
      //   throw new Error("User hasn't got any NFTs")
      // }

      traderLogger.log('nftsList:', nftsList)
      traderLogger.log('projects:', state.projects)
      console.log('Project listed : ', state.projects )

      state.projects.forEach(async (project) => {
        let groupByProject
        if (project.contractType === 'ERC20') {
          // const ownedTokens =

          // ownedTokens[0].metadata.image = project.tokenImage

          groupByProject = [
            await dispatch(
              'relayer-erc20/listERC20',
              { ...project, wa, contractType: project.contractType },
              { root: true }
            ),
          ]
          if (groupByProject[0]) {
            groupByProject[0].metadata.image = project.tokenImage
          }
        } else {
          groupByProject = nftsList
            .filter(
              (e) =>
                e.token_address.toLowerCase() ===
                project.contractAddress.toLowerCase()
            )
            .map(async (e) => {
              return {
                ...e,
                metadata: await dispatch(
                  'details/getAssetMetadata',
                  {
                    apiMetadata: project.apiMetadata,
                    tokenId: e.token_id,
                    project,
                  },
                  { root: true }
                ),
                amount:
                  e.contract_type === 'ERC1155' && e.amount?.length >= 18
                    ? ethers.utils.formatUnits(e.amount)
                    : e.amount,
              }
            })
        }

        const groupByProjectResolved = await Promise.all(groupByProject)
        traderLogger.log(
          'groupByProject : ',
          groupByProjectResolved?.[0],
          project.contractAddress
        )
        if (groupByProjectResolved && groupByProjectResolved?.[0]) {
          if (creator) {
            commit('updateProject', {
              contractAddress: project.contractAddress,
              creatorAssets: groupByProjectResolved,
            })
          } else {
            commit('updateProject', {
              contractAddress: project.contractAddress,
              executorAssets: groupByProjectResolved,
            })
          }
        }
      })

      traderLogger.log('projects:', state.projects)
    } catch (error) {
      traderLogger.error('Error listing ids -> ', error)
    }
  },

  async GET_PROJECT_DATA({ commit, dispatch, state, rootGetters }) {
    try {
      const { projects: projectData } = (
        await this.$axios.get(BASE_URL + GET_PROJECT_DATA_ENDPOINT)
      ).data

      traderLogger.log('projectData api :', projectData)
      console.log('Projects readed : ',  projectData)

      // TODO: FORMAT/MAP data to specific format
      const projects = []

      const activeChain = rootGetters['networks/getActiveChain']
      traderLogger.log('activeChain : ', activeChain.chainId)

      projectData?.forEach((pl) => {
        traderLogger.log('pl : ', pl.chainId)

        if (
          pl.chainId === activeChain.chainId ||
          pl.chainId === activeChain.code
        ) {
          pl?.assets?.forEach((a) => {
            const {
              opensea_collections: openseaCollections,
              assets,
              ...plObject
            } = pl
            const blockExplorerUrl =
              rootGetters['networks/getActiveChainBlockExplorerURL'] +
              'address/' +
              a.contractAddress.toLowerCase()
            const assetExternalLink =
              rootGetters['networks/getActiveChainBlockExplorerURL'] +
              'token/' +
              a.contractAddress.toLowerCase() +
              '?a='

            projects.push({
              ...a,
              ...plObject,
              blockExplorerUrl,
              assetExternalLink,
              contractAddress: a.contractAddress.toLowerCase(),
            })
          })
        }
      })
      if (projects.length > 0) {
        console.log('Projects loaded : ',  projects)
        commit('projects', projects)
      }
      traderLogger.log('projects mapped: ', projects)
    } catch (e) {
      traderLogger.error('Error getting project data: ', e)
    }
  },
}

export const mutations = {
  projects(state, value) {
    state.projects = value
  },
  executorAddress(state, value) {
    state.executorAddress = value
  },
  executorSelectedAssets(state, value) {
    state.executorSelectedAssets = { ...state.executorSelectedAssets, ...value }
  },
  creatorSelectedAssets(state, value) {
    state.creatorSelectedAssets = { ...state.creatorSelectedAssets, ...value }
  },
  resetSelectedAssets(state) {
    state.executorSelectedAssets = {}
    state.creatorSelectedAssets = {}
  },
  updateProject(state, updatedItem) {
    state.projects = [
      ...state.projects.map((item) => {
        return item.contractAddress !== updatedItem.contractAddress
          ? item
          : { ...item, ...updatedItem }
      }),
    ]
  },
}
