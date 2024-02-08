"use client";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Filler,
  PointElement,
  LineElement,
  ChartOptions,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler);

export default function TransactionsChart({
  data,
}: {
  data: { date: string; count: number }[];
}) {
  const chartData = {
    labels: data.map((value) => value.date),
    datasets: [
      {
        data: data.map((value) => value.count),
        borderColor: "#698DFF",
        backgroundColor: (context: any) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, "#698DFF");
          gradient.addColorStop(1, "rgba(104, 148, 255, 0)");
          return gradient;
        },
        tension: 0.5,
        fill: true,
        pointRadius: 4,
      },
    ],
  };
  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
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
