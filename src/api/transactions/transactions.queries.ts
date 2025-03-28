import { useMutation, useQuery } from "@tanstack/react-query";

import { ErrorResponse } from "../type";
import { AxiosError, AxiosResponse } from "axios";
import {
  ICreateTrx,
  IGetTransactionsParams,
  IUpdateTrx,
  RCreateTrx,
  RUpdateTrx,
} from "./transactions.types";
import {
  createTrxRequest,
  getTransactionsRequest,
  updateTrxRequest,
} from "./transactions.apis";
import { TransactionProps } from "@/constants/types";

export const useCreateTrx = (
  onSuccess: (data: AxiosResponse<RCreateTrx>) => void
) => {
  return useMutation<
    AxiosResponse<RCreateTrx>,
    AxiosError<ErrorResponse>,
    ICreateTrx
  >({
    mutationFn: createTrxRequest,

    onSuccess,
  });
};

export const useUpdateTrx = () => {
  return useMutation<
    AxiosResponse<RUpdateTrx>,
    AxiosError<ErrorResponse>,
    IUpdateTrx
  >({
    mutationFn: updateTrxRequest,
  });
};

export const useGetTransactions = (params: IGetTransactionsParams) => {
  const { data, isError, isSuccess, error, isLoading } = useQuery({
    queryKey: ["get-transactions", params],
    queryFn: () => getTransactionsRequest(params),
  });
  const transactionData: {
    data: TransactionProps[];
    meta: {
      currentPage: number;
      pageSize: number;
      totalCount: number;
      totalPages: number;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
    };
  } = data?.data;

  return { transactionData, isError, isSuccess, error, isLoading };
};
