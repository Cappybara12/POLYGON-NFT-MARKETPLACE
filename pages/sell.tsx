import { NextPage } from "next";
import NewNFT from "../components/new-nft";

const Sell: NextPage = () => {
  return (
    <div className="flex flex-col justify-center items-center pt-4">
      <NewNFT />
    </div>
  );
};

export default Sell;
