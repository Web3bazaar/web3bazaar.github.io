import axios from 'axios'

import { ethers } from 'ethers'

const traderLogger = {
  log: require('debug')('w3b:store:trader'),
  error: require('debug')('w3b:store:error:trader'),
}

const getNFTListURL =
  'https://nft-ownership-backend.herokuapp.com/api/v1/chainquery'

const getNFTList = async function (params) {
  try {
    traderLogger.log('******* getNFTList ***** ', params)

    const response = await axios.post(getNFTListURL, params)
    traderLogger.log('******* response ***** ', response)

    return response.data.data
  } catch (ex) {
    throw new Error('Not able to retrieve data form event log : ', ex)
  }
}

const getAssetMetadata = async function (e) {
  if (e.contract_type === 'ERC721') {
    return (
      await axios.get(
        'https://webazaar-meta-api.herokuapp.com/721/detail/' + e.token_id
      )
    ).data
  } else if (e.contract_type === 'ERC1155') {
    return (
      await axios.get(
        'https://webazaar-meta-api.herokuapp.com/1155/detail/' + e.token_id
      )
    ).data
  } else {
    return JSON.parse(e.metadata || '{}')
  }
}

export const state = () => ({
  creatorSelectedAssets: [],
  executorSelectedAssets: [],
  executorAddress: '',
  projects: [
    {
      projectName: 'Bazaar ERC721 Collection',
      description: 'Test contract for weebazaar ERC721',
      background_image: require('@/assets/img/banners/Twitter 3.jpg'),
      contractAddress: '0x8ba96897cA8A95B39C639BEa1e5E9ce60d22BD2B',
      baseUrl: 'https://api-testnet.polygonscan.com/',
      network: 'MUMBAI',
      contractType: 'ERC721',
      discord: '',
      twitter: '',
      api_metadata: 'https://webazaar-meta-api.herokuapp.com/721/detail/{id}',
      blockExplorerUrl:
        'https://mumbai.polygonscan.com/address/0x8ba96897cA8A95B39C639BEa1e5E9ce60d22BD2B',
      assetExternalLink:
        'https://mumbai.polygonscan.com/token/0x8ba96897cA8A95B39C639BEa1e5E9ce60d22BD2B?a=',
      projectLink:
        'https://mumbai.polygonscan.com/address/0x8ba96897cA8A95B39C639BEa1e5E9ce60d22BD2B',

      api_metadata_sample: {
        name: '',
        description: '',
        image: '',
      },
    },
    {
      projectName: 'Bazaar ERC1155 Collection',
      description: 'Test contract for weebazaar ERC1155',
      background_image: require('@/assets/img/banners/Twitter 3.jpg'),

      contractAddress: '0xC70d6b33882dE18BDBD0a372B142aC96ceb1366f',
      baseUrl: 'https://api-testnet.polygonscan.com/',
      network: 'MUMBAI',
      contractType: 'ERC1155',
      discord: '',
      twitter: '',
      api_metadata: 'https://webazaar-meta-api.herokuapp.com/1155/detail/{id}',
      blockExplorerUrl:
        'https://mumbai.polygonscan.com/address/0xC70d6b33882dE18BDBD0a372B142aC96ceb1366f',
      assetExternalLink:
        'https://mumbai.polygonscan.com/token/0xC70d6b33882dE18BDBD0a372B142aC96ceb1366f?a=',
      projectLink:
        'https://mumbai.polygonscan.com/address/0xC70d6b33882dE18BDBD0a372B142aC96ceb1366f',
      api_metadata_sample: {
        name: '',
        description: '',
        image: '',
      },
    },
    {
      projectName: 'BAZCOIN',
      description: 'Test contract for weebazaar ERC20',
      tokenImage: require('@/assets/img/site-logos/Web3Bazaar_ProfilePicture_NonTransparent_300px.png'),
      contractAddress: '0x89A84dc58ABA7909818C471B2EbFBc94e6C96c41',
      baseUrl: 'https://api-testnet.polygonscan.com/',
      network: 'MUMBAI',
      contractType: 'ERC20',
      discord: '',
      twitter: '',
      api_metadata: 'https://webazaar-meta-api.herokuapp.com/detail/{id}',
      projectLink:
        'https://mumbai.polygonscan.com/token/0x89A84dc58ABA7909818C471B2EbFBc94e6C96c41',
      api_metadata_sample: {
        name: '',
        description: '',
        image: '',
      },
    },
  ],
})

export const actions = {
  // const singleTransfer = 'TransferSingle(address,address,address,uint256,uint256)'
  // const batchTranfer =
  //   'TransferBatch(address,address,address,uint256[],uint256[])'

  async listOwnedIds(
    { commit, dispatch, state, rootGetters },
    { wa, selectedProjects, creator }
  ) {
    try {
      const activeChain = rootGetters['networks/getActiveChain']
      traderLogger.log('activeChain : ', activeChain)

      const params = {
        wallet: wa,
        options: {
          chain: 'mumbai',
        },
      }
      const { nfts: nftsList } = await getNFTList(params)
      traderLogger.log('getNFTList result:', nftsList)

      // if (!nftsList || !nftsList.length || nftsList.length === 0) {
      //   throw new Error("User hasn't got any NFTs")
      // }

      traderLogger.log('nftsList:', nftsList)

      selectedProjects.forEach(async (project) => {
        const groupByProject = await nftsList
          .filter(
            (e) =>
              e.token_address.toLowerCase() ===
              project.contractAddress.toLowerCase()
          )
          .map(async (e) => ({
            ...e,
            metadata: await getAssetMetadata(e),
            amount:
              e.contract_type === 'ERC1155'
                ? ethers.utils.formatUnits(e.amount)
                : e.amount,
          }))

        const groupByProjectResolved = await Promise.all(groupByProject)
        traderLogger.log('groupByProject : ', groupByProjectResolved)
        if (groupByProjectResolved) {
          if (creator) {
            commit('updateProject', {
              projectName: project.projectName,
              creatorAssets: groupByProjectResolved,
            })
          } else {
            commit('updateProject', {
              projectName: project.projectName,
              executorAssets: groupByProjectResolved,
            })
          }
        }
      })

      await Promise.all(
        selectedProjects.map(async (project) => {
          let ownedIds = []
          // let listDetails
          switch (project.contractType) {
            case 'ERC20':
              ownedIds = await dispatch(
                'relayer-erc20/listERC20',
                { ...project, wa, contractType: project.contractType },
                { root: true }
              )
              traderLogger.log('******* ownedIds ***** ', ownedIds)

              ownedIds[0].metadata.image = project.tokenImage

              // listDetails = (
              //   await dispatch(
              //     'details/getListDetails',
              //     {
              //       listIds: ownedIds,
              //       contractAddress: project.contractAddress,
              //       contractType: project.contractType,
              //     },
              //     { root: true }
              //   )
              // ).filter(Boolean)
              if (ownedIds) {
                if (creator) {
                  traderLogger.log('creatorAssets : ', ownedIds)
                  commit('updateProject', {
                    projectName: project.projectName,
                    creatorAssets: ownedIds,
                  })
                } else {
                  traderLogger.log('executorAssets : ', ownedIds)
                  commit('updateProject', {
                    projectName: project.projectName,
                    executorAssets: ownedIds,
                  })
                }
              }
              break
          }
        })
      )
    } catch (error) {
      traderLogger.error('Error listing ids -> ', error)
    }
  },
}

export const mutations = {
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
      ...state.projects.map((item) =>
        item.projectName !== updatedItem.projectName
          ? item
          : { ...item, ...updatedItem }
      ),
    ]
  },
}
