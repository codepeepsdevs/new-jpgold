import Image from "next/image";
import images from "../../../public/images";

const MarketPlaceHero = () => {
    return (
        <div className="w-full flex justify-center bg-white dark:bg-bg-700 py-3 relative">
            <div className="relative w-full">
                <Image
                    src={images.marketplace.marketplaceHero}
                    alt="marketplace"
                    className="w-full h-[300px] lg:h-[350px] object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-lg" />
                <div className="absolute inset-0 flex flex-col justify-end py-5 px-4 md:px-8">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                        JPNFT Market Place
                    </h1>
                    <p className="text-sm sm:text-lg text-white/90 max-w-[600px]">
                        Our collection of 10,000 NFTs generated on the Smart Chain, offering 100% unique visual characteristics.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MarketPlaceHero;
