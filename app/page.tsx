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
    <main className=" flex flex-col">
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
