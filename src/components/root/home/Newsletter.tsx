"use client";
import { useSubscribeNewsletter } from "@/api/newsletter/newsletter.queries";
import { ErrorResponse } from "@/api/type";
import SpinnerLoader from "@/components/SpinnerLoader";
import ErrorToast from "@/components/toast/ErrorToast";
import SuccessToast from "@/components/toast/SuccessToast";
import { SectionWrapper } from "@/utils/hoc";
import { AxiosError } from "axios";
import { useState } from "react";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const onError = (error: AxiosError<ErrorResponse>) => {
    const errorMessage = error?.response?.data?.message;
    const descriptions = Array.isArray(errorMessage)
      ? errorMessage
      : [errorMessage];

    ErrorToast({
      title: "Error subscribing",
      descriptions: descriptions.filter(
        (msg): msg is string => msg !== undefined
      ),
    });
  };

  const onSuccess = () => {
    SuccessToast({
      title: "Newsletter subscribed",
      description:
        "Congratulations on your subscriptions! 🎉. Check your email regularly for updates",
    });

    setEmail("");
  };

  const {
    mutate: subscribe,
    isPending,
    isError,
  } = useSubscribeNewsletter(onError, onSuccess);
  const loading = isPending && !isError;
  return (
    <div className="w-full flex bg-[#F7F7F7] dark:bg-[#1D1F1C] pt-24 pb-32 lg:pt-28 lg:pb-28 xl:pt-32 xl:pb-32">
      <div className="container  flex flex-col justify-center items-center gap-4 sm:gap-6 xl:gap-8">
        <div className="flex flex-col justify-center items-center text-center w-full 2xs:w-[90%] xs:w-[80%] sm:w-[70%] md:w-[55%] xl:w-[40%] 2xl:w-[35%] gap-3">
          <h1 className="text-black dark:text-white font-isemibold text-3xl lg:text-4xl xl:text-5xl">
            Subscribe to Our Newsletter{" "}
          </h1>
        </div>

        <div className="w-[95%] 2xs:w-[85%] xs:w-[75%] sm:w-[70%] md:w-[60%] xl:w-[45%] flex flex-col justify-center text-center items-center gap-5 xl:gap-6">
          <p className="text-xs 2xs:text-sm lg:text-base text-[#000000B2] dark:text-[#FFFFFFB2]">
            Stay updated with our latest insights, product updates, and tech
            industry news. Get weekly curated content delivered straight to your
            inbox, including coding tips, development best practices, and
            emerging tech trends.
          </p>
          <div className="w-full flex items-center h-full sm:px-1 xl:px-3">
            <input
              type="text"
              placeholder="Your Email Address"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              className="w-[65%] 2xs:w-[70%] lg:w-[75%] px-4 py-3 rounded-l sm:rounded-l-md outline-none border border-[#D3D3D3] bg-white placeholder:text-[#959595] text-sm  xs:text-base"
            />
            <button
              onClick={() => {
                subscribe({
                  email,
                });
              }}
              className="flex justify-center items-center w-[35%] 2xs:w-[30%] lg:w-[25%] h-full bg-primary  text-white p-2 rounded-r sm:rounded-r-md font-medium text-sm xs:text-base"
            >
              {loading ? (
                <SpinnerLoader width={25} height={25} color="#FFB845" />
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper(Newsletter);
