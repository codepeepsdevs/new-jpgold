"use client";
import { useTheme } from "@/store/theme.store";
import { cn } from "@/utils/cn";

const UserCard = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const theme = useTheme();
  return (
    <div
      style={{
        boxShadow: theme === "light" ? "0px 4px 24px 0px #E1E1E140" : "",
      }}
      className={cn(
        "w-full px-4 py-4 rounded-2xl bg-white border border-[#E3E3E8] dark:bg-[#0E0E0E] dark:border-[#3D3D3D]",
        className
      )}
    >
      {children}
    </div>
  );
};

export default UserCard;
