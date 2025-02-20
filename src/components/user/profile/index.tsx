"use client";

import UserCard from "@/components/UserCard";
import UploadImage from "./UploadImage";
import PersonalDetails from "./PersonalDetails";
import ChangePassword from "./ChangePassword";
import TwoStepAuthentication from "./TwoStepAuthentication";

const Profile = () => {
  return (
    <div className="h-full flex items-center justify-center">
      <UserCard className="w-full flex flex-col gap-4">
        <UploadImage />

        <PersonalDetails />

        <ChangePassword />

        <TwoStepAuthentication />
      </UserCard>
    </div>
  );
};

export default Profile;
