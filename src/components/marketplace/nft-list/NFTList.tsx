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
    FilterFn,
    getFilteredRowModel,
} from '@tanstack/react-table';
import { useCartStore } from '@/store/useCartStore';
import toast from 'react-hot-toast';
import { StaticImageData } from 'next/image';
import Pagination from '@/components/common/Pagination';

interface NFTItem {
    id: number;
    imageUrl: string | StaticImageData;
    amount: number;
    price: number;
    verified: boolean;
    todayChange: number;
    weekChange: number;
}

const columnHelper = createColumnHelper<NFTItem>();

const columns = [
    // Name Column with Image
    columnHelper.accessor('id', {
        header: 'Name',
        cell: (info) => (
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gold-100 dark:bg-gold-dark-100 rounded-lg flex items-center justify-center">
                    <Image
                        src={info.row.original.imageUrl}
                        alt={`JPNFT #${info.getValue()}`}
                        width={32}
                        height={32}
                        className="object-contain"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <span>JPNFT#{info.getValue()}</span>
                    {info.row.original.verified && (
                        <span className="text-yellow-500">🏅</span>
                    )}
                </div>
            </div>
        ),
    }),
    // Amount Column
    columnHelper.accessor('amount', {
        header: 'Amount',
        cell: (info) => <div>{info.getValue()} grams</div>,
    }),
    // Listed Price Column
    columnHelper.accessor('price', {
        header: 'Listed Price',
        cell: (info) => (
            <div>${info.getValue().toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
        ),
    }),
    // Today Change Column
    columnHelper.accessor('todayChange', {
        header: 'Today',
        cell: (info) => (
            <div className={`flex items-center gap-1 ${info.getValue() < 0 ? 'text-red-500' : 'text-green-500'}`}>
                <span>{info.getValue() < 0 ? '▼' : '▲'}</span>
                <span>{Math.abs(info.getValue())}%</span>
            </div>
        ),
    }),
    // Week Change Column
    columnHelper.accessor('weekChange', {
        header: '7 Days',
        cell: (info) => (
            <div className={`flex items-center gap-1 ${info.getValue() < 0 ? 'text-red-500' : 'text-green-500'}`}>
                <span>{info.getValue() < 0 ? '▼' : '▲'}</span>
                <span>{Math.abs(info.getValue())}%</span>
            </div>
        ),
    }),
    // Current Price & Actions Column
    columnHelper.accessor('price', {
        id: 'actions',
        header: 'Current Price',
        cell: (info) => {
            const { addItem, items } = useCartStore();
            const isInCart = items.some(item => item.id === info.row.original.id);

            const handleAddToCart = () => {
                addItem(info.row.original);
                toast.success('Added to cart');
            };

            return (
                <div className="flex items-center justify-between">
                    <span>${info.getValue().toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                    <div className="flex gap-2">
                        <button className="bg-primary-500 hover:bg-primary-600 px-4 py-1 rounded-lg text-white">
                            Buy
                        </button>
                        <button
                            onClick={handleAddToCart}
                            className={`p-2 rounded-lg ${isInCart ? 'bg-primary-500 text-white' : 'bg-gray-100 dark:bg-gray-800'}`}
                        >
                            <IoCart size={20} />
                        </button>
                    </div>
                </div>
            );
        },
    }),
];

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

    const data = useMemo(() =>
        Array.from({ length: 32 }, (_, i) => ({
            id: i + 1,
            amount: 5.8,
            price: 1455.92,
            imageUrl: '/images/nft-placeholder.jpg',
            verified: true,
        })),
        []);

    const columnHelper = createColumnHelper<NFTItem>();
    const columns = useMemo(
        () => [
            columnHelper.accessor('id', {
                header: 'Name',
                cell: info => `JPNFT #${info.getValue()}`,
            }),
            columnHelper.accessor('amount', {
                header: 'Amount',
                cell: info => `${info.getValue()} grams`,
            }),
            columnHelper.accessor('price', {
                header: 'Price',
                cell: info => `$${info.getValue().toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
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
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between p-2 bg-[#F6F6F6] dark:bg-bg-dark-400 rounded-lg mb-6">
                <div className="relative w-full md:w-1/2">
                    <div className="flex items-center gap-2 bg-white dark:bg-[#1C1C1E] border border-[#D5D5DD] rounded-lg px-4 py-3">
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
                        className="w-full bg-white dark:bg-[#1C1C1E] border border-[#D5D5DD] dark:text-white rounded-lg px-4 py-3 flex gap-2 items-center justify-between"
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


                    <div className="hidden sm:flex items-center gap-1 bg-white dark:bg-[#1C1C1E] p-2 rounded-lg border dark:border-[#D5D5DD]">
                        <button
                            onClick={() => setIsGridView(true)}
                            className={`p-2 rounded ${isGridView ? 'bg-[#0A0C0F] text-white' : 'text-gray-500'}`}
                        >
                            <TbLayoutGrid size={20} />
                        </button>
                        <button
                            onClick={() => setIsGridView(false)}
                            className={`p-2 rounded ${!isGridView ? 'bg-[#0A0C0F] text-white' : 'text-gray-500'}`}
                        >
                            <IoList size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Content */}
            {isGridView ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {paginatedData.map((row) => (
                        <NFTCard key={row.original.id} {...row.original} />
                    ))}
                </div>
            ) : (
                <div className="w-full bg-[#1C1C1E] rounded-lg overflow-hidden">
                    <table className="w-full">
                        <thead>
                            {table.getHeaderGroups().map(headerGroup => (
                                <tr key={headerGroup.id} className="border-b border-[#2C2C2E]">
                                    {headerGroup.headers.map(header => (
                                        <th key={header.id} className="text-left px-6 py-4 text-white font-medium">
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
                                <tr key={row.id} className="border-b border-[#2C2C2E] hover:bg-[#2C2C2E] transition-colors">
                                    {row.getVisibleCells().map(cell => (
                                        <td key={cell.id} className="px-6 py-4 text-white">
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