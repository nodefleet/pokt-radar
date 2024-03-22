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
  datasets,
}: {
  data?: { date: string; count: number }[];
  option?: ChartOptions<"line">;
  tension?: number;
  datasets?: { datasets: any[]; labels: any[] };
}) {
  const chartData = datasets || {
    labels: data?.map((value) => value.date),
    datasets: [
      {
        data: data?.map((value) => Number(value.count)),
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
            const numericValue = Number(value);
            if (!isNaN(numericValue)) {
              const suffixes = ["", "K", "M", "K", "T"];
              const suffixNum = Math.floor(("" + numericValue).length / 3);
              let shortValue = parseFloat(
                (suffixNum != 0
                  ? numericValue / Math.pow(1000, suffixNum)
                  : numericValue
                ).toPrecision(2)
              );
              if (shortValue % 1 != 0) {
                shortValue = parseFloat(shortValue.toFixed(1));
              }
              return shortValue + suffixes[suffixNum];
            } else {
              return value;
            }
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
