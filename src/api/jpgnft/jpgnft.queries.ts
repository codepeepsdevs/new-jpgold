import { useQuery } from "@tanstack/react-query";
import { IGetNftsByOwnerParams } from "./jpgnft.types";
import { getNftsByOwnerRequest } from "./jpgnft.apis";
import { DasApiAsset } from "@metaplex-foundation/digital-asset-standard-api";

export const useGetNftsByOwner = (options: IGetNftsByOwnerParams) => {
  const { data, isError, isSuccess, error, isLoading } = useQuery({
    queryKey: ["get-wallet-nfts", options],
    queryFn: () => getNftsByOwnerRequest(options),
  });
  const assets: DasApiAsset[] = data?.data;

  return { assets, isError, isSuccess, error, isLoading };
};
