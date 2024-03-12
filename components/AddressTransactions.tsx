import Link from "next/link";
import DataTable from "./DataTable";
import ClientPagination from "./ClientPagination";
import { shortHash } from "@/utils";
import { Transaction } from "@/app/transaction/page";
import { getTransactionsByBlock } from "@/utils/txns";

export interface ITransaction {
  hash: string;
  from: string;
  to: string;
  time: string | undefined;
  block_height: string;
  gas: string;
}

export default async function AddressTransactions({
  params,
}: {
  params: number;
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
  const transactions = await getTransactionsByBlock(params);
  console.log(transactions);
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
                Transfer
              </p>
            </td>
            <td className="border-0 font-bold text-black hover:text-blue_primary">
              <Link href={`/block/${txn.height}`}>
                {txn.height && txn.height.toString()}
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
              {txn.amount && (txn.amount as unknown as number)}
            </td>
            <td className="border-0 text-black">{txn.fee_denomination}</td>
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
