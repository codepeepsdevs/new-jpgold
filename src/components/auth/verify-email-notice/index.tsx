"use client";

import React from "react";
import Image from "next/image";
import images from "@/public/images";
import useNavigate from "@/hooks/useNavigate";
import Link from "next/link";
import CustomButton from "@/components/CustomButton";

const VerifyEmailNotice = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full flex justify-center">
      <div className="flex justify-center w-[90%] sm:w-[70%] md:w-[60%] lg:w-[45%] xl:w-[40%]">
        <div className="w-full flex items-center flex-col">
          <Image
            onClick={() => navigate("/", "replace")}
            src={images.logoSvg}
            alt="logo"
            className="cursor-pointer"
          />

          <div className="w-full bg-[#FFFFFF47] mt-10 flex items-center justify-center border border-[#D0D0D0] rounded-2xl py-10">
            <div className="w-[90%] sm:w-[80%] flex flex-col gap-6 items-center justify-center">
              {/* headers */}
              <div className="flex flex-col gap-3 text-center">
                <h1 className="text-2xl font-ibold">Verify Your Email</h1>
                <p className="text-sm text-gray-600 max-w-md">
                  We've sent a verification link to your email address. Please
                  check your inbox (and spam folder) to verify your account.
                </p>
                <div className="text-sm text-gray-500">
                  <p>Didn't receive the email?</p>
                  <p>Please check your spam folder or contact support.</p>
                </div>
              </div>

              {/* Back to login button */}
              <CustomButton
                type="button"
                placeholder="Back to Login"
                onClick={() => navigate("/login", "replace")}
                className="bg-[#CA8E0E] text-white py-3 md:py-4 mt-3 rounded-[5px] w-full"
              />
            </div>
          </div>

          <div className="mt-10">
            Need help?{" "}
            <Link href="/contact" className="text-[#CC8F00]">
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailNotice;
