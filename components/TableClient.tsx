import Link from "next/link";
import DataTable from "./DataTable";
import { shortHash } from "@/utils";
import Pagination from "./Pagination";
import { Transaction } from "@/utils/interface";

export default function TableClient({
  transactions,
  PAGE_SIZE,
  totalTxns,
  page,
}: {
  transactions: Transaction[];
  PAGE_SIZE: number;
  page: number;
  totalTxns: number;
}) {
  const tableHeaders = [
    "Transaction ID",
    "Method",
    "Block",
    "From",
    "To",
    "Value",
    "Memo",
  ];

  return (
    <div className="bg-white p-5 rounded-xl shadow-xl overflow-x-auto">
      <p className="font-semibold text-xl pl-4">Latest Transactions</p>
      <div className="overflow-x-auto">
        <DataTable headers={tableHeaders}>
          {transactions.map((txn, index: number) => {
            return (
              <tr key={index} className="border-y border-gray-bera">
                <td className="border-0 text-black font-bold hover:text-blue_primary">
                  <Link href={`/transaction/${txn.tx_hash}`}>
                    {txn.tx_hash && shortHash(txn.tx_hash)}
                  </Link>
                </td>
                <td className="border-0 w-6">
                  <p className="font-normal uppercase text-base rounded-full text-white bg-neutral-400/75 text-center py-0.5 px-4 truncate">
                    Transfer
                  </p>
                </td>
                <td className="border-0 font-bold text-black hover:text-blue_primary">
                  <Link href={`/block/${txn.height}`}>
                    {txn.height !== null && txn.height !== null
                      ? txn.height.toString()
                      : "N/A"}
                  </Link>
                </td>
                <td className="border-0 xl:pr-0 font-bold text-black hover:text-blue_primary">
                  <Link href={`/address/${txn.from_address}`}>
                    {txn.from_address ? shortHash(txn.from_address) : "N/A"}
                  </Link>
                </td>
                <td className="border-0 font-bold text-black hover:text-blue_primary">
                  <Link href={`/address/${txn.to_address}`}>
                    {txn.to_address ? shortHash(txn.to_address) : "N/A"}
                  </Link>
                </td>
                <td className="border-0 text-black">
                  {txn.amount.toLocaleString() || "N/A"}
                </td>
                <td className="border-0 text-black">{txn.memo || "N/A"}</td>
              </tr>
            );
          })}
        </DataTable>
      </div>
      <div className="flex mt-4 justify-end max-sm:justify-center">
        <Pagination
          path="/transaction"
          currentPage={page}
          size={PAGE_SIZE}
          total={totalTxns}
        />
      </div>
    </div>
  );
}
