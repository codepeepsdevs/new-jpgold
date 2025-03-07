import { IResponse } from "@/constants/types";

export interface IStripeCheckout {
  amount: number;
  walletAddress: string;
  quantity: number;
  network: string;
  successUrl: string;
  cancelUrl: string;
}

export interface RStripeCheckout extends IResponse {
  sessionId: string;
}

export interface ICryptomusCheckout {
  amount: string;
  walletAddress: string;
  quantity: number;
  network: string;
  url_return: string;
  url_success: string;
}

export interface RCryptomusCheckout extends IResponse {
  url: string;
}
