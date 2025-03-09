"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import images from "@/public/images";
import useNavigate from "@/hooks/useNavigate";

const PaymentFailed = () => {
  const navigate = useNavigate();
  const [redirectPath, setRedirectPath] = useState("");

  useEffect(() => {
    // Access localStorage safely inside useEffect, which only runs in the browser
    const storedRedirectPath = localStorage.getItem("redirect-path");
    setRedirectPath(storedRedirectPath || "");
  }, []);

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
            Try again
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailed;
