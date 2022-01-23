import SyncLoader from "react-spinners/BeatLoader";
import ItemCard from "../components/item-card";

type Item = {
  name: string;
  description: string;
  imageSrc: string;
  price: string;
  itemId: number;
};

type ItemsProps = {
  items: Item[];
  itemsLoaded: boolean;
  header: string;
};

export default function Items({ items, itemsLoaded, header }: ItemsProps) {
  return (
    <div className="flex flex-col justify-center items-center pt-4 mb-4">
      <h1 className="text-2xl">{header}</h1>
      <hr className="w-[50%] p-2" />
      {items.length && itemsLoaded ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item, index) => (
            <ItemCard
              itemId={item.itemId}
              key={index}
              name={item.name}
              description={item.description}
              imageSrc={item.imageSrc}
              price={item.price}
            />
          ))}
        </div>
      ) : (
        <p className="flex items-center justify-center h-40 text-3xl">
          {itemsLoaded ? "No Items available" : <SyncLoader size={20} />}
        </p>
      )}
    </div>
  );
}
