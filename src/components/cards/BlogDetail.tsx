"use client"

import { blogData } from '@/constants';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import Link from 'next/link';

export default function BlogDetail() {
    const { id } = useParams<{ id: string }>();

    const blog = blogData.find(blog => blog.id === Number(id));

    if (!blog) {
        return (
            <div className="w-full flex justify-center items-center min-h-[400px] bg-white dark:bg-bg-700">
                <p className="text-lg text-gray-600 dark:text-gray-400">Blog not found</p>
            </div>
        );
    }

    return (
        <div className="w-full flex flex-col justify-center bg-white dark:bg-bg-700 py-8">
            <div className="container max-w-4xl space-y-4 md:space-y-8">
                {/* Header */}
                <div className="mb-6">
                    <div className="flex items-center gap-2 md:gap-5 text-lg text-gray-600 dark:text-gray-400 mb-4 md:mb-10">
                        <span className='font-bold'>{blog.tag}</span>

                        <span className='text-[#7B828E]'>{blog.date}</span>
                    </div>
                    <h1 className="text-2xl md:text-5xl font-bold text-[#0B0B0D] dark:text-white mb-6">
                        {blog.title}
                    </h1>

                </div>

                {/* Featured Image */}
                <div className="relative w-full h-[250px] md:h-[500px] md:rounded-xl overflow-hidden">
                    <Image
                        src={blog.image}
                        alt={blog.title}
                        fill
                        className="object-cover"
                    />
                </div>

                {/* Content */}
                <div className="prose dark:prose-invert max-w-none">
                    <p className="text-lg text-[#0B0B0D] dark:text-white mb-6">
                        In this week&apos;s Business Spotlight, Awele talks us through her journey, some challenges she has faced, and what she has found most rewarding through it all.
                    </p>

                    <h2 className="text-2xl font-bold text-[#0B0B0D] dark:text-white mb-4">
                        Tell us the story behind The Art Room?
                    </h2>

                    <p className="text-gray-700 dark:text-gray-300 mb-6">
                        The Art Room was an idea I came up with after I dealt with anxiety in 2017. Moving back to Lagos I realized there was a mental space for people in a relaxed to express using art and that was how the art room came about.
                    </p>

                    <h2 className="text-2xl font-bold text-[#0B0B0D] dark:text-white mb-4">
                        How did your first session?
                    </h2>

                    <p className="text-gray-700 dark:text-gray-300 mb-6">
                        It was before we started the first session. To see everything that you would had as an idea become something in reality that was able to be tangible and rewarding. We had prepped for this session for over a month just waiting to see how many people would show up. We put the word out and sold out in a few days, which encouraged us to push through and put more into the session.
                    </p>
                </div>

                {/* author  */}
                <div className="flex items-center gap-2">
                    <div className="relative w-14 h-14 rounded-full overflow-hidden">
                        <Image
                            src={blog.image}
                            alt="Author"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div>
                        <p className="font-bold text-lg text-[#060809] dark:text-white">Skyler Vencers</p>
                        <p className="text-[#393E46] dark:text-white/70">Product Marketing and Communications</p>
                    </div>
                </div>

                {/* Share Post Section */}
                <div className='flex flex-col gap-4'>
                    <p className='text-[#8F96A3] font-semibold'>SHARE THIS POST ON</p>
                    <div className='flex gap-4'>
                        <button
                            onClick={() => window.open(`https://facebook.com/share.php?u=${window.location.href}`, '_blank')}
                            className='w-10 h-10 rounded-full bg-[#F8F8F8] dark:bg-white flex items-center justify-center hover:bg-[#E5E5E5] dark:hover:bg-gray-700 transition-colors'
                        >
                            <FaFacebookF className='text-[#D4A015]' />
                        </button>
                        <button
                            onClick={() => window.open(`https://twitter.com/intent/tweet?url=${window.location.href}`, '_blank')}
                            className='w-10 h-10 rounded-full bg-[#F8F8F8] dark:bg-white flex items-center justify-center hover:bg-[#E5E5E5] dark:hover:bg-gray-700 transition-colors'
                        >
                            <FaTwitter className='text-[#D4A015]' />
                        </button>
                        <button
                            onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`, '_blank')}
                            className='w-10 h-10 rounded-full bg-[#F8F8F8] dark:bg-white flex items-center justify-center hover:bg-[#E5E5E5] dark:hover:bg-gray-700 transition-colors'
                        >
                            <FaLinkedinIn className='text-[#D4A015]' />
                        </button>
                    </div>
                </div>

            </div>
            {/* More Posts Section */}
            <div className='mt-10 md:mt-16 py-10 md:py-16 bg-[#FBF9E9] dark:bg-[#171718]'>
                <div className='container'>
                    <h2 className='text-2xl md:text-3xl font-bold  dark:text-white mb-8'>
                        More posts like this
                    </h2>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6'>
                        {blogData
                            .filter(post => post.id !== blog.id)
                            .slice(0, 2)
                            .map((post) => (
                                <div key={post.id} className='flex flex-col'>
                                    <Link href={`/blog/${post.id}`}>
                                        <div className='relative w-full h-[200px] rounded-t-lg overflow-hidden'>
                                            <Image
                                                src={post.image}
                                                alt={post.title}
                                                fill
                                                className='object-cover'
                                            />
                                        </div>
                                    </Link>
                                    <div className='flex flex-col gap-2 bg-white dark:bg-[#3D3D3D] rounded-b-lg p-4'>

                                        <Link href={`/blog/${post.id}`}>
                                            <h3 className='text-lg font-semibold text-[#0B0B0D] dark:text-white hover:text-[#CC8F00] dark:hover:text-[#CC8F00] transition-colors line-clamp-2'>
                                                {post.title}
                                            </h3>
                                        </Link>
                                        <p className='text-sm font-medium text-[#060809] truncate w-2/3 dark:text-[#D9D9D9] line-clamp-2'>
                                            {post.description}...
                                        </p>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
