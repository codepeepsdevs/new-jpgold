"use client"

import { useState } from 'react';
import Image from 'next/image';
import NFTCard from '../../cards/NFTCards';
import images from '../../../../public/images';
import { IoList, IoSearch, IoChevronDown, IoCheckmark, IoCart } from 'react-icons/io5';
import { TbLayoutGrid } from 'react-icons/tb';
import { MdVerified } from 'react-icons/md';

const nftListData = [
    {
        id: 1,
        amount: 5.8,
        price: 1455.92,
        imageUrl: images.marketplace.nftGold,
        verified: true
    },
    {
        id: 2,
        amount: 5.8,
        price: 1455.92,
        imageUrl: images.marketplace.nftGold,
        verified: true
    },
    {
        id: 3,
        amount: 5.8,
        price: 1455.92,
        imageUrl: images.marketplace.nftGold,
        verified: true
    },
    {
        id: 4,
        amount: 5.8,
        price: 1455.92,
        imageUrl: images.marketplace.nftGold,
        verified: true
    },
    {
        id: 5,
        amount: 3.5,
        price: 1114.53,
        imageUrl: images.marketplace.nftGold,
        verified: true
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
    const [hoveredId, setHoveredId] = useState<number | null>(null);

    return (
        <section className="w-full space-y-4 sm:space-y-8 pt-4 sm:pt-8">
            {/* Header with controls - Mobile first design */}
            <div className="flex flex-col sm:flex-row justify-between gap-3 p-4 bg-[#F6F6F6] dark:bg-bg-dark-400 rounded-lg">
                {/* Search Bar */}
                <div className="relative w-full sm:w-1/2">
                    <div className="flex items-center gap-2 bg-white dark:bg-[#1C1C1E] border border-[#D5D5DD] rounded-lg px-4 py-3">
                        <IoSearch size={20} className="text-gray-500 dark:text-[#4E4E4E]" />
                        <input
                            type="text"
                            placeholder="Search nft"
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


                    {/* View Toggle - Hidden on mobile */}
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

            {/* List View */}
            {!isGridView ? (
                <div className="w-full dark:bg-bg-700 border border-p[#E2E2E2] p-2 rounded-lg overflow-hidden">
                    {/* Table Header */}
                    <div className="grid grid-cols-7 px-6 py-4 dark:text-white border-b border-[#E2E2E2]">
                        <div>Name</div>
                        <div>Amount</div>
                        <div>Listed Price</div>
                        <div>Today</div>
                        <div>7 Days</div>
                        <div>Current Price</div>
                        <div></div>
                    </div>

                    {/* Table Body */}
                    <div>
                        {nftListData.map((nft) => (
                            <div
                                key={nft.id}
                                className="grid grid-cols-7 font-bold px-6 py-4 dark:text-white dark:hover:bg-[#2C2C2E] transition-colors border-b border-[#E2E2E2] items-center"
                                onMouseEnter={() => setHoveredId(nft.id)}
                                onMouseLeave={() => setHoveredId(null)}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gold-100 dark:bg-gold-dark-100 rounded-lg flex items-center justify-center">
                                        <Image
                                            src={nft.imageUrl}
                                            alt={`JPNFT #${nft.id}`}
                                            width={32}
                                            height={32}
                                            className="object-contain"
                                        />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span>JPNFT#{nft.id}</span>
                                        {nft.verified && (
                                            <MdVerified className="text-gold-200" size={20} />
                                        )}
                                    </div>
                                </div>
                                <div>{nft.amount} grams</div>
                                <div className='font-bold'>${nft.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
                                <div className="flex items-center gap-1 text-red-500">
                                    <span>▼</span>
                                    <span>12.24%</span>
                                </div>
                                <div className="flex items-center gap-1 text-green-500">
                                    <span>▲</span>
                                    <span>12.21%</span>
                                </div>
                                <div>${nft.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
                                <div className="flex items-center gap-2 justify-end">
                                    {hoveredId === nft.id && (
                                        <>
                                            <button className="px-4 bg-gold-200 text-white bg-primary-500 hover:bg-primary-600 py-2 rounded-lg transition-colors">
                                                Buy
                                            </button>
                                            <button className="p-2 bg-white/5 rounded-lg transition-colors">
                                                <IoCart size={25} />
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                // Grid View
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {nftListData.map((nft) => (
                        <NFTCard key={nft.id} {...nft} />
                    ))}
                </div>
            )}
        </section>
    );
};

export default NFTList; 