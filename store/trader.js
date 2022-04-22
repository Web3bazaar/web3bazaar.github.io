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

export const state = () => ({
  tradeSelectedItemFrom: [],
  tradeSelectedItemTo: [],
  itemFrom: {},
  itemTo: {},
  projectFromItems: [],
  projectToItems: [],
  projects: [
    {
      projectName: 'bazaar721',
      description: 'Test contract for weebazaar ERC721',
      base_img:
        'https://2264006251-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F-MdunBb1X4ZSri9eSiAH%2Fuploads%2Fj3zLlHOEGa4kKLWE3qsv%2FTwitter_art.png?alt=media&token=bb90dda5-cf06-4395-bc59-42a3d45bb403',
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
      projectName: 'bazaar1155',
      description: 'Test contract for weebazaar ERC1155',
      base_img:
        'https://blog.bitnovo.com/wp-content/uploads/2021/11/Que%CC%81-es-Aavegotchi1.jpg',
      contractAddress: '0x638A0ec36d2E89d8671e193854A56326a24455aA',
      baseUrl: 'https://api-testnet.polygonscan.com/',
      network: 'MUMBAI',
      contractType: 'ERC1155',
      discord: '',
      twitter: '',
      api_metadata: 'https://webazaar-meta-api.herokuapp.com/1155/detail/{id}',
      blockExplorerUrl:
        'https://mumbai.polygonscan.com/address/0x638A0ec36d2E89d8671e193854A56326a24455aA',
      assetExternalLink:
        'https://mumbai.polygonscan.com/token/0x638A0ec36d2E89d8671e193854A56326a24455aA?a=',
      projectLink:
        'https://mumbai.polygonscan.com/address/0x638A0ec36d2E89d8671e193854A56326a24455aA',
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
    { wa, selectedProjects, to, from }
  ) {
    // const ownedIds =  await dispatch('relayer-erc721/listERC721Ids', {...project , wa : rootState.connector.account }, {root: true} );

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

      selectedProjects.forEach((project) => {
        const groupByProject = nftsList
          .filter(
            (e) =>
              e.token_address.toLowerCase() ===
              project.contractAddress.toLowerCase()
          )
          .map((e) => ({
            ...e,
            metadata: JSON.parse(e.metadata) || {},
            amount:
              e.contract_type === 'ERC1155'
                ? ethers.utils.formatUnits(e.amount)
                : e.amount,
          }))

        traderLogger.log('groupByProject : ', groupByProject)

        if (groupByProject) {
          if (to) {
            commit('updateProject', {
              projectName: project.projectName,
              projectToItems: groupByProject,
            })
          }
          if (from) {
            commit('updateProject', {
              projectName: project.projectName,
              projectFromItems: groupByProject,
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
                if (to) {
                  traderLogger.log('projectToItems : ', ownedIds)
                  commit('updateProject', {
                    projectName: project.projectName,
                    projectToItems: ownedIds,
                  })
                }
                if (from) {
                  traderLogger.log('projectFromItems : ', ownedIds)
                  commit('updateProject', {
                    projectName: project.projectName,
                    projectFromItems: ownedIds,
                  })
                }
              }
              break
          }
        })
      )

      // await Promise.all(
      //   selectedProjects.map(async (project) => {
      //     let ownedIds = []

      //     switch (project.contractType) {
      //       // case 'ERC20':
      //       //   ownedIds = await dispatch(
      //       //     'relayer-erc20/listERC20',
      //       //     { ...project, wa },
      //       //     { root: true }
      //       //   )
      //       //   break
      //       case 'ERC721':
      //         ownedIds = await dispatch(
      //           'relayer-erc721/listERC721',
      //           { ...project, wa },
      //           { root: true }
      //         )
      //         break
      //       case 'ERC1155':
      //         ownedIds = await dispatch(
      //           'relayer-erc1155/listERC1155',
      //           { ...project, wa },
      //           { root: true }
      //         )
      //         break

      //       default:
      //         break
      //     }

      //     const listDetails = (
      //       await dispatch(
      //         'details/getListDetails',
      //         {
      //           listIds: ownedIds,
      //           contractAddress: project.contractAddress,
      //           contractType: project.contractType,
      //         },
      //         { root: true }
      //       )
      //     ).filter(Boolean)

      //     if (listDetails) {
      //       if (to) {
      //         traderLogger.log('projectToItems : ', listDetails)
      //         commit('updateProject', {
      //           project_name: project.project_name,
      //           projectToItems: listDetails,
      //         })
      //       }
      //       if (from) {
      //         traderLogger.log('projectFromItems : ', listDetails)
      //         commit('updateProject', {
      //           project_name: project.project_name,
      //           projectFromItems: listDetails,
      //         })
      //       }
      //     }
      //   })
      // )
    } catch (error) {
      traderLogger.error('Error listing ids -> ', error)
    }
  },
}

export const mutations = {
  itemFrom(state, value) {
    state.itemFrom = value
  },
  itemTo(state, value) {
    state.itemTo = value
  },
  tradeSelectedItemTo(state, value) {
    state.tradeSelectedItemTo = value
  },
  tradeSelectedItemFrom(state, value) {
    state.tradeSelectedItemFrom = value
  },
  projectToItems(state, value) {
    state.projectToItems = value
  },
  projectFromItems(state, value) {
    state.projectFromItems = value
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
