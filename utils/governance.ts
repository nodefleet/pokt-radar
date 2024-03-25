import { cache } from "react";
import { fetchData } from "./db";

const getLastMonthDates = () => {
  const today = new Date();
  const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
  const startDate = lastMonth;
  const endDate = today;

  startDate.setDate(startDate.getDate() - 7);

  return {
    startDate: startDate.toISOString().split("T")[0],
    endDate: endDate.toISOString().split("T")[0],
  };
};

export const { startDate, endDate } = getLastMonthDates();

export const getGobernance = cache(async (limit: number) => {
  const GetLastBlockPoktParams = fetchData(`
    query {
      GetLastBlockPoktParams {
        parameters {
          name
          value
        }
      }
    }
    `);
  const ListPoktTransaction = fetchData(`
    query {
      ListPoktTransaction(pagination: {
        limit: ${limit},
        sort: [
          {
            property: "block_time",
            direction: -1
          }
        ],
        filter: {
          operator: AND,
          properties: [
            {
              property: "type",
              operator: IN,
              type: STRING,
              value: "[\\"dao_tranfer\\", \\"change_param\\", \\"upgrade\\"]"
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
  const ListChart = fetchData(`
    query {
        incomes: ListSummaryBetweenDates(input: {
        start_date: "${startDate}",
        end_date: "${endDate}",
        unit_time: day,
        interval: 1,
        date_format: "YYYY-MM-DD"
      }) {
          point_format
          points {
            point
            total_dao_rewards
          }
        }
        expenses: ListDaoExpensesBetweenDates(input: {
        start_date: "${startDate}",
        end_date: "${endDate}",
        unit_time: day,
        interval: 1,
        date_format: "YYYY-MM-DD"
      }) {
          point_format
          points {
            point
            last_height
            first_height
            amount
          }
        }
      }`);
  const [
    { GetLastBlockPoktParams: params },
    { ListPoktTransaction: dataTransaction },
    { incomes: dataIncome, expenses: dataExpense },
  ] = await Promise.all([
    GetLastBlockPoktParams,
    ListPoktTransaction,
    ListChart,
  ]);
  return {
    params,
    dataTransaction,
    dataIncome,
    dataExpense,
  };
});
