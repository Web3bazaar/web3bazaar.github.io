import axios from 'axios'

const CONTRACT = '0x32c7411558177aae348d9f06c6ec912f5e2573d8';
const ETHERSCAN_KEY = 'CAS5V4SCSESCT1IDDG3IG5SU31XU81MYE3'
// base url
const BASE_URL = 'https://api-rinkeby.etherscan.io'
const ERC721_USERS = '/api?module=account&action=tokennfttx&address=$WA&startblock=0&endblock=999999999&sort=desc&apikey=$API_KEY'

//   https://api-rinkeby.etherscan.io/api?module=account&action=tokennfttx&address=0xA7Cc2E2050A607c813437C1c074f82322Cc0C8aE&startblock=0&endblock=999999999&sort=desc&apikey=CAS5V4SCSESCT1IDDG3IG5SU31XU81MYE3




export const actions = {

    /**
     * 
     * the way we're using to grab all the tokens ids from a erc721 is reading the etherscan api filter by action=tokennfttx
     * that send us all the erc721 tokens that users had on their wallet! 
     * Then read all the received ids and all the sended ids from a given contrac address the ids tthat users still owned  is the difference between the two lists
     * 
     * @param {*} param0 
     * @param {*} param1 
     * @returns 
     */
    async listERC721Ids({ commit }, { wa, contractAddress }) {

      // const ids = [1,2,4,8,5,6,7,8];

      // hardcode wallet address
      wa ='0xa7cc2e2050a607c813437c1c074f82322cc0c8ae';

      // build query!
      let query = ERC721_USERS.replace('$WA', wa)
      query = query.replace('$API_KEY' , ETHERSCAN_KEY);
      query = BASE_URL + query ;

      let ids = [];

      try
      {
        const response = await axios.get( query );
        const result = response.data.result;

        console.log('Result total : ', result);

        // all tokens ids that users receceis
        const toAsReceiver = result.filter(tx =>
                                              tx.to.toUpperCase()  === wa.toUpperCase() &&
                                              tx.contractAddress.toUpperCase() === CONTRACT.toUpperCase()
                                          ).map(tx => tx.tokenID);
        console.log('Full received : ', toAsReceiver )

        // all tokens ids sent by user
        const fromAsSender = result.filter(tx =>  
                                    tx.from.toUpperCase()  === wa.toUpperCase() &&
                                    tx.contractAddress.toUpperCase() === CONTRACT.toUpperCase()
                                ).map(tx => tx.tokenID);
    
        console.log('Full fromAsSender : ', fromAsSender )

        // subtract all tokens recevied from the tokens sended by the wallet
        ids = toAsReceiver.filter(x => !fromAsSender.includes(x));

        console.log('Full owned : ',ids);
      
      }catch(ex){
        console.error('Error calling etherscan api -> ', ex )
        throw ex;
      }

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