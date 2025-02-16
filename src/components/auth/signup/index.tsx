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
import { useRegister } from "@/api/auth/auth.queries";
import SuccessToast from "@/components/toast/SuccessToast";
import ErrorToast from "@/components/toast/ErrorToast";
import { useTheme } from "@/store/theme.store";
import { FaArrowRightLong } from "react-icons/fa6";
import AuthButtons from "../AuthButtons";
import { AxiosError } from "axios";
import { ErrorResponse } from "@/api/type";

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
    mode: "onBlur",
  });

  const theme = useTheme();
  const navigate = useNavigate();
  const { register, handleSubmit, formState, reset } = form;
  const { errors, isValid } = formState;

  const onError = (error: AxiosError<ErrorResponse>) => {
    const errorMessage = error?.response?.data?.message;
    const descriptions = Array.isArray(errorMessage)
      ? errorMessage
      : [errorMessage];

    ErrorToast({
      title: "Error during registration",
      descriptions: descriptions.filter(
        (msg): msg is string => msg !== undefined
      ),
    });
  };

  const onSuccess = () => {
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
            className="cursor-pointer"
          />
          <div className="w-full bg-[#FFFFFF47] dark:text-white dark:bg-[#00000033] mt-10 flex items-center justify-center border border-[#D0D0D0] dark:border-[#E3E3E826] rounded-2xl py-10">
            <div className="w-[90%] sm:w-[80%] flex flex-col gap-6 items-center justify-center">
              {/* headers */}
              <div className="flex flex-col gap-1 text-center">
                <h1 className="text-2xl xs:text-3xl font-ibold">
                  Get Started!
                </h1>
                <p className="text-sm xs:text-base dark:text-[#FFFFFFA6]">
                  Create an account
                </p>
              </div>

              <div className="w-full flex flex-col gap-4">
                <AuthButtons googleLogin={() => {}} facebookLogin={() => {}} />
                <div
                  onClick={() => navigate("/user/dashboard", "replace")}
                  className="w-full flex items-center justify-center py-2.5 gap-2 border border-[#E6E6E6] dark:text-[#323232] bg-[#E6E6E6] rounded cursor-pointer"
                >
                  <p className="font-semibold text-sm">Continue Anonymously</p>
                  <FaArrowRightLong />
                </div>
              </div>

              <div className="w-full flex items-center justify-center self-center border-[#C2C2C2]">
                <hr
                  className={classNames(
                    "flex-1 border-[#C2C2C2] dark:border-[#3D3D3D]",
                    {
                      // "border-[#2B2B2B]": dark,
                      // "border-[#D7D7D7]": !dark,
                    }
                  )}
                />
                <span
                  className={classNames(
                    "px-3 font-bold text-xs md:text-sm text-[#757575] dark:[#757575]",
                    {
                      // "text-[#BBBBBB]": dark,
                      // "text-[#D7D7D7]": !dark,
                    }
                  )}
                >
                  OR
                </span>
                <hr
                  className={classNames(
                    "flex-1 border-[#C2C2C2] dark:border-[#3D3D3D]",
                    {
                      // "border-[#2B2B2B]": dark,
                      // "border-[#D7D7D7]": !dark,
                    }
                  )}
                />
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
                    "py-3.5 mt-3": true,
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
