"use client";

import Image from "next/image";
import images from "@/public/images";
import AuthButtons from "../AuthButtons";
import { FaArrowRightLong } from "react-icons/fa6";
import classNames from "classnames";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import AuthInput from "../AuthInput";
import Link from "next/link";
import CustomButton from "@/components/CustomButton";
import useNavigate from "@/hooks/useNavigate";
import { AxiosError, AxiosResponse } from "axios";
import { RLogin } from "@/api/auth/auth.types";
import { useLogin } from "@/api/auth/auth.queries";
import ErrorToast from "@/components/toast/ErrorToast";
import useAuthEmailStore from "@/store/authEmail.store";
import { useTheme } from "@/store/theme.store";
import { ErrorResponse } from "@/api/type";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Email format is not valid")
    .required("Email is required"),

  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

type LoginFormData = yup.InferType<typeof schema>;

const Login = () => {
  const form = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const navigate = useNavigate();
  const { setAuthEmail } = useAuthEmailStore();
  const theme = useTheme();

  const { register, handleSubmit, formState, reset } = form;
  const { errors, isValid } = formState;

  const onError = (error: AxiosError<ErrorResponse>) => {
    const errorMessage = error?.response?.data?.message;
    const descriptions = Array.isArray(errorMessage)
      ? errorMessage
      : [errorMessage];

    ErrorToast({
      title: "Error during login",
      descriptions: descriptions.filter(
        (msg): msg is string => msg !== undefined
      ),
    });
  };

  const onSuccess = (data: AxiosResponse<RLogin>) => {
    console.log(data);
    const user = data?.data?.user;
    setAuthEmail(user?.email);

    if (!user.isEmailVerified) {
      navigate("/verify-email-notice", "push");
    } else {
      navigate("/two-factor-auth", "push");
    }

    reset();
  };

  const { mutate: Login, isPending } = useLogin(onError, onSuccess);

  const onSubmit = (data: LoginFormData) => {
    Login(data);
  };

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
              {/* headers */}
              <div className="flex flex-col gap-1 text-center">
                <h1 className="text-2xl xs:text-3xl font-ibold">
                  Welcome Back!
                </h1>
                <p className="text-sm xs:text-base dark:text-[#FFFFFFA6]">
                  Log in to your account
                </p>
              </div>

              {/* buttons */}
              <div className="w-full flex flex-col gap-4">
                <AuthButtons googleLogin={() => {}} facebookLogin={() => {}} />
                <div
                  onClick={() => navigate("/user/dashboard", "replace")}
                  className="w-full flex items-center justify-center py-2.5 gap-2 border border-[#E6E6E6] dark:text-[#323232] bg-[#E6E6E6] rounded cursor-pointer"
                >
                  <p className="font-semibold text-sm">Continue Anonymously</p>
                  <FaArrowRightLong />
                </div>
              </div>

              <div className="w-full flex items-center justify-center self-center border-[#C2C2C2]">
                <hr
                  className={classNames(
                    "flex-1 border-[#C2C2C2] dark:border-[#3D3D3D]",
                    {
                      // "border-[#2B2B2B]": dark,
                      // "border-[#D7D7D7]": !dark,
                    }
                  )}
                />
                <span
                  className={classNames(
                    "px-3 font-bold text-xs md:text-sm text-[#757575] dark:[#757575]",
                    {
                      // "text-[#BBBBBB]": dark,
                      // "text-[#D7D7D7]": !dark,
                    }
                  )}
                >
                  OR
                </span>
                <hr
                  className={classNames(
                    "flex-1 border-[#C2C2C2] dark:border-[#3D3D3D]",
                    {
                      // "border-[#2B2B2B]": dark,
                      // "border-[#D7D7D7]": !dark,
                    }
                  )}
                />
              </div>

              {/* form */}
              <form
                className="flex flex-col justify-start items-start w-full gap-4"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
              >
                <AuthInput
                  id="email"
                  label="Email Address"
                  type="email"
                  htmlFor="email"
                  placeholder="Email"
                  error={errors.email?.message}
                  {...register("email")}
                />
                <AuthInput
                  id="password"
                  label="Password"
                  type="password"
                  htmlFor="password"
                  placeholder="Password"
                  autoComplete="off"
                  error={errors.password?.message}
                  {...register("password")}
                />
                {/* forgot  password */}
                <Link
                  href="/forgot-password"
                  className=" text-[#CC8F00] flex self-start text-sm"
                >
                  Forgot your Password?
                </Link>
                {/* button */}
                <CustomButton
                  placeholder="Log in"
                  type="submit"
                  loading={isPending}
                  className={classNames({
                    "py-3.5 mt-3": true,
                    "bg-[#CA8E0E] text-white": isValid,
                    "bg-[#E6E6E6] text-[#323232]": !isValid,
                  })}
                />
              </form>
            </div>
          </div>
          <div className="mt-10 dark:text-[#FFFFFFCC]">
            Don’t have an account?{" "}
            <Link href="/signup" className=" text-[#CC8F00]">
              Signup
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
