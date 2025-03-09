import { request } from "@/utils/axios-utils";
import { AxiosResponse } from "axios";
import { IContactUs, RContactUs } from "./contact-us.types";

export const contactUsRequest = async (
  formdata: IContactUs
): Promise<AxiosResponse<RContactUs>> => {
  return request({
    url: "/v1/contactus",
    method: "post",
    data: formdata,
  });
};
