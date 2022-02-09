

export const actions = {
    listERC721Ids({ commit }, { wa, contract_address }) {

        let ids = [1,2,4,8,5,6,7 ]
        return ids;

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