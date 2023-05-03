import QRCode from "react-qr-code";
import {
  DocumentDuplicateIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import SearchBar from "@/components/SearchBar";
import AddressTransactions from "@/components/AddressTransactions";
import { getTransactionsByAddress } from "@/utils/txns";

export default async function Address({
  params: { hash: address },
}: {
  params: { hash: string };
}) {
  const transactions = await getTransactionsByAddress(address);
  const serializedTxns = transactions.map((txn) => ({
    hash: txn.hash,
    to: txn.to,
    from: txn.from,
    time: txn.timestamp?.toISOString(),
    block_height: txn.block_height.toString(),
    gas: txn.gas.toString(),
  }));

  return (
    <div className="grow mx-4 md:mx-6 lg:mx-24 mb-14">
      <div className="flex flex-col items-start my-5 lg:flex-row lg:items-center lg:justify-between lg:my-10">
        <h1 className="mb-3 lg:mb-0 text-gray-3 text-2xl">Account</h1>
        <SearchBar />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-y-4 md:gap-4">
        <div className="col-span-3 px-8 py-10 space-y-7 bg-white rounded-xl shadow-xl text-gray-4 text-sm">
          <h6 className="font-semibold text-base">Overview</h6>
          <div className="grid grid-cols-1 sm:grid-cols-3">
            <p>Balance</p>
            <p className="col-span-2">0.626038472049 HONEY</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3">
            <p>Value</p>
            <p className="col-span-2">844.76 ( @ 1,173.84 / HONEY)</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3">
            <p>Token</p>
            <div className="dropdown col-span-2">
              <div
                className="flex justify-between w-1/2 border rounded border-gray-4 py-1 px-2"
                tabIndex={0}
              >
                <p className=" ">$53,786.17</p>
                <ChevronDownIcon className="w-5 h-5" />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow-xl bg-white rounded-box w-1/2"
              >
                <li>
                  <a>Item 1</a>
                </li>
                <li>
                  <a>Item 2</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-span-2 flex flex-col px-5 pt-3 pb-5 bg-white rounded-xl shadow-xl">
          <div className="w-full max-w-[145px] h-auto mb-3">
            <QRCode
              size={256}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              value={address}
              viewBox={`0 0 256 256`}
            />
          </div>
          <p className="text-gray-4 text-base font-semibold">Address:</p>
          <div className="flex items-center mt-2">
            <p className=" text-gray-4 text-sm">{address}</p>
            <DocumentDuplicateIcon className="w-4 h-4 ml-4 cursor-pointer" />
          </div>
        </div>
      </div>
      <div className="mt-3 ">
        <div className="flex text-gray-3 font-semibold">
          <a className="px-4 py-1 bg-white rounded-t-xl ">Transactions</a>
        </div>
        <div className="bg-white px-5 py-4 rounded-r-xl rounded-bl-xl shadow-lg overflow-x-auto">
          <AddressTransactions transactions={serializedTxns} />
        </div>
      </div>
    </div>
  );
}
