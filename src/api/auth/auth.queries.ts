import { useMutation } from "@tanstack/react-query";
import { loginRequest, registerRequest } from "./auth.apis";
import { ILogin, IRegister, RLogin, RRegister } from "./auth.types";
import { AxiosError, AxiosResponse } from "axios";

export const useLogin = (
  onError: (error: AxiosError) => void,
  onSuccess: (data: AxiosResponse<RLogin>) => void
) => {
  return useMutation<AxiosResponse<RLogin>, AxiosError, ILogin>({
    mutationFn: loginRequest,
    onError,
    onSuccess,
  });
};

export const useRegister = (
  onError: (error: AxiosError) => void,
  onSuccess: (data: AxiosResponse<RRegister>) => void
) => {
  return useMutation<AxiosResponse<RRegister>, AxiosError, IRegister>({
    mutationFn: registerRequest,
    onError,
    onSuccess,
  });
};
