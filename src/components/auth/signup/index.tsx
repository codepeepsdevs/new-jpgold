"use client";

import React from "react";
import Image from "next/image";
import images from "@/public/images";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import AuthInput from "../AuthInput";
import Link from "next/link";
import CustomButton from "@/components/CustomButton";
import useNavigate from "@/hooks/useNavigate";
import classNames from "classnames";
import { AxiosError, AxiosResponse } from "axios";
import { RRegister } from "@/api/auth/auth.types";
import { useRegister } from "@/api/auth/auth.queries";
import SuccessToast from "@/components/toast/SuccessToast";
import ErrorToast from "@/components/toast/ErrorToast";
import { useTheme } from "@/store/theme.store";

const schema = yup.object().shape({
  fullName: yup.string().required("Full Name is required"),
  email: yup
    .string()
    .email("Email format is not valid")
    .required("Email is required"),

  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

type SignupFormData = yup.InferType<typeof schema>;

const Signup = () => {
  const form = useForm<SignupFormData>({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const theme = useTheme();
  const navigate = useNavigate();
  const { register, handleSubmit, formState, reset, setValue } = form;
  const { errors, isValid } = formState;

  const onError = (error: any) => {
    const errorMessage = error?.response?.data?.message;
    const descriptions = Array.isArray(errorMessage)
      ? errorMessage
      : [errorMessage];

    ErrorToast({
      title: "Error during registration",
      descriptions,
    });
  };

  const onSuccess = (data: AxiosResponse<RRegister>) => {
    // const user = data?.data?.user;

    SuccessToast({
      title: "Registration successful!",
      description:
        "Congratulations on your successful registration! 🎉. Please verify your email to continue.",
    });

    navigate("/login", "replace");
    reset();
  };

  const { mutate: registerUser, isPending } = useRegister(onError, onSuccess);

  const onSubmit = (data: SignupFormData) => {
    registerUser(data);
  };

  return (
    <div className="w-full flex justify-center">
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
                <h1 className="text-2xl font-ibold">Get Started!</h1>
                <p className="text-sm dark:text-[#FFFFFFA6]">
                  create an account
                </p>
              </div>

              {/* form */}
              <form
                className="flex flex-col justify-start items-start w-full gap-4"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
              >
                <AuthInput
                  id="fullName"
                  label="Full Name"
                  type="text"
                  htmlFor="fullName"
                  placeholder="Enter your full name"
                  error={errors.email?.message}
                  {...register("fullName")}
                />

                <AuthInput
                  id="email"
                  label="Email Address"
                  type="email"
                  htmlFor="email"
                  placeholder="Email"
                  error={errors.email?.message}
                  {...register("email")}
                />

                <AuthInput
                  id="password"
                  label="Password"
                  type="password"
                  htmlFor="password"
                  placeholder="Password"
                  autoComplete="off"
                  error={errors.password?.message}
                  {...register("password")}
                />

                <span className="text-xs md:text-sm">
                  By continuing, you agree to Japual Gold
                  <Link href="/terms" className="ml-1 text-[#CC8F00]">
                    Terms and Policy
                  </Link>
                </span>

                {/* button */}
                <CustomButton
                  placeholder="Create Account"
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
          <div className="mt-10 dark:text-[#FFFFFFCC]">
            You already have an account?{" "}
            <Link href="/login" className=" text-[#CC8F00]">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
