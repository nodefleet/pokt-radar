import { apiUrl, authToken, fetchData } from "./db";
import { getLastBlockHeight, getLatestBlocks } from "./blocks";
import { getPoktPrice } from "./makert";
import { getLatestTransactions, getTransactionStats } from "./txns";

export const getPrice = async () => {
  const apiGEKO = process.env.API_MARKET || "";
  const TOKEN_MARKET = process.env.TOKEN_MARKET || "";
  const { price } = await getPoktPrice(apiGEKO, TOKEN_MARKET);
  return price;
};

export const getAccount = async (address: string) => {
  const apiGEKO = process.env.API_MARKET || "";
  const TOKEN_MARKET = process.env.TOKEN_MARKET || "";
  const account = await getAccountPocker(address);

  const [{ price }, nodes] = await Promise.all([
    getPoktPrice(apiGEKO, TOKEN_MARKET),
    getPoktNode(address),
  ]);
  let stake = 0;
  try {
    const { GetAvgAndTotalsOfStakeAndRelaysForSelectionInLast24hrs } =
      await fetchData(`query {
GetAvgAndTotalsOfStakeAndRelaysForSelectionInLast24hrs(
  input: {
    node_selection: {
      output_address: "${address}"
    }
  }
) {
  total_staked
  total_relays
}
}
`);
    stake = GetAvgAndTotalsOfStakeAndRelaysForSelectionInLast24hrs;
  } catch (error) {
    console.error(error);
  }
  return { account, nodes, price, stake };
};
export const getAccountPocker = async (address: string) => {
  const query = `
    query {
      GetAccount(address: "${address}") {
        _id
        address
        height
        block_time
        public_key
        amount
        parse_time
      }
    }
  `;

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: authToken,
    },
    body: JSON.stringify({ query }),
  };

  try {
    const response = await fetch(apiUrl, requestOptions);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data.data.GetAccount;
  } catch (error) {
    console.error("There was a problem with your fetch operation:", error);
    throw error;
  }
};

export const getPoktNode = async (address: string) => {
  const query = `
  query {
    GetPoktNode(property: "address", value: "${address}") {
      _id
      block_time
      height
      parse_time
      producer
      public_key
      address
      output_address
      balance
      output_balance
      status
      service_url
      service_domain
      chains
      tokens
      unstaking_time
      jailed
      missed_signing_blocks_counter
      index_offset
      jailed_blocks_counter
      jailed_until
      start_height
      version
      missing_blocks
      custodial
      validator
      stake_weight
      total_pending_claim_relays
      total_pending_claim_tokens
    }
  }
`;

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: authToken,
    },
    body: JSON.stringify({ query }),
  };

  try {
    const response = await fetch(apiUrl, requestOptions);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data.data.GetPoktNode;
  } catch (error) {
    console.error("There was a problem with your fetch operation:", error);
    throw error;
  }
};

export const getHome = async () => {
  const getChart = getTransactionStats();
  const lastBlockHeightData = getLatestBlocks();
  const dataTrasaction = await getLatestTransactions();
  const apiGEKO = process.env.API_MARKET || "";
  const TOKEN_MARKET = process.env.TOKEN_MARKET || "";

  const [{ dataChartVetical, resultDought }, dataBlock] = await Promise.all([
    getChart,
    lastBlockHeightData,
  ]);
  const [{ lastBlock }, { price, market }] = await Promise.all([
    getLastBlockHeight(),
    getPoktPrice(apiGEKO, TOKEN_MARKET),
  ]);

  return {
    dataChartVetical,
    resultDought,
    dataBlock,
    dataTrasaction,
    lastBlock,
    price,
    market,
  };
};
