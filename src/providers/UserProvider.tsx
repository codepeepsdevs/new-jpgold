"use client";

import { useGetUser } from "@/api/user/user.queries";
import { useSetThemeMode } from "@/store/theme.store";
import useUserStore from "@/store/user.store";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

interface ApiError {
  response?: {
    status: number;
  };
}

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { initializeAuth, isInitialized } = useUserStore();
  const pathname = usePathname();
  const setThemeMode = useSetThemeMode();

  // Initialize query in background without blocking
  const { user, isSuccess, error } = useGetUser();

  const isApiError = (error: unknown): error is ApiError => {
    return error !== null && typeof error === "object" && "response" in error;
  };

  useEffect(() => {
    if (isSuccess) {
      initializeAuth(user);
    } else if (error && isApiError(error) && error.response?.status === 401) {
      initializeAuth(null);
    }
  }, [initializeAuth, user, isSuccess, error, isInitialized, pathname]);

  // Automatic theme switching based on time - always on
  useEffect(() => {
    const updateThemeBasedOnTime = () => {
      const currentHour = new Date().getHours();
      // Switch to dark theme at 7 PM (19) and light theme at 7 AM (7)
      if (currentHour >= 19 || currentHour < 7) {
        setThemeMode("dark");
      } else {
        setThemeMode("light");
      }
    };

    // Initial check
    updateThemeBasedOnTime();

    // Set up interval to check time regularly
    const intervalId = setInterval(updateThemeBasedOnTime, 60000); // Check every minute

    return () => {
      clearInterval(intervalId);
    };
  }, [setThemeMode]);

  return <div className="">{children}</div>;
};

export default UserProvider;
