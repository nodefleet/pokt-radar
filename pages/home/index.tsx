import Loading from "@/components/Loading";
import Stadist from "@/components/Stadist";
import Stats from "@/components/Stats";
import {
  LatestBlocksTable,
  LatestTransactionsTable,
} from "@/components/tables";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [homeData, setHomeData] = useState<{
    dataBlock: any;
    dataChartVetical: any;
    dataTrasaction: any;
    lastBlock: any;
    market: any;
    price: any;
    resultDought: any;
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
    <main className="flex flex-col py-11 px-10 max-sm:p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full self-center">
        <Stats
          lastBlock={homeData?.lastBlock}
          price={homeData?.price}
          market={homeData?.market}
        />
        <Stadist
          dataChart={homeData?.dataChartVetical}
          resultDought={homeData?.resultDought}
        />
        <div className="flex flex-col bg-white px-4 py-6 rounded-xl shadow-xl max-sm:col-span-2 w-full">
          <div className="w-full overflow-x-auto">
            <h6 className="ml-3 mb-2 text-xl text-black">Latest Blocks</h6>
            <hr />
            <div className="overflow-x-auto">
              <LatestBlocksTable data={homeData?.dataBlock} />
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
              <LatestTransactionsTable data={homeData?.dataTrasaction} />
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
