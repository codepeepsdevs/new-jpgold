"use client";

import UserCard from "@/components/UserCard";
import { useEffect, useMemo, useState } from "react";
import Image, { StaticImageData } from "next/image";
import images from "@/public/images";
import { IoSwapVertical } from "react-icons/io5";
import icons from "@/public/icons";
import useWeb3ModalStore from "@/store/web3Modal.store";
import { useWallet } from "@solana/wallet-adapter-react";
import { useGetGoldPrice } from "@/api/metal-price/metal-price.queries";
import { useWalletInfo } from "@/hooks/useWalletInfo";
import SkeletonComponent from "@/components/Skeleton";
import {
  formatNumberWithoutExponential,
  uploadToPinata,
} from "@/utils/utilityFunctions";
import SpinnerLoader from "@/components/SpinnerLoader";
import { getProvider, mintNft } from "@/services/jpgnft/jpgnft";
import toast from "react-hot-toast";

interface PaymentOption {
  value: string;
  label: string;
  image: StaticImageData | string;
}

interface ChainOption {
  value: string;
  label: string;
  image: StaticImageData | string;
}

const chainOptions: ChainOption[] = [
  {
    value: "solana",
    label: "Solana",
    image: icons.coin.solIcon,
  },
];

const paymentOptions: PaymentOption[] = [
  {
    value: "wallet",
    label: "Wallet (Solana)",
    image: icons.coin.solIcon,
  },
  {
    value: "cryptomus",
    label: "Crypto Gateway (Cryptomus)",
    image: images.user.userPayments.cryptomus,
  },
  {
    value: "stripe",
    label: "Fiat (Stripe)",
    image: images.user.userPayments.stripe,
  },
];

const goldBarUrl = process.env.NEXT_PUBLIC_NFT_GOLD_BAR_URL;

const JpgoldnftBuy = () => {
  const { address, connected } = useWalletInfo();
  const { chain } = useWeb3ModalStore();
  const { publicKey, sendTransaction, signTransaction } = useWallet();

  const program = useMemo(
    () => getProvider(publicKey, signTransaction, sendTransaction),
    [publicKey, signTransaction, sendTransaction]
  );

  const [showPaymentDropdown, setShowPaymentDropdown] = useState(false);

  const [selectedPayment, setSelectedPayment] = useState<PaymentOption>(
    paymentOptions[0]
  );
  const [selectedChain, setSelectedChain] = useState<ChainOption>(
    chainOptions.find((item) => item.value === chain.type) || chainOptions[0]
  );
  const [showChainDropdown, setShowChainDropdown] = useState(false);
  const [quantity, setQuantity] = useState<string>("0");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const option = chainOptions.find((item) => item.value === chain.type);
    if (option) {
      setSelectedChain(option);
    }
  }, [chain]);

  const { value, isLoading, isError } = useGetGoldPrice({
    quantity: Number(quantity),
  });

  const quantityPriceLoading = isLoading && !isError;

  const { value: oneJpgcValue } = useGetGoldPrice({
    quantity: 1,
  });

  const fee = value * 0.0015;
  const total = value + fee;

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^0-9.]/g, "");

    // Prevent multiple decimal points
    if ((value.match(/\./g) || []).length > 1) {
      value = value.slice(0, -1);
    }

    // Allow empty string for clearing input
    setQuantity(value);
  };

  const handleSubmit = async () => {
    try {
      // Set loading state to true when submission starts
      setIsSubmitting(true);

      switch (true) {
        case Number(quantity) < 0.1:
          toast.error("Min amount of grams is 0.1g");
          return;
        case !total:
          toast.error("Amount is required.");
          return;
        case !address || !publicKey:
          toast.error("Wallet address is required, please connect wallet.");
          return;
        case !quantity || isNaN(Number(quantity)):
          toast.error("Quantity is required and must be a valid number.");
          return;
      }

      const metadata = {
        name: `Japaul Gold NFT (${quantity}g)`,
        symbol: `JPGNFT(${quantity}g)`,
        description: `${quantity}g worth of Japaul Gold NFT minted`,
        image: goldBarUrl,
        external_url: "https://www.jpgoldcoin.app",
      };

      const customKeyValues = {
        customKey: "customValue",
        customKey2: "customValue2",
      };

      const ipfsUrl = await uploadToPinata(
        metadata,
        `Japaul Gold NFT`,
        customKeyValues
      );
      console.log("ipfs url generated", ipfsUrl);

      switch (selectedPayment.value) {
        case "wallet":
          const tx = await mintNft(
            program!,
            metadata.name,
            metadata.symbol,
            ipfsUrl,
            Number(quantity)
          );

          toast.success("NFT minted successfully");
          console.log("Nft minted", tx);
          return;
        case "cryptomus":
          toast.error("Cryptomus payment gateway is not available");
          return;
        case "stripe":
          toast.error("Stripe payment gateway is not available");
          return;
      }

      setIsSubmitting(false);
    } catch (error) {
      // Handle any errors that occur during submission
      toast.error("An error occurred while minting the NFT");
      console.error("Minting error:", error);
      setIsSubmitting(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="overflow-x-hidden flex flex-col md:flex-row lg:flex-col xl:flex-row gap-4">
      <UserCard className="w-full md:w-1/2 lg:w-full xl:w-1/2">
        <div className="md:p-5 space-y-6">
          <h2 className="text-2xl font-bold text-[#050706] dark:text-white mb-8">
            Buy JPGold NFT
          </h2>

          <div className="p-6 bg-[#F8F8F8] dark:bg-[#151515] rounded-lg">
            <div className="flex items-center justify-center gap-2 text-lg text-[#050706] dark:text-white text-center mb-2">
              You&apos;re buying{" "}
              {quantity ? `${quantity.toLocaleString()}g NFT` : null}
            </div>
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-1">
                <div className="flex items-center justify-center">
                  <input
                    type="text"
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="text-4xl font-semibold text-[#050706] dark:text-white bg-transparent outline-none text-center w-fit"
                    inputMode="decimal"
                  />
                </div>
              </div>

              {quantityPriceLoading ? (
                <SkeletonComponent
                  style={{
                    width: "fit-content",
                    borderRadius: "1rem",
                  }}
                  className="px-10 py-2 w-fit border border-[#E6E6E6] dark:border-[#3D3D3D] mt-4"
                />
              ) : (
                <div className="inline-flex items-center gap-2 bg-white border border-[#E6E6E6] dark:border-[#3D3D3D] dark:bg-[#1A1A1A] px-4 py-2 rounded-2xl">
                  <span className="text-sm text-[#050706] font-bold dark:text-[#DDDDDD]">
                    $
                  </span>
                  <span className="text-sm font-bold text-[#050706] dark:text-[#DDDDDD]">
                    {formatNumberWithoutExponential(value, 3)}
                  </span>
                  <IoSwapVertical className="text-lg text-[#1C1B1F80]/50 dark:text-[#DDDDDD]" />
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-[#050706] dark:text-white">
              Select Payment Gateway
            </label>
            <div className="relative">
              <button
                onClick={() => setShowPaymentDropdown(!showPaymentDropdown)}
                className="w-full flex items-center gap-2 p-3 bg-white dark:bg-[#151515] border border-[#E3E3E8] dark:border-[#292929] rounded-lg text-[#050706] dark:text-white"
              >
                <Image
                  src={selectedPayment.image}
                  alt={selectedPayment.value}
                  width={30}
                  height={30}
                  className=""
                />{" "}
                <span>{selectedPayment.label}</span>
                <svg
                  className="w-4 h-4 ml-auto text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {showPaymentDropdown && (
                <div className="absolute left-0 right-0 mt-2 bg-white dark:bg-[#151515] border border-[#E3E3E8] dark:border-[#292929] rounded-lg shadow-lg z-50">
                  {paymentOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSelectedPayment(option);
                        setShowPaymentDropdown(false);
                      }}
                      className="flex items-center gap-2 w-full p-3 dark:hover:bg-[#292929]"
                    >
                      <Image
                        src={option.image}
                        alt={option.value}
                        width={30}
                        height={30}
                        className=""
                      />{" "}
                      <span className="text-[#050706] dark:text-white">
                        {option.label}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </UserCard>

      <UserCard className="w-full md:w-1/2 lg:w-full xl:w-1/2">
        <div className="md:p-5 space-y-6">
          <div className="space-y-4 p-4 bg-[#F8F8F8] dark:bg-[#1A1A1A] border border-[#E6E6E6] dark:border-[#3D3D3D] rounded-xl">
            <div className="flex justify-between items-center">
              <span className="text-base text-[#282928] dark:text-white/70">
                1 JPGC
              </span>
              <span className="text-base text-[#050706] font-semibold dark:text-white">
                ${formatNumberWithoutExponential(oneJpgcValue, 3)}
              </span>
            </div>
            <hr className="dark:border-[#3D3D3D]" />

            <div className="flex justify-between items-center">
              <span className="text-base text-[#282928] dark:text-white/70">
                NFT worth (g)
              </span>
              <span className="text-base text-[#050706] font-semibold dark:text-white">
                {quantity}g
              </span>
            </div>
            <hr className="dark:border-[#3D3D3D]" />

            <div className="flex justify-between items-center">
              <span className="text-base text-[#282928] dark:text-white/70">
                Amount
              </span>
              <span className="text-base text-[#050706] font-semibold dark:text-white">
                ${formatNumberWithoutExponential(value, 3)}
              </span>
            </div>
            <hr className="dark:border-[#3D3D3D]" />
            <div className="flex justify-between items-center">
              <span className="text-base text-[#282928] dark:text-white/70">
                Fee (0.15%)
              </span>
              <span className="text-base text-[#050706] font-semibold dark:text-white">
                ${formatNumberWithoutExponential(fee, 3)}
              </span>
            </div>
            <hr className="dark:border-[#3D3D3D]" />

            <div className="flex justify-between items-center pt-4">
              <span className="text-base text-[#282928] dark:text-white/70">
                Total
              </span>
              <div className="text-right">
                <p className="text-base font-medium text-[#050706] dark:text-white">
                  ${formatNumberWithoutExponential(total, 3)}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-base font-semibold text-[#050706] dark:text-white">
                Select Blockchain
              </label>
              <div className="relative">
                <button
                  onClick={() => setShowChainDropdown(!showChainDropdown)}
                  className="w-full flex items-center gap-2 p-3 bg-white dark:bg-[#151515] border border-[#E3E3E8] dark:border-[#292929] rounded-lg text-[#050706] dark:text-white"
                >
                  <Image
                    src={selectedChain.image}
                    alt={selectedChain.value}
                    width={30}
                    height={30}
                    className="rounded-full"
                  />{" "}
                  <span>{selectedChain.label}</span>
                  <svg
                    className="w-4 h-4 ml-auto text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {showChainDropdown && (
                  <div className="absolute left-0 right-0 mt-2 bg-white dark:bg-[#151515] border border-[#E3E3E8] dark:border-[#292929] rounded-lg shadow-lg z-50">
                    {chainOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setSelectedChain(option);
                          setShowChainDropdown(false);
                        }}
                        className="flex items-center gap-2 w-full p-3 dark:hover:bg-[#292929]"
                      >
                        <Image
                          src={option.image}
                          alt={option.value}
                          width={30}
                          height={30}
                          className="rounded-full"
                        />
                        <span className="text-[#050706] dark:text-white">
                          {option.label}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={handleSubmit}
              disabled={
                !connected || chain.type !== selectedChain.value || isSubmitting
              }
              className="disabled:opacity-80 disabled:cursor-not-allowed w-full bg-black font-bold dark:bg-gold-200 text-white py-4 rounded-full transition-colors flex justify-center"
            >
              {isSubmitting ? (
                <SpinnerLoader width={25} height={25} color="#FFF" />
              ) : (
                <>
                  {!connected
                    ? "Connect wallet to continue"
                    : chain.type === selectedChain.value
                    ? `Pay with ${selectedPayment.label}`
                    : `Invalid Wallet Connected`}
                </>
              )}
            </button>
          </div>
        </div>
      </UserCard>
    </div>
  );
};

export default JpgoldnftBuy;
