"use client";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import useUserStore from "@/store/user.store";
import { AxiosError } from "axios";
import { ErrorResponse } from "@/api/type";
import ErrorToast from "@/components/toast/ErrorToast";
import SuccessToast from "@/components/toast/SuccessToast";
import { useUpdateUser } from "@/api/user/user.queries";

const PersonalDetails = () => {
  const { user } = useUserStore();
  const schema = yup.object().shape({
    fullname: yup.string().required("Full name is required"),
    web3Nickname: yup.string().optional(),
  });

  type personalDetailsFormData = yup.InferType<typeof schema>;

  const form = useForm<personalDetailsFormData>({
    defaultValues: {
      fullname: user?.fullname,
      web3Nickname: user?.web3Nickname,
    },
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const onError = (error: AxiosError<ErrorResponse>) => {
    const errorMessage = error?.response?.data?.message;
    const descriptions = Array.isArray(errorMessage)
      ? errorMessage
      : [errorMessage];

    ErrorToast({
      title: "Error updating",
      descriptions: descriptions.filter(
        (msg): msg is string => msg !== undefined
      ),
    });
  };

  const onSuccess = () => {
    SuccessToast({
      title: "Personal details updated",
      description: "Profile details has been updated! 🎉.",
    });
  };

  const {
    mutate: update,
    isPending,
    isError,
  } = useUpdateUser(onError, onSuccess);
  const loading = isPending && !isError;

  const onSubmit = (data: personalDetailsFormData) => {
    update(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="p-4 border border-[#E3E3E8] rounded-lg flex flex-col gap-2 dark:text-white dark:bg-[#1D1F1C] dark:border-[#3D3D3D]"
    >
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h3 className="text-lg font-bold">Personal Details</h3>
          <p className="text-sm text-[#7F7F7F] dark:text-[#FFFFFFB2]">
            Update your details
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
            Full Name
          </label>
          <input
            type="text"
            id="fullname"
            {...register("fullname")}
            className="px-4 py-2 w-full bg-transparent rounded border border-[#D9D9D9] outline-none"
          />

          {errors.fullname ? (
            <p className="flex self-start text-red-500 font-semibold mt-0.5 text-xs md:text-sm">
              {errors.fullname?.message}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="Web3Nickname" className="font-semibold text-sm">
            Web3 Nickname
          </label>
          <input
            type="text"
            id="Web3Nickname"
            {...register("web3Nickname")}
            className="px-4 py-2 w-full bg-transparent rounded border border-[#D9D9D9] outline-none"
          />

          {errors.web3Nickname ? (
            <p className="flex self-start text-red-500 font-semibold mt-0.5 text-xs md:text-sm">
              {errors.web3Nickname?.message}
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

export default PersonalDetails;
