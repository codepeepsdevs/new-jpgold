import { DasApiAsset } from "@metaplex-foundation/digital-asset-standard-api";
import { StaticImageData } from "next/image";

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
    goldWeight: number;
    discriminant: number;
  };
}
