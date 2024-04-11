import { fetchData } from "./db";
import { updateLast24HoursRange, updateLastMonthDates } from "./governance";

export const getRelaysByChains = async () => {
  const { endDate24H, startDate24H } = await updateLast24HoursRange();
  const { endDate, startDate } = await updateLastMonthDates();
  const start = new Date(startDate).setDate(new Date(startDate).getDate() - 2);
  const { GetRelaysByGatewayAndChainBetweenDates: dataRelay } =
    await fetchData(`query {
    GetRelaysByGatewayAndChainBetweenDates(input: {
    start_date: "${new Date(start).toISOString().split("T")[0]}",
    end_date: "${endDate}",
    timezone: "UTC",
    date_format: "YYYY-MM-DD"
    }) {
      chain
      gateway
      total_relays
      total_rewards
      __typename
    }
  }`);
  const { GetRelaysByGatewayAndChainBetweenDates: dataChtw } =
    await fetchData(`query {
  GetRelaysByGatewayAndChainBetweenDates(input: {
  start_date: "${startDate24H}",
  end_date: "${endDate24H}",
  timezone: "UTC",
  date_format: "YYYY-MM-DDTHH:mm:ss.SSSZ"
  }) {
    chain
    gateway
    total_relays
    total_rewards
    __typename
  }
}`);
  const result = dataRelay.map((chain: any) => ({
    chain:
      chains.find((x) => x.id === chain.chain)?.full_name === undefined
        ? chain.chain
        : chains.find((x) => x.id === chain.chain)?.full_name,
    total_relays: chain.total_relays,
    logoURL: chains.find((x) => x.id === chain.chain)?.logoURL,
  }));
  const results = dataChtw.reduce(
    (
      accumulator: { [x: string]: { gateway: any; total_relays: any } },
      currentValue: { gateway: any; total_relays: any }
    ) => {
      const { gateway, total_relays } = currentValue;
      if (accumulator[gateway]) {
        accumulator[gateway].total_relays += total_relays;
      } else {
        accumulator[gateway] = {
          gateway,
          total_relays,
        };
      }
      return accumulator;
    },
    {}
  );
  const dataChart = Object.values(results);
  return {
    dataRelay: result,
    dataChart: dataChart.map((row: any) => ({
      date: row.gateway === 1 ? "Grove" : "Nodies",
      count: row.total_relays,
    })),
  };
};

export const chains = [
  {
    id: "0001",
    name: "pocket_mainnet",
    full_name: "POKT Mainnet (0001)",
    logoURL:
      "https://www.cryptologos.cc/logos/pocket-network-pokt-logo.png?v=024",
  },
  {
    id: "0003",
    name: "avax_mainnet",
    full_name: "Avalanche Mainnet (0003)",
    logoURL:
      "https://th.bing.com/th/id/OIP.PheOQoFvOnUQYUXhX1UitAHaHa?rs=1&pid=ImgDetMain",
  },
  {
    id: "0005",
    name: "fuse_mainnet",
    full_name: "FUSE Mainnet (0005)",
    logoURL: "https://www.chailnlist.org/icons/chains/rsz_fuse.jpg",
  },
  {
    id: "0021",
    name: "eth_mainnet",
    full_name: "Ethereum (0021)",
    logoURL: "https://clipground.com/images/ethereum-png-12.png",
  },
  {
    id: "0022",
    name: "eth_mainnet",
    full_name: "Ethereum Archival (0022)",
    logoURL: "https://clipground.com/images/ethereum-png-12.png",
  },
  {
    id: "0023",
    name: "eth_ropsten",
    full_name: "Ethereum Ropsten (0023)",
    logoURL:
      "https://1000logos.net/wp-content/uploads/2023/01/Ethereum-logo.png",
  },
  {
    id: "0024",
    name: "eth_kovan",
    full_name: "Ethereum Kovan (0024)",
    logoURL:
      "https://ethereum.org/static/63e78793608854428a7ef5824892b32a/images/ethereum-logo.svg",
  },
  {
    id: "0025",
    name: "eth_rinkeby",
    full_name: "Ethereum Rinkeby (0025)",
    logoURL: "https://clipground.com/images/ethereum-png-12.png",
  },
  {
    id: "0026",
    name: "eth_goerli",
    full_name: "Ethereum Goerli (0026)",
    logoURL: "https://clipground.com/images/ethereum-png-12.png",
  },
  {
    id: "0027",
    name: "xdai_mainnet",
    full_name: "Gnosis - xDai (0027)",
    logoURL: "https://wpsmartcontracts.com/assets/networks/xDai-network.png",
  },
  {
    id: "0028",
    name: "eth_mainnet",
    full_name: "ETH Archival Trace (0028)",
    logoURL: "https://clipground.com/images/ethereum-png-12.png",
  },
  {
    id: "0040",
    name: "harmony_mainnet",
    full_name: "Harmony Shard 0 (0040)",
    logoURL:
      "https://th.bing.com/th/id/OIP.SdsdKPTeq7jwW6nfCyTm4gHaHa?w=2500&h=2500&rs=1&pid=ImgDetMain",
  },
  {
    id: "0044",
    name: "iotex_mainnet",
    full_name: "IoTeX Mainnet (0044)",
    logoURL:
      "https://th.bing.com/th/id/R.feeb7f4a7c839425d891298000b8b767?rik=Sfqu%2fGb%2bl83ZfA&pid=ImgRaw&r=0",
  },
  {
    id: "0047",
    name: "oec_mainnet",
    full_name: "OEC Mainnet (0047)",
    logoURL:
      "https://th.bing.com/th/id/OIP.MmSbMW6Ro_k4YZj4qj7kggHaHa?w=480&h=480&rs=1&pid=ImgDetMain",
  },
  {
    id: "0009",
    name: "matic_mainnet",
    full_name: "Polygon Mainnet (0009)",
    logoURL: "https://www.chailnlist.org/icons/chains/rsz_polygon.jpg",
  },
  {
    id: "0006",
    name: "solana_mainnet",
    full_name: "Solana Mainnet (0006)",
    logoURL:
      "https://th.bing.com/th/id/R.88d4f0a56564195cc911077d59eb49c6?rik=SUYjmEuYkEYnrQ&pid=ImgRaw&r=0",
  },
  {
    id: "0029",
    name: "algorand_mainnet",
    full_name: "Algorand (0029)",
    logoURL:
      "https://th.bing.com/th/id/OIP.EKLk5WpAlKZWSyQBYsGnXQHaFj?rs=1&pid=ImgDetMain",
  },
  {
    id: "0004",
    name: "bsc_mainnet",
    full_name: "BSC Mainnet (0004)",
    logoURL:
      "https://th.bing.com/th/id/OIP.n69WHhu9Qn1dc5tTkkk1fwHaHa?rs=1&pid=ImgDetMain",
  },
  {
    id: "03DF",
    name: "avax_dfk",
    full_name: "DFKchain Subnet (03DF)",
    logoURL:
      "https://th.bing.com/th/id/OIP.bFpOS7RmEG40NbEhSzzULAHaHa?rs=1&pid=ImgDetMain",
  },
  {
    id: "0048",
    name: "boba_mainnet",
    full_name: "Boba Mainnet (0048)",
    logoURL:
      "https://assets-global.website-files.com/5f973c97cf5aea614f93a26c/6495ce252110fb8fa742b757_boba-network-rpc-logo.jpeg",
  },
  {
    id: "0049",
    name: "fantom_mainnet",
    full_name: "Fantom (0049)",
    logoURL:
      "https://th.bing.com/th/id/OIP.NiGQNb2kn2hVLTn8qFI9HgHaHa?rs=1&pid=ImgDetMain",
  },
  {
    id: "000C",
    name: "xdai_archival",
    full_name: "Gnosis - xDAI Archival (000C)",
    logoURL: "https://wpsmartcontracts.com/assets/networks/xDai-network.png",
  },
  {
    id: "0052",
    name: "near_mainnet",
    full_name: "NEAR Mainnet (0052)",
    logoURL:
      "https://th.bing.com/th/id/OIP.uKl8tQhs9l9Eh6JPQwMgeQAAAA?rs=1&pid=ImgDetMain",
  },
  {
    id: "000F",
    name: "matic_mumbai",
    full_name: "Polygon Mumbai Archival (000F)",
    logoURL: "https://d235dzzkn2ryki.cloudfront.net/matic-network_large.png",
  },
  {
    id: "0050",
    name: "moombeam_mainnet",
    full_name: "Moonbeam Mainnet (0050)",
    logoURL:
      "https://th.bing.com/th/id/OIP.fT1a6df2Gh4bGLI4w1qHEwHaHa?rs=1&pid=ImgDetMain",
  },
  {
    id: "0051",
    name: "moonriver_mainnet",
    full_name: "Moonriver Mainnet (0051)",
    logoURL:
      "https://th.bing.com/th/id/OIP.XkTubFWXe6Lxx17tLwZdxgHaEx?rs=1&pid=ImgDetMain",
  },
  {
    id: "0046",
    name: "evmos_mainnet",
    full_name: "Evmos Mainnet (0046)",
    logoURL:
      "https://th.bing.com/th/id/OIP.lXn2Rr37NqfAC58825oMaAHaHa?rs=1&pid=ImgDetMain",
  },
  {
    id: "03CB",
    name: "swimmer_mainnet",
    full_name: "Swimmer Mainnet (03CB)",
    logoURL:
      "https://th.bing.com/th/id/OIP.OQ4Cm1GNcsQ9k-CRswXPiQHaHa?rs=1&pid=ImgDetMain",
  },
  {
    id: "0053",
    name: "optimism_mainnet",
    full_name: "Optimism Mainnet (0053)",
    logoURL:
      "https://framerusercontent.com/images/rhep3TW2vY04uSzBhR9oAhSuo78.png",
  },
  {
    id: "0059",
    name: "doge_mainnet",
    full_name: "Dogechain Mainnet (0059)",
    logoURL: "https://faucet.dogechain.dog/imgs/dogechain.png",
  },
  {
    id: "0058",
    name: "metis_mainnet",
    full_name: "Metis Mainnet (0058)",
    logoURL: "https://get.celer.app/cbridge-icons/metis.png",
  },
  {
    id: "0060",
    name: "starknet_mainnet",
    full_name: "Starknet Mainnet (0060)",
    logoURL:
      "https://th.bing.com/th/id/OIP.Fzlz8yEyYei8pSW167K-FQHaHa?rs=1&pid=ImgDetMain",
  },
  {
    id: "0056",
    name: "klaytn_mainnet",
    full_name: "Klaytn Mainnet (0056)",
    logoURL:
      "https://th.bing.com/th/id/OIP.6r2guj_sGafNVqH8f6CXWgHaHa?rs=1&pid=ImgDetMain",
  },
  {
    id: "0054",
    name: "osmosis_mainnet",
    full_name: "Osmosis Mainnet (0054)",
    logoURL:
      "https://th.bing.com/th/id/OIP.SjRDMA5yIoa1Rn01VVQ2GgAAAA?rs=1&pid=ImgDetMain",
  },
  {
    id: "0066",
    name: "arbitrum_mainnet",
    full_name: "Arbitrum Mainnet (0066)",
    logoURL:
      "https://th.bing.com/th/id/R.0d9388ff20a360b06fe4f08b71f0eda2?rik=98sorNeliK4ZGw&pid=ImgRaw&r=0",
  },
  {
    id: "0071",
    name: "kava_mainnet",
    full_name: "Kava Mainnet (0071)",
    logoURL:
      "https://th.bing.com/th/id/OIP.LrDuHAa_uZbx_FBUSPiSwQAAAA?rs=1&pid=ImgDetMain",
  },
  {
    id: "000B",
    name: "matic_archival",
    full_name: "Matic Archival (000B)",
    logoURL:
      "https://th.bing.com/th/id/OIP.ecuMZRwMWNFbNx68IM96jwHaHa?rs=1&pid=ImgDetMain",
  },
  {
    id: "0074",
    name: "zkevm_mainnet",
    full_name: "zkEVM Mainnet (0074)",
    logoURL:
      "https://assets-global.website-files.com/6364e65656ab107e465325d2/642235057dbc06788f6c45c1_polygon-zkevm-logo.png",
  },
  {
    id: "0067",
    name: "velas_mainnet",
    full_name: "Velas Mainnet (0067)",
    logoURL:
      "https://th.bing.com/th/id/OIP.67dZUCzqqImBiEeSO5Sy2wHaHa?rs=1&pid=ImgDetMain",
  },
  {
    id: "0075",
    name: "scroll_testnet",
    full_name: "Scroll Testnet (0075)",
    logoURL:
      "https://th.bing.com/th/id/OIP.8HBy7ArPdCap_BVXqO6JugAAAA?rs=1&pid=ImgDetMain",
  },
  {
    id: "0079",
    full_name: "Base Mainnet",
    logoURL:
      "https://cryptoexchangereviews.com/wp-content/uploads/2021/04/coinbase-icon2.png",
  },
  {
    id: "C006",
    full_name: "Solana Custom",
    logoURL:
      "https://th.bing.com/th/id/R.88d4f0a56564195cc911077d59eb49c6?rik=SUYjmEuYkEYnrQ&pid=ImgRaw&r=0",
  },
  {
    id: "A053",
    full_name: "Optimism Archival",
    logoURL:
      "https://lcw.nyc3.cdn.digitaloceanspaces.com/production/platforms/64/optimism.png",
  },
  {
    id: "0080",
    full_name: "Base Testnet",
    logoURL:
      "https://altcoinsbox.com/wp-content/uploads/2023/02/base-logo-in-blue.jpg",
  },
  {
    id: "0065",
    full_name: "Celo Mainnet",
    logoURL:
      "https://th.bing.com/th/id/OIP.p8lV3sRNZzIhJglmiYEgUQHaHa?rs=1&pid=ImgDetMain",
  },
  {
    id: "0082",
    full_name: "Scroll Mainnet",
    logoURL:
      "https://th.bing.com/th/id/OIP.8HBy7ArPdCap_BVXqO6JugAAAA?rs=1&pid=ImgDetMain",
  },
  {
    id: "0063",
    full_name: "Goerli Archival",
    logoURL: "https://clipground.com/images/ethereum-png-12.png",
  },
  {
    id: "0076",
    full_name: "Sui Mainnet (0076)",
    logoURL: "https://mypui.redou.vip/assets/img/logo.png",
  },
  {
    id: "0081",
    full_name: "Holesky Testnet (0081)",
    logoURL: "https://clipground.com/images/ethereum-png-12.png",
  },
  {
    id: "A0CA",
    full_name: "Celestia Archival (A0CA)",
    logoURL:
      "https://th.bing.com/th/id/R.032e3a1d62a0a4daa7fd11fbc8e05f52?rik=%2ftyQrU5QNwsgpQ&pid=ImgRaw&r=0",
  },
  {
    id: "0010",
    full_name: "BSC Archival (0010)",
    logoURL:
      "https://assets.coingecko.com/coins/images/23998/large/bscb.png?1645958644",
  },
  {
    id: "0069",
    full_name: "Oasys Archival (0069)",
    logoURL:
      "https://th.bing.com/th/id/OIP.ufet8mUDfaJ2GuJHhQKBSgAAAA?rs=1&pid=ImgDetMain",
  },
  {
    id: "0070",
    full_name: "Oasys Mainnet (0070)",
    logoURL:
      "https://th.bing.com/th/id/OIP.ufet8mUDfaJ2GuJHhQKBSgAAAA?rs=1&pid=ImgDetMain",
  },
  {
    id: "0072",
    full_name: "Kava Archival (0072)",
    logoURL:
      "https://import.cdn.thinkific.com/250611/custom_site_themes/id/ydsDoKlpTW68vLq7UgRZ_Alberta_Real_Estate_School_K.png",
  },
  {
    id: "A003",
    full_name: "Avalanche Archival (A003)",
    logoURL:
      "https://th.bing.com/th/id/R.9e16b4e4b5cacd3c87d1f44114844f5c?rik=TW4rI6PKJlNYAw&pid=ImgRaw&r=0",
  },
  {
    id: "0077",
    full_name: "Sepolia Testnet (0077)",
    logoURL:
      "https://cdn.vectorstock.com/i/preview-1x/78/84/dolphin-cartoon-character-vector-45857884.jpg",
  },
  {
    id: "0078",
    full_name: "Sepolia Archival (0078)",
    logoURL:
      "https://cdn.vectorstock.com/i/preview-1x/78/84/dolphin-cartoon-character-vector-45857884.jpg",
  },
  {
    id: "0083",
    full_name: "Radix Mainnet (0083)",
    logoURL:
      "https://cdn.getmidnight.com/4879ec630956eaeeb1897956e2b6d13d/2021/06/Radix-logo.png",
  },
];
