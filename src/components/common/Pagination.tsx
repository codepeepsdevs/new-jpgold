import { FC, useRef } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

interface PaginationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
  onItemsPerPageChange: (limit: number) => void;
  pageSizeOptions?: number[];
}

const Pagination: FC<PaginationProps> = ({
  currentPage,
  onPageChange,
  itemsPerPage,
  onItemsPerPageChange,
  pageSizeOptions = [8, 16, 32, 64, 128],
}) => {
  const selectRef = useRef<HTMLSelectElement>(null);

  return (
    <div className="flex items-center justify-end gap-2 py-4">
      <div className="flex items-center gap-1 text-sm text-[#232222] font-medium dark:text-[#9CA3AF]">
        <div className="flex gap-1 border-r px-2 items-center relative">
          <select
            ref={selectRef}
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
            className="py-1 cursor-pointer px-1 dark:border-gray-70 bg-white dark:bg-[#1C1C1E]  outline-none"
          >
            {pageSizeOptions.map((size) => (
              <option key={size} value={size}>
                {size} items
              </option>
            ))}
          </select>
        </div>
        <span className="whitespace-nowrap border-r px-2 text-[#9CA3AF]">
          Page {currentPage}
        </span>
      </div>

      <div className="flex items-center">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-1 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <IoChevronBack className="w-4 h-4 text-gray-600 dark:text-[#9CA3AF]" />
        </button>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          className="p-1 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <IoChevronForward className="w-4 h-4 text-gray-600 dark:text-[#9CA3AF]" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
