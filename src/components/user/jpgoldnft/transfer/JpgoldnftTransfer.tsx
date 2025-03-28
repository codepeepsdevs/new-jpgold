/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useGetNftsByOwner } from "@/api/jpgnft/jpgnft.queries";
import { useSimpleGoldPrice } from "@/api/metal-price/metal-price.queries";
import {
  useCreateTrx,
  useUpdateTrx,
} from "@/api/transactions/transactions.queries";
import SpinnerLoader from "@/components/SpinnerLoader";
import UserCard from "@/components/UserCard";
import { NFTAsset, PAYMENT_METHOD, TRX_TYPE } from "@/constants/types";
import { useWalletInfo } from "@/hooks/useWalletInfo";
import { transferNft } from "@/services/jpgnft/jpgnft";
import useWeb3ModalStore from "@/store/web3Modal.store";
import { formatNumberWithoutExponential } from "@/utils/utilityFunctions";
import { useWallet } from "@solana/wallet-adapter-react";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { IoChevronDown } from "react-icons/io5";

const JpgoldnftTransfer = () => {
  const queryClient = useQueryClient();
  const { chain } = useWeb3ModalStore();

  const { address, connected } = useWalletInfo();
  const [selectedNFT, setSelectedNFT] = useState<NFTAsset>();
  const [showNFTDropdown, setShowNFTDropdown] = useState(false);
  const [recipient, setRecipient] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [trxRef, setTrxRef] = useState<string>(() => {
    // Try to load from localStorage on initial render
    if (typeof window !== "undefined") {
      return localStorage.getItem("currentTrxRef") || "";
    }
    return "";
  });

  const { publicKey, signTransaction } = useWallet();

  const { value: oneJpgcValue } = useSimpleGoldPrice(1);

  const { nftData } = useGetNftsByOwner({
    address: address!,
  });

  const { mutateAsync: createTrx } = useCreateTrx((data) => {
    const newTrxRef = data.data.trxRef;
    setTrxRef(newTrxRef);

    // Save to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("currentTrxRef", newTrxRef);
    }
  });
  const { mutateAsync: updateTrx } = useUpdateTrx();

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);

      if (!selectedNFT?.id || !selectedNFT?.priority?.goldWeight) {
        toast.error("Please select an NFT to transfer");
        setIsSubmitting(false);
        return;
      }

      if (!recipient) {
        toast.error("Please enter a recipient wallet address");
        setIsSubmitting(false);
        return;
      }

      if (!address || !publicKey || !signTransaction) {
        toast.error("Wallet not connected. Please connect your wallet.");
        setIsSubmitting(false);
        return;
      }

      const loadingToastId = toast.loading("Transferring NFT...");

      const createTrxResponse = await createTrx({
        amount: 0,
        type: TRX_TYPE.JPGNFT_TRANSFER,
        walletAddress: address,
        quantity: selectedNFT.priority.goldWeight,
        network: chain.type,
        fee: 0,
        paymentMethod: PAYMENT_METHOD.WALLET,
      });

      const currentTrxRef = createTrxResponse?.data?.trxRef || trxRef;
      if (typeof window !== "undefined") {
        localStorage.setItem("currentTrxRef", currentTrxRef);
      }

      const tx = await transferNft(
        { publicKey, signTransaction },
        selectedNFT.id,
        recipient
      );
      toast.dismiss(loadingToastId);
      console.log("Transfer result:", tx);
      await updateTrx({
        signature: tx.txSignature,
        trxRef: currentTrxRef,
      });

      toast.success("NFT transferred successfully!");
      queryClient.invalidateQueries({ queryKey: ["get-wallet-nfts"] });

      // Reset the form
      setSelectedNFT(undefined);
      setRecipient("");
    } catch (error: any) {
      console.error("Transfer error:", error);
      toast.error(error.message || "Failed to transfer NFT");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-screen overflow-x-hidden flex flex-col md:flex-row lg:flex-col xl:flex-row gap-4">
      <UserCard className="h-fit w-full md:w-1/2 lg:w-full xl:w-1/2">
        <div className=" md:p-5 space-y-6">
          <h2 className="text-lg font-medium text-[#050706] dark:text-white">
            Transfer JPGold NFT
          </h2>

          <div className=" space-y-4">
            <div className=" space-y-2 ">
              <label className="text-base text-[#050706] dark:text-white">
                NFT Token ID
              </label>
              <div className="relative">
                <button
                  onClick={() => setShowNFTDropdown(!showNFTDropdown)}
                  className="w-full flex items-center justify-between p-3 bg-white dark:bg-[#151515] border border-gray-200 dark:border-gray-800 rounded-lg text-[#050706] dark:text-white"
                >
                  <span>
                    {connected
                      ? selectedNFT
                        ? `JPGNFT #${selectedNFT?.priority.discriminant}`
                        : "Select NFT"
                      : "Connect wallet"}{" "}
                  </span>
                  <IoChevronDown
                    className={`text-gray-400 transition-transform ${
                      showNFTDropdown ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {showNFTDropdown && (
                  <div className="absolute left-0 right-0 mt-2 bg-white dark:bg-[#151515] border border-[#E3E3E8] dark:border-[#292929] rounded-lg shadow-lg z-50 h-fit max-h-60 overflow-y-auto">
                    {connected ? (
                      <>
                        {" "}
                        {nftData && nftData.nfts && nftData.nfts.length > 0 ? (
                          nftData.nfts.map((nft, index) => (
                            <div
                              key={index}
                              className="p-3 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer text-[#050706] dark:text-white"
                              onClick={() => {
                                setSelectedNFT(nft);
                                setShowNFTDropdown(false);
                              }}
                            >
                              {`JPGNFT #${nft?.priority.discriminant}`}{" "}
                            </div>
                          ))
                        ) : (
                          <div className="p-3 text-gray-500 dark:text-gray-400">
                            {nftData && nftData.nfts
                              ? "No NFTs found"
                              : "Loading NFTs..."}
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="p-3 text-gray-500 dark:text-gray-400">
                        Connect your wallet to view NFTs
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-base text-[#050706] dark:text-white">
                Recipient Wallet Address
              </label>
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="Enter wallet address"
                className="w-full p-3 bg-white dark:bg-[#151515] border !border-[#E3E3E8] dark:border-[#292929] !rounded-lg text-[#050706] dark:text-white placeholder-gray-400"
              />
            </div>
          </div>
        </div>
      </UserCard>

      <UserCard className="h-fit w-full md:w-1/2 lg:w-full xl:w-1/2">
        <div className="md:p-5 space-y-6">
          <div className="space-y-4 bg-[#F8F8F8] dark:bg-[#151515] rounded-lg p-4">
            <div className="flex justify-between items-center">
              <span className="text-base text-[#050706] dark:text-white/70">
                1 JPGNFT
              </span>
              <span className="text-base text-[#050706] font-semibold dark:text-white">
                ${formatNumberWithoutExponential(oneJpgcValue, 3)}
              </span>
            </div>
            <hr className="dark:border-[#3D3D3DCC]" />

            {selectedNFT && (
              <>
                <div className="flex justify-between items-center">
                  <span className="text-base text-[#050706] dark:text-white/70">
                    NFT worth (g)
                  </span>
                  <span className="text-base text-[#050706] dark:text-white">
                    {selectedNFT.priority.goldWeight
                      ? `${selectedNFT?.priority.goldWeight}g`
                      : "Pending NFT"}
                  </span>
                </div>
                <hr className="dark:border-[#3D3D3DCC]" />

                <div className="flex justify-between items-center">
                  <span className="text-base text-[#050706] dark:text-white/70">
                    Amount
                  </span>
                  <span className="text-base text-[#050706] dark:text-white">
                    {selectedNFT?.priority?.price
                      ? `$${formatNumberWithoutExponential(
                          selectedNFT.priority.price,
                          3
                        )}`
                      : `Pending NFT`}
                  </span>
                </div>
              </>
            )}
          </div>

          <button
            onClick={handleSubmit}
            disabled={!connected || isSubmitting}
            className="disabled:opacity-80 disabled:cursor-not-allowed w-full bg-black font-bold dark:bg-gold-200 text-white py-4 rounded-full transition-colors flex justify-center"
          >
            {isSubmitting ? (
              <SpinnerLoader width={25} height={25} color="#FFF" />
            ) : (
              <>{!connected ? "Connect wallet to continue" : `Transfer NFT`}</>
            )}
          </button>
        </div>
      </UserCard>
    </div>
  );
};

export default JpgoldnftTransfer;
