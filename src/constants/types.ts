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
