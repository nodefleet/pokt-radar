import moment from "moment";
import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import SearchBar from "@/components/SearchBar";
import { getBlock } from "@/utils/blocks";
import { randomInt } from "crypto";

export default async function Block({ params }: { params: { block: string } }) {
  const queryBlock = parseInt(params.block);

  let block;
  if (!isNaN(queryBlock)) {
    block = await getBlock(queryBlock);
  }

  return (
    <div className="grow mx-4 md:mx-24">
      <div className="flex flex-col items-start my-5 lg:flex-row lg:items-center lg:justify-between lg:my-10">
        <h1 className="mb-3 lg:mb-0 text-gray-3 text-2xl">
          {block && `Block #${block?.block_height}`}
        </h1>
        <SearchBar />
      </div>
      <div className="px-8 py-5 space-y-7 rounded-xl shadow-xl overflow-x-auto bg-white">
        {block ? (
          <>
            <h5>Overview</h5>
            <div className="grid grid-cols-1 sm:grid-cols-3">
              <p>Block</p>
              <div className="flex col-span-2 space-x-8">
                <p className="self-center">{`${block?.block_height}`}</p>
                <div className="flex p-1 rounded shadow-xl space-x-1">
                  <Link
                    href={
                      block?.block_height
                        ? `/block/${block?.block_height - BigInt(1)}`
                        : ""
                    }
                    className=""
                  >
                    <ChevronLeftIcon className="w-5 h-5" />
                  </Link>
                  <Link
                    href={
                      block?.block_height
                        ? `/block/${block?.block_height + BigInt(1)}`
                        : ""
                    }
                    className=""
                  >
                    <ChevronRightIcon className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3">
              <p>Block hash</p>
              <p className="col-span-2">{block?.hash}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3">
              <p>Time</p>
              <p className="col-span-2">
                {moment(block?.time).fromNow()} (
                {moment(block?.time).format("MMM DD YYYY, H:mm:ss Z")})
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3">
              <p>Transactions</p>
              <p className="col-span-2">
                Total{" "}
                <Link
                  className="text-link"
                  href={{
                    pathname: "/transaction",
                    query: { block: block?.block_height.toString() },
                  }}
                >
                  {randomInt(100)}
                </Link>{" "}
                transactions
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3">
              <p>Gas used</p>
              <p className="col-span-2">{block?.gas_used?.toFixed()}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3">
              <p>Gas limit</p>
              <p className="col-span-2">{block?.gas_limit?.toFixed()}</p>
            </div>
          </>
        ) : (
          <h5>No block found</h5>
        )}
      </div>
    </div>
  );
}
