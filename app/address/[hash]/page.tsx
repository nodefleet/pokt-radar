import QRCode from "react-qr-code";
import {
  DocumentDuplicateIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import SearchBar from "@/components/SearchBar";
import AddressTransactions from "@/components/AddressTransactions";
import { getTransactionsByAddress } from "@/utils/txns";
import { getAccount } from "@/utils/accounts";
import TransactionsChart from "@/components/TransactionsChart";

export default async function Address({
  params: { hash: address },
}: {
  params: { hash: string };
}) {
  const accountData = getAccount(address);
  const transactionsData = await getTransactionsByAddress(address);

  const [account, transactions] = await Promise.all([
    accountData,
    transactionsData,
  ]);
  const serializedTxns = transactions.map((txn) => ({
    hash: txn.hash || "",
    to: txn.to_address || "",
    from: txn.from_address || "",
    time: "",
    block_height: txn.height?.toString() || "",
    gas: "",
  }));
  const weeksArray = Array.from({ length: 10 }, (_, i) => ({
    date: `week ${(i + 1).toString().padStart(2, "0")}`,
    count: i === 5 ? 300 : 100 * i,
  }));

  return (
    <div className="grow p-6 max-sm:p-0 max-sm:py-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-4">
          <div className="px-8 py-10 space-y-7 bg-white rounded-xl shadow-xl text-black text-sm">
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

          <div className="px-8 py-10 space-y-7 bg-white rounded-xl shadow-xl text-black text-sm">
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
                <div className="grid grid-cols-4 pt-1 text-center gap-4 w-full">
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
                <div className="grid grid-cols-3 font-semibold pt-1 text-center gap-4 w-full">
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
              <p className="col-span-2">nodefleet.org</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3">
              <p className="font-medium"> Domain</p>
              <p className="col-span-2">nodefleet.org</p>
            </div>
          </div>
        </div>

        <div className="mt-8 md:mt-0 p-5 max-sm:mt-0 bg-white rounded-3xl shadow-lg w-full">
          <div className="p-4 flex justify-between text-black">
            <p className=" font-semibold text-xl">Performance</p>
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
        </div>
      </div>
      <div className="mt-3 ">
        <div className="flex text-black font-semibold">
          <a className="px-4 py-1 bg-white rounded-t-xl ">Transactions</a>
        </div>
        <div className="bg-white px-5 py-4 rounded-r-xl rounded-bl-xl shadow-lg overflow-x-auto">
          <AddressTransactions transactions={serializedTxns} />
        </div>
      </div>
    </div>
  );
}
