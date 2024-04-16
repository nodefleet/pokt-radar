import TransactionsChart from "@/components/TransactionsChart";
import TableClient from "@/components/TableClient";
import axios from "axios";

export default function Transactions({
  transactions,
  totalTxns,
  page,
}: {
  transactions: any[];
  totalTxns: any;
  page: number;
}) {
  return (
    <div className="grow p-6 max-sm:p-0 max-sm:py-4">
      <div className="flex flex-col p-5 max-sm:pb-2 max-sm:pt-1 gap-7 h-full">
        {/* <div className="mt-8 md:mt-0 p-5 max-sm:mt-0 bg-white rounded-xl shadow-lg w-full">
          <div className="p-4 flex justify-between text-black">
            <div className="flex flex-col gap-3">
              <p className=" font-semibold text-xl">Transactions</p>
              <p className="font-medium text-lg">Avg Transactions</p>
              <span className="font-normal">68,002.01 M</span>
            </div>
            <div className="relative w-28">
              <label className="absolute right-2 top-3 translate-y-0.5 cursor-pointer">
                <i className="fa-solid fa-angle-down"></i>
              </label>
              <select
                className="border border-black py-3 text-base px-4 outline-none rounded-full appearance-none w-full cursor-pointer relative z-10 bg-transparent"
                id="selectMo"
              >
                <option value={1}>Last 24H</option>
                <option value={2}>Monthly</option>
              </select>
            </div>
          </div>
          <div className="w-full h-full max-h-96">
            <TransactionsChart data={weeksArray} />
          </div>
        </div> */}
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

    const response = await axios.get(
      "http://localhost:3000/api/transaction" +
        `?PAGE_SIZE=${PAGE_SIZE}&SKIP=${SKIP}`
    );

    return {
      props: {
        transactions: response.data.transactions,
        totalTxns: response.data.count,
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
