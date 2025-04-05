/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { NFTAsset, PAYMENT_METHOD, TRX_TYPE } from "@/constants/types";
import { useWalletInfo } from "@/hooks/useWalletInfo";
import {
  extractNFTProperties,
  formatNumberWithoutExponential,
} from "@/utils/utilityFunctions";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { FC, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { IoWalletOutline } from "react-icons/io5";
import { MdKeyboardArrowRight } from "react-icons/md";
import { FaStripe, FaBitcoin } from "react-icons/fa";
import { BsCreditCard2Front } from "react-icons/bs";
import {
  buyMultipleNfts,
  getFees,
  getProvider,
} from "@/services/jpgnft/jpgnft";
import { useWallet } from "@solana/wallet-adapter-react";
import toast from "react-hot-toast";
import { BN } from "bn.js";
import { useQueryClient } from "@tanstack/react-query";
import SpinnerLoader from "../SpinnerLoader";
import useNavigate from "@/hooks/useNavigate";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe } from "@stripe/react-stripe-js";
import { AxiosError, AxiosResponse } from "axios";
import { ErrorResponse } from "@/api/type";
import ErrorToast from "../toast/ErrorToast";
import {
  RCryptomusCheckout,
  RStripeCheckout,
} from "@/api/payment/payment.types";
import SuccessToast from "../toast/SuccessToast";
import {
  useCryptomusCheckout,
  useStripeCheckout,
} from "@/api/payment/payment.queries";
import { dynamicFrontendUrl } from "@/constants";
import useWeb3ModalStore from "@/store/web3Modal.store";
import {
  useCreateTrx,
  useUpdateTrx,
} from "@/api/transactions/transactions.queries";
import { useSimpleTokenPrice } from "@/api/coinmarketcap/coinmarketcap.queries";

interface OrderSummaryProps {
  nfts: NFTAsset[];
}

interface FormInputs {
  recipientEmail: string;
  walletAddress: string;
}

type PaymentMethod = "wallet" | "stripe" | "cryptomus";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

export default function OrderSummary({ nfts }: OrderSummaryProps) {
  return (
    <Elements stripe={stripePromise}>
      <OrderSummaryComponent nfts={nfts} />
    </Elements>
  );
}

const OrderSummaryComponent: FC<OrderSummaryProps> = ({ nfts }) => {
  const queryClient = useQueryClient();
  const { chain } = useWeb3ModalStore();

  const stripe = useStripe();

  const navigate = useNavigate();
  const { address, connected } = useWalletInfo();
  const { setVisible } = useWalletModal();
  const { publicKey, sendTransaction, signTransaction, connect } = useWallet();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [trxRef, setTrxRef] = useState<string>(() => {
    // Try to load from localStorage on initial render
    if (typeof window !== "undefined") {
      return localStorage.getItem("currentTrxRef") || "";
    }
    return "";
  });

  const [fees, setFees] = useState<{
    fractionalizeFee: number;
    sellFee: number;
    feesDecimals: number;
  } | null>(null);

  const [isLoadingFees, setIsLoadingFees] = useState(false);
  console.log("isLoadingFeeses", isLoadingFees);

  const program = useMemo(
    () => getProvider(publicKey, signTransaction, sendTransaction),
    [publicKey, signTransaction, sendTransaction]
  );

  const { mutateAsync: createTrx } = useCreateTrx((data) => {
    const newTrxRef = data.data.trxRef;
    setTrxRef(newTrxRef);

    // Save to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("currentTrxRef", newTrxRef);
    }
  });
  const { mutateAsync: updateTrx } = useUpdateTrx();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormInputs>({
    defaultValues: {
      walletAddress: address || "",
    },
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("wallet");

  const feeValue = useMemo(() => {
    if (!fees) return 0;
    const value = fees.sellFee * 100;
    return paymentMethod === "wallet" ? value : 3 + value;
  }, [fees, paymentMethod]); // Note: added paymentMethod as a dependency

  const calculatedTotals = useMemo(() => {
    // Calculate subtotal and total weight from all NFTs
    const subtotal = nfts.reduce((total, nft) => {
      const { listingPrice } = extractNFTProperties(nft);
      return total + Number(listingPrice || 0);
    }, 0);

    // Calculate total weight (in grams)
    const totalWeight = nfts.reduce((total, nft) => {
      const { weight } = extractNFTProperties(nft);
      return total + Number(weight || 0);
    }, 0);

    // Use the feeValue from outside
    const fee = (feeValue / 100) * subtotal;

    // Calculate total
    const total = subtotal + fee;

    return { subtotal, fee, total, totalWeight, feeValue };
  }, [nfts, feeValue]); // Added feeValue as a dependency

  const { tokenPrice, symbol } = useSimpleTokenPrice(
    Number(calculatedTotals.total)
  );

  useEffect(() => {
    async function fetchFees() {
      if (!program) return;

      try {
        setIsLoadingFees(true);
        const feesData = await getFees(program);
        setFees(feesData);
      } catch (error) {
        console.error("Error fetching fees:", error);
        toast.error("Could not retrieve fee information");
      } finally {
        setIsLoadingFees(false);
      }
    }

    fetchFees();
  }, [program]);

  const handleOpenWalletModal = () => {
    connect();
    setVisible(true);
    setValue("walletAddress", address!);
    console.log(address);
  };

  const onStripeError = (error: AxiosError<ErrorResponse>) => {
    // setIsCheckoutLoading(false);
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

  const onStripeSuccess = async (data: AxiosResponse<RStripeCheckout>) => {
    if (stripe) {
      if (!data.data.sessionId) {
        // setIsCheckoutLoading(false);
        ErrorToast({
          title: "Error",
          descriptions: ["Invalid session id"],
        });
      }
      const response = await stripe.redirectToCheckout({
        sessionId: data.data.sessionId,
      });

      if (response.error) {
        // setIsCheckoutLoading(false);
        ErrorToast({
          title: "Payment Error",
          descriptions: [
            response.error.message ||
              "Something went wrong while processing payment",
          ],
        });
      }
    } else {
      // setIsCheckoutLoading(false);
      ErrorToast({
        title: "Error",
        descriptions: ["Something went wrong while setting up payments"],
      });
    }
    SuccessToast({
      title: "Order successful",
      description: "Order placed successfully",
    });
  };

  const {
    mutate: stripeCheckout,
    isPending: stripeCheckoutLoading,
    isError: stripeCheckoutError,
  } = useStripeCheckout(onStripeError, onStripeSuccess);

  const onCryptomusError = (error: AxiosError<ErrorResponse>) => {
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

  const onCryptomusSuccess = async (
    data: AxiosResponse<RCryptomusCheckout>
  ) => {
    if (!data.data.url) {
      ErrorToast({
        title: "Payment Error",
        descriptions: ["Something went wrong while processing payment"],
      });
      return;
    }
    window.location.href = data.data.url;
  };

  const {
    mutate: cryptomusCheckout,
    isPending: cryptomusCheckoutLoading,
    isError: cryptomusCheckoutError,
  } = useCryptomusCheckout(onCryptomusError, onCryptomusSuccess);

  const onSubmit = async () => {
    if (!publicKey || !address) {
      toast.error("Wallet address is required, please connect wallet.");
      return;
    }
    if (chain.type !== "solana") {
      toast.error("Please connect to Solana network to proceed");
      return;
    }

    if (
      calculatedTotals.total <= 0 ||
      calculatedTotals.subtotal <= 0 ||
      calculatedTotals.fee < 0
    ) {
      toast.error("Invalid total amount, please try again");
      return;
    }

    const marketplaceItems = nfts.map((nft) => {
      const { discriminant, owner, id } = extractNFTProperties(nft);
      return { discriminant: Number(discriminant), owner, mintAddress: id };
    });

    switch (paymentMethod) {
      case "wallet":
        try {
          setIsSubmitting(true);
          // Create the array of NFTs to buy
          const nftsToBuy = nfts.map((nft) => {
            const { discriminant, owner } = extractNFTProperties(nft);
            return { discriminant: new BN(discriminant), owner };
          });

          const proceeds = nfts.map((nft) => {
            const { owner, listingPrice } = extractNFTProperties(nft);
            return { amount: Number(listingPrice), owner };
          });

          const createTrxResponse = await createTrx({
            amount: calculatedTotals.total,
            type: TRX_TYPE.JPGNFT_MARKETPLACE,
            walletAddress: address,
            quantity: calculatedTotals.totalWeight,
            network: chain.type,
            fee: calculatedTotals.fee,
            paymentMethod: PAYMENT_METHOD.WALLET,
          });

          const currentTrxRef = createTrxResponse?.data?.trxRef || trxRef;
          if (typeof window !== "undefined") {
            localStorage.setItem("currentTrxRef", currentTrxRef);
          }

          // Your purchase logic here using buyMultipleNfts
          const tx = await buyMultipleNfts(program!, nftsToBuy);

          console.log("Transaction Signature:", tx);
          await updateTrx({
            signature: tx,
            trxRef: currentTrxRef,
            proceeds,
          });

          queryClient.invalidateQueries({
            queryKey: ["get-featured-listed-nfts"],
          });
          queryClient.invalidateQueries({ queryKey: ["get-all-listed-nfts"] });

          toast.success("Purchase successful!");
          navigate("/marketplace");
        } catch (error: any) {
          toast.error(error.message || "An error occurred during purchase");
          console.error("Purchase error:", error);
        } finally {
          setIsSubmitting(false);
        }
        return;
      case "stripe":
        stripeCheckout({
          amount: Number(calculatedTotals.total.toFixed(2)),
          walletAddress: address,
          quantity: calculatedTotals.totalWeight, // Include total weight here
          network: chain.type,
          successUrl: `${dynamicFrontendUrl}/payment/success`,
          cancelUrl: `${dynamicFrontendUrl}/payment/failed`,
          fee: Number(formatNumberWithoutExponential(calculatedTotals.fee, 3)),
          type: "jpgnft",
          marketplaceItems,
        });
        return;
      case "cryptomus":
        cryptomusCheckout({
          amount: formatNumberWithoutExponential(calculatedTotals.total, 3),
          walletAddress: address,
          quantity: calculatedTotals.totalWeight, // Include total weight here
          network: chain.type,
          url_return: `${dynamicFrontendUrl}/user/jpgoldcoin/crypto`,
          url_success: `${dynamicFrontendUrl}/payment/success`,
          fee: Number(formatNumberWithoutExponential(calculatedTotals.fee, 3)),
          type: "marketplace",
          marketplaceItems,
        });
        return;
      default:
        break;
    }
    toast.error("Invalid payment method.");
  };

  const isUserBuyingOwnNFT = useMemo(() => {
    return nfts.some((nft) => {
      const { owner } = extractNFTProperties(nft);
      return owner === address;
    });
  }, [nfts, address]);

  return (
    <div className="bg-white dark:bg-[#1C1C1E] border border-[#E3E3E8] dark:border-[#2C2C2E] rounded-lg p-6 shadow-lg space-y-6">
      <h2 className="text-xl font-bold text-[#050706] dark:text-white">
        Order Summary
      </h2>

      {/* Price Details */}
      <div className="space-y-4 bg-gray-50 dark:bg-[#252528] rounded-lg p-4">
        <div className="flex justify-between">
          <span className="text-[#282928] dark:text-gray-300">
            Total Gold Weight
          </span>
          <span className="font-medium text-[#050706] dark:text-white">
            {formatNumberWithoutExponential(calculatedTotals.totalWeight, 2)}g
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#282928] dark:text-gray-300">Subtotal</span>
          <span className="font-medium text-[#050706] dark:text-white">
            ${formatNumberWithoutExponential(calculatedTotals.subtotal, 2)}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-[#282928] dark:text-gray-300">
            Fee ({calculatedTotals.feeValue}%)
          </span>
          <span className="font-medium text-[#050706] dark:text-white">
            ${formatNumberWithoutExponential(calculatedTotals.fee, 2)}
          </span>
        </div>

        <div className="h-px bg-gray-200 dark:bg-gray-700 my-2"></div>

        <div className="flex justify-between">
          <span className="text-[#282928] dark:text-gray-300">Total</span>
          <span className="font-semibold text-lg text-[#050706] dark:text-white">
            ${formatNumberWithoutExponential(calculatedTotals.total, 2)}
            {tokenPrice &&
              paymentMethod === "wallet" &&
              `(${formatNumberWithoutExponential(tokenPrice, 2)} ${symbol})`}
          </span>
        </div>
      </div>

      {/* Payment Method */}
      <div className="space-y-3">
        <h3 className="font-medium text-[#050706] dark:text-white">
          Payment Method
        </h3>

        {/* Wallet Payment */}
        <div className="border border-[#E3E3E8] dark:border-[#2C2C2E] rounded-lg overflow-hidden">
          <div
            className={`flex items-center gap-3 p-4 ${
              paymentMethod === "wallet"
                ? "bg-[#F8F0DF] dark:bg-[#332A16] bg-opacity-30 dark:bg-opacity-30"
                : ""
            } hover:bg-[#F8F0DF] dark:hover:bg-[#332A16] hover:bg-opacity-20 dark:hover:bg-opacity-20 transition-colors cursor-pointer`}
            onClick={() => setPaymentMethod("wallet")}
          >
            <div className="w-10 h-10 rounded-full bg-[#F8F0DF] dark:bg-[#332A16] flex items-center justify-center">
              <IoWalletOutline className="text-xl text-[#CC8F00]" />
            </div>
            <div className="flex-grow">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="wallet"
                  name="paymentMethod"
                  value="wallet"
                  checked={paymentMethod === "wallet"}
                  onChange={() => setPaymentMethod("wallet")}
                  className="w-5 h-5 cursor-pointer appearance-none rounded-full border-2 border-[#CC8F00] checked:bg-[#CC8F00] checked:border-[#CC8F00] relative
                              before:content-[''] before:block before:w-5 before:h-5 before:rounded-full before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:scale-0 checked:before:bg-white checked:before:w-2 checked:before:h-2 checked:before:scale-100 before:transition-transform"
                />
                <label
                  htmlFor="wallet"
                  className="ml-2 text-[#050706] dark:text-white cursor-pointer font-medium flex-grow"
                >
                  Wallet{" "}
                  <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    (Solana)
                  </span>
                </label>
                {paymentMethod === "wallet" && (
                  <span className="text-xs font-medium text-[#CC8F00] bg-[#F8F0DF] dark:bg-[#332A16] px-2 py-1 rounded">
                    Selected
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Stripe Payment (Stripe) */}
          <div
            className={`flex items-center gap-3 p-4 border-t border-[#E3E3E8] dark:border-[#2C2C2E] ${
              paymentMethod === "stripe"
                ? "bg-[#F8F0DF] dark:bg-[#332A16] bg-opacity-30 dark:bg-opacity-30"
                : ""
            } hover:bg-[#F8F0DF] dark:hover:bg-[#332A16] hover:bg-opacity-20 dark:hover:bg-opacity-20 transition-colors cursor-pointer`}
            onClick={() => setPaymentMethod("stripe")}
          >
            <div className="w-10 h-10 rounded-full bg-[#635BFF10] dark:bg-[#635BFF20] flex items-center justify-center">
              <BsCreditCard2Front className="text-xl text-[#635BFF]" />
            </div>
            <div className="flex-grow">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="stripe"
                  name="paymentMethod"
                  value="stripe"
                  checked={paymentMethod === "stripe"}
                  onChange={() => setPaymentMethod("stripe")}
                  className="w-5 h-5 cursor-pointer appearance-none rounded-full border-2 border-[#CC8F00] checked:bg-[#CC8F00] checked:border-[#CC8F00] relative
                              before:content-[''] before:block before:w-5 before:h-5 before:rounded-full before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:scale-0 checked:before:bg-white checked:before:w-2 checked:before:h-2 checked:before:scale-100 before:transition-transform"
                />
                <label
                  htmlFor="stripe"
                  className="ml-2 text-[#050706] dark:text-white cursor-pointer font-medium flex-grow"
                >
                  Fiat{" "}
                  <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    (Stripe)
                  </span>
                </label>
                {paymentMethod === "stripe" && (
                  <span className="text-xs font-medium text-[#CC8F00] bg-[#F8F0DF] dark:bg-[#332A16] px-2 py-1 rounded">
                    Selected
                  </span>
                )}
              </div>
              <div className="mt-1 flex items-center">
                <FaStripe className="text-[#635BFF] text-2xl" />
                <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                  Secure payment processing
                </span>
              </div>
            </div>
          </div>

          {/* Crypto Payment (Cryptomus) */}
          <div
            className={`flex items-center gap-3 p-4 border-t border-[#E3E3E8] dark:border-[#2C2C2E] ${
              paymentMethod === "cryptomus"
                ? "bg-[#F8F0DF] dark:bg-[#332A16] bg-opacity-30 dark:bg-opacity-30"
                : ""
            } hover:bg-[#F8F0DF] dark:hover:bg-[#332A16] hover:bg-opacity-20 dark:hover:bg-opacity-20 transition-colors cursor-pointer`}
            onClick={() => setPaymentMethod("cryptomus")}
          >
            <div className="w-10 h-10 rounded-full bg-[#F7931A10] dark:bg-[#F7931A20] flex items-center justify-center">
              <FaBitcoin className="text-xl text-[#F7931A]" />
            </div>
            <div className="flex-grow">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="cryptomus"
                  name="paymentMethod"
                  value="cryptomus"
                  checked={paymentMethod === "cryptomus"}
                  onChange={() => setPaymentMethod("cryptomus")}
                  className="w-5 h-5 cursor-pointer appearance-none rounded-full border-2 border-[#CC8F00] checked:bg-[#CC8F00] checked:border-[#CC8F00] relative
                              before:content-[''] before:block before:w-5 before:h-5 before:rounded-full before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:scale-0 checked:before:bg-white checked:before:w-2 checked:before:h-2 checked:before:scale-100 before:transition-transform"
                />
                <label
                  htmlFor="cryptomus"
                  className="ml-2 text-[#050706] dark:text-white cursor-pointer font-medium flex-grow"
                >
                  Cryptocurrency{" "}
                  <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    (Cryptomus)
                  </span>
                </label>
                {paymentMethod === "cryptomus" && (
                  <span className="text-xs font-medium text-[#CC8F00] bg-[#F8F0DF] dark:bg-[#332A16] px-2 py-1 rounded">
                    Selected
                  </span>
                )}
              </div>
              <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                BTC, ETH, USDT, USDC and more
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment-specific instructions */}
      {paymentMethod === "stripe" && (
        <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30">
          <p className="text-sm text-blue-800 dark:text-blue-300">
            You&apos;ll be redirected to Stripe&apos;s secure payment page to
            complete your purchase.
          </p>
        </div>
      )}

      {paymentMethod === "cryptomus" && (
        <div className="p-4 rounded-lg bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-800/30">
          <p className="text-sm text-orange-800 dark:text-orange-300">
            You&apos;ll be redirected to Cryptomus&apos;s secure payment page to
            complete your purchase.
          </p>
        </div>
      )}

      {/* Recipient Details */}
      <div className="space-y-4">
        <h3 className="font-medium text-[#050706] dark:text-white">
          Recipient Details
        </h3>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Wallet Address Field - Only show for wallet payment method */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-[#050706] dark:text-gray-300 mb-2">
              Recipient Wallet Address
            </label>

            <div className="relative">
              <input
                type="text"
                {...register("walletAddress", {
                  required: "Wallet address is required",
                })}
                disabled={true}
                className="w-full px-4 py-3 rounded-lg border border-[#E3E3E8] focus:outline-none focus:ring-2 focus:ring-[#CC8F00] text-[#050706] dark:text-white dark:bg-[#252528] dark:border-[#3D3D3D] disabled:opacity-70 disabled:cursor-not-allowed"
                placeholder="Enter wallet address"
              />
            </div>

            {errors.walletAddress && (
              <p className="mt-1 text-sm text-red-500">
                {errors.walletAddress.message}
              </p>
            )}

            {/* Change Wallet Button */}
            <button
              type="button"
              onClick={handleOpenWalletModal}
              className="mt-3 w-full flex items-center justify-between px-4 py-3 rounded-lg border border-[#E3E3E8] dark:border-[#3D3D3D] text-[#050706] dark:text-white hover:bg-gray-50 dark:hover:bg-[#2C2C2E] transition-colors"
            >
              <span className="font-medium">Select wallet</span>
              <MdKeyboardArrowRight size={24} className="text-gray-500" />
            </button>
          </div>

          {/* Buy Button */}
          <button
            type="submit"
            className={`disabled:opacity-80 disabled:cursor-not-allowed flex justify-center items-center text-center w-full px-6 py-4 rounded-lg font-semibold text-white transition-all ${
              connected || paymentMethod !== "wallet"
                ? "bg-[#CC8F00] hover:bg-[#B37E00] shadow-md hover:shadow-lg"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={
              !connected ||
              isUserBuyingOwnNFT ||
              chain.type !== "solana" ||
              isSubmitting ||
              (stripeCheckoutLoading && !stripeCheckoutError) ||
              (cryptomusCheckoutLoading && !cryptomusCheckoutError)
            }
          >
            {isSubmitting ||
            (stripeCheckoutLoading && !stripeCheckoutError) ||
            (cryptomusCheckoutLoading && !cryptomusCheckoutError) ? (
              <SpinnerLoader width={25} height={25} color="#FFF" />
            ) : isUserBuyingOwnNFT ? (
              "You own one or more of these NFTs"
            ) : paymentMethod === "wallet" &&
              (!connected || chain.type !== "solana") ? (
              "Connect Wallet to Buy"
            ) : paymentMethod === "stripe" ? (
              `Continue to Payment • $${formatNumberWithoutExponential(
                calculatedTotals.total,
                2
              )}`
            ) : paymentMethod === "cryptomus" ? (
              `Pay with Crypto • $${formatNumberWithoutExponential(
                calculatedTotals.total,
                2
              )}`
            ) : (
              `Buy Now • $${formatNumberWithoutExponential(
                calculatedTotals.total,
                2
              )}`
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
