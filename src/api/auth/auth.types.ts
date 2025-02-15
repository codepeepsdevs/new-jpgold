// general response

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
  user: IUser;
  token?: string;
}

// Register
export interface IRegister {
  email: string;
  password: string;
  fullName: string;
}

export interface RRegister {
  message: string;
  user: IUser;
  statusCode: number;
}

// verify email
export interface IVerifyEmail {
  token: string;
}

export interface IForgotPassword {
  email: string;
}

export interface RVerifyEmail extends IResponse {}

// verify two fa
export interface IVerifyTwoFa {
  email: string;
  otpCode: string;
}

export interface RVerifyTwoFa extends IResponse {
  accessToken: string;
  user: IUser;
}

export interface RForgotPassword extends IResponse {}

export interface IResetPassword {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface RResetPassword extends IResponse {}
