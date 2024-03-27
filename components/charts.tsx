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
  return <DoughnutsChart data={dataDought} roundedOption={false} />;
}

export function DoughnutsChartMakert({ data }: { data: any[] }) {
  const cexKeywords = [
    "binance",
    "coinbase",
    "kraken",
    "bitfinex",
    "kucoin",
    "huobi",
    "gate",
    "bybit",
    "okex",
    "bitstamp",
    "orangex",
    "bitget",
    "coinex",
    "bingx",
    "mexc",
    "CoinW",
    "CoinEx",
  ];

  let cexVolumeTotal = 0;
  let dexVolumeTotal = 0;

  data.forEach((ticker) => {
    const marketName = ticker.market.name.toLowerCase();
    if (
      cexKeywords.some((keyword) => marketName.includes(keyword.toLowerCase()))
    ) {
      cexVolumeTotal += ticker.volume;
    } else {
      dexVolumeTotal += ticker.volume;
    }
  });
  const chartData: { date: string; count: number }[] = [
    { date: "CEX", count: cexVolumeTotal },
    { date: "DEX", count: dexVolumeTotal },
  ];

  return (
    <DoughnutsChart
      data={chartData}
      backgroundColor={["rgba(105, 141, 255, 1)", "rgba(157, 180, 254, 1)"]}
      borderColor={["rgba(105, 141, 255, 0.8)", "rgba(157, 180, 254, 0.8)"]}
      position="right"
      align="start"
      roundedOption={false}
      labelfom="rectRounded"
    />
  );
}

export function DoughnutsChartRelay({ resultDought }: { resultDought: any[] }) {
  return (
    <DoughnutsChart
      data={resultDought}
      position="right"
      align="start"
      roundedOption={false}
      labelfom="rectRounded"
    />
  );
}

export function DoughnutsChartGoubernance({
  resultDought,
}: {
  resultDought: { date: string; count: number }[];
}) {
  return (
    <DoughnutsChart
      data={resultDought}
      backgroundColor={["rgba(105, 141, 255, 1)", "rgba(254, 161, 108, 1)"]}
      borderColor={["rgba(105, 141, 255, 0.8)", "rgba(157, 180, 254, 0.8)"]}
      position="right"
      align="start"
      roundedOption={true}
      labelfom="circle"
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

export function GovernancePage({
  dataIncome,
  dataExpense,
}: {
  dataExpense: { points: any[] };
  dataIncome: { points: any[] };
}) {
  return (
    <TransactionsChart
      datasets={{
        labels: dataIncome.points.map((value: any) => {
          const pointDate = new Date(value.point);
          return pointDate.getDate() === 1
            ? pointDate.toLocaleString("default", { day: "2-digit" }) +
                " " +
                pointDate.toLocaleString("default", { month: "long" })
            : String(pointDate.getDate() + 1);
        }),
        datasets: [
          {
            data: dataIncome.points.map(
              (value: any) => value.total_dao_rewards
            ),
            borderColor: "#698DFF",
            backgroundColor: "rgba(104, 148, 255, 0.1)",
            fill: true,
            pointRadius: 4,
          },
          {
            data: dataExpense.points.map((value: any) => value.amount),
            borderColor: "#FEA16C",
            backgroundColor: "rgba(254, 161, 108, 0.1)",
            fill: true,
            pointRadius: 4,
          },
        ],
      }}
    />
  );
}
