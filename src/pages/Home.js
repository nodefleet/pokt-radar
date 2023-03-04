import React from "react";
import styled from "styled-components";

import SearchBar from "../components/SearchBar";
import LatestTable from "../components/LatestTable";
import Stats from "../components/Stats";

const Container = styled.div`
  background-color: #f5f5f5;

  * {
    z-index: 2;
  }
  h1 {
    margin: 0;
    position: relative;
  }
`;

const HeaderBg = styled.div`
  z-index: 1;
  position: absolute;
  width: 100%;
  box-sizing: border-box;
  height: 418px;
  top: 0px;
  background: linear-gradient(
    180deg,
    #e9ca9a 0%,
    #b79973 48.23%,
    #81634a 99.98%,
    #987249 99.99%
  );
`;

export default function Home() {
  const blockColumns = {
    height: "height",
    mined_by: "mined by",
    createdAt: "time",
    reward: "reward",
  };

  const txnColumns = {
    hash: "Txn hash",
    createdAt: "time",
    amount: "amount",
  };

  const blocks = [
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
    {
      createdAt: "2023-02-28T10:04:30.048Z",
      height: "8",
      reward: "6",
      mined_by: "withdrawal",
      id: "5",
    },
  ];

  const txns = [
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
  return (
    <Container>
      <HeaderBg></HeaderBg>
      <h1>The Honeycomb Explorer</h1>
      <SearchBar />
      <Stats />
      <div>
        <LatestTable
          title="Latest blocks"
          columns={blockColumns}
          data={blocks}
        />
        <LatestTable
          title="Latest transactions"
          columns={txnColumns}
          data={txns}
        />
      </div>
    </Container>
  );
}
