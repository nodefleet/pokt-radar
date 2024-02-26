import InputSearch from "@/components/InputSearch";
import { RadioButtonGroup } from "@/components/RadioButton";
import { DoughnutsChartMakert, GovernancePage } from "@/components/charts";
import {
  GovernanceTable,
  GovernanceTable2,
  LatestMakerTable,
} from "@/components/tables";

export default function Governance() {
  const transactions = [
    { pair: "BTC/USD", volume: 100 },
    { pair: "ETH/USD", volume: 200 },
    { pair: "XRP/USD", volume: 150 },
    { pair: "LTC/USD", volume: 180 },
    { pair: "BCH/USD", volume: 220 },
  ];
  const block = [
    { block: "block123", status: "Activated", height: 5600 },
    { block: "block234", status: "Activated", height: 5890 },
    { block: "block345", status: "Activated", height: 6012 },
    { block: "block456", status: "Activated", height: 6125 },
    { block: "block567", status: "Activated", height: 6321 },
  ];
  const parametr = [
    { parameters: "Parameter1", amount: 100 },
    { parameters: "Parameter2", amount: 250 },
    { parameters: "Parameter3", amount: 500 },
    { parameters: "Parameter4", amount: 750 },
    { parameters: "Parameter5", amount: 1000 },
  ];
  return (
    <div className="grow p-6 max-sm:p-4 max-sm:py-4 flex flex-col gap-8">
      <div className="grid grid-cols-2 max-sm:gap-2 gap-4">
        <div className="flex flex-col p-5 gap-2 bg-white rounded-xl shadow-lg w-full">
          <div className="mt-8 md:mt-0 max-sm:mt-0">
            <div className="flex justify-between flex-row gap-3 max-sm:flex-col items-center">
              <div className="flex justify-start flex-row items-start">
                <p className="mb-4 text-black font-semibold text-xl">
                  Protocol Upgrade
                </p>
              </div>
            </div>
            <hr className="border-gray-bera w-12/12 mx-4 justify-self-center" />
            <div className="flex justify-between flex-row gap-3 max-sm:flex-col items-center p-3">
              <div className="flex justify-start flex-col gap-2 items-start w-full">
                <p className="text-black font-semibold text-xl">Version</p>
                <p className="font-normal">0.10.4</p>
              </div>
              <div className="flex justify-start flex-col gap-2 items-start w-full">
                <p className="text-black font-semibold text-xl">Height</p>
                <p className="font-normal">102687</p>
              </div>
              <div className="flex justify-start flex-col gap-2 items-start w-full">
                <p className="text-black font-semibold text-xl">Date</p>
                <p className="font-normal">August 1, 2023</p>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center h-full">
              <div className="w-full h-full">
                {/* @ts-expect-error Async Server Component */}
                <GovernanceTable data={block} />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col p-5 gap-2 bg-white rounded-xl shadow-lg w-full">
          <div className="mt-8 md:mt-0 max-sm:mt-0">
            <div className="flex justify-between flex-row gap-3 max-sm:flex-col items-center">
              <div className="flex justify-start flex-row items-center w-full">
                <p className="mb-4 text-black font-semibold text-xl">
                  Current Parameters
                </p>
              </div>
            </div>
            <hr className="border-gray-bera w-12/12 mx-4 justify-self-center" />
            <div className="flex justify-between flex-row gap-3 max-sm:flex-col items-center p-3">
              <div className="flex justify-start flex-col gap-2 items-start w-full">
                <p className="text-black font-semibold text-xl">pos/RTTM</p>
                <p className="font-normal">0.000558</p>
              </div>
              <div className="flex justify-start flex-col gap-2 items-start w-full">
                <p className="text-black font-semibold text-xl">pos/MV</p>
                <p className="font-normal">1,000</p>
              </div>
              <div className="flex justify-start flex-col gap-2 items-start w-full">
                <p className="text-black font-semibold text-xl">pos/DA</p>
                <p className="font-normal">10</p>
              </div>
              <div className="flex justify-start flex-col gap-2 items-start w-full">
                <p className="text-black font-semibold text-xl">pos/PP</p>
                <p className="font-normal">5</p>
              </div>
            </div>
            <div className="w-full h-full">
              {/* @ts-expect-error Async Server Component */}
              <GovernanceTable2 data={parametr} />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row max-sm:flex-col max-sm:gap-2 gap-4">
        <div className="flex flex-col p-5 gap-2 bg-white rounded-xl shadow-lg lg:w-7/12">
          <div className="mt-8 md:mt-0 max-sm:mt-0">
            <div className="flex justify-between flex-row gap-3 max-sm:flex-col items-center">
              <div className="flex justify-start flex-row items-start">
                <p className="mb-4 text-black font-semibold text-xl">
                  Treasury
                </p>
                <p className="font-medium text-base rounded-full max-sm:ml-3 ml-5 text-gray-400 outline-1 outline-double outline-gray-400 text-center py-0.5 px-4">
                  24h
                </p>
              </div>
            </div>
            <p className="mb-4 text-black font-semibold text-sm">
              Incomes / Expenses
            </p>
            <hr className="border-gray-bera w-12/12 mx-4 justify-self-center" />
            <div className="flex flex-col justify-center items-center h-full">
              <div className="w-full h-full max-h-96 p-4">
                {/* @ts-expect-error Async Server Component */}
                <DoughnutsChartMakert />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col p-5 gap-2 bg-white rounded-xl shadow-lg w-full">
          <div className="mt-8 md:mt-0 max-sm:mt-0">
            <div className="flex justify-between flex-row gap-3 max-sm:flex-col items-center">
              <div className="flex justify-start flex-row items-center w-full">
                <p className="mb-4 text-black font-semibold text-xl">
                  DAO Treasury
                </p>
                <p className="font-medium text-base rounded-full max-sm:ml-3 ml-5 text-gray-400 outline-1 outline-double outline-gray-400 text-center py-0.5 px-4 -translate-y-2">
                  30D
                </p>
              </div>
            </div>
            <hr className="border-gray-bera w-12/12 mx-4 justify-self-center" />
            <div className="flex justify-between flex-row gap-3 max-sm:flex-col items-center p-3 mb-6">
              <div className="flex justify-start flex-col gap-2 items-start w-full">
                <p className="text-black font-semibold text-xl">
                  Total Balance
                </p>
                <p className="font-normal">$44,569,959.96</p>
              </div>
              <div className="flex justify-start flex-col gap-2 items-start w-full">
                <p className="text-black font-semibold text-xl">
                  Income Last 30 days
                </p>
                <p className="font-normal">$625,749.35</p>
              </div>
              <div className="flex justify-start flex-col gap-2 items-start w-full">
                <p className="text-black font-semibold text-xl">
                  Expenses Last 30 Days
                </p>
                <p className="font-normal">$213.459.11</p>
              </div>
            </div>
            <div className="flex justify-between flex-row gap-3 max-sm:flex-col items-center">
              <div className="flex justify-start flex-row items-center w-full">
                <p className="mb-4 text-black font-semibold text-xl">
                  Treasury Accounting
                </p>
                <p className="font-medium text-base rounded-full max-sm:ml-3 ml-5 text-gray-400 outline-1 outline-double outline-gray-400 text-center py-0.5 px-4 -translate-y-1">
                  30D
                </p>
              </div>
              <div className="relative w-28">
                <label className="absolute right-2 top-3 translate-y-0.5 cursor-pointer">
                  <i className="fa-solid fa-angle-down"></i>
                </label>
                <select
                  className="border border-black py-3 text-base px-4 outline-none rounded-full appearance-none w-full cursor-pointer relative z-10 bg-transparent"
                  id="selectMo"
                >
                  <option value={1}>All</option>
                  <option value={2}>Monthly</option>
                </select>
              </div>
            </div>
            <div className="w-full h-full max-h-96 ">
              {/* @ts-expect-error Async Server Component */}
              <GovernancePage data={transactions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
