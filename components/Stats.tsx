/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import BeraIcon from "../public/img/poker_logo.png";

import FromNow from "./FromNow";
import { Producer, Stakin } from "../utils/interface";
import Stadist from "./Stadist";

export default function Stats({
  dataChart,
}: {
  dataChart: { date: string; count: number }[];
}) {
  return (
    <div className="flex flex-row max-sm:flex-col justify-between p-8 gap-2 bg-white rounded-xl shadow-lg col-span-2">
      <div className="w-full">
        <div className="grid grid-cols-2 max-sm:grid-cols-1 w-full gap-16 max-sm:gap-4 ml-7 max-sm:ml-4">
          <div className="flex justify-start items-center gap-6">
            <img src="/icons/web.svg" alt="web" />
            <div className="flex flex-col gap-2">
              <p className="text-black text-lg leading-10">Price</p>
              <p className="font-normal text-xl">
                {(10000).toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}{" "}
                USD
                <b className="ml-3 text-green-600 font-normal">0.39%</b>
              </p>
            </div>
          </div>

          <div className="flex justify-start items-center gap-6">
            <img src="/icons/box.svg" alt="web" />
            <div className="flex flex-col gap-2">
              <p className="text-black text-lg leading-10"> Height</p>
              <p className="font-normal text-xl">
                {" "}
                {(10000).toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}{" "}
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-between w-full gap-10 py-4 max-sm:py-2  max-sm:invisible">
          <hr className="border-gray-bera w-full ml-10 justify-self-center" />
          <hr className="border-gray-bera w-full mx-4 justify-self-center" />
        </div>

        <div className="grid grid-cols-2 max-sm:grid-cols-1 w-full gap-16 max-sm:gap-4  max-sm:ml-4 ml-7 mb-4">
          <div className="flex justify-start items-center gap-6">
            <img src="/icons/web.svg" alt="web" />
            <div className="flex flex-col gap-2">
              <p className="text-black text-lg leading-10"> Market Cap</p>
              <p className="font-normal text-xl">
                {(10000).toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}{" "}
              </p>
            </div>
          </div>

          <div className="flex justify-start items-center gap-6">
            <img src="/icons/fac.svg" alt="web" />
            <div className="flex flex-col gap-2">
              <p className="text-black text-lg leading-10"> Transactions</p>
              <p className="font-normal text-xl">
                {(10000).toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Stadist dataChart={dataChart} />
    </div>
  );
}
