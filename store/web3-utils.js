import { ethers } from 'ethers'
import Web3Utils from 'web3-utils'
import Web3ABI from 'web3-eth-abi'
//   import Contract from 'web3-eth-contract';
// const  {ethereum} = window;
//   import web3 from "web3";
const BN = Web3Utils.BN
const EtherUnit = Web3Utils.toWei('1')

const MINIMUM_GAS_PRICE = 20

const estimate = async function (signer, incr) {
  const e = await signer.getGasPrice()
  console.log('gas price from ether ', e, ' *  ', incr)
  let gasPrice = e ? Number(e) * incr : undefined
  const minimum = MINIMUM_GAS_PRICE * 1000000000
  if (!gasPrice || gasPrice < minimum) {
    gasPrice = minimum
  }
  console.log('Gas price is ', { gasPrice })
  return gasPrice
}

export const actions = {
  async allowERC20({ commit, rootState }, { wa, contractAddress, amount }) {
    contractAddress = '0x08Cb52035F0884F3e508D4d852c516D1755BCD50'
    const erc20ABI = require('../const/abis/ERC20.json')
    console.log('ERC20 ', erc20ABI)

    const userProvider = new ethers.providers.Web3Provider(window.ethereum)

    const gasPrice = await estimate(userProvider)
    console.log('gasPrice ', gasPrice)

    const erc20Instance = new ethers.Contract(
      contractAddress,
      erc20ABI,
      userProvider.getSigner()
    )

    const approveAmount = new BN(87).mul(new BN(EtherUnit))
    console.log('Approve amount : ', approveAmount.toString())

    const approveReturn = await erc20Instance.approve(
      contractAddress,
      Web3ABI.encodeParameter('uint256', approveAmount),
      {}
    )
    console.log(
      'result from approval ',
      Web3ABI.decodeParameter('bool', approveReturn.data)
    )

    return approveReturn
  },
  async allowERC721({ commit }, { wa, contractAddress }) {
    contractAddress = '0x0ab1dc6500d0F1507dACbbA7AEDb9F44551B398A'
    const erc721ABI = require('../const/abis/ERC721.json')
    console.log('ERC721 ', erc721ABI)

    const userProvider = new ethers.providers.Web3Provider(window.ethereum)

    const gasPrice = await estimate(userProvider)
    console.log('gasPrice ', gasPrice)

    const erc721Instance = new ethers.Contract(
      contractAddress,
      erc721ABI,
      userProvider.getSigner()
    )

    const approveReturn = await erc721Instance.setApprovalForAll(
      contractAddress,
      Web3ABI.encodeParameter('bool', true),
      {}
    )
    console.log(
      'result from approval ',
      Web3ABI.decodeParameter('bool', approveReturn.data)
    )

    return approveReturn
  },
  async allowERC1155({ commit }, { wa, contractAddress }) {
    contractAddress = '0x15051D1Fcf470b976c600b43B735f96aF311c6eE'
    const erc1155ABI = require('../const/abis/ERC1155.json')
    console.log('ERC1155 ', erc1155ABI)

    const userProvider = new ethers.providers.Web3Provider(window.ethereum)

    const gasPrice = await estimate(userProvider)
    console.log('gasPrice ', gasPrice)

    const erc1155Instance = new ethers.Contract(
      contractAddress,
      erc1155ABI,
      userProvider.getSigner()
    )

    const approveReturn = await erc1155Instance.setApprovalForAll(
      contractAddress,
      Web3ABI.encodeParameter('bool', true),
      {}
    )
    console.log(
      'result from approval ',
      Web3ABI.decodeParameter('bool', approveReturn.data)
    )

    return approveReturn
  },
}
