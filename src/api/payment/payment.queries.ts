import { useMutation } from "@tanstack/react-query";

import { ErrorResponse } from "../type";
import { AxiosError, AxiosResponse } from "axios";
import {
  ICryptomusCheckout,
  IStripeCheckout,
  RCryptomusCheckout,
  RStripeCheckout,
} from "./payment.types";
import {
  cryptomusCheckoutRequest,
  stripeCheckoutRequest,
} from "./payment.apis";

export const useStripeCheckout = (
  onError: (error: AxiosError<ErrorResponse>) => void,
  onSuccess: (data: AxiosResponse<RStripeCheckout>) => void
) => {
  return useMutation<
    AxiosResponse<RStripeCheckout>,
    AxiosError<ErrorResponse>,
    IStripeCheckout
  >({
    mutationFn: stripeCheckoutRequest,
    onError,
    onSuccess,
  });
};

export const useCryptomusCheckout = (
  onError: (error: AxiosError<ErrorResponse>) => void,
  onSuccess: (data: AxiosResponse<RCryptomusCheckout>) => void
) => {
  return useMutation<
    AxiosResponse<RCryptomusCheckout>,
    AxiosError<ErrorResponse>,
    ICryptomusCheckout
  >({
    mutationFn: cryptomusCheckoutRequest,
    onError,
    onSuccess,
  });
};
