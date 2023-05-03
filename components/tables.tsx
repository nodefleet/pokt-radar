import { formatISO } from "date-fns";
import Link from "next/link";

import FromNow from "./FromNow";
import { getLatestBlocks } from "@/utils/blocks";
import { getLatestTransactions } from "@/utils/txns";
import { shortHash } from "@/utils";

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
  const headers = ["block", "time", "total transactions", "gas used"];
  const latestBlocks = await getLatestBlocks();
  return (
    <BaseTable headers={headers}>
      {latestBlocks.map((block, index) => (
        <tr
          key={index}
          className="border-y border-gray-bera border-l-4 border-l-transparent hover:bg-transparent-cream hover:border-l-cream"
        >
          <td className="border-0 text-link">
            <Link href={`/block/${block.block_height}`}>
              {`${block.block_height}`}
            </Link>
          </td>
          <td className="border-0">
            {block.timestamp && (
              <FromNow datetime={formatISO(block.timestamp)} />
            )}
          </td>
          <td className="border-0">{block.total_transactions}</td>
          <td className="border-0">{block.gas_used?.toFixed()}</td>
        </tr>
      ))}
    </BaseTable>
  );
}

export async function LatestTransactionsTable() {
  const headers = ["tx hash", "block", "time", "gas"];
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
          <td className="border-0">{txn.block_height.toString()}</td>
          <td className="border-0">
            {txn.timestamp && <FromNow datetime={formatISO(txn.timestamp)} />}
          </td>
          <td className="border-0">{txn.gas.toFixed()}</td>
        </tr>
      ))}
    </BaseTable>
  );
}
