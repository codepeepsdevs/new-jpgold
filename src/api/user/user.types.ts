// update user

interface IResponse {
  message: string;
  statusCode: number;
}

export interface IUpdateUser {
  fullname: string;
  phoneNumber: string;
}

export interface RUpdateUser {
  fullname: string;
  phoneNumber: string;
}

export interface RToggleTwoFactorAuth extends IResponse {
  message: string;
}

export interface IToggleTwoFactorAuth {
  enable: boolean;
}
