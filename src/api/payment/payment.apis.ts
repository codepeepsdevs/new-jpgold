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
  return request({
    url: "/v1/stripe/checkout",
    method: "post",
    data: formdata,
  });
};

export const cryptomusCheckoutRequest = async (
  formdata: ICryptomusCheckout
): Promise<AxiosResponse<RCryptomusCheckout>> => {
  return request({
    url: "/v1/cryptomus/create-payment",
    method: "post",
    data: formdata,
  });
};
