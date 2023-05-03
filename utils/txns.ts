import "server-only";
import { cache } from "react";
import { prisma } from "./db";

export const getTotalTransactions = cache(async () => {
  return await prisma.transactions.count();
});

export const getTransactions = cache(
  async ({
    take,
    skip,
    block,
  }: {
    take: number;
    skip: number;
    block: number | undefined;
  }) => {
    const transactions = await prisma.transactions.findMany({
      where: { block_height: block },
      take,
      skip,
      orderBy: { block_height: "desc" },
    });
    const count = await prisma.transactions.count({
      where: { block_height: block },
    });
    return {
      transactions,
      count,
    };
  }
);

export const getLatestTransactions = cache(async () => {
  return await prisma.transactions.findMany({
    take: 10,
    orderBy: { block_height: "desc" },
  });
});

export const getTransaction = cache(async (hash: string) => {
  return await prisma.transactions.findUnique({
    where: { hash },
  });
});

export const getTransactionsByAddress = cache(async (address: string) => {
  return await prisma.transactions.findMany({
    where: { OR: [{ from: address }, { to: address }] },
    orderBy: { block_height: "desc" },
  });
});

export const getTransactionStats = cache(async () => {
  return await prisma.$queryRaw<any[]>`
    SELECT date_trunc('day', d.date) AS date,
    COUNT(t.timestamp) AS count
    FROM (
      SELECT generate_series(NOW() - INTERVAL '15 days', NOW(), INTERVAL '1 day')::date AS date
    ) AS d
    LEFT JOIN transactions t ON date_trunc('day', t.timestamp) = d.date
    GROUP BY date
    ORDER BY date ASC`;
});
