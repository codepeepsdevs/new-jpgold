"use client";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Cookies from "js-cookie";
import useNavigate from "@/hooks/useNavigate";
import useUserStore from "@/store/user.store";
import SpinnerLoader from "@/components/SpinnerLoader";
import { getReturnPath } from "@/utils/utilityFunctions";

const OAuthSuccessRedirect = () => {
  const navigate = useNavigate();
  const searchParams = useSearchParams();
  const { user, setAnonymous, setIsLoggedIn } = useUserStore();

  const returnPath = getReturnPath();

  useEffect(() => {
    const accessToken = searchParams.get("accessToken");

    if (accessToken) {
      Cookies.set("accessToken", accessToken);

      if (user) {
        setIsLoggedIn(true);
        setAnonymous(false);
        navigate(returnPath, "replace");
      }
    }
  }, [searchParams, navigate, user, returnPath, setAnonymous, setIsLoggedIn]);

  return (
    <div className="fixed inset-0 flex flex-col  items-center justify-center bg-white dark:bg-black z-50 min-h-screen">
      <SpinnerLoader width={85} height={80} color="#FFB845" />
    </div>
  );
};

export default OAuthSuccessRedirect;
