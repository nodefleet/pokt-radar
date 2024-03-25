import { cache } from "react";
import { fetchData } from "./db";
import { endDate, startDate } from "./governance";

export const getRelaysByChains = cache(async () => {
  const { GetChainRewardsByUnitBetweenDates: dataRelay } = await fetchData(`
    query GetChainRewardsByUnitBetweenDatesExample {
        GetChainRewardsByUnitBetweenDates(input: {
          start_date: "${startDate}",
          end_date: "${endDate}",
          unit_time: week,
          date_format: "YYYY-MM-DD",
          timezone: "UTC",
        }) {
          point_format
          points {
            point
            rewards_by_chain{
              chain
              total_relays
              total_rewards
              staked_nodes_avg
              rewards_avg
              first_bin_pokt_avg
              relays_avg
            }
          }
        }
      }
      
    `);
  const aggregatedData = dataRelay.points.reduce(
    (
      acc: { [x: string]: any },
      curr: { rewards_by_chain: { chain: string; total_relays: number }[] }
    ) => {
      curr.rewards_by_chain.forEach(({ chain, total_relays }) => {
        if (!acc[chain]) {
          acc[chain] = 0;
        }
        acc[chain] += total_relays;
      });
      return acc;
    },
    {}
  );
  const result = Object.keys(aggregatedData).map((chain) => ({
    chain:
      chains.find((x) => x.id === chain)?.full_name === undefined
        ? chain
        : chains.find((x) => x.id === chain)?.full_name,
    total_relays: aggregatedData[chain],
  }));
  return {
    dataRelay: result,
  };
});

export const chains = [
  {
    id: "0001",
    name: "pocket_mainnet",
    full_name: "POKT Mainnet (0001)",
  },

  {
    id: "0003",
    name: "avax_mainnet",
    full_name: "Avalanche Mainnet (0003)",
  },

  {
    id: "0005",
    name: "fuse_mainnet",
    full_name: "FUSE Mainnet (0005)",
  },

  {
    id: "0021",
    name: "eth_mainnet",
    full_name: "Ethereum (0021)",
  },

  {
    id: "0022",
    name: "eth_mainnet",
    full_name: "Ethereum Archival (0022)",
  },

  {
    id: "0023",
    name: "eth_ropsten",
    full_name: "Ethereum Ropsten (0023)",
  },

  {
    id: "0024",
    name: "eth_kovan",
    full_name: "Ethereum Kovan (0024)",
  },

  {
    id: "0025",
    name: "eth_rinkeby",
    full_name: "Ethereum Rinkeby (0025)",
  },

  {
    id: "0026",
    name: "eth_goerli",
    full_name: "Ethereum Goerli (0026)",
  },

  {
    id: "0027",
    name: "xdai_mainnet",
    full_name: "Gnosis - xDai (0027)",
  },

  {
    id: "0028",
    name: "eth_mainnet",
    full_name: "ETH Archival Trace (0028)",
  },

  {
    id: "0040",
    name: "harmony_mainnet",
    full_name: "Harmony Shard 0 (0040)",
  },

  {
    id: "0044",
    name: "iotex_mainnet",
    full_name: "IoTeX Mainnet (0044)",
  },

  {
    id: "0047",
    name: "oec_mainnet",
    full_name: "OEC Mainnet (0047)",
  },

  {
    id: "0009",
    name: "matic_mainnet",
    full_name: "Polygon Mainnet (0009)",
  },

  {
    id: "0006",
    name: "solana_mainnet",
    full_name: "Solana Mainnet (0006)",
  },

  {
    id: "0029",
    name: "algorand_mainnet",
    full_name: "Algorand (0029)",
  },

  {
    id: "0004",
    name: "bsc_mainnet",
    full_name: "BSC Mainnet (0004)",
  },

  {
    id: "03DF",
    name: "avax_dfk",
    full_name: "DFKchain Subnet (03DF)",
  },

  {
    id: "0048",
    name: "boba_mainnet",
    full_name: "Boba Mainnet (0048)",
  },

  {
    id: "0049",
    name: "fantom_mainnet",
    full_name: "Fantom (0049)",
  },

  {
    id: "000C",
    name: "xdai_archival",
    full_name: "Gnosis - xDAI Archival (000C)",
  },

  {
    id: "0052",
    name: "near_mainnet",
    full_name: "NEAR Mainnet (0052)",
  },

  {
    id: "000F",
    name: "matic_mumbai",
    full_name: "Polygon Mumbai Archival (000F)",
  },

  {
    id: "0050",
    name: "moombeam_mainnet",
    full_name: "Moonbeam Mainnet (0050)",
  },

  {
    id: "0051",
    name: "moonriver_mainnet",
    full_name: "Moonriver Mainnet (0051)",
  },

  {
    id: "0046",
    name: "evmos_mainnet",
    full_name: "Evmos Mainnet (0046)",
  },

  {
    id: "03CB",
    name: "swimmer_mainnet",
    full_name: "Swimmer Mainnet (03CB)",
  },

  {
    id: "0053",
    name: "optimism_mainnet",
    full_name: "Optimism Mainnet (0053)",
  },
  {
    id: "0059",
    name: "doge_mainnet",
    full_name: "Dogechain Mainnet (0059)",
  },
  {
    id: "0058",
    name: "metis_mainnet",
    full_name: "Metis Mainnet (0058)",
  },
  {
    id: "0060",
    name: "starknet_mainnet",
    full_name: "Starknet Mainnet (0060)",
  },
  {
    id: "0056",
    name: "klaytn_mainnet",
    full_name: "Klaytn Mainnet (0056)",
  },
  {
    id: "0054",
    name: "osmosis_mainnet",
    full_name: "Osmosis Mainnet (0054)",
  },
  {
    id: "0066",
    name: "arbitrum_mainnet",
    full_name: "Arbitrum Mainnet (0066)",
  },
  {
    id: "0071",
    name: "kava_mainnet",
    full_name: "Kava Mainnet (0071)",
  },
  {
    id: "000B",
    name: "matic_archival",
    full_name: "Matic Archival (000B)",
  },
  {
    id: "0074",
    name: "zkevm_mainnet",
    full_name: "zkEVM Mainnet (0074)",
  },
  {
    id: "0067",
    name: "velas_mainnet",
    full_name: "Velas Mainnet (0067)",
  },
  {
    id: "0075",
    name: "scroll_testnet",
    full_name: "Scroll Testnet (0075)",
  },
];
