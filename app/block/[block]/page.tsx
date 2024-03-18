import Link from "next/link";
import { formatISO, format } from "date-fns";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import FromNow from "@/components/FromNow";
import AddressTransactions from "@/components/AddressTransactions";
import TransactionsChart from "@/components/TransactionsChart";
import { getBlock } from "@/utils/blocks";

export default async function Block({
  params,
}: {
  params: { block: string; page: string | undefined };
}) {
  const queryBlock = parseInt(params.block);
  const pages =
    (params.page && !isNaN(parseInt(params.page)) && parseInt(params.page)) ||
    1;

  const PAGE_SIZE = 10;
  const SKIP = (pages >= 1 ? pages - 1 : pages) * PAGE_SIZE;
  let { block, count, transactions, chartData } = await getBlock({
    height: queryBlock,
    skip: SKIP,
    take: PAGE_SIZE,
  });
  const last7Data = chartData.map((value) => ({
    date: new Date(value.date).toLocaleDateString("es-es", {
      dateStyle: "short",
    }),
    count: Number(value.count),
  }));

  return (
    <div className="grow mx-4 md:mx-16 my-6">
      <div className="grid grid-cols-2 gap-4">
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
                href={
                  block?.height
                    ? `/block/${
                        block?.height !== null ? Number(block.height) - 1 : null
                      }`
                    : ""
                }
                className=""
              >
                <ChevronLeftIcon className="w-5 h-5 stroke-white stroke-2" />
              </Link>
              <Link
                href={
                  block?.height
                    ? `/block/${
                        block?.height !== null ? Number(block.height) + 1 : null
                      }`
                    : ""
                }
                className=""
              >
                <ChevronRightIcon className="w-5 h-5 stroke-white stroke-2" />
              </Link>
            </div>
          </div>

          <div className="p-6 space-y-7 rounded-3xl shadow-xl overflow-x-hidden bg-white w-full truncate">
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
                  <p className="col-span-2 truncate">{block?.hash}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3">
                  <p className="font-medium">Time</p>
                  <p className="col-span-2 truncate">
                    {block.time && <FromNow datetime={formatISO(block.time)} />}{" "}
                    (
                    {block.time && format(block.time, "MMM dd yyyy, H:mm:ss O")}
                    )
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3">
                  <p className="font-medium">Transactions</p>
                  <p className="col-span-2 truncate">
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
                      {block.tx_total !== null ? Number(block.tx_count) : ""}
                    </Link>{" "}
                    transactions
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3">
                  <p className="font-medium truncate">
                    Contract Internal Transactions
                  </p>
                  <p className="col-span-2 truncate">
                    {" "}
                    {block.tx_count !== null ? block.tx_count.toString() : ""}
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3">
                  <p className="font-medium">Gas used</p>
                  <p className="col-span-2 truncate">
                    {block?.proposer_address}
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3">
                  <p className="font-medium">Gas limit</p>
                  <p className="col-span-2 truncate">
                    {block?.proposer_address}
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3">
                  <p className="font-medium">Previous Block Hash</p>
                  <p className="col-span-2 truncate">{block?.hash}</p>
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
            <div className="w-full h-full" style={{ maxHeight: "500px" }}>
              <TransactionsChart data={last7Data} />
            </div>
          </div>
        </div>
      </div>
      {block && (
        <div className="mt-5 mb-4 ">
          <div className="bg-white px-5 py-4 rounded-3xl shadow-lg overflow-x-auto">
            <a className="px-4 py-1 font-semibold text-xl">
              Latest Transactions
            </a>
            {/* @ts-expect-error Async Server Component */}
            <AddressTransactions
              path={`/block/${queryBlock}`}
              data={transactions}
              PAGE_SIZE={PAGE_SIZE}
              page={pages}
              block={{ block: queryBlock }}
              txtrow={count}
            />
          </div>
        </div>
      )}
    </div>
  );
}
