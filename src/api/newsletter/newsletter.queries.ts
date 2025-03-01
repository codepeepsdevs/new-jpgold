import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { ISubscribeNewsletter, RSubscribeNewsletter } from "./newsletter.types";
import { subscribeNewsletterRequest } from "./newsletter.apis";
import { ErrorResponse } from "../type";

export const useSubscribeNewsletter = (
  onError: (error: AxiosError<ErrorResponse>) => void,
  onSuccess: (data: AxiosResponse<RSubscribeNewsletter>) => void
) => {
  return useMutation<
    AxiosResponse<RSubscribeNewsletter>,
    AxiosError<ErrorResponse>,
    ISubscribeNewsletter
  >({
    mutationFn: subscribeNewsletterRequest,
    onError,
    onSuccess,
  });
};
