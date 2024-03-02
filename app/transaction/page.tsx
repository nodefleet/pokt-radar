import Link from "next/link";
import { formatISO } from "date-fns";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

import FromNow from "@/components/FromNow";
import SearchBar from "@/components/SearchBar";
import DataTable from "@/components/DataTable";
import Pagination from "@/components/Pagination";
import { getTransactions } from "@/utils/txns";
import { shortHash } from "@/utils";
import TransactionsChart from "@/components/TransactionsChart";

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
  // const { transactions, count: totalTxns } = await getTransactions({
  //   take: PAGE_SIZE,
  //   skip: SKIP,
  //   block: filterByBlock,
  // });

  const transactions: Transaction[] = [
    {
      hash: "0x123456789abcdef1",
      method: "Transfer",
      block: 1234,
      from: "0x9876543210ABCDEF1",
      to: "0xFEDCBA0987654321",
      value: "0.005 ETH",
      memo: "Payment for services rendered",
    },
    {
      hash: "0x123456789abcdef2",
      method: "Swap",
      block: 1235,
      from: "0x9876543210ABCDEF2",
      to: "0xFEDCBA0987654322",
      value: "0.01 ETH",
      memo: "Exchange transaction",
    },
    {
      hash: "0x123456789abcdef3",
      method: "Transfer",
      block: 1236,
      from: "0x9876543210ABCDEF3",
      to: "0xFEDCBA0987654323",
      value: "0.0025 ETH",
      memo: "Test transaction",
    },
    {
      hash: "0x123456789abcdef4",
      method: "Transfer",
      block: 1237,
      from: "0x9876543210ABCDEF4",
      to: "0xFEDCBA0987654324",
      value: "0.003 ETH",
      memo: "Transaction memo",
    },
    {
      hash: "0x123456789abcdef5",
      method: "Swap",
      block: 1238,
      from: "0x9876543210ABCDEF5",
      to: "0xFEDCBA0987654325",
      value: "0.015 ETH",
      memo: "Swap details",
    },
    {
      hash: "0x123456789abcdef6",
      method: "Transfer",
      block: 1239,
      from: "0x9876543210ABCDEF6",
      to: "0xFEDCBA0987654326",
      value: "0.007 ETH",
      memo: "Transaction notes",
    },
    {
      hash: "0x123456789abcdef7",
      method: "Swap",
      block: 1240,
      from: "0x9876543210ABCDEF7",
      to: "0xFEDCBA0987654327",
      value: "0.02 ETH",
      memo: "Swap details",
    },
    {
      hash: "0x123456789abcdef8",
      method: "Transfer",
      block: 1241,
      from: "0x9876543210ABCDEF8",
      to: "0xFEDCBA0987654328",
      value: "0.009 ETH",
      memo: "Payment memo",
    },
    {
      hash: "0x123456789abcdef9",
      method: "Transfer",
      block: 1242,
      from: "0x9876543210ABCDEF9",
      to: "0xFEDCBA0987654329",
      value: "0.0055 ETH",
      memo: "Payment details",
    },
    {
      hash: "0x123456789abcdef10",
      method: "Swap",
      block: 1243,
      from: "0x9876543210ABCDEF10",
      to: "0xFEDCBA09876543210",
      value: "0.025 ETH",
      memo: "Swap notes",
    },
  ];

  const tableHeaders = [
    "Transaction ID",
    "Method",
    "Block",
    "From",
    "To",
    "Value",
    "Memo",
  ];

  const weeksArray = Array.from({ length: 10 }, (_, i) => ({
    date: `week ${(i + 1).toString().padStart(2, "0")}`,
    count: i === 5 ? 300 : 100 * i,
  }));

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
            {transactions.map((txn, index: number) => (
              <tr key={index} className="border-y border-gray-bera">
                <td className="border-0 text-black font-bold hover:text-blue_primary">
                  <Link href={`/transaction/${txn.hash}`}>
                    {txn.hash && shortHash(txn.hash)}
                  </Link>
                </td>
                <td className="border-0">
                  <p className="font-normal uppercase text-base rounded-full text-white bg-neutral-400/75 text-center py-0.5 px-4 truncate">
                    {txn.method}
                  </p>
                </td>
                <td className="border-0 font-bold text-black hover:text-blue_primary">
                  <Link href={`/block/${txn.block}`}>
                    {txn.block && txn.block.toString()}
                  </Link>
                </td>
                <td className="border-0 xl:pr-0 font-bold text-black hover:text-blue_primary">
                  <Link href={`/address/${txn.from}`}>
                    {txn.from && shortHash(txn.from)}
                  </Link>
                </td>
                <td className="border-0 font-bold text-black hover:text-blue_primary">
                  <Link href={`/address/${txn.to}`}>
                    {txn.to && shortHash(txn.to)}
                  </Link>
                </td>
                <td className="border-0 text-black">{txn.value}</td>
                <td className="border-0 text-black">{txn.memo}</td>
              </tr>
            ))}
          </DataTable>
          <div className="flex mt-4 justify-end">
            <Pagination
              path="/transaction"
              searchParams={{ block: filterByBlock }}
              currentPage={page}
              size={PAGE_SIZE}
              total={transactions.length}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
