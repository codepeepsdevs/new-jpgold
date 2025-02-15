import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { StaticImageData } from 'next/image';
interface BlogCardProps {
    id: number;
    title: string;
    description: string;
    image: string | StaticImageData;
    tag: string;
    date: string;
    duration: string;
}

export default function BlogCard({
    id,
    title,
    description,
    image,
    tag,
    date,
    duration
}: BlogCardProps) {
    return (
        <motion.div className="w-full flex flex-col gap-3 2xl:gap-4">
            <div className="flex flex-col gap-3.5 2xl:gap-4">
                <Link href={`/blog/${id}`}>
                    <div className="relative w-full h-[16rem] sm:h-[18rem] xl:h-[20rem] rounded-lg sm:rounded-xl overflow-hidden">
                        <div className="absolute inset-0 bg-black opacity-10 z-10 rounded-lg sm:rounded-xl transition-opacity duration-300 hover:opacity-20"></div>
                        <Image
                            src={image}
                            alt={title}
                            fill
                            style={{ objectFit: "cover" }}
                            className="z-0 w-full h-full rounded-lg sm:rounded-xl"
                        />
                    </div>
                </Link>
                <span className="w-fit px-2 py-1.5 rounded-md bg-[#F8F8F8] dark:bg-gray-800 text-[#0B0B0D] dark:text-white font-medium text-xs">
                    {tag}
                </span>
            </div>
            <div className="flex flex-col gap-3.5 2xl:gap-4">
                <Link href={`/blog/${id}`}>
                    <h2 className="text-[#0B0B0D] dark:text-white font-semibold text-sm lg:text-base hover:text-[#CC8F00] dark:hover:text-[#CC8F00] transition-colors">
                        {title}
                    </h2>
                </Link>
                <p className="text-[#6C7574] dark:text-[#D9D9D9] text-xs lg:text-sm">
                    {description}
                </p>
                <p className="font-medium text-[#0B0B0D] dark:text-white text-xs">
                    {date} -- {duration}
                </p>
            </div>
        </motion.div>
    );
} 