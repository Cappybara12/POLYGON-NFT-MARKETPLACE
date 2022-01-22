import type { NextPage } from "next";
import NFTCard from "../components/nft-card";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col justify-center items-center pt-4">
      <h1 className="text-2xl">MarketPlace</h1>
      <hr className="w-[50%] p-2" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <NFTCard name="test" description="test test test test" price={1} />
        <NFTCard name="test" description="test test test test" price={1} />
        <NFTCard name="test" description="test test test test" price={1} />
        <NFTCard name="test" description="test test test test" price={1} />
        <NFTCard name="test" description="test test test test" price={1} />
        <NFTCard name="test" description="test test test test" price={1} />
      </div>
    </div>
  );
};

export default Home;
