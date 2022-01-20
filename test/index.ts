import { expect } from "chai";
import { ethers } from "hardhat";

import { NFT } from "typechain/NFT";
import { NFTMarket } from "typechain/NFTMarket";

describe("NFT Market Place", function () {
  it("Should create and execute market sales", async function () {
    const NFTMarket = await ethers.getContractFactory("NFTMarket");
    const nftMarket = (await NFTMarket.deploy()) as NFTMarket;
    await nftMarket.deployed();

    const NFT = await ethers.getContractFactory("NFT");
    const nft = (await NFT.deploy(nftMarket.address)) as NFT;
    await nft.deployed();

    const [owner, seller, buyer] = await ethers.getSigners();

    await nft.connect(seller).createToken("http://test.com");
    await nft.connect(seller).createToken("http://test2.com");

    const listingPrice = await nftMarket.getListingPrice();
    const tokenPrice = ethers.utils.parseUnits("1", "ether");

    await nftMarket
      .connect(seller)
      .createMarketItem(nft.address, 0, tokenPrice, {
        value: listingPrice,
      });

    await nftMarket
      .connect(seller)
      .createMarketItem(nft.address, 1, tokenPrice, {
        value: listingPrice,
      });

    await nftMarket.connect(buyer).createMarketSale(0, { value: tokenPrice });

    let marketItems;
    let myNFTs;
    let createNFTs;

    marketItems = await nftMarket.fetchMarketItems();
    myNFTs = await nftMarket.connect(buyer).fetchMyNFTs();
    createNFTs = await nftMarket.connect(seller).fetchItemsCreated();

    expect(marketItems.length).to.equal(1);
    expect(myNFTs.length).to.equal(1);
    expect(myNFTs[0].tokenId.toString()).to.equal("0");
    expect(createNFTs.length).to.equal(2);

    marketItems = await Promise.all(
      marketItems.map(async (i) => {
        const tokenURI = await nft.tokenURI(i.tokenId);

        const item = {
          tokenURI,
          tokenId: i.tokenId.toString(),
          seller: i.seller,
          owner: i.owner,
          price: i.price.toString(),
        };
        return item;
      })
    );

    console.log(marketItems);
  });
});
