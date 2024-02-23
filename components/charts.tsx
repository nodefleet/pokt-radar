import { getTransactionStats } from "@/utils/txns";
import DoughnutsChart from "./Doughnut";
import TransactionsChart from "./TransactionsChart";

export async function DoughnutsChartHome() {
  const dataDought = [
    { date: "Ethereum", count: 900 },
    { date: "BSC Mainnet", count: 500 },
    { date: "Polygon Mainnet", count: 700 },
    { date: "FUSE Mainnet", count: 600 },
    { date: "Others", count: 300 },
  ];
  return <DoughnutsChart data={dataDought} />;
}

export async function TransationChartHome() {
  const weeksArray = Array.from({ length: 10 }, (_, i) => ({
    date: `week ${(i + 1).toString().padStart(2, "0")}`,
    count: i === 5 ? 300 : 100 * i,
  }));
  return <TransactionsChart data={weeksArray} />;
}
