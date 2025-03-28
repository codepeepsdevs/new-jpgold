import { SupportedChains } from "@/constants/types";

export interface IGetMetrics {
  walletAddress: string;
  network: SupportedChains;
}
