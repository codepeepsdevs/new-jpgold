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
    url: `/v1/stripe/checkout/${type}`,
    method: "post",
    data: rest,
  });
};

export const cryptomusCheckoutRequest = async (
  formdata: ICryptomusCheckout
): Promise<AxiosResponse<RCryptomusCheckout>> => {
  const { type, ...rest } = formdata;

  return request({
    url: `/v1/cryptomus/create-payment/${this}`,
    method: "post",
    data: rest,
  });
};
