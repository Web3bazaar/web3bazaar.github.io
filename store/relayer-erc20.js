const ethers = require('ethers')
// import axios from 'axios'

// const CONTRACT = '0xaFF4481D10270F50f203E0763e2597776068CBc5'
// const ETHERSCAN_KEY = 'CAS5V4SCSESCT1IDDG3IG5SU31XU81MYE3'
// // base url
// const BASE_URL = 'https://api-rinkeby.etherscan.io'
// const ERC20_USERS =
//   '/api?module=account&action=tokenbalance&contractaddress=$CONTRACT&address=$WA&tag=latest&apikey=$API_KEY'

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
  async listERC20({ commit }, { wa, contractAddress, contractType }) {
    let balance
    const metadata = {}
    let assetData = {}
    try {
      const genericErc20Abi = require(`../const/abis/${contractType?.toLowerCase?.()}.json`)

      const userProvider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new ethers.Contract(
        contractAddress,
        genericErc20Abi,
        await userProvider.getSigner()
      )

      balance = (await contract.balanceOf(wa)).toString()

      metadata.name = (await contract.symbol()).toString()

      assetData = {
        token_address: contractAddress,
        token_id: '1',
        contract_type: contractType,
      }

      const decimals = await contract.decimals()

      const amount = ethers.utils.formatUnits(balance, decimals)

      console.log({ amount, metadata, ...assetData })
      if (parseInt(balance) === 0) {
        return { amount, metadata, ...assetData }
      }
      return { amount, metadata, ...assetData }
    } catch (ex) {
      console.error(
        'Error listing ERC20 CONTRACT_ADDRES: ',
        contractAddress,
        ' WA:',
        wa
      )
      console.error('Error listing listERC20 balance: ', ex)
      // throw ex
    }
  },
}
