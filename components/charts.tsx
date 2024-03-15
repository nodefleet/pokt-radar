// import { getTransactionStats } from "@/utils/txns";
import { getTransactionStats } from "@/utils/txns";
import { formatISO } from "date-fns";
import DoughnutsChart from "./Doughnut";
import TransactionsChart from "./TransactionsChart";

export function DoughnutsChartHome({
  dataDought,
}: {
  dataDought: { date: string; count: number }[];
}) {
  return <DoughnutsChart data={dataDought} />;
}

export function DoughnutsChartMakert() {
  const dataDought = [
    { date: "CEX", count: 900 },
    { date: "DEX ", count: 500 },
    { date: "OTC", count: 700 },
  ];
  return (
    <DoughnutsChart
      data={dataDought}
      backgroundColor={[
        "rgba(105, 141, 255, 1)",
        "rgba(157, 180, 254, 1)",
        "rgba(187, 203, 253, 1)",
      ]}
      borderColor={[
        "rgba(105, 141, 255, 0.8)",
        "rgba(157, 180, 254, 0.8)",
        "rgba(187, 203, 253, 0.8)",
      ]}
      position="right"
      align="start"
      roundedOption={true}
      labelfom="rectRounded"
    />
  );
}

export function TransationChartHome({
  data,
}: {
  data: { date: string; count: number }[];
}) {
  return <TransactionsChart data={data} />;
}

export async function GovernancePage() {
  const weeksArray = Array.from({ length: 10 }, (_, i) => ({
    date: `week ${(i + 1).toString().padStart(2, "0")}`,
    count: i === 5 ? 300 : 100 * i,
  }));
  return <TransactionsChart data={weeksArray} />;
}
