import Link from "next/link";
import DataTable from "./DataTable";
import { shortHash } from "@/utils";
import Pagination from "./Pagination";

export default function TableClient({
  transactions,
  PAGE_SIZE,
  totalTxns,
  page,
}: {
  transactions: any[];
  PAGE_SIZE: number;
  page: number;
  totalTxns: number;
}) {
  const tableHeaders = [
    "Transaction ID",
    "Status",
    "Type",
    "Block",
    "From",
    "To",
    "Value",
    "Memo",
    "Date & Time",
  ];
  return (
    <div className="bg-white p-5 rounded-xl shadow-xl overflow-x-auto">
      <p className="font-semibold text-xl pl-4">Latest Transactions</p>
      <div className="overflow-x-auto">
        <DataTable headers={tableHeaders}>
          {transactions
            .filter((txn) => txn._id)
            .map((txn, index: number) => {
              return (
                <tr key={index} className="border-y border-gray-bera">
                  <td className="border-0 text-black font-bold hover:text-blue_primary">
                    <Link href={`/transaction/${txn.hash}`}>
                      {txn.hash && shortHash(txn.hash)}
                    </Link>
                  </td>
                  <td className="border-0 w-8">
                    <p
                      className={`font-normal uppercase text-base rounded-full text-white -translate-x-4 ${
                        txn.result_code === 0
                          ? "bg-green-600"
                          : txn.pending
                          ? "bg-amber-600"
                          : txn.result_code !== 0 && "bg-red-600"
                      } text-center py-0.5 px-4 truncate`}
                    >
                      {txn.result_code === 0
                        ? "Success"
                        : txn.pending
                        ? "Pending"
                        : txn.result_code !== 0 && "Failed"}
                    </p>
                  </td>
                  <td className="border-0 capitalize">{txn.type}</td>
                  <td className="border-0 font-bold text-black hover:text-blue_primary">
                    <Link href={`/block/${txn.height}`}>
                      {txn.height && txn.height.toString()}
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
                    {txn.type === "proof"
                      ? txn.total_pokt.toFixed(2) + " POKT"
                      : txn.amount === 0
                      ? "-"
                      : parseFloat(
                          (txn.amount / 10 ** 6).toFixed(2)
                        ).toLocaleString() + " POKT" || "N/A"}
                  </td>
                  <td className="border-0 text-black">{txn.memo || "N/A"}</td>
                  <td className="border-0 text-black">
                    {txn.block_time &&
                      new Date(txn.block_time).toLocaleString()}
                  </td>
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
