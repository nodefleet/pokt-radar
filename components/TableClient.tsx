import Link from "next/link";
import DataTable from "./DataTable";
import { shortHash } from "@/utils";
import Pagination from "./Pagination";
import { transactions, blocks } from "@prisma/client";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";

export default function TableClient({
  transactions,
  PAGE_SIZE,
  totalTxns,
  page,
}: {
  transactions: transactions[];
  PAGE_SIZE: number;
  page: number;
  totalTxns: number;
}) {
  const tableHeaders = [
    "Tx Hash",
    "Block",
    "Method",
    "Time",
    "From",
    "",
    "To",
    "Value",
    "Txn Fee",
  ];
  return (
    <div className="bg-white p-5 rounded-xl shadow-xl overflow-x-auto">
      <div className="overflow-x-auto">
        <DataTable headers={tableHeaders}>
          {transactions.map((txn: transactions, index: number) => {
            return (
              <tr key={index} className="border-y border-gray-bera">
                <td className="border-0 font-bold text-blue_primary">
                  <Link href={`/transaction/${txn.hash}`}>
                    {txn.hash && shortHash(txn.hash)}
                  </Link>
                </td>
                <td className="border-0 capitalize text-blue_primary font-bold">
                  {Number(txn.block_number)}
                </td>
                <td className="border-0 capitalize text-gray-600 w-32">
                  <div className="bg-gray-100 text-center rounded-full">
                    Transfer
                  </div>
                </td>
                <td className="border-0 capitalize">
                  {txn.timestamp &&
                    new Date(Number(txn.timestamp) * 1000).toLocaleString()}
                </td>

                <td className="border-0 xl:pr-0 font-bold text-blue_primary w-14">
                  <Link href={`/address/${txn.from_address}`}>
                    {txn.from_address ? shortHash(txn.from_address) : "N/A"}
                  </Link>
                </td>
                <td className="border-0 text-black w-14">
                  <div
                    className="text-center rounded-lg"
                    style={{ background: "#B4EEC7", color: "#7DCA95" }}
                  >
                    <ArrowLongRightIcon
                      className="p-0.5"
                      style={{ stroke: "#7DCA95" }}
                    />
                  </div>
                </td>
                <td className="border-0 font-bold text-blue_primary -translate-x-4">
                  <Link href={`/address/${txn.to_address}`}>
                    {txn.to_address ? shortHash(txn.to_address) : "N/A"}
                  </Link>
                </td>
                <td className="border-0 text-black">{txn.value || "N/A"}</td>
                <td className="border-0 text-black">
                  {txn.max_fee_per_gas || "N/A"}
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
