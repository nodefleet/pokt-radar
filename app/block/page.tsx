import moment from "moment";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import DataTable from "@/components/DataTable";
import Pagination from "@/components/Pagination";
import { getBlocks } from "../utils/getBlocks";

export default async function Transactions() {
  const tableHeaders = [
    "Block",
    "Time",
    "Txn",
    "Gas used",
    "Gas limit",
    "Base fee",
    "Burnt fee",
  ];

  const blocks = await getBlocks();

  return (
    <div className="mx-4 md:mx-24">
      <div className="flex flex-col items-start my-5 lg:flex-row lg:items-center lg:justify-between lg:my-10">
        <h1 className="mb-3 lg:mb-0 text-gray-3 text-2xl">Blocks</h1>
        <SearchBar />
      </div>

      <div className=" bg-white mt-6 mb-10 p-5 rounded-xl shadow-xl overflow-x-auto">
        <DataTable headers={tableHeaders}>
          {blocks.map((block, index: number) => (
            <tr key={index} className="border-y border-gray-bera">
              <td className="border-0 text-link">
                <Link href={`/block/${block.height}`}>{block.height}</Link>
              </td>
              <td className="border-0">{moment(block.createdAt).fromNow()}</td>
              <td className="border-0">{block.txn}</td>
              <td className="border-0">{block.gas_used}</td>
              <td className="border-0">{block.gas_limit}</td>
              <td className="border-0">{block.base_fee}</td>
              <td className="border-0">{block.burnt_fee}</td>
            </tr>
          ))}
        </DataTable>
        <div className="flex mt-4 justify-end">
          <Pagination />
        </div>
      </div>
    </div>
  );
}
