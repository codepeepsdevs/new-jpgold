"use client";
import Image from "next/image";
import images from "@/public/images";

const PaymentSuccess = () => {
  return (
    <div className="bg-[#E3F5E3] flex flex-col justify-between w-full h-screen py-10">
      <div className="w-full h-full flex flex-col gap-4 justify-center items-center text-center ">
        <Image
          className="w-36"
          src={images.payment.paymentSuccess}
          alt="success"
        />
        <div className="flex flex-col gap-4">
          <p className="text-xl">Payment was successful</p>

          <button
            className="p-3 rounded text-green-500 text-center text-sm md:text-base"
            onClick={() => window.history.go(-1)}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
