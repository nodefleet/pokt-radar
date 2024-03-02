import { formatISO } from "date-fns";
import Link from "next/link";
import DataTable from "@/components/DataTable";
import Pagination from "@/components/Pagination";
import FromNow from "@/components/FromNow";
// import { getBlocks } from "@/utils/blocks";
import TransactionsChart from "@/components/TransactionsChart";

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
  const currentDate = new Date();
  const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const weeksArray = Array.from({ length: 10 }, (_, i) => {
    let count;
    if (i === 2) {
      count = 300;
    } else {
      count = i % 2 === 0 ? 100 * i : 300 - 100 * i;
      count = count < 0 ? 0 : count;
    }
    return {
      date: `${(i + 1).toString().padStart(2, "0")}/${currentMonth}`,
      count: count,
    };
  });

  const PAGE_SIZE = 10;
  const SKIP = (page >= 1 ? page - 1 : page) * PAGE_SIZE;
  // const { blocks, count: totalBlocks } = await getBlocks({
  //   take: PAGE_SIZE,
  //   skip: SKIP,
  // });

  const blocks = [
    {
      height: 1234,
      time: "2024-02-29T12:30:00Z",
      proposer_address: "0xABCDEF1234567890",
      tx_total: 10,
      tx_count: 8,
      size: 256,
    },
    {
      height: 1235,
      time: "2024-02-29T12:35:00Z",
      proposer_address: "0xABCDEF0987654321",
      tx_total: 15,
      tx_count: 12,
      size: 128,
    },
    {
      height: 1236,
      time: "2024-02-29T12:40:00Z",
      proposer_address: "0xABCDEF5432167890",
      tx_total: 8,
      tx_count: 6,
      size: 512,
    },
    {
      height: 1237,
      time: "2024-02-29T12:45:00Z",
      proposer_address: "0xABCDEF0987654321",
      tx_total: 20,
      tx_count: 18,
      size: 384,
    },
    {
      height: 1238,
      time: "2024-02-29T12:50:00Z",
      proposer_address: "0xABCDEF1234567890",
      tx_total: 12,
      tx_count: 10,
      size: 192,
    },
    {
      height: 1239,
      time: "2024-02-29T12:55:00Z",
      proposer_address: "0xABCDEF5432167890",
      tx_total: 6,
      tx_count: 4,
      size: 320,
    },
    {
      height: 1240,
      time: "2024-02-29T13:00:00Z",
      proposer_address: "0xABCDEF1234567890",
      tx_total: 18,
      tx_count: 15,
      size: 448,
    },
    {
      height: 1241,
      time: "2024-02-29T13:05:00Z",
      proposer_address: "0xABCDEF0987654321",
      tx_total: 25,
      tx_count: 22,
      size: 256,
    },
    {
      height: 1242,
      time: "2024-02-29T13:10:00Z",
      proposer_address: "0xABCDEF5432167890",
      tx_total: 14,
      tx_count: 12,
      size: 512,
    },
    {
      height: 1243,
      time: "2024-02-29T13:15:00Z",
      proposer_address: "0xABCDEF1234567890",
      tx_total: 9,
      tx_count: 7,
      size: 384,
    },
  ];

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
        <div className="mt-8 md:mt-0 p-5 max-sm:mt-0 bg-white rounded-xl shadow-lg w-full">
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
            <TransactionsChart data={weeksArray} />
          </div>
        </div>

        <div className=" bg-white mt-6 mb-10 p-5 rounded-xl shadow-xl overflow-x-auto">
          <DataTable headers={tableHeaders}>
            {blocks.map((block, index: number) => (
              <tr key={index} className="text-black text-sm font-normal">
                <td className="border-0 text-black font-bold">
                  <Link
                    href={`/block/${block.height}`}
                  >{`${block.height}`}</Link>
                </td>
                <td className="border-0">
                  {block.time && (
                    <FromNow datetime={formatISO(new Date(block.time))} />
                  )}
                </td>
                <td className="border-0">{block.tx_total}</td>
                <td className="border-0">{block.tx_total}</td>
                <td className="border-0">{block.tx_count}</td>
                <td className="border-0">197</td>
                <td className="border-0 font-bold">www.nodefleet.org</td>
              </tr>
            ))}
          </DataTable>
          <div className="flex mt-4 justify-end">
            <Pagination
              path="/block"
              currentPage={page}
              size={PAGE_SIZE}
              total={blocks.length}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
