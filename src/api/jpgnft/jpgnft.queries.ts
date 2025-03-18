import { useQuery } from "@tanstack/react-query";
import { IGetNftsByOwnerParams } from "./jpgnft.types";
import { getNftsByOwnerRequest } from "./jpgnft.apis";
import { NFTAsset } from "@/constants/types";

export const useGetNftsByOwner = (options: IGetNftsByOwnerParams) => {
  const { data, isError, isSuccess, error, isLoading } = useQuery({
    queryKey: ["get-wallet-nfts", options],
    queryFn: () => getNftsByOwnerRequest(options),
    enabled: !!options.address,
  });
  const nftData: {
    nfts: NFTAsset[];
    total: number;
    limit: number;
  } = data?.data;

  return { nftData, isError, isSuccess, error, isLoading };
};
