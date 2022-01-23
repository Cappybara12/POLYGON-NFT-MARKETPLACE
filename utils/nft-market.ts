import Web3Model from "web3modal";
import { ethers } from "ethers";
import config from "../config";
import NFTMarket from "../artifacts/contracts/NFTMarket.sol/NFTMarket.json";
import NFT from "../artifacts/contracts/NFT.sol/NFT.json";
import { NFTMarket as nftMarketType } from "../typechain/NFTMarket";
import { NFT as nftType } from "../typechain/NFT";
import axios from "axios";

type fetchType = "marketItems" | "myNFTs" | "itemsCreated";

export async function getItems(fetch: fetchType) {
  const fetchMethodConvert = {
    marketItems: "fetchMarketItems",
    myNFTs: "fetchMyNFTs",
    itemsCreated: "fetchItemsCreated",
  };

  const web3Model = new Web3Model();
  const instance = await web3Model.connect();

  const provider = new ethers.providers.Web3Provider(instance);
  const signer = provider.getSigner();

  const nftMarketContract = new ethers.Contract(
    config.nftMarketAddress,
    NFTMarket.abi,
    signer
  ) as nftMarketType;

  const nftContract = new ethers.Contract(
    config.nftAddress,
    NFT.abi,
    signer
  ) as nftType;

  let items = await nftMarketContract[fetchMethodConvert[fetch]]();

  items = await Promise.all(
    items.map(async (item) => {
      const tokenURI = await nftContract.tokenURI(item.tokenId);
      const metaData = (await axios.get(tokenURI)).data;

      return {
        name: metaData.name,
        description: metaData.description,
        imageSrc: metaData.imageUrl,
        price: ethers.utils.formatUnits(item.price, "ether"),
      };
    })
  );

  return items;
}
