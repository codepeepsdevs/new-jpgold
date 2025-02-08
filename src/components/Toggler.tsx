import { useSetTheme } from "@/store/theme.store";
import { useTheme } from "@/store/theme.store";
import { BsSun, BsMoon } from "react-icons/bs";
import classnames from "classnames";

const Toggler = () => {
  const theme = useTheme();
  const setTheme = useSetTheme();

  return (
    <div
      onClick={setTheme}
      className="relative cursor-pointer w-[4.4rem] h-9 px-1.5 py-2 gap-3 bg-[#f9f9f9] dark:bg-bg-400 dark:max-md:bg-bg-900 rounded-md transition-colors duration-200 max-sm:scale-90 max-xs:scale-75"
      aria-label="Toggle theme"
    >
      {/* Toggle Pill */}
      <div
        className={classnames(
          "z-20 absolute top-[0.45rem] xs:top-[0.4rem] left-0.5 w-[1.3rem] xs:w-[1.35rem] h-[1.3rem] xs:h-[1.35rem] rounded-full transition-transform duration-200",
          {
            "translate-x-9 bg-bg-200": theme === "light",
            "translate-x-1.5 bg-bg-600": theme === "dark",
          }
        )}
      />

      {/* Icons Container */}
      <div className="relative h-full flex justify-between items-center px-1.5 font-bold">
        <BsSun className="w-4 h-4 text-primary z-10 dark:opacity-0" />
        <BsMoon className="w-4 h-4 text-primary z-10" />
      </div>
    </div>
  );
};

export default Toggler;
