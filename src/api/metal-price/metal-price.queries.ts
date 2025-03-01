import { useQuery } from "@tanstack/react-query";
import { getMetaGoldPriceRequest } from "./metal-price.apis";
import {
  IGetMetalGoldPrice,
  MetalGoldPriceResponse,
} from "./metal-price.types";

export const useGetMetalGoldPrice = (options: IGetMetalGoldPrice) => {
  const { data, isError, isSuccess, error, isLoading } = useQuery({
    queryKey: ["get-metal-gold-price", options],
    queryFn: () => getMetaGoldPriceRequest(options),
  });
  const res: MetalGoldPriceResponse | undefined = data?.data;

  return { res, isError, isSuccess, error, isLoading };
};
