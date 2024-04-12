import { fetchData } from "./db";
import { endDate24H, startDate24h } from "./governance";

export const getLastBlockHeight = async () => {
  const { GetLatestBlock: lastBlock } = await fetchData(`
  query {
    GetLatestBlock {
      block {
        height
        time
        producer
        took
        total_nodes
        total_apps
        total_accounts
        total_txs
        total_relays_completed
        total_size
        block_size
        state_size
        nodes_unjailed_staked
        nodes_jailed_staked
        supported_block_chains
        monetary {
          m0
          mb
          ms
          mu
          __typename
        }
        __typename
      }
      validator_data {
        validator_threshold
        validator_threshold_with_jailed
        avg_validator_tokens_staked
        max_validator_tokens_staked
        __typename
      }
      __typename
    }
  }`);

  return {
    lastBlock: lastBlock.block,
  };
};

// export const getBlocks = cache(
//   async ({ take, skip }: { take: number; skip: number }) => {
//     const blocks = await prisma.blocks.findMany({
//       take,
//       skip,
//       orderBy: { height: "desc" },
//     });
//     const count = await prisma.blocks.count();
//     return {
//       blocks,
//       count,
//     };
//   }
// );

export const getLatestBlocks = async () => {
  const { ListPoktBlock: dataBlock } = await fetchData(`
  query {
    ListPoktBlock(pagination: {
    sort: [
      {
        property: "_id",
       direction: -1
      }
    ],
   limit: 10,
    filter: {
      operator: AND,
      properties: [
        {
          property: "time",
          operator: GTE,
          type: STRING,
          value: "${startDate24h}"
        },
        {
          property: "time",
          operator: LTE,
          type: STRING,
          value: "${endDate24H}"
        }
      ]
    }
  }) {
      pageInfo {
        has_next
        has_previous
        next
        previous
        totalCount
        __typename
      }
      items {
        _id
        height
        took
        time
        producer
        producer_service_url
        total_txs
        total_nodes
        total_relays_completed
        total_size
        nodes_jailed_staked
        nodes_unjailed_staked
        nodes_unjailed_unstaking
        apps_staked
        apps_unstaking
        block_size
        state_size
        __typename
      }
      __typename
    }
  }`);
  return dataBlock.items;
};

// export const getBlock = async ({
//   take,
//   skip,
//   height,
// }: {
//   take: number;
//   skip: number;
//   height: number | undefined;
// }) => {
//   const blocks = await prisma.blocks.findMany({
//     where: { height: height },
//   });
//   const transactions = await prisma.$queryRaw<any[]>`
//     SELECT *,transaction_hash as hash
//     FROM transactions_30_days
//     ORDER BY block_id DESC
//     LIMIT ${take}
//     OFFSET ${skip};`;
//   const count = await prisma.$queryRaw<any[]>`
//      SELECT COUNT(transaction_id) FROM transactions_30_days;`;
//   return {
//     transactions,
//     block: blocks[0],
//     count: Number(count[0].count),
//   };
// };

export const getBlocks = async ({ limit }: { limit: number }) => {
  const { ListPoktBlock: dataBlock } = await fetchData(`
  query {
    ListPoktBlock(pagination: {
    sort: [
      {
        property: "_id",
       direction: -1
      }
    ],
   limit: ${limit},
    filter: {
      operator: AND,
      properties: [
        {
          property: "time",
          operator: GTE,
          type: STRING,
          value: "${startDate24h}"
        },
        {
          property: "time",
          operator: LTE,
          type: STRING,
          value: "${endDate24H}"
        }
      ]
    }
  }) {
      pageInfo {
        has_next
        has_previous
        next
        previous
        totalCount
        __typename
      }
      items {
        _id
        height
        took
        time
        producer
        producer_service_url
        total_txs
        total_nodes
        total_relays_completed
        total_size
        nodes_jailed_staked
        nodes_unjailed_staked
        nodes_unjailed_unstaking
        apps_staked
        apps_unstaking
        block_size
        state_size
        __typename
      }
      __typename
    }
  }`);
  return {
    blocks: dataBlock.items,
  };
};
