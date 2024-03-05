"use client";
import Link from "next/link";
import Stats from "@/components/Stats";
import {
  LatestBlocksTable,
  LatestTransactionsTable,
} from "@/components/tables";
import Stadist from "@/components/Stadist";

export const revalidate = 60;
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

const transactions = [
  {
    hash: "0x123456789abcdef",
    blockchains: "Ethereum",
    height: 1234,
    from_address: "0x9876543210ABCDEF",
    to_address: "0xFEDCBA0987654321",
  },
  {
    hash: "0x23456789abcdef0",
    blockchains: "Bitcoin",
    height: 1234,
    from_address: "0xFEDCBA0987654321",
    to_address: "0x9876543210ABCDEF",
  },
  {
    hash: "0x3456789abcdef01",
    blockchains: "Ethereum",
    height: 1235,
    from_address: "0xABCDEF1234567890",
    to_address: "0xFEDCBA0987654321",
  },
  {
    hash: "0x456789abcdef0123",
    blockchains: "Ethereum",
    height: 1236,
    from_address: "0xFEDCBA0987654321",
    to_address: "0xABCDEF1234567890",
  },
  {
    hash: "0x56789abcdef01234",
    blockchains: "Bitcoin",
    height: 1238,
    from_address: "0xABCDEF1234567890",
    to_address: "0xFEDCBA0987654321",
  },
  {
    hash: "0x6789abcdef012345",
    blockchains: "Bitcoin",
    height: 1239,
    from_address: "0xFEDCBA0987654321",
    to_address: "0xABCDEF1234567890",
  },
  {
    hash: "0x789abcdef0123456",
    blockchains: "Ethereum",
    height: 1241,
    from_address: "0xABCDEF1234567890",
    to_address: "0xFEDCBA0987654321",
  },
  {
    hash: "0x89abcdef01234567",
    blockchains: "Bitcoin",
    height: 1241,
    from_address: "0xFEDCBA0987654321",
    to_address: "0xABCDEF1234567890",
  },
  {
    hash: "0x9abcdef012345678",
    blockchains: "Ethereum",
    height: 1242,
    from_address: "0xABCDEF1234567890",
    to_address: "0xFEDCBA0987654321",
  },
  {
    hash: "0xabcdef0123456789",
    blockchains: "Bitcoin",
    height: 1243,
    from_address: "0xFEDCBA0987654321",
    to_address: "0xABCDEF1234567890",
  },
];

export default async function Home() {
  return (
    <main className="flex flex-col py-11 px-10 max-sm:p-4 ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full self-center">
        {/* @ts-expect-error Async Server Component */}
        <Stats />
        {/* @ts-expect-error Async Server Component */}
        <Stadist />
        <div className="flex flex-col bg-white px-4 py-6 rounded-xl shadow-xl max-sm:col-span-2 w-full">
          <div className="overflow-x-auto w-full">
            <h6 className="ml-3 mb-2 text-xl text-black">Latest Blocks</h6>
            <hr />
            {/* @ts-expect-error Async Server Component */}
            <LatestBlocksTable data={blocks} />
          </div>
          <Link
            href="/block"
            className="btn btn-outline mt-2 border-black text-black rounded-full"
          >
            View all blocks
          </Link>
        </div>
        <div className="flex flex-col bg-white px-4 py-6 rounded-xl shadow-xl max-sm:col-span-2 w-full">
          <div className="overflow-x-auto w-full">
            <h6 className="ml-3 mb-2 text-xl text-black">
              Latest Transactions
            </h6>
            <hr />
            {/* @ts-expect-error Async Server Component */}
            <LatestTransactionsTable data={transactions} />
          </div>
          <Link
            href="/transaction"
            className="btn btn-outline mt-2 border-black text-black rounded-full"
          >
            View all transactions
          </Link>
        </div>
      </div>
    </main>
  );
}
