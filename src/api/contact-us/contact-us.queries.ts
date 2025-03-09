import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { ErrorResponse } from "../type";
import { contactUsRequest } from "./contact-us.apis";
import { IContactUs, RContactUs } from "./contact-us.types";

export const useContactUs = (
  onError: (error: AxiosError<ErrorResponse>) => void,
  onSuccess: (data: AxiosResponse<RContactUs>) => void
) => {
  return useMutation<
    AxiosResponse<RContactUs>,
    AxiosError<ErrorResponse>,
    IContactUs
  >({
    mutationFn: contactUsRequest,
    onError,
    onSuccess,
  });
};
