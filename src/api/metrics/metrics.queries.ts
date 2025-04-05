import { useQuery } from "@tanstack/react-query";
import { IGetMetrics } from "./metrics.types";
import { getMetricsRequest } from "./metrics.apis";

export const useGetMetrics = (params: IGetMetrics) => {
  const { data, isError, isSuccess, error, isLoading } = useQuery({
    queryKey: ["get-metrics", params],
    queryFn: () => getMetricsRequest(params),
    enabled: !!params.walletAddress && !!params.network,
  });
  const metrics: {
    totalNfts: number;
    listedNfts: number;
    privateNfts: number;
    tokenBalance: number;
    proceedsData: number[];
  } = data?.data;

  return { metrics, isError, isSuccess, error, isLoading };
};
