import Link from "next/link";
import Image from "next/image";

import Berchain from "../public/berachain.svg";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="flex-1">
        <Image src={Berchain} alt="Berachain logo" />
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
