import { request } from "@/utils/axios-utils";

export const getTokenPriceRequest = ({
  symbol,
  amount,
}: {
  symbol: string;
  amount: number;
}) => {
  return request({
    url: `/v1/coinmarketcap/getPrice?symbol=${symbol}&amount=${amount}`,
  });
};
