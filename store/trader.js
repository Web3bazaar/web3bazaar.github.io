export const state = () => ({
  itemFrom: {
    base_img:
      'https://2264006251-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F-MdunBb1X4ZSri9eSiAH%2Fuploads%2Fj3zLlHOEGa4kKLWE3qsv%2FTwitter_art.png?alt=media&token=bb90dda5-cf06-4395-bc59-42a3d45bb403',
    address: '0x999...123',
    project_name: 'SunFlower Farms',
    item_name: 'Sunflower',
    item_quantity: 1,
    type: 'ERC-721',
    item_logo_url:
      'https://aavegotchi.com/_next/image?url=%2Fimages%2Fitems%2F152.svg&w=128&q=75',
  },
  itemTo: {
    base_img:
      'https://2264006251-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F-MdunBb1X4ZSri9eSiAH%2Fuploads%2Fj3zLlHOEGa4kKLWE3qsv%2FTwitter_art.png?alt=media&token=bb90dda5-cf06-4395-bc59-42a3d45bb403',
    address: '0x123...999',
    project_name: 'SunFlower Farms',
    item_name: 'potato',
    item_quantity: 30,
    item_logo_url:
      'blob:https://aavegotchi.com/6419374b-3038-4ec6-a8f6-d2acaa172a98',
  },
  projectFromItems: [
    {
      item_name: 'Mythical Rofl',
      item_logo_url:
        'https://aavegotchi.com/_next/image?url=%2Fimages%2Fitems%2F155.svg&w=256&q=75',
      item_quantity: '5',
    },
  ],
  projectToItems: [
    {
      item_name: 'Aantenna Bot',
      item_logo_url:
        'https://aavegotchi.com/_next/image?url=%2Fimages%2Fitems%2F261.svg&w=256&q=75',
      item_quantity: '3',
    },
  ],
  projects: [
      {
        "project_name" : "Sunflower - bazaar721",
        "description" : "Test contract for weebazaar ERC721",
        base_img:'https://2264006251-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F-MdunBb1X4ZSri9eSiAH%2Fuploads%2Fj3zLlHOEGa4kKLWE3qsv%2FTwitter_art.png?alt=media&token=bb90dda5-cf06-4395-bc59-42a3d45bb403',
        "contractAddress" : "",
        "contractType" : "ERC721",
        "discord" : "",
        "twitter" : "",
        "api_metadata" : "https://webazaar-meta-api.herokuapp.com/detail/{id}",
        "api_metadata_sample" : {
            "name" : "",
            "description" : "",
            "image" : ""
        }
    },
    {
      "project_name" : "Defi kingdoms - bazaar721",
      "description" : "Test contract for weebazaar ERC721",
      base_img:'https://picsum.photos/id/11/500/300',
      "contractAddress" : "",
      "contractType" : "ERC721",
      "discord" : "",
      "twitter" : "",
      "api_metadata" : "https://webazaar-meta-api.herokuapp.com/detail/{id}",
      "api_metadata_sample" : {
          "name" : "",
          "description" : "",
          "image" : ""
      }
  },
  {
      "project_name" : "Aavegotchi - bazaar1155",
      "description" : "Test contract for weebazaar ERC721",
      base_img:'https://blog.bitnovo.com/wp-content/uploads/2021/11/Que%CC%81-es-Aavegotchi1.jpg',
      "contractAddress" : "",
      "contractType" : "ERC1155",
      "discord" : "",
      "twitter" : "",
      "api_metadata" : "https://webazaar-meta-api.herokuapp.com/detail/{id}",
      "api_metadata_sample" : {
          "name" : "",
          "description" : "",
          "image" : ""
      }
  },
  {
    "project_name" : "Weenus - bazaarERC20",
    "description" : "Test contract for weebazaar ERC20",
    base_img:'https://cryptologos.cc/logos/multi-collateral-dai-dai-logo.png',
    "contractAddress" : "0xaFF4481D10270F50f203E0763e2597776068CBc5",
    "contractType" : "ERC20",
    "discord" : "",
    "twitter" : "",
    "api_metadata" : "https://webazaar-meta-api.herokuapp.com/detail/{id}",
    "api_metadata_sample" : {
        "name" : "",
        "description" : "",
        "image" : ""
    }
}
  ],
})

export const actions = {
  async listOwnedIds({ commit, dispatch , state, rootState }, projectName) {
  
    const project = state.projects.find(p => p.project_name === projectName);

    // const ownedIds =  await dispatch('relayer-erc721/listERC721Ids', {...project , wa : rootState.connector.account }, {root: true} );
    // const ownedIds =  await dispatch('relayer-erc1155/listERC1155', {...project , wa : rootState.connector.account }, {root: true} );
    const ownedIds =  await dispatch('web3-utils/allowERC1155', {...project , wa : rootState.connector.account }, {root: true} );

    console.log('Owned ids from trader store : ' , ownedIds );
  


   
  },
  async fetchChainId({ commit }, provider) {
    const chainId = await provider.request({ method: 'eth_chainId' })

    if (chainId) {
      commit('setChainId', chainId)
      return chainId
    }

    return false
  },
  async connectAccount({ commit, dispatch }, provider) {
    try {
      const accounts = await provider.request({
        method: 'eth_requestAccounts',
      })

      if (accounts.length === 0) {
        // MetaMask is locked or the user has not connected any accounts
        console.log('Please connect to MetaMask.')
        return false
      }

      const chainId = await dispatch('fetchChainId', provider)

      console.log('connectAccount', accounts[0], chainId)
      commit('setAccount', accounts[0])
      commit('setWalletConnection', true)
      return true
    } catch (err) {
      if (err.code === 4001) {
        // EIP-1193 userRejectedRequest error
        // If this happens, the user rejected the connection request.
        console.log('Please connect to MetaMask.')
      } else {
        console.error(err)
      }
      return false
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
}
