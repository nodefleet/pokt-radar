import Link from "next/link";
import DataTable from "@/components/DataTable";
import Pagination from "@/components/Pagination";
import FromNow from "@/components/FromNow";
import { bytesToMB, formatISO } from "@/utils";
import TransactionsChart from "@/components/TransactionsChart";
import axios from "axios";

export default function Blocks({
  page,
  SKIP,
  PAGE_SIZE,
  blocks,
}: {
  page: number;
  SKIP: number;
  PAGE_SIZE: number;
  blocks: any[];
}) {
  const PAGE_LIMIT = 50;
  const dataChart = blocks.map(
    (row: {
      height: string;
      time: string | number | Date;
      total_relays_completed: any;
    }) => ({
      date:
        row.height +
        " " +
        new Date(row.time).toLocaleDateString("es-ES", {
          day: "2-digit",
          month: "numeric",
        }),
      count: row.total_relays_completed,
    })
  );

  const tableHeaders = [
    "Block",
    "Timestamp",
    "Size (mb)",
    "Relays",
    "Nodes",
    "Transactions",
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
                <option value={1}>All</option>
              </select>
            </div>
          </div>
          <div className="w-full h-full min-h-96 max-h-96">
            <TransactionsChart data={[...dataChart].slice(SKIP - 10, SKIP)} />
          </div>
        </div>

        <div className=" bg-white mt-6 mb-10 p-5 rounded-xl shadow-xl overflow-x-auto">
          <p className="font-semibold text-xl pl-4">Latest Blocks</p>
          <div className="overflow-x-auto">
            <DataTable headers={tableHeaders}>
              {[...blocks]
                .slice(SKIP - 10, SKIP)
                .map((block, index: number) => (
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
                      {block.total_size !== null
                        ? bytesToMB(block.total_size)
                        : ""}
                    </td>
                    <td className="border-0">
                      {block.total_relays_completed !== null
                        ? block.total_relays_completed.toLocaleString("en-US")
                        : ""}
                    </td>
                    <td className="border-0">
                      {block.total_txs !== null
                        ? block.total_txs.toLocaleString("en-US")
                        : "N/A"}
                    </td>
                    <td className="border-0">
                      {block.total_nodes !== null
                        ? block.total_nodes.toLocaleString("en-US")
                        : ""}
                    </td>
                  </tr>
                ))}
            </DataTable>
          </div>
          <div className="flex mt-4 justify-end max-sm:justify-center">
            <Pagination
              path="/block"
              currentPage={page}
              size={PAGE_SIZE}
              total={PAGE_LIMIT}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: { query: { page: any } }) {
  const { page } = context.query;

  try {
    const pages = (page && !isNaN(parseInt(page)) && parseInt(page)) || 1;

    const PAGE_SIZE = 10;
    const SKIP = pages * PAGE_SIZE;

    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const response = await axios.get(`${apiUrl}/api/block` + `?limit=${SKIP}`);

    return {
      props: {
        blocks: response.data.blocks,
        page: page ? Number(page) : 1,
        SKIP,
        PAGE_SIZE,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        blocks: [],
        page: 1,
        SKIP: 0,
        PAGE_SIZE: 10,
      },
    };
  }
}
