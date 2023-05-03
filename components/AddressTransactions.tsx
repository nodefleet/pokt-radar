"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  MagnifyingGlassIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import FromNow from "./FromNow";
import DataTable from "./DataTable";
import ClientPagination from "./ClientPagination";
import { shortHash } from "@/utils";

export interface ITransaction {
  hash: string;
  from: string;
  to: string;
  time: string | undefined;
  block_height: string;
  gas: string;
}

function SearchBar({
  txns,
  setFilteredTxns,
}: {
  txns: ITransaction[];
  setFilteredTxns: CallableFunction;
}) {
  const [filterBy, setFilter] = useState<string | null>(null);

  useEffect(() => {
    if (filterBy && filterBy.length > 37) {
      setFilteredTxns(
        txns.filter(
          (txn) => txn.from.includes(filterBy) || txn.to.includes(filterBy)
        )
      );
    } else {
      setFilteredTxns(txns);
    }
  }, [filterBy, setFilteredTxns, txns]);
  return (
    <div className="flex items-center w-2/5 mb-5 px-3 py-2 self-end border border-gray-6 rounded-xl text-gray-6">
      <input
        className="outline-0 grow text-gray-3"
        type="text"
        placeholder="Filter by address"
        onChange={(value) => setFilter(value.target.value)}
      />
      <MagnifyingGlassIcon className="w-4 h-4" />
    </div>
  );
}

export default function AddressTransactions({
  transactions,
}: {
  transactions: ITransaction[];
}) {
  const tableHeaders = ["Tx Hash", "Block", "Time", "From", "", "To", "Fee"];
  const [filteredTxns, setFilteredTxns] = useState<ITransaction[]>([]);
  const [displayRows, setDisplayRows] = useState<ITransaction[]>([]);

  return (
    <div className="flex flex-col">
      <SearchBar txns={transactions} setFilteredTxns={setFilteredTxns} />
      <DataTable headers={tableHeaders} small={true}>
        {displayRows.map((txn, index: number) => (
          <tr key={index} className="border-y border-gray-bera">
            <td className="border-0 text-link">
              <Link href={`/transaction/${txn.hash}`}>
                {shortHash(txn.hash)}
              </Link>
            </td>
            <td className="border-0 text-link">
              <Link href={`/block/${txn.block_height}`}>
                {txn.block_height}
              </Link>
            </td>
            <td className="border-0">
              {txn.time && <FromNow datetime={txn.time} />}
            </td>
            <td className="border-0 pr-0 text-link">
              <Link href={`/address/${txn.from}`}>{shortHash(txn.from)}</Link>
            </td>
            <td className="border-0 pl-0">
              <div className="flex">
                <div className="flex justify-center bg-green-2 p-1 rounded-md">
                  <ArrowRightIcon className="w-3 h-3" />
                </div>
                <p className=""></p>
              </div>
            </td>
            <td className="border-0 text-link">
              <Link href={`/address/${txn.to}`}>{shortHash(txn.to)}</Link>
            </td>
            <td className="border-0">{txn.gas}</td>
          </tr>
        ))}
      </DataTable>
      <div className="flex mt-4 justify-end">
        <ClientPagination
          data={filteredTxns}
          setRows={setDisplayRows}
          perPage={10}
        />
      </div>
    </div>
  );
}
