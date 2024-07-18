/* eslint-disable @next/next/no-img-element */
import InputSearch from "@/components/InputSearch";
import Loading from "@/components/Loading";
import Stadist from "@/components/Stadist";
import Stats from "@/components/Stats";
import {
  LatestBlocksTable,
  LatestTransactionsTable,
} from "@/components/tables";
import { blocks } from "@prisma/client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [homeData, setHomeData] = useState<{
    dataBlock: blocks[];
    dataChart: any;
    dataTrasaction: any;
    txTransation: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const response = await axios.get("/api/home");
        setHomeData(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <main className="flex flex-col">
      <div className="w-full flex flex-col justify-center items-center col-span-2 gap-6 gradient-bg py-56 max-sm:py-44 max-sm:pt-20 pt-36 relative">
        <div className="text-7xl max-sm:text-3xl flex w-full justify-center gap-4 font-semibold text-white relative z-10">
          <p>The</p>
          <p className="font-light">Mega</p>
          <p>Explorer</p>
        </div>
        <div className="px-56 w-full max-sm:px-2 relative z-10">
          <InputSearch
            name="search"
            search={true}
            placeholder="Search by Address, Txn Hash, Block Height..."
          />
        </div>
        <div className="absolute left-0 bottom-0 z-0 opacity-60">
          <img src="/icons/team.svg" className="wigtg" alt="team" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full self-center -translate-y-36 max-sm:-translate-y-20 px-10 -mb-28 max-sm:p-4">
        <Stats
          dataChart={homeData?.dataChart}
          dataBlock={homeData?.dataBlock[0]}
          txTransation={homeData?.txTransation || 0}
        />

        <div className="flex flex-col bg-white px-4 py-6 rounded-xl shadow-xl max-sm:col-span-2 w-full">
          <div className="w-full overflow-x-auto">
            <h6 className="ml-3 mb-2 text-xl text-black">Latest Blocks</h6>
            <hr />
            <div className="overflow-x-auto">
              <LatestBlocksTable data={homeData?.dataBlock || []} />
            </div>
          </div>
          <Link
            href="/block"
            className="btn btn-outline mt-2 rounded-none border-2 border-black text-black tracking-widest"
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
              <LatestTransactionsTable data={homeData?.dataTrasaction} />
            </div>
          </div>
          <Link
            href="/transaction"
            className="btn btn-outline mt-2 rounded-none border-2 border-black text-black tracking-widest"
          >
            View all transactions
          </Link>
        </div>
      </div>
    </main>
  );
}
