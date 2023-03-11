import moment from "moment";
import Link from "next/link";

import { getLatestBlocks } from "@/app/utils/blocks";
import { getLatestTransactions } from "@/app/utils/txns";
import { shortHash } from "@/app/utils";

function BaseTable({
  children,
  headers,
}: {
  headers: string[];
  children: JSX.Element[];
}) {
  return (
    <table className="table w-full text-gray-4">
      <thead className="text-gray-3">
        <tr>
          {headers.map((header, index) => (
            <th key={index} className="capitalize text-base">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
}

export async function LatestBlocksTable() {
  const headers = ["block", "time", "validator", "reward"];
  const latestBlocks = await getLatestBlocks();
  return (
    <BaseTable headers={headers}>
      {latestBlocks.map((block, index) => (
        <tr
          key={index}
          className="border-y border-gray-bera border-l-4 border-l-transparent hover:bg-transparent-cream hover:border-l-cream"
        >
          <td className="border-0 text-link">
            <Link href={`/block/${block.height}`}>{block.height}</Link>
          </td>
          <td className="border-0">{moment(block.createdAt).fromNow()}</td>
          <td className="border-0">{block.validator}</td>
          <td className="border-0">{block.reward}</td>
        </tr>
      ))}
    </BaseTable>
  );
}

export async function LatestTransactionsTable() {
  const headers = ["tx hash", "time", "amount"];
  const latestTransactions = await getLatestTransactions();
  return (
    <BaseTable headers={headers}>
      {latestTransactions.map((txn, index) => (
        <tr
          key={index}
          className="border-y border-gray-bera border-l-4 border-l-transparent hover:bg-transparent-cream hover:border-l-cream"
        >
          <td className="border-0 text-link">
            <Link href={`/transaction/${txn.hash}`}>{shortHash(txn.hash)}</Link>
          </td>
          <td className="border-0">{moment(txn.createdAt).fromNow()}</td>
          <td className="border-0">{txn.amount}</td>
        </tr>
      ))}
    </BaseTable>
  );
}
