import { formatISO } from "date-fns";
import Link from "next/link";

import FromNow from "./FromNow";
import { shortHash } from "@/utils";
import React from "react";
import { getLatestTransactions } from "@/utils/txns";
import { getLatestBlocks } from "@/utils/blocks";
import DataTable from "./DataTable";
import Pagination from "./Pagination";

function BaseTable({
  children,
  headers,
}: {
  headers: string[];
  children: JSX.Element[];
}) {
  return (
    <table className="table w-full text-black">
      <thead className="text-black">
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
  const headers = ["Block", "Date & Time", "Size (mb)", "Relays", "Nodes"];
  const lastBlockHeightData = getLatestBlocks();
  const [data] = await Promise.all([lastBlockHeightData]);

  return (
    <BaseTable headers={headers}>
      {data &&
        data.map((block, index) => (
          <tr
            key={index}
            className="border-y border-gray-bera border-l-4 border-l-transparent hover:bg-blue-100/25 hover:border-l-blue_primary"
          >
            <td className="border-0 text-black font-bold hover:text-blue_primary">
              <Link href={`/block/${block.height}`}>{`${block.height}`}</Link>
            </td>
            <td className="border-0">
              {block.time && (
                <FromNow datetime={formatISO(new Date(block.time))} />
              )}
            </td>
            <td className="border-0">{"N/A"}</td>
            <td className="border-0">
              {block.tx_total !== null ? block.tx_total.toString() : "N/A"}
            </td>
            <td className="border-0">
              {block.tx_count !== null ? block.tx_count.toString() : "N/A"}
            </td>
          </tr>
        ))}
    </BaseTable>
  );
}

export async function LatestTransactionsTable() {
  const headers = ["Transaction ID", "Method", "Block", "From", "To"];
  const data = await getLatestTransactions();
  return (
    <BaseTable headers={headers}>
      {data &&
        data.map((txn, index) => (
          <tr
            key={index}
            className="border-y font-medium border-gray-bera border-l-4 border-l-transparent hover:bg-blue-100/25 hover:border-l-blue_primary"
          >
            <td className="border-0 text-black truncate hover:text-blue_primary">
              <Link
                href={
                  txn.transaction_hash
                    ? `/transaction/${txn.transaction_hash}`
                    : "/"
                }
              >
                {txn.transaction_hash ? shortHash(txn.transaction_hash) : "N/A"}
              </Link>
            </td>
            <td className="border-0 w-6">
              <p className="font-normal uppercase text-sm rounded-full text-white bg-neutral-400/75 text-center py-0.5 px-4">
                Transfer
              </p>
            </td>
            <td className="border-0 text-black hover:text-blue_primary">
              <Link href={`/block/${txn.height}`}>
                {txn.height !== null ? txn.height.toString() : "N/A"}
              </Link>
            </td>
            <td className="border-0 xl:pr-0 text-black hover:text-blue_primary">
              <Link href={`/address/${txn.from_address}`}>
                {txn.from_address ? shortHash(txn.from_address) : "N/A"}
              </Link>
            </td>
            <td className="border-0 text-black hover:text-blue_primary">
              <Link href={`/address/${txn.to_address}`}>
                {txn.to_address ? shortHash(txn.to_address) : "N/A"}
              </Link>
            </td>
          </tr>
        ))}
    </BaseTable>
  );
}

interface MakerTransation {
  data: { pair: string; volume: number }[];
}

export async function LatestMakerTable({ data }: MakerTransation) {
  const headers = ["#", "Pair", "Volume"];
  return (
    <BaseTable headers={headers}>
      {data &&
        data.map((row, index) => (
          <tr
            key={index}
            className="border-y border-gray-bera border-l-4 border-l-transparent hover:bg-blue-100/25 hover:border-l-blue_primary"
          >
            <td className="border-0 text-black">{index + 1}</td>
            <td className="border-0 font-bold">{row.pair}</td>
            <td className="border-0">{row.volume}</td>
          </tr>
        ))}
    </BaseTable>
  );
}

interface MakerBlockTransation {
  data: {
    exchange: string;
    pair: string;
    price: number;
    volume: number;
    supply: number;
  }[];
}

export async function LatestMakerBlockTable({ data }: MakerBlockTransation) {
  const headers = ["Exchange", "Pair", "Price", "Daily Volume", "Supply"];
  return (
    <BaseTable headers={headers}>
      {data &&
        data.map((row, index) => (
          <tr
            key={index}
            className="border-y border-gray-bera border-l-4 border-l-transparent hover:bg-blue-100/25 hover:border-l-blue_primary"
          >
            <td className="border-0 text-black">{row.exchange}</td>
            <td className="border-0">{row.pair}</td>
            <td className="border-0">
              {row.price.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </td>
            <td className="border-0">
              {row.volume.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </td>
            <td className="border-0">
              {row.supply.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </td>
          </tr>
        ))}
    </BaseTable>
  );
}

interface MakerExchange {
  data: { pair: string; volume: number }[];
}

export async function LatestExchangeTable({ data }: MakerExchange) {
  const headers = ["Exchange", "Pair", "Price", "Daily Volume", "Supply"];
  return (
    <BaseTable headers={headers}>
      {data &&
        data.map((row, index) => (
          <tr
            key={index}
            className="border-y border-gray-bera border-l-4 border-l-transparent hover:bg-blue-100/25 hover:border-l-blue_primary"
          >
            <td className="border-0 text-black">{index + 1}</td>
            <td className="border-0 font-bold">{row.pair}</td>
            <td className="border-0">{row.volume}</td>
          </tr>
        ))}
    </BaseTable>
  );
}

interface GovernanceProsp {
  data: { block: string; status: string; height: number }[];
}

export async function GovernanceTable({ data }: GovernanceProsp) {
  const headers = ["Features", "Status", "Height"];
  return (
    <BaseTable headers={headers}>
      {data &&
        data.map((row, index) => (
          <tr
            key={index}
            className="border-y border-gray-bera border-l-4 border-l-transparent hover:bg-blue-100/25 hover:border-l-blue_primary"
          >
            <td className="border-0 text-black">{row.block}</td>
            <td className="border-0 text-emerald-600">{row.status}</td>
            <td className="border-0">{row.height}</td>
          </tr>
        ))}
    </BaseTable>
  );
}

interface GovernanceTable2 {
  data: { parameters: string; amount: number }[];
}

export async function GovernanceTable2({ data }: GovernanceTable2) {
  const headers = ["Parameters", "Amount"];
  return (
    <BaseTable headers={headers}>
      {data &&
        data.map((row, index) => (
          <tr
            key={index}
            className="border-y border-gray-bera border-l-4 border-l-transparent hover:bg-blue-100/25 hover:border-l-blue_primary"
          >
            <td className="border-0 text-black">{row.parameters}</td>
            <td className="border-0">{row.amount}</td>
          </tr>
        ))}
    </BaseTable>
  );
}
