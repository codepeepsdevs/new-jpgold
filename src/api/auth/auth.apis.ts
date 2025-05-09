import { request } from "@/utils/axios-utils";
import {
  IRegister,
  ILogin,
  RLogin,
  RRegister,
  IVerifyEmail,
  RVerifyEmail,
  RVerifyTwoFa,
  IVerifyTwoFa,
  IForgotPassword,
  RForgotPassword,
  IResetPassword,
  RResetPassword,
} from "./auth.types";
import { AxiosResponse } from "axios";

export const loginRequest = async (
  formdata: ILogin
): Promise<AxiosResponse<RLogin>> => {
  return request({
    url: "/v1/auth/login",
    method: "post",
    data: formdata,
  });
};

export const registerRequest = async (
  formdata: IRegister
): Promise<AxiosResponse<RRegister>> => {
  return request({
    url: "/v1/auth/register",
    method: "post",
    data: formdata,
  });
};

export const verifyEmailRequest = async (
  formdata: IVerifyEmail
): Promise<AxiosResponse<RVerifyEmail>> => {
  return request({
    url: "/v1/auth/verify-email",
    method: "post",
    data: formdata,
  });
};

export const verifyTwoFaRequest = async (
  formdata: IVerifyTwoFa
): Promise<AxiosResponse<RVerifyTwoFa>> => {
  return request({
    url: "/v1/auth/verify-twoFa",
    method: "post",
    data: formdata,
  });
};

export const forgotPasswordRequest = async (
  formdata: IForgotPassword
): Promise<AxiosResponse<RForgotPassword>> => {
  return request({
    url: "/v1/auth/forgot-password",
    method: "post",
    data: formdata,
  });
};

export const resetPasswordRequest = async (
  formdata: IResetPassword
): Promise<AxiosResponse<RResetPassword>> => {
  return request({
    url: "/v1/auth/reset-password",
    method: "post",
    data: formdata,
  });
};
