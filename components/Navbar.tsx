"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import InputSearch from "./InputSearch";

export default function Navbar() {
  const pathname = usePathname();
  const Menu = [
    { name: "Home", path: "/" },
    { name: "Transactions", path: "/transaction" },
    { name: "Blocks", path: "/block" },
    { name: "Market", path: "/market" },
    { name: "Relays", path: "/relays" },
    { name: "Governance", path: "/governance" },
  ];

  return (
    <header className={`bg-white p-4 sticky top-0 z-50`}>
      <div className="flex-rows justify-between items-center w-full h-full flex  gap-4">
        <Link href="/">
          <Image
            src={"/img/logo.png"}
            width="100"
            height="100"
            className="w-56 h-full"
            alt="Berachain logo"
          />
        </Link>
        <InputSearch
          name="seacht"
          placeholder="Search by Address, Txn Hash, Block Height"
        />
        {Menu.map(({ name, path }, index) => (
          <Link
            key={index}
            className={`text-base font-semibold text-black_custom ${
              pathname === path && "text-blue_primary"
            }`}
            href={path}
          >
            {name}
          </Link>
        ))}
        <button className="px-10 py-3 bg-black rounded-full justify-center items-center gap-2 flex flex-row text-white">
          <div className="text-stone-50 text-base font-bold ">Testnet</div>
          <i className="fa-solid fa-angle-down translate-y-0.5"></i>
        </button>
      </div>
    </header>
  );
}
