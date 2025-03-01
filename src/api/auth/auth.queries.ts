import { useMutation, useQueryClient } from "@tanstack/react-query";
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
import { ErrorResponse } from "../type";

export const useLogin = (
  onError: (error: AxiosError<ErrorResponse>) => void,
  onSuccess: (data: AxiosResponse<RLogin>) => void
) => {
  const queryClient = useQueryClient();
  return useMutation<AxiosResponse<RLogin>, AxiosError<ErrorResponse>, ILogin>({
    mutationFn: loginRequest,
    onError,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      onSuccess(data);
    },
  });
};

export const useRegister = (
  onError: (error: AxiosError<ErrorResponse>) => void,
  onSuccess: (data: AxiosResponse<RRegister>) => void
) => {
  return useMutation<
    AxiosResponse<RRegister>,
    AxiosError<ErrorResponse>,
    IRegister
  >({
    mutationFn: registerRequest,
    onError,
    onSuccess,
  });
};

export const useVerifyEmail = (
  onError: (error: AxiosError<ErrorResponse>) => void,
  onSuccess: (data: AxiosResponse<RVerifyEmail>) => void
) => {
  return useMutation<
    AxiosResponse<RVerifyEmail>,
    AxiosError<ErrorResponse>,
    IVerifyEmail
  >({
    mutationFn: verifyEmailRequest,
    onError,
    onSuccess,
  });
};

export const useVerifyTwoFa = (
  onError: (error: AxiosError<ErrorResponse>) => void,
  onSuccess: (data: AxiosResponse<RVerifyTwoFa>) => void
) => {
  const queryClient = useQueryClient();

  return useMutation<
    AxiosResponse<RVerifyTwoFa>,
    AxiosError<ErrorResponse>,
    IVerifyTwoFa
  >({
    mutationFn: verifyTwoFaRequest,
    onError,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      onSuccess(data);
    },
  });
};

export const useForgotPassword = (
  onError: (error: AxiosError<ErrorResponse>) => void,
  onSuccess: (data: AxiosResponse<RForgotPassword>) => void
) => {
  return useMutation<
    AxiosResponse<RForgotPassword>,
    AxiosError<ErrorResponse>,
    IForgotPassword
  >({
    mutationFn: forgotPasswordRequest,
    onError,
    onSuccess,
  });
};

export const useResetPassword = (
  onError: (error: AxiosError<ErrorResponse>) => void,
  onSuccess: (data: AxiosResponse<RResetPassword>) => void
) => {
  return useMutation<
    AxiosResponse<RResetPassword>,
    AxiosError<ErrorResponse>,
    IResetPassword
  >({
    mutationFn: resetPasswordRequest,
    onError,
    onSuccess,
  });
};
