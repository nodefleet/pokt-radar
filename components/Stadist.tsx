"use client";
import { useEffect, useState } from "react";
import { TransationChartHome } from "./charts";

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
    <div className="flex flex-col w-10/12">
      <div className="mt-8 md:mt-0 max-sm:mt-0">
        <div className="p-4 flex justify-between">
          <p className="text-black font-medium text-xl">
            Past Transactions (15 days)
          </p>
        </div>
        <div className="w-full h-full max-h-36">
          <TransationChartHome data={newData} />
        </div>
      </div>
    </div>
  );
}
