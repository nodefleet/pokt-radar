"use client";
import { useEffect, useState } from "react";
import { DoughnutsChartHome, TransationChartHome } from "./charts";

export default function Stadist({
  dataChart,
  resultDought,
}: {
  dataChart: { date: string; count: number }[];
  resultDought: { date: string; count: number }[];
}) {
  const [selectedOption, setSelectedOption] = useState(1);
  const [newData, setNewData] = useState<{ date: string; count: number }[]>([]);
  const [newDataDoought, setNewDataDoought] = useState<
    { date: string; count: number }[]
  >([]);

  const handleSelectChange = (e: any) => {
    setSelectedOption(parseInt(e.target.value));
  };

  useEffect(() => {
    const last7Data = dataChart
      .slice(selectedOption === 1 ? -7 : selectedOption === 2 ? -30 : -7)
      .map((value) => {
        const d = new Date(value.date);
        d.setDate(d.getDate() + 1);
        return {
          date:
            d.getDate() === 1
              ? d.toLocaleDateString("es-es", {
                  day: "2-digit",
                }) +
                " " +
                d.toLocaleDateString("es-es", {
                  month: "long",
                })
              : d.toLocaleDateString(
                  "es-es",
                  selectedOption === 1
                    ? {
                        dateStyle: "medium",
                      }
                    : {
                        day: "2-digit",
                      }
                ),
          count: Number(value.count),
        };
      });
    const last7DataDought = resultDought;
    setNewDataDoought(last7DataDought);
    setNewData(last7Data);
  }, [selectedOption, dataChart, resultDought]);

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
                onChange={handleSelectChange}
              >
                <option value={1}>Weekly</option>
                <option value={2}>Monthly</option>
              </select>
            </div>
          </div>
          <div className="w-full h-full max-h-96">
            <TransationChartHome data={newData} />
          </div>
        </div>
      </div>
      <div className="flex flex-col p-5 gap-2 bg-white rounded-xl shadow-lg">
        <div className="mt-8 md:mt-0 max-sm:mt-0">
          <p className="mb-4 text-black font-semibold text-xl">
            Chains Distribution
          </p>
          <div className="w-full h-full max-h-96">
            <DoughnutsChartHome dataDought={newDataDoought} />
          </div>
        </div>
      </div>
    </div>
  );
}
