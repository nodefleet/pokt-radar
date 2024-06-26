import {
  DoughnutsChartGoubernance,
  DoughnutsChartMakert,
  GovernancePage,
} from "@/components/charts";
import {
  GovernanceTable,
  GovernanceTable2,
  GovernanceTableTransaction,
} from "@/components/tables";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Governance({
  SKIP,
  PAGE_SIZE,
  page,
  data,
}: {
  SKIP: number;
  PAGE_SIZE: number;
  page: number;
  data: {
    params: any;
    dataTransaction: any;
    dataExpense: any;
    dataIncome: any;
    daoBalance: number;
  };
}) {
  const { params, dataTransaction, dataExpense, dataIncome, daoBalance } = data;
  const block = [
    { block: "RewardDelegators", status: "Activated", height: 123083 },
    { block: "BLOCK", status: "Activated", height: 102698 },
    { block: "OEDIT", status: "Activated", height: 102695 },
    { block: "CRVAL", status: "Activated", height: 102690 },
    { block: "NCUST", status: "Activated", height: 74620 },
    { block: "RSCAL", status: "Activated", height: 69232 },
    { block: "MREL", status: "Activated", height: 69232 },
    { block: "REDUP", status: "Activated", height: 57620 },
  ];
  const PAGE_LIMIT = 50;

  const parametr = params.parameters
    .map((x: any) => {
      const amount = Number(x.value);
      if (!isNaN(amount)) {
        return {
          parameters: x.name,
          amount: amount,
        };
      } else {
        return null;
      }
    })
    .filter((x: any) => x !== null)
    .sort((a: any, b: any) => {
      return b.amount - a.amount;
    });

  const [selectedOption, setSelectedOption] = useState(1);
  const [newData, setNewData] = useState<{ dataIncome: any; dataExpense: any }>(
    {
      dataIncome: dataIncome,
      dataExpense: dataExpense,
    }
  );

  const handleSelectChange = (e: any) => {
    setSelectedOption(parseInt(e.target.value));
  };

  useEffect(() => {
    if (selectedOption !== 1) {
      const last7DaysIncome = dataIncome.points.slice(-7);
      const last7DaysExpense = dataExpense.points.slice(-7);
      setNewData({
        dataIncome: {
          point_format: dataIncome.point_format,
          points: last7DaysIncome,
        },
        dataExpense: {
          point_format: dataExpense.point_format,
          points: last7DaysExpense,
        },
      });
    } else {
      setNewData({
        dataExpense: dataExpense,
        dataIncome: dataIncome,
      });
    }
  }, [selectedOption, dataIncome, dataExpense]);

  const totalAmount = newData.dataExpense.points.reduce(
    (total: any, value: { amount: any }) => total + value.amount,
    0
  );
  const totalRewards = newData.dataIncome.points.reduce(
    (total: any, value: { total_dao_rewards: any }) =>
      total + value.total_dao_rewards,
    0
  );
  const totalRewardsLast24Hours = newData.dataIncome.points
    .slice(-2)
    .reduce(
      (total: any, value: { total_dao_rewards: any }) =>
        total + value.total_dao_rewards,
      0
    );
  const totalAmountLast24Hours = newData.dataExpense.points
    .slice(-2)
    .reduce((total: any, value: { amount: any }) => total + value.amount, 0);

  return (
    <div className="grow p-6 max-sm:p-4 max-sm:py-4 flex flex-col gap-8">
      <div className="grid grid-cols-2 max-sm:grid-cols-1 max-sm:gap-2 gap-4">
        <div className="flex flex-col p-5 gap-2 bg-white rounded-xl shadow-lg w-full">
          <div className="mt-8 md:mt-0 max-sm:mt-0">
            <div className="flex justify-between flex-row gap-3 max-sm:flex-col items-center">
              <div className="flex justify-start flex-row items-start">
                <p className="mb-4 text-black font-semibold text-xl">
                  Protocol Upgrade
                </p>
              </div>
            </div>
            <hr className="border-gray-bera w-12/12 mx-4 justify-self-center" />
            <div className="flex justify-between flex-row gap-3 max-sm:flex-col items-center p-3">
              <div className="flex justify-start flex-col gap-2 items-start w-full">
                <p className="text-black font-semibold text-xl">Version</p>
                <p className="font-normal">0.11.1</p>
              </div>
              <div className="flex justify-start flex-col gap-2 items-start w-full">
                <p className="text-black font-semibold text-xl">Height</p>
                <p className="font-normal">123081</p>
              </div>
              <div className="flex justify-start flex-col gap-2 items-start w-full">
                <p className="text-black font-semibold text-xl">Date</p>
                <p className="font-normal">February 20, 2024</p>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <div className="w-full h-full max-h-96 overflow-auto">
                <GovernanceTable data={block} />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col p-5 gap-2 bg-white rounded-xl shadow-lg w-full">
          <div className="mt-8 md:mt-0 max-sm:mt-0">
            <div className="flex justify-between flex-row gap-3 max-sm:flex-col items-center">
              <div className="flex justify-start flex-row items-center w-full">
                <p className="mb-4 text-black font-semibold text-xl">
                  Current Parameters
                </p>
              </div>
            </div>
            <hr className="border-gray-bera w-12/12 mx-4 justify-self-center" />
            <div className="flex justify-between flex-row gap-3 max-sm:flex-col items-center p-3">
              <div className="flex justify-start flex-col gap-2 items-start w-full">
                <p className="text-black font-semibold text-xl">pos/RTTM</p>
                <p className="font-normal">0.000558</p>
              </div>
              <div className="flex justify-start flex-col gap-2 items-start w-full">
                <p className="text-black font-semibold text-xl">pos/MV</p>
                <p className="font-normal">1,000</p>
              </div>
              <div className="flex justify-start flex-col gap-2 items-start w-full">
                <p className="text-black font-semibold text-xl">pos/DA</p>
                <p className="font-normal">10</p>
              </div>
              <div className="flex justify-start flex-col gap-2 items-start w-full">
                <p className="text-black font-semibold text-xl">pos/PP</p>
                <p className="font-normal">5</p>
              </div>
            </div>
            <div className="w-full h-full max-h-96 overflow-auto">
              <GovernanceTable2 data={parametr} />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row max-sm:flex-col max-sm:gap-2 gap-4">
        <div className="flex flex-col p-5 gap-2 bg-white rounded-xl shadow-lg lg:w-7/12">
          <div className="mt-8 md:mt-0 max-sm:mt-0">
            <div className="flex justify-between flex-row gap-3 max-sm:flex-col items-center">
              <div className="flex justify-start flex-row items-start">
                <p className="mb-4 text-black font-semibold text-xl">
                  Treasury
                </p>
                <p className="font-medium text-base rounded-full max-sm:ml-3 ml-5 text-gray-400 outline-1 outline-double outline-gray-400 text-center py-0.5 px-4">
                  24h
                </p>
              </div>
            </div>
            <p className="mb-4 text-black font-semibold text-sm">
              Incomes / Expenses
            </p>
            <hr className="border-gray-bera w-12/12 mx-4 justify-self-center" />
            <div className="flex flex-col justify-center items-center h-full">
              <div className="w-full h-full max-h-96 p-4">
                <DoughnutsChartGoubernance
                  resultDought={[
                    { date: "Income", count: totalRewardsLast24Hours },
                    { date: "Expenses", count: totalAmountLast24Hours },
                  ]}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col p-5 gap-2 bg-white rounded-xl shadow-lg w-full">
          <div className="mt-8 md:mt-0 max-sm:mt-0">
            <div className="flex justify-between flex-row gap-3 max-sm:flex-col items-center">
              <div className="flex justify-start flex-row items-center w-full">
                <p className="mb-4 text-black font-semibold text-xl">
                  DAO Treasury
                </p>
                <p className="font-medium text-base rounded-full max-sm:ml-3 ml-5 text-gray-400 outline-1 outline-double outline-gray-400 text-center py-0.5 px-4 -translate-y-2">
                  {selectedOption === 1 ? 30 : 7}D
                </p>
              </div>
            </div>
            <hr className="border-gray-bera w-12/12 mx-4 justify-self-center" />
            <div className="flex justify-between flex-row gap-3 max-sm:flex-col items-center p-3 mb-6">
              <div className="flex justify-start flex-col gap-2 items-start w-full">
                <p className="text-black font-semibold text-xl">
                  Total Balance
                </p>
                <p className="font-normal">
                  {"$" + daoBalance.toLocaleString("en-EN")}
                </p>
              </div>
              <div className="flex justify-start flex-col gap-2 items-start w-full">
                <p className="text-black font-semibold text-xl">
                  Income Last {selectedOption === 1 ? 30 : 7} days
                </p>
                <p className="font-normal">
                  {"$" + totalRewards.toLocaleString("en-EN")}
                </p>
              </div>
              <div className="flex justify-start flex-col gap-2 items-start w-full">
                <p className="text-black font-semibold text-xl">
                  Expenses Last {selectedOption === 1 ? 30 : 7} Days
                </p>
                <p className="font-normal">
                  {"$" + totalAmount.toLocaleString("en-EN")}
                </p>
              </div>
            </div>
            <div className="flex justify-between flex-row gap-3 max-sm:flex-col items-center">
              <div className="flex justify-start flex-row items-center w-full">
                <p className="mb-4 text-black font-semibold text-xl">
                  Treasury Accounting
                </p>
                <p className="font-medium text-base rounded-full max-sm:ml-3 ml-5 text-gray-400 outline-1 outline-double outline-gray-400 text-center py-0.5 px-4 -translate-y-1">
                  {selectedOption === 1 ? 30 : 7}D
                </p>
              </div>
              <div className="relative w-28">
                <label className="absolute right-2 top-3 translate-y-0.5 cursor-pointer">
                  <i className="fa-solid fa-angle-down"></i>
                </label>
                <select
                  className="border border-black py-3 text-base px-4 outline-none rounded-full appearance-none w-full cursor-pointer relative z-10 bg-transparent"
                  id="selectMo"
                  onChange={handleSelectChange}
                >
                  <option value={1}>Month</option>
                  <option value={2}>Week</option>
                </select>
              </div>
            </div>
            <div className="w-full h-full max-h-96 overflow-x-auto">
              <GovernancePage
                dataIncome={newData.dataIncome}
                dataExpense={newData.dataExpense}
              />
            </div>
          </div>
        </div>
      </div>
      <GovernanceTableTransaction
        data={[...dataTransaction.items].slice(SKIP - 10, SKIP)}
        PAGE_SIZE={PAGE_SIZE}
        PAGE_LIMIT={PAGE_LIMIT}
        page={page}
      />
    </div>
  );
}

export async function getServerSideProps(context: { query: { page: any } }) {
  const { page } = context.query;

  try {
    const pages = (page && !isNaN(parseInt(page)) && parseInt(page)) || 1;

    const PAGE_SIZE = 10;
    const SKIP = pages * PAGE_SIZE;

    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const response = await axios.get(
      `${apiUrl}/api/governace` + `?limit=${SKIP}`
    );

    return {
      props: {
        data: response.data,
        page: page ? Number(page) : 1,
        SKIP,
        PAGE_SIZE,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        data: [],
        page: 1,
        SKIP: 0,
        PAGE_SIZE: 10,
      },
    };
  }
}
