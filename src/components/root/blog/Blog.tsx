"use client"

import React from 'react'
import BlogCard from '@/components/cards/BlogCard';
import { blogData } from '@/constants';

export default function Blog() {
    return (
        <div className="w-full flex justify-center bg-white dark:bg-bg-700 py-3 relative">
            <div className="container flex flex-col gap-10 items-center justify-between">
                {/* title  */}
                <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <h1 className='font-bold text-3xl md:text-5xl text-[#0B0B0D] dark:text-white'>Blog</h1>
                    <p className='text-black/80 dark:text-white/80 text-[18px] md:text-[28px]'>
                        Get the latest update on our featured articles
                    </p>
                </div>

                {/* featured articles */}
                <div className="w-full flex flex-col gap-8">
                    <h2 className='font-bold text-xl md:text-2xl text-[#0B0B0D] dark:text-white'>
                        Featured Articles
                    </h2>

                    <div className="w-full grid gap-y-8 xs:gap-y-10 xl:gap-y-12 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-4 md:gap-x-6">
                        {blogData.map((blog) => (
                            <BlogCard
                                key={blog.id}
                                {...blog}
                            />
                        ))}
                    </div>

                    <div className='w-full flex justify-center'>
                        <button className='flex items-center gap-2 bg-[#F5F5F5] text-[#0B0B0D] p-4 rounded-lg dark:bg-bg-700 dark:text-white dark:border dark:border-white'>Load More</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
