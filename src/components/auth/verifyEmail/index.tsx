"use client";

import { useVerifyEmail } from "@/api/auth/auth.queries";
import useNavigate from "@/hooks/useNavigate";
import { AxiosError } from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import SpinnerLoader from "@/components/SpinnerLoader";
import SuccessToast from "@/components/toast/SuccessToast";
import ErrorToast from "@/components/toast/ErrorToast";

const VerifyEmail = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  const onError = (error: any) => {
    const descriptions = Array.isArray(error?.response?.data?.message)
      ? error?.response?.data?.message
      : [error?.response?.data?.message];

    ErrorToast({
      title: "Verification Failed",
      descriptions,
    });
    navigate("/login", "replace");
  };

  const onSuccess = () => {
    SuccessToast({
      title: "Email Verified Successfully",
      description:
        "Your email has been confirmed. You can now log in to your account.",
    });
    navigate("/login", "replace");
  };

  const { mutate: verifyEmail, isPending } = useVerifyEmail(onError, onSuccess);

  useEffect(() => {
    if (!token) {
      navigate("/login", "replace");
      return;
    }

    verifyEmail({ token });
  }, [token, verifyEmail, navigate]);

  if (isPending) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <SpinnerLoader width={40} height={40} color="#CC8F00" />
      </div>
    );
  }

  return null;
};

export default VerifyEmail;
