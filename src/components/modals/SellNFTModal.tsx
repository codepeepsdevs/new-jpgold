"use client";

import { IoClose } from "react-icons/io5";
import Image, { StaticImageData } from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from 'react-dom';
import NFTCard from "../cards/NFTCards";
import images from "@/public/images";

interface NFT {
    id: number;
    name: string;
    imageUrl: string | StaticImageData;
    price: number;
    amount: number;
    myNFT: boolean;
}

interface SellNFTModalProps {
    nft: NFT;
    isOpen: boolean;
    onClose: () => void;
}

const SellNFTModal = ({ nft, isOpen, onClose }: SellNFTModalProps) => {
    const defaultModalData = {
        owner: "sigaglauren@gmail.com",
        tokenOwner: "$61.2941",
        amount: "5.8",
        listedPrice: "426.68",
        currentPrice: "$18,396.33",
        description: "NFT GOLD - One of a Kind"
    };

    if (typeof window === 'undefined') return null;

    return createPortal(
        <AnimatePresence mode="wait">
            {isOpen && (
                <div className="fixed inset-0 z-[9999] isolate">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 bg-black/50"
                        onClick={onClose}
                    />
                    <motion.aside
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{
                            type: "spring",
                            damping: 30,
                            stiffness: 300,
                        }}
                        className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white dark:bg-[#151515] shadow-xl overflow-y-auto"
                    >
                        <header className="sticky top-0 z-10 flex items-center justify-between p-4 bg-white dark:bg-[#151515] border-b border-gray-200 dark:border-gray-800">
                            <h3 className="text-lg font-medium text-[#050706] dark:text-white">
                                JPNFT #{nft.id}
                            </h3>
                            <button
                                onClick={onClose}
                                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                            >
                                <IoClose size={24} />
                            </button>
                        </header>

                        <div className="p-6 space-y-6">
                            <div className="w-2/3 mx-auto">
                                <NFTCard {...nft} />
                            </div>

                            {/* NFT Card Component would go here */}

                            <div className="space-y-4 pt-4">
                                <div className="flex gap-3">
                                    <div>
                                        <Image
                                            src={images.user.tokenOwner}
                                            alt="Owner"
                                            width={40}
                                            height={40}
                                            className="rounded-full"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <p className="text-base text-[#5A5A5A] dark:text-white">
                                            Current Owner
                                        </p>
                                        <span className="text-sm font-medium text-[#050706] dark:text-white/70">
                                            {defaultModalData.owner}
                                        </span>
                                    </div>
                                </div>

                                <div className="space-y-4 border-t border-gray-200 dark:border-gray-800 pt-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-[#5A5A5A] dark:text-white/70">Token Owner</span>
                                        <span className="text-[#050706] font-semibold dark:text-white">{defaultModalData.tokenOwner}</span>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <span className="text-[#5A5A5A] dark:text-white/70">Amount (g)</span>
                                        <span className="text-[#050706] font-semibold dark:text-white">{defaultModalData.amount}</span>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <span className="text-[#5A5A5A] dark:text-white/70">Listed price</span>
                                        <span className="text-[#050706] font-semibold dark:text-white">{defaultModalData.listedPrice}</span>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <span className="text-[#5A5A5A] dark:text-white/70">Current price</span>
                                        <span className="text-[#050706] font-semibold dark:text-white">{defaultModalData.currentPrice}</span>
                                    </div>
                                </div>

                                <div className="space-y-2 border-t border-gray-200 dark:border-gray-800 pt-4">
                                    <p className="text-[#5A5A5A] dark:text-white/70">Description</p>
                                    <p className="text-[#050706] font-semibold dark:text-white">{defaultModalData.description}</p>
                                </div>

                                <button className="w-full bg-black font-semibold text-white dark:bg-[#CC8F00] py-3 rounded-full transition-colors">
                                    Sell NFT
                                </button>
                            </div>
                        </div>
                    </motion.aside>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
};

export default SellNFTModal; 