import { SupportedChains } from "@/constants/types";

export interface IGetTokenBalance {
  chain: SupportedChains;
  recipient: string;
}
