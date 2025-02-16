import { IoSunny } from "react-icons/io5";
import { useTheme } from "@/store/theme.store";
import { useSetTheme } from "@/store/theme.store";
import { TbMoonFilled } from "react-icons/tb";

function ThemeToggle() {
  const setTheme = useSetTheme();
  const theme = useTheme();
  return (
    <div className="flex items-center justify-center h-fit">
      <div className="w-full relative flex items-center justify-between p-1.5 gap-1 bg-white dark:bg-[#373737] rounded-lg border border-[#EFEFEF] dark:border-[#373737]">
        {/* Sun Icon */}
        <div
          style={{
            boxShadow: theme === "light" ? "0px 1px 3px 0px #343A4B29" : "none",
            transition: "all 0.3s ease-in-out",
          }}
          className={`p-2 flex items-center justify-center rounded-[5px] transition-all duration-300 ease-in-out ${
            theme === "light" ? "bg-[#0A0C0F] text-white" : "text-[#737373]"
          }`}
          onClick={() => theme === "dark" && setTheme()}
        >
          <IoSunny className="text-lg" />
        </div>

        {/* Moon Icon */}
        <div
          style={{
            boxShadow: theme === "dark" ? "0px 1px 3px 0px #343A4B29" : "none",
            transition: "all 0.3s ease-in-out",
          }}
          className={`p-2 flex items-center justify-center rounded-[5px] transition-all duration-300 ease-in-out ${
            theme === "dark" ? "bg-[#0A0C0F] text-white" : "text-[#1C1B1F]"
          }`}
          onClick={() => theme === "light" && setTheme()}
        >
          <TbMoonFilled className="text-lg" />
        </div>

        {/* Hidden Button for Toggling */}
        <button
          onClick={() => setTheme()}
          className="absolute w-full h-full opacity-0"
        />
      </div>
    </div>
  );
}

export default ThemeToggle;
