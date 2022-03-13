import axios from 'axios'
// import Web3Utils from 'web3-utils'
// import Web3Utils from 'web3-utils';

const relayerLogger = {
  log: require('debug')('w3b:store:relayerLogger'),
  error: require('debug')('w3b:store:error:relayerLogger'),
}

// base url
// const BASE_URL = 'https://api-rinkeby.etherscan.io'

// const ERC1155_LOGS =
//   '/api?module=logs&action=getLogs&fromBlock=379224&toBlock=latest&sort=desc&address=$CONTRACT&apikey=$API_KEY'

// const getQuery = (BASE_URL, CONTRACT, API_KEY) =>
//   `${BASE_URL}/api?module=logs&action=getLogs&fromBlock=379224&toBlock=latest&sort=desc&address=${CONTRACT}&apikey=${API_KEY}`

const getNFTListURL =
  'https://nft-ownership-backend.herokuapp.com/api/v1/chainquery'

// const singleTransfer = 'TransferSingle(address,address,address,uint256,uint256)'
// const batchTranfer =
//   'TransferBatch(address,address,address,uint256[],uint256[])'

const getNFTList = async function (params) {
  try {
    relayerLogger.log('******* getNFTList ***** ', params)

    const response = await axios.post(getNFTListURL, params)
    return response.data
  } catch (ex) {
    throw new Error('Not able to retrive data form event log : ', ex)
  }
}

// https://ethereum.stackexchange.com/questions/49385/what-does-topics-mean-in-event-log
// const decodedDataEvent = async function (query) {
//   try {
//     const logs = await getEventLogFromContract(query)

//     const logIds = []
//     logs.forEach((element) => {
//       // relayerLogger.log('Element : ', element);
//       // relayerLogger.log('Topic0 : ', element.topics[0]);

//       if (element.topics[0] === Web3Utils.sha3(singleTransfer)) {
//         // relayerLogger.log('Single event ', element.data);
//         const decoded = Web3ABI.decodeParameters(
//           ['uint256', 'uint256'],
//           element.data
//         )
//         logIds.push({ id: decoded[0], amount: decoded[1] })
//         relayerLogger.log('Single event Data parsed :', decoded)
//       } else if (element.topics[0] === Web3Utils.sha3(batchTranfer)) {
//         // relayerLogger.log('batchTranfer event ',  element.data );
//         const decoded = Web3ABI.decodeParameters(
//           ['uint256[]', 'uint256[]'],
//           element.data
//         )
//         relayerLogger.log('Batch transder data : ', decoded)
//         if (decoded[0].length > 0) {
//           decoded[0].forEach((element, i) => {
//             logIds.push({ id: element, amount: decoded[1][i] })
//           })
//         }
//       }
//     })

//     return logIds
//   } catch (ex) {
//     relayerLogger.error('Error decodedDataEvent ', ex)
//     throw new Error('Error decodedDataEvent ', ex)
//   }
// }

// const computeTotalAmountForId = function (itens) {
//   const addedAmounts = {}
//   const newIds = []
//   itens.forEach((element) => {
//     if (addedAmounts[element.id] > 0) {
//       addedAmounts[element.id] += element.amount * 1
//     } else {
//       addedAmounts[element.id] = element.amount * 1
//     }
//   })

//   for (const i in addedAmounts) {
//     newIds.push({ id: i, amount: addedAmounts[i] })
//   }

//   return newIds
// }

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
  async listERC1155({ commit, rootGetters }, { wa }) {
    // let ids = [1,2,4,8,5,6,7,8];
    relayerLogger.log('************  listERC1155 ****************', wa)

    const activeChain = rootGetters['networks/getActiveChain']
    relayerLogger.log('activeChain : ', activeChain)

    const params = {
      wallet: wa,
      options: {
        chain: 'mumbai',
      },
    }
    const { nfts: nftsList } = await getNFTList(params)
    relayerLogger.log('getNFTList result:', nftsList)

    if (!nftsList || !nftsList.length || nftsList.length === 0) {
      throw new Error("User hasn't got any NFTs")
    }

    const exampleResultWithAllNFTs = {
      nfts: [
        {
          token_address: '0xb48342ff701ddff44c7a1eec9c0293b4f2947e53',
          token_id: '10',
          block_number_minted: '25186434',
          owner_of: '0xe909c6d01f5111e1b6b6da8d1988962262b9d777',
          block_number: '25186434',
          amount: '1',
          contract_type: 'ERC721',
          name: 'BazaarItens721',
          symbol: 'BAZITENS',
          token_uri: 'https://webazaar-meta-api.herokuapp.com/detail/{id}10',
          metadata:
            '{"id":"{id}10","name":"Item name : {id}10","description":"Friendly Creature that enjoys long swims in the ocean. {id}10","externalURL":"https://webazaar-meta-api.herokuapp.com/detail/{id}10","image":"https://raw.githubusercontent.com/Web3bazaar/api-metadata/master/static/images/NaN.jpg"}',
          synced_at: '2022-02-22T11:32:01.622Z',
          is_valid: 1,
          syncing: 2,
          frozen: 0,
        },
        {
          token_address: '0xb48342ff701ddff44c7a1eec9c0293b4f2947e53',
          token_id: '9',
          block_number_minted: '25186433',
          owner_of: '0xe909c6d01f5111e1b6b6da8d1988962262b9d777',
          block_number: '25186433',
          amount: '1',
          contract_type: 'ERC721',
          name: 'BazaarItens721',
          symbol: 'BAZITENS',
          token_uri: 'https://webazaar-meta-api.herokuapp.com/detail/{id}9',
          metadata:
            '{"id":"{id}9","name":"Item name : {id}9","description":"Friendly Creature that enjoys long swims in the ocean. {id}9","externalURL":"https://webazaar-meta-api.herokuapp.com/detail/{id}9","image":"https://raw.githubusercontent.com/Web3bazaar/api-metadata/master/static/images/NaN.jpg"}',
          synced_at: '2022-02-22T11:32:01.623Z',
          is_valid: 1,
          syncing: 2,
          frozen: 0,
        },
        {
          token_address: '0xb48342ff701ddff44c7a1eec9c0293b4f2947e53',
          token_id: '8',
          block_number_minted: '25186429',
          owner_of: '0xe909c6d01f5111e1b6b6da8d1988962262b9d777',
          block_number: '25186429',
          amount: '1',
          contract_type: 'ERC721',
          name: 'BazaarItens721',
          symbol: 'BAZITENS',
          token_uri: 'https://webazaar-meta-api.herokuapp.com/detail/{id}8',
          metadata:
            '{"id":"{id}8","name":"Item name : {id}8","description":"Friendly Creature that enjoys long swims in the ocean. {id}8","externalURL":"https://webazaar-meta-api.herokuapp.com/detail/{id}8","image":"https://raw.githubusercontent.com/Web3bazaar/api-metadata/master/static/images/NaN.jpg"}',
          synced_at: '2022-02-22T11:32:01.622Z',
          is_valid: 1,
          syncing: 2,
          frozen: 0,
        },
        {
          token_address: '0xb48342ff701ddff44c7a1eec9c0293b4f2947e53',
          token_id: '7',
          block_number_minted: '25186427',
          owner_of: '0xe909c6d01f5111e1b6b6da8d1988962262b9d777',
          block_number: '25186427',
          amount: '1',
          contract_type: 'ERC721',
          name: 'BazaarItens721',
          symbol: 'BAZITENS',
          token_uri: 'https://webazaar-meta-api.herokuapp.com/detail/{id}7',
          metadata:
            '{"id":"{id}7","name":"Item name : {id}7","description":"Friendly Creature that enjoys long swims in the ocean. {id}7","externalURL":"https://webazaar-meta-api.herokuapp.com/detail/{id}7","image":"https://raw.githubusercontent.com/Web3bazaar/api-metadata/master/static/images/NaN.jpg"}',
          synced_at: '2022-02-22T11:32:01.623Z',
          is_valid: 1,
          syncing: 2,
          frozen: 0,
        },
        {
          token_address: '0xb48342ff701ddff44c7a1eec9c0293b4f2947e53',
          token_id: '6',
          block_number_minted: '25186419',
          owner_of: '0xe909c6d01f5111e1b6b6da8d1988962262b9d777',
          block_number: '25186419',
          amount: '1',
          contract_type: 'ERC721',
          name: 'BazaarItens721',
          symbol: 'BAZITENS',
          token_uri: 'https://webazaar-meta-api.herokuapp.com/detail/{id}6',
          metadata:
            '{"id":"{id}6","name":"Item name : {id}6","description":"Friendly Creature that enjoys long swims in the ocean. {id}6","externalURL":"https://webazaar-meta-api.herokuapp.com/detail/{id}6","image":"https://raw.githubusercontent.com/Web3bazaar/api-metadata/master/static/images/NaN.jpg"}',
          synced_at: '2022-02-22T11:32:01.624Z',
          is_valid: 1,
          syncing: 2,
          frozen: 0,
        },
        {
          token_address: '0xb48342ff701ddff44c7a1eec9c0293b4f2947e53',
          token_id: '5',
          block_number_minted: '25186414',
          owner_of: '0xe909c6d01f5111e1b6b6da8d1988962262b9d777',
          block_number: '25186414',
          amount: '1',
          contract_type: 'ERC721',
          name: 'BazaarItens721',
          symbol: 'BAZITENS',
          token_uri: 'https://webazaar-meta-api.herokuapp.com/detail/{id}5',
          metadata:
            '{"id":"{id}5","name":"Item name : {id}5","description":"Friendly Creature that enjoys long swims in the ocean. {id}5","externalURL":"https://webazaar-meta-api.herokuapp.com/detail/{id}5","image":"https://raw.githubusercontent.com/Web3bazaar/api-metadata/master/static/images/NaN.jpg"}',
          synced_at: '2022-02-22T11:32:01.623Z',
          is_valid: 1,
          syncing: 2,
          frozen: 0,
        },
      ],
    }
    relayerLogger.log('exampleResultWithAllNFTs:', exampleResultWithAllNFTs)

    // let toAsReceiver = await decodedDataEvent(toQuery)
    // toAsReceiver = await computeTotalAmountForId(toAsReceiver)
    // relayerLogger.log('toAsReceiver : ', toAsReceiver)

    // // From query replace contract and apiKey
    // let fromQuery = getQuery(baseUrl, contractAddress, API_KEYS[network])

    // // let fromQuery = ERC1155_LOGS.replace('$CONTRACT', CONTRACT)
    // // fromQuery = fromQuery.replace('$API_KEY', ETHERSCAN_KEY)
    // // replace topic 2 from address!
    // fromQuery += '&topic2=' + encodedWA

    // relayerLogger.log('From Query : ', fromQuery)

    // let fromAsSender = await decodedDataEvent(fromQuery)
    // fromAsSender = await computeTotalAmountForId(fromAsSender)
    // relayerLogger.log('fromAsSender : ', fromAsSender)

    // toAsReceiver.forEach((elem) => {
    //   const fromer = fromAsSender.find((x) => x.id === elem.id)
    //   if (fromer > -1) {
    //     elem.amount -= fromer.amount
    //   }
    // })

    return nftsList
  },
}
