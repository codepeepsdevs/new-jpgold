import { FC } from 'react';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className="flex items-center justify-end gap-2 py-4">
            <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                <select
                    value={currentPage}
                    onChange={(e) => onPageChange(Number(e.target.value))}
                    className="px-1.5 py-0.5 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-[#1C1C1E] text-sm appearance-none cursor-pointer outline-none"
                >
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <option key={page} value={page}>
                            {page}
                        </option>
                    ))}
                </select>
                <span className="whitespace-nowrap">
                    of {totalPages} pages
                </span>
            </div>

            <div className="flex items-center">
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <IoChevronBack className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </button>
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <IoChevronForward className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </button>
            </div>
        </div>
    );
};

export default Pagination; 