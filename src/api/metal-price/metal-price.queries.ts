import { useQuery } from "@tanstack/react-query";
import {
  getGoldPriceRequest,
  getMetalPriceForTickerBarRequest,
} from "./metal-price.apis";
import {
  IGetMetalGoldPrice,
  MetalGoldPriceResponse,
} from "./metal-price.types";

export const useGetMetalPriceForTickerBar = (options: IGetMetalGoldPrice) => {
  const { data, isError, isSuccess, error, isLoading } = useQuery({
    queryKey: ["get-metal-price-ticker-bar", options],
    queryFn: () => getMetalPriceForTickerBarRequest(options),
  });
  const res: MetalGoldPriceResponse | undefined = data?.data;

  return { res, isError, isSuccess, error, isLoading };
};

export const useGetGoldPrice = ({ quantity }: { quantity: number }) => {
  const { data, isError, isSuccess, error, isLoading } = useQuery({
    queryKey: ["get-gold-price", { quantity }],
    queryFn: () => getGoldPriceRequest({ quantity }),
    enabled: quantity !== undefined && quantity !== null && quantity !== 0,
  });
  const value: number = data?.data;

  return { value, isError, isSuccess, error, isLoading };
};

export const useSimpleGoldPrice = (amount: number) => {
  const { value, isLoading, isError } = useGetGoldPrice({
    quantity: amount,
  });

  const loading = isLoading && !isError;

  return {
    value,
    loading,
  };
};
