import "server-only";
import { cache } from "react";
import { prisma, apiUrl, authToken, fetchData } from "./db";
import { Decimal } from "@prisma/client/runtime";
import { chains } from "./relay";
import { endDate, endDate24H, startDate, startDate24h } from "./governance";

interface TransactionData {
  block_id: bigint;
  block_hash: string;
  block_height: bigint;
  block_time: Date;
  block_proposer_address: string;
  block_tx_count: bigint;
  block_tx_total: bigint;
  transaction_id: bigint;
  transaction_hash: string;
  from_address: string;
  to_address: string;
  app_pub_key: string;
  blockchains: string;
  message_type: string;
  height: bigint;
  index: bigint;
  stdtx: {
    fee: { denom: string; amount: string }[];
    msg: {
      type: string;
      value: {
        amount: string;
        to_address: string;
        from_address: string;
      };
    };
    memo: string;
    entropy: bigint;
    signature: { pub_key: string; signature: string };
  };
  tx_result: {
    log: string;
    code: number;
    data: string;
    info: string;
    events: string;
    signer: string;
    codespace: string;
    recipient: string;
    message_type: string;
  };
  tx: string;
  entropy: bigint;
  fee: bigint;
  fee_denomination: string;
  amount: Decimal;
  id: bigint;
  hash: string;
  time: Date;
  proposer_address: string;
  tx_total: bigint;
  tx_count: bigint;
}

export const getTotalTransactions = cache(async () => {
  return await prisma.transactions.count({});
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
    // const transactions = await prisma.transactions.findMany({
    //   where: { height: block },
    //   take,
    //   skip,
    //   orderBy: { height: "desc" },
    // });
    const transactions = await prisma.$queryRaw<any[]>`
    SELECT * 
    FROM transactions_30_days
    WHERE transaction_id IS NOT NULL AND message_type ='pocketcore/claim'
    ORDER BY block_time DESC
    LIMIT ${take}
    OFFSET ${skip};`;
    const count = await prisma.$queryRaw<any[]>`
    SELECT COUNT(*)
    FROM transactions_30_days
    WHERE transaction_id IS NOT NULL`;
    return {
      transactions,
      count: Number(count[0].count),
    };
  }
);

export const getLatestTransactions = cache(async () => {
  const result = await prisma.$queryRaw<any[]>`
     SELECT * FROM transactions_30_days WHERE transaction_id IS NOT NULL ORDER BY block_id DESC LIMIT 10;`;
  return result;
});

export const getTransaction = cache(async (hash: string) => {
  const result = await prisma.$queryRaw<TransactionData[]>`
  SELECT *
  FROM transactions_30_days AS t
  LEFT JOIN blocks AS b ON t.height = b.height
  WHERE t.transaction_hash = ${hash};`;
  return {
    transation: result[0],
  };
});

export const getTransactionsByAddress = cache(
  async (address: string, take: number, skip: number) => {
    const count = await prisma.transactions.count({
      where: { OR: [{ from_address: address }, { to_address: address }] },
    });
    const transactions = await prisma.transactions.findMany({
      where: { OR: [{ from_address: address }, { to_address: address }] },
      orderBy: { height: "desc" },
      take: take,
      skip: skip,
    });

    return { transactions: transactions, count: count };
  }
);

export const getTransactionsByBlock = cache(async (block: number) => {
  return await prisma.transactions.findMany({
    where: { height: block },
    orderBy: { height: "desc" },
  });
});

export const getTransactionStats = cache(async () => {
  const { last24h: last24h } = await fetchData(`query {
    last24h: GetChainsRewardsBetweenDates(input: {
    start_date: "${startDate24h}",
    end_date: "${endDate24H}"
  }) {
      chain
      total_relays
      staked_nodes_avg
      pokt_avg
      __typename
    }
  }`);

  const { ListSummaryBetweenDates: dataRelay } = await fetchData(`query {
      ListSummaryBetweenDates(input: {
        unit_time: day,
        interval: 1,
        start_date: "${startDate}",
        end_date: "${endDate}",
        date_format: "YYYY-MM-DD"
    }) {
        point_format
        points {
          point
          start_date
          end_date
          first_height
          last_height
          total_relays
          total_minted
          total_computed_cost
          __typename
        }
        __typename
      }
    }`);
  const dataRelays = dataRelay.points.map((x: any) => ({
    date: x.point,
    count: x.total_relays,
  }));
  const dataDought = last24h.map((x: any) => ({
    date: chains.find((j) => j.id === x.chain)?.full_name,
    count: x.total_relays,
  }));
  dataDought.sort(
    (a: { count: number }, b: { count: number }) => b.count - a.count
  );
  if (dataDought.length > 5) {
    const otherCount = dataDought
      .slice(5)
      .reduce((acc: any, curr: { count: any }) => acc + curr.count, 0);
    const otherItem = { date: "Other", count: otherCount };
    dataDought.splice(5);
    dataDought.push(otherItem);
  }
  return {
    dataChartVetical: dataRelays,
    resultDought: dataDought,
  };
});

/*  SELECT b.*, t.* FROM (SELECT * FROM blocks WHERE time >= NOW() - INTERVAL '30 days') AS b LEFT JOIN transactions t ON t.height = b.height; select transation */

/* SELECT date_trunc('day', b.time) AS date, COUNT(t.height) AS count FROM blocks AS b LEFT JOIN transactions t ON t.height = b.height WHERE b.time >= NOW() - INTERVAL '30 days' OR b.time IS NULL GROUP BY date */
