import { AddressTransactionsDetail } from "@/components/tables";
import { Stake } from "@/utils/interface";
import axios from "axios";

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
    nodes: any;
    account: any;
    transactions: any;
    address: string;
    price: number;
    stake: Stake;
  };
}) {
  const { nodes, account, transactions, address } = data;
  const PAGE_LIMIT = 50;

  return (
    <div className="grow mx-4 md:mx-24 my-6">
      <div className="grid grid-cols-1 max-sm:grid-cols-1 gap-4">
        <div className="flex flex-row max-sm:flex-col gap-4">
          <div className="px-8 py-10 space-y-4 bg-white rounded-xl shadow-xl text-black text-sm">
            <h6 className="font-semibold text-xl">Overview</h6>
            <div className="grid grid-cols-1 sm:grid-cols-3">
              <p className="font-medium">Balance</p>
              <p className="col-span-2">
                {account &&
                  parseFloat(
                    (account.amount / 10 ** 6).toFixed(2)
                  ).toLocaleString()}{" "}
                POKT
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3">
              <p className="font-medium">Pokt Value</p>
              <p className="col-span-2">
                {data &&
                  account &&
                  parseFloat(
                    ((account.amount / 10 ** 6) * data.price).toFixed(2)
                  ).toLocaleString()}{" "}
                (@ ${data.price.toFixed(2)}/POKT)
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3">
              <p className="font-medium">Staked (Non-custodial)</p>
              <p className="col-span-2">
                {parseFloat(
                  (data.stake.total_staked / 10 ** 6).toFixed(2)
                ).toLocaleString()}{" "}
                POKT
              </p>
            </div>
          </div>
          {nodes && (
            <div className="px-8 py-10 space-y-4 bg-white rounded-xl shadow-xl text-black text-sm truncate">
              {/* <h6 className="font-semibold text-xl">Non-custodial Info</h6> */}

              {/* <div className="grid grid-cols-1 sm:grid-cols-3">
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
            </div> */}

              <div className="grid grid-cols-1 sm:grid-cols-3">
                <p className="font-medium text-xl">Node Info</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3">
                <p className="font-medium">Balance</p>
                <p className="col-span-2">
                  {nodes?.balance &&
                    parseFloat(
                      (nodes?.balance / 10 ** 6).toFixed(2)
                    ).toLocaleString()}
                  POKT
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3">
                <p className="font-medium">Jailed</p>
                <p className="col-span-2 truncate">
                  {nodes?.jailed ? "Si" : "No"}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3">
                <p className="font-medium"> Public Key</p>
                <p className="col-span-2 truncate">{nodes?.public_key}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3">
                <p className="font-medium"> Service URL</p>
                <p className="col-span-2 font-bold">{nodes?.service_url}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3">
                <p className="font-medium"> Domain</p>
                <p className="col-span-2 font-bold">{nodes?.service_domain}</p>
              </div>
            </div>
          )}
        </div>

        {/* <div className="mt-8 md:mt-0 p-5 max-sm:mt-0 bg-white rounded-3xl shadow-lg w-full">
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
          <div
            className="w-full h-full max-sm:max-h-36"
            style={{ maxHeight: "37rem" }}
          >
            <TransactionsChart data={weeksArray} tension={0.1} />
          </div>
        </div> */}
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
