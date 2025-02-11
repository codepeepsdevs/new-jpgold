import { useMutation } from "@tanstack/react-query";
import {
  loginRequest,
  registerRequest,
  verifyEmailRequest,
  verifyTwoFaRequest,
} from "./auth.apis";
import {
  ILogin,
  IRegister,
  IVerifyEmail,
  IVerifyTwoFa,
  RLogin,
  RRegister,
  RVerifyEmail,
  RVerifyTwoFa,
} from "./auth.types";
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

export const useVerifyEmail = (
  onError: (error: AxiosError) => void,
  onSuccess: (data: AxiosResponse<RVerifyEmail>) => void
) => {
  return useMutation<AxiosResponse<RVerifyEmail>, AxiosError, IVerifyEmail>({
    mutationFn: verifyEmailRequest,
    onError,
    onSuccess,
  });
};

export const useVerifyTwoFa = (
  onError: (error: AxiosError) => void,
  onSuccess: (data: AxiosResponse<RVerifyTwoFa>) => void
) => {
  return useMutation<AxiosResponse<RVerifyTwoFa>, AxiosError, IVerifyTwoFa>({
    mutationFn: verifyTwoFaRequest,
    onError,
    onSuccess,
  });
};

export const useForgotPassword = () => {};
