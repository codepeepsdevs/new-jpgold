"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import useNavigate from "@/hooks/useNavigate";
import images from "@/public/images";
import OtpInput from "react-otp-input";
import CustomButton from "@/components/CustomButton";
import classNames from "classnames";
import { useVerifyTwoFa } from "@/api/auth/auth.queries";
import SuccessToast from "@/components/toast/SuccessToast";
import ErrorToast from "@/components/toast/ErrorToast";
import useAuthEmailStore from "@/store/authEmail.store";
import { useRouter } from "next/navigation";
import useUserStore from "@/store/user.store";
import Cookies from "js-cookie";
import { AxiosResponse } from "axios";
import { RVerifyTwoFa } from "@/api/auth/auth.types";
import { useTheme } from "@/store/theme.store";

const TwoFa = () => {
  const navigate = useNavigate();
  const router = useRouter();

  const { authEmail } = useAuthEmailStore();
  const { setUser } = useUserStore();

  const [code, setCode] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(false);

  const theme = useTheme();
  const handlePaste: React.ClipboardEventHandler = (event) => {
    const data = event.clipboardData.getData("text").slice(0, 6); // Get first 6 characters
    setCode(data);
  };

  const onError = (error: any) => {
    const errorMessage = error?.response?.data?.message;
    const descriptions = Array.isArray(errorMessage)
      ? errorMessage
      : [errorMessage];

    ErrorToast({
      title: "Verification Failed",
      descriptions,
    });

    navigate("/login", "replace");
  };

  const onSuccess = (data: AxiosResponse<RVerifyTwoFa>) => {
    Cookies.set("accessToken", data?.data?.accessToken);
    setUser(data?.data?.user);
    SuccessToast({
      title: "Two-Factor Authentication Complete",
      description:
        "Your identity has been verified successfully. Welcome back!",
    });
    const redirectPath = "/user/dashboard";

    navigate(redirectPath, "replace");
    setCode("");
  };

  const { mutate: verifyTwoFa, isPending } = useVerifyTwoFa(onError, onSuccess);

  useEffect(() => {
    if (!authEmail) {
      router.back();
    }
  }, [authEmail, navigate]);

  if (!authEmail) {
    return null;
  }

  const handleVerify = () => {
    verifyTwoFa({
      email: authEmail,
      otpCode: code,
    });
  };

  return (
    <div className="w-full flex justify-center">
      <div className="flex justify-center w-[90%] sm:w-[70%] md:w-[60%] lg:w-[40%] xl:w-[35%]">
        <div className="w-full flex items-center flex-col">
          <Image
            onClick={() => navigate("/", "replace")}
            src={theme === "light" ? images.logoSvg : images.logoDarkSvg}
            alt="logo"
          />

          <div className="w-full bg-[#FFFFFF47] dark:text-white dark:bg-[#00000033] mt-10 flex items-center justify-center border border-[#D0D0D0] dark:border-[#E3E3E826] rounded-2xl py-10">
            <div className="w-[90%] sm:w-[80%] flex flex-col gap-6 items-center justify-center">
              {/* headers */}
              <div className="flex flex-col items-center gap-1 text-center">
                <h1 className="w-[70%] flex self-center md:w-[40%] text-2xl font-ibold">
                  Two-Factor Authentication
                </h1>
                <p className="w-[80%] text-sm dark:text-[#FFFFFFA6]">
                  Please check your email for the 6-digit security code to
                  continue
                </p>
              </div>

              <div className="flex mt-5 flex-col justify-start items-start w-full gap-4">
                <OtpInput
                  value={code}
                  onChange={(props) => {
                    setCode(props);
                    // Check if all 6 digits are entered
                    if (props.length === 6) {
                      setIsValid(true);
                    } else {
                      setIsValid(false);
                    }
                  }}
                  onPaste={handlePaste}
                  numInputs={6}
                  renderSeparator={<span className="w-2 2xs:w-3 xs:w-4"></span>}
                  containerStyle={{}}
                  skipDefaultStyles
                  inputType="number"
                  renderInput={(props) => (
                    <input
                      {...props}
                      className="w-10 h-10 2xs:w-12 2xs:h-12 bg-transparent border-[1.03px] dark:border-[#3D3D3D] rounded-md text-base 2xs:text-lg text-text-700 dark:text-text-400 text-center font-medium outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                  )}
                />

                {/* button */}
                <CustomButton
                  placeholder="Verify"
                  type="button"
                  onClick={handleVerify}
                  loading={isPending}
                  disabled={!isValid}
                  className={classNames({
                    "py-3 mt-3 rounded-[5px]": true,
                    "bg-[#CA8E0E] text-white": isValid,
                    "bg-[#E6E6E6] disabled:bg-[#E6E6E6] text-[#323232]":
                      !isValid,
                  })}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwoFa;
