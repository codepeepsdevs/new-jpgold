import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import icons from "@/public/icons/index";
import SpinnerLoader from "../SpinnerLoader";

const AuthButton: React.FC<{
  icon: StaticImageData;
  label: string;
  loading: boolean;
  clickAction: () => void;
}> = ({ icon, label, clickAction, loading }) => {
  return (
    <div
      onClick={clickAction}
      className="w-full flex flex-items justify-center py-2.5 gap-2 border border-[#E6E6E6] dark:border-[#3D3D3D] dark:text-[#FFFFFFCC] rounded cursor-pointer"
    >
      {loading ? (
        <SpinnerLoader width={25} height={25} color="#FFB845" />
      ) : (
        <>
          <Image src={icon} alt="auth button" />
          <p className="font-semibold text-sm">{label}</p>
        </>
      )}
    </div>
  );
};

const AuthButtons = () => {
  const [googleLoading, setGoogleLoading] = useState<boolean>(false);
  const [googleError, setGoogleError] = useState<boolean>(false);
  const api = process.env.NEXT_PUBLIC_BACKEND_API;

  const googleLoginAction = async () => {
    try {
      const googleLoginUrl = `${api}/v1/auth/google`;
      window.open(googleLoginUrl, "_self");
    } catch (err) {
      console.log(err);
      setGoogleError(true);
      setGoogleLoading(false);
    }
  };

  const authButtons: {
    icon: StaticImageData;
    label: string;
    action: () => void;
  }[] = [
    {
      icon: icons.auth.AuthGoogle,
      label: "Continue with Google",
      action: googleLoginAction,
    },

    // {
    //   icon: icons.auth.AuthFacebook,
    //   label: "Continue with Facebook",
    //   action: () => {},
    // },
  ];

  return (
    <div className="flex flex-col gap-4">
      {authButtons.map((button, index: number) => (
        <div className="w-full" key={index}>
          <AuthButton
            clickAction={button.action}
            icon={button.icon}
            label={button.label}
            loading={googleLoading && !googleError}
          />
        </div>
      ))}
    </div>
  );
};

export default AuthButtons;
