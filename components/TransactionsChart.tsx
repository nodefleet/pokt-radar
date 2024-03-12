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
  option,
  tension,
}: {
  data: { date: string; count: number }[];
  option?: ChartOptions<"line">;
  tension?: number;
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
          gradient.addColorStop(1, "rgba(104, 148, 255, 0.1)");
          return gradient;
        },
        tension: tension || 0.1,
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
        border: {
          dash: [5, 5],
          width: 0,
        },
      },
      y: {
        grid: {
          display: true,
          color: "rgba(205, 206, 212, 1)",
        },
        ticks: {
          font: {
            weight: 600,
          },
          callback: function (value, index, values) {
            const numericValue = Number(value).toFixed(0) + "K";
            return numericValue;
          },
        },
        border: {
          dash: [10, 10],
          width: 0,
        },
      },
    },
  };
  return (
    <Line id="canvas" data={chartData} options={option ? option : options} />
  );
}
