import { IResponse } from "@/constants/types";

export interface IUpdateUser {
  fullname: string;
  phoneNumber: string;
}

export interface RUpdateUser extends IResponse {
  fullname: string;
  phoneNumber: string;
}

export type RToggleTwoFactorAuth = IResponse;

export interface IToggleTwoFactorAuth {
  enable: boolean;
}
