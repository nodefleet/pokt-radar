import Link from "next/link";
import { formatISO, format } from "date-fns";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import FromNow from "@/components/FromNow";
import { getTransaction } from "@/utils/txns";

export default async function Transaction({
  params,
}: {
  params: { hash: string };
}) {
  const { transation } = await getTransaction(params.hash);
  const txn = transation;
  type JsonObject = { [key: string]: any };
  const stdtx = txn.stdtx as JsonObject;
  return (
    <div className="mx-4 md:mx-24 my-8">
      <div className="px-8 py-5 pb-8 space-y-7 rounded-xl shadow-xl overflow-x-auto bg-white truncate">
        {txn ? (
          <>
            <h5 className="font-semibold text-xl">Overview</h5>
            <div className="grid grid-cols-1 sm:grid-cols-3">
              <p className="font-medium">Transaction ID</p>
              <p className="col-span-2 truncate">{txn.transaction_hash}</p>
            </div>
            <div className="grid grid-cols-3">
              <p className="font-medium">Block</p>
              <p className="col-span-2 font-bold hover:text-blue_primary truncate">
                <Link href={`/block/${txn.height}`}>
                  {txn.height !== null && txn.height.toString()}
                </Link>
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3">
              <p className="font-medium">Block Time</p>
              <p className="col-span-2 truncate">
                {txn.time && <FromNow datetime={formatISO(txn.time)} />}
              </p>
            </div>
            <div className="grid grid-cols-3">
              <p className="font-medium">Fee</p>
              <p className="col-span-2 truncate uppercase">
                {txn.fee !== null
                  ? txn.fee.toString() + " " + txn.fee_denomination
                  : txn.fee}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3">
              <p className="font-medium">From</p>
              <p className="col-span-2 font-bold hover:text-blue_primary truncate">
                <Link href={`/address/${txn.from_address}`}>
                  {txn.from_address}
                </Link>
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3">
              <p className="font-medium">To</p>
              <p className="col-span-2 font-bold hover:text-blue_primary truncate">
                <Link href={`/address/${txn.to_address}`}>
                  {txn.to_address}
                </Link>
              </p>
            </div>
            <div className="grid grid-cols-3">
              <p className="font-medium">Value</p>
              <p className="col-span-2 truncate">{stdtx?.msg?.value?.amount}</p>
            </div>
            <div className="grid grid-cols-3">
              <p className="font-medium">Raw Transaction</p>
              <p className="col-span-2 truncate">{txn.tx}</p>
            </div>
            <div className="grid grid-cols-3">
              <p className="font-medium">Service URL</p>
              <p className="col-span-2 break-words truncate font-bold">
                www.nodefleet.org
              </p>
            </div>
            <div className="grid grid-cols-3">
              <p className="font-medium">Memo</p>
              <p className="col-span-2 break-words truncate">{stdtx.memo}</p>
            </div>
          </>
        ) : (
          <h5>No transaction found</h5>
        )}
      </div>
    </div>
  );
}
