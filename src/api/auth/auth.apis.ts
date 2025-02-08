import { request } from "@/utils/axios-utils";
import { IRegister, ILogin, RLogin, RRegister } from "./auth.types";
import { AxiosResponse } from "axios";

export const loginRequest = async (
  formdata: ILogin
): Promise<AxiosResponse<RLogin>> => {
  return request({
    url: "/auth/login",
    method: "post",
    data: formdata,
  });
};

export const registerRequest = async (
  formdata: IRegister
): Promise<AxiosResponse<RRegister>> => {
  return request({
    url: "/auth/register",
    method: "post",
    data: formdata,
  });
};
