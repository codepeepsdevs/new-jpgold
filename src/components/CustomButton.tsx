import SpinnerLoader from "./SpinnerLoader";
import { cn } from "@/utils/cn";

interface ButtonProps {
  placeholder: string;
  onClick?: () => void;
  type: "submit" | "button";
  className?: string;
  disabled?: boolean;
  loading?: boolean;
}

const CustomButton = ({
  placeholder,
  onClick,
  type,
  disabled,
  loading,
  className,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={cn(
        "disabled:bg-[#CA8E0E] hover:opacity-90 rounded-lg w-full flex items-center justify-center",
        className
      )}
    >
      {loading ? (
        <SpinnerLoader width={25} height={25} color="#FFB845" />
      ) : (
        `${placeholder}`
      )}
    </button>
  );
};

export default CustomButton;
