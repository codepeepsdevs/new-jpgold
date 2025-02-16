"use client";

import CustomButton from "@/components/CustomButton";
import Link from "next/link";
import React, { useState } from "react";
import * as yup from "yup";
import AuthInput from "../AuthInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Image from "next/image";
import images from "@/public/images";
import useNavigate from "@/hooks/useNavigate";
import classNames from "classnames";
import { useForgotPassword } from "@/api/auth/auth.queries";
import ErrorToast from "@/components/toast/ErrorToast";
import { useTheme } from "@/store/theme.store";
import { AxiosError } from "axios";
import { ErrorResponse } from "@/api/type";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Email format is not valid")
    .required("Email is required"),
});

type ForgotPasswordFormData = yup.InferType<typeof schema>;

const ForgotPassword = () => {
  const form = useForm<ForgotPasswordFormData>({
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const { register, handleSubmit, formState, reset } = form;
  const { errors, isValid } = formState;

  const onError = (error: AxiosError<ErrorResponse>) => {
    const errorMessage = error?.response?.data?.message;
    const descriptions = Array.isArray(errorMessage)
      ? errorMessage
      : [errorMessage];

    ErrorToast({
      title: "Password Reset Failed",
      descriptions: descriptions.filter(
        (msg): msg is string => msg !== undefined
      ),
    });
  };

  const onSuccess = () => {
    setSentMessage("Password reset email sent successfully");
    reset();
    setTimeout(() => {
      setSentMessage("");
    }, 5000);
  };

  const { mutate: sendResetPasswordEmail, isPending } = useForgotPassword(
    onError,
    onSuccess
  );

  const onSubmit = (formData: ForgotPasswordFormData) => {
    sendResetPasswordEmail(formData);
  };

  const navigate = useNavigate();
  const theme = useTheme();

  const [sentMessage, setSentMessage] = useState<string>("");

  return (
    <div className="w-full flex justify-center">
      <div className="flex justify-center w-[90%] sm:w-[70%] md:w-[60%] lg:w-[45%] xl:w-[40%]">
        <div className="w-full flex items-center flex-col">
          <Image
            onClick={() => navigate("/", "replace")}
            src={theme === "light" ? images.logoSvg : images.logoDarkSvg}
            alt="logo"
            className="cursor-pointer"
          />
          <div className="w-full bg-[#FFFFFF47] dark:text-white dark:bg-[#00000033] mt-10 flex items-center justify-center border border-[#D0D0D0] dark:border-[#E3E3E826] rounded-2xl py-10">
            <div className="w-[90%] sm:w-[80%] flex flex-col gap-6 items-center justify-center">
              {/* headers */}
              <div className="flex flex-col gap-1 text-center">
                <h1 className="text-2xl xs:text-3xl font-ibold">
                  Forgot Password
                </h1>
                <p className="text-sm xs:text-base dark:text-[#FFFFFFA6]">
                  Enter your email address
                </p>
              </div>

              {/* form */}
              <form
                className="flex mt-5 flex-col justify-start items-start w-full gap-4"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
              >
                <AuthInput
                  id="email"
                  label="Email Address"
                  type="email"
                  htmlFor="email"
                  placeholder="Email"
                  error={errors.email?.message}
                  sent={sentMessage}
                  containerStyles="bg-white dark:bg-transparent dark:border-[#3D3D3D]"
                  {...register("email")}
                />
                {/* button */}
                <CustomButton
                  placeholder="Send Reset Link"
                  type="submit"
                  loading={isPending}
                  className={classNames({
                    "py-3.5 mt-3": true,
                    "bg-[#CA8E0E] text-white": isValid,
                    "bg-[#E6E6E6] text-[#323232]": !isValid,
                  })}
                />
                <div className="flex self-center items-center gap-2">
                  <Link
                    href="/login"
                    className="font-bold text-[#000000] dark:text-white"
                  >
                    Back to Login
                  </Link>
                </div>
              </form>
            </div>
          </div>
          <div className="mt-10 dark:text-[#FFFFFFCC]">
            Don’t have an account?{" "}
            <Link href="/signup" className=" text-[#CC8F00]">
              Signup
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
