import { useMutation, useQuery } from "@tanstack/react-query";
import { getUser, updateUserRequest } from "./user.apis";
import { User } from "@/constants/types";
import { AxiosError, AxiosResponse } from "axios";
import { IUpdateUser, RUpdateUser } from "./user.types";

export const useGetUser = () => {
  const { data, isError } = useQuery({
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

  return { user, isError };
};

export const useUpdateUser = (
  onError: (error: AxiosError) => void,
  onSuccess: (data: AxiosResponse<RUpdateUser>) => void
) => {
  return useMutation<AxiosResponse<RUpdateUser>, AxiosError, IUpdateUser>({
    mutationFn: updateUserRequest,
    onError,
    onSuccess,
  });
};
