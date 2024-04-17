import Link from "next/link";
import DataTable from "./DataTable";
import { shortHash } from "@/utils";
import Pagination from "./Pagination";

export default function AddressTransactions({
  data,
  PAGE_SIZE,
  block,
  page,
  txtrow,
  address,
  path,
}: {
  data: any[];
  PAGE_SIZE: number;
  page: number;
  block?: { block: number | undefined };
  txtrow: number;
  address?: { address: string | undefined };
  path: string;
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

  if (data.length === 0) {
    return (
      <div className="flex justify-center items-center w-full p-4">
        <h2 className="font-medium text-xl">
          Currently, there are no transactions.
        </h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <DataTable headers={tableHeaders}>
        {data
          .filter((txn) => txn.transaction_id)
          .map((txn, index: number) => {
            return (
              <tr key={index} className="border-y border-gray-bera">
                <td className="border-0 text-black font-bold hover:text-blue_primary">
                  <Link href={`/transaction/${txn.hash}`}>
                    {txn.hash && shortHash(txn.hash)}
                  </Link>
                </td>
                <td className="border-0 w-8">
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
                    {txn.from_address ? shortHash(txn.from_address) : "N/A"}
                  </Link>
                </td>
                <td className="border-0 font-bold text-black hover:text-blue_primary">
                  <Link href={`/address/${txn.to_address}`}>
                    {txn.to_address ? shortHash(txn.to_address) : "N/A"}
                  </Link>
                </td>
                <td className="border-0 text-black">
                  {txn.stdtx?.msg?.value?.amount || "N/A"}
                </td>
                <td className="border-0 text-black">
                  {txn?.stdtx?.memo || "N/A"}
                </td>
              </tr>
            );
          })}
      </DataTable>
      <div className="flex mt-4 justify-end">
        <Pagination
          path={path}
          searchParams={(block && block) || (address && address)}
          currentPage={page}
          size={PAGE_SIZE}
          total={txtrow}
        />
      </div>
    </div>
  );
}
