import Image from "next/image";

type NFTProps = {
  name: string;
  description: string;
  price: number;
};

export default function NFTCard({ name, description, price }: NFTProps) {
  return (
    <div className="w-[17rem] h-[25rem] rounded-lg flex flex-col justify-between overflow-hidden">
      <div className="">
        <img
          className="w-full h-full object-cover"
          src="/images/test.jpg"
          alt=""
        />
      </div>

      <div className="border-x-2 h-full p-2">
        <h1 className="text-lg font-bold">{name}</h1>

        <p className="text-slate-500 mt-4">{description}</p>
      </div>

      <div className="bg-black text-white h-[40%] p-2">
        <p className="font-bold my-2">{price} ETH</p>
        <button className="bg-pink-500 w-full rounded-sm font-bold py-1">
          Buy
        </button>
      </div>
    </div>
  );
}
