import Link from "next/link";
import { formatISO, format } from "date-fns";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import FromNow from "@/components/FromNow";
import SearchBar from "@/components/SearchBar";
import { getTransaction } from "@/utils/txns";

interface Transaction {
  hash: string;
  height: number | null;
  timestamp: Date | null;
  from_address: string;
  to_address: string;
  value: string;
  raw: string;
  servicerURL: string;
  memo: string;
}

const exampleTransaction: Transaction = {
  hash: "0x123456789abcdef",
  height: 1234,
  timestamp: new Date("2024-02-29T12:30:00Z"),
  from_address: "0x9876543210ABCDEF",
  to_address: "0xFEDCBA0987654321",
  value: "0.005 ETH",
  raw: "0xabc123def456",
  servicerURL: "https://example.com/servicer",
  memo: "Payment for services rendered",
};

export default async function Transaction({
  params,
}: {
  params: { hash: string };
}) {
  // const txns = await getTransaction(params.hash);
  // console.log(txns);
  const txn: Transaction | null = exampleTransaction;
  return (
    <div className="mx-4 md:mx-24 my-8">
      <div className="px-8 py-5 pb-8 space-y-7 rounded-xl shadow-xl overflow-x-auto bg-white">
        {txn ? (
          <>
            <h5 className="font-semibold text-xl">Overview</h5>
            <div className="grid grid-cols-1 sm:grid-cols-3">
              <p className="font-medium">Transaction ID</p>
              <p className="col-span-2">{txn.hash}</p>
            </div>
            <div className="grid grid-cols-3">
              <p className="font-medium">Block</p>
              <p className="col-span-2 font-bold hover:text-blue_primary">
                <Link href={`/block/${txn.height}`}>
                  {txn.height !== null && txn.height.toString()}
                </Link>
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3">
              <p className="font-medium">Block Time</p>
              <p className="col-span-2">
                {txn.timestamp && (
                  <FromNow datetime={formatISO(txn.timestamp)} />
                )}
              </p>
            </div>
            <div className="grid grid-cols-3">
              <p className="font-medium">Fee</p>
              <p className="col-span-2">0.0029 POKT</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3">
              <p className="font-medium">From</p>
              <p className="col-span-2 font-bold hover:text-blue_primary">
                <Link href={`/address/${txn.from_address}`}>
                  {txn.from_address}
                </Link>
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3">
              <p className="font-medium">To</p>
              <p className="col-span-2 font-bold hover:text-blue_primary">
                <Link href={`/address/${txn.to_address}`}>
                  {txn.to_address}
                </Link>
              </p>
            </div>
            <div className="grid grid-cols-3">
              <p className="font-medium">Value</p>
              <p className="col-span-2">{txn.value}</p>
            </div>
            <div className="grid grid-cols-3">
              <p className="font-medium">Raw Transaction</p>
              <p className="col-span-2">{txn.raw}</p>
            </div>
            <div className="grid grid-cols-3">
              <p className="font-medium">Service URL</p>
              <p className="col-span-2 break-words">{txn.servicerURL}</p>
            </div>
            <div className="grid grid-cols-3">
              <p className="font-medium">Memo</p>
              <p className="col-span-2 break-words">{txn.memo}</p>
            </div>
          </>
        ) : (
          <h5>No transaction found</h5>
        )}
      </div>
    </div>
  );
}
