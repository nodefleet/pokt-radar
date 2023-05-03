import { formatISO } from "date-fns";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import DataTable from "@/components/DataTable";
import Pagination from "@/components/Pagination";
import FromNow from "@/components/FromNow";
import { getBlocks } from "@/utils/blocks";

export default async function Blocks({
  searchParams,
}: {
  searchParams: { page: string | undefined };
}) {
  const page =
    (searchParams.page &&
      !isNaN(parseInt(searchParams.page)) &&
      parseInt(searchParams.page)) ||
    1;

  const PAGE_SIZE = 25;
  const SKIP = (page >= 1 ? page - 1 : page) * PAGE_SIZE;
  const { blocks, count: totalBlocks } = await getBlocks({
    take: PAGE_SIZE,
    skip: SKIP,
  });

  const tableHeaders = [
    "Block",
    "Time",
    "Txn",
    "Gas used",
    "Gas limit",
    "Size",
  ];

  return (
    <div className="grow mx-4 md:mx-24">
      <div className="flex flex-col items-start my-5 lg:flex-row lg:items-center lg:justify-between lg:my-10">
        <h1 className="mb-3 lg:mb-0 text-gray-3 text-2xl">Blocks</h1>
        <SearchBar width="w-full lg:w-4/6 xl:w-7/12" />
      </div>

      <div className=" bg-white mt-6 mb-10 p-5 rounded-xl shadow-xl overflow-x-auto">
        <DataTable headers={tableHeaders}>
          {blocks.map((block, index: number) => (
            <tr key={index} className="border-y border-gray-bera">
              <td className="border-0 text-link">
                <Link
                  href={`/block/${block.block_height}`}
                >{`${block.block_height}`}</Link>
              </td>
              <td className="border-0">
                {block.timestamp && (
                  <FromNow datetime={formatISO(block.timestamp)} />
                )}
              </td>
              <td className="border-0">{block.total_transactions}</td>
              <td className="border-0">{block.gas_used?.toFixed()}</td>
              <td className="border-0">{block.gas_limit?.toFixed()}</td>
              <td className="border-0">{block.size?.toFixed()}</td>
            </tr>
          ))}
        </DataTable>
        <div className="flex mt-4 justify-end">
          <Pagination
            path="/block"
            currentPage={page}
            size={PAGE_SIZE}
            total={totalBlocks}
          />
        </div>
      </div>
    </div>
  );
}
