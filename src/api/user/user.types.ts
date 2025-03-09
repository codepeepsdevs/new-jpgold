import { IResponse } from "@/constants/types";

export interface IUpdateUser {
  fullname: string;
  web3Nickname?: string;
}

export type RUpdateUser = IResponse;

export interface IUpdateProfileImage {
  formdata: FormData;
}
export type RUpdateProfileImage = IResponse;

export interface IChangePassword {
  oldPassword: string;
  newPassword: string;
}

export type RChangePassword = IResponse;

export type RToggleTwoFactorAuth = IResponse;

export interface IToggleTwoFactorAuth {
  enable: boolean;
}
