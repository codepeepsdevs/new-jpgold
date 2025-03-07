import { request } from "@/utils/axios-utils";
import { IGetTokenBalance } from "./jpgc.types";

export const getTokenBalanceRequest = (options: IGetTokenBalance) => {
  return request({
    url: `/v1/jpgc/get-token-balance/?chain=${options.chain}&recipient=${options.recipient}`,
  });
};
