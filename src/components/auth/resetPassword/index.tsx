"use client";

import React, { useEffect } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Image from "next/image";
import images from "@/public/images";
import AuthInput from "../AuthInput";
import CustomButton from "@/components/CustomButton";
import useNavigate from "@/hooks/useNavigate";
import classNames from "classnames";
import { useResetPassword } from "@/api/auth/auth.queries";
import SuccessToast from "@/components/toast/SuccessToast";
import ErrorToast from "@/components/toast/ErrorToast";
import { useSearchParams } from "next/navigation";
import { useTheme } from "@/store/theme.store";

const schema = yup.object().shape({
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match")
    .required("Confirm password is required"),
});

type ResetPasswordFormData = yup.InferType<typeof schema>;

const ResetPassword = () => {
  const form = useForm<ResetPasswordFormData>({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const theme = useTheme();
  const navigate = useNavigate();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onError = (error: any) => {
    const errorMessage = error?.response?.data?.message;
    const descriptions = Array.isArray(errorMessage)
      ? errorMessage
      : [errorMessage];

    ErrorToast({
      title: "Password Reset Failed",
      descriptions,
    });

    navigate("/login", "replace");
  };

  const onSuccess = () => {
    reset();
    SuccessToast({
      title: "Password reset successful",
      description: "Please login to continue",
    });

    navigate("/login", "replace");
  };

  const { mutate: resetPassword, isPending } = useResetPassword(
    onError,
    onSuccess
  );
  const { register, handleSubmit, formState, reset, setValue } = form;
  const { errors, isValid } = formState;

  const onSubmit = (formData: ResetPasswordFormData) => {
    resetPassword({
      token: token as string,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    });
  };

  //handle empty token
  useEffect(() => {
    if (!token) {
      navigate("/login", "replace");
    }
  }, [token, navigate]);

  if (!token) {
    return null;
  }

  return (
    <div className="bg-[#F7F7F7] dark:bg-[#232323] py-10 pt-16 w-full flex justify-center">
      <div className="flex justify-center w-[90%] sm:w-[70%] md:w-[60%] lg:w-[45%] xl:w-[40%]">
        <div className="w-full flex items-center flex-col">
          <Image
            onClick={() => navigate("/", "replace")}
            src={theme === "light" ? images.logoSvg : images.logoDarkSvg}
            alt="logo"
          />

          <div className="w-full bg-[#FFFFFF47] dark:text-white dark:bg-[#00000033] mt-10 flex items-center justify-center border border-[#D0D0D0] dark:border-[#E3E3E826] rounded-2xl py-10">
            <div className="w-[90%] sm:w-[80%] flex flex-col gap-6 items-center justify-center">
              {/* headers */}
              <div className="flex flex-col gap-1 text-center">
                <h1 className="text-2xl font-ibold">Change your password</h1>
                <p className="text-sm w-[90%] flex self-center dark:text-[#FFFFFFA6]">
                  Enter a new password below to change your password
                </p>
              </div>

              {/* form */}
              <form
                className="flex mt-5 flex-col justify-start items-start w-full gap-4"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
              >
                <AuthInput
                  id="password"
                  label="Password"
                  type="password"
                  htmlFor="password"
                  placeholder=""
                  containerStyles="bg-white dark:bg-transparent dark:border-[#3D3D3D]"
                  error={errors.password?.message}
                  {...register("password")}
                />

                <AuthInput
                  id="confirmPassword"
                  label="Confirm password"
                  type="password"
                  htmlFor="password"
                  placeholder=""
                  containerStyles="bg-white dark:bg-transparent dark:border-[#3D3D3D]"
                  error={errors.confirmPassword?.message}
                  {...register("confirmPassword")}
                />

                {/* button */}
                <CustomButton
                  placeholder="Change Password"
                  type="submit"
                  loading={isPending}
                  className={classNames({
                    "py-3 mt-3 rounded-[5px]": true,
                    "bg-[#CA8E0E] text-white": isValid,
                    "bg-[#E6E6E6] text-[#323232]": !isValid,
                  })}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
