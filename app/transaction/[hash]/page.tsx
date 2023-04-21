import Link from "next/link";
import { formatISO, format } from "date-fns";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import FromNow from "@/components/FromNow";
import SearchBar from "@/components/SearchBar";
import { getTransaction } from "@/utils/txns";

export default async function Transaction({
  params,
}: {
  params: { hash: string };
}) {
  const txn = await getTransaction(params.hash);
  return (
    <div className="mx-4 md:mx-24 mb-14">
      <div className="flex flex-col items-start my-5 lg:flex-row lg:items-center lg:justify-between lg:my-10">
        <h1 className="mb-3 lg:mb-0 text-gray-3 text-2xl">Transaction</h1>
        <SearchBar />
      </div>
      <div className="px-8 py-5 space-y-7 rounded-xl shadow-xl overflow-x-auto bg-white">
        {txn ? (
          <>
            <h5>Overview</h5>
            <div className="grid grid-cols-1 sm:grid-cols-3">
              <p>Transaction hash</p>
              <p className="col-span-2">{txn.hash}</p>
            </div>
            <div className="grid grid-cols-3">
              <p>Result</p>
              <p
                className="col-span-2 w-fit flex items-center py-1 px-2 rounded-md text-sm font-medium"
                style={{
                  color: "#7DCA95",
                  backgroundColor: "rgba(180, 238, 199, 0.23);",
                }}
              >
                <CheckCircleIcon className="w-5 h-5 mr-2" />
                Success
              </p>
            </div>
            <div className="grid grid-cols-3">
              <p>Block</p>
              <p className="col-span-2 text-link">
                <Link href={`/block/${txn.block_height}`}>
                  {txn.block_height.toString()}
                </Link>
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3">
              <p>Time</p>
              <p className="col-span-2">
                {txn.blocks.time && (
                  <FromNow datetime={formatISO(txn.blocks.time)} />
                )}{" "}
                (
                {txn.blocks.time &&
                  format(txn.blocks.time, "MMM dd yyyy, H:mm:ss O")}
                )
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3">
              <p>From</p>
              <p className="col-span-2 text-link">
                <Link href={`/address/${txn.from}`}>{txn.from}</Link>
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3">
              <p>To</p>
              <p className="col-span-2 text-link">
                <Link href={`/address/${txn.to}`}>{txn.to}</Link>
              </p>
            </div>
            <div className="grid grid-cols-3">
              <p>Gas</p>
              <p className="col-span-2">{txn.gas.toFixed()}</p>
            </div>
            <div className="grid grid-cols-3">
              <p>Gas Price</p>
              <p className="col-span-2">{txn.gas_price.toFixed()}</p>
            </div>
            <div className="grid grid-cols-3">
              <p>Input</p>
              <p className="col-span-2 break-words">{txn.input}</p>
            </div>
          </>
        ) : (
          <h5>No transaction found</h5>
        )}
      </div>
    </div>
  );
}
