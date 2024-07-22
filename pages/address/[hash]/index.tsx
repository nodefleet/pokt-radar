import InputSearch from "@/components/InputSearch";
import { AddressTransactionsDetail } from "@/components/tables";
import { Stake } from "@/utils/interface";
import { ClipboardDocumentCheckIcon } from "@heroicons/react/24/outline";
import { transactions } from "@prisma/client";
import axios from "axios";
import QRCode from "react-qr-code";

export default function Address({
  PAGE_SIZE,
  SKIP,
  page,
  data,
}: {
  PAGE_SIZE: number;
  SKIP: number;
  page: number;
  data: {
    balance: string;
    price: number;
    transactions: transactions[];
    address: string;
  };
}) {
  const { balance, transactions, address } = data;
  const PAGE_LIMIT = 50;

  return (
    <div className="grow mx-4 md:mx-24 my-6">
      <div className="grid grid-cols-1 max-sm:grid-cols-1 gap-4">
        <div className="flex max-sm:flex-col max-sm:gap-4 justify-between items-center w-full">
          <p className="uppercase text-xl pl-4">Account</p>
          <div className="w-6/12 max-sm:w-10/12 relative z-10">
            <InputSearch
              name="search"
              search={true}
              placeholder="Search by Address, Txn Hash, Block Height..."
            />
          </div>
        </div>
        <div className="flex flex-row max-sm:flex-col gap-4">
          <div className="px-8 py-10 space-y-8 bg-white rounded-xl shadow-xl text-black text-sm w-full">
            <h6 className="font-semibold text-xl">Overview</h6>
            <div className="grid grid-cols-1 sm:grid-cols-3">
              <p className="font-medium">Balance</p>
              <p className="col-span-2">
                {balance && (Number(balance) / 10 ** 18).toLocaleString()} ETH
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3">
              <p className="font-medium">USD Value</p>
              <p className="col-span-2">
                {data &&
                  balance &&
                  parseFloat(
                    ((Number(balance) / 10 ** 18) * data.price).toFixed(2)
                  ).toLocaleString()}{" "}
                USD
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3">
              <p className="font-medium">Token</p>
              <p className="col-span-2 ml-1">
                {Number(balance).toLocaleString()}{" "}
              </p>
            </div>
          </div>
          <div className="px-8 py-6 space-y-6 bg-white rounded-xl shadow-xl text-black text-sm w-full">
            <div className="h-32 w-32">
              <QRCode value={address} className="h-full w-full" />
            </div>
            <div className="flex flex-col gap-4">
              <p className="font-medium text-xl">Address:</p>
              <div className="flex gap-2">
                <p className="col-span-2 text-md">{address && address}</p>
                <ClipboardDocumentCheckIcon className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-3 ">
        <div className="flex text-black font-semibold">
          <a className="px-4 py-1 bg-white rounded-t-xl ">Transactions</a>
        </div>
        <div className="bg-white px-5 py-4 rounded-r-xl rounded-bl-xl shadow-lg overflow-x-auto">
          <AddressTransactionsDetail
            path={`/address/${address}`}
            data={[...transactions].slice(SKIP - 10, SKIP)}
            PAGE_SIZE={PAGE_SIZE}
            page={Number(page)}
            address={{ address: address }}
            txtrow={PAGE_LIMIT}
          />
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: {
  params: { hash: string };
  query: { page: string };
}) {
  const { page } = context.query;
  const { hash } = context.params;

  try {
    const pages = (page && !isNaN(parseInt(page)) && parseInt(page)) || 1;

    const PAGE_SIZE = 10;
    const SKIP = pages * PAGE_SIZE;

    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const response = await axios.get(
      `${apiUrl}/api/address?address=${hash}&SKIP=${SKIP}`
    );
    return {
      props: {
        data: { ...response.data, address: hash },
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
