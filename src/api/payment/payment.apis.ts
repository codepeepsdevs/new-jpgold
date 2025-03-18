import { request } from "@/utils/axios-utils";
import { AxiosResponse } from "axios";
import {
  ICryptomusCheckout,
  IStripeCheckout,
  RCryptomusCheckout,
  RStripeCheckout,
} from "./payment.types";

export const stripeCheckoutRequest = async (
  formdata: IStripeCheckout
): Promise<AxiosResponse<RStripeCheckout>> => {
  const { type, ...rest } = formdata;
  return request({
    url: `/v1/stripe/${type}/checkout`,
    method: "post",
    data: rest,
  });
};

export const cryptomusCheckoutRequest = async (
  formdata: ICryptomusCheckout
): Promise<AxiosResponse<RCryptomusCheckout>> => {
  const { type, ...rest } = formdata;

  return request({
    url: `/v1/cryptomus/${type}/create-payment`,
    method: "post",
    data: rest,
  });
};
