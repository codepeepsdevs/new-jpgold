'use client';

import { useState, useMemo } from 'react';
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    flexRender,
    createColumnHelper,
} from '@tanstack/react-table';
import { IoSearch, IoFilter, IoClose } from 'react-icons/io5';
import { IoChevronDown } from 'react-icons/io5';

type Transaction = {
    date: string;
    time: string;
    transactionId: string;
    type: string;
    quantity: number;
    amount: number;
    status: 'Completed' | 'Pending' | 'Failed';
};

const columnHelper = createColumnHelper<Transaction>();

const columns = [
    columnHelper.accessor('date', {
        header: 'Date',
        cell: (info) => (
            <div className="space-y-1">
                <div className="text-base text-[#050706] dark:text-white">{info.getValue()}</div>
                <div className="text-xs text-[#A7A9BA]">{info.row.original.time}</div>
            </div>
        ),
    }),
    columnHelper.accessor('transactionId', {
        header: 'Transaction ID',
        cell: (info) => <div className="text-base text-[#050706] dark:text-white">{info.getValue()}</div>,
    }),
    columnHelper.accessor('type', {
        header: 'Type',
        cell: (info) => <div className="text-base text-[#050706] dark:text-white">{info.getValue()}</div>,
    }),
    columnHelper.accessor('quantity', {
        header: 'Quantity',
        cell: (info) => <div className="text-base text-[#050706] dark:text-white">{info.getValue()}</div>,
    }),
    columnHelper.accessor('amount', {
        header: 'Amount',
        cell: (info) => <div className="text-base text-[#050706] dark:text-white">${info.getValue()}</div>,
    }),
    columnHelper.accessor('status', {
        header: 'Status',
        cell: (info) => (
            <div className="flex items-center gap-2">
                <span className={`px-3 py-1 text-xs rounded-lg ${info.getValue() === 'Completed'
                    ? 'border border-[#B2F5C7] text-[#16A34A]'
                    : info.getValue() === 'Pending'
                        ? 'bg-yellow-200 text-yellow-600'
                        : 'bg-red-100 text-red-600'
                    }`}>
                    {info.getValue()}
                </span>
                <button className="text-gray-400 hover:text-gray-600">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.3333 7.33327C13.1565 7.33327 12.987 7.40351 12.8619 7.52853C12.7369 7.65356 12.6667 7.82313 12.6667 7.99994V11.9999C12.6667 12.1768 12.5964 12.3463 12.4714 12.4713C12.3464 12.5964 12.1768 12.6666 12 12.6666H4C3.82319 12.6666 3.65362 12.5964 3.5286 12.4713C3.40357 12.3463 3.33333 12.1768 3.33333 11.9999V3.99994C3.33333 3.82313 3.40357 3.65356 3.5286 3.52853C3.65362 3.40351 3.82319 3.33327 4 3.33327H8C8.17681 3.33327 8.34638 3.26303 8.4714 3.13801C8.59643 3.01299 8.66667 2.84342 8.66667 2.66661C8.66667 2.48979 8.59643 2.32023 8.4714 2.1952C8.34638 2.07018 8.17681 1.99994 8 1.99994H4C3.46957 1.99994 2.96086 2.21065 2.58579 2.58573C2.21071 2.9608 2 3.46951 2 3.99994V11.9999C2 12.5304 2.21071 13.0391 2.58579 13.4142C2.96086 13.7892 3.46957 13.9999 4 13.9999H12C12.5304 13.9999 13.0391 13.7892 13.4142 13.4142C13.7893 13.0391 14 12.5304 14 11.9999V7.99994C14 7.82313 13.9298 7.65356 13.8047 7.52853C13.6797 7.40351 13.5101 7.33327 13.3333 7.33327Z" fill="#4B4D4C" />
                        <path d="M10.6673 3.33333H11.7206L7.52728 7.52C7.46479 7.58198 7.4152 7.65571 7.38135 7.73695C7.3475 7.81819 7.33008 7.90533 7.33008 7.99333C7.33008 8.08134 7.3475 8.16848 7.38135 8.24972C7.4152 8.33096 7.46479 8.40469 7.52728 8.46667C7.58925 8.52915 7.66299 8.57875 7.74423 8.61259C7.82547 8.64644 7.9126 8.66387 8.00061 8.66387C8.08862 8.66387 8.17576 8.64644 8.25699 8.61259C8.33823 8.57875 8.41197 8.52915 8.47394 8.46667L12.6673 4.28V5.33333C12.6673 5.51014 12.7375 5.67971 12.8625 5.80474C12.9876 5.92976 13.1571 6 13.3339 6C13.5108 6 13.6803 5.92976 13.8053 5.80474C13.9304 5.67971 14.0006 5.51014 14.0006 5.33333V2.66667C14.0006 2.48986 13.9304 2.32029 13.8053 2.19526C13.6803 2.07024 13.5108 2 13.3339 2H10.6673C10.4905 2 10.3209 2.07024 10.1959 2.19526C10.0708 2.32029 10.0006 2.48986 10.0006 2.66667C10.0006 2.84348 10.0708 3.01305 10.1959 3.13807C10.3209 3.2631 10.4905 3.33333 10.6673 3.33333Z" fill="#4B4D4C" />
                    </svg>

                </button>
            </div>
        ),
    }),
];

const data: Transaction[] = [
    {
        date: 'Jun 1, 2023',
        time: '12:21 PM',
        transactionId: '2023214567821',
        type: 'JPGC (Buy)',
        quantity: 566.777,
        amount: 758.09,
        status: 'Completed',
    },
    {
        date: 'May 1, 2023',
        time: '12:21 PM',
        transactionId: '2023214567866',
        type: 'JPGNFT (Transfer)',
        quantity: 344.98,
        amount: 542.09,
        status: 'Completed',
    },
    {
        date: 'Apr 1, 2023',
        time: '12:21 PM',
        transactionId: '2023214567867',
        type: 'JPGC (Swap)',
        quantity: 497.93,
        amount: 644.33,
        status: 'Completed',
    },
    {
        date: 'Mar 1, 2023',
        time: '12:21 PM',
        transactionId: '2023214567868',
        type: 'JPGC (Swap)',
        quantity: 24.88,
        amount: 34.52,
        status: 'Completed',
    },
    {
        date: 'Feb 1, 2023',
        time: '12:21 PM',
        transactionId: '2023214567869',
        type: 'JPGC (Buy)',
        quantity: 128.88,
        amount: 104.09,
        status: 'Completed',
    },
    {
        date: 'Jan 1, 2023',
        time: '12:21 PM',
        transactionId: '2023214567870',
        type: 'JPGNFT (Fraction)',
        quantity: 98.27,
        amount: 38.09,
        status: 'Completed',
    }
];

const TransactionPage = () => {
    const [searchText, setSearchText] = useState('');
    const [showFilter, setShowFilter] = useState(false);
    const [selectedType, setSelectedType] = useState<string>('');

    const transactionTypes = [
        'JPGC (Buy)',
        'JPGNFT (Transfer)',
        'JPGC (Swap)',
        'JPGNFT (Fraction)'
    ];

    // Filter function for global search and type filter
    const filteredData = useMemo(() => {
        return data.filter((item) => {
            const matchesSearch = searchText === '' ||
                item.transactionId.toLowerCase().includes(searchText.toLowerCase()) ||
                item.type.toLowerCase().includes(searchText.toLowerCase()) ||
                item.amount.toString().includes(searchText) ||
                item.status.toLowerCase().includes(searchText.toLowerCase()) ||
                item.date.toLowerCase().includes(searchText);

            const matchesType = selectedType === '' || item.type === selectedType;

            return matchesSearch && matchesType;
        });
    }, [searchText, selectedType]);

    const handleClearFilters = () => {
        setSelectedType('');
        setShowFilter(false);
    };

    const handleApplyFilter = () => {
        setShowFilter(false);
    };

    const table = useReactTable({
        data: filteredData, // Use filtered data instead of raw data
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    return (
        <div className="md:p-6 space-y-6">
            <div className="flex items-center justify-between gap-2 md:gap-4">
                <div className="relative flex-1">
                    <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search transaction ID"
                        className="w-full md:w-1/2 pl-10 pr-4 py-2 md:py-4 bg-white dark:bg-[#151515] border border-[#C5C5CA] dark:border-[#3D3D3D] rounded-lg text-[#050706] dark:text-white placeholder-gray-400"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </div>
                <div className="relative">
                    <button
                        onClick={() => setShowFilter(!showFilter)}
                        className="flex items-center gap-2 px-4 py-2 md:py-4 bg-white dark:bg-[#151515] border border-[#C5C5CA] dark:border-[#3D3D3D] rounded-lg text-[#050706] dark:text-white"
                    >
                        <IoFilter />
                        Filter
                    </button>

                    {/* Filter Modal */}
                    {showFilter && (
                        <div className="absolute right-0 top-12 w-80 bg-white dark:bg-[#151515] dark:border-[#3D3D3D] rounded-lg shadow-lg z-50">
                            <div className="p-4 flex justify-between items-center">
                                <h3 className="text-base font-medium text-[#050706] dark:text-white">Filter By</h3>
                                <button
                                    onClick={() => setShowFilter(false)}
                                    className="text-[#4E4E4E] bg-[#EBEBEB] hover:text-[#4E4E4E] rounded-full p-1"
                                >
                                    <IoClose size={20} />
                                </button>
                            </div>

                            <div className="p-4 space-y-4">
                                <div className="space-y-2">
                                    <label className="text-base text-[#050706] dark:text-white">
                                        Transaction Type
                                    </label>
                                    <div className="relative">
                                        <select
                                            value={selectedType}
                                            onChange={(e) => setSelectedType(e.target.value)}
                                            className="w-full p-2 bg-white dark:bg-[#151515] border border-[#ECECEC] dark:border-[#3D3D3D] rounded-lg text-[#050706] dark:text-white appearance-none"
                                        >
                                            <option value="">All Types</option>
                                            {transactionTypes.map((type) => (
                                                <option key={type} value={type}>
                                                    {type}
                                                </option>
                                            ))}
                                        </select>
                                        <IoChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-4 gap-2 dark:border-[#3D3D3D]">
                                    <button
                                        onClick={handleClearFilters}
                                        className="text-base w-1/2 py-3 rounded-lg border border-[#ECECEC] text-[#070707] dark:text-white hover:text-gray-700"
                                    >
                                        Clear filters
                                    </button>
                                    <button
                                        onClick={handleApplyFilter}
                                        className="py-3 w-1/2 bg-[#070707] dark:bg-gold-200 text-white dark:text-white rounded-lg hover:bg-gray-900 dark:hover:bg-gold-300"
                                    >
                                        Apply Filter
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="bg-white dark:bg-[#151515] rounded-lg border border-[#E3E3E8] dark:border-[#3D3D3D] w-full overflow-hidden">
                <div className="overflow-x-auto w-full">
                    <div className="inline-block min-w-full align-middle">
                        <table className="min-w-full">
                            <thead>
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <tr key={headerGroup.id} className="border-b border-[#E3E3E8] dark:border-[#3D3D3D]">
                                        {headerGroup.headers.map((header) => (
                                            <th key={header.id} className="px-6 py-4 text-left text-base font-medium text-[#00000099] dark:text-[#FFFFFFB2]">
                                                {flexRender(header.column.columnDef.header, header.getContext())}
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>
                            <tbody>
                                {table.getRowModel().rows.map((row) => (
                                    <tr
                                        key={row.id}
                                        className={`
                                             dark:border-[#3D3D3D] last:border-0
                                            ${row.index % 2 === 0 ? 'bg-[#FAFAFA] dark:bg-[#151515]' : 'bg-white dark:bg-[#1A1A1A]'}
                                        `}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <td key={cell.id} className="px-6 py-4 font-semibold text-base whitespace-nowrap">
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="flex items-center justify-between px-6 py-4 border-t border-[#E3E3E8] dark:border-[#3D3D3D]">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                            className="px-3 py-1 text-base text-[#3D3D3D] disabled:opacity-50"
                        >
                            Previous
                        </button>
                        <button
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                            className="px-3 py-1 text-base text-[#3D3D3D] disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                    <span className="text-base text-[#3D3D3D]">
                        Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default TransactionPage;