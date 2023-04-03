"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import Berchain from "../public/berachain.svg";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header
      className={`navbar ${
        (pathname === "/" && "bg-transparent") || "bg-white"
      }`}
    >
      <div className="flex-1">
        <Link href="/">
          <Image src={Berchain} alt="Berachain logo" />
        </Link>
      </div>
      <div className="flex-none">
        <Link className="mr-7 text-dark-brown" href="/">
          Home
        </Link>
        <Link className="mr-7 text-dark-brown" href="/transaction">
          Transactions
        </Link>
        <Link className="mr-10 text-dark-brown" href="/block">
          Blocks
        </Link>
      </div>
    </header>
  );
}
