import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Items from "../components/items";
import { getItems } from "../utils/nft-market";

const Home: NextPage = () => {
  const [items, setItems] = useState([]);
  const [itemsLoaded, setItemsLoaded] = useState(false);

  async function getMarketItems() {
    const items = await getItems("itemsCreated");
    setItems(items);
    setItemsLoaded(true);
  }

  useEffect(() => {
    getMarketItems();
  }, []);

  return <Items items={items} header="MarketPlace" itemsLoaded={itemsLoaded} />;
};

export default Home;