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

const BASE_URL = process.env.BASE_URL

const getNFTListURL = BASE_URL + '/chainquery'

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

    return nftsList
  },
}
