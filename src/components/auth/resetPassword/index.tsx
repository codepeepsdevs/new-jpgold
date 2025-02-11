"use client";

import React from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Image from "next/image";
import images from "@/public/images";
import AuthInput from "../AuthInput";
import CustomButton from "@/components/CustomButton";
import useNavigate from "@/hooks/useNavigate";
import classNames from "classnames";

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

  const { register, handleSubmit, formState, reset, setValue } = form;
  const { errors, isValid } = formState;

  const onSubmit = () => {};

  const navigate = useNavigate();

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
                <h1 className="text-2xl font-ibold">Change your password</h1>
                <p className="text-sm w-[90%] flex self-center">
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
                  containerStyles="bg-white"
                  error={errors.password?.message}
                  {...register("password")}
                />

                <AuthInput
                  id="confirmPassword"
                  label="Confirm password"
                  type="password"
                  htmlFor="password"
                  placeholder=""
                  containerStyles="bg-white"
                  error={errors.confirmPassword?.message}
                  {...register("confirmPassword")}
                />

                {/* button */}
                <CustomButton
                  placeholder="Change Password"
                  type="submit"
                  className={classNames({
                    "py-3 md:py-4 mt-3 rounded-[5px]": true,
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
