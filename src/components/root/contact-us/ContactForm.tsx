"use client";

import { useForm } from "react-hook-form";
import Image from "next/image";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTheme } from "@/store/theme.store";
import { useContactUs } from "@/api/contact-us/contact-us.queries";
import SuccessToast from "@/components/toast/SuccessToast";
import { ErrorResponse } from "@/api/type";
import { AxiosError } from "axios";
import ErrorToast from "@/components/toast/ErrorToast";
import SpinnerLoader from "@/components/SpinnerLoader";

interface ContactFormInputs {
  fullName: string;
  email: string;
  phone: string;
  message: string;
}

const schema = yup
  .object({
    fullName: yup
      .string()
      .required("Full name is required")
      .min(2, "Name must be at least 2 characters"),
    email: yup
      .string()
      .required("Email is required")
      .email("Invalid email address"),
    phone: yup
      .string()
      .required("Phone number is required")
      .matches(
        /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
        "Invalid phone number"
      ),
    message: yup
      .string()
      .required("Message is required")
      .min(10, "Message must be at least 10 characters"),
  })
  .required();

export default function ContactForm() {
  const theme = useTheme();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      message: "",
    },
    mode: "onBlur",
  });

  const onError = (error: AxiosError<ErrorResponse>) => {
    const errorMessage = error?.response?.data?.message;
    const descriptions = Array.isArray(errorMessage)
      ? errorMessage
      : [errorMessage];

    ErrorToast({
      title: "Error sending message",
      descriptions: descriptions.filter(
        (msg): msg is string => msg !== undefined
      ),
    });
  };

  const onSuccess = () => {
    SuccessToast({
      title: "Message Sent",
      description:
        "We will reach out to you shortly! Thank you for contacting us🎉.",
    });

    reset();
  };

  const {
    mutate: contactUs,
    isPending,
    isError,
  } = useContactUs(onError, onSuccess);
  const loading = isPending && !isError;

  const onSubmit = async (data: ContactFormInputs) => {
    contactUs(data);
  };

  return (
    <div
      style={{
        boxShadow:
          typeof window !== "undefined" &&
          theme === "light" &&
          window.innerWidth > 1024
            ? `0px 0px 0px 4.13px #F3F4F7,
             0px 0px 0px 3.61px #F9F9FB,
             0px 0px 0px 1.03px #E4E5E999,
             0px 0px 0px 0.52px #E4E5E9`
            : "none",
      }}
      className="flex flex-col gap-12 lg:bg-white lg:dark:bg-[#171718] bg-none dark:border-[#323232] rounded-xl lg:rounded-2xl lg:px-6 py-3 xs:py-5 sm:py-8 md:py-12 lg:py-14 w-full lg:border border-[#DCDCDC]"
    >
      {/* Logo */}
      <div className=" hidden lg:block">
        <Image
          src={theme === "dark" ? "/images/logo.png" : "/images/logo-dark.png"}
          alt="JPGold Logo"
          width={140}
          height={60}
          className="mx-auto"
        />
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 w-full lg:w-[90%] mx-auto text-black dark:text-white"
      >
        {/* Full Name */}
        <div>
          <label className="block text-[#1F2130] dark:text-white font-semibold mb-1">
            Full Name
          </label>
          <input
            type="text"
            {...register("fullName")}
            className="w-full px-4 py-3 border border-[#E3E3E8] dark:border-[#6F6F6F] dark:bg-transparent rounded-lg focus:outline-none focus:border-[#CC8F00]"
            placeholder="Femi idowu"
          />
          {errors.fullName && (
            <p className="mt-1 text-sm text-red-500">
              {errors.fullName.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-[#1F2130] dark:text-white font-semibold mb-1">
            Email Address
          </label>
          <input
            type="email"
            {...register("email")}
            className="w-full px-4 py-3 border border-[#E3E3E8] dark:border-[#6F6F6F] dark:bg-transparent rounded-lg focus:outline-none focus:border-[#CC8F00]"
            placeholder="femiidowu@gmail.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-[#1F2130] dark:text-white font-semibold mb-1">
            Phone
          </label>
          <input
            type="tel"
            {...register("phone")}
            className="w-full px-4 py-3 border border-[#E3E3E8] dark:border-[#6F6F6F] dark:bg-transparent rounded-lg focus:outline-none focus:border-[#CC8F00]"
            placeholder="+234 807 6775"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
          )}
        </div>

        {/* Message */}
        <div>
          <label className="block text-[#1F2130] dark:text-white font-semibold mb-1">
            Message
          </label>
          <textarea
            {...register("message")}
            rows={4}
            className="w-full px-4 py-3 border border-[#E3E3E8] dark:border-[#6F6F6F] dark:bg-transparent rounded-lg focus:outline-none focus:border-[#CC8F00] resize-none"
            placeholder="Hi, Would like to check the availability the property.&#10;Please acknowledge.&#10;Thank you!"
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-500">
              {errors.message.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#CC8F00] text-white py-4 rounded-lg hover:bg-[#B37E00] transition-colors"
        >
          {loading ? (
            <SpinnerLoader width={25} height={25} color="#FFB845" />
          ) : (
            "Submit"
          )}{" "}
        </button>
      </form>
    </div>
  );
}
