import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  changePasswordRequest,
  getUser,
  ToggleTwoFactorAuthRequest,
  updateProfileImageRequest,
  updateUserRequest,
} from "./user.apis";
import { AxiosError, AxiosResponse } from "axios";
import {
  IChangePassword,
  IToggleTwoFactorAuth,
  IUpdateProfileImage,
  IUpdateUser,
  RChangePassword,
  RToggleTwoFactorAuth,
  RUpdateProfileImage,
  RUpdateUser,
} from "./user.types";
import { ErrorResponse } from "../type";
import { User } from "@/constants/types";

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
  const queryClient = useQueryClient();

  return useMutation<
    AxiosResponse<RUpdateUser>,
    AxiosError<ErrorResponse>,
    IUpdateUser
  >({
    mutationFn: updateUserRequest,
    onError,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      onSuccess(data);
    },
  });
};

export const useUpdateProfileImage = (
  onError: (error: AxiosError<ErrorResponse>) => void,
  onSuccess: (data: AxiosResponse<RUpdateProfileImage>) => void
) => {
  const queryClient = useQueryClient();

  return useMutation<
    AxiosResponse<RUpdateProfileImage>,
    AxiosError<ErrorResponse>,
    IUpdateProfileImage
  >({
    mutationFn: updateProfileImageRequest,
    onError,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      onSuccess(data);
    },
  });
};

export const useChangePassword = (
  onError: (error: AxiosError<ErrorResponse>) => void,
  onSuccess: (data: AxiosResponse<RChangePassword>) => void
) => {
  const queryClient = useQueryClient();

  return useMutation<
    AxiosResponse<RChangePassword>,
    AxiosError<ErrorResponse>,
    IChangePassword
  >({
    mutationFn: changePasswordRequest,
    onError,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      onSuccess(data);
    },
  });
};

export const useToggleTwoFactorAuth = (
  onError: (error: AxiosError<ErrorResponse>) => void,
  onSuccess: (data: AxiosResponse<RToggleTwoFactorAuth>) => void
) => {
  const queryClient = useQueryClient();

  return useMutation<
    AxiosResponse<RToggleTwoFactorAuth>,
    AxiosError<ErrorResponse>,
    IToggleTwoFactorAuth
  >({
    mutationFn: ToggleTwoFactorAuthRequest,
    onError,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      onSuccess(data);
    },
  });
};
