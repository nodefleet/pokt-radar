import { cache } from "react";

export const getMarket = [
  {
    exchange: "OrangeX",
    platform: "CEX",
    pair: "POKT/USDT",
    price: 0.2637,
    spread: 0.04,
    volume_24h: 5187925,
    volume_percentage: 13.27,
    trust_score: null,
    last_updated: "Recently",
    sponsored: null,
    imageURL:
      "https://th.bing.com/th/id/OIP.wV3DwlQhuq0YkHOeVKWRugHaH_?rs=1&pid=ImgDetMain",
  },
  {
    exchange: "Gate.io",
    platform: "CEX",
    pair: "POKT/USDT",
    price: 0.2585,
    spread: 0.71,
    volume_24h: 15644917,
    volume_percentage: 40.03,
    trust_score: null,
    last_updated: "Recently",
    sponsored: null,
    imageURL: "https://avfxtradinghub.com/wp-content/uploads/2023/05/Gate.png",
  },
  {
    exchange: "Bybit",
    platform: "Bybit",
    pair: "POKT/USDT",
    price: 0.2584,
    spread: 0.67,
    volume_24h: 10603744,
    volume_percentage: 27.13,
    trust_score: null,
    last_updated: "Recently",
    sponsored: null,
    imageURL:
      "https://th.bing.com/th/id/OIP.qAROxwRc_z2wU-u-HRecXwAAAA?rs=1&pid=ImgDetMain",
  },
  {
    exchange: "KuCoin",
    platform: "CEX",
    pair: "POKT/USDT",
    price: 0.2595,
    spread: 0.66,
    volume_24h: 4858740,
    volume_percentage: 12.43,
    trust_score: null,
    last_updated: "Recently",
    sponsored: null,
    imageURL:
      "https://th.bing.com/th/id/OIP.yeiKzByrUXlwjO-NAiIPawHaEK?rs=1&pid=ImgDetMain",
  },
  {
    exchange: "Bitget",
    platform: "CEX",
    pair: "POKT/USDT",
    price: 0.2596,
    spread: 1.51,
    volume_24h: 874005,
    volume_percentage: 2.24,
    trust_score: null,
    last_updated: "Recently",
    sponsored: null,
    imageURL:
      "https://bitcoinist.com/wp-content/uploads/2021/11/photo_2021-11-16_17-34-24.jpg",
  },
  {
    exchange: "CoinEx",
    platform: "CEX",
    pair: "POKT/USDT",
    price: 0.2677,
    spread: 0.7,
    volume_24h: 199662,
    volume_percentage: 0.51,
    trust_score: null,
    last_updated: "Recently",
    sponsored: null,
    imageURL:
      "https://th.bing.com/th/id/OIP.MmfGmzVsLgFx5Ig89u16MQAAAA?rs=1&pid=ImgDetMain",
  },
  {
    exchange: "CoinW",
    platform: "CEX",
    pair: "POKT/USDT",
    price: 0.2594,
    spread: 2.14,
    volume_24h: 319936,
    volume_percentage: 0.82,
    trust_score: null,
    last_updated: "Recently",
    sponsored: null,
    imageURL:
      "https://th.bing.com/th/id/OIP.ozClhMieWr8AWKSJDFcGXAAAAA?rs=1&pid=ImgDetMain",
  },
  {
    exchange: "CoinEx",
    platform: "CEX",
    pair: "POKT/BTC",
    price: 0.2697,
    spread: 1.96,
    volume_24h: 12124.2,
    volume_percentage: 0.03,
    trust_score: null,
    last_updated: "Recently",
    sponsored: null,
    imageURL:
      "https://th.bing.com/th/id/OIP.MmfGmzVsLgFx5Ig89u16MQAAAA?rs=1&pid=ImgDetMain",
  },
  {
    exchange: "BingX",
    platform: "CEX",
    pair: "POKT/USDT",
    price: 0.2592,
    spread: 1.18,
    volume_24h: 1404306,
    volume_percentage: 3.59,
    trust_score: null,
    last_updated: "Recently",
    sponsored: null,
    imageURL:
      "https://th.bing.com/th/id/OIP.mUfLpesGYJ2Dg5H8aJi8WwHaHa?rs=1&pid=ImgDetMain",
  },
  {
    exchange: "MEXC",
    platform: "CEX",
    pair: "POKT/USDT",
    price: 0.2717,
    spread: 0.02,
    volume_24h: 1610072,
    volume_percentage: 4.12,
    trust_score: null,
    last_updated: "Recently",
    sponsored: null,
    imageURL: "https://zexprwire.com/wp-content/uploads/2021/07/image-7.jpeg",
  },
];

export const getPoktPrice = cache(async () => {
  try {
    const response = await fetch(
      "https://pro-api.coingecko.com/api/v3/coins/pocket-network",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-cg-pro-api-key": "CG-U24GaoHMKbX1GmQYZWN1fo91",
        },
      }
    );
    const data = await response.json();
    return { makert: data.tickers };
  } catch (error) {
    console.error(`Error getting POKT price: ${error}`);
    return null;
  }
});
