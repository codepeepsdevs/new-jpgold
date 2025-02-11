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
    mode: "onChange",
  });

  const { register, handleSubmit, formState, reset, setValue } = form;
  const { errors, isValid } = formState;

  const onSubmit = () => {
    setSentMessage("Password reset email sent successfully");
    setTimeout(() => {
      setSentMessage("");
    }, 5000);
  };

  const navigate = useNavigate();

  const [sentMessage, setSentMessage] = useState<string>("");

  return (
    <div className="w-full flex justify-center">
      <div className="flex justify-center w-[90%] sm:w-[70%] md:w-[60%] lg:w-[45%] xl:w-[40%]">
        <div className="w-full flex items-center flex-col">
          <Image
            onClick={() => navigate("/", "replace")}
            src={images.logoSvg}
            alt="logo"
          />

          <div className="w-full bg-[#FFFFFF47] mt-10 flex items-center justify-center border border-[#D0D0D0] rounded-2xl py-10">
            <div className="w-[90%] sm:w-[80%] flex flex-col gap-6 items-center justify-center">
              {/* headers */}
              <div className="flex flex-col gap-1 text-center">
                <h1 className="text-2xl font-ibold">Forgot Password</h1>
                <p className="text-sm">Enter your email address</p>
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
                  containerStyles="bg-white"
                  {...register("email")}
                />

                {/* button */}
                <CustomButton
                  placeholder="Send Reset Link"
                  type="submit"
                  className="bg-[#CA8E0E] text-white py-3 md:py-4 mt-3 rounded-[5px]"
                />

                <div className="flex self-center items-center gap-2">
                  <Link href="/login" className=" text-[#CC8F00]">
                    Back to Login
                  </Link>
                </div>
              </form>
            </div>
          </div>
          <div className="mt-10">
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
