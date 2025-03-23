"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  IGetAllListedNftsParams,
  IGetListedNftsParams,
  IGetNftsByOwnerParams,
  INftDataResponse,
} from "./jpgnft.types";
import {
  getAllListedNftsRequest,
  getFeaturedListedNftsRequest,
  getListedNftsRequest,
  getNftRequest,
  getNftsByOwnerRequest,
} from "./jpgnft.apis";
import { NFTAsset } from "@/constants/types";
import { useCallback, useRef, useState } from "react";

export const useGetNftsByOwner = (options: IGetNftsByOwnerParams) => {
  const { data, isError, isSuccess, error, isLoading } = useQuery({
    queryKey: ["get-wallet-nfts", options],
    queryFn: () => getNftsByOwnerRequest(options),
    enabled: !!options.address,
  });
  const nftData: INftDataResponse = data?.data;

  return { nftData, isError, isSuccess, error, isLoading };
};

export const useGetAllListedNfts = (options: IGetAllListedNftsParams) => {
  const { data, isError, isSuccess, error, isLoading } = useQuery({
    queryKey: ["get-all-listed-nfts", options],
    queryFn: () => getAllListedNftsRequest(options),
  });
  const nftData: {
    nfts: NFTAsset[];
  } = data?.data;

  return { nftData, isError, isSuccess, error, isLoading };
};

export const useGetNft = (options: { id: string }) => {
  const { data, isError, isSuccess, error, isLoading } = useQuery({
    queryKey: ["get-nft", options],
    queryFn: () => getNftRequest(options),
  });
  const nftData: {
    nft: NFTAsset;
  } = data?.data;

  return { nftData, isError, isSuccess, error, isLoading };
};

export const useGetFeaturedListedNfts = () => {
  const { data, isError, isSuccess, error, isLoading } = useQuery({
    queryKey: ["get-featured-listed-nfts"],
    queryFn: getFeaturedListedNftsRequest,
  });
  const nftData: {
    nfts: NFTAsset[];
  } = data?.data;

  return { nftData, isError, isSuccess, error, isLoading };
};

export const useGetListedNfts = (options: IGetListedNftsParams) => {
  const queryClient = useQueryClient();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const refreshingRef = useRef(false);

  const startRefreshCycle = useCallback(() => {
    // Use the ref value for the current check
    if (refreshingRef.current) return;

    setIsRefreshing(true);
    refreshingRef.current = true;

    let refreshCount = 0;
    const maxRefreshes = 10;

    const refreshInterval = setInterval(() => {
      queryClient.invalidateQueries({
        queryKey: ["get-listed-nfts", options],
      });

      refreshCount++;

      if (refreshCount >= maxRefreshes) {
        clearInterval(refreshInterval);
        setIsRefreshing(false);
        refreshingRef.current = false;
      }
    }, 1000); // Every 1 second

    return () => {
      clearInterval(refreshInterval);
      setIsRefreshing(false);
      refreshingRef.current = false;
    };
  }, [queryClient, options]); // No dependency on isRefreshing

  const { data, isError, isSuccess, error, isLoading } = useQuery({
    queryKey: ["get-listed-nfts", options],
    queryFn: () => getListedNftsRequest(options),
    enabled: !!options.owner,
  });

  const nftData: {
    nfts: NFTAsset[];
  } = data?.data;

  return {
    nftData,
    isError,
    isSuccess,
    error,
    isLoading,
    startRefreshCycle,
    isRefreshing,
  };
};
