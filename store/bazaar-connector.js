import { ethers } from 'ethers'
import Web3Utils from "web3-utils";
import Web3ABI from 'web3-eth-abi';

const BN = Web3Utils.BN;
const EtherUnit = Web3Utils.toWei('1');

const TRADE_TYPE = 
{
    NON : 0, 
    ERC20 : 1, 
    ERC1155 : 2, 
    ERC721 : 3, 
    NATIVE : 4 
}

export const actions = {

    /**
     * 
     * contractAddress - web3bazaar contract address
     * creatorAssetContract - creator address
     * creatorAssetId - creator assset ID
     * creatorAmount - amount for creator trader
     * creatorAssetType - creator asset type
     * 
     * executorWalletAdd - executer wallet address
     * executorAssetContract -executer wallet address
     * executorAssetId - executer asset id
     * executorAmount - executer amount for erc1155/erc20
     * executorAssetType - ERC20| ERC721 | ERC1155
     * 
     * @param {*} param0 
     * @param {*} param1 
     * @returns 
     */
    async startTrade({ commit, rootState }, { wa, contractAddress, creatorAssetContract, creatorAssetId, creatorAmount, creatorAssetType,
        executorWalletAdd, executorAssetContract, executorAssetId, executorAmount, executorAssetType  }) 
    {
        // samples 
        contractAddress = "0xbB18df3ca10583Daa4327161d10F65B1A7c63282";
        creatorAssetContract = "0x02390dBA46A107F0728DAA98f920aec171502B22"
        creatorAssetId = 1;
        creatorAmount = 2;
        creatorAssetType = TRADE_TYPE.ERC721;

        executorWalletAdd = "0xA7Cc2E2050A607c813437C1c074f82322Cc0C8aE";
        executorAssetContract = "0xbB18df3ca10583Daa4327161d10F65B1A7c63282";
        executorAssetId = 100;
        executorAmount = 5;
        executorAssetType = TRADE_TYPE.ERC721;

        const webazaarABI = require('../const/abis/webazaar.json');
        console.log('webazaar abi : ', webazaarABI);

        const userProvider = new ethers.providers.Web3Provider(window.ethereum)
        // const gasPrice = await estimate(userProvider);

        const bazaarInstance = new ethers.Contract(
            contractAddress,
            webazaarABI,
            userProvider.getSigner()
        );
        
        const _creatorAmount = new BN(creatorAmount).mul(new BN(EtherUnit));
        const _executorAmount = new BN(executorAmount).mul(new BN(EtherUnit));
        
        const approveReturn = await bazaarInstance.startTrade(
            Web3ABI.encodeParameter('address', creatorAssetContract), 
            Web3ABI.encodeParameter('uint256', creatorAssetId) ,
            Web3ABI.encodeParameter('uint256', _creatorAmount) ,
            Web3ABI.encodeParameter('uint8',   creatorAssetType) ,
            Web3ABI.encodeParameter('address', executorWalletAdd),
            Web3ABI.encodeParameter('address', executorAssetContract), 
            Web3ABI.encodeParameter('uint256', executorAssetId), 
            Web3ABI.encodeParameter('uint256', _executorAmount),
            Web3ABI.encodeParameter('uint8',   executorAssetType),
        {});

        console.log('result from start Trade ', Web3ABI.decodeParameter('bool', approveReturn.data ));

        return approveReturn;
    },

    async claimBack({ commit }, { wa, contractAddress  }) 
    {

        contractAddress = "0x0ab1dc6500d0F1507dACbbA7AEDb9F44551B398A";
        const erc721ABI = require('../const/abis/erc721.json');
        console.log('ERC721 ', erc721ABI);

        const userProvider = new ethers.providers.Web3Provider(window.ethereum)

        // const gasPrice = await estimate(userProvider);

        const erc721Instance = new ethers.Contract(
            contractAddress,
            erc721ABI,
            userProvider.getSigner()
        );

        const approveReturn = await erc721Instance.setApprovalForAll(contractAddress, Web3ABI.encodeParameter('bool', true ) , {})  
        console.log('result from approval ', Web3ABI.decodeParameter('bool', approveReturn.data ));

        return approveReturn;        
    },

    async claim({ commit }, { wa, contractAddress  }) 
    {
        
        contractAddress = "0x15051D1Fcf470b976c600b43B735f96aF311c6eE";
        const erc1155ABI = require('../const/abis/erc1155.json');
        console.log('ERC1155 ', erc1155ABI);

        const userProvider = new ethers.providers.Web3Provider(window.ethereum)

        // const gasPrice = await estimate(userProvider);

        const erc1155Instance = new ethers.Contract(
            contractAddress,
            erc1155ABI,
            userProvider.getSigner()
        );

        const approveReturn = await erc1155Instance.setApprovalForAll(contractAddress, Web3ABI.encodeParameter('bool', true ) , {})  
        console.log('result from approval ', Web3ABI.decodeParameter('bool', approveReturn.data ));

        return approveReturn;

    },

    async getTradeInfo({ commit }, { wa, tradeId  }) 
    {
        
        contractAddress = "0x15051D1Fcf470b976c600b43B735f96aF311c6eE";
        const erc1155ABI = require('../const/abis/erc1155.json');
        console.log('ERC1155 ', erc1155ABI);

        const userProvider = new ethers.providers.Web3Provider(window.ethereum)

        // const gasPrice = await estimate(userProvider);

        const erc1155Instance = new ethers.Contract(
            contractAddress,
            erc1155ABI,
            userProvider.getSigner()
        );

        const approveReturn = await erc1155Instance.setApprovalForAll(contractAddress, Web3ABI.encodeParameter('bool', true ) , {})  
        console.log('result from approval ', Web3ABI.decodeParameter('bool', approveReturn.data ));

        return approveReturn;

    },

    async getOpenTrades({ commit }, { wa }) 
    {
        
        contractAddress = "0x15051D1Fcf470b976c600b43B735f96aF311c6eE";
        const erc1155ABI = require('../const/abis/erc1155.json');
        console.log('ERC1155 ', erc1155ABI);

        const userProvider = new ethers.providers.Web3Provider(window.ethereum)

        // const gasPrice = await estimate(userProvider);

        const erc1155Instance = new ethers.Contract(
            contractAddress,
            erc1155ABI,
            userProvider.getSigner()
        );

        const approveReturn = await erc1155Instance.setApprovalForAll(contractAddress, Web3ABI.encodeParameter('bool', true ) , {})  
        console.log('result from approval ', Web3ABI.decodeParameter('bool', approveReturn.data ));

        return approveReturn;

    }


}