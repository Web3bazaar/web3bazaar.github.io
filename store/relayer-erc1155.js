import axios from 'axios'
import Web3Utils from "web3-utils";
// import Web3Utils from 'web3-utils';
import Web3ABI from 'web3-eth-abi';

// replace for the contract address
const CONTRACT = '0x2D71052c0f9861C82807703F2e586De040833E17';
const ETHERSCAN_KEY = 'CAS5V4SCSESCT1IDDG3IG5SU31XU81MYE3'
// base url
const BASE_URL = 'https://api-rinkeby.etherscan.io'
const ERC1155_LOGS = '/api?module=logs&action=getLogs&fromBlock=379224&toBlock=latest&sort=desc&address=$CONTRACT&apikey=$API_KEY'


const singleTransfer = 'TransferSingle(address,address,address,uint256,uint256)';
const batchTranfer   = 'TransferBatch(address,address,address,uint256[],uint256[])';


const getEventLogFromContract = async function(query)
{
  try{
    console.log('******* retriveEventsFromContract ***** ');
    
    const response = await axios.get( query );
    return response.data.result;
  }
  catch(ex){
    throw new Error('Not able to retrive data form event log : ', ex)
  }
}


// https://ethereum.stackexchange.com/questions/49385/what-does-topics-mean-in-event-log
const decodedDataEvent = async function(query)
{

    try
    {
      const logs = await getEventLogFromContract(query);

    
      const logIds = [];
      logs.forEach(element => 
      {
        // console.log('Element : ', element);
        // console.log('Topic0 : ', element.topics[0]);

        if(element.topics[0] === Web3Utils.sha3(singleTransfer) )
        {
          // console.log('Single event ', element.data);
          const decoded = Web3ABI.decodeParameters(['uint256', 'uint256'],  element.data )
          logIds.push({id : decoded[0] , amount : decoded[1] })
          console.log('Single event Data parsed :', decoded );
           
        }else if( element.topics[0] === Web3Utils.sha3(batchTranfer) )
        {
          // console.log('batchTranfer event ',  element.data );
          const decoded = Web3ABI.decodeParameters(['uint256[]', 'uint256[]'],  element.data )
          console.log('Batch transder data : ', decoded );
          if(decoded[0].length > 0){
            decoded[0].forEach((element, i) => 
            {
              logIds.push({id : element , amount : decoded[1][i] })
            });
          }
        }
      });

      logIds.push({id : "1" , amount : 120000 })
      logIds.push({id : "1" , amount : 620000 })
      logIds.push({id : "104" , amount : 620000 })

      return logIds;

    }catch(ex)
    {
        console.error('Error decodedDataEvent ', ex);
        throw new Error('Error decodedDataEvent ', ex )
    }

}

const computeTotalAmountForId =  function(itens)
{
  const addedAmounts = {} 
  const newIds = [];
  itens.forEach(element => 
  {
    if( addedAmounts[element.id] > 0 ) {
        addedAmounts[element.id] += element.amount * 1 ;
    }
    else{
      addedAmounts[element.id] =  element.amount * 1;
    }
  });

  for(const i in addedAmounts){
    newIds.push({id : i , amount : addedAmounts[i] })
  }

  return newIds;
}

export const actions = {

    /**
     * 
     * ERC1155 reading contract events single tranfer and batch transfer
     * 
     * Subtract total itens received by wallet address from the itens transfered from user wallet!
     * 
     * @param {*} param0 
     * @param {*} param1 
     * @returns 
     */
    async listERC1155({ commit }, { wa, contractAddress })  {

      // let ids = [1,2,4,8,5,6,7,8];
      console.log('************  listERC1155 ****************')

      // hardcode wallet address
      wa ='0x02390dBA46A107F0728DAA98f920aec171502B22';

      // build query replace contract and appKey
      let toQuery = ERC1155_LOGS.replace('$CONTRACT', CONTRACT)
      toQuery = toQuery.replace('$API_KEY' , ETHERSCAN_KEY);
    
      // encoding WA in format
      const encodedWA = Web3ABI.encodeParameter('address', wa );
      console.log('Encoded WA USER : ',  encodedWA);
      // filter by topic3 to address
      toQuery += '&topic3=' + encodedWA;
      toQuery = BASE_URL + toQuery ;
      console.log('ToQuery : ', toQuery)

      let toAsReceiver =  await decodedDataEvent(toQuery);
      toAsReceiver = await computeTotalAmountForId(toAsReceiver);
      console.log('toAsReceiver : ', toAsReceiver );

      // From query replace contract and apiKey
      let fromQuery = ERC1155_LOGS.replace('$CONTRACT', CONTRACT);
      fromQuery = fromQuery.replace('$API_KEY' , ETHERSCAN_KEY);
      // replace topic 2 from address!
      fromQuery += '&topic2=' + encodedWA;
      fromQuery = BASE_URL + fromQuery;
      console.log('From Query : ', fromQuery)

      let fromAsSender = await decodedDataEvent(fromQuery);
      fromAsSender = await computeTotalAmountForId(fromAsSender)
      console.log('fromAsSender : ', fromAsSender );
    
      toAsReceiver.forEach((elem) => 
      {
         const fromer = fromAsSender.find(x=> x.id ===  elem.id);
        if(fromer > -1 )
        {
          elem.amount -= fromer.amount;

        }
      })
    
      return toAsReceiver;
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