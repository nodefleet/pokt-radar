import { Transaction } from "@/app/transaction/page";
import AddressTransactions from "@/components/AddressTransactions";
import TransactionsChart from "@/components/TransactionsChart";

export default async function Address({
  params: { hash: address },
}: {
  params: { hash: string };
}) {
  // const accountData = getAccount(address);
  // const transactionsData = await getTransactionsByAddress(address);

  // // const [account, transactions] = await Promise.all([
  // //   accountData,
  // //   transactionsData,
  // // ]);

  const transactions: Transaction[] = [
    {
      hash: "0x123456789abcdef1",
      method: "Transfer",
      block: 1234,
      from: "0x9876543210ABCDEF1",
      to: "0xFEDCBA0987654321",
      value: "0.005 ETH",
      memo: "Payment for services rendered",
    },
    {
      hash: "0x123456789abcdef2",
      method: "Swap",
      block: 1235,
      from: "0x9876543210ABCDEF2",
      to: "0xFEDCBA0987654322",
      value: "0.01 ETH",
      memo: "Exchange transaction",
    },
    {
      hash: "0x123456789abcdef3",
      method: "Transfer",
      block: 1236,
      from: "0x9876543210ABCDEF3",
      to: "0xFEDCBA0987654323",
      value: "0.0025 ETH",
      memo: "Test transaction",
    },
    {
      hash: "0x123456789abcdef4",
      method: "Transfer",
      block: 1237,
      from: "0x9876543210ABCDEF4",
      to: "0xFEDCBA0987654324",
      value: "0.003 ETH",
      memo: "Transaction memo",
    },
    {
      hash: "0x123456789abcdef5",
      method: "Swap",
      block: 1238,
      from: "0x9876543210ABCDEF5",
      to: "0xFEDCBA0987654325",
      value: "0.015 ETH",
      memo: "Swap details",
    },
    {
      hash: "0x123456789abcdef6",
      method: "Transfer",
      block: 1239,
      from: "0x9876543210ABCDEF6",
      to: "0xFEDCBA0987654326",
      value: "0.007 ETH",
      memo: "Transaction notes",
    },
    {
      hash: "0x123456789abcdef7",
      method: "Swap",
      block: 1240,
      from: "0x9876543210ABCDEF7",
      to: "0xFEDCBA0987654327",
      value: "0.02 ETH",
      memo: "Swap details",
    },
    {
      hash: "0x123456789abcdef8",
      method: "Transfer",
      block: 1241,
      from: "0x9876543210ABCDEF8",
      to: "0xFEDCBA0987654328",
      value: "0.009 ETH",
      memo: "Payment memo",
    },
    {
      hash: "0x123456789abcdef9",
      method: "Transfer",
      block: 1242,
      from: "0x9876543210ABCDEF9",
      to: "0xFEDCBA0987654329",
      value: "0.0055 ETH",
      memo: "Payment details",
    },
    {
      hash: "0x123456789abcdef10",
      method: "Swap",
      block: 1243,
      from: "0x9876543210ABCDEF10",
      to: "0xFEDCBA09876543210",
      value: "0.025 ETH",
      memo: "Swap notes",
    },
  ];
  const weeksArray = Array.from({ length: 10 }, (_, i) => ({
    date: `week ${(i + 1).toString().padStart(2, "0")}`,
    count: i === 5 ? 300 : 100 * i,
  }));

  return (
    <div className="grow mx-4 md:mx-24 my-6">
      <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-4">
        <div className="flex flex-col gap-4">
          <div className="px-8 py-10 space-y-4 bg-white rounded-xl shadow-xl text-black text-sm">
            <h6 className="font-semibold text-xl">Overview</h6>
            <div className="grid grid-cols-1 sm:grid-cols-3">
              <p className="font-medium">Balance</p>
              <p className="col-span-2">0.626038472049 HONEY</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3">
              <p className="font-medium">Pokt Value</p>
              <p className="col-span-2">761,106.39 USD (@ $0.21/POKT)</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3">
              <p className="font-medium">Staked (Non-custodial)</p>
              <p className="col-span-2">1,234,123.67 POKT</p>
            </div>
          </div>

          <div className="px-8 py-10 space-y-4 bg-white rounded-xl shadow-xl text-black text-sm">
            <h6 className="font-semibold text-xl">Non-custodial Info</h6>

            <div className="grid grid-cols-1 sm:grid-cols-3">
              <p className="font-medium">Total Nodes</p>
              <div className="col-span-2">
                <div className="bg-white grid grid-cols-4 font-medium rounded-full p-2 divide-x-2 text-center gap-4 rounded-ful border border-neutral-300 w-full">
                  <div>15K</div>
                  <div>30K</div>
                  <div>45K</div>
                  <div>60K</div>
                </div>
                <div className="grid grid-cols-4 pt-1 text-xs text-center gap-4 w-full">
                  <div>0</div>
                  <div>2</div>
                  <div>0</div>
                  <div>190</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3">
              <p className="font-medium">Avg POKT Production</p>
              <div className="col-span-2">
                <div className="bg-white grid grid-cols-3 font-medium rounded-full p-2 divide-x-2 text-center gap-4 rounded-ful border border-neutral-300 w-full">
                  <div>Daily</div>
                  <div>Weekly</div>
                  <div>Monthly</div>
                </div>
                <div className="grid grid-cols-3 font-semibold pt-1 text-xs text-center gap-4 w-full">
                  <div>7.03 POKT</div>
                  <div>49.21 POKT</div>
                  <div>196.84 POKT</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3">
              <p className="font-medium text-xl">Node Info</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3">
              <p className="font-medium">Balance</p>
              <p className="col-span-2">45,010.00 POKT</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3">
              <p className="font-medium">Jailed</p>
              <p className="col-span-2">45,010.00 POKT</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3">
              <p className="font-medium"> Public Key</p>
              <p className="col-span-2">45,010.00 POKT</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3">
              <p className="font-medium"> Service URL</p>
              <p className="col-span-2 font-bold">nodefleet.org</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3">
              <p className="font-medium"> Domain</p>
              <p className="col-span-2 font-bold">nodefleet.org</p>
            </div>
          </div>
        </div>

        <div className="mt-8 md:mt-0 p-5 max-sm:mt-0 bg-white rounded-3xl shadow-lg w-full">
          <div className="p-4 flex justify-between text-black">
            <p className=" font-semibold text-xl">Performance</p>
            <div className="flex justify-between gap-3 max-sm:flex-col">
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
              <div className="relative w-28 bg-blue_primary py-3 px-4 flex justify-center items-center text-white cursor-pointer rounded-full">
                Edit
              </div>
            </div>
          </div>
          <div className="w-full h-full max-h-96">
            <TransactionsChart data={weeksArray} />
          </div>
        </div>
      </div>
      <div className="mt-3 ">
        <div className="flex text-black font-semibold">
          <a className="px-4 py-1 bg-white rounded-t-xl ">Transactions</a>
        </div>
        <div className="bg-white px-5 py-4 rounded-r-xl rounded-bl-xl shadow-lg overflow-x-auto">
          <AddressTransactions transactions={transactions} />
        </div>
      </div>
    </div>
  );
}
