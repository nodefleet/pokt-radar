
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
