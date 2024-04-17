// import { getTransactionStats } from "@/utils/txns";
import DoughnutsChart from "./Doughnut";
import TransactionsChart from "./TransactionsChart";

export function DoughnutsChartHome({
  dataDought,
}: {
  dataDought: { date: string; count: number }[];
}) {
  return <DoughnutsChart data={dataDought} roundedOption={false} />;
}

export function DoughnutsChartMakert({ cex, dex }: { cex: any[]; dex: any[] }) {
  const filteredDex = dex.filter((item) => item.market.name !== "Bilaxy");
  const filteredCex = dex.filter((item) => item.market.name === "Bilaxy");
  filteredCex[0].supply = "CEX";

  const addSupplyField = (item: any) => {
    item.supply = cex.some(
      (cexItem) => cexItem.market.name === item.market.name
    )
      ? "CEX"
      : "DEX";
    return item;
  };
  const cexWithSupply = cex.map(addSupplyField);
  const dexWithSupply = filteredDex.map(addSupplyField);

  const mergedArray = [...cexWithSupply, ...dexWithSupply, ...filteredCex];

  let cexVolumeTotal = 0;
  let dexVolumeTotal = 0;

  mergedArray.forEach((ticker) => {
    const marketName = ticker.supply.toLowerCase();

    if (marketName === "cex") {
      cexVolumeTotal += ticker.converted_volume.usd;
    } else {
      dexVolumeTotal += ticker.converted_volume.usd;
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

export function DoughnutsChartRelay({
  resultDought,
}: {
  resultDought: { date: string; count: number }[];
}) {
  const isMobile = window.innerWidth <= 600;
  return (
    <DoughnutsChart
      data={resultDought}
      position={isMobile ? "bottom" : "right"}
      align={isMobile ? "center" : "start"}
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
          pointDate.setDate(pointDate.getDate() + 1);
          return pointDate.getDate() === 1
            ? pointDate.toLocaleString("default", { day: "2-digit" }) +
                " " +
                pointDate.toLocaleString("default", { month: "long" })
            : String(pointDate.getDate());
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
