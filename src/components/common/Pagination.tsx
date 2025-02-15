import { FC } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className="flex items-center justify-end gap-2 py-4">
            <div className="flex items-center gap-1 text-sm text-[#232222] font-medium dark:text-gray-400">
                <div className='flex gap-1 border-r px-2 items-center'>
                    <select
                        value={currentPage}
                        onChange={(e) => onPageChange(Number(e.target.value))}
                        className="py-1 cursor-pointer px-2 dark:border-gray-700 bg-white dark:bg-[#1C1C1E]  appearance-none outline-none"
                    >
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                            <option key={page} value={page}>
                                {page}
                            </option>
                        ))}

                    </select>
                    <FaChevronDown className='text-[#232222]' />
                </div>
                <span className="whitespace-nowrap border-r px-2 text-[#9CA3AF]">
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