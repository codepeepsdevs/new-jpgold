"use client";

import UserCard from "@/components/UserCard";
import { useMemo, useState } from "react";
import { IoChevronDown } from "react-icons/io5";
import { fractionalizeNft, getProvider } from "@/services/jpgnft/jpgnft";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  BN,
} from "@coral-xyz/anchor";
const JpgoldnftFractionalize = () => {
  const [selectedNFT, setSelectedNFT] = useState("JPGNFT #(45)");
  const [fraction1, setFraction1] = useState(0);
  const [fraction2, setFraction2] = useState(0);
  const [description1, setDescription1] = useState("");
  const [description2, setDescription2] = useState("");

  const { publicKey, sendTransaction, signTransaction } = useWallet();

  const program = useMemo(
    () => getProvider(publicKey, signTransaction, sendTransaction),
    [publicKey, signTransaction, sendTransaction]
  );

  const fractionalize = async () => {
    try {
      const discriminant = new BN(12345); // Replace with actual discriminant
      const fractionalizeArgs = {
        discriminant,
        part_a: {
          name: `${selectedNFT} - Part A`,
          symbol: "PARTA",
          uri: "https://example.com/metadataA.json", // Replace with actual URI
          weight: new BN(fraction1),
        },
        part_b: {
          name: `${selectedNFT} - Part B`,
          symbol: "PARTB",
          uri: "https://example.com/metadataB.json", // Replace with actual URI
          weight: new BN(fraction2),
        },
      };

      console.log("Starting fractionalization...");
      console.log({ program, discriminant, fractionalizeArgs })

      const result = await fractionalizeNft(program, discriminant, fractionalizeArgs);
      console.log("Fractionalization successful:", result);
    } catch (error) {
      console.error("Error during fractionalization:", error);
    }
  };

  return (
    <div className="w-full flex flex-col md:flex-row items-start justify-between gap-4">
      <UserCard className="w-full md:w-1/2">
        <div className="md:p-5 space-y-6">
          <h2 className="text-lg font-medium text-[#050706] dark:text-white">Fractionalize JPGold NFT</h2>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-base font-semibold text-[#050706] dark:text-white">NFT Token ID</label>
              <button
                className="w-full flex items-center justify-between p-3 bg-white dark:bg-[#151515] border border-[#E3E3E8] dark:border-[#292929] rounded-lg text-[#050706] dark:text-white"
              >
                <span>{selectedNFT}</span>
                <IoChevronDown className="text-gray-400" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-base font-semibold text-[#050706] dark:text-white">Fraction 1 (g)</label>
                <input
                  type="number"
                  value={fraction1}
                  onChange={(e) => setFraction1(Number(e.target.value))}
                  placeholder="35.00"
                  className="w-full p-3 bg-white dark:bg-[#151515] border !border-[#E3E3E8] dark:border-[#292929] !rounded-lg text-[#050706] dark:text-white placeholder-gray-400"
                />
              </div>

              <div className="space-y-2">
                <label className="text-base font-semibold text-[#050706] dark:text-white">Fraction 2 (g)</label>
                <input
                  type="number"
                  value={fraction2}
                  onChange={(e) => setFraction2(Number(e.target.value))}
                  placeholder="10.00"
                  className="w-full p-3 bg-white dark:bg-[#151515] border !border-[#E3E3E8] dark:border-[#292929] !rounded-lg text-[#050706] dark:text-white placeholder-gray-400"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-base font-semibold text-[#050706] dark:text-white">Description (Fraction 1)</label>
              <textarea
                value={description1}
                onChange={(e) => setDescription1(e.target.value)}
                placeholder="Enter description"
                rows={4}
                className="w-full p-3 bg-white dark:bg-[#151515] border border-[#E3E3E8] dark:border-[#292929] rounded-lg text-[#050706] dark:text-white placeholder-gray-400 resize-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-base font-semibold text-[#050706] dark:text-white">Description (Fraction 2)</label>
              <textarea
                value={description2}
                onChange={(e) => setDescription2(e.target.value)}
                placeholder="Enter description"
                rows={4}
                className="w-full p-3 bg-white dark:bg-[#151515] border border-[#E3E3E8] dark:border-[#292929] rounded-lg text-[#050706] dark:text-white placeholder-gray-400 resize-none"
              />
            </div>
          </div>
        </div>
      </UserCard>

      <UserCard className="w-full md:w-1/2">
        <div className="md:p-5 space-y-6">
          <div className="space-y-4 bg-[#F8F8F8] dark:bg-[#151515] border border-[#E6E6E6] dark:border-[#292929] rounded-lg p-4">
            <div className="flex justify-between items-center">
              <span className="text-base text-[#050706] dark:text-white">Fee (0.15%)</span>
              <span className="text-base font-semibold text-[#050706] dark:text-white">$8.21</span>
            </div>
          </div>
          <hr className="dark:border-[#3D3D3DCC]" />

          <button
            onClick={fractionalize}
            className="w-full bg-black text-white font-semibold dark:bg-gold-200 py-3 rounded-full hover:bg-gray-900 dark:hover:bg-gold-300 transition-colors"
          >
            Fractionalize NFT
          </button>
        </div>
      </UserCard>
    </div>
  );
};

export default JpgoldnftFractionalize;
