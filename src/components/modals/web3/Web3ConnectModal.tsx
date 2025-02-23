"use client";
import icons from "@/public/icons";
import { BaseChain, Chain } from "@civic/multichain-connect-react-core";
import { SupportedChains } from "@civic/multichain-connect-react-core";
import Image from "next/image";
import React, { useMemo } from "react";

const iconsData = {
  ethereum: icons.coin.ethIcon,
  solana: icons.coin.solIcon,
};

interface ChainElementProps<
  T extends SupportedChains,
  S extends BaseChain,
  E extends BaseChain
> {
  chain: Chain<T, S, E>;
  onChainSelect: (chain: Chain<T, S, E>) => void;
}

function ChainElement<
  T extends SupportedChains,
  S extends BaseChain,
  E extends BaseChain
>({ chain, onChainSelect }: ChainElementProps<T, S, E>) {
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

interface ChainSelectorContentProps<
  T extends SupportedChains,
  S extends BaseChain,
  E extends BaseChain
> {
  chains: Chain<T, S, E>[];
  onChainSelect: (chain: Chain<T, S, E>) => void;
}

function ChainSelectorContent<
  T extends SupportedChains,
  S extends BaseChain,
  E extends BaseChain
>({ chains, onChainSelect }: ChainSelectorContentProps<T, S, E>) {
  const [activeTab, setActiveTab] = React.useState("mainnet");

  const hasTestnetChains = useMemo(
    () => chains.filter((chain) => chain.testnet === true)?.length >= 1,
    [chains]
  );
  const hasMainnetChains = useMemo(
    () => chains.filter((chain) => chain.testnet !== true)?.length >= 1,
    [chains]
  );

  return (
    <div className="p-6 text-black dark:text-white">
      <h4 className="mb-5 mt-5 text-center text-xl xs:text-2xl font-bold">
        Select Network
      </h4>

      {hasMainnetChains && hasTestnetChains ? (
        <div>
          <div className=" border-b border-dark/20 dark:border-white/20 -mx-6">
            <div className="flex justify-center">
              <button
                className={`px-3 py-1.5 text-base xs:text-lg font-semibold relative ${
                  activeTab === "mainnet" ? " border-b-2 border-primary" : ""
                }`}
                onClick={() => setActiveTab("mainnet")}
              >
                Mainnet
              </button>
              {hasTestnetChains && (
                <button
                  className={`px-3 py-1.5 text-base xs:text-lg font-semibold relative ${
                    activeTab === "testnet" ? " border-b-2 border-primary" : ""
                  }`}
                  onClick={() => setActiveTab("testnet")}
                >
                  Testnet
                </button>
              )}
            </div>
          </div>

          <div className="mt-6">
            {activeTab === "mainnet" && (
              <ul className=" p-0 m-0">
                {chains
                  .filter((chain) => !chain.testnet)
                  .map((chain) => (
                    <ChainElement
                      key={chain.name}
                      chain={chain}
                      onChainSelect={onChainSelect}
                    />
                  ))}
              </ul>
            )}
            {activeTab === "testnet" && (
              <ul className=" p-0 m-0">
                {chains
                  .filter((chain) => chain.testnet)
                  .map((chain) => (
                    <ChainElement
                      key={chain.name}
                      chain={chain}
                      onChainSelect={onChainSelect}
                    />
                  ))}
              </ul>
            )}
          </div>
        </div>
      ) : (
        <ul className="mb-5 p-0 m-0">
          {chains.map((chain) => (
            <ChainElement
              key={chain.name}
              chain={chain}
              onChainSelect={onChainSelect}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

interface ChainSelectorModalProps<
  T extends SupportedChains,
  S extends BaseChain,
  E extends BaseChain
> {
  chains: Chain<T, S, E>[];
  isOpen: boolean;
  onClose: () => void;
  onChainSelect: (chain: Chain<T, S, E>) => void;
}

export default function Web3ConnectModal<
  T extends SupportedChains,
  S extends BaseChain,
  E extends BaseChain
>({
  chains,
  isOpen,
  onClose,
  onChainSelect,
}: ChainSelectorModalProps<T, S, E>) {
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
