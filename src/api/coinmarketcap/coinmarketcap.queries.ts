import { useQuery } from "@tanstack/react-query";
import { getTokenPriceRequest } from "./coinmarketcap.apis";

export const useGetTokenPrice = ({
  symbol = "SOL",
  amount,
}: {
  symbol?: string;
  amount: number;
}) => {
  const { data, isError, isSuccess, error, isLoading } = useQuery({
    queryKey: ["get-token-price", { symbol, amount }],
    queryFn: () => getTokenPriceRequest({ symbol, amount }),
    enabled: !!symbol && !!amount,
  });
  const priceData: {
    rate: number;
    symbol: string;
    value: number;
  } = data?.data;

  return { priceData, isError, isSuccess, error, isLoading };
};

export const useSimpleTokenPrice = (amount: number, symbol?: string) => {
  const { priceData, isLoading, isError } = useGetTokenPrice({
    amount,
    symbol,
  });

  const loading = isLoading && !isError;

  return {
    tokenPrice: priceData?.value,
    symbol: priceData?.symbol,
    loading,
  };
};
