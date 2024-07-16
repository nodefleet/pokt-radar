"use client";
import { useEffect, useState } from "react";
import { TransationChartHome } from "./charts";

export default function Stadist({
  dataChart,
}: {
  dataChart: { date: string; count: number }[];
}) {
  return (
    <div className="flex flex-col w-10/12">
      <div className="mt-8 md:mt-0 max-sm:mt-0">
        <div className="p-4 flex justify-between">
          <p className="text-black font-medium text-xl">
            Past Transactions (15 days)
          </p>
        </div>
        <div className="w-full h-full max-h-36">
          <TransationChartHome data={dataChart} />
        </div>
      </div>
    </div>
  );
}
