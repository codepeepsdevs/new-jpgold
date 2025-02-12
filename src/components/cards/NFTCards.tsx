"use client"

import { MdVerified } from "react-icons/md";
import Image, { StaticImageData } from "next/image";
import { FC, useState } from "react";
import { FaShoppingCart } from 'react-icons/fa';
import { useCartStore } from '@/store/useCartStore';
import { BiTrash } from "react-icons/bi";
import { useRouter } from "next/navigation";

interface NFTCardProps {
    id: number;
    amount: number;
    price: number;
    imageUrl: string | StaticImageData;
    verified?: boolean;
}

const NFTCard: FC<NFTCardProps> = ({ id, amount, price, imageUrl, verified = false }) => {
    const router = useRouter();
    const [isHovered, setIsHovered] = useState(false);
    const { addItem, removeItem, items } = useCartStore();

    const isInCart = items.some(item => item.id === id);

    const handleCartClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent card click event
        if (isInCart) {
            removeItem(id);
        } else {
            addItem({ id, amount, price, imageUrl, verified });
        }
    };


    const handleBuyNow = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent double navigation
        router.push(`/buy/${id}`);
    };

    const handleCardClick = () => {
        router.push(`/buy/${id}`);
    };

    return (
        <div
            className="dark:bg-bg-dark-500 rounded-lg transition-transform hover:cursor-pointer duration-200 hover:-translate-y-1 shadow-lg"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div onClick={handleCardClick} className="h-[200px] rounded-t-xl border-2 border-[#FBF5DE] relative bg-gold-100/50 dark:bg-gold-dark-100 p-4">
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

            <div className="space-y-1 p-4">
                <div className="flex items-center gap-2">
                    <h3 className="text-xl dark:text-white font-[700]">JPNFT#{id}</h3>
                    {verified && (
                        <MdVerified className="text-gold-200" size={20} />
                    )}
                </div>

                <div className="pt-2 flex justify-between text-sm text-black/70 dark:text-white/70 dark:text-gray-400">
                    <span>Amount</span>
                    <span>Listed Price</span>
                </div>

                <div className="flex justify-between font-[700] text-black dark:text-white">
                    <span className="">{amount} grams</span>
                    <span className="">${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>


                <hr />

                {isHovered ? (
                    <div className="w-full flex justify-between items-center gap-2">
                        <button onClick={handleBuyNow} className="w-5/6 bg-gold-200 p-3 font-medium text-white rounded-lg">
                            Buy (${price.toLocaleString('en-US', { minimumFractionDigits: 2 })})
                        </button>
                        <button
                            onClick={handleCartClick}
                            className={`w-1/6 ${isInCart ? 'bg-primary-500' : 'bg-black/5 dark:bg-white/5'} h-fit hover:bg-primary-600 p-4 rounded-lg transition-colors duration-200`}
                        >
                            <div className="top-0 h-full rounded-r-lg flex items-center justify-center">
                                {isInCart ? (
                                    <BiTrash className="text-red-500 dark:text-red-500" size={20} />
                                ) : (
                                    <FaShoppingCart className={'text-black dark:text-white'} size={20} />
                                )}
                            </div>
                        </button>
                    </div>
                ) : (
                    <div className="w-full flex justify-between items-center gap-2">
                        <button className="dark:text-white text-xl p-4 font-bold">
                            ${price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NFTCard;

