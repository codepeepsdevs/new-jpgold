"use client";

import useNavigate from "@/hooks/useNavigate";
import useUserStore from "@/store/user.store";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function UserProtectionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { anonymous, isInitialized, isLoggedIn } = useUserStore();
  const navigate = useNavigate();
  const pathname = usePathname();

  useEffect(() => {
    if (isInitialized) {
      if (!isLoggedIn && !anonymous) {
        if (typeof window !== "undefined" && pathname !== "/login") {
          localStorage.setItem("returnPath", pathname);
        }
        navigate("/login", "push");
      }
    }
  }, [anonymous, navigate, pathname, , isInitialized, isLoggedIn]);

  if (!isInitialized) {
    return null;
  }

  return <>{children}</>;
}
