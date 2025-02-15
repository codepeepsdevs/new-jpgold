"use client";

import useNavigate from "@/hooks/useNavigate";
import Cookies from "js-cookie";
import { useEffect } from "react";

export function AuthenticationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const accessToken = Cookies.get("accessToken");
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      navigate("/login", "replace");
    }
  }, [accessToken, navigate]);

  return <>{children}</>;
}
