import { request } from "@/utils/axios-utils";
import { IUpdateUser, RUpdateUser } from "./user.types";
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
