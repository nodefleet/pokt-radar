import Link from "next/link";
import { formatISO } from "date-fns";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

import FromNow from "@/components/FromNow";
import SearchBar from "@/components/SearchBar";
import DataTable from "@/components/DataTable";
import Pagination from "@/components/Pagination";
// import { getTransactions } from "@/utils/txns";
import { shortHash } from "@/utils";
import TransactionsChart from "@/components/TransactionsChart";
import { getTransactions } from "@/utils/txns";

export interface Transaction {
  hash: string;
  method: string;
  block: number;
  from: string;
  to: string;
  value: string;
  memo: string;
}

export default async function Transactions({
  searchParams,
}: {
  searchParams: { block: string | undefined; page: string | undefined };
}) {
  let filterByBlock =
    (searchParams.block &&
      !isNaN(parseInt(searchParams.block)) &&
      parseInt(searchParams.block)) ||
    undefined;

  const page =
    (searchParams.page &&
      !isNaN(parseInt(searchParams.page)) &&
      parseInt(searchParams.page)) ||
    1;

  const PAGE_SIZE = 10;
  const SKIP = (page >= 1 ? page - 1 : page) * PAGE_SIZE;
  const { transactions, count: totalTxns } = await getTransactions({
    take: PAGE_SIZE,
    skip: SKIP,
    block: filterByBlock,
  });

  const tableHeaders = [
    "Transaction ID",
    "Method",
    "Block",
    "From",
    "To",
    "Value",
    "Memo",
  ];

  const currentDate = new Date();
  const weeksArray = Array.from({ length: 10 }, (_, i) => {
    const date = new Date(
      currentDate.getTime() + (i + 1) * 60 * 60 * 1000
    ).toLocaleString("En-en", { timeStyle: "medium" });
    let count;
    if (i === 2) {
      count = 300;
    } else {
      count = i % 2 === 0 ? 100 * i : 300 - 100 * i;
      count = count < 0 ? 0 : count;
    }
    return {
      date: date,
      count: count,
    };
  });

  return (
    <div className="grow mx-4 md:mx-24 my-6">
      <div className="flex flex-col p-5 max-sm:pb-2 max-sm:pt-1 gap-7 h-full">
        <div className="mt-8 md:mt-0 p-5 max-sm:mt-0 bg-white rounded-3xl shadow-lg w-full">
          <div className="p-4 flex justify-between text-black">
            <div className="flex flex-col gap-3">
              <p className=" font-semibold text-xl">Transactions</p>
              <p className="font-medium text-lg">Avg Transactions</p>
              <span className="font-normal">68,002.01 M</span>
            </div>
            <div className="relative w-28">
              <label className="absolute right-2 top-3 translate-y-0.5 cursor-pointer">
                <i className="fa-solid fa-angle-down"></i>
              </label>
              <select
                className="border border-black py-3 text-base px-4 outline-none rounded-full appearance-none w-full cursor-pointer relative z-10 bg-transparent"
                id="selectMo"
              >
                <option value={1}>Last 24H</option>
                <option value={2}>Monthly</option>
              </select>
            </div>
          </div>
          <div className="w-full h-full max-h-96">
            <TransactionsChart data={weeksArray} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl shadow-xl overflow-x-auto">
          <p className="font-semibold text-xl pl-4">Latest Transactions</p>
          <DataTable headers={tableHeaders}>
            {transactions.map((txn, index: number) => {
              type JsonObject = { [key: string]: any };
              const stdtx = txn.stdtx as JsonObject;
              return (
                <tr key={index} className="border-y border-gray-bera">
                  <td className="border-0 text-black font-bold hover:text-blue_primary">
                    <Link href={`/transaction/${txn.hash}`}>
                      {txn.hash && shortHash(txn.hash)}
                    </Link>
                  </td>
                  <td className="border-0 w-6">
                    <p className="font-normal uppercase text-base rounded-full text-white bg-neutral-400/75 text-center py-0.5 px-4 truncate">
                      Transfer
                    </p>
                  </td>
                  <td className="border-0 font-bold text-black hover:text-blue_primary">
                    <Link href={`/block/${txn.height}`}>
                      {txn.height !== null ? txn.height.toString() : ""}
                    </Link>
                  </td>
                  <td className="border-0 xl:pr-0 font-bold text-black hover:text-blue_primary">
                    <Link href={`/address/${txn.from_address}`}>
                      {txn.from_address && shortHash(txn.from_address)}
                    </Link>
                  </td>
                  <td className="border-0 font-bold text-black hover:text-blue_primary">
                    <Link href={`/address/${txn.to_address}`}>
                      {txn.to_address && shortHash(txn.to_address)}
                    </Link>
                  </td>
                  <td className="border-0 text-black">
                    {stdtx?.msg?.value?.amount}
                  </td>
                  <td className="border-0 text-black">{stdtx?.memo}</td>
                </tr>
              );
            })}
          </DataTable>
          <div className="flex mt-4 justify-end">
            <Pagination
              path="/transaction"
              searchParams={{ block: filterByBlock }}
              currentPage={page}
              size={PAGE_SIZE}
              total={totalTxns}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
