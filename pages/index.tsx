import type { NextPage } from "next";
import { useEffect, useState } from "react";
import ItemCard from "../components/item-card";
import Web3Model from "web3modal";
import { ethers } from "ethers";
import config from "../config";
import NFTMarket from "../artifacts/contracts/NFTMarket.sol/NFTMarket.json";
import NFT from "../artifacts/contracts/NFT.sol/NFT.json";
import { NFTMarket as nftMarketType } from "../typechain/NFTMarket";
import { NFT as nftType } from "../typechain/NFT";
import axios from "axios";

const Home: NextPage = () => {
  const [items, setItems] = useState([]);

  async function getMarketItems() {
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

    const marketItems = await nftMarketContract.fetchMarketItems();

    const items = await Promise.all(
      marketItems.map(async (item) => {
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

    console.log(items);

    setItems(items);
  }

  useEffect(() => {
    getMarketItems();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center pt-4">
      <h1 className="text-2xl">MarketPlace</h1>
      <hr className="w-[50%] p-2" />
      {items.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <ItemCard
              name={item.name}
              description={item.description}
              imageSrc={item.imageSrc}
              price={item.price}
            />
          ))}
        </div>
      ) : (
        <p className="flex items-center justify-center h-40 text-3xl">
          No Items in the MarketPlace
        </p>
      )}
    </div>
  );
};

export default Home;
