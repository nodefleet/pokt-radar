import Image from "next/image";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import Stats from "@/components/Stats";
import BgHeader from "../public/bg-home.png";
import {
  LatestBlocksTable,
  LatestTransactionsTable,
} from "@/components/tables";

export const revalidate = 60;

export default async function Home() {
  return (
    <main className="pt-24 flex flex-col">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />
      <div
        className="h-[418px] w-full absolute top-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, #E9CA9A 0%, #B79973 48.23%, #81634A 99.98%, #987249 99.99%)",
        }}
      ></div>
      <Image
        src={BgHeader}
        className="h-[418px] w-full absolute top-0 -z-10"
        alt="Background lines"
      />
      <h1 className="mb-6 text-dark-brown text-4xl text-center">
        The Honeycomb Explorer
      </h1>
      <SearchBar />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mt-14 mb-9 w-11/12 self-center">
        {/* @ts-expect-error Async Server Component */}
        <Stats />
        <div className="flex flex-col bg-white px-4 py-6 rounded-xl shadow-xl overflow-x-auto">
          <h6 className="ml-3 mb-2 text-xl text-gray-3">Latest Blocks</h6>
          <hr />
          {/* @ts-expect-error Async Server Component */}
          <LatestBlocksTable />
          <Link
            href="/block"
            className="btn btn-outline mt-auto border-dark-brown text-dark-brown"
          >
            View all blocks
          </Link>
        </div>
        <div className="flex flex-col bg-white px-4 py-6 rounded-xl shadow-xl overflow-x-auto">
          <h6 className="ml-3 mb-2 text-xl text-gray-3">Latest Transactions</h6>
          <hr />
          {/* @ts-expect-error Async Server Component */}
          <LatestTransactionsTable />
          <Link
            href="/transaction"
            className="btn btn-outline mt-auto border-dark-brown text-dark-brown"
          >
            View all transactions
          </Link>
        </div>
      </div>
    </main>
  );
}
