import { request } from "@/utils/axios-utils";
import {
  IGetAllListedNftsParams,
  IGetListedNftsParams,
  IGetNftsByOwnerParams,
} from "./jpgnft.types";

export const getNftsByOwnerRequest = async (params: IGetNftsByOwnerParams) => {
  // Convert params to URL query parameters
  const queryParams = new URLSearchParams();

  // Always add required address
  queryParams.append("address", params.address);

  // Add sortBy as a JSON string if it exists
  if (params.sortBy) {
    queryParams.append("sortBy", JSON.stringify(params.sortBy));
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

export const getListedNftsRequest = async (params: IGetListedNftsParams) => {
  // Convert params to URL query parameters
  const queryParams = new URLSearchParams();

  // Always add required address
  queryParams.append("owner", params.owner);

  if (params.limit !== undefined) {
    queryParams.append("limit", params.limit.toString());
  }

  if (params.page !== undefined) {
    queryParams.append("page", params.page.toString());
  }

  const url = `/v1/jpgnft/get-listed-nfts?${queryParams.toString()}`;

  return request({
    method: "GET",
    url,
  });
};

export const getAllListedNftsRequest = async (
  params: IGetAllListedNftsParams
) => {
  // Convert params to URL query parameters
  const queryParams = new URLSearchParams();

  // Always add required address

  if (params.search && params.search !== "") {
    queryParams.append("search", params.search.toString());
  }

  if (params.limit !== undefined) {
    queryParams.append("limit", params.limit.toString());
  }

  if (params.page !== undefined) {
    queryParams.append("page", params.page.toString());
  }

  if (params.sortBy) {
    queryParams.append("sortBy", JSON.stringify(params.sortBy));
  }

  const url = `/v1/jpgnft/get-all-listed-nfts?${queryParams.toString()}`;

  return request({
    method: "GET",
    url,
  });
};

export const getFeaturedListedNftsRequest = async () => {
  const url = `/v1/jpgnft/get-featured-listed-nfts`;

  return request({
    method: "GET",
    url,
  });
};

export const getNftRequest = async ({ id }: { id: string }) => {
  const queryParams = new URLSearchParams();

  if (id && id !== "") {
    queryParams.append("id", id.toString());
  }

  const url = `/v1/jpgnft/get-nft?${queryParams.toString()}`;

  return request({
    method: "GET",
    url,
  });
};
