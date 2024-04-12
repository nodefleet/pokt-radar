import { DoughnutsChartMakert } from "@/components/charts";
import { LatestMakerBlockTable, LatestMakerTable } from "@/components/tables";
import { getMarket, getPoktPrice } from "@/utils/makert";

export default async function Market() {
  const { cex, dex }: any = await getPoktPrice();
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
              <DoughnutsChartMakert cex={cex} dex={dex} />
            </div>
          </div>
        </div>

        <div className="flex flex-col p-5 gap-2 bg-white rounded-xl shadow-lg w-full">
          <div className="mt-8 md:mt-0 max-sm:mt-0">
            <div className="flex justify-start flex-row items-start">
              <p className="mb-4 text-black font-semibold text-xl">
                Top Trading Pairs{" "}
              </p>
              <p className="font-medium text-base rounded-full max-sm:ml-3 ml-5 text-gray-400 outline-1 outline-double outline-gray-400 text-center py-0.5 px-4">
                24h
              </p>
            </div>
            <p className="mb-4 text-black font-semibold text-sm">By Volume</p>
            <div className="w-full h-full max-h-96 overflow-auto">
              <LatestMakerTable cex={cex} dex={dex} />
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
          <div
            className="w-full h-full overflow-x-auto"
            style={{ maxHeight: "600px" }}
          >
            <LatestMakerBlockTable cex={cex} dex={dex} image={getMarket} />
          </div>
        </div>
      </div>
    </div>
  );
}
