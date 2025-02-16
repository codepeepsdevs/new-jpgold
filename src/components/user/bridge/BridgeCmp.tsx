"use client"

import UserCard from '@/components/UserCard'
import Image from 'next/image'
import { IoSwapVerticalSharp } from "react-icons/io5";
import React, { useState } from 'react';
import { SiSolana } from "react-icons/si";
import { FaEthereum } from "react-icons/fa";

const blockchainOptions = [
    {
        id: 'sol',
        name: 'Solana (SOL)',
        icon: SiSolana,
        iconColor: '#14F195',
        bgColor: '#000000'
    },
    {
        id: 'eth',
        name: 'Ethereum (ETH)',
        icon: FaEthereum,
        iconColor: '#FFFFFF',
        bgColor: '#627EEA'
    },
];

export default function BridgeCmp() {
    const [fromChain, setFromChain] = useState(blockchainOptions[0]);
    const [toChain, setToChain] = useState(blockchainOptions[1]);
    const [amount, setAmount] = useState('500 SOL');

    return (
        <div className="w-full flex flex-col md:flex-row items-start justify-between gap-4 pb-10">
            <UserCard className="w-full md:w-1/2">
                <div className="p-1 lg:p-5 space-y-6">
                    <h2 className="text-2xl font-bold text-[#0B0B0D] dark:text-white">Choose Blockchain</h2>

                    <div className="space-y-0 p-4 bg-[#F8F8F8] dark:bg-[#151515] border border-[#DDDDDD] dark:border-[#3D3D3D] rounded-xl">


                        <div className="bg-white dark:bg-[#151515] border p-1 border-[#E6E6E6] dark:border-[#3D3D3D] rounded-xl">

                            <div className="space-y-2 p-4 py-2 rounded-lg bg-white dark:bg-[#151515]">
                                <label className="text-sm font-semibold text-[#050706] dark:text-white">Transfer From</label>
                                <div className="relative">
                                    <select
                                        value={fromChain.id}
                                        onChange={(e) => setFromChain(blockchainOptions.find(chain => chain.id === e.target.value) || blockchainOptions[0])}
                                        className="w-full p-4 pl-12 dark:bg-[#151515] appearance-none border border-[#E3E3E8] dark:border-[#3D3D3D] rounded-lg focus:outline-none focus:border-[#CC8F00] bg-white text-[#0B0B0D] dark:text-white pr-10"
                                    >
                                        {blockchainOptions.map((chain) => (
                                            <option key={chain.id} value={chain.id}>
                                                {chain.name}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2">
                                        <div
                                            className="w-8 h-8 rounded-full flex items-center justify-center"
                                            style={{ backgroundColor: fromChain.bgColor }}
                                        >
                                            {React.createElement(fromChain.icon, {
                                                size: 16,
                                                color: fromChain.iconColor,
                                                className: "text-current"
                                            })}
                                        </div>
                                    </div>
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-center items-center py-2">
                                <div className="h-[1px] flex-1 bg-[#E6E6E6] dark:bg-[#3D3D3D]"></div>
                                <div className="mx-0">
                                    <button
                                        onClick={() => {
                                            const temp = fromChain;
                                            setFromChain(toChain);
                                            setToChain(temp);
                                        }}
                                        className="w-10 h-10 z-50 bg-[#F8F8F8] border border-[#E6E6E6] dark:border-none dark:bg-[#3D3D3D] rounded-full flex items-center justify-center hover:bg-[#EFEFEF] dark:hover:bg-[#4D4D4D] transition-colors"
                                    >
                                        <IoSwapVerticalSharp className="text-[#5A5B5A] dark:text-[#B4B5B4]" size={24} />
                                    </button>
                                </div>
                                <div className="h-[1px] flex-1 bg-[#E6E6E6] dark:bg-[#3D3D3D]"></div>
                            </div>

                            <div className="space-y-2 p-4 py-2 rounded-lg bg-white dark:bg-[#151515]">
                                <label className="text-sm text-[#0B0B0D] dark:text-white">Transfer To</label>
                                <div className="relative">
                                    <select
                                        value={toChain.id}
                                        onChange={(e) => setToChain(blockchainOptions.find(chain => chain.id === e.target.value) || blockchainOptions[1])}
                                        className="w-full p-4 pl-12 appearance-none dark:bg-[#151515] border border-[#E3E3E8] dark:border-[#3D3D3D] rounded-lg focus:outline-none focus:border-[#CC8F00] bg-white text-[#0B0B0D] dark:text-white pr-10"
                                    >
                                        {blockchainOptions.map((chain) => (
                                            <option key={chain.id} value={chain.id}>
                                                {chain.name}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2">
                                        <div
                                            className="w-8 h-8 rounded-full flex items-center justify-center"
                                            style={{ backgroundColor: toChain.bgColor }}
                                        >
                                            {React.createElement(toChain.icon, {
                                                size: 16,
                                                color: toChain.iconColor,
                                                className: "text-current"
                                            })}
                                        </div>
                                    </div>
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="space-y-2">
                        <label className="text-base font-semibold text-[#0B0B0D] dark:text-white">Amount</label>
                        <input
                            type="text"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full p-3 border border-[#E3E3E8] dark:border-[#3D3D3D] rounded-lg focus:outline-none focus:border-[#CC8F00] bg-white dark:bg-[#0E0E0E] text-[#0B0B0D] dark:text-white"
                        />
                    </div>
                </div>
            </UserCard>

            <UserCard className="w-full md:w-1/2">
                <div className="p-1 lg:p-5 space-y-6">
                    <div className="space-y-4">
                        <div className='space-y-4 p-4 bg-[#F8F8F8] dark:bg-[#090909] border border-[#E6E6E6] dark:border-[#3D3D3D] rounded-xl'>

                            <div className="flex justify-between">
                                <span className="text-[#282928] dark:text-white/70">Best Price</span>
                                <span className="text-[#050706] font-semibold dark:text-white">500 SOL = 12.34 ETH</span>
                            </div>
                            <hr className='dark:border-[#3D3D3D]' />
                            <div className="flex justify-between">
                                <span className="text-[#282928] dark:text-white/70">Network</span>
                                <span className="text-[#050706] font-semibold dark:text-white">Solana → Ethereum</span>
                            </div>
                            <hr className='dark:border-[#3D3D3D]' />
                            <div className="flex justify-between">
                                <span className="text-[#282928] dark:text-white/70">Fee</span>
                                <span className="text-[#050706] font-semibold dark:text-white">$4.41</span>
                            </div>
                            <hr className='dark:border-[#3D3D3D]' />
                            <div className="flex justify-between">
                                <span className="text-[#282928] dark:text-white/70">Provider</span>
                                <span className="text-[#050706] font-semibold dark:text-white">0x + Allbridge</span>
                            </div>
                            <hr className='dark:border-[#3D3D3D]' />
                            <div className="flex justify-between">
                                <span className="text-[#282928] dark:text-white/70">Est. Transfer Time</span>
                                <span className="text-[#050706] font-semibold dark:text-white">5 Minutes</span>
                            </div>
                        </div>

                        <hr className='dark:border-[#3D3D3D]' />
                        <div className="pt-4">
                            <label className="text-base font-semibold text-[#050706] dark:text-white">Select Blockchain</label>
                            <div className="relative mt-2">
                                <select
                                    value={toChain.id}
                                    onChange={(e) => setToChain(blockchainOptions.find(chain => chain.id === e.target.value) || blockchainOptions[1])}
                                    className="w-full p-4 dark:bg-[#151515] pl-12 appearance-none border border-[#E3E3E8] dark:border-[#3D3D3D] rounded-lg focus:outline-none focus:border-[#CC8F00] bg-white text-[#0B0B0D] dark:text-white pr-10"
                                >
                                    {blockchainOptions.map((chain) => (
                                        <option key={chain.id} value={chain.id}>
                                            {chain.name}
                                        </option>
                                    ))}
                                </select>
                                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                                    <div
                                        className="w-8 h-8 rounded-full flex items-center justify-center"
                                        style={{ backgroundColor: toChain.bgColor }}
                                    >
                                        {React.createElement(toChain.icon, {
                                            size: 16,
                                            color: toChain.iconColor,
                                            className: "text-current"
                                        })}
                                    </div>
                                </div>
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <button className="w-full bg-black dark:bg-gold-200 text-white py-4 rounded-full hover:bg-gray-900 transition-colors">
                            Bridge Now
                        </button>
                    </div>
                </div>
            </UserCard>
        </div>
    );
}
