import Image, { StaticImageData } from 'next/image';
import { MdVerified } from 'react-icons/md';
import { IoMdShare } from "react-icons/io";

interface NFTPreviewProps {
    id: string;
    imageUrl: string | StaticImageData;
    owner: string;
    tokenOwner: string;
    amount: string;
    currentPrice: number;
    listedPrice: number;
    description: string;
}

const NFTPreview = ({
    id,
    imageUrl,
    owner,
    tokenOwner,
    amount,
    currentPrice,
    listedPrice,
    description
}: NFTPreviewProps) => {
    return (
        <div className="bg-white rounded-lg p-6 shadow-lg border border-[#E3E3E8] h-fit dark:bg-[#1C1C1C] dark:border-none">
            {/* NFT Image */}

            <div className="w-full mx-auto bg-[#FEFEF1]/50 dark:bg-[#FBF5DE]/10 rounded-lg p-4 mb-4">
                <div className="relative mx-auto h-60 w-60 aspect-square mb-6">
                    <Image
                        src={imageUrl}
                        alt={`JPGNFT #${id}`}
                        fill
                        className="object-contain"
                    />
                </div>
            </div>

            {/* NFT Title and Share */}
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold dark:text-white">
                        JPGNFT #{id}
                    </h1>
                    <MdVerified className="text-gold-200" size={24} />
                </div>
                <button className="p-3 dark:bg-white/5 bg-black/5 rounded">
                    <IoMdShare className="text-[#1C1B1F] dark:text-white" size={20} />
                </button>
            </div>

            {/* NFT Details */}
            <div className="space-y-4">
                <div>
                    <p className="text-gray-600 dark:text-white/65">Current owner</p>
                    <p className="font-medium dark:text-white">{owner}</p>
                </div>

                {/* tokens */}
                <div className="grid grid-cols-1 gap-4 bg-[#F7F7F7]/50 dark:bg-black/50 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                        <p className="text-black/65 dark:text-white/65">Token owner</p>
                        <p className="font-medium dark:text-white">{tokenOwner}</p>
                    </div>

                    <div className="flex justify-between items-center">
                        <p className="text-black/65 dark:text-white/65">Amount</p>
                        <p className="font-medium dark:text-white">{amount}</p>
                    </div>

                    <div className="flex justify-between items-center">
                        <p className="text-black/65 dark:text-white/65">Current price</p>
                        <p className="font-medium dark:text-white">${currentPrice}</p>
                    </div>

                    <div className="flex justify-between items-center">
                        <p className="text-black/65 dark:text-white/65">Listed price</p>
                        <p className="font-medium dark:text-white">${listedPrice}</p>
                    </div>
                </div>

                <div>
                    <p className="text-black/65 dark:text-white/65">Description</p>
                    <p className="dark:text-white">{description}</p>
                </div>
            </div>
        </div>
    );
};

export default NFTPreview; 