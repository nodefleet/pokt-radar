import React, { useState, useEffect } from "react";
import Stadist from "@/components/Stadist";
import Stats from "@/components/Stats";
import {
  LatestBlocksTable,
  LatestTransactionsTable,
} from "@/components/tables";
import { getTransactionStats } from "@/utils/txns";
import Link from "next/link";

export default function Home() {
  const [state, setState] = useState({
    dataChartVetical: [],
    resultDought: [],
    loading: true,
    error: "",
  });

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const { dataChartVetical, resultDought } = await getTransactionStats();
        console.log(dataChartVetical);
        setState({
          dataChartVetical,
          resultDought,
          loading: false,
          error: "",
        });
      } catch (error) {
        console.error("Error fetching transaction stats:", error);
        setState({
          dataChartVetical: [],
          resultDought: [],
          loading: false,
          error: "Error fetching transaction stats",
        });
      }
    }
    fetchTransactions();
  }, []);

  if (state.loading) {
    return <div>Loading...</div>;
  }

  if (state.error) {
    return <div>Error: {state.error}</div>;
  }

  return (
    <main className="flex flex-col py-11 px-10 max-sm:p-4 ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full self-center">
        {/* @ts-expect-error Async Server Component */}
        <Stats />
        <Stadist
          dataChart={state.dataChartVetical}
          resultDought={state.resultDought}
        />
        <div className="flex flex-col bg-white px-4 py-6 rounded-xl shadow-xl max-sm:col-span-2 w-full">
          <div className="w-full overflow-x-auto">
            <h6 className="ml-3 mb-2 text-xl text-black">Latest Blocks</h6>
            <hr />
            <div className="overflow-x-auto">
              {/* @ts-expect-error Async Server Component */}
              <LatestBlocksTable />
            </div>
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
            <div className="overflow-x-auto">
              {/* @ts-expect-error Async Server Component */}
              <LatestTransactionsTable />
            </div>
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