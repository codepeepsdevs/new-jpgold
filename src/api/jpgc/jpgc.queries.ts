import { useQuery } from "@tanstack/react-query";
import { IGetTokenBalance } from "./jpgc.types";
import { getTokenBalanceRequest } from "./jpgc.apis";

export const useGetTokenBalance = (options: IGetTokenBalance) => {
  const { data, isError, isSuccess, error, isLoading } = useQuery({
    queryKey: ["get-token-balance", options],
    queryFn: () => getTokenBalanceRequest(options),
  });
  const value: number = data?.data;

  return { value, isError, isSuccess, error, isLoading };
};
