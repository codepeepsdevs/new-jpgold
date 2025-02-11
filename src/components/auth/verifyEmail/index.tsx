"use client";

import { useVerifyEmail } from "@/api/auth/auth.queries";
import useNavigate from "@/hooks/useNavigate";
import { AxiosError } from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import SpinnerLoader from "@/components/SpinnerLoader";

const VerifyEmail = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  const onError = (error: AxiosError) => {
    console.error(error);
    toast.error("Email verification failed. Please try again.");
    navigate("/login", "replace");
  };

  const onSuccess = () => {
    toast.success("Email verified successfully!");
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
