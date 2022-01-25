import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Items from "../components/items";
import { getItems } from "../utils/nft-market";
import Web3Modal from "web3modal";
import { providerOptions } from "../config/providerOptions";

import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

let web3Modal: Web3Modal;
if (typeof window !== "undefined") {
  web3Modal = new Web3Modal({
    cacheProvider: true,
    providerOptions,
  });
}

const Home: NextPage = () => {
  const [items, setItems] = useState([]);
  const [itemsLoaded, setItemsLoaded] = useState(false);
  const { provider, web3Provider, address, chainId } = useSelector(
    (state: RootState) => state.web3
  );

  async function getMarketItems() {
    const items = await getItems(web3Provider, "marketItems");
    setItems(items);
    setItemsLoaded(true);
  }

  useEffect(() => {
    getMarketItems();
  }, []);

  return <Items items={items} header="MarketPlace" itemsLoaded={itemsLoaded} />;
};

export default Home;
