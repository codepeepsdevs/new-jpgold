import { request } from "@/utils/axios-utils";
import { IGetNftsByOwnerParams } from "./jpgnft.types";

export const getNftsByOwnerRequest = async (params: IGetNftsByOwnerParams) => {
  // Convert params to URL query parameters
  const queryParams = new URLSearchParams();

  // Always add required address
  queryParams.append("address", params.address);

  // Add optional parameters if they exist
  if (params.sortBy) {
    queryParams.append("sortBy", params.sortBy.sortBy);
    queryParams.append("sortDirection", params.sortBy.sortDirection);
  }

  if (params.limit !== undefined) {
    queryParams.append("limit", params.limit.toString());
  }

  if (params.page !== undefined) {
    queryParams.append("page", params.page.toString());
  }

  if (params.before) {
    queryParams.append("before", params.before);
  }

  if (params.after) {
    queryParams.append("after", params.after);
  }

  const url = `/v1/jpgnft/get-nfts-by-owner?${queryParams.toString()}`;

  return request({
    method: "GET",
    url,
  });
};
