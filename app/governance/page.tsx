import InputSearch from "@/components/InputSearch";
import { RadioButtonGroup } from "@/components/RadioButton";
import { DoughnutsChartMakert, GovernancePage } from "@/components/charts";
import {
  GovernanceTable,
  GovernanceTable2,
  LatestMakerTable,
} from "@/components/tables";
import { Transaction } from "../transaction/page";
import DataTable from "@/components/DataTable";
import Link from "next/link";
import Pagination from "@/components/Pagination";

export default function Governance() {
  const transactions = [
    { pair: "BTC/USD", volume: 100 },
    { pair: "ETH/USD", volume: 200 },
    { pair: "XRP/USD", volume: 150 },
    { pair: "LTC/USD", volume: 180 },
    { pair: "BCH/USD", volume: 220 },
  ];
  const block = [
    { block: "block123", status: "Activated", height: 5600 },
    { block: "block234", status: "Activated", height: 5890 },
    { block: "block345", status: "Activated", height: 6012 },
    { block: "block456", status: "Activated", height: 6125 },
    { block: "block567", status: "Activated", height: 6321 },
  ];
  const parametr = [
    { parameters: "Parameter1", amount: 100 },
    { parameters: "Parameter2", amount: 250 },
    { parameters: "Parameter3", amount: 500 },
    { parameters: "Parameter4", amount: 750 },
    { parameters: "Parameter5", amount: 1000 },
  ];

  const transactionses: Transaction[] = [
    {
      hash: "0x123456789abcdef1",
      method: "Transfer",
      block: 1234,
      from: "0x9876543210ABCDEF1",
      to: "0xFEDCBA0987654321",
      value: "0.005",
      memo: "Payment for services rendered",
    },
    {
      hash: "0x123456789abcdef2",
      method: "Swap",
      block: 1235,
      from: "0x9876543210ABCDEF2",
      to: "0xFEDCBA0987654322",
      value: "0.01",
      memo: "Exchange transaction",
    },
    {
      hash: "0x123456789abcdef3",
      method: "Transfer",
      block: 1236,
      from: "0x9876543210ABCDEF3",
      to: "0xFEDCBA0987654323",
      value: "0.0025",
      memo: "Test transaction",
    },
    {
      hash: "0x123456789abcdef4",
      method: "Transfer",
      block: 1237,
      from: "0x9876543210ABCDEF4",
      to: "0xFEDCBA0987654324",
      value: "0.003",
      memo: "Transaction memo",
    },
    {
      hash: "0x123456789abcdef5",
      method: "Swap",
      block: 1238,
      from: "0x9876543210ABCDEF5",
      to: "0xFEDCBA0987654325",
      value: "0.015",
      memo: "Swap details",
    },
    {
      hash: "0x123456789abcdef6",
      method: "Transfer",
      block: 1239,
      from: "0x9876543210ABCDEF6",
      to: "0xFEDCBA0987654326",
      value: "0.007",
      memo: "Transaction notes",
    },
    {
      hash: "0x123456789abcdef7",
      method: "Swap",
      block: 1240,
      from: "0x9876543210ABCDEF7",
      to: "0xFEDCBA0987654327",
      value: "0.02",
      memo: "Swap details",
    },
    {
      hash: "0x123456789abcdef8",
      method: "Transfer",
      block: 1241,
      from: "0x9876543210ABCDEF8",
      to: "0xFEDCBA0987654328",
      value: "0.009",
      memo: "Payment memo",
    },
    {
      hash: "0x123456789abcdef9",
      method: "Transfer",
      block: 1242,
      from: "0x9876543210ABCDEF9",
      to: "0xFEDCBA0987654329",
      value: "0.0055",
      memo: "Payment details",
    },
    {
      hash: "0x123456789abcdef10",
      method: "Swap",
      block: 1243,
      from: "0x9876543210ABCDEF10",
      to: "0xFEDCBA09876543210",
      value: "0.025",
      memo: "Swap notes",
    },
  ];

  const PAGE_SIZE = 10;

  const tableHeaders = [
    "",
    "Status",
    "Type",
    "Total POKT",
    "Transaction ID",
    "From",
    "To",
  ];

  return (
    <div className="grow p-6 max-sm:p-4 max-sm:py-4 flex flex-col gap-8">
      <div className="grid grid-cols-2 max-sm:gap-2 gap-4">
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
            <div className="flex flex-col justify-center items-center h-full">
              <div className="w-full h-full">
                {/* @ts-expect-error Async Server Component */}
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
            <div className="w-full h-full">
              {/* @ts-expect-error Async Server Component */}
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
                <DoughnutsChartMakert />
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
                <p className="font-normal">$625,749.35</p>
              </div>
              <div className="flex justify-start flex-col gap-2 items-start w-full">
                <p className="text-black font-semibold text-xl">
                  Expenses Last 30 Days
                </p>
                <p className="font-normal">$213.459.11</p>
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
            <div className="w-full h-full max-h-96 ">
              {/* @ts-expect-error Async Server Component */}
              <GovernancePage data={transactions} />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col p-5 gap-2 bg-white rounded-xl shadow-lg w-full">
        <div className="mt-8 md:mt-0 max-sm:mt-0">
          <div className="flex justify-between flex-row gap-3 max-sm:flex-col items-center">
            <div className="flex justify-start flex-row items-start">
              <p className="mb-4 text-black font-semibold text-xl">
                Latest Transactions
              </p>
            </div>
          </div>
          <div>
            <DataTable headers={tableHeaders}>
              {transactionses.map((txn, index: number) => (
                <tr key={index} className="border-y border-gray-bera">
                  <td className="border-0">
                    <i className="fas fa-angle-right"></i>
                  </td>
                  <td className="border-0">
                    <p className="font-normal uppercase text-base rounded-full text-white bg-green-600 text-center py-0.5 truncate">
                      Success
                    </p>
                  </td>
                  <td className="border-0">DAO Burn</td>
                  <td className="border-0 text-black">
                    {txn.value && txn.value}
                  </td>
                  <td className="border-0 text-black font-bold hover:text-blue_primary">
                    <Link href={`/transaction/${txn.hash}`}>
                      {txn.hash && txn.hash}
                    </Link>
                  </td>
                  <td className="border-0 xl:pr-0 font-bold text-black hover:text-blue_primary">
                    <Link href={`/address/${txn.from}`}>
                      {txn.from && txn.from}
                    </Link>
                  </td>
                  <td className="border-0 font-bold text-black hover:text-blue_primary">
                    <Link href={`/address/${txn.to}`}>{txn.to && txn.to}</Link>
                  </td>
                </tr>
              ))}
            </DataTable>
            <div className="flex mt-4 justify-end">
              <Pagination
                path="/governance"
                currentPage={1}
                size={PAGE_SIZE}
                total={transactionses.length}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
