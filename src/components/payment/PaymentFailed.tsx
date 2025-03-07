"use client";

import Image from "next/image";
import images from "@/public/images";

const PaymentFailed = () => {
  return (
    <div className="bg-[#FFF1F1] flex flex-col justify-between w-full h-screen py-10">
      <div className="w-full h-full flex flex-col gap-4 justify-center items-center text-center ">
        <Image
          className="w-36"
          src={images.payment.paymentFailed}
          alt="failed"
        />
        <div className="flex flex-col gap-4">
          <p className="text-xl">Payment failed</p>

          <button
            className="p-3 rounded text-red-500 text-center text-sm md:text-base"
            onClick={() => window.history.go(-2)}
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailed;
