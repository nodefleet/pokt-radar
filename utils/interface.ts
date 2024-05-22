export interface Transaction {
  tx_hash: string;
  to_address: string;
  tx_result_code: number;
  height: number;
  amount: number;
  block_time: string;
  memo: string;
  parse_time: string;
  fee: number;
  flow: null | string;
  pending: boolean;
  from_address: string;
}

export interface PointWithTransactionsTotal {
  end_date: string;
  start_date: string;
  total_good_txs: number;
  total_bad_txs: number;
  total_txs: number;
  point: string;
}

export interface Producer {
  servicer: {
    twenty_fours_hs_less_relays_avg: number;
  };
  producer: {
    twenty_fours_hs_less_pokt_avg: number;
  };
}

export interface Stakin {
  point: string;
  ms: number;
}
