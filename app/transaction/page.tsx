import moment from "moment";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import DataTable from "@/components/DataTable";
import Pagination from "@/components/Pagination";
import { getTransactions } from "../utils/getTransactions";
import { shortHash } from "../utils";

export default async function Transactions() {
  const tableHeaders = ["Tx Hash", "Block", "Time", "From", "To"];

  const transactions = await getTransactions();

  return (
    <div className="mx-24">
      <div className="flex justify-between my-10 items-center">
        <h1 className="text-gray-3 text-2xl">Transactions</h1>
        <SearchBar />
      </div>

      <div className="bg-white mt-6 mb-10 p-5 rounded-xl shadow-xl">
        <DataTable headers={tableHeaders}>
          {transactions.map((txn, index: number) => (
            <tr key={index} className="border-y border-gray-bera">
              <td className="border-0 text-link">
                <Link href={`/transactions/${txn.hash}`}>
                  {shortHash(txn.hash)}
                </Link>
              </td>
              <td className="border-0">{txn.block}</td>
              <td className="border-0">{moment(txn.createdAt).fromNow()}</td>
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
          <Pagination />
        </div>
      </div>
    </div>
  );
}
