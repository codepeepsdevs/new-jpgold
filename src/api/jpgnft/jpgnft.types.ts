import { SupportedChains } from "@/constants/types";

// Sort options enum
export enum SortByEnum {
  CREATED = "created",
  UPDATED = "updated",
  RECENT_ACTION = "recent_action",
  ID = "id",
  NONE = "none",
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

// Interface for GetNftsByOwner query parameters
export interface IGetNftsByOwnerParams {
  address: string;
  sortBy?: ISortBy;
  limit?: number;
  page?: number;
  before?: string;
  after?: string;
}
