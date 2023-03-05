"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Filler,
  PointElement,
  LineElement,
} from "chart.js";

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
  ];

  const data = {
    labels: labels,
    datasets: [
      {
        data: [12000, 12500, 14000, 13000, 13500, 15000, 17000, 16000],
        borderColor: "#D07600",
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, "#E9CA9A");
          gradient.addColorStop(1, "rgba(208, 118, 0, 0)");
          return gradient;
        },
        tension: 0.5,
        fill: true,
        pointStyle: false,
      },
    ],
  };
  const options = {
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
  };
  return (
    <div className="flex">
      <div>
        <div>
          {/* ICON */}
          <div>
            <p>BERA Price</p>
            <p>$400.10</p>
          </div>
        </div>
        <div>
          {/* ICON */}
          <div>
            <p>Market Cap</p>
            <p>$26,000,000.00</p>
          </div>
        </div>
        <div>
          {/* ICON */}
          <div>
            <p>Height</p>
            <p>71000</p>
          </div>
        </div>
        <div>
          {/* ICON */}
          <div>
            <p>Transactions</p>
            <p>1,200,000</p>
          </div>
        </div>
      </div>
      <div className="max-w-[648px]">
        <Line id="canvas" data={data} options={options} />
      </div>
    </div>
  );
}
