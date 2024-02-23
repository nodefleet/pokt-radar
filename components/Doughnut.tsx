"use client";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
  LegendItem,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DoughnutsChart({
  data,
  backgroundColor,
  borderColor,
  position,
  align,
  roundedOption,
  labelfom,
}: {
  data: { date: string; count: number }[];
  backgroundColor?: string[];
  borderColor?: string[];
  position?: "bottom" | "left" | "top" | "right" | "center" | "chartArea";
  align?: "center" | "start" | "end";
  roundedOption?: boolean;
  labelfom?:
    | false
    | "line"
    | "circle"
    | "cross"
    | "crossRot"
    | "dash"
    | "rect"
    | "rectRounded"
    | "rectRot"
    | "star"
    | "triangle";
}) {
  const total = data.reduce((acc, curr) => acc + curr.count, 0);
  const bg = backgroundColor || [
    "rgba(105, 141, 255, 0.80)",
    "rgba(254, 161, 108, 0.80)",
    "rgba(250, 224, 134, 0.80)",
    "rgba(0, 168, 107, 0.80)",
    "rgba(221, 0, 53, 0.80)",
  ];
  const br = borderColor || [
    "rgba(105, 141, 255, 1)",
    "rgba(254, 161, 108, 1)",
    "rgba(250, 224, 134, 1)",
    "rgba(0, 168, 107, 1)",
    "rgba(221, 0, 53, 1)",
  ];
  const chartData = {
    labels: data.map((value) => value.date),
    datasets: [
      {
        data: data.map((value) => value.count),
        backgroundColor: bg,
        borderColor: br,
        borderWidth: 1,
      },
    ],
  };
  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: position || "bottom",
        align: align || "start",
        rtl: false,
        labels: {
          borderRadius: 20,
          usePointStyle: true,
          textAlign: "left",
          pointStyle: labelfom || "circle",
          boxWidth: 10,
          padding: 20,
          generateLabels: !roundedOption
            ? function (chart): LegendItem[] {
                const data = chart.data;
                if (
                  data &&
                  Array.isArray(data.labels) &&
                  data.labels.length &&
                  data.datasets &&
                  data.datasets.length
                ) {
                  return data.labels.map((label: any, index: number) => {
                    const dataset = data.datasets[0];
                    const datasetData = dataset.data as number[];
                    if (!datasetData) [];
                    const backgroundColor = Array.isArray(
                      dataset.backgroundColor
                    )
                      ? dataset.backgroundColor[index]
                      : dataset.backgroundColor;
                    const percentage = (
                      (datasetData[index] / total) *
                      100
                    ).toFixed(2);
                    return {
                      text: `${label} (${percentage}%)`,
                      fillStyle: backgroundColor || "",
                      hidden: false,
                      index: index,
                    };
                  });
                }
                return [];
              }
            : undefined,
        },
      },
    },
    scales: {
      x: {
        display: false,
        grid: {
          display: false,
        },
      },
    },
  };
  return <Doughnut id="canvas-dough" data={chartData} options={options} />;
}
