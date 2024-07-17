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
      <div className=" bg-white mt-6 mb-10 p-5 rounded-xl shadow-xl overflow-x-auto">
        <p className="font-semibold text-xl pl-4">Latest Blocks</p>
        <div className="overflow-x-auto">
          <DataTable headers={tableHeaders}>
            {[...blocks].slice(SKIP - 10, SKIP).map((block, index: number) => (
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
                  {block.total_size !== null ? bytesToMB(block.total_size) : ""}
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
