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
import { formatNumber } from "@/utils";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler);

export default function TransactionsChart({
  data,
  option,
  tension,
  datasets,
  numberConver,
}: {
  data?: { date: string; count: number }[];
  option?: ChartOptions<"line">;
  tension?: number;
  datasets?: { datasets: any[]; labels: any[] };
  numberConver?: boolean;
}) {
  const chartData = datasets || {
    labels: data?.map((value) => value.date),
    datasets: [
      {
        data: data?.map((value) => Number(value.count)),
        backgroundColor: (context: any) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, "#98EB5D");
          gradient.addColorStop(1, "rgba(245, 245, 245, 0.3)");
          return gradient;
        },
        tension: tension || 0.1,
        fill: true,
        pointRadius: 0,
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
          callback: numberConver
            ? function (value, index, values) {
                const numericValue = Number(value);
                return formatNumber(numericValue);
              }
            : undefined,
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
