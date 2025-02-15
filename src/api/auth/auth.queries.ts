import { useMutation } from "@tanstack/react-query";
import {
  forgotPasswordRequest,
  loginRequest,
  registerRequest,
  resetPasswordRequest,
  verifyEmailRequest,
  verifyTwoFaRequest,
} from "./auth.apis";
import {
  IForgotPassword,
  ILogin,
  IRegister,
  IResetPassword,
  IVerifyEmail,
  IVerifyTwoFa,
  RForgotPassword,
  RLogin,
  RRegister,
  RResetPassword,
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

export const useForgotPassword = (
  onError: (error: AxiosError) => void,
  onSuccess: (data: AxiosResponse<RForgotPassword>) => void
) => {
  return useMutation<
    AxiosResponse<RForgotPassword>,
    AxiosError,
    IForgotPassword
  >({
    mutationFn: forgotPasswordRequest,
    onError,
    onSuccess,
  });
};

export const useResetPassword = (
  onError: (error: AxiosError) => void,
  onSuccess: (data: AxiosResponse<RResetPassword>) => void
) => {
  return useMutation<AxiosResponse<RResetPassword>, AxiosError, IResetPassword>(
    {
      mutationFn: resetPasswordRequest,
      onError,
      onSuccess,
    }
  );
};
