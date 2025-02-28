"use client";
import { Chain } from "@/constants/types";
import icons from "@/public/icons";
import Image from "next/image";

const iconsData = {
  ethereum: icons.coin.ethIcon,
  solana: icons.coin.solIcon,
};

interface ChainElementProps {
  chain: Chain;
  onChainSelect: (chain: Chain) => void;
}

function ChainElement({ chain, onChainSelect }: ChainElementProps) {
  return (
    <li className="flex items-center ">
      <button
        type="button"
        onClick={() => onChainSelect(chain)}
        className="w-full flex items-center border-0 bg-transparent hover:bg-[#F7F7F7] dark:hover:bg-[#F7F7F733] rounded-lg text-sm xs:text-base py-2 px-2 cursor-pointer"
      >
        <Image
          src={iconsData[chain.type as keyof typeof iconsData]}
          alt={chain.name}
          objectFit="contain"
          className="mr-2.5 w-6 h-6 xs:w-7 xs:h-7"
          unoptimized
        />
        <span className="mr-2.5">{chain.name}</span>
      </button>
    </li>
  );
}

interface ChainSelectorContentProps {
  chains: Chain[];
  onChainSelect: (chain: Chain) => void;
}

function ChainSelectorContent({
  chains,
  onChainSelect,
}: ChainSelectorContentProps) {
  return (
    <div className="p-6 text-black dark:text-white">
      <h4 className="mb-5 mt-5 text-center text-xl xs:text-2xl font-bold">
        Select Network
      </h4>

      {chains && chains.length > 0 && (
        <div className="mt-6">
          <ul className="mb-5 p-0 m-0">
            {chains.map((chain) => (
              <ChainElement
                key={chain.name}
                chain={chain}
                onChainSelect={onChainSelect}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

interface ChainSelectorModalProps {
  chains: Chain[];
  isOpen: boolean;
  onClose: () => void;
  onChainSelect: (chain: Chain) => void;
}

export default function Web3ConnectModal({
  chains,
  isOpen,
  onClose,
  onChainSelect,
}: ChainSelectorModalProps) {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/30 z-[99]" onClick={onClose} />
      <div className="fixed inset-0 flex items-center justify-center z-[100]">
        <div className="bg-white dark:bg-[#1A1B1F] shadow-lg dark:shadow-none border dark:border-[#2C2D31] rounded-lg w-full max-w-md mx-4 relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 bg-[#F0F0F0] dark:bg-[#2C2D31] text-[#606565] dark:text-[#989DAC] fill-current p-1.5 rounded-full"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <ChainSelectorContent
            chains={chains}
            onChainSelect={(chain) => {
              onChainSelect(chain);
              onClose();
            }}
          />
        </div>
      </div>
    </>
  );
}
