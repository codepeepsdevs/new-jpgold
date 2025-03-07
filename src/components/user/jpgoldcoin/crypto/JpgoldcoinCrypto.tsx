"use client";

import { useMemo, useState } from "react";
import UserCard from "@/components/UserCard";
import Image, { StaticImageData } from "next/image";
import { IoSwapVertical } from "react-icons/io5";
import images from "@/public/images";
import icons from "@/public/icons";
import useWeb3ModalStore from "@/store/web3Modal.store";
import { useWallet } from "@solana/wallet-adapter-react";
import { useAccount } from "wagmi";
import { useGetGoldPrice } from "@/api/metal-price/metal-price.queries";
import { formatNumberWithoutExponential } from "@/utils/utilityFunctions";
import toast from "react-hot-toast";
import { ErrorResponse } from "@/api/type";
import { AxiosError, AxiosResponse } from "axios";
import ErrorToast from "@/components/toast/ErrorToast";
import { RCryptomusCheckout } from "@/api/payment/payment.types";
import { useCryptomusCheckout } from "@/api/payment/payment.queries";
import { dynamicFrontendUrl } from "@/constants";
import SkeletonComponent from "@/components/Skeleton";
import SpinnerLoader from "@/components/SpinnerLoader";

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

const paymentOptions: PaymentOption[] = [
  {
    value: "cryptomus",
    label: "Cryptomus",
    image: images.user.userPayments.cryptomus,
  },
];

const chainOptions: ChainOption[] = [
  {
    value: "ethereum",
    label: "Ethereum",
    image: icons.coin.ethIcon,
  },

  {
    value: "solana",
    label: "Solana",
    image: icons.coin.solIcon,
  },
];

const JpgoldcoinCrypto = () => {
  const { chain } = useWeb3ModalStore();
  const [selectedPayment, setSelectedPayment] = useState<PaymentOption>(
    paymentOptions[0]
  );
  const [selectedChain, setSelectedChain] = useState<ChainOption>(
    chainOptions.find((item) => item.value === chain.type) || chainOptions[0]
  );
  const [showPaymentDropdown, setShowPaymentDropdown] = useState(false);
  const [showChainDropdown, setShowChainDropdown] = useState(false);
  const [quantity, setQuantity] = useState<string>("0");

  // Ethereum wallet connection
  const { address: ethAddress, isConnected: isEthConnected } = useAccount();

  // Solana wallet connection
  const { publicKey, connected: isSolConnected } = useWallet();

  const walletInfo = useMemo(() => {
    if (chain.type === "ethereum" && isEthConnected) {
      return {
        address: ethAddress,
        connected: isEthConnected,
      };
    } else if (chain.type === "solana" && isSolConnected && publicKey) {
      return {
        address: publicKey.toBase58(),
        connected: isSolConnected,
      };
    }

    return {
      address: null,
      connected: false,
    };
  }, [chain, ethAddress, isEthConnected, publicKey, isSolConnected]);

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

  const onError = (error: AxiosError<ErrorResponse>) => {
    const errorMessage = error?.response?.data?.message;
    const descriptions = Array.isArray(errorMessage)
      ? errorMessage
      : [errorMessage];

    ErrorToast({
      title: "Error checking out",
      descriptions: descriptions.filter(
        (msg): msg is string => msg !== undefined
      ),
    });
  };

  const onSuccess = async (data: AxiosResponse<RCryptomusCheckout>) => {
    if (!data.data.url) {
      ErrorToast({
        title: "Payment Error",
        descriptions: ["Something went wrong while processing payment"],
      });
      return;
    }
    window.open(data.data.url);
  };

  const {
    mutate: checkout,
    isPending: checkoutPending,
    isError: checkoutError,
  } = useCryptomusCheckout(onError, onSuccess);

  const checkoutLoading = checkoutPending && !checkoutError;

  const handleCheckout = () => {
    switch (true) {
      case total < 0.1:
        toast.error("Min amount is $0.1");
        return;
      case !total:
        toast.error("Amount is required.");
        return;
      case !walletInfo.address:
        toast.error("Wallet address is required.");
        return;
      case !quantity || isNaN(Number(quantity)):
        toast.error("Quantity is required and must be a valid number.");
        return;
    }

    checkout({
      amount: formatNumberWithoutExponential(total, 3),
      walletAddress: walletInfo.address,
      quantity: Number(quantity),
      network:
        chain.type === "ethereum"
          ? "evm"
          : chain.type === "solana"
          ? "solana"
          : "",
      url_return: `${dynamicFrontendUrl}/user/jpgoldcoin/crypto`,
      url_success: `${dynamicFrontendUrl}/payment/success`,
    });
  };

  return (
    <div className="flex flex-col md:flex-row lg:flex-col xl:flex-row gap-4">
      <UserCard className="w-full md:w-1/2 lg:w-full xl:w-1/2">
        <div className="md:p-5 space-y-6">
          <h2 className="text-2xl font-bold dark:text-white">
            Buy JPGold Coin
          </h2>

          <div className="p-6 bg-[#F8F8F8] dark:bg-[#151515] rounded-lg">
            <div className="flex items-center justify-center gap-2 text-lg text-[#050706] dark:text-white text-center mb-2">
              You&apos;re buying{" "}
              {quantity ? `${quantity.toLocaleString()}` : null}{" "}
              <Image
                src={images.user.coin}
                alt="jpgoldnft"
                width={20}
                height={20}
              />
            </div>
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-1">
                <div className="flex items-center justify-center">
                  {/* <Image
                    src={images.user.coin}
                    alt="jpgoldnft"
                    width={20}
                    height={20}
                  /> */}
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
                  className="rounded-full"
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
                        className="rounded-full"
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
                Coin worth (g)
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
                {/* <p className="text-sm text-[#5A5B5A] dark:text-white/70">
                  {((quantity * 6.11987 * 1.0015) / 1.5144).toFixed(3)} MATIC
                </p> */}
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
              onClick={handleCheckout}
              disabled={
                !walletInfo.connected || chain.type !== selectedChain.value
              }
              className="disabled:opacity-80 disabled:cursor-not-allowed w-full bg-black font-bold dark:bg-gold-200 text-white py-4 rounded-full transition-colors flex justify-center"
            >
              {checkoutLoading ? (
                <SpinnerLoader width={25} height={25} color="#FFF" />
              ) : (
                <>
                  {!walletInfo.connected
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

export default JpgoldcoinCrypto;
