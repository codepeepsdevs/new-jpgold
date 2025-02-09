"use client"

import { MdVerified } from "react-icons/md";
import Image, { StaticImageData } from "next/image";
import { FC, useState } from "react";
import { FaShoppingCart } from 'react-icons/fa';

interface NFTCardProps {
    id: number;
    amount: number;
    price: number;
    imageUrl: string | StaticImageData;
    verified?: boolean;
}

const NFTCard: FC<NFTCardProps> = ({ id, amount, price, imageUrl, verified = false }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="bg-bg-dark-500 dark:bg-bg-800 rounded-lg transition-transform hover:cursor-pointer duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-primary-500 border border-border-100"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="h-[200px] relative bg-gold-100 dark:bg-gold-dark-100 p-4">
                <div className="relative h-full w-full flex items-center justify-center">
                    <Image
                        src={imageUrl}
                        alt={`JPNFT #${id}`}
                        width={150}
                        height={150}
                        className="object-contain"
                    />
                </div>
            </div>

            <div className="space-y-3 p-4">
                <div className="flex items-center gap-2">
                    <h3 className="text-xl dark:text-white font-bold">JPNFT#{id}</h3>
                    {verified && (
                        <MdVerified className="text-gold-200" size={20} />
                    )}
                </div>

                <div className="flex justify-between text-sm text-black/70 dark:text-white/70 dark:text-gray-400">
                    <span>Amount</span>
                    <span>Listed Price</span>
                </div>

                <div className="flex justify-between dark:text-white">
                    <span className="font-medium">{amount} grams</span>
                    <span className="font-medium">${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>


                <hr />

                {isHovered ? (
                    <div className="w-full flex justify-between items-center gap-2">
                        <button className="w-5/6 bg-gold-200 p-3 font-medium text-white rounded-lg">Buy (${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })})</button>


                        <button className="w-1/6 bg-black/5 dark:bg-white/5 h-fit hover:bg-primary-600 p-4 rounded-lg transition-colors duration-200">

                            <div className="top-0 h-full rounded-r-lg flex items-center justify-center">
                                <FaShoppingCart className="text-black dark:text-white" size={20} />
                            </div>
                        </button>
                    </div>
                ) : <div className="w-full flex justify-between items-center gap-2">
                    <button className="dark:text-white text-xl p-4 font-bold">${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</button>

                </div>}
            </div>
        </div>
    );
};

export default NFTCard;
