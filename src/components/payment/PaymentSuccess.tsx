"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import images from "@/public/images";
import useNavigate from "@/hooks/useNavigate";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [redirectPath, setRedirectPath] = useState("");

  useEffect(() => {
    // Access localStorage safely inside useEffect, which only runs in the browser
    const storedRedirectPath = localStorage.getItem("redirect-path");
    setRedirectPath(storedRedirectPath || "");
  }, []);

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
            onClick={() => {
              if (redirectPath === "crypto") {
                window.history.go(-2);
              } else if (redirectPath === "fiat") {
                window.history.go(-3);
              } else {
                navigate("/");
              }
            }}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
