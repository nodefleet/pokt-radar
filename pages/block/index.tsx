import Link from "next/link";
import DataTable from "@/components/DataTable";
import Pagination from "@/components/Pagination";
import FromNow from "@/components/FromNow";
import { bytesToMB, formatISO, shortHash } from "@/utils";
import TransactionsChart from "@/components/TransactionsChart";
import axios from "axios";
import { blocks } from "@prisma/client";
import { formatNumber } from "../../utils/index";
import InputSearch from "@/components/InputSearch";

export default function Blocks({
  page,
  SKIP,
  PAGE_SIZE,
  blocks,
}: {
  page: number;
  SKIP: number;
  PAGE_SIZE: number;
  blocks: blocks[];
}) {
  const PAGE_LIMIT = blocks.length + 500;

  const tableHeaders = [
    "Hash",
    "Block",
    "Time",
    "Txn",
    "Gas Used",
    "Gas Limit",
    "Burned (MEGA)",
  ];

  return (
    <div className="grow p-6 max-sm:p-0 max-sm:py-4">
      <div className="flex max-sm:flex-col max-sm:gap-4 justify-between items-center w-full">
        <p className="uppercase text-xl pl-4">Blocks</p>
        <div className="w-6/12 max-sm:w-10/12 relative z-10">
          <InputSearch
            name="search"
            search={true}
            placeholder="Search by Address, Txn Hash, Block Height..."
          />
        </div>
      </div>
      <div className=" bg-white mt-6 mb-10 p-5 rounded-xl shadow-xl overflow-x-auto">
        <div className="overflow-x-auto">
          <DataTable headers={tableHeaders}>
            {[...blocks]
              .slice(SKIP - 25, SKIP)
              .map((block: blocks, index: number) => (
                <tr key={index} className="border-y border-gray-bera">
                  <td className="border-0 text-black font-bold">
                    <Link
                      href={`/block/${block.block_hash}`}
                      className="text-blue_primary"
                    >{`${shortHash(block.block_hash)}`}</Link>
                  </td>
                  <td className="border-0 text-black font-bold">
                    <Link
                      href={`/block/${block.block_hash}`}
                      className="text-blue_primary"
                    >{`${block.number}`}</Link>
                  </td>
                  <td className="border-0">
                    {block.timestamp && (
                      <FromNow
                        datetime={formatISO(
                          new Date(Number(block.timestamp) * 1000)
                        )}
                      />
                    )}
                  </td>
                  <td className="border-0">
                    {block.transactions !== null
                      ? Number(block.transactions)
                      : ""}
                  </td>
                  <td className="border-0">
                    {block.gas_used !== null
                      ? Number(block.gas_used).toLocaleString("en-US")
                      : ""}
                  </td>
                  <td className="border-0">
                    {block.gas_limit !== null ? Number(block.gas_limit) : "N/A"}
                  </td>
                  <td className="border-0">
                    {block.size !== null ? Number(block.size) : ""}
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

    const PAGE_SIZE = 25;
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
