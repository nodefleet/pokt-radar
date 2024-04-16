import { fetchData } from "./db";

const getStatusPokscan = async () => {
  try {
    const { GetPoktscanStatus: status } = await fetchData(`
      query {
        GetPoktscanStatus {
          poktscan_height
          network_height
          is_sync
          is_syncing
          blocks_behind
          time
          __typename
        }
      } 
    `);
    return { status };
  } catch (error) {
    console.error("Error fetching Pokscan status:", error);
    throw error;
  }
};

export const updateLast24HoursRange = async () => {
  try {
    const { status } = await getStatusPokscan();

    const currentDate = new Date(status.time);
    const last24HoursTime = currentDate.getTime() - 24 * 60 * 60 * 1000;
    const last24HoursStartDate = new Date(last24HoursTime);
    const formattedStartDate = last24HoursStartDate.toISOString();
    const formattedEndDate = currentDate.toISOString();

    return { startDate24H: formattedStartDate, endDate24H: formattedEndDate };
  } catch (error) {
    console.error("Error updating last 24 hours range:", error);
    throw error;
  }
};

export const updateLastMonthDates = async () => {
  const { status } = await getStatusPokscan();
  const today = new Date(status.time);
  const startDateObj = new Date(status.time);
  const endDateObj = today;

  startDateObj.setDate(startDateObj.getDate() - 29);
  return {
    startDate: startDateObj.toISOString().split("T")[0],
    endDate: endDateObj.toISOString().split("T")[0],
  };
};

export const getGobernance = async (limit: number) => {
  const { endDate, startDate } = await updateLastMonthDates();
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
  const getDaoBalance = fetchData(`
      query {
        GetDaoBalanceByBlockBetweenDates(input: {
          start_date: "${endDate}"
          end_date:"${endDate}"
          date_format: "YYYY-MM-DD"
          timezone: "UTC"
          exclusive_date:false
        }) {
          point
          amount
          height
          block_time
        }
      }`);
  const [
    { GetLastBlockPoktParams: params },
    { ListPoktTransaction: dataTransaction },
    { incomes: dataIncome, expenses: dataExpense },
    { GetDaoBalanceByBlockBetweenDates: daoBalance },
  ] = await Promise.all([
    GetLastBlockPoktParams,
    ListPoktTransaction,
    ListChart,
    getDaoBalance,
  ]);
  const sortedArray = daoBalance.sort(
    (a: { height: number }, b: { height: number }) => b.height - a.height
  );
  return {
    params,
    dataTransaction,
    dataIncome,
    dataExpense,
    daoBalance: sortedArray[0].amount,
  };
};
