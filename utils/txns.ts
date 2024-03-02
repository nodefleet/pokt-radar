import "server-only";
import { cache } from "react";
// import { prisma } from "./db";
// import { ejecutarConsultasPorMes } from ".";

// export const getTotalTransactions = cache(async () => {
//   return await prisma.transactions.count({
//     take: 10,
//   });
// });

// export const getTransactions = cache(
//   async ({
//     take,
//     skip,
//     block,
//   }: {
//     take: number;
//     skip: number;
//     block: number | undefined;
//   }) => {
//     const transactions = await prisma.transactions.findMany({
//       where: { height: block },
//       take,
//       skip,
//       orderBy: { height: "desc" },
//     });
//     const count = await prisma.transactions.count({
//       where: { height: block },
//     });
//     return {
//       transactions,
//       count,
//     };
//   }
// );

// export const getLatestTransactions = cache(async () => {
//   return await prisma.transactions.findMany({
//     take: 10,
//     orderBy: { height: "desc" },
//   });
// });

// export const getTransaction = cache(async (hash: string) => {
//   return await prisma.transactions.findFirst({
//     where: { hash: hash },
//   });
// });

// export const getTransactionsByAddress = cache(async (address: string) => {
//   return await prisma.transactions.findMany({
//     where: { OR: [{ from_address: address }, { to_address: address }] },
//     orderBy: { height: "desc" },
//     take: 10,
//   });
// });

// export const getTransactionsByBlock = cache(async (block: number) => {
//   return await prisma.transactions.findMany({
//     where: { height: block },
//     orderBy: { height: "desc" },
//     take: 10,
//   });
// });

// const cacheData: { [key: string]: any } = {};

// export const getTransactionStats = cache(async () => {
//   const cachedStats = cacheData["transactionStats"];
//   if (cachedStats) {
//     return cachedStats;
//   }

//   // const result = await prisma.$queryRaw<any[]>`
//   // SELECT date_trunc('day', b.time) AS date,
//   // COUNT(t.height) AS count
//   // FROM (
//   //   SELECT generate_series(NOW() - INTERVAL '15 days', NOW(), INTERVAL '1 day')::date AS date
//   // ) AS d
//   // LEFT JOIN blocks b ON date_trunc('day', b.time) = d.date
//   // LEFT JOIN transactions_within_time_range t ON t.height = b.height
//   // GROUP BY date_trunc('day', b.time)
//   // ORDER BY date ASC
//   // LIMIT 10`;

//   // cacheData["transactionStats"] = result;
//   // return result;
// });
