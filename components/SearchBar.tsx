"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function SearchBar({ width }: { width?: string }) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const containerWidth = width ? width : "w-11/12 lg:w-3/5";

  const handleSearch = (event?: any) => {
    if (event && event.key !== "Enter") {
      return;
    }

    if (/^\d+$/.test(search)) {
      router.push(`/block/${search}`);
    } else if (/^0x([A-Fa-f0-9]{64})$/.test(search)) {
      router.push(`/transaction/${search}`);
    } else if (/^0x[a-fA-F0-9]{40}$/.test(search)) {
      router.push(`/address/${search}`);
    }
  };

  return (
    <div
      className={`flex items-center self-center  ${containerWidth} max-w-[800px] pl-5 rounded-xl bg-white`}
    >
      <input
        type="text"
        placeholder="Search by Address, Txn Hash, Block Height..."
        className="outline-0 grow"
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => handleSearch(e)}
      />
      <div
        className="h-full p-4 rounded-r-xl bg-dark-brown "
        onClick={() => handleSearch()}
      >
        <MagnifyingGlassIcon className="w-5 h-5 text-white" />
      </div>
    </div>
  );
}
