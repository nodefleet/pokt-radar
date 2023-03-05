import Link from "next/link"
import Image from "next/image"

import Berchain from "../public/berachain.svg"

export default function Navbar() {
    return (
      <header className="navbar">
        <div className="flex-1">
          <Image src={Berchain} alt="Berachain logo" />
        </div>
        <div className="flex-none">
          <Link className="mr-7" href="/">Home</Link>
          <Link className="mr-7" href="/transactions">Transactions</Link>
          <Link className="mr-10" href="/blocks">Blocks</Link>
        </div>
      </header>
    )
}