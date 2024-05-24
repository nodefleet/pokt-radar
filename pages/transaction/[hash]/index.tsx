import Link from "next/link";
import FromNow from "@/components/FromNow";
import { formatISO } from "@/utils";
import axios from "axios";
import JSONPretty from "react-json-pretty";
import "react-json-pretty/themes/monikai.css";

interface Transaction {
  tx_hash: string;
  to_address: string;
  tx_result_code: number;
  height: number;
  amount: number;
  block_time: string;
  memo: string;
  parse_time: string;
  fee: number;
  flow: null | string;
  pending: boolean;
  from_address: string;
}

export default function Transaction({ txn, raw }: { txn: any; raw: any }) {
  const customTheme = {
    main: "background: #1e1e1e; color: #d4d4d4; border-radius: 14px;",
    error: "color: #ff0000;",
    key: "color: #ff5fff;",
    string: "color: #5fff5f;",
    value: "color: #5f5fff;",
    boolean: "color: #ffaf5f;",
  };

  if (!txn) {
    return <h5>No transaction found</h5>;
  }
  // type JsonObject = { [key: string]: any };
  // const stdtx = txn?.stdtx as JsonObject;
  return (
    <div className="mx-4 md:mx-24 my-8 flex flex-col gap-4">
      <div className="px-8 py-5 pb-8 space-y-7 rounded-xl shadow-xl overflow-x-auto bg-white truncate">
        {txn ? (
          <>
            <h5 className="font-semibold text-xl">Overview</h5>
            <div className="grid grid-cols-1 sm:grid-cols-3">
              <p className="font-medium">Transaction ID</p>
              <p className="col-span-2 truncate">{txn.hash}</p>
            </div>
            <div className="grid grid-cols-3">
              <p className="font-medium">Status</p>
              <p
                className={`font-normal col-span-2 w-36 uppercase text-base rounded-full text-white -translate-x-4 ${
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
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3">
              <p className="font-medium">Type</p>
              <p className="col-span-2 truncate capitalize">{txn.type}</p>
            </div>
            <div className="grid grid-cols-3">
              <p className="font-medium">Block</p>
              <p className="col-span-2 font-bold hover:text-blue_primary truncate">
                <Link href={`/block/${txn.height}`}>
                  {txn.height !== null && txn.height}
                </Link>
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3">
              <p className="font-medium">Block Time</p>
              <p className="col-span-2 truncate">
                {txn.block_time && (
                  <FromNow datetime={formatISO(new Date(txn.block_time))} />
                )}
              </p>
            </div>
            <div className="grid grid-cols-3">
              <p className="font-medium">Fee</p>
              <p className="col-span-2 truncate uppercase">
                {parseFloat(
                  (txn.total_fee / 10 ** 6).toFixed(2)
                ).toLocaleString()}{" "}
                POKT
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
                  {txn.to_address === "" ? "-" : txn.to_address}
                </Link>
              </p>
            </div>
            <div className="grid grid-cols-3">
              <p className="font-medium">Value</p>
              <p className="col-span-2 truncate">
                {txn.type === "proof"
                  ? txn.total_pokt.toFixed(2) + " POKT"
                  : txn.amount === 0
                  ? "-"
                  : parseFloat(
                      (txn.amount / 10 ** 6).toFixed(2)
                    ).toLocaleString() + " POKT" || "N/A"}
              </p>
            </div>
            <div className="grid grid-cols-3">
              <p className="font-medium">Raw Transaction</p>
              <p className="col-span-2 truncate">{txn?.result_code}</p>
            </div>
            <div className="grid grid-cols-3">
              <p className="font-medium">Memo</p>
              <p className="col-span-2 break-words truncate">
                {txn.memo === "" ? "-" : txn.memo}
              </p>
            </div>
          </>
        ) : (
          <h5>No transaction found</h5>
        )}
      </div>
      {/* <div className="px-8 py-5 pb-8 space-y-7 rounded-xl shadow-xl overflow-x-auto bg-white truncate">
        <h5 className="font-semibold text-xl">Raw resurt</h5>
        <JSONPretty data={raw} theme={customTheme} mainStyle="padding: 1rem;" />
      </div> */}
    </div>
  );
}

export async function getServerSideProps(context: {
  params: { hash: string };
}) {
  const { hash } = context.params;
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const response = await axios.get(`${apiUrl}/api/transaction?hash=${hash}`);

    // const resRaw = await axios.post(
    //   "https://pocket-indexer.nodefleet.org/V1/query/tx",
    //   {
    //     hash: hash,
    //   }
    // );
    // console.log(resRaw.data);
    return {
      props: {
        txn: response.data.transation,
        raw: [],
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        txn: [],
        raw: [],
      },
    };
  }
}
