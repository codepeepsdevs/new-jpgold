"use client";

import React, { useState, forwardRef, InputHTMLAttributes } from "react";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";
import Image from "next/image";
import images from "@/public/icons/index";

type AuthInputProps = {
  id: string;
  label: string;
  htmlFor?: string;
  type?: string;
  forgotPassword?: boolean;
  placeholder?: string;
  error?: string;
  sent?: string;
  disabled?: boolean;
  required?: boolean;
  containerStyles?: string;
  [
    key: string
  ]: InputHTMLAttributes<HTMLInputElement>[keyof InputHTMLAttributes<HTMLInputElement>];
};

const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(
  (
    {
      id,
      type = "text",
      placeholder,
      error,
      disabled,
      required,
      label,
      htmlFor,
      containerStyles,
      sent,
      ...props
    },
    ref
  ) => {
    const [open, setOpen] = useState(false);
    const inputType =
      type === "password" && open ? "text" : type == "number" ? "text" : type;

    return (
      <div className="flex flex-col justify-center items-center gap-1 w-full text-black dark:text-white">
        <div className="w-full flex items-center justify-between">
          <label className="text-sm mb-1 flex items-start " htmlFor={htmlFor}>
            {label}
          </label>
        </div>
        <div
          className={`w-full flex gap-2 justify-center items-center bg-transparent border  dark:border-[#3D3D3D] border-[#C5C5CA] rounded-lg py-3 px-3 ${containerStyles}`}
        >
          <input
            ref={ref}
            id={id}
            className="w-full bg-transparent p-0 border-none outline-none text-sm dark:text-white placeholder:text-sm dark:placeholder:text-sm [&::-webkit-calendar-picker-indicator]:dark:invert"
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            type={inputType}
            {...props}
          />
          {type === "password" && (
            <button
              type="button"
              onClick={() => setOpen(!open)}
              className="pl-2.5 "
            >
              {open ? (
                <AiOutlineEye cursor="pointer" />
              ) : (
                <AiOutlineEyeInvisible cursor="pointer" />
              )}
            </button>
          )}
        </div>

        {error ? (
          <p className="flex self-start text-red-500 font-semibold mt-0.5 text-xs md:text-sm">
            {error}
          </p>
        ) : null}

        {sent ? (
          <div className="flex self-start items-center gap-1 md:gap-2">
            <Image src={images.auth.CheckCircle} alt="check-circle" />
            <p className="text-[#22B231] font-semibold mt-0.5 text-xs md:text-sm">
              {sent}
            </p>
          </div>
        ) : null}
      </div>
    );
  }
);

AuthInput.displayName = "AuthInput";

export default AuthInput;
