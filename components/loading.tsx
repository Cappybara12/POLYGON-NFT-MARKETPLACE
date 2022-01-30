import BeatLoader from "react-spinners/BeatLoader";

export default function Loading() {
  return (
    <div className="text-white absolute top-0 left-0 w-full h-full bg-white flex justify-center items-center">
      <BeatLoader size={50} />
    </div>
  );
}
