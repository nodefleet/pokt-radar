import TableClient from "@/components/TableClient";
import axios from "axios";
import { PointWithTransactionsTotal } from "@/utils/interface";
import { ChartTransaction } from "@/components/charts";
import InputSearch from "@/components/InputSearch";
import { transactions } from "@prisma/client";

export default function Transactions({
  transactions,
  totalTxns,
  page,
}: {
  transactions: transactions[];
  totalTxns: number;
  page: number;
}) {
  return (
    <div className="grow p-6 max-sm:p-0 max-sm:py-4">
      <div className="flex max-sm:flex-col max-sm:gap-4 justify-between items-center w-full">
        <p className="uppercase text-xl pl-4">TRANSACTIONS</p>
        <div className="w-6/12 max-sm:w-10/12 relative z-10">
          <InputSearch
            name="search"
            placeholder="Search by Address, Txn Hash, Block Height..."
          />
        </div>
      </div>
      <div className="flex flex-col p-5 max-sm:pb-2 max-sm:pt-1 gap-7 h-full">
        <TableClient
          transactions={transactions}
          PAGE_SIZE={25}
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

    const PAGE_SIZE = 25;
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
            : response.data.transactions.slice(SKIP - 25, SKIP),
        totalTxns: SKIP === 0 ? PAGE_SIZE * 10 : SKIP * 10,
        page: Number(page),
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
