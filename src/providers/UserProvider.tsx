"use client";

import useNavigate from "@/hooks/useNavigate";
import Cookies from "js-cookie";
import { useEffect } from "react";

export function UserProvider({ children }: { children: React.ReactNode }) {
  const accessToken = Cookies.get("accessToken");
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      navigate("/user/dashboard", "replace");
    }
  }, [accessToken, navigate]);

  return <>{children}</>;
}
