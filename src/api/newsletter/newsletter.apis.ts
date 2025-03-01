import { request } from "@/utils/axios-utils";
import { ISubscribeNewsletter, RSubscribeNewsletter } from "./newsletter.types";
import { AxiosResponse } from "axios";

export const subscribeNewsletterRequest = async (
  formdata: ISubscribeNewsletter
): Promise<AxiosResponse<RSubscribeNewsletter>> => {
  return request({
    url: "/v1/newsletter/subscribe",
    method: "post",
    data: formdata,
  });
};
