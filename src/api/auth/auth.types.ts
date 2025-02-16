// general response

import { User } from "../type";

interface IResponse {
  message: string;
  statusCode: number;
}

// Login
export interface ILogin {
  email: string;
  password: string;
}

export interface RLogin extends IResponse {
  user: User;
  token?: string;
}

// Register
export interface IRegister {
  email: string;
  password: string;
  fullName: string;
}

export interface RRegister extends IResponse {
  user: User;
}

// verify email
export interface IVerifyEmail {
  token: string;
}

export interface IForgotPassword {
  email: string;
}

export type RVerifyEmail = IResponse;

// verify two fa
export interface IVerifyTwoFa {
  email: string;
  otpCode: string;
}

export interface RVerifyTwoFa extends IResponse {
  accessToken: string;
  user: User;
}

export type RForgotPassword = IResponse;

export interface IResetPassword {
  token: string;
  password: string;
  confirmPassword: string;
}

export type RResetPassword = IResponse;
