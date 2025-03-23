import { IResponse, SupportedChains } from "@/constants/types";

interface MarketplaceItem {
  discriminant: number;
  owner: string;
  mintAddress: string;
}

export interface IStripeCheckout {
  amount: number;
  walletAddress: string;
  quantity: number;
  fee: number;
  network: SupportedChains;
  successUrl: string;
  cancelUrl: string;
  type: "jpgnft" | "jpgc" | "marketplace";
  marketplaceItems?: MarketplaceItem[];
}

export interface RStripeCheckout extends IResponse {
  sessionId: string;
}

export interface ICryptomusCheckout {
  amount: string;
  walletAddress: string;
  quantity: number;
  fee: number;
  network: SupportedChains;
  url_return: string;
  url_success: string;
  type: "jpgnft" | "jpgc" | "marketplace";
  marketplaceItems?: MarketplaceItem[];
}

export interface RCryptomusCheckout extends IResponse {
  url: string;
}
