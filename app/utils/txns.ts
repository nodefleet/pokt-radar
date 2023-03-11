import "server-only";
import { cache } from "react";

export const getTransactions = cache(async () => {
  return [
    {
      createdAt: "2023-03-09T18:13:52.499Z",
      hash: "8cfaafbde31fb13d09e6ed61b3fa8a7ffedbdeaf",
      amount: 12110.99,
      from: "0x5c00be38c290dede5cd5d8acabc0acdf92f2e5fa",
      to: "0x9ec855a7cbcb175bcab81bbcf1a502aaac0d944a",
      block: 31,
      id: "1",
    },
    {
      createdAt: "2023-03-08T20:48:49.294Z",
      hash: "8c86ef0ec79ef33fa985fbcbe79d83cbfe53b3b2",
      amount: 68951.89,
      from: "0xf22de8ab589d59f1daeb8dcc6a2c37ee5df5421b",
      to: "0x80d4cc27eabecd549ecf3afebaf3bab3e5e9da0f",
      block: 86,
      id: "2",
    },
    {
      createdAt: "2023-03-09T17:22:54.434Z",
      hash: "ebdcaffaea6edd1a3cedc28134ad7f2eaeeda468",
      amount: 89476.11,
      from: "0xa36aaecd9eddc0aa0eaacfbeebb4c977e7e6547a",
      to: "0xcb7d40f242add7abaeb3bd348654a95100f9c750",
      block: 0,
      id: "3",
    },
    {
      createdAt: "2023-03-09T16:39:31.369Z",
      hash: "2ea35f0f7b5f589da37dbaa82294ec6cf7dd11ad",
      amount: 58534.09,
      from: "0x6d9bd1e3b42cbae2f175a577df70d4f40eea1eb1",
      to: "0x1fe0ceedde9f6e2f28e060cf438db45cdf87a898",
      block: 88,
      id: "4",
    },
    {
      createdAt: "2023-03-08T22:48:23.996Z",
      hash: "fa9020e4dd0c27617919cbfa96c7075cc798aa38",
      amount: 37176.99,
      from: "0xcd276c0381ca2bcd9edd1fd3ff009ff5f6d6ea81",
      to: "0xeffd08a26c2a24fa1e048b32dbf83adaa3ff4516",
      block: 47,
      id: "5",
    },
    {
      createdAt: "2023-03-09T06:49:49.548Z",
      hash: "89fa3abcc63ecacac1234d729598e0c7671de559",
      amount: 22084.14,
      from: "0x07e75ba51f3b40ebecb20c5f5aeaa54ae2eabd7a",
      to: "0x6efce0adf1e6ce3b5e8e57dbcdefdbf6b9b69deb",
      block: 23,
      id: "6",
    },
    {
      createdAt: "2023-03-09T06:23:10.614Z",
      hash: "d06cd5e49b6eb34eedebdee4e9fe2dc66305058b",
      amount: 54161.76,
      from: "0xd0db256fe86f61bf9fedaf83ba0689a58aaacdcf",
      to: "0x74e90adfcfa91fccfeafb7019f4f5df00318b97f",
      block: 13,
      id: "7",
    },
    {
      createdAt: "2023-03-09T15:15:51.338Z",
      hash: "41fe0d2d78ec4efc93dcdd88994fafdafbefa4ef",
      amount: 99100.92,
      from: "0x5a1ca93ceb5b4a4defddaed2cce728f5bcdc239d",
      to: "0x7b0ceed477865fd0d97eac75cdc50c0161fddd3c",
      block: 78,
      id: "8",
    },
    {
      createdAt: "2023-03-09T14:44:50.467Z",
      hash: "c26c45af8bf4dcd153422a5db2eefb12acc4abcd",
      amount: 91095.31,
      from: "0x71e2a7dc0cdcf0997edf9c5958ef254b476fcac3",
      to: "0xf1af9282b4fabb0a69a147161f2d30eabc83ad02",
      block: 9,
      id: "9",
    },
    {
      createdAt: "2023-03-09T04:07:20.287Z",
      hash: "e3f65c0d173eafa7cbbfab6e63ccea068a70d0ba",
      amount: 31409.37,
      from: "0xf74fd5c9fcaad8d3a9c334b7bf35053237da64f4",
      to: "0xdd56b08ff1507a242adcfabce6c784d58db8a66c",
      block: 66,
      id: "10",
    },
    {
      createdAt: "2023-03-09T06:20:42.550Z",
      hash: "5261e12b03612eca9ef15b27a3ee6f1119367769",
      amount: 90396.97,
      from: "0xf9b82fc3ac00b69ba0ae6efb746b1aaeaacd2fa7",
      to: "0xa924df9642c1bcdac1ed54bba906a775cb4accf4",
      block: 71,
      id: "11",
    },
    {
      createdAt: "2023-03-08T23:52:56.487Z",
      hash: "d1a3eae9c25d5eaad3ddb42364c1bc2b34dafba5",
      amount: 13882.57,
      from: "0xfeafa40a2bf5032a8a436cd872c065d0206ea5e0",
      to: "0x002da6fb2e1ac0ffa39df0d730ce76e3822bb8af",
      block: 30,
      id: "12",
    },
    {
      createdAt: "2023-03-08T20:23:38.057Z",
      hash: "b917bcd9de92bbaec4a0c0cdf1e22079aa3fd71a",
      amount: 63554.6,
      from: "0x0e92ea5d5bddaadf210eedbd0299c60eebfff130",
      to: "0xe9c52e34415186c4314b0b76fd9089a7802dea08",
      block: 24,
      id: "13",
    },
    {
      createdAt: "2023-03-09T01:14:19.975Z",
      hash: "48dd0aacf35acf330f9b6f5b1eafb1ffb0e6b54a",
      amount: 75302.14,
      from: "0x529d21fa7d2c5cdbc5a1ceb9d1dc079d96b99e8e",
      to: "0x92b678bcfddea0c6e3701a5656bfa805aa3fc6ef",
      block: 32,
      id: "14",
    },
    {
      createdAt: "2023-03-09T04:13:36.640Z",
      hash: "c9b74d7cfcca85aa4191dc6373ee0d62aa0da070",
      amount: 73739.04,
      from: "0x931bc01cee2b71acbc0a4b49b35c92cad3a0b6ff",
      to: "0xb14eb9af6493f6fe4c7c4da3cc2ffdc19aa1a8c6",
      block: 69,
      id: "15",
    },
    {
      createdAt: "2023-03-09T09:35:46.864Z",
      hash: "a62cdb0d5befb4daa0f63c2d4eda9d13c038edad",
      amount: 45746.07,
      from: "0x365cd32f14d421bfa6c68da3b61bf0af5aade784",
      to: "0x1d70ff27cae39d44c114980cdf3bbab041dfcfac",
      block: 76,
      id: "16",
    },
    {
      createdAt: "2023-03-08T20:59:18.368Z",
      hash: "68af7a3fbc5a3c8d62afa2095da9c04f8e7155cf",
      amount: 78521.59,
      from: "0x71bcec960e81cea0cd223ddbefa87ae59beb8b4c",
      to: "0x9bc2ee676ac45ebb5cfcdeeffc06f6ba96c81dbf",
      block: 18,
      id: "17",
    },
    {
      createdAt: "2023-03-09T17:28:02.071Z",
      hash: "2cdd5bc4ebd27d1cb851bbf6db111e8a4f8f34ee",
      amount: 25695.46,
      from: "0xbdb4bdeee99bc93430bedeaad329ee4d6f00bcc3",
      to: "0xedccd5eb5d992cd392fbe219fcd034d35605b3b7",
      block: 15,
      id: "18",
    },
    {
      createdAt: "2023-03-09T12:59:13.204Z",
      hash: "8dbd894dfb644f096b22f1affaa9eacd65ffd88a",
      amount: 39657.16,
      from: "0x0ba51e0e14c4cd90bae66bb40cc808ecd09eef48",
      to: "0xa4e04861d7afbcf0def1cabdabb4a84c9ef8abff",
      block: 1,
      id: "19",
    },
    {
      createdAt: "2023-03-08T21:10:13.437Z",
      hash: "8daaed00c0fdf4bf376aabbfcdc2844ddbd4e3bb",
      amount: 63316.94,
      from: "0xdfa7a63fecaedbc1d2a85fa4dd8063e273ac5100",
      to: "0xdcbb98c75fb9258297cb2f3edc5d4deb9e488d7b",
      block: 90,
      id: "20",
    },
    {
      createdAt: "2023-03-09T10:47:07.068Z",
      hash: "103876fafb2fbdfc75c7c5dee1caaf1dd21dc96d",
      amount: 32445.31,
      from: "0xf2110db1cfcd9d843fde32babe17d5befee7b254",
      to: "0xd1e5014dcc82e427ffd22ca93b29cfdd371fa94b",
      block: 16,
      id: "21",
    },
    {
      createdAt: "2023-03-09T18:40:54.678Z",
      hash: "a2cc47ce758e41bffce32008398f9e050e9affff",
      amount: 44784.57,
      from: "0x6199b73bc4ffbcdbf1b01b186ebcae38bcb637a6",
      to: "0x98be4bb0ca97fd8fce9ec9a579eb16b523e4cd1c",
      block: 65,
      id: "22",
    },
    {
      createdAt: "2023-03-09T03:12:03.936Z",
      hash: "9bee25e61af70c5eceeea0e7f523cbdc2edfc8ee",
      amount: 2031.06,
      from: "0x63204c14f2faadb7df8fe8ac15658a1bbaa202c1",
      to: "0xfcd64ddddbd43e19af5b9e6c6ddce00c0b0a79ec",
      block: 20,
      id: "23",
    },
    {
      createdAt: "2023-03-09T06:53:27.269Z",
      hash: "478e9231f383b3f6afbdbf0cbb11a4cb285ac934",
      amount: 25546.03,
      from: "0x3c9d3f1b1e6dd7eb95fefde1ea7ee7aaebccee07",
      to: "0x7dffecabaf0f8d3298adbd3021e2dd29afbc4a5a",
      block: 10,
      id: "24",
    },
    {
      createdAt: "2023-03-09T14:14:38.437Z",
      hash: "af5b84eebbf98ffd41e13acb8a1b17cc965b932e",
      amount: 26191.64,
      from: "0x93c0537c90af486c7e25e66bbdc1d4acadd6e3cc",
      to: "0xe761ed3a2ea4cf3257ec84cf9a3699aceda6cefe",
      block: 23,
      id: "25",
    },
    {
      createdAt: "2023-03-08T22:49:42.871Z",
      hash: "30beb1da6cffaab9d70aff3bca4bd2facfcda131",
      amount: 80990.45,
      from: "0xbb78c4b61adfcdfaed2e0aba6fabcdf0b2f61330",
      to: "0x0bf41ad3ca3fe0f11d061d3cf9b82af4cc06550f",
      block: 20,
      id: "26",
    },
    {
      createdAt: "2023-03-09T10:04:20.657Z",
      hash: "38aae402480d3e68c157c8eb3cfd700fb5cce6df",
      amount: 63554.17,
      from: "0xe970e321f7c5defe5fdede0cbf5fc8ab85fcee57",
      to: "0xaeff0662a8fbc4cf84c45afaccafdcc56b84630f",
      block: 54,
      id: "27",
    },
    {
      createdAt: "2023-03-09T01:44:54.285Z",
      hash: "54ebcdcb277934ffd90d551cebf8cccae38397de",
      amount: 86515.12,
      from: "0x3aa5536d8d0b7ff658ff5f36de53f1ed78e88bb6",
      to: "0xb54cae1255b8cf236a1cdc908d3b4ba68fcade2b",
      block: 48,
      id: "28",
    },
    {
      createdAt: "2023-03-09T06:33:32.349Z",
      hash: "3e4efd6fdc48f6ef8cb24372d8fcd9e826b5c2f1",
      amount: 82287.17,
      from: "0xf1d60554ae5fa9e03e0ef7653df380dcf6bcbd28",
      to: "0x3bb8dbad3ef1e2fc0f6ffccd557b09a63cdede64",
      block: 7,
      id: "29",
    },
    {
      createdAt: "2023-03-09T15:38:15.368Z",
      hash: "aaba1a44d3132bb90eccf65d9a5914e21eaa2ad0",
      amount: 19984.08,
      from: "0xe5dd81fda6cea91d49a5654aebce1cca3aba2dfe",
      to: "0xf4fdca8eb85fdaa6d1de008eebca1cdb41cec4df",
      block: 66,
      id: "30",
    },
  ];
});

export const getLatestTransactions = cache(async () => {
  return [
    {
      createdAt: "2023-03-09T18:40:54.678Z",
      hash: "a2cc47ce758e41bffce32008398f9e050e9affff",
      amount: 44784.57,
      from: "0x6199b73bc4ffbcdbf1b01b186ebcae38bcb637a6",
      to: "0x98be4bb0ca97fd8fce9ec9a579eb16b523e4cd1c",
      block: 65,
      id: "22",
    },
    {
      createdAt: "2023-03-09T03:12:03.936Z",
      hash: "9bee25e61af70c5eceeea0e7f523cbdc2edfc8ee",
      amount: 2031.06,
      from: "0x63204c14f2faadb7df8fe8ac15658a1bbaa202c1",
      to: "0xfcd64ddddbd43e19af5b9e6c6ddce00c0b0a79ec",
      block: 20,
      id: "23",
    },
    {
      createdAt: "2023-03-09T06:53:27.269Z",
      hash: "478e9231f383b3f6afbdbf0cbb11a4cb285ac934",
      amount: 25546.03,
      from: "0x3c9d3f1b1e6dd7eb95fefde1ea7ee7aaebccee07",
      to: "0x7dffecabaf0f8d3298adbd3021e2dd29afbc4a5a",
      block: 10,
      id: "24",
    },
    {
      createdAt: "2023-03-09T14:14:38.437Z",
      hash: "af5b84eebbf98ffd41e13acb8a1b17cc965b932e",
      amount: 26191.64,
      from: "0x93c0537c90af486c7e25e66bbdc1d4acadd6e3cc",
      to: "0xe761ed3a2ea4cf3257ec84cf9a3699aceda6cefe",
      block: 23,
      id: "25",
    },
    {
      createdAt: "2023-03-08T22:49:42.871Z",
      hash: "30beb1da6cffaab9d70aff3bca4bd2facfcda131",
      amount: 80990.45,
      from: "0xbb78c4b61adfcdfaed2e0aba6fabcdf0b2f61330",
      to: "0x0bf41ad3ca3fe0f11d061d3cf9b82af4cc06550f",
      block: 20,
      id: "26",
    },
    {
      createdAt: "2023-03-09T10:04:20.657Z",
      hash: "38aae402480d3e68c157c8eb3cfd700fb5cce6df",
      amount: 63554.17,
      from: "0xe970e321f7c5defe5fdede0cbf5fc8ab85fcee57",
      to: "0xaeff0662a8fbc4cf84c45afaccafdcc56b84630f",
      block: 54,
      id: "27",
    },
    {
      createdAt: "2023-03-09T01:44:54.285Z",
      hash: "54ebcdcb277934ffd90d551cebf8cccae38397de",
      amount: 86515.12,
      from: "0x3aa5536d8d0b7ff658ff5f36de53f1ed78e88bb6",
      to: "0xb54cae1255b8cf236a1cdc908d3b4ba68fcade2b",
      block: 48,
      id: "28",
    },
    {
      createdAt: "2023-03-09T06:33:32.349Z",
      hash: "3e4efd6fdc48f6ef8cb24372d8fcd9e826b5c2f1",
      amount: 82287.17,
      from: "0xf1d60554ae5fa9e03e0ef7653df380dcf6bcbd28",
      to: "0x3bb8dbad3ef1e2fc0f6ffccd557b09a63cdede64",
      block: 7,
      id: "29",
    },
    {
      createdAt: "2023-03-09T15:38:15.368Z",
      hash: "aaba1a44d3132bb90eccf65d9a5914e21eaa2ad0",
      amount: 19984.08,
      from: "0xe5dd81fda6cea91d49a5654aebce1cca3aba2dfe",
      to: "0xf4fdca8eb85fdaa6d1de008eebca1cdb41cec4df",
      block: 66,
      id: "30",
    },
  ];
});

export const getTransaction = cache(async (hash: string) => {
  return {
    createdAt: "2023-03-09T15:38:15.368Z",
    hash: "aaba1a44d3132bb90eccf65d9a5914e21eaa2ad0",
    amount: 19984.08,
    from: "0xe5dd81fda6cea91d49a5654aebce1cca3aba2dfe",
    to: "0xf4fdca8eb85fdaa6d1de008eebca1cdb41cec4df",
    block: 66,
    fee: 1023,
    id: "30",
  };
});
