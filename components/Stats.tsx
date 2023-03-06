"use client";
import Image from "next/image";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Filler,
  PointElement,
  LineElement,
} from "chart.js";

import BeraIcon from "../public/bera.svg";
import MarketIcon from "../public/market.svg";
import BlockIcon from "../public/blocks.svg";
import TxnsIcon from "../public/txns.svg";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler);

export default function Stats() {
  const labels = [
    "23-01-29",
    "23-02-01",
    "23-02-04",
    "23-02-07",
    "23-02-10",
    "23-02-11",
    "23-02-12",
    "23-02-13",
    "23-02-14",
    "23-02-15",
  ];

  const data = {
    labels: labels,
    datasets: [
      {
        data: [
          12000, 12500, 14000, 13000, 13500, 15000, 17000, 16000, 16500, 16300,
        ],
        borderColor: "#D07600",
        backgroundColor: (context: any) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, "#E9CA9A");
          gradient.addColorStop(1, "rgba(208, 118, 0, 0)");
          return gradient;
        },
        tension: 0.5,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
    },
  };
  return (
    <div className="grid grid-cols-2 p-5 bg-white rounded-xl shadow-lg col-span-2">
      <div className="grid grid-cols-2 gap-y-2 gap-x-10 mr-5">
        <div className="flex items-center">
          <Image src={BeraIcon} alt="Berachain icon" />
          <div className="ml-7 text-gray-3">
            <p className="text-sm leading-7">BERA Price</p>
            <p className="text-xl">$400.10</p>
          </div>
        </div>
        <div className="flex items-center">
          <Image src={BlockIcon} alt="Blockchain block icon" />
          <div className="ml-7 text-gray-3">
            <p className="text-sm leading-7">Height</p>
            <p className="text-xl">71000</p>
          </div>
        </div>
        <hr className="border-gray-bera w-11/12 justify-self-center" />
        <hr className="border-gray-bera w-11/12 justify-self-center" />
        <div className="flex items-center">
          <Image src={MarketIcon} alt="Market cap icon" />
          <div className="ml-7 text-gray-3">
            <p className="text-sm leading-7">Market Cap</p>
            <p className="text-xl">$26,000,000.00</p>
          </div>
        </div>
        <div className="flex items-center">
          <Image src={TxnsIcon} alt="Blockchain transaction icon" />
          <div className="ml-7 text-gray-3">
            <p className="text-sm leading-7">Transactions</p>
            <p className="text-xl">1,200,000</p>
          </div>
        </div>
      </div>
      <div>
        <p className="ml-10 text-gray-3">Past Transactions (15 days)</p>
        <div className="w-full max-w-[648px] max-h-[209px]">
          <Line id="canvas" data={data} options={options} />
        </div>
      </div>
    </div>
  );
}
