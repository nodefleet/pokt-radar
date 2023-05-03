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

export default function TransactionsChart({ data }: { data: any[] }) {
  const chartData = {
    labels: data.map((value) => value.date),
    datasets: [
      {
        data: data.map((value) => value.count),
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
  return <Line id="canvas" data={chartData} options={options} />;
}
