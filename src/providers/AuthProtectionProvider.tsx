"use client";

import useNavigate from "@/hooks/useNavigate";
import useUserStore from "@/store/user.store";
import { getReturnPath } from "@/utils/utilityFunctions";
import { useEffect } from "react";

export function AuthProtectionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoggedIn, anonymous, isInitialized } = useUserStore(); // Add isInitialized to your store
  const navigate = useNavigate();

  const returnPath = getReturnPath();

  useEffect(() => {
    if (isInitialized && isLoggedIn && !anonymous) {
      navigate(returnPath, "replace");
    }
  }, [isLoggedIn, anonymous, navigate, isInitialized, returnPath]);

  if (!isInitialized) {
    return null;
  }

  return <>{children}</>;
}
