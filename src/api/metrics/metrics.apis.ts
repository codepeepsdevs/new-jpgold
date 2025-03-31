import { request } from "@/utils/axios-utils";
import { IGetMetrics } from "./metrics.types";

export const getMetricsRequest = async (params: IGetMetrics) => {
  // Convert params to URL query parameters
  const queryParams = new URLSearchParams();

  if (!!params.network) {
    queryParams.append("network", params.network.toString());
  }

  if (!!params.walletAddress) {
    queryParams.append("walletAddress", params.walletAddress.toString());
  }

  const url = `/v1/metrics?${queryParams.toString()}`;

  return request({
    method: "GET",
    url,
  });
};
