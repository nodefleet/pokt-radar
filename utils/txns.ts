import "server-only";
import { cache } from "react";
import { prisma } from "./db";

export const getTotalTransactions = cache(async () => {
  return await prisma.transactions.count({
    take: 10,
  });
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
      where: { height: block },
      take,
      skip,
      orderBy: { height: "desc" },
    });
    const count = await prisma.transactions.count({
      where: { height: block },
    });
    return {
      transactions,
      count,
    };
  }
);

export const getLatestTransactions = cache(async () => {
  const result = await prisma.$queryRaw<any[]>`
     SELECT * FROM transactions ORDER BY id DESC LIMIT 10;`;
  return result;
});

export const getTransaction = cache(async (hash: string) => {
  const transation = await prisma.transactions.findMany({
    where: { hash: hash },
  });
  const blocks = await prisma.blocks.findMany({
    where: { height: transation[0].height },
  });
  return {
    transation: transation[0],
    block: blocks[0],
  };
});

export const getTransactionsByAddress = cache(async (address: string) => {
  return await prisma.transactions.findMany({
    where: { OR: [{ from_address: address }, { to_address: address }] },
    orderBy: { height: "desc" },
    take: 10,
  });
});

export const getTransactionsByBlock = cache(async (block: number) => {
  return await prisma.transactions.findMany({
    where: { height: block },
    orderBy: { height: "desc" },
  });
});

// export const getTransactionStats = cache(async () => {
//   const result = await prisma.$queryRaw<any[]>`
//   SELECT date_trunc('day', b.time) AS date,
//   COUNT(t.height) AS count
//   FROM (
//     SELECT generate_series(NOW() - INTERVAL '15 days', NOW(), INTERVAL '1 day')::date AS date
//   ) AS d
//   LEFT JOIN blocks b ON date_trunc('day', b.time) = d.date
//   LEFT JOIN transactions_within_time_range t ON t.height = b.height
//   GROUP BY date_trunc('day', b.time)
//   ORDER BY date ASC
//   LIMIT 10`;
//   return result;
// });

/*  SELECT b.*, t.* FROM (SELECT * FROM blocks WHERE time >= NOW() - INTERVAL '30 days') AS b LEFT JOIN transactions t ON t.height = b.height; select transation */

/* SELECT  date_trunc('day', b.time) AS date, COUNT(t.height) AS count FROM (SELECT * FROM blocks WHERE time >= NOW() - INTERVAL '30 days') AS b LEFT JOIN transactions t ON t.height = b.height; */
