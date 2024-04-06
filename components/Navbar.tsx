"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import InputSearch from "./InputSearch";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [paths, setPaths] = useState("/");
  const [active, setActive] = useState(true);
  const pathname = usePathname();
  const Menu = [
    { name: "Home", path: "/home" },
    { name: "Transactions", path: "/transaction" },
    { name: "Blocks", path: "/block" },
    { name: "Market", path: "/market" },
    { name: "Relays", path: "/relay" },
    { name: "Governance", path: "/governance" },
  ];
  useEffect(() => {
    setTimeout(() => setActive(false), 1000);
  }, [pathname, paths]);

  return (
    <header className={`bg-white px-3 py-1 sticky top-0 z-50`}>
      <div className="flex-rows justify-between items-center w-full h-full flex gap-2">
        <Link href="/home">
          <Image
            src={"/img/logo.svg"}
            width="100"
            height="100"
            className="w-56 h-full"
            alt="Berachain logo"
          />
        </Link>
        <div className="mobileMenu w-full flex justify-end group">
          <button
            type="button"
            className="lg:hidden md:hidden flex items-center p-2 rounded-lg float-end bg-black"
          >
            <i className="fa-solid fa-bars text-2xl text-white"></i>
          </button>
          <div className="flex lg:flex-rows md:flex-rows max-sm:flex-col max-sm:opacity-0 max-sm:max-h-0 overflow-hidden justify-between items-center w-full h-full lg:gap-4 md:gap-2 max-sm:gap-2 max-sm:w-64 max-sm:group-hover:max-h-80 max-sm:group-hover:h-96 max-sm:group-hover:opacity-100 transition-all max-sm:absolute max-sm:bg-white max-sm:p-4 max-sm:right-0 max-sm:top-0 max-sm:items-end max-sm:rounded-bl-xl max-sm:shadow-md">
            <InputSearch
              name="seacht"
              className="max-sm:w-0 max-sm:focus:w-full max-sm:focus:translate-x-2 transition-all"
              classIconName="max-sm:right-0 max-sm:absolute max-sm:left-4 max-sm:opacity-50 max-sm:w-0"
              placeholder="Search by Address, Txn Hash, Block Height"
            />
            {Menu.map(({ name, path }, index) => (
              <Link
                key={index}
                className={`text-base font-semibold text-black_custom ${
                  pathname === path && "text-blue_primary"
                }`}
                onClick={() => {
                  if (path !== pathname) {
                    setPaths(path);
                    setActive(true);
                  }
                }}
                href={path}
              >
                {active && paths === path ? (
                  <i className="fa-solid fa-spinner animate-spin"></i>
                ) : (
                  name
                )}
              </Link>
            ))}
            <button className="px-10 py-3 bg-black rounded-full justify-center items-center gap-2 flex flex-row text-white">
              <div className="text-stone-50 text-base font-bold ">Mainnet </div>
              <i className="fa-solid fa-angle-down translate-y-0.5"></i>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
