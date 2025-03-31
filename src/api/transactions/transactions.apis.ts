import { request } from "@/utils/axios-utils";
import { AxiosResponse } from "axios";
import {
  ICreateTrx,
  IGetTransactionsParams,
  IUpdateTrx,
  RCreateTrx,
  RUpdateTrx,
} from "./transactions.types";

export const createTrxRequest = async (
  formdata: ICreateTrx
): Promise<AxiosResponse<RCreateTrx>> => {
  return request({
    url: `/v1/transaction/create-pending-trx`,
    method: "post",
    data: formdata,
  });
};

export const updateTrxRequest = async (
  formdata: IUpdateTrx
): Promise<AxiosResponse<RUpdateTrx>> => {
  return request({
    url: `/v1/transaction/update-pending-trx`,
    method: "post",
    data: formdata,
  });
};

export const getTransactionsRequest = async (
  params: IGetTransactionsParams
) => {
  // Convert params to URL query parameters
  const queryParams = new URLSearchParams();

  if (!!params.count) {
    queryParams.append("count", params.count.toString());
  }

  if (!!params.page) {
    queryParams.append("page", params.page.toString());
  }

  if (!!params.walletAddress) {
    queryParams.append("walletAddress", params.walletAddress.toString());
  }

  if (params.type) {
    queryParams.append("type", params.type);
  }

  if (params.search) {
    queryParams.append("search", params.search);
  }

  const url = `/v1/transaction?${queryParams.toString()}`;

  return request({
    method: "GET",
    url,
  });
};
