"use client";

import { useGetUser } from "@/api/user/user.queries";
import useUserStore from "@/store/user.store";
import { useEffect } from "react";

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { initializeAuth, isInitialized } = useUserStore();

  // Initialize query in background without blocking
  const { user, isError, isSuccess } = useGetUser();

  useEffect(() => {
    if (isSuccess && !isError) {
      initializeAuth(user);
    } else {
      initializeAuth(null);
    }
  }, [initializeAuth, user, isSuccess, isError, isInitialized]);

  return <div className="">{children}</div>;
};

export default UserProvider;
