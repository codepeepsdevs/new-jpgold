import { DasApiAsset } from "@metaplex-foundation/digital-asset-standard-api";
import { FeeAmount } from "@uniswap/v3-sdk";
import BN from "bn.js";
import { StaticImageData } from "next/image";
import { IconType } from "react-icons";

export interface IResponse {
  message: string;
  statusCode: number;
}

export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
}

export interface User {
  id: string;
  fullname: string;
  email: string;
  web3Nickname?: string;
  isEmailVerified: boolean;
  role: UserRole;
  tokenVersion: number;
  isGoogleRegister: boolean;
  isFacebookRegister: boolean;
  enableTwofactorAuth: boolean;
  profileImageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TeamMemberProps {
  name: string;
  position: string;
  linkedin: string;
  image: string | StaticImageData;
  about: string;
}

export enum SupportedChains {
  Solana = "solana",
  Ethereum = "ethereum",
  Unknown = "unknown",
}

export interface Chain {
  id?: number;
  name: string;
  type: SupportedChains;
}

export type V1_NFTAsset = DasApiAsset & {
  mint_extensions: {
    metadata: {
      uri: string;
      mint: string;
      name: string;
      symbol: string;
      update_authority: string;
      additional_metadata: [string, string][];
    };
    metadata_pointer: {
      authority: string;
      metadata_address: string;
    };
    group_member_pointer: {
      authority: string;
      member_address: string;
    };
  };
  token_info: {
    supply: number;
    decimals: number;
    token_program: string;
    associated_token_address: string;
  };
};

export interface NFTAsset extends V1_NFTAsset {
  priority: {
    discriminant: number;
    finalized: boolean;
    owner: string;
    goldWeight: number | null;
    price: number | null;
    listed: boolean;
    listingPrice: number | null;
    listingAccount: string | null;
  };
}

export interface ExtractedNFTAsset {
  id: string;
  price: number | null;
  discriminant: string | number;
  image: StaticImageData | string | undefined;
  finalized: boolean;
  weight: number | null;
  owner: string;
  name: string;
  description: string | undefined;
  symbol: string;
  listed: boolean;
  listingPrice: number | null;
  listingAccount: string | null;
  rate: {
    value: number;
    absolute: number;
    status: string;
    raw: number;
  };
  nft: NFTAsset;
}

export interface NftBuyArgs {
  discriminant: BN;
  owner: string;
}

export enum TRX_TYPE {
  JPGC_BUY = "JPGC_BUY",
  JPGNFT_BUY = "JPGNFT_BUY",
  JPGNFT_MARKETPLACE = "JPGNFT_MARKETPLACE",
  JPGNFT_TRANSFER = "JPGNFT_TRANSFER",
  JPGNFT_FRACTIONALIZE = "JPGNFT_FRACTIONALIZE",
}

export enum PAYMENT_METHOD {
  WALLET = "wallet",
  STRIPE = "stripe",
  CRYPTOMUS = "cryptomus",
}

export enum TRX_STATUS {
  PENDING = "pending",
  COMPLETED = "completed",
  FAILED = "failed",
}

export interface TransactionProps {
  id: string;
  trxRef: string;
  amount: number;
  status: TRX_STATUS;
  quantity: number;
  network: SupportedChains;
  fee: number;
  walletAddress: string;
  paymentMethod: PAYMENT_METHOD;
  type: TRX_TYPE;
  signature?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TokenProps {
  id: number;
  TokenName: string;
  ImageUrl: string;
  address: `0x${string}`;
  type: "native" | "token";
  decimal: number;
}

export interface CryptoOption {
  id: number;
  value: string;
  label: string;
  icon: IconType | StaticImageData;
  color?: string;
  isImage?: boolean;
  type: "native" | "token";
  address: `0x${string}`;
  decimals: number;
}

export interface PoolOption {
  token0: string;
  token1: string;
  fee: FeeAmount;
}
