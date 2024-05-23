import "server-only";
import { PrismaClient } from "@prisma/client";
import { fetchData } from "./db";
import { Producer, Stakin, Transaction } from "./interface";
import { getCurrentWeekDates, updateLast24HoursRange } from "./governance";

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query", "error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export const getBlock = async ({
  take,
  skip,
  height,
}: {
  take: number;
  skip: number;
  height: number | undefined;
}) => {
  const blocks = await prisma.blocks.findMany({
    where: { height: height },
  });
  const transactions = await prisma.$queryRaw<any[]>`
      SELECT *,transaction_hash as hash
      FROM transactions_30_days
      WHERE block_id = ${height}
      ORDER BY block_id DESC
      LIMIT ${take}
      OFFSET ${skip};`;
  const count = await prisma.$queryRaw<any[]>`
       SELECT COUNT(transaction_id) FROM transactions_30_days;`;
  return {
    transactions,
    block: blocks[0],
    count: Number(count[0].count),
  };
};

export const getBlockStats = async () => {
  const result = await prisma.$queryRaw<any[]>`
      SELECT date_trunc('day', b.time) AS date, COUNT(b.height) AS count
      FROM blocks AS b
      GROUP BY date
      ORDER BY date DESC
      LIMIT 7`;
  return result;
};

export const getTotalTransactions = async () => {
  return await prisma.transactions.count({});
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

export const getTransactions = async ({
  limit,
}: {
  limit: number;
}): Promise<Transaction[]> => {
  const { ListPoktTransfer } = await fetchData(`query {
    ListPoktTransfer(
      pagination: { limit: ${limit}, sort: [{ property: "block_time", direction: -1 }] }
    ) {
      items {
        tx_hash
        to_address
        tx_result_code
        height
        amount
        block_time
        memo
        parse_time
        fee
        flow
        pending
        from_address
        amount
      }
    }
  }
  `);
  return ListPoktTransfer.items;
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

export const getTransaction = async (hash: string) => {
  const { GetPoktTransfer: transation } = await fetchData(`
  query {
    GetPoktTransfer(tx_hash:"${hash}"){
      tx_hash
      to_address
      tx_result_code
      height
      amount
      block_time
      memo
      parse_time
      fee
      flow
      pending
      from_address
      amount
    }
  }
  `);
  return {
    transation: transation,
  };
};

export const getTransactionsByBlock = async (block: number) => {
  return await prisma.transactions.findMany({
    where: { height: block },
    orderBy: { height: "desc" },
  });
};

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
