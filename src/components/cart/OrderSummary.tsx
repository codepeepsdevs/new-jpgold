"use client"

import { FC } from 'react';
import Image from 'next/image';
import { useCartStore } from '@/store/useCartStore';
import { useForm } from 'react-hook-form';

interface OrderSummaryProps {
    subtotal: number;
    fee: number;
    feePercentage?: number;
    maticRate?: number;
}

interface FormInputs {
    recipientEmail: string;
    walletAddress: string;
}

const OrderSummary: FC<OrderSummaryProps> = ({
    subtotal,
    fee,
    feePercentage = 0.15,
    maticRate = 145.973
}) => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>({
        defaultValues: {
            recipientEmail: '',
            walletAddress: ''
        }
    });

    const feeAmount = subtotal * (feePercentage / 100);
    const total = subtotal + feeAmount;
    const maticAmount = total * maticRate;

    const onSubmit = (data: FormInputs) => {
        console.log('Form data:', data);
        // Handle form submission
    };

    return (
        <div className="bg-white dark:bg-[#1C1C1C] dark:border-none shadow-lg border border-[#E3E3E8] h-fit dark:bg-bg-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-6 dark:text-white">Order Summary</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 dark:border-none sm:p-8 rounded-lg">
                {/* Price Summary */}
                <div className="space-y-4 dark:bg-[#0E0E0E] dark:p-4 rounded-lg">
                    <div className="flex justify-between">
                        <span className="dark:text-white/60 text-[#282928] dark:text-gray-400">Subtotal</span>
                        <span className="dark:text-white font-semibold">
                            ${subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </span>
                    </div>

                    <div className="flex justify-between">
                        <span className="dark:text-white/60 text-[#282928] dark:text-gray-400">Fee</span>
                        <span className="dark:text-white font-semibold">{fee}g</span>
                    </div>

                    <div className="flex justify-between">
                        <span className="dark:text-white/60 text-[#282928] dark:text-gray-400">Fee ({feePercentage}%)</span>
                        <span className="dark:text-white font-semibold">
                            ${feeAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </span>
                    </div>

                    <div className="flex justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                        <span className="font-semibold dark:text-white/60">Total</span>
                        <div className="text-right">
                            <div className="font-semibold dark:text-white">
                                ${total.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                            </div>
                            <div className="text-md text-[#5A5B5A] dark:text-[#E6E7E6]">
                                {maticAmount.toFixed(3)} MATIC
                            </div>
                        </div>
                    </div>
                </div>

                <hr className="border-[#F8F8F8]" />

                {/* Payment Method */}
                <div>
                    <h3 className="font-semibold mb-2 dark:text-white">Payment Method</h3>
                    <div className="flex items-center gap-2 p-3 rounded-lg">
                        <input type="radio" checked readOnly />
                        <span className="dark:text-white"><span className='font-bold'>Wallet</span> (Matic)</span>
                    </div>
                </div>

                <hr className="border-[#F8F8F8]" />

                {/* Recipient Details */}
                <div className="space-y-4">
                    <div>
                        <label className="block font-medium text-[#050706] dark:text-gray-300 mb-1">
                            Recipient JPGold Email Address
                        </label>
                        <input
                            type="email"
                            {...register("recipientEmail", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid email address"
                                }
                            })}
                            className="w-full px-4 py-3 rounded-lg border border-[] focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-bg-dark-400 dark:border-gray-700"
                            placeholder="hollacomoestas@gmail.com"
                        />
                        {errors.recipientEmail && (
                            <p className="mt-1 text-sm text-red-500">{errors.recipientEmail.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block font-medium text-[#050706] dark:text-gray-300 mb-1">
                            Recipient Wallet Address
                        </label>
                        <input
                            type="text"
                            {...register("walletAddress", {
                                required: "Wallet address is required",
                                pattern: {
                                    value: /^0x[a-fA-F0-9]{40}$/,
                                    message: "Invalid wallet address"
                                }
                            })}
                            className="w-full px-4 py-3 rounded-lg border border-[#C5C5CA] focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-bg-dark-400 dark:border-gray-700"
                            placeholder="0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606e5f8"
                        />
                        {errors.walletAddress && (
                            <p className="mt-1 text-sm text-red-500">{errors.walletAddress.message}</p>
                        )}
                    </div>
                </div>

                {/* Buy Button */}
                <button
                    type="submit"
                    className="w-full bg-gold-200 font-semibold text-white py-3 rounded-lg transition-colors hover:bg-gold-300"
                >
                    Buy (${total.toLocaleString('en-US', { minimumFractionDigits: 2 })})
                </button>
            </form>
        </div>
    );
};

export default OrderSummary; 