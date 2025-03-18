/* eslint-disable @typescript-eslint/no-explicit-any */

import axios from "axios";

export const getReturnPath = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("returnPath") || "/user/dashboard";
  }
  return "/user/dashboard";
};

export function formatNumberWithoutExponential(
  number: number,
  decimalPlaces: number
): string {
  if (typeof number !== "number" || isNaN(number) || !number) {
    return "0.00";
  }

  if (Math.abs(number) >= 1e6) {
    // Use locale formatting for large numbers
    return number.toLocaleString(undefined, {
      minimumFractionDigits: decimalPlaces,
      maximumFractionDigits: decimalPlaces,
    });
  }

  let formattedNumber: string = number.toString();

  if (Math.abs(number) < 1 && formattedNumber.length > decimalPlaces + 2) {
    formattedNumber = number.toFixed(decimalPlaces + 5).replace(/\.?0*$/, "");
  } else {
    formattedNumber = number.toFixed(decimalPlaces);
  }

  return formattedNumber;
}

export function truncateAddress(address: string): string {
  if (!address) {
    throw new Error("Invalid address");
  }

  const truncated = `${address.slice(0, 4)}...${address.slice(-4)}`;
  return truncated;
}

export const getClusterURL = (cluster: string): string => {
  const clusterUrls: any = {
    "mainnet-beta": "https://api.mainnet-beta.solana.com",
    testnet: "https://api.testnet.solana.com",
    devnet: "https://api.devnet.solana.com",
    localhost: "http://127.0.0.1:8899",
  };

  return clusterUrls[cluster];
};

export const getCluster = (cluster: string): string => {
  const clusters: any = {
    "https://api.mainnet-beta.solana.com": "mainnet-beta",
    "https://api.testnet.solana.com": "testnet",
    "https://api.devnet.solana.com": "devnet",
    "http://127.0.0.1:8899": "custom",
  };

  return clusters[getClusterURL(cluster)];
};

/**
 * Uploads metadata to Pinata and returns the IPFS URL
 * @param content The content to be pinned to IPFS
 * @param name Optional name for the pin
 * @param customKeyValues Optional key-value pairs for the metadata
 * @returns The IPFS URL of the pinned content
 */
export const uploadToPinata = async (
  content: Record<string, any>,
  name: string = "NFT Metadata",
  customKeyValues: Record<string, string> = {}
): Promise<string> => {
  try {
    const pinData = JSON.stringify({
      pinataOptions: {
        cidVersion: 1,
      },
      pinataMetadata: {
        name,
        keyvalues: customKeyValues,
      },
      pinataContent: content,
    });

    // Configure the API request
    const config = {
      method: "post",
      url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`,
      },
      data: pinData,
    };

    // Make the API request
    const response = await axios(config);

    // Return the IPFS URL
    const ipfsHash = response.data.IpfsHash;
    return `https://ipfs.io/ipfs/${ipfsHash}`;
  } catch (error: any) {
    console.error("Error uploading to Pinata:", error);
    throw new Error(
      error.response?.data?.error || "Failed to upload metadata to IPFS"
    );
  }
};
