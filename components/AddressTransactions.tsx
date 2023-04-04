"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import moment from "moment";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import DataTable from "./DataTable";
import ClientPagination from "./ClientPagination";
import { shortHash } from "@/utils";

export interface ITransaction {
  hash: string;
  from: string;
  to: string;
  time: string | undefined;
  block_height: string;
}

function SearchBar({
  txns,
  filteredTxns,
  setFilteredTxns,
}: {
  txns: ITransaction[];
  filteredTxns: ITransaction[];
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
    } else if (filteredTxns.length < txns.length) {
      setFilteredTxns(txns);
    }
  }, [filterBy]);
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
  const tableHeaders = ["Tx Hash", "Block", "Time", "From", "To"];
  const [filteredTxns, setFilteredTxns] = useState<ITransaction[]>([]);
  const [displayRows, setDisplayRows] = useState<ITransaction[]>([]);

  return (
    <div className="flex flex-col">
      <SearchBar
        txns={transactions}
        filteredTxns={filteredTxns}
        setFilteredTxns={setFilteredTxns}
      />
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
            <td className="border-0">{moment(txn.time).fromNow()}</td>
            <td className="border-0 text-link">
              <Link href={`/address/${txn.from}`}>{shortHash(txn.from)}</Link>
            </td>
            <td className="border-0 text-link">
              <Link href={`/address/${txn.to}`}>{shortHash(txn.to)}</Link>
            </td>
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
