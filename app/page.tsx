import Link from "next/link";
import Stats from "@/components/Stats";
import {
  LatestBlocksTable,
  LatestTransactionsTable,
} from "@/components/tables";
import Stadist from "@/components/Stadist";
// import { getLatestTransactions } from "@/utils/txns";
import { getLatestBlocks } from "@/utils/blocks";

export const revalidate = 60;

export default async function Home() {
  // const latestTransactionsData = getLatestTransactions();
  return (
    <main className="flex flex-col py-11 px-10 max-sm:p-4 ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full self-center">
        {/* @ts-expect-error Async Server Component */}
        <Stats />
        <Stadist />
        <div className="flex flex-col bg-white px-4 py-6 rounded-xl shadow-xl max-sm:col-span-2 w-full">
          <div className="overflow-x-auto w-full">
            <h6 className="ml-3 mb-2 text-xl text-black">Latest Blocks</h6>
            <hr />
            {/* @ts-expect-error Async Server Component */}
            <LatestBlocksTable />
          </div>
          <Link
            href="/block"
            className="btn btn-outline mt-2 border-black text-black rounded-full"
          >
            View all blocks
          </Link>
        </div>
        <div className="flex flex-col bg-white px-4 py-6 rounded-xl shadow-xl max-sm:col-span-2 w-full">
          <div className="overflow-x-auto w-full">
            <h6 className="ml-3 mb-2 text-xl text-black">
              Latest Transactions
            </h6>
            <hr />
            {/* @ts-expect-error Async Server Component */}
            {/* <LatestTransactionsTable /> */}
          </div>
          <Link
            href="/transaction"
            className="btn btn-outline mt-2 border-black text-black rounded-full"
          >
            View all transactions
          </Link>
        </div>
      </div>
    </main>
  );
}
