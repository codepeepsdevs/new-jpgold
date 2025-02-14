"use client"

import { useForm } from 'react-hook-form';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useTheme } from '@/store/theme.store';

interface ContactFormInputs {
    fullName: string;
    email: string;
    phone: string;
    message: string;
}

const schema = yup.object({
    fullName: yup
        .string()
        .required('Full name is required')
        .min(2, 'Name must be at least 2 characters'),
    email: yup
        .string()
        .required('Email is required')
        .email('Invalid email address'),
    phone: yup
        .string()
        .required('Phone number is required')
        .matches(
            /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
            'Invalid phone number'
        ),
    message: yup
        .string()
        .required('Message is required')
        .min(10, 'Message must be at least 10 characters'),
}).required();

export default function ContactForm() {
    const theme = useTheme();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<ContactFormInputs>({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data: ContactFormInputs) => {
        try {
            // Handle form submission here
            console.log('Form data:', data);
            toast.success('Message sent successfully!');
            reset(); // Reset form after successful submission
        } catch (error) {
            console.log(error);
            toast.error('Failed to send message. Please try again.');
        }
    };

    return (
        <div className="md:bg-white md:dark:bg-[#171718] bg-none dark:border-none rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm w-full md:w-full 3xl:w-5/6 md:border border-[#DCDCDC]">
            {/* Logo */}
            <div className="mb-6 py-5 hidden md:block">
                <Image
                    src={theme === 'dark' ? "/images/logo.png" : "/images/logo-dark.png"}
                    alt="JPGold Logo"
                    width={140}
                    height={60}
                    className="mx-auto"
                />
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full md:w-5/6 mx-auto">
                {/* Full Name */}
                <div>
                    <label className="block text-[#1F2130] dark:text-white font-semibold mb-1">
                        Full Name
                    </label>
                    <input
                        type="text"
                        {...register("fullName")}
                        className="w-full px-4 py-2 border border-[#E3E3E8] dark:border-[#323232] dark:bg-[#171718] rounded-lg focus:outline-none focus:border-[#CC8F00]"
                        placeholder="Femi idowu"
                    />
                    {errors.fullName && (
                        <p className="mt-1 text-sm text-red-500">{errors.fullName.message}</p>
                    )}
                </div>

                {/* Email */}
                <div>
                    <label className="block text-[#1F2130] dark:text-white font-semibold mb-1">
                        Email Address
                    </label>
                    <input
                        type="email"
                        {...register("email")}
                        className="w-full px-4 py-2 border border-[#E3E3E8] dark:border-[#323232] dark:bg-[#171718] rounded-lg focus:outline-none focus:border-[#CC8F00]"
                        placeholder="femiidowu@gmail.com"
                    />
                    {errors.email && (
                        <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                    )}
                </div>

                {/* Phone */}
                <div>
                    <label className="block text-[#1F2130] dark:text-white font-semibold mb-1">
                        Phone
                    </label>
                    <input
                        type="tel"
                        {...register("phone")}
                        className="w-full px-4 py-2 border border-[#E3E3E8] dark:border-[#323232] dark:bg-[#171718] rounded-lg focus:outline-none focus:border-[#CC8F00]"
                        placeholder="+234 807 6775"
                    />
                    {errors.phone && (
                        <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
                    )}
                </div>

                {/* Message */}
                <div>
                    <label className="block text-[#1F2130] dark:text-white font-semibold mb-1">
                        Message
                    </label>
                    <textarea
                        {...register("message")}
                        rows={4}
                        className="w-full px-4 py-2 border border-[#E3E3E8] dark:border-[#323232] dark:bg-[#171718] rounded-lg focus:outline-none focus:border-[#CC8F00] resize-none"
                        placeholder="Hi, Would like to check the availability the property.&#10;Please acknowledge.&#10;Thank you!"
                    />
                    {errors.message && (
                        <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-[#CC8F00] text-white py-4 rounded-lg hover:bg-[#B37E00] transition-colors"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}
