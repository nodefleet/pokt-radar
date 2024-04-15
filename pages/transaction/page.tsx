import TransactionsChart from "@/components/TransactionsChart";
// import { getTransactions } from "@/utils/txns";
import TableClient from "@/components/TableClient";

export default async function Transactions({
  searchParams,
}: {
  searchParams: { block: string | undefined; page: string | undefined };
}) {
  let filterByBlock =
    (searchParams.block &&
      !isNaN(parseInt(searchParams.block)) &&
      parseInt(searchParams.block)) ||
    undefined;

  const page =
    (searchParams.page &&
      !isNaN(parseInt(searchParams.page)) &&
      parseInt(searchParams.page)) ||
    1;

  const PAGE_SIZE = 10;
  const SKIP = (page >= 1 ? page - 1 : page) * PAGE_SIZE;
  // const { transactions, count: totalTxns } = await getTransactions({
  //   take: PAGE_SIZE,
  //   skip: SKIP,
  //   block: filterByBlock,
  // });

  const currentDate = new Date();
  const weeksArray = Array.from({ length: 10 }, (_, i) => {
    const date = new Date(
      currentDate.getTime() + (i + 1) * 60 * 60 * 1000
    ).toLocaleString("En-en", { timeStyle: "medium" });
    let count;
    if (i === 2) {
      count = 300;
    } else {
      count = i % 2 === 0 ? 100 * i : 300 - 100 * i;
      count = count < 0 ? 0 : count;
    }
    return {
      date: date,
      count: count,
    };
  });

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

        {/* <TableClient
          transactions={transactions}
          PAGE_SIZE={PAGE_SIZE}
          page={page}
          block={filterByBlock}
          totalTxns={totalTxns}
        /> */}
      </div>
    </div>
  );
}
