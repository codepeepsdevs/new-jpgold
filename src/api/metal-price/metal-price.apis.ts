import { request } from "@/utils/axios-utils";
import { IGetMetalGoldPrice } from "./metal-price.types";

const currency = "XAU";

export const getMetaGoldPriceRequest = ({ base, unit }: IGetMetalGoldPrice) => {
  return request({
    url: `/v1/metal-price?base=${base}&currencies=${currency}&unit=${unit}`,
  });
};
