import { request } from "@/utils/axios-utils";
import { IGetMetalGoldPrice } from "./metal-price.types";

const currency = "XAU";

export const getMetalPriceForTickerBarRequest = ({
  base,
  unit,
}: IGetMetalGoldPrice) => {
  return request({
    url: `/v1/metal-price/ticker-bar?base=${base}&currencies=${currency}&unit=${unit}`,
  });
};

export const getGoldPriceRequest = ({ quantity }: { quantity: number }) => {
  return request({
    url: `/v1/metal-price/gold-price?quantity=${quantity}`,
  });
};
