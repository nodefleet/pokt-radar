import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import FromNow from "@/components/FromNow";
import AddressTransactions from "@/components/AddressTransactions";
import TransactionsChart from "@/components/TransactionsChart";
import { formatISO } from "@/utils";
import axios from "axios";

export default function Block({
  PAGE_SIZE,
  transactions,
  count,
  pages,
  block,
}: {
  block: any;
  pages: string | undefined;
  count: number;
  transactions: any[];
  PAGE_SIZE: number;
}) {
  function customFormat(date: Date) {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const month = months[date.getMonth()];
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    const timeZoneOffset = date.getTimezoneOffset();
    const sign = timeZoneOffset > 0 ? "-" : "+";
    const absOffset = Math.abs(timeZoneOffset);
    const hoursOffset = String(Math.floor(absOffset / 60)).padStart(2, "0");
    const minutesOffset = String(absOffset % 60).padStart(2, "0");

    return `${month} ${day} ${year}, ${hours}:${minutes}:${seconds} ${sign}${hoursOffset}:${minutesOffset}`;
  }

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
                    {block.time && (
                      <FromNow datetime={formatISO(new Date(block.time))} />
                    )}{" "}
                    ({block.time && customFormat(new Date(block.time))})
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
        {/* <div className="flex flex-col p-5 max-sm:pb-2 max-sm:pt-1 gap-2 bg-white rounded-3xl shadow-lg w-full  relative">
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
        </div> */}
      </div>
      {block && (
        <div className="mt-5 mb-4 ">
          <div className="bg-white px-5 py-4 rounded-3xl shadow-lg overflow-x-auto">
            <a className="px-4 py-1 font-semibold text-xl">
              Latest Transactions
            </a>
            <AddressTransactions
              path={`/block/${Number(block?.height)}`}
              data={transactions}
              PAGE_SIZE={PAGE_SIZE}
              page={Number(pages)}
              txtrow={count}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export async function getServerSideProps(context: {
  params: { block: string };
  query: { page: string };
}) {
  const { block } = context.params;
  const { page } = context.query;
  const pages = (page && !isNaN(parseInt(page)) && parseInt(page)) || 1;
  const PAGE_SIZE = 10;
  const SKIP = (pages >= 1 ? pages - 1 : pages) * PAGE_SIZE;
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const response = await axios.get(
      `${apiUrl}/api/block?height=${Number(
        block
      )}&skip=${SKIP}&take=${PAGE_SIZE}`
    );
    const { block: blocks, count, transactions } = response.data;
    return {
      props: { block: blocks, count, transactions, PAGE_SIZE, pages: pages },
    };
  } catch (error) {
    console.error(error);
    return {
      props: { block: {}, count: 0, transactions: [], PAGE_SIZE: 0, pages: 0 },
    };
  }
}
