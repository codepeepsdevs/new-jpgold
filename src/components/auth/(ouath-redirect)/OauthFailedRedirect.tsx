"use client";
import useNavigate from "@/hooks/useNavigate";
import Image from "next/image";
import images from "../../../../public/images";
import { useSearchParams } from "next/navigation";
import { useTheme } from "@/store/theme.store";
import classNames from "classnames";
import CustomButton from "@/components/CustomButton";

const OAuthFailedRedirect = () => {
  const navigate = useNavigate();
  const searchParams = useSearchParams();
  const theme = useTheme();

  const errorMessage =
    searchParams.get("errorMessage") ||
    "Authentication failed. Please try again.";

  return (
    <div className="w-full flex justify-center">
      <div className="flex justify-center w-[90%] sm:w-[70%] md:w-[60%] lg:w-[45%] xl:w-[40%]">
        <div className="w-full flex items-center flex-col ">
          <Image
            onClick={() => navigate("/", "replace")}
            src={theme === "light" ? images.logoSvg : images.logoDarkSvg}
            alt="logo"
            className="cursor-pointer"
          />
          <div className="w-full bg-[#FFFFFF47] dark:text-white dark:bg-[#00000033] mt-10 flex items-center justify-center border border-[#D0D0D0] dark:border-[#E3E3E826] rounded-2xl py-10">
            <div className="w-[90%] sm:w-[80%] flex flex-col gap-6 items-center justify-center">
              <div className="flex flex-col gap-1 text-center">
                <h1 className="text-2xl xs:text-3xl font-ibold">
                  Authentication Failed
                </h1>
                <p className="text-sm xs:text-base dark:text-[#FFFFFFA6]">
                  {errorMessage}{" "}
                </p>
              </div>

              <CustomButton
                placeholder="Back to Login"
                type="button"
                onClick={() => {
                  navigate("/login", "replace");
                }}
                className={classNames({
                  "py-3.5 mt-3 bg-[#CA8E0E] text-white": true,
                })}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OAuthFailedRedirect;
