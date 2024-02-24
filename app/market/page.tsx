import { DoughnutsChartMakert } from "@/components/charts";
import { LatestMakerTable } from "@/components/tables";

export default async function Market() {
  const transactions = [
    { pair: "BTC/USD", volume: 100 },
    { pair: "ETH/USD", volume: 200 },
    { pair: "XRP/USD", volume: 150 },
    { pair: "LTC/USD", volume: 180 },
    { pair: "BCH/USD", volume: 220 },
  ];

  return (
    <div className="grow p-6 max-sm:p-4 max-sm:py-4 flex flex-col gap-8">
      <div className="flex flex-row max-sm:flex-col max-sm:gap-2 gap-4">
        <div className="flex flex-col p-5 gap-2 bg-white rounded-xl shadow-lg lg:w-9/12">
          <div className="mt-8 md:mt-0 max-sm:mt-0">
            <div className="flex justify-start flex-row items-start">
              <p className="mb-4 text-black font-semibold text-xl">
                Volume Trading
              </p>
              <p className="font-medium text-base rounded-full max-sm:ml-3 ml-5 text-gray-400 outline-1 outline-double outline-gray-400 text-center py-0.5 px-4">
                24h
              </p>
            </div>
            <p className="mb-4 text-black font-semibold text-sm">CEX/DEX/OTC</p>
            <hr className="border-gray-bera w-12/12 mx-4 justify-self-center" />
            <div className="w-full h-full max-h-96 p-4">
              {/* @ts-expect-error Async Server Component */}
              <DoughnutsChartMakert />
            </div>
          </div>
        </div>

        <div className="flex flex-col p-5 gap-2 bg-white rounded-xl shadow-lg w-full">
          <div className="mt-8 md:mt-0 max-sm:mt-0">
            <div className="flex justify-start flex-row items-start">
              <p className="mb-4 text-black font-semibold text-xl">
                Top CEX/DEX/OTC Trading Pairs{" "}
              </p>
              <p className="font-medium text-base rounded-full max-sm:ml-3 ml-5 text-gray-400 outline-1 outline-double outline-gray-400 text-center py-0.5 px-4">
                24h
              </p>
            </div>
            <p className="mb-4 text-black font-semibold text-sm">By Volume</p>
            <div className="w-full h-full max-h-96">
              {/* @ts-expect-error Async Server Component */}
              <LatestMakerTable data={transactions} />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col p-5 gap-2 bg-white rounded-xl shadow-lg w-full">
        <div className="mt-8 md:mt-0 max-sm:mt-0">
          <div className="flex justify-start flex-row items-start">
            <p className="mb-4 text-black font-semibold text-xl">
              Exchanges Trading POKT
            </p>
          </div>
          <div className="w-full h-full max-h-96">
            {/* @ts-expect-error Async Server Component */}
            <LatestMakerTable data={transactions} />
          </div>
        </div>
      </div>
    </div>
  );
}