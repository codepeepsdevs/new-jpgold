"use client"

import { FC } from 'react';
import Image from 'next/image';
import { useCartStore } from '@/store/useCartStore';
import { MdVerified } from 'react-icons/md';
import { IoTrash } from 'react-icons/io5';
import Link from 'next/link';
import OrderSummary from './OrderSummary';
import { FaArrowLeftLong } from 'react-icons/fa6';

const Cart: FC = () => {
    const { items, removeItem, getTotalPrice } = useCartStore();

    return (
        <div className="container mx-auto py-8">
            {/* Back button and title */}
            <div className="flex items-center gap-2 mb-8">
                <Link href="/marketplace">
                    <FaArrowLeftLong size={20} className="text-[#797979] dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200" />
                </Link>
                <h1 className="text-2xl font-bold dark:text-white">Checkout</h1>
            </div>

            <div className="lg:container sm:w-5/6 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Cart Items */}
                <div className="bg-white dark:bg-[#1C1C1C] dark:border-none shadow-lg border border-[#E3E3E8] h-fit dark:bg-bg-800 rounded-lg p-6">
                    <h2 className="text-lg font-semibold mb-4 dark:text-white">Your Cart</h2>
                    <div className="space-y-4">
                        {items.map((item) => (
                            <div key={item.id} className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-8 h-8 sm:w-16 sm:h-16 relative bg-gold-100 dark:bg-gold-dark-100 rounded-lg">
                                        <Image
                                            src={item.imageUrl}
                                            alt={`JAPAUL GOLD NFT #${item.id}`}
                                            width={64}
                                            height={64}
                                            className="object-contain p-2"
                                        />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-xs sm:text-lg font-semibold dark:text-white">JPNFT#{item.id}</h3>
                                            {item.verified && <MdVerified className="text-gold-200" size={20} />}
                                        </div>
                                        <p className="text-xs sm:text-lg text-black/65 dark:text-white/65">Current owner</p>
                                        <p className="text-[10px] sm:text-lg font-semibold text-black dark:text-white">tunde.badamosi@gmail.com</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="font-semibold dark:text-white">
                                        ${item.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                    </span>
                                    <button
                                        onClick={() => removeItem(item.id)}
                                        className="text-[#1C1B1F] hover:text-red-500"
                                    >
                                        <IoTrash size={20} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Order summary */}
                <OrderSummary
                    subtotal={getTotalPrice()}
                    fee={0.015 * getTotalPrice()}
                    feePercentage={0.15}
                    maticRate={145.973}
                />
            </div>
        </div>
    );
};

export default Cart; 