import { request } from "@/utils/axios-utils";
import { IToggleTwoFactorAuth, IUpdateUser, RUpdateUser } from "./user.types";
import { AxiosResponse } from "axios";

export const getUser = () => {
  return request({ url: `/user` });
};

export const updateUserRequest = async (
  formdata: IUpdateUser
): Promise<AxiosResponse<RUpdateUser>> => {
  return request({
    url: "/user/update",
    method: "put",
    data: formdata,
  });
};

export const ToggleTwoFactorAuthRequest = (formdata: IToggleTwoFactorAuth) => {
  return request({
    url: "/user/toggle-two-factor-auth",
    method: "post",
    data: formdata,
  });
};
