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

export default function TransactionsChart() {
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
        fill: true,
        pointRadius: 0,
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
  return <Line id="canvas" data={data} options={options} />;
}
