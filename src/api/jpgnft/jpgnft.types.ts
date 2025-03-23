import { NFTAsset } from "@/constants/types";

// Sort options enum
export enum SortByEnum {
  CREATED = "created",
  UPDATED = "updated",
  RECENT_ACTION = "recent_action",
  ID = "id",
  NONE = "none",
}

// Additional sort options for all NFTs
export enum AllNftSortByEnum {
  PRICE = "price",
  AMOUNT = "amount",
}

// Sort direction enum
export enum SortDirectionEnum {
  ASC = "asc",
  DESC = "desc",
}

// Interface for sort parameters
export interface ISortBy {
  sortBy: SortByEnum;
  sortDirection: SortDirectionEnum;
}

// Interface for all NFTs sort parameters
export interface IAllSortBy {
  sortBy: AllNftSortByEnum;
  sortDirection: SortDirectionEnum;
}

// Interface for GetNftsByOwner query parameters
export interface IGetNftsByOwnerParams {
  address: string;
  sortBy?: ISortBy;
  limit?: number;
  page?: number;
  before?: string;
  after?: string;
}

// Interface for getting listed NFTs by a specific owner
export interface IGetListedNftsParams {
  owner: string;
  limit?: number;
  page?: number;
}

export interface IGetAllListedNftsParams {
  sortBy?: IAllSortBy;
  search?: string;
  page?: number;
  limit?: number;
}

// Interface for NFT response from API
export interface INftDataResponse {
  nfts: NFTAsset[];
}
