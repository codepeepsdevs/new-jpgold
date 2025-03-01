import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getUser,
  ToggleTwoFactorAuthRequest,
  updateUserRequest,
} from "./user.apis";
import { AxiosError, AxiosResponse } from "axios";
import {
  IToggleTwoFactorAuth,
  IUpdateUser,
  RToggleTwoFactorAuth,
  RUpdateUser,
} from "./user.types";
import { ErrorResponse, User } from "../type";

export const useGetUser = () => {
  const { data, isError, isSuccess, error } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    // Run in the background
    refetchOnWindowFocus: true,
    // Refetch every 5 minutes
    refetchInterval: 5 * 60 * 1000,
    // Keep fetching even when window/tab is not active
    refetchIntervalInBackground: true,
    // Prevent unnecessary loading states
    staleTime: 30 * 1000, // Consider data fresh for 30 seconds
    // If error occurs, retry once
    retry: 1,
  });
  const user: User = data?.data;

  return { user, isError, isSuccess, error };
};

export const useUpdateUser = (
  onError: (error: AxiosError<ErrorResponse>) => void,
  onSuccess: (data: AxiosResponse<RUpdateUser>) => void
) => {
  return useMutation<
    AxiosResponse<RUpdateUser>,
    AxiosError<ErrorResponse>,
    IUpdateUser
  >({
    mutationFn: updateUserRequest,
    onError,
    onSuccess,
  });
};

export const useToggleTwoFactorAuth = (
  onError: (error: AxiosError<ErrorResponse>) => void,
  onSuccess: (data: AxiosResponse<RToggleTwoFactorAuth>) => void
) => {
  return useMutation<
    AxiosResponse<RToggleTwoFactorAuth>,
    AxiosError<ErrorResponse>,
    IToggleTwoFactorAuth
  >({
    mutationFn: ToggleTwoFactorAuthRequest,
    onError,
    onSuccess,
  });
};
