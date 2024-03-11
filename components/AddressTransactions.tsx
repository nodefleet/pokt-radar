import Link from "next/link";
import DataTable from "./DataTable";
import ClientPagination from "./ClientPagination";
import { shortHash } from "@/utils";
import { Transaction } from "@/app/transaction/page";

export interface ITransaction {
  hash: string;
  from: string;
  to: string;
  time: string | undefined;
  block_height: string;
  gas: string;
}

export default async function AddressTransactions({
  transactions,
}: {
  transactions: Transaction[];
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
    <div className="flex flex-col">
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
        {/* <ClientPagination
          data={transactions}
          setRows={[]}
          perPage={10}
        /> */}
      </div>
    </div>
  );
}
