import { formatISO } from "date-fns";
import Link from "next/link";
import DataTable from "@/components/DataTable";
import Pagination from "@/components/Pagination";
import FromNow from "@/components/FromNow";
import TransactionsChart from "@/components/TransactionsChart";
import { getBlockStats, getBlocks } from "@/utils/blocks";

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

  const PAGE_SIZE = 10;
  const SKIP = (page >= 1 ? page - 1 : page) * PAGE_SIZE;
  const { blocks, count: totalBlocks } = await getBlocks({
    take: PAGE_SIZE,
    skip: SKIP,
  });

  // const dataChart = await getBlockStats();
  // const last7Data = dataChart.map((value) => ({
  //   date: new Date(value.date).toLocaleDateString("es-es", {
  //     dateStyle: "short",
  //   }),
  //   count: Number(value.count),
  // }));

  const tableHeaders = [
    "Block",
    "Timestamp",
    "Size (mb)",
    "Relays",
    "Nodes",
    "Transactions",
    "Producer",
  ];

  return (
    <div className="grow p-6 max-sm:p-0 max-sm:py-4">
      <div className="flex flex-col p-5 max-sm:pb-2 max-sm:pt-1 gap-2 h-full">
        {/* <div className="mt-8 md:mt-0 p-5 max-sm:mt-0 bg-white rounded-xl shadow-lg w-full">
          <div className="p-4 flex justify-between">
            <p className="text-black font-semibold text-xl">Relays per block</p>
            <div className="relative w-28">
              <label className="absolute right-2 top-3 translate-y-0.5 cursor-pointer">
                <i className="fa-solid fa-angle-down"></i>
              </label>
              <select
                className="border border-black py-3 text-base px-4 outline-none rounded-full appearance-none w-full cursor-pointer relative z-10 bg-transparent"
                id="selectMo"
              >
                <option value={1}>Filter</option>
                <option value={2}>Monthly</option>
              </select>
            </div>
          </div>
          <div className="w-full h-full max-h-96">
            <TransactionsChart data={last7Data} />
          </div>
        </div> */}

        <div className=" bg-white mt-6 mb-10 p-5 rounded-xl shadow-xl overflow-x-auto">
          <p className="font-semibold text-xl pl-4">Latest Blocks</p>
          <div className="overflow-x-auto">
            <DataTable headers={tableHeaders}>
              {blocks.map((block, index: number) => (
                <tr key={index} className="text-black text-sm font-normal">
                  <td className="border-0 text-black font-bold">
                    <Link
                      href={`/block/${block.height}`}
                      className="hover:text-blue_primary"
                    >{`${block.height}`}</Link>
                  </td>
                  <td className="border-0">
                    {block.time && (
                      <FromNow datetime={formatISO(new Date(block.time))} />
                    )}
                  </td>
                  <td className="border-0">
                    {block.tx_total !== null ? block.tx_total.toString() : ""}
                  </td>
                  <td className="border-0">
                    {block.tx_total !== null ? block.tx_total.toString() : ""}
                  </td>
                  <td className="border-0">197</td>
                  <td className="border-0">
                    {block.tx_count !== null ? block.tx_count.toString() : ""}
                  </td>
                  <td className="border-0 font-bold">www.nodefleet.org</td>
                </tr>
              ))}
            </DataTable>
          </div>
          <div className="flex mt-4 justify-end max-sm:justify-center">
            <Pagination
              path="/block"
              currentPage={page}
              size={PAGE_SIZE}
              total={totalBlocks}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
