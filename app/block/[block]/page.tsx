import Link from "next/link";
import { formatISO, format } from "date-fns";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import FromNow from "@/components/FromNow";
import SearchBar from "@/components/SearchBar";
import AddressTransactions from "@/components/AddressTransactions";
import { getBlock } from "@/utils/blocks";
import { getTransactionsByBlock } from "@/utils/txns";
import TransactionsChart from "@/components/TransactionsChart";
import { Transaction } from "@/app/transaction/page";

export default async function Block({ params }: { params: { block: string } }) {
  const queryBlock = parseInt(params.block);
  const exampleBlock = {
    height: 1234,
    hash: "0xabcdef123456",
    time: new Date(),
    tx_total: 10,
    tx_count: 5,
    proposer_address: "0xabcdef123456",
  };

  const transactionsTable: Transaction[] = [
    {
      hash: "0x123456789abcdef1",
      method: "Transfer",
      block: 1234,
      from: "0x9876543210ABCDEF1",
      to: "0xFEDCBA0987654321",
      value: "0.005 ETH",
      memo: "Payment for services rendered",
    },
    {
      hash: "0x123456789abcdef2",
      method: "Swap",
      block: 1235,
      from: "0x9876543210ABCDEF2",
      to: "0xFEDCBA0987654322",
      value: "0.01 ETH",
      memo: "Exchange transaction",
    },
    {
      hash: "0x123456789abcdef3",
      method: "Transfer",
      block: 1236,
      from: "0x9876543210ABCDEF3",
      to: "0xFEDCBA0987654323",
      value: "0.0025 ETH",
      memo: "Test transaction",
    },
    {
      hash: "0x123456789abcdef4",
      method: "Transfer",
      block: 1237,
      from: "0x9876543210ABCDEF4",
      to: "0xFEDCBA0987654324",
      value: "0.003 ETH",
      memo: "Transaction memo",
    },
    {
      hash: "0x123456789abcdef5",
      method: "Swap",
      block: 1238,
      from: "0x9876543210ABCDEF5",
      to: "0xFEDCBA0987654325",
      value: "0.015 ETH",
      memo: "Swap details",
    },
    {
      hash: "0x123456789abcdef6",
      method: "Transfer",
      block: 1239,
      from: "0x9876543210ABCDEF6",
      to: "0xFEDCBA0987654326",
      value: "0.007 ETH",
      memo: "Transaction notes",
    },
    {
      hash: "0x123456789abcdef7",
      method: "Swap",
      block: 1240,
      from: "0x9876543210ABCDEF7",
      to: "0xFEDCBA0987654327",
      value: "0.02 ETH",
      memo: "Swap details",
    },
    {
      hash: "0x123456789abcdef8",
      method: "Transfer",
      block: 1241,
      from: "0x9876543210ABCDEF8",
      to: "0xFEDCBA0987654328",
      value: "0.009 ETH",
      memo: "Payment memo",
    },
    {
      hash: "0x123456789abcdef9",
      method: "Transfer",
      block: 1242,
      from: "0x9876543210ABCDEF9",
      to: "0xFEDCBA0987654329",
      value: "0.0055 ETH",
      memo: "Payment details",
    },
    {
      hash: "0x123456789abcdef10",
      method: "Swap",
      block: 1243,
      from: "0x9876543210ABCDEF10",
      to: "0xFEDCBA09876543210",
      value: "0.025 ETH",
      memo: "Swap notes",
    },
  ];

  let block;
  block = exampleBlock;
  const weeksArray = Array.from({ length: 10 }, (_, i) => ({
    date: `week ${(i + 1).toString().padStart(2, "0")}`,
    count: i === 5 ? 300 : 100 * i,
  }));

  return (
    <div className="grow mx-4 md:mx-24 my-6">
      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col items-center justify-between gap-2">
          <div className="bg-white p-6 text-black rounded-3xl shadow-lg flex flex-row w-full items-center justify-between">
            <h1 className="mb-3 lg:mb-0 text-xl font-semibold">
              {block && `Block ID`}
            </h1>
            <p className="font-medium text-3xl">
              {block && `${block?.height}`}
            </p>
            <span className="font-medium text-base rounded-full ml-5 max-sm:ml-3 text-gray-400 outline-1 outline-double outline-gray-400 text-center py-0.5 px-6">
              Last 10s
            </span>
            <div className="flex p-1 rounded-full shadow-xl space-x-6 bg-neutral-300">
              <Link
                href={block?.height ? `/block/${block?.height}` : ""}
                className=""
              >
                <ChevronLeftIcon className="w-5 h-5 stroke-white stroke-2" />
              </Link>
              <Link
                href={block?.height ? `/block/${block?.height}` : ""}
                className=""
              >
                <ChevronRightIcon className="w-5 h-5 stroke-white stroke-2" />
              </Link>
            </div>
          </div>

          <div className="p-6 space-y-7 rounded-3xl shadow-xl overflow-x-hidden bg-white w-full">
            {block ? (
              <>
                <h5 className="text-xl font-semibold">Overview</h5>
                <div className="grid grid-cols-1 sm:grid-cols-3">
                  <p className="font-medium">Block</p>
                  <div className="flex col-span-2 space-x-8 truncate">
                    <p className="self-center ">{`${block?.height}`}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3">
                  <p className="font-medium">Block hash</p>
                  <p className="col-span-2">{block?.hash}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3">
                  <p className="font-medium">Time</p>
                  <p className="col-span-2">
                    {block.time && <FromNow datetime={formatISO(block.time)} />}{" "}
                    (
                    {block.time && format(block.time, "MMM dd yyyy, H:mm:ss O")}
                    )
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3">
                  <p className="font-medium">Transactions</p>
                  <p className="col-span-2">
                    Total{" "}
                    <Link
                      className="text-link"
                      href={{
                        pathname: "/transaction",
                        query: {
                          block:
                            block?.height !== null
                              ? block.height.toString()
                              : "",
                        },
                      }}
                    >
                      {block.tx_total}
                    </Link>{" "}
                    transactions
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3">
                  <p className="font-medium">Contract Internal Transactions</p>
                  <p className="col-span-2">{block?.tx_count}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3">
                  <p className="font-medium">Gas used</p>
                  <p className="col-span-2">{block?.proposer_address}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3">
                  <p className="font-medium">Gas limit</p>
                  <p className="col-span-2">{block?.proposer_address}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3">
                  <p className="font-medium">Previous Block Hash</p>
                  <p className="col-span-2">{block?.hash}</p>
                </div>
              </>
            ) : (
              <h5 className="font-medium">No block found</h5>
            )}
          </div>
        </div>
        <div className="flex flex-col p-5 max-sm:pb-2 max-sm:pt-1 gap-2 bg-white rounded-3xl shadow-lg w-full  relative">
          <div className="mt-8 md:mt-0 max-sm:mt-0">
            <div className="p-4 flex justify-between">
              <p className="text-black font-semibold text-xl">
                Relays per block
              </p>
            </div>
            <div className="w-full h-full max-h-96">
              <TransactionsChart data={weeksArray} />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 mb-4 ">
        <div className="bg-white px-5 py-4 rounded-3xl shadow-lg overflow-x-auto">
          <a className="px-4 py-1 font-semibold text-xl">Latest Transactions</a>
          <AddressTransactions transactions={transactionsTable} />
        </div>
      </div>
    </div>
  );
}
