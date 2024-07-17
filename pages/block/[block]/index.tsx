import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import FromNow from "@/components/FromNow";
import TransactionsChart from "@/components/TransactionsChart";
import { formatISO, shortHash } from "@/utils";
import axios from "axios";
import { AddressTransactionsDetail } from "@/components/tables";
import { blocks, transactions } from "@prisma/client";

export default function Block({
  pages,
  block,
  transactions,
  PAGE_SIZE,
  count,
}: {
  block: blocks;
  pages: string | undefined;
  transactions: transactions[];
  PAGE_SIZE: number;
  count: number;
}) {
  return (
    <div className="grow mx-4 md:mx-16 my-6">
      <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-4">
        <div className="flex flex-col items-center justify-between gap-2">
          <div className="bg-white p-6 text-black rounded-3xl shadow-lg flex flex-row max-sm:flex-col max-sm:gap-4 w-full items-center justify-between">
            <h1 className="mb-3 lg:mb-0 text-xl font-semibold">
              {block && `Block ID`}
            </h1>
            <p className="font-medium text-3xl">
              {block && `${block?.number}`}
            </p>
            <div className="flex p-1 rounded-full shadow-xl space-x-6 bg-neutral-300">
              <Link
                href={
                  block?.number
                    ? `/block/${
                        block?.number !== null ? Number(block.number) - 1 : null
                      }`
                    : ""
                }
                className=""
              >
                <ChevronLeftIcon className="w-5 h-5 stroke-white stroke-2" />
              </Link>
              <Link
                href={
                  block?.number
                    ? `/block/${
                        block?.number !== null ? Number(block.number) + 1 : null
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
                    <p className="self-center ">{`${block?.number}`}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3">
                  <p className="font-medium">Block hash</p>
                  <p className="col-span-2 truncate">{block?.block_hash}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3">
                  <p className="font-medium">Time</p>
                  <p className="col-span-2 truncate">
                    {block.timestamp && (
                      <FromNow
                        datetime={formatISO(
                          new Date(Number(block.timestamp) * 1000)
                        )}
                      />
                    )}
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
                            block?.number !== null ? Number(block.number) : "",
                        },
                      }}
                    >
                      {block.transactions !== null
                        ? Number(block.transactions)
                        : ""}
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
                    {block.total_difficulty !== null
                      ? block.total_difficulty
                      : ""}
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3">
                  <p className="font-medium">Gas used</p>
                  <p className="col-span-2 truncate">{block?.gas_used}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3">
                  <p className="font-medium">Gas limit</p>
                  <p className="col-span-2 truncate">{block?.gas_limit}</p>
                </div>
              </>
            ) : (
              <h5 className="font-medium">No block found</h5>
            )}
          </div>
        </div>
      </div>
      {block && (
        <div className="mt-5 mb-4 ">
          <div className="bg-white px-5 py-4 rounded-3xl shadow-lg overflow-x-auto">
            <a className="px-4 py-1 font-semibold text-xl">
              Latest Transactions
            </a>
            <AddressTransactionsDetail
              path={`/block/${Number(block?.number)}`}
              data={transactions || []}
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
      `${apiUrl}/api/block?block_hash=${block}&skip=${SKIP}&take=${PAGE_SIZE}`
    );

    const { block: blocks, transactions } = response.data;

    return {
      props: {
        block: blocks,
        transactions,
        PAGE_SIZE,
        count: transactions.length,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: { block: {}, count: 0, transactions: [], PAGE_SIZE: 0, pages: 0 },
    };
  }
}
