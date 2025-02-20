"use client";
import { useToggleTwoFactorAuth } from "@/api/user/user.queries";
import { RToggleTwoFactorAuth } from "@/api/user/user.types";
import useUserStore from "@/store/user.store";
import { Switch, FormControlLabel } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const TwoStepAuthentication = () => {
  const { user } = useUserStore();

  const queryClient = useQueryClient();
  const [checked, setChecked] = useState<boolean>(false);

  useEffect(() => {
    setChecked(user?.enableTwofactorAuth ?? false);
  }, [user]);

  const onError = (error: AxiosError) => {
    console.log(error);
  };

  const onSuccess = (data: AxiosResponse<RToggleTwoFactorAuth>) => {
    console.log(data);
    toast.success(data.data.message);
    queryClient.invalidateQueries({ queryKey: ["user"] });
  };

  const { mutate: toggleTwoFactorAuth } = useToggleTwoFactorAuth(
    onError,
    onSuccess
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    toggleTwoFactorAuth({ enable: event.target.checked });
  };

  return (
    <div className="p-4 border border-[#E3E3E8] rounded-lg flex flex-col gap-2 dark:text-white dark:bg-[#1D1F1C] dark:border-[#3D3D3D]">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h3 className="text-lg font-bold">Two-step authentication</h3>
          <p className="text-sm text-[#7F7F7F] dark:text-[#FFFFFFB2]">
            Verify your identity with an authentication method
          </p>
        </div>

        <FormControlLabel
          control={
            <Switch
              checked={checked}
              onChange={handleChange}
              size="medium"
              sx={{
                "& .MuiSwitch-switchBase": {
                  color: "#9E9E9E", // Inactive thumb color
                  "&.Mui-checked": {
                    color: "#CC8F00", // Active thumb color
                  },
                },
                "& .MuiSwitch-track": {
                  backgroundColor: "#9E9E9E40", // Inactive track color
                },
                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                  backgroundColor: "#CC8F00", // Active track color
                },
              }}
            />
          }
          label=""
        />
      </div>
    </div>
  );
};

export default TwoStepAuthentication;
