import classnames from "classnames";
import SpinnerLoader from "./SpinnerLoader";

interface ButtonProps {
  placeholder: string;
  onClick: () => void;
  type: "submit" | "button";
  classNames?: string;
  disabled?: boolean;
  loading?: boolean;
}

const UserButton = ({
  placeholder,
  onClick,
  type,
  disabled,
  classNames,
  loading,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={classnames(
        "disabled:bg-bg-5200 disabled:text-text-3000 hover:opacity-90 rounded-full w-full flex items-center justify-center gap-3 bg-secondary px-3 py-4 text-black font-medium text-base lg:text-lg",
        classNames
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

export default UserButton;
