import React from "react";
import Image, { StaticImageData } from "next/image";
import icons from "@/public/icons/index";

interface AuthButtonsProps {
  googleLogin: () => void;
  facebookLogin: () => void;
}

const AuthButton: React.FC<{
  icon: StaticImageData;
  label: string;
  clickAction: () => void;
}> = ({ icon, label, clickAction }) => {
  return (
    <div
      onClick={clickAction}
      className="w-full flex flex-items justify-center py-2 gap-2 border border-[#E6E6E6] dark:border-[#3D3D3D] dark:text-[#FFFFFFCC] rounded cursor-pointer"
    >
      <Image src={icon} alt="auth button" />
      <p className="font-semibold text-sm">{label}</p>
    </div>
  );
};

const AuthButtons: React.FC<AuthButtonsProps> = ({
  googleLogin,
  facebookLogin,
}) => {
  const authButtons: {
    icon: StaticImageData;
    label: string;
    action: () => void;
  }[] = [
    {
      icon: icons.auth.AuthGoogle,
      label: "Continue with Google",
      action: googleLogin,
    },

    {
      icon: icons.auth.AuthFacebook,
      label: "Continue with Facebook",
      action: facebookLogin,
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      {authButtons.map((button, index: number) => (
        <div className="w-full" key={index}>
          <AuthButton
            clickAction={button.action}
            icon={button.icon}
            label={button.label}
          />
        </div>
      ))}
    </div>
  );
};

export default AuthButtons;
