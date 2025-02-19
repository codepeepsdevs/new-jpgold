"use client";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

const PersonalDetails = () => {
  const schema = yup.object().shape({
    fullName: yup.string().required("Full name is required"),
    Web3Nickname: yup.string().optional(),
  });

  type personalDetailsFormData = yup.InferType<typeof schema>;

  const form = useForm<personalDetailsFormData>({
    defaultValues: {
      fullName: "Bruce Wayne",
      Web3Nickname: "",
    },
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = (data: personalDetailsFormData) => {
    console.log(data);
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
          Save Changes
        </button>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="fullName" className="font-semibold text-sm">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            {...register("fullName")}
            className="px-4 py-2 w-full bg-transparent rounded border border-[#D9D9D9] outline-none"
          />

          {errors.fullName ? (
            <p className="flex self-start text-red-500 font-semibold mt-0.5 text-xs md:text-sm">
              {errors.fullName?.message}
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
            {...register("Web3Nickname")}
            className="px-4 py-2 w-full bg-transparent rounded border border-[#D9D9D9] outline-none"
          />

          {errors.Web3Nickname ? (
            <p className="flex self-start text-red-500 font-semibold mt-0.5 text-xs md:text-sm">
              {errors.Web3Nickname?.message}
            </p>
          ) : null}
        </div>
      </div>

      <button
        type="submit"
        className="md:hidden w-fit mt-5 cursor-pointer rounded-3xl py-2 px-6 flex items-center gap-2 border border-[#9D9D9]"
      >
        Save Changes
      </button>
    </form>
  );
};

export default PersonalDetails;
