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
import { getGobernance } from "@/utils/governance";

export default async function Governance({
  searchParams,
}: {
  searchParams: { page: string | undefined };
}) {
  const page =
    (searchParams.page &&
      !isNaN(parseInt(searchParams.page)) &&
      parseInt(searchParams.page)) ||
    1;
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
  const PAGE_SIZE = 10;
  const SKIP = page * PAGE_SIZE;
  const PAGE_LIMIT = 50;
  const { params, dataTransaction, dataExpense, dataIncome } =
    await getGobernance(SKIP);

  const totalAmount = dataExpense.points.reduce(
    (total: any, value: { amount: any }) => total + value.amount,
    0
  );
  const totalRewards = dataIncome.points.reduce(
    (total: any, value: { total_dao_rewards: any }) =>
      total + value.total_dao_rewards,
    0
  );

  const parametr = params.parameters
    .map((x: any) => {
      const amount = Number(x.value);
      if (!isNaN(amount)) {
        return {
          parameters: x.name,
          amount: amount.toLocaleString(),
        };
      } else {
        return null;
      }
    })
    .filter((x: any) => x !== null);

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
                <p className="font-normal">0.10.4</p>
              </div>
              <div className="flex justify-start flex-col gap-2 items-start w-full">
                <p className="text-black font-semibold text-xl">Height</p>
                <p className="font-normal">102687</p>
              </div>
              <div className="flex justify-start flex-col gap-2 items-start w-full">
                <p className="text-black font-semibold text-xl">Date</p>
                <p className="font-normal">August 1, 2023</p>
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
                    { date: "Income", count: totalRewards },
                    { date: "Expenses", count: totalAmount },
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
                  30D
                </p>
              </div>
            </div>
            <hr className="border-gray-bera w-12/12 mx-4 justify-self-center" />
            <div className="flex justify-between flex-row gap-3 max-sm:flex-col items-center p-3 mb-6">
              <div className="flex justify-start flex-col gap-2 items-start w-full">
                <p className="text-black font-semibold text-xl">
                  Total Balance
                </p>
                <p className="font-normal">$44,569,959.96</p>
              </div>
              <div className="flex justify-start flex-col gap-2 items-start w-full">
                <p className="text-black font-semibold text-xl">
                  Income Last 30 days
                </p>
                <p className="font-normal">
                  {"$" + totalRewards.toLocaleString("en-EN")}
                </p>
              </div>
              <div className="flex justify-start flex-col gap-2 items-start w-full">
                <p className="text-black font-semibold text-xl">
                  Expenses Last 30 Days
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
                  30D
                </p>
              </div>
              <div className="relative w-28">
                <label className="absolute right-2 top-3 translate-y-0.5 cursor-pointer">
                  <i className="fa-solid fa-angle-down"></i>
                </label>
                <select
                  className="border border-black py-3 text-base px-4 outline-none rounded-full appearance-none w-full cursor-pointer relative z-10 bg-transparent"
                  id="selectMo"
                >
                  <option value={1}>All</option>
                  <option value={2}>Monthly</option>
                </select>
              </div>
            </div>
            <div className="w-full h-full max-h-96 overflow-x-auto">
              <GovernancePage
                dataIncome={dataIncome}
                dataExpense={dataExpense}
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
