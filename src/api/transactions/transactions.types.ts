import {
  IResponse,
  PAYMENT_METHOD,
  SupportedChains,
  TransactionProps,
  TRX_TYPE,
} from "@/constants/types";

export interface ICreateTrx {
  amount: number;
  walletAddress: string;
  quantity: number;
  fee: number;
  network: SupportedChains;
  type: TRX_TYPE;
  paymentMethod: PAYMENT_METHOD;
}

export type RCreateTrx = IResponse & TransactionProps;

export interface IUpdateTrx {
  signature: string;
  trxRef: string;
  proceeds?: {
    amount: number;
    owner: string;
  }[];
}

export type RUpdateTrx = IResponse;

export interface IGetTransactionsParams {
  page: number;
  count: number;
  type?: TRX_TYPE;
  search?: string;
  walletAddress: string;
}
