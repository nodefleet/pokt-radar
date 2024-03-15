import Link from "next/link";
import DataTable from "./DataTable";
import { shortHash } from "@/utils";
import Pagination from "./Pagination";

export default function TableClient({
  transactions,
  block,
  PAGE_SIZE,
  totalTxns,
  page,
}: {
  transactions: any[];
  block: number | undefined;
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
            type JsonObject = { [key: string]: any };
            const stdtx = txn.stdtx as JsonObject;
            return (
              <tr key={index} className="border-y border-gray-bera">
                <td className="border-0 text-black font-bold hover:text-blue_primary">
                  <Link href={`/transaction/${txn.transaction_hash}`}>
                    {txn.transaction_hash && shortHash(txn.transaction_hash)}
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
                    {" "}
                    {txn.from_address ? shortHash(txn.from_address) : "N/A"}
                  </Link>
                </td>
                <td className="border-0 font-bold text-black hover:text-blue_primary">
                  <Link href={`/address/${txn.to_address}`}>
                    {txn.to_address ? shortHash(txn.to_address) : "N/A"}
                  </Link>
                </td>
                <td className="border-0 text-black">
                  {stdtx?.msg?.value?.amount || "N/A"}
                </td>
                <td className="border-0 text-black">{stdtx?.memo || "N/A"}</td>
              </tr>
            );
          })}
        </DataTable>
      </div>
      <div className="flex mt-4 justify-end max-sm:justify-center">
        <Pagination
          path="/transaction"
          searchParams={{ block: block }}
          currentPage={page}
          size={PAGE_SIZE}
          total={totalTxns}
        />
      </div>
    </div>
  );
}
