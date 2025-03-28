"use client";

import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { AxiosError } from "axios";
import { ErrorResponse } from "@/api/type";
import ErrorToast from "@/components/toast/ErrorToast";
import SuccessToast from "@/components/toast/SuccessToast";
import { useChangePassword } from "@/api/user/user.queries";

const ChangePassword = () => {
  const schema = yup.object().shape({
    oldPassword: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    newPassword: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  type changePasswordFormData = yup.InferType<typeof schema>;

  const form = useForm<changePasswordFormData>({
    defaultValues: {
      oldPassword: "",
      newPassword: "",
    },
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const { register, handleSubmit, formState, reset } = form;
  const { errors } = formState;
  const [oldPasswordOpen, setOldPasswordOpen] = useState(false);
  const [newPasswordOpen, setNewPasswordOpen] = useState(false);

  const onError = (error: AxiosError<ErrorResponse>) => {
    const errorMessage = error?.response?.data?.message;
    const descriptions = Array.isArray(errorMessage)
      ? errorMessage
      : [errorMessage];

    ErrorToast({
      title: "Error changing password",
      descriptions: descriptions.filter(
        (msg): msg is string => msg !== undefined
      ),
    });
  };

  const onSuccess = () => {
    SuccessToast({
      title: "Password changed",
      description: "Password has been changed! 🎉.",
    });
    reset();
  };

  const {
    mutate: change,
    isPending,
    isError,
  } = useChangePassword(onError, onSuccess);
  const loading = isPending && !isError;

  const onSubmit = (data: changePasswordFormData) => {
    change(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="p-4 border border-[#E3E3E8] rounded-lg flex flex-col gap-2 dark:bg-[#1D1F1C] dark:text-white dark:border-[#3D3D3D]"
    >
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h3 className="text-lg font-bold">Password</h3>
          <p className="text-sm text-[#7F7F7F] dark:text-[#FFFFFFB2]">
            Update your password
          </p>
        </div>

        <button
          type="submit"
          className="hidden cursor-pointer rounded-3xl py-2 px-6 md:flex items-center gap-2 border border-[#9D9D9]"
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin h-4 w-4 border-2 border-t-transparent border-[#9D9D9D] rounded-full"></div>
              <p className="font-semibold">Saving...</p>
            </div>
          ) : (
            <p className=""> Save Changes</p>
          )}
        </button>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="fullName" className="font-semibold text-sm">
            Old password
          </label>

          <div className="flex items-center justify-between px-4 py-2 w-full bg-transparent rounded border border-[#D9D9D9]">
            <input
              type={oldPasswordOpen ? "text" : "password"}
              id="oldPassword"
              {...register("oldPassword")}
              className="w-full bg-transparent border-none outline-none"
            />

            <button
              type="button"
              onClick={() => setOldPasswordOpen(!oldPasswordOpen)}
              className="pl-2.5 "
            >
              {oldPasswordOpen ? (
                <AiOutlineEye cursor="pointer" />
              ) : (
                <AiOutlineEyeInvisible cursor="pointer" />
              )}
            </button>
          </div>

          {errors.oldPassword ? (
            <p className="flex self-start text-red-500 font-semibold mt-0.5 text-xs md:text-sm">
              {errors.oldPassword?.message}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="newPassword" className="font-semibold text-sm">
            New password
          </label>

          <div className="flex items-center justify-between px-4 py-2 w-full bg-transparent rounded border border-[#D9D9D9]">
            <input
              type={newPasswordOpen ? "text" : "password"}
              id="newPassword"
              {...register("newPassword")}
              className="w-full bg-transparent border-none outline-none"
            />

            <button
              type="button"
              onClick={() => setNewPasswordOpen(!newPasswordOpen)}
              className="pl-2.5 "
            >
              {newPasswordOpen ? (
                <AiOutlineEye cursor="pointer" />
              ) : (
                <AiOutlineEyeInvisible cursor="pointer" />
              )}
            </button>
          </div>

          {errors.newPassword ? (
            <p className="flex self-start text-red-500 font-semibold mt-0.5 text-xs md:text-sm">
              {errors.newPassword?.message}
            </p>
          ) : null}
        </div>
      </div>

      <button
        type="submit"
        className="md:hidden w-fit mt-5 cursor-pointer rounded-3xl py-2 px-6 flex items-center gap-2 border border-[#9D9D9]"
      >
        {loading ? (
          <div className="flex items-center gap-2">
            <div className="animate-spin h-4 w-4 border-2 border-t-transparent border-[#9D9D9D] rounded-full"></div>
            <p className="font-semibold">Saving...</p>
          </div>
        ) : (
          <p className=""> Save Changes</p>
        )}
      </button>
    </form>
  );
};

export default ChangePassword;
