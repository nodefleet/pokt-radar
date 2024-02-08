"use client";
import DoughnutsChart from "./Doughnut";
import TransactionsChart from "./TransactionsChart";

export default function Stadist() {
  const weeksArray = Array.from({ length: 10 }, (_, i) => ({
    date: `week ${(i + 1).toString().padStart(2, "0")}`,
    count: i === 5 ? 300 : 100 * i,
  }));
  const dataDought = [
    { date: "Ethereum", count: 900 },
    { date: "BSC Mainnet", count: 500 },
    { date: "Polygon Mainnet", count: 700 },
    { date: "FUSE Mainnet", count: 600 },
    { date: "Others", count: 300 },
  ];
  return (
    <div className="col-span-2 flex flex-row max-sm:flex-col max-md:flex-col gap-4 w-full">
      <div className="flex flex-col p-5 max-sm:pb-2 max-sm:pt-1 gap-2 bg-white rounded-xl shadow-lg w-full">
        <div className="mt-8 md:mt-0 max-sm:mt-0">
          <div className="p-4 flex justify-between">
            <p className="text-black font-semibold text-xl">Relays</p>
            <div className="relative w-28">
              <label className="absolute right-2 top-3 translate-y-0.5 cursor-pointer">
                <i className="fa-solid fa-angle-down"></i>
              </label>
              <select
                className="border border-black py-3 text-base px-4 outline-none rounded-full appearance-none w-full cursor-pointer relative z-10 bg-transparent"
                id="selectMo"
              >
                <option value={1}>Weekly</option>
                <option value={2}>Monthly</option>
              </select>
            </div>
          </div>
          <div className="w-full h-full max-h-96">
            <TransactionsChart data={weeksArray} />
          </div>
        </div>
      </div>
      <div className="flex flex-col p-5 gap-2 bg-white rounded-xl shadow-lg">
        <div className="mt-8 md:mt-0 max-sm:mt-0">
          <p className="mb-4 text-black font-semibold text-xl">
            Chains Distribution
          </p>
          <div className="w-full h-full max-h-96">
            <DoughnutsChart data={dataDought} />
          </div>
        </div>
      </div>
    </div>
  );
}
