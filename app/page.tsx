import Image from "next/image";
import moment from "moment";

import SearchBar from "@/components/SearchBar";
import Stats from "@/components/Stats";

import BgHeader from "../public/bg-home.png";

async function getLatestBlocks() {
  return [
    {
      createdAt: "2023-02-28T16:45:46.404Z",
      height: "2",
      reward: "2",
      mined_by: "Massachusetts",
      id: "1",
    },
    {
      createdAt: "2023-02-28T19:46:20.859Z",
      height: "3",
      reward: "3",
      mined_by: "becquerel",
      id: "2",
    },
    {
      createdAt: "2023-02-28T11:10:34.869Z",
      height: "4",
      reward: "7",
      mined_by: "parsing",
      id: "3",
    },
    {
      createdAt: "2023-02-28T19:24:39.750Z",
      height: "5",
      reward: "7",
      mined_by: "Mountain",
      id: "4",
    },
  ];
}

async function getLatestTransactions() {
  return [
    {
      createdAt: "2023-02-28T20:13:08.143Z",
      hash: "cec3410faaae1f5eeb678786d6afbdafdbac77fd",
      time: "2023-02-28T14:33:02.192Z",
      amount: 48623.85,
      id: "1",
    },
    {
      createdAt: "2023-03-01T06:28:54.707Z",
      hash: "3cc6d79aabd8433c36fb04059540ede67a25acf6",
      time: "2022-12-25T12:53:47.620Z",
      amount: 46689.09,
      id: "2",
    },
    {
      createdAt: "2023-03-01T03:13:44.360Z",
      hash: "dac45e54da38686cabcdcdaed6ddc31692b507e6",
      time: "2022-05-30T10:39:46.861Z",
      amount: 93059.35,
      id: "3",
    },
    {
      createdAt: "2023-03-01T11:48:02.464Z",
      hash: "d56d48aa2c8e29f83d6a6a60e689824fccfcc0e6",
      time: "2022-04-06T19:44:31.718Z",
      amount: 4942.83,
      id: "4",
    },
    {
      createdAt: "2023-03-01T04:25:24.961Z",
      hash: "ddca6e60cf5b5ade49bc37b9ec2c930a865af1ae",
      time: "2022-05-22T07:56:39.704Z",
      amount: 11653.72,
      id: "5",
    },
  ];
}

export default async function Home() {
  const latestBlocks = await getLatestBlocks();
  const latestTxns = await getLatestTransactions();

  return (
    <main className="pt-24 flex flex-col">
      <div
        className="h-[418px] w-full absolute top-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, #E9CA9A 0%, #B79973 48.23%, #81634A 99.98%, #987249 99.99%);",
        }}
      ></div>
      <Image
        src={BgHeader}
        className="h-[418px] w-full absolute top-0 -z-10"
        alt="Background lines"
      />
      <h1 className="mb-6 text-dark-brown text-4xl text-center">
        The Honeycomb Explorer
      </h1>
      <SearchBar />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mt-14 mb-9 w-11/12 self-center">
        <Stats />
        <div className="flex flex-col bg-white px-4 py-6 rounded-xl shadow-xl overflow-x-auto">
          <h6 className="ml-3 mb-2 text-xl text-gray-3">Latest Blocks</h6>
          <hr />
          <table className="table w-full mb-5 text-gray-3">
            <thead>
              <tr>
                <th>Height</th>
                <th>Mined by</th>
                <th>Time</th>
                <th>Reward</th>
              </tr>
            </thead>
            <tbody>
              {latestBlocks.map((row, index) => (
                <tr
                  key={index}
                  className="border-y border-gray-bera border-l-4 border-l-transparent hover:bg-transparent-cream hover:border-l-cream"
                >
                  <td className="border-0">{row.height}</td>
                  <td className="border-0">{row.mined_by}</td>
                  <td className="border-0">
                    {moment(row.createdAt).fromNow()}
                  </td>
                  <td className="border-0">{row.reward}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="btn btn-outline mt-auto border-dark-brown text-dark-brown">
            View all blocks
          </button>
        </div>
        <div className="flex flex-col bg-white px-4 py-6 rounded-xl shadow-xl overflow-x-auto">
          <h6 className="ml-3 mb-2 text-xl text-gray-3">Latest Transactions</h6>
          <hr />
          <table className="table w-full mb-5 text-gray-3">
            <thead>
              <tr>
                <th>Tx Hash</th>
                <th>Time</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {latestTxns.map((row, index) => (
                <tr
                  key={index}
                  className="border-y border-gray-bera border-l-4 border-l-transparent hover:bg-transparent-cream hover:border-l-cream"
                >
                  <td className="border-0">{`${row.hash.slice(
                    0,
                    10
                  )}...${row.hash.slice(-10)}`}</td>
                  <td className="border-0">
                    {moment(row.createdAt).fromNow()}
                  </td>
                  <td className="border-0">{row.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="btn btn-outline mt-auto border-dark-brown text-dark-brown">
            View all transactions
          </button>
        </div>
      </div>
    </main>
  );
}
