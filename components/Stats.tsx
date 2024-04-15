import Image from "next/image";
import BeraIcon from "../public/img/poker_logo.png";

import FromNow from "./FromNow";

export default function Stats({
  lastBlock,
  price,
  market,
}: {
  lastBlock: {
    height: number;
    time: string;
    total_apps: number;
    supported_block_chains: { length: number };
  };
  price: number;
  market: {
    market_cap: { usd: number };
    total_supply: number;
    circulating_supply: number;
  };
}) {
  return (
    <div className="flex flex-col p-5 gap-2 bg-white rounded-xl shadow-lg col-span-2">
      <div className="flex flex-col gap-8">
        <div className="flex items-center">
          <Image src={BeraIcon} alt="Pocket icon" />
          <div className="ml-7  max-sm:ml-4">
            <p className="text-black text-3xl max-sm:text-2xl font-semibold">
              POCKET NETWORK{" "}
              <span className="text-white bg-neutral-300 font-medium text-xl max-sm:hidden rounded-full py-1 px-5 ml-4 relative -top-0.5">
                POKT
              </span>
            </p>
            <p className="text-xl text-black font-normal">
              {"$" + price.toFixed(4)} USD
            </p>
          </div>
        </div>
        <div className="flex items-center max-sm:items-start max-sm:flex-col gap-4">
          <div className="ml-7 flex flex-row max-sm:flex-col max-sm:ml-4">
            <p className="text-black text-xl font-normal">Block Height</p>
            <p className="font-bold text-xl rounded-full ml-5 max-sm:ml-0">
              {lastBlock && lastBlock.height !== null
                ? lastBlock.height.toString()
                : ""}
              <span className="font-medium text-base rounded-full ml-5 max-sm:ml-3 text-gray-400 outline-1 outline-double outline-gray-400 text-center py-0.5 px-6">
                Last 10s
              </span>
            </p>
          </div>

          <div className="ml-7 flex flex-row max-sm:flex-col max-sm:ml-4">
            <p className="text-black text-xl font-normal">Avg Block Time</p>
            <p className="font-medium text-xl rounded-full ml-5 max-sm:ml-0">
              <FromNow datetime={lastBlock.time} />
              <span className="font-medium text-base rounded-full ml-5 max-sm:ml-3 text-gray-400 outline-1 outline-double outline-gray-400 text-center py-0.5 px-6">
                Last 24h
              </span>
            </p>
          </div>
        </div>
        <hr className="border-gray-bera w-12/12 mx-4 justify-self-center" />

        <div className="grid grid-cols-4 max-sm:grid-cols-1 w-full gap-4 ml-7 max-sm:ml-4">
          <div>
            <p className="text-black text-xl font-medium leading-10">
              Total Servicers
            </p>
            <p className="font-normal text-xl">712,323</p>
          </div>

          <div>
            <p className="text-black text-xl font-medium leading-10">
              Total Validators
            </p>
            <p className="font-normal text-xl">12,467</p>
          </div>

          <div>
            <p className="text-black text-xl font-medium leading-10">
              Total DApps
            </p>
            <p className="font-normal text-xl">{lastBlock.total_apps}</p>
          </div>

          <div>
            <p className="text-black text-xl font-medium leading-10">
              Total Active Chains
            </p>
            <p className="font-normal text-xl">
              {lastBlock.supported_block_chains.length}
            </p>
          </div>
        </div>
        <hr className="border-gray-bera w-12/12 mx-4 justify-self-center" />
        <h4 className="text-black text-xl ml-7 max-sm:ml-4 font-bold">
          Market Overview
        </h4>
        <div className="grid grid-cols-4 max-sm:grid-cols-1 w-full gap-4 max-sm:ml-4 ml-7 mb-4">
          <div>
            <p className="text-black text-xl font-medium leading-10">
              Market Cap
            </p>
            <p className="font-normal text-xl">
              {market.market_cap.usd.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}{" "}
              USD
            </p>
          </div>

          <div>
            <p className="text-black text-xl font-medium leading-10">
              $POKT Supply
            </p>
            <p className="font-normal text-xl">
              {market.total_supply.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{" "}
              POKT
            </p>
          </div>

          <div>
            <p className="text-black text-xl font-medium leading-10">
              Total Staked $POKT
            </p>
            <p className="font-normal text-xl">293,424,135.24 POKT</p>
          </div>

          <div>
            <p className="text-black text-xl font-medium leading-10">
              Total Circulating $POKT
            </p>
            <p className="font-normal text-xl">
              {market.circulating_supply.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{" "}
              POKT
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
