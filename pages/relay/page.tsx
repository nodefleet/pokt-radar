import InputSearch from "@/components/InputSearch";
import { RadioButtonGroup } from "@/components/RadioButton";
import { DoughnutsChartMakert, DoughnutsChartRelay } from "@/components/charts";
import { LatestMakerTable, LatestRelayTable } from "@/components/tables";
import { getRelaysByChains } from "@/utils/relay";
import { getTransactionStats } from "@/utils/txns";

export default async function Relays() {
  const transactions = [
    { pair: "BTC/USD", volume: 100 },
    { pair: "ETH/USD", volume: 200 },
    { pair: "XRP/USD", volume: 150 },
    { pair: "LTC/USD", volume: 180 },
    { pair: "BCH/USD", volume: 220 },
  ];
  const radio = [
    { label: "All", value: "1" },
    { label: "Nodies", value: "2" },
    { label: "Grove", value: "3" },
  ];
  const { dataRelay, dataChart } = await getRelaysByChains();
  return (
    <div className="grow p-6 max-sm:p-4 max-sm:py-4 flex flex-col gap-8">
      <div className="flex flex-row max-sm:flex-col max-sm:gap-2 gap-4">
        <div className="flex flex-col p-5 gap-2 bg-white rounded-xl shadow-lg w-full">
          <div className="mt-8 md:mt-0 max-sm:mt-0">
            <div className="flex justify-between flex-row gap-3 max-sm:flex-col items-center">
              <div className="flex justify-start flex-row items-center w-full">
                <p className="mb-4 text-black font-semibold text-xl">
                  Relays By Chain
                </p>
                <p className="font-medium text-base rounded-full max-sm:ml-3 ml-5 text-gray-400 outline-1 outline-double outline-gray-400 text-center py-0.5 px-4 -translate-y-2">
                  30D
                </p>
              </div>
              {/* <RadioButtonGroup data={radio} /> */}
              <InputSearch
                name="relaySearch"
                placeholder="Search..."
                className="w-full"
              />
            </div>
            <div className="w-full h-full max-h-96 overflow-auto">
              <LatestRelayTable data={dataRelay} />
            </div>
          </div>
        </div>

        <div className="flex flex-col p-5 gap-2 bg-white rounded-xl shadow-lg lg:w-7/12">
          <div className="mt-8 md:mt-0 max-sm:mt-0">
            <div className="flex justify-between flex-row gap-3 max-sm:flex-col items-center">
              <div className="flex justify-start flex-row items-start">
                <p className="mb-4 text-black font-semibold text-xl">
                  Relays Distribution
                </p>
                <p className="font-medium text-base rounded-full max-sm:ml-3 ml-5 text-gray-400 outline-1 outline-double outline-gray-400 text-center py-0.5 px-4">
                  24h
                </p>
              </div>
            </div>
            <p className="mb-4 text-black font-semibold text-sm">By Chain</p>
            <hr className="border-gray-bera w-12/12 mx-4 justify-self-center" />
            <div className="w-full h-full max-h-96 p-4">
              <DoughnutsChartRelay resultDought={dataChart} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
