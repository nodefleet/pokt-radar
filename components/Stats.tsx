import Image from "next/image";
import BeraIcon from "../public/bera.svg";
import MarketIcon from "../public/market.svg";
import BlockIcon from "../public/blocks.svg";
import TxnsIcon from "../public/txns.svg";
import { formatISO } from "date-fns";

import { getLastBlockHeight } from "@/utils/blocks";
import { getTotalTransactions, getTransactionStats } from "@/utils/txns";
import TransactionsChart from "./TransactionsChart";

export default async function Stats() {
  const lastBlockHeightData = getLastBlockHeight();
  const totalTxnsData = getTotalTransactions();
  const transactionStatsData = getTransactionStats();

  const [lastBlockHeight, totalTxns, transactionStats] = await Promise.all([
    lastBlockHeightData,
    totalTxnsData,
    transactionStatsData,
  ]);

  const statsSerialized = transactionStats.map((stat) => ({
    date: formatISO(stat.date, { representation: "date" }),
    count: stat.count.toString(),
  }));
  return (
    <div className="grid md:grid-cols-2 p-5 bg-white rounded-xl shadow-lg md:col-span-2">
      <div className="grid max-[480px]:grid-cols-1 grid-cols-2 gap-y-2 gap-x-10 mr-5">
        <div className="flex items-center">
          <Image src={BeraIcon} alt="Berachain icon" />
          <div className="ml-7 text-gray-3">
            <p className="text-sm leading-7">BERA Price</p>
            <p className="text-xl">$400.10</p>
          </div>
        </div>
        <div className="flex items-center">
          <Image src={BlockIcon} alt="Blockchain block icon" />
          <div className="ml-7 text-gray-3">
            <p className="text-sm leading-7">Height</p>
            <p className="text-xl">
              {lastBlockHeight?.block_height.toString()}
            </p>
          </div>
        </div>
        <hr className="border-gray-bera w-11/12 justify-self-center max-[480px]:hidden" />
        <hr className="border-gray-bera w-11/12 justify-self-center" />
        <div className="flex items-center">
          <Image src={MarketIcon} alt="Market cap icon" />
          <div className="ml-7 text-gray-3">
            <p className="text-sm leading-7">Market Cap</p>
            <p className="text-xl">$26,000,000.00</p>
          </div>
        </div>
        <div className="flex items-center">
          <Image src={TxnsIcon} alt="Blockchain transaction icon" />
          <div className="ml-7 text-gray-3">
            <p className="text-sm leading-7">Transactions</p>
            <p className="text-xl">{totalTxns}</p>
          </div>
        </div>
      </div>
      <div className="mt-8 md:mt-0">
        <p className="ml-10 text-gray-3">Past Transactions (15 days)</p>
        <div className="w-full max-w-[648px] max-h-[209px]">
          <TransactionsChart data={statsSerialized} />
        </div>
      </div>
    </div>
  );
}
