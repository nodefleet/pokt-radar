import TableClient from "@/components/TableClient";
import axios from "axios";
import { PointWithTransactionsTotal } from "@/utils/interface";
import { ChartTransaction } from "@/components/charts";

export default function Transactions({
  transactions,
  totalTxns,
  page,
  chartData,
}: {
  transactions: any[];
  totalTxns: any;
  page: number;
  chartData: PointWithTransactionsTotal[];
}) {
  return (
    <div className="grow p-6 max-sm:p-0 max-sm:py-4">
      <div className="flex flex-col p-5 max-sm:pb-2 max-sm:pt-1 gap-7 h-full">
        <div className="mt-8 md:mt-0 p-5 max-sm:mt-0 bg-white rounded-xl shadow-lg w-full">
          <div className="p-4 flex justify-between text-black">
            <div className="flex flex-col gap-3">
              <p className=" font-semibold text-xl">Transactions</p>
            </div>
          </div>
          <div className="w-full h-full max-h-96">
            <ChartTransaction data={chartData} />
          </div>
        </div>
        <TableClient
          transactions={transactions}
          PAGE_SIZE={10}
          page={page}
          totalTxns={totalTxns}
        />
      </div>
    </div>
  );
}

export async function getServerSideProps(context: { query: { page: any } }) {
  const { page } = context.query;

  try {
    const pages = (page && !isNaN(parseInt(page)) && parseInt(page)) || 1;

    const PAGE_SIZE = 10;
    const SKIP = (pages >= 1 ? pages - 1 : pages) * PAGE_SIZE;

    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const response = await axios.get(
      `${apiUrl}/api/transaction` +
        `?PAGE_SIZE=${SKIP === 0 ? PAGE_SIZE : SKIP * 2}`
    );

    return {
      props: {
        transactions:
          SKIP === 0
            ? response.data.transactions
            : response.data.transactions.slice(SKIP - 10, SKIP),
        totalTxns: SKIP === 0 ? PAGE_SIZE * 10 : SKIP * 10,
        page: Number(page),
        chartData: response.data.chartData,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        transactions: [],
        totalTxns: 0,
      },
    };
  }
}
