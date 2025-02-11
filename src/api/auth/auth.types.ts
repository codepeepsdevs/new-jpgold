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

export interface RVerifyEmail extends IResponse {}

// verify two fa
export interface IVerifyTwoFa {
  email: string;
  otpCode: string;
}

export interface RVerifyTwoFa extends IResponse {}
