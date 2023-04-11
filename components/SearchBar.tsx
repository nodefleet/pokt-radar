import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function SearchBar({ width }: { width?: string }) {
  const containerWidth = width ? width : "w-11/12 lg:w-3/5";
  return (
    <div
      className={`flex items-center self-center  ${containerWidth} max-w-[800px] pl-5 rounded-xl bg-white`}
    >
      <input
        type="text"
        placeholder="Search by Address, Txn Hash, Block Height..."
        className="outline-0 grow"
      />
      <div className="h-full p-4 rounded-r-xl bg-dark-brown ">
        <MagnifyingGlassIcon className="w-5 h-5 text-white" />
      </div>
    </div>
  );
}
