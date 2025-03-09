import { request } from "@/utils/axios-utils";
import {
  IUpdateProfileImage,
  IToggleTwoFactorAuth,
  IUpdateUser,
  RUpdateUser,
  RUpdateProfileImage,
  IChangePassword,
  RChangePassword,
} from "./user.types";
import { AxiosResponse } from "axios";

export const getUser = () => {
  return request({ url: `/v1/user` });
};

export const updateUserRequest = async (
  formdata: IUpdateUser
): Promise<AxiosResponse<RUpdateUser>> => {
  return request({
    url: "/v1/user/edit-profile",
    method: "put",
    data: formdata,
  });
};

export const updateProfileImageRequest = async ({
  formdata,
}: IUpdateProfileImage): Promise<AxiosResponse<RUpdateProfileImage>> => {
  return request({
    url: "/v1/user/updateProfileImage",
    method: "put",
    data: formdata,
  });
};

export const changePasswordRequest = async (
  formdata: IChangePassword
): Promise<AxiosResponse<RChangePassword>> => {
  return request({
    url: "/v1/user/change-password",
    method: "put",
    data: formdata,
  });
};

export const ToggleTwoFactorAuthRequest = (formdata: IToggleTwoFactorAuth) => {
  return request({
    url: "/v1/user/toggle-two-factor-auth",
    method: "post",
    data: formdata,
  });
};
