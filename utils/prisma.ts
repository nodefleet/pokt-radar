import "server-only";
import { PrismaClient } from "@prisma/client";
import { fetchData } from "./db";
import { Stakin, Transaction } from "./interface";
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
  const { ListPoktTransaction } = await fetchData(`query {
    ListPoktTransaction(
      pagination: { limit: ${limit}, sort: [{ property: "block_time", direction: -1 }] }
    ) {
      items {
        _id
        hash
        height
        amount
        block_time
        from_address
        index
        memo
        parse_time
        result_code
        to_address
        total_fee
        total_proof
        total_pokt
        type
        chain
        app_public_key
        claim_tx_hash
        expiration_height
        session_height
        pending
        upgrade {
          Height
          Version
          Features
          __typename
        }
        stake {
          chains
          outputaddress
          address
          serviceurl
          tokens
          __typename
        }
        action
        change_param_key
        change_param_value
        change_param_prev_value
        __typename
      }
      __typename
    }
  }
  
  `);
  return ListPoktTransaction.items;
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
  const { GetPoktTransaction: transation } = await fetchData(`
  query {
    GetPoktTransaction(hash: "${hash}") {
      _id
      hash
      height
      amount
      block_time
      from_address
      index
      memo
      parse_time
      result_code
      to_address
      total_fee
      total_proof
      total_pokt
      type
      chain
      app_public_key
      claim_tx_hash
      expiration_height
      session_height
      pending
      change_param_key
      change_param_value
      change_param_prev_value
      upgrade {
        Version
        Features
        Height
        __typename
      }
      stake {
        chains
        outputaddress
        address
        serviceurl
        tokens
        reward_delegators {
          address
          share
          __typename
        }
        __typename
      }
      action
      app_stake {
        tokens
        chains
        migrated_to
        __typename
      }
      reward_split {
        total
        total_reward
        total_fees
        returned_fees
        operator
        custodian
        custodian_address
        dao
        proposer
        total_delegator_rewards
        chain_rttm
        chain_rttm_source
        service_multiplier
        computed_units
        node_base_multiplier
        node_multiplier
        delegators {
          address
          amount
          share
          __typename
        }
        __typename
      }
      __typename
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
