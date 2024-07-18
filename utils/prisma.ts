import "server-only";
import { fetchData } from "./db";
import { Stakin, Transaction } from "./interface";
import { getCurrentWeekDates, updateLast24HoursRange } from "./governance";
import { PrismaClient } from "@prisma/client";
import { subDays, format, formatISO } from "date-fns";
import { async } from "@firebase/util";

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query", "error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export const getBlock = async (block_hash: string) => {
  const result = await prisma.blocks.findFirst({
    where: {
      block_hash: block_hash,
    },
  });
  return result;
};

export const getBlockByTransaction = async (block_number: number) => {
  const result = await prisma.transactions.findMany({
    where: {
      block_number: block_number,
    },
  });
  return result;
};

export const getBlocks = async ({ limit }: { limit: number }) => {
  const result = await prisma.blocks.findMany({
    take: limit,
    orderBy: { number: "desc" },
  });
  return result;
};
export const getBlockStats = async () => {
  const result = await prisma.blocks.findMany({
    take: 10,
    orderBy: { number: "desc" },
  });
  return result;
};

export const getTotalTransactions = async () => {
  const resurt = await prisma.$queryRaw<any>`
  SELECT total_count FROM mv_transactions_count;
  `;
  return resurt?.[0]?.total_count;
};

export const getProducer = async () => {
  const { endDate24H, startDate24H } = await updateLast24HoursRange();
  try {
    const { rewards } = await fetchData(`query  {
    rewards: GetRewardsByStakeWeightBetweenDates(input: {
    start_date: "${startDate24H}",
    end_date: "${endDate24H}"
  }) {
      last_block_weight_summary {
        staked_nodes
      }
    }
  }`);
    const totalStakedNodes = rewards.reduce(
      (
        accumulator: any,
        currentValue: { last_block_weight_summary: { staked_nodes: any } }
      ) => {
        return (
          accumulator + currentValue.last_block_weight_summary.staked_nodes
        );
      },
      0
    );
    return totalStakedNodes;
  } catch (error) {
    console.log(error);
  }
};
// export const getTransaction = async (hash: string) => {
//   const result = await prisma.$queryRaw<any[]>`
//     SELECT *
//     FROM transactions_30_days AS t
//     LEFT JOIN blocks AS b ON t.height = b.height
//     WHERE t.transaction_hash = ${hash};`;
//   return {
//     transation: result[0],
//   };
// };

export const getTransactions = async ({ limit }: { limit: number }) => {
  const resurt = await prisma.transactions.findMany({
    take: limit,
    orderBy: { timestamp: "desc" },
  });
  return resurt;
};

export const getTransaction = async (hash: string) => {
  const transation = await prisma.transactions.findMany({
    where: {
      hash: hash,
    },
  });
  return {
    transation: transation[0],
  };
};
export type DataChart = { date: string; count: number }[];

export const getLast15DayTransaction = async (): Promise<{
  dataChart: DataChart;
}> => {
  const fifteenDaysAgo = subDays(new Date(), 15);
  const fifteenDaysAgoTimestamp = Math.floor(fifteenDaysAgo.getTime() / 1000);

  const transactions = await prisma.transactions.findMany({
    where: {
      timestamp: {
        gte: fifteenDaysAgoTimestamp.toString(),
      },
    },
  });

  const transactionCountMap: { [date: string]: number } = {};

  transactions.forEach((transaction) => {
    const date = new Date(Number(transaction.timestamp) * 1000)
      .getDate()
      .toString();
    if (!transactionCountMap[date]) {
      transactionCountMap[date] = 0;
    }
    transactionCountMap[date]++;
  });

  const dataChart: DataChart = Object.entries(transactionCountMap).map(
    ([date, count]) => ({
      date,
      count,
    })
  );

  dataChart.sort((a, b) => {
    const dateA = new Date(a.date.split("-").reverse().join("-"));
    const dateB = new Date(b.date.split("-").reverse().join("-"));
    return dateA.getTime() - dateB.getTime();
  });

  return {
    dataChart,
  };
};

// export const getTransactionsByBlock = async (block: number) => {
//   return await prisma.transactions.findMany({
//     where: { height: block },
//     orderBy: { height: "desc" },
//   });
// };

export const getStakinPOKT = async (): Promise<Stakin> => {
  const { start_date, end_date } = await getCurrentWeekDates();
  const { chartPoints } = await fetchData(`query {
    chartPoints: ListSummaryBetweenDates(input: {
      unit_time: day,
      interval: 1,
      start_date: "${start_date}",
      end_date: "${end_date}",
      date_format: "YYYY-MM-DDTHH:mm:ss.SSSZ"
    }) {
      points {
        point
        ms
      }
    }
  }`);
  return [...chartPoints.points].reverse()[0];
};

export const refreshMaterializedView = async () => {
  try {
    await prisma.$executeRawUnsafe(
      "REFRESH MATERIALIZED VIEW mv_transactions_count;"
    );
    console.log("Materialized view refreshed successfully.");
  } catch (error) {
    console.error("Error refreshing materialized view:", error);
  }
};

export const getAccount = async () => {
  const resurt = await prisma;
};
