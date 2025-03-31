"use client";
import { SetStateAction, Dispatch } from "react";

export const DashboardSortList = [
  {
    id: 1,
    label: "All Time",
    value: "all",
  },
  {
    id: 2,
    label: "Today",
    value: "today",
  },
  {
    id: 3,
    label: "This Week",
    value: "week",
  },
  {
    id: 4,
    label: "This Month",
    value: "month",
  },
];

const DashboardFilter = ({}: {
  sort: string;
  setSort: Dispatch<SetStateAction<string>>;
}) => {
  // const [sortModalState, setSortModalState] = useState(false);
  // const theme = useTheme();
  // const sortModalStateRef = useRef<HTMLDivElement>(null);
  // useOnClickOutside(sortModalStateRef, () => setSortModalState(false));

  return (
    <div className="w-full flex items-center justify-between gap-2 2xs:gap-4 xs:gap-8 sm:gap-10">
      <h2 className="text-xl font-ibold text-[#282828] dark:text-white">
        NFT Metrics
      </h2>

      {/* <div ref={sortModalStateRef} className="flex flex-col relative">
        <div
          onClick={() => {
            setSortModalState(!sortModalState);
          }}
          className="cursor-pointer flex justify-center items-center gap-2 py-1.5 xl:py-2 px-5 rounded-full text-[#1E1E1E] dark:text-white bg-[#F0F0F0] dark:bg-[#323232]"
        >
          <div className="flex items-center gap-2">
            <FaRegCalendar className="text-base" />
            <p className="font-medium text-xs xs:text-sm">
              {!sort
                ? "All Time"
                : DashboardSortList.find((item) => item.value === sort)?.label}
            </p>
          </div>

          <motion.span
            animate={{ rotate: sortModalState ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-xl 2xs:text-2xl"
          >
            <MdKeyboardArrowDown />
          </motion.span>
        </div>

        {sortModalState && (
          <div className="absolute top-full mt-2 right-0 py-0.5 w-40 sm:w-48">
            <div
              style={{
                boxShadow:
                  theme === "dark"
                    ? "0px 4px 6px -2px #00000008, 0px 12px 16px -4px #0000001A, 0px 0px 1px 0px #00000047"
                    : "0px 4px 6px -2px #00000008, 0px 12px 16px -4px #0000001A, 0px 0px 1px 0px #00000047",
              }}
              className="bg-white dark:bg-[#323232] rounded-md overflow-hidden"
            >
              {DashboardSortList.map((item) => (
                <div
                  key={item.id}
                  className={classNames(
                    "w-full flex items-center justify-between gap-3 px-6 py-4 cursor-pointer transition-colors duration-200 hover:bg-[#F8F8F8] dark:hover:bg-[#282828]",
                    {
                      "bg-[#F8F8F8] dark:bg-[#282828]": sort === item.value,
                    }
                  )}
                  onClick={() => {
                    setSort(item.value);
                    setSortModalState(false);
                  }}
                >
                  <span className="text-[#41415A] dark:text-white text-xs sm:text-sm font-medium">
                    {item.label}
                  </span>

                  {sort === item.value && (
                    <IoMdCheckmark className="text-primary" />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div> */}
    </div>
  );
};

export default DashboardFilter;
