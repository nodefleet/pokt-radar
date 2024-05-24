/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

import FromNow from "./FromNow";
import { bytesToMB, formatISO, shortHash } from "@/utils";
import React from "react";
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

export function LatestBlocksTable({ data }: { data: any[] }) {
  const headers = ["Block", "Date & Time", "Size (mb)", "Relays", "Nodes"];

  return (
    <BaseTable headers={headers}>
      {data &&
        data.map((block: any, index: number) => (
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
            <td className="border-0">{bytesToMB(block.block_size)}</td>
            <td className="border-0">
              {block.total_relays_completed !== null
                ? block.total_relays_completed.toLocaleString("en-US")
                : "N/A"}
            </td>
            <td className="border-0">
              {block.total_nodes !== null
                ? block.total_nodes.toLocaleString("en-US")
                : "N/A"}
            </td>
          </tr>
        ))}
    </BaseTable>
  );
}

export function LatestTransactionsTable({ data }: { data: any }) {
  const tableHeaders = ["Transaction ID", "Status", "Type", "Block", "From"];
  return (
    <DataTable headers={tableHeaders}>
      {data
        .filter((txn: { _id: any }) => txn._id)
        .map((txn: any, index: number) => {
          return (
            <tr key={index} className="border-y border-gray-bera">
              <td className="border-0 text-black font-bold hover:text-blue_primary">
                <Link href={`/transaction/${txn.hash}`}>
                  {txn.hash && shortHash(txn.hash)}
                </Link>
              </td>
              <td className="border-0 w-8">
                <p
                  className={`font-normal uppercase text-base rounded-full text-white -translate-x-4 ${
                    txn.result_code === 0
                      ? "bg-green-600"
                      : txn.pending
                      ? "bg-amber-600"
                      : txn.result_code !== 0 && "bg-red-600"
                  } text-center py-0.5 px-4 truncate`}
                >
                  {txn.result_code === 0
                    ? "Success"
                    : txn.pending
                    ? "Pending"
                    : txn.result_code !== 0 && "Failed"}
                </p>
              </td>
              <td className="border-0 capitalize">{txn.type}</td>
              <td className="border-0 font-bold text-black hover:text-blue_primary">
                <Link href={`/block/${txn.height}`}>
                  {txn.height && txn.height.toString()}
                </Link>
              </td>
              <td className="border-0 xl:pr-0 font-bold text-black hover:text-blue_primary">
                <Link href={`/address/${txn.from_address}`}>
                  {txn.from_address ? shortHash(txn.from_address) : "N/A"}
                </Link>
              </td>
            </tr>
          );
        })}
    </DataTable>
  );
}

export function LatestMakerTable({ cex, dex }: { cex: any[]; dex: any[] }) {
  const headers = ["#", "Pair", "Volume"];
  const filteredDex = dex.filter((item) => item.market.name !== "Bilaxy");
  const filteredCex = dex.filter((item) => item.market.name === "Bilaxy");
  filteredCex[0].supply = "CEX";

  const addSupplyField = (item: any) => {
    item.supply = cex.some(
      (cexItem) => cexItem.market.name === item.market.name
    )
      ? "CEX"
      : "DEX";
    return item;
  };
  const cexWithSupply = cex.map(addSupplyField);
  const dexWithSupply = filteredDex.map(addSupplyField);

  const mergedArray = [...cexWithSupply, ...dexWithSupply, ...filteredCex];
  const groupedData: { [pair: string]: number } = mergedArray.reduce(
    (acc, row) => {
      const { target, base } = row;
      const pair = base + "/" + target;
      acc[pair] = (acc[pair] || 0) + row.converted_volume.usd;
      return acc;
    },
    {}
  );

  const groupedPairs = Object.keys(groupedData).map((pair) => ({
    pair,
    totalVolumePercentage: parseFloat(groupedData[pair].toFixed(2)),
  }));

  groupedPairs.sort(
    (a, b) => b.totalVolumePercentage - a.totalVolumePercentage
  );
  return (
    <BaseTable headers={headers}>
      {cex &&
        groupedPairs.map((row, index) => (
          <tr
            key={index}
            className="border-y border-gray-bera border-l-4 border-l-transparent hover:bg-blue-100/25 hover:border-l-blue_primary"
          >
            <td className="border-0 text-black">{index + 1}</td>
            <td className="border-0 text-black font-bold truncate max-w-16">
              {row.pair}
            </td>
            <td className="border-0">
              {row.totalVolumePercentage.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </td>
          </tr>
        ))}
    </BaseTable>
  );
}

export function LatestRelayTable({
  data,
}: {
  data: { chain: string; total_relays: number; logoURL: string }[];
}) {
  const headers = ["#", "Chain", "Relay"];
  if (data.length === 0) {
    return (
      <div className="flex justify-center items-center p-4 text-2xl">
        <h2 className="font-medium">Relay not found</h2>
      </div>
    );
  }
  return (
    <BaseTable headers={headers}>
      {data &&
        data
          .sort((a, b) => b.total_relays - a.total_relays)
          .map((row, index) => (
            <tr
              key={index}
              className="border-y border-gray-bera border-l-4 border-l-transparent hover:bg-blue-100/25 hover:border-l-blue_primary"
            >
              <td className="border-0 text-black">
                <img
                  src={row.logoURL}
                  alt={`logo_${row.logoURL}`}
                  className="max-w-10 max-h-10 rounded-full shadow-xl "
                />
              </td>
              <td className="border-0 font-bold">{row.chain}</td>
              <td className="border-0">
                {row.total_relays.toLocaleString("en-EN")}
              </td>
            </tr>
          ))}
    </BaseTable>
  );
}

export function LatestMakerBlockTable({
  cex,
  dex,
  image,
}: {
  cex: any[];
  dex: any[];
  image: any[];
}) {
  const headers = [
    "Exchange",
    "Pair",
    "Price",
    "Daily Volume",
    "Supply",
    "Last Update",
  ];
  const filteredDex = dex.filter((item) => item.market.name !== "Bilaxy");
  const filteredCex = dex.filter((item) => item.market.name === "Bilaxy");
  filteredCex[0].supply = "CEX";

  const addSupplyField = (item: any) => {
    item.supply = cex.some(
      (cexItem) => cexItem.market.name === item.market.name
    )
      ? "CEX"
      : "DEX";
    return item;
  };
  const cexWithSupply = cex.map(addSupplyField);
  const dexWithSupply = filteredDex.map(addSupplyField);

  const mergedArray = [...cexWithSupply, ...dexWithSupply, ...filteredCex];

  return (
    <BaseTable headers={headers}>
      {cex &&
        mergedArray.map((row, index) => {
          return (
            <tr
              key={index}
              className="border-y border-gray-bera border-l-4 border-l-transparent hover:bg-blue-100/25 hover:border-l-blue_primary"
            >
              <td className="border-0 flex justify-start items-center gap-4">
                <img
                  src={
                    image.find((x) => x.exchange === row.market.name)
                      ?.imageURL ||
                    "https://th.bing.com/th/id/OIP.wV3DwlQhuq0YkHOeVKWRugHaH_?rs=1&pid=ImgDetMain"
                  }
                  alt={`logo_${row.trade_url}`}
                  className="w-10 h-10 rounded-full shadow-xl "
                />
                <p>{row.market.name}</p>
              </td>
              <td className="border-0 text-black truncate max-w-36">
                {row.base + "/" + row.target}
              </td>
              <td className="border-0 w-16">{row.last}</td>
              <td className="border-0">
                {row.converted_volume.usd.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </td>
              <td className="border-0">{row.supply}</td>
              <td className="border-0">
                <FromNow datetime={formatISO(new Date(row.timestamp))} />
              </td>
            </tr>
          );
        })}
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

export function GovernanceTable({ data }: GovernanceProsp) {
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

export function GovernanceTable2({ data }: GovernanceTable2) {
  const headers = ["Parameters", "Amount"];
  return (
    <BaseTable headers={headers}>
      {data &&
        data.map((row, index) => (
          <tr
            key={index}
            className="border-y border-gray-bera border-l-4 border-l-transparent hover:bg-blue-100/25 hover:border-l-blue_primary"
          >
            <td className="border-0 text-black">{row?.parameters}</td>
            <td className="border-0">
              {parseFloat((row?.amount / 10 ** 6).toFixed(2)).toLocaleString()}
            </td>
          </tr>
        ))}
    </BaseTable>
  );
}

export function GovernanceTableTransaction({
  data,
  PAGE_SIZE,
  PAGE_LIMIT,
  page,
}: {
  data: any[];
  PAGE_SIZE: number;
  PAGE_LIMIT: number;
  page: number;
}) {
  const tableHeaders = [
    "",
    "Status",
    "Type",
    "Total POKT",
    "Transaction ID",
    "From",
    "To",
  ];
  console.log(data);
  return (
    <div
      className="flex flex-col p-5 gap-2 bg-white rounded-xl shadow-lg w-full"
      id="Transaction"
    >
      <div className="mt-8 md:mt-0 max-sm:mt-0">
        <div className="flex justify-between flex-row gap-3 max-sm:flex-col items-center">
          <div className="flex justify-start flex-row items-start">
            <p className="mb-4 text-black font-semibold text-xl">
              Latest Transactions
            </p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <DataTable headers={tableHeaders}>
            {data.map((txn, index: number) => (
              <tr key={index} className="border-y border-gray-bera">
                <td className="border-0">
                  <i className="fas fa-angle-right"></i>
                </td>
                <td className="border-0">
                  <p className="font-normal uppercase text-base rounded-full text-white bg-green-600 text-center py-0.5 truncate">
                    Success
                  </p>
                </td>
                <td className="border-0 capitalize">
                  {txn.type.split("_").join(" ")}
                </td>
                <td className="border-0 text-black">
                  {txn.type === "dao_tranfer"
                    ? parseFloat(
                        (txn.amount / 10 ** 6).toFixed(2)
                      ).toLocaleString()
                    : txn.total_pokt !== 0
                    ? txn.total_pokt
                    : "-"}
                </td>
                <td className="border-0 text-black font-bold hover:text-blue_primary">
                  <Link href={`/transaction/${txn.hash}`}>
                    {txn.hash && shortHash(txn.hash)}
                  </Link>
                </td>
                <td className="border-0 xl:pr-0 font-bold text-black hover:text-blue_primary">
                  <Link href={`/address/${txn.from_address}`}>
                    {txn.from_address && shortHash(txn.from_address)}
                  </Link>
                </td>
                <td className="border-0 font-bold text-black hover:text-blue_primary">
                  <Link href={`/address/${txn.to_address}`}>
                    {txn.to_address && shortHash(txn.to_address)}
                  </Link>
                </td>
              </tr>
            ))}
          </DataTable>
          <div className="flex mt-4 justify-end">
            <Pagination
              path="/governance"
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

export function AddressTransactionsDetail({
  data,
  PAGE_SIZE,
  block,
  page,
  txtrow,
  address,
  path,
}: {
  data: any[];
  PAGE_SIZE: number;
  page: number;
  block?: { block: number | undefined };
  txtrow: number;
  address?: { address: string | undefined };
  path: string;
}) {
  const tableHeaders = [
    "Transaction ID",
    "Status",
    "Type",
    "Block",
    "From",
    "To",
    "Value",
    "Memo",
    "Date & Time",
  ];

  if (data.length === 0) {
    return (
      <div className="flex justify-center items-center w-full p-4">
        <h2 className="font-medium text-xl">
          Currently, there are no transactions.
        </h2>
      </div>
    );
  }
  return (
    <div className="flex flex-col">
      <DataTable headers={tableHeaders}>
        {data
          .filter((txn) => txn._id)
          .map((txn, index: number) => {
            return (
              <tr key={index} className="border-y border-gray-bera">
                <td className="border-0 text-black font-bold hover:text-blue_primary">
                  <Link href={`/transaction/${txn.hash}`}>
                    {txn.hash && shortHash(txn.hash)}
                  </Link>
                </td>
                <td className="border-0 w-8">
                  <p
                    className={`font-normal uppercase text-base rounded-full text-white -translate-x-4 ${
                      txn.result_code === 0
                        ? "bg-green-600"
                        : txn.pending
                        ? "bg-amber-600"
                        : txn.result_code !== 0 && "bg-red-600"
                    } text-center py-0.5 px-4 truncate`}
                  >
                    {txn.result_code === 0
                      ? "Success"
                      : txn.pending
                      ? "Pending"
                      : txn.result_code !== 0 && "Failed"}
                  </p>
                </td>
                <td className="border-0 capitalize">{txn.type}</td>
                <td className="border-0 font-bold text-black hover:text-blue_primary">
                  <Link href={`/block/${txn.height}`}>
                    {txn.height && txn.height.toString()}
                  </Link>
                </td>
                <td className="border-0 xl:pr-0 font-bold text-black hover:text-blue_primary">
                  <Link href={`/address/${txn.from_address}`}>
                    {txn.from_address ? shortHash(txn.from_address) : "N/A"}
                  </Link>
                </td>
                <td className="border-0 font-bold text-black hover:text-blue_primary">
                  <Link href={`/address/${txn.to_address}`}>
                    {txn.to_address ? shortHash(txn.to_address) : "N/A"}
                  </Link>
                </td>
                <td className="border-0 text-black">
                  {txn.type === "proof"
                    ? txn.total_pokt.toFixed(2) + " POKT"
                    : txn.amount === 0
                    ? "-"
                    : parseFloat(
                        (txn.amount / 10 ** 6).toFixed(2)
                      ).toLocaleString() + " POKT" || "N/A"}
                </td>
                <td className="border-0 text-black">{txn.memo || "N/A"}</td>
                <td className="border-0 text-black">
                  {txn.block_time && new Date(txn.block_time).toLocaleString()}
                </td>
              </tr>
            );
          })}
      </DataTable>
      <div className="flex mt-4 justify-end">
        <Pagination
          path={path}
          searchParams={(block && block) || (address && address)}
          currentPage={page}
          size={PAGE_SIZE}
          total={txtrow}
        />
      </div>
    </div>
  );
}
