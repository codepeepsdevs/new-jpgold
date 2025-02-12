"use client"

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { IoSearch, IoList, IoCheckmark, IoChevronDown, IoCart } from 'react-icons/io5';
import { TbLayoutGrid } from 'react-icons/tb';
import NFTCard from '../../cards/NFTCards';
import images from '../../../../public/images';
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getFilteredRowModel,
} from '@tanstack/react-table';
import { StaticImageData } from 'next/image';
import Pagination from '@/components/common/Pagination';
import { useRouter } from 'next/navigation';
import { MdOutlineShoppingCart, MdVerified } from 'react-icons/md';

interface NFTItem {
    id: number;
    imageUrl: string | StaticImageData;
    amount: number;
    price: number;
    verified: boolean;
    todayChange: number;
    weekChange: number;
}

const nftListData: NFTItem[] = [
    {
        id: 1,
        amount: 100,
        price: 1000,
        imageUrl: images.marketplace.nftGold,
        verified: true,
        todayChange: -2.5,
        weekChange: 5.3
    },
    {
        id: 2,
        amount: 5.8,
        price: 1455.92,
        imageUrl: images.marketplace.nftGold,
        verified: true,
        todayChange: 2.5,
        weekChange: -5.3
    },
    {
        id: 3,
        amount: 5.8,
        price: 1455.92,
        imageUrl: images.marketplace.nftGold,
        verified: true,
        todayChange: 2.5,
        weekChange: -5.3
    },
    {
        id: 4,
        amount: 5.8,
        price: 1455.92,
        imageUrl: images.marketplace.nftGold,
        verified: true,
        todayChange: 2.5,
        weekChange: -5.3
    },
    {
        id: 5,
        amount: 3.5,
        price: 1114.53,
        imageUrl: images.marketplace.nftGold,
        verified: true,
        todayChange: 2.5,
        weekChange: -5.3
    },
];

const sortOptions = [
    { value: 'price-low-high', label: 'Price low to high' },
    { value: 'price-high-low', label: 'Price high to low' },
    { value: 'amount-high-low', label: 'Amount high to low' },
    { value: 'recently-created', label: 'Recently created' }
];

const NFTList = () => {
    const [isGridView, setIsGridView] = useState(true);
    const [sortBy, setSortBy] = useState('price-low-high');
    const [isSelectOpen, setIsSelectOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [globalFilter, setGlobalFilter] = useState('');
    const router = useRouter();

    const columnHelper = createColumnHelper<NFTItem>();
    const columns = useMemo(
        () => [
            columnHelper.accessor('id', {
                header: 'Name',
                cell: info => (
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded">
                            <Image
                                src={images.marketplace.nftGold}
                                alt={`JPNFT #${info.getValue()}`}
                                width={150}
                                height={150}
                                className="object-contain"
                            />
                        </div>
                        <span>JPNFT #{info.getValue()}</span>
                        <MdVerified className="text-gold-200" />
                    </div>
                ),
            }),
            columnHelper.accessor('amount', {
                header: 'Amount',
                cell: info => `${info.getValue()} grams`,
            }),
            columnHelper.accessor('price', {
                header: 'Listed Price',
                cell: info => `$${info.getValue().toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
            }),
            columnHelper.accessor('todayChange', {
                header: 'Today',
                cell: info => {
                    const value = info.getValue();
                    const isPositive = value > 0;
                    return (
                        <span className={isPositive ? 'text-[#63BA23] font-semibold' : 'text-[#D20832] font-semibold'}>
                            {isPositive ? '▲' : '▼'} {Math.abs(value).toFixed(2)}%
                        </span>
                    );
                },
            }),
            columnHelper.accessor('weekChange', {
                header: '7 Days',
                cell: info => {
                    const value = info.getValue();
                    const isPositive = value > 0;
                    return (
                        <span className={isPositive ? 'text-[#63BA23]' : 'text-[#D20832]'}>
                            {isPositive ? '▲' : '▼'} {Math.abs(value).toFixed(2)}%
                        </span>
                    );
                },
            }),
            columnHelper.accessor('price', {
                header: 'Current Price',
                cell: info => `$${info.getValue().toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
            }),
            columnHelper.display({
                id: 'actions',
                header: 'Purchase',
                cell: info => (
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                            onClick={() => router.push(`/buy/${info.row.original.id}`)}
                            className="bg-[#CC8F00] font-semibold text-white px-6 py-2 rounded hover:bg-[#B37E00] transition-colors"
                        >
                            Buy
                        </button>
                        <button className="bg-black/5 py-2 px-4">
                            <MdOutlineShoppingCart size={20} />
                        </button>
                    </div>
                ),
            }),
        ],
        [columnHelper]
    );

    const table = useReactTable({
        data: nftListData,
        columns,
        state: {
            globalFilter,
        },
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        globalFilterFn: (row, columnId, filterValue) => {
            const searchValue = filterValue.toLowerCase();
            const value = String(row.getValue(columnId)).toLowerCase();
            return value.includes(searchValue) ||
                `jpnft #${row.original.id}`.toLowerCase().includes(searchValue) ||
                `${row.original.amount}`.toLowerCase().includes(searchValue) ||
                `${row.original.price}`.toLowerCase().includes(searchValue);
        },
    });

    // Pagination calculations
    const itemsPerPage = 8;
    const filteredRows = table.getFilteredRowModel().rows;
    const totalPages = Math.ceil(filteredRows.length / itemsPerPage);

    // Get paginated data
    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredRows.slice(startIndex, endIndex);
    }, [filteredRows, currentPage, itemsPerPage]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        // You might want to scroll to top when changing pages
        window.scrollTo(0, 0);
    };

    return (
        <section className="w-full py-8">
            {/* Header Controls */}
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between p-2 bg-[#F6F6F6] dark:bg-[#1D1F1E] rounded-lg mb-6">
                <div className="relative w-full md:w-1/2">
                    <div className="flex items-center gap-2 bg-white dark:bg-[#1C1C1E] border border-[#D5D5DD] dark:border-[#717179] rounded-lg px-4 py-3">
                        <IoSearch size={20} className="text-gray-500 dark:text-[#4E4E4E]" />
                        <input
                            type="text"
                            placeholder="Search nft"
                            value={globalFilter ?? ''}
                            onChange={e => {
                                setGlobalFilter(e.target.value);
                                setCurrentPage(1); // Reset to first page on search
                            }}
                            className="w-full bg-transparent outline-none dark:text-white"
                        />
                    </div>
                </div>

                {/* Sort Dropdown */}
                <div className="relative flex justify-end gap-2">
                    <button
                        onClick={() => setIsSelectOpen(!isSelectOpen)}
                        className="w-full bg-white dark:bg-[#1C1C1E] border border-[#D5D5DD] dark:border-[#717179] dark:text-white rounded-lg px-4 py-3 flex gap-2 items-center justify-between"
                    >
                        <span>{sortOptions.find(option => option.value === sortBy)?.label}</span>
                        <IoChevronDown
                            className={`transform transition-transform ${isSelectOpen ? 'rotate-180' : ''}`}
                        />
                    </button>

                    {isSelectOpen && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-[#1C1C1E] border border-[#D5D5DD] rounded-lg shadow-lg z-10">
                            {sortOptions.map((option) => (
                                <button
                                    key={option.value}
                                    onClick={() => {
                                        setSortBy(option.value);
                                        setIsSelectOpen(false);
                                    }}
                                    className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-100 dark:hover:bg-[#2C2C2E] dark:text-white"
                                >
                                    <span>{option.label}</span>
                                    {sortBy === option.value && (
                                        <IoCheckmark className="text-primary-500" size={20} />
                                    )}
                                </button>
                            ))}
                        </div>
                    )}


                    <div className="hidden sm:flex items-center gap-1 bg-white dark:bg-black/20 p-1 rounded-lg border dark:border-none shadow-lg">
                        <button
                            onClick={() => setIsGridView(true)}
                            className={`p-2 rounded ${isGridView ? 'dark:bg-white bg-[#0A0C0F] dark:text-[#1C1B1F] text-white' : 'text-[#1C1B1F] dark:text-[#DDDDDD]'}`}
                        >
                            <TbLayoutGrid size={20} />
                        </button>
                        <button
                            onClick={() => setIsGridView(false)}
                            className={`p-2 rounded ${!isGridView ? 'dark:bg-white bg-[#0A0C0F] dark:text-[#1C1B1F] text-white' : 'text-[#1C1B1F] dark:text-[#DDDDDD]'}`}
                        >
                            <IoList size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Content */}
            {isGridView ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {paginatedData.map((row) => (
                        <NFTCard key={row.original.id} {...row.original} />
                    ))}
                </div>
            ) : (
                <div className="w-full border border-[#E2E2E2] dark:border-[#E2E2E2]/20  p-4 rounded-lg overflow-hidden">
                    <table className="w-full">
                        <thead>
                            {table.getHeaderGroups().map(headerGroup => (
                                <tr key={headerGroup.id} className="border-b border-gray-200 dark:border-gray-700">
                                    {headerGroup.headers.map(header => (
                                        <th key={header.id} className="text-left px-6 py-4 dark:text-white font-semibold">
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody>
                            {paginatedData.map(row => (
                                <tr
                                    key={row.id}
                                    className="group border-b dark:text-white border-[#E2E2E2] cursor-pointer dark:border-[#E2E2E2]/20 hover:bg-[#FAFAFA] dark:hover:bg-[#FAFAFA]/10 transition-colors"
                                >
                                    {row.getVisibleCells().map(cell => (
                                        <td key={cell.id} className="px-6 py-4 font-semibold">
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Pagination */}
            {filteredRows.length > 0 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            )}
        </section>
    );
};

export default NFTList; 