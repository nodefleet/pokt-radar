import "server-only";
import { cache } from "react";
import { prisma } from "./db";

const apiUrl = "https://api.poktscan.com/poktscan/api/graphql";
const authToken = "461fc459-6254-443c-939a-a84da4f495fb";

export const getAccount = cache(async (address: string) => {
  const account = await getAccountPocker(address);
  const nodes = await getPoktNode(address);
  //   const nodes = await prisma.$queryRaw<any[]>`
  //   SELECT *
  //   FROM nodes
  //   WHERE address = ${address}
  //   ORDER BY height DESC
  //   LIMIT 1;
  // `;
  return { account, nodes };
});
export const getAccountPocker = cache(async (address: string) => {
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
});

export const getPoktNode = cache(async (address: string) => {
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
});
