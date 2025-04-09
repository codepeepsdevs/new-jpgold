// This file stores web3 related constants such as addresses, token definitions, ETH currency references and ABI's

// import { TokenProps } from "@/constants/types";
import { PoolOption } from "@/constants/types";
import { SUPPORTED_CHAINS, Token } from "@uniswap/sdk-core";
import { FeeAmount } from "@uniswap/v3-sdk";

export const RPC_ENDPOINT =
  "https://polygon-mainnet.g.alchemy.com/v2/neaUgQrxETlX0ZSuWWEUJSKyzjLI2Zch";

// constants Addresses from Uniswap V3 SDK
export const QUOTER_CONTRACT_ADDRESS =
  "0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6";
export const SWAP_ROUTER_ADDRESS = "0xE592427A0AEce92De3Edee1F18E0157C05861564";

// modify this address to the one you are using
export const POOL_FACTORY_CONTRACT_ADDRESS =
  "0xD83d8C08C4593c19828E40b58F7d326Bcf48384e";

export const UNISWAP_V3_FACTORY_ADDRESS =
  "0x1F98431c8aD98523631AE4a59f267346ea31F984";

export const WETH_CONTRACT_ADDRESS =
  "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";

// Currencies and Tokens

export const WETH_TOKEN = new Token(
  SUPPORTED_CHAINS[0],
  "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  18,
  "WETH",
  "Wrapped Ether"
);

export const USDC_TOKEN = new Token(
  SUPPORTED_CHAINS[0],
  "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
  6,
  "USDC",
  "USD//C"
);

// ABI's

export const ERC20_ABI = [
  // Read-Only Functions
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",

  // Authenticated Functions
  "function transfer(address to, uint amount) returns (bool)",
  "function approve(address _spender, uint256 _value) returns (bool)",

  // Events
  "event Transfer(address indexed from, address indexed to, uint amount)",
];

export const WETH_ABI = [
  // Wrap ETH
  "function deposit() payable",

  // Unwrap ETH
  "function withdraw(uint wad) public",
];

export const WRAPPED_NATIVE_TOKEN_ABI = [
  // Standard ERC20 functions
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",
  "function name() view returns (string)",
  "function totalSupply() view returns (uint256)",
  "function allowance(address owner, address spender) view returns (uint256)",

  // Transfer functions
  "function transfer(address to, uint amount) returns (bool)",
  "function transferFrom(address sender, address recipient, uint256 amount) returns (bool)",
  "function approve(address spender, uint256 amount) returns (bool)",

  // Wrapping/unwrapping functions
  "function deposit() payable",
  "function withdraw(uint wad) public",

  // Events
  "event Transfer(address indexed from, address indexed to, uint amount)",
  "event Approval(address indexed owner, address indexed spender, uint amount)",
  "event Deposit(address indexed dst, uint wad)",
  "event Withdrawal(address indexed src, uint wad)",
];
// Transactions

export const MAX_FEE_PER_GAS = 100000000000;
export const MAX_PRIORITY_FEE_PER_GAS = 100000000000;
export const TOKEN_AMOUNT_TO_APPROVE_FOR_TRANSFER = 2000;

export const NATIVE_TO_WRAPPED: Record<
  string,
  { address: string; symbol: string; name: string }
> = {
  // Ethereum
  "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE": {
    address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", // WETH
    symbol: "WETH",
    name: "Wrapped Ether",
  },
  // Bitcoin (represented)
  "0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB": {
    address: "0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6", // wBTC on Polygon
    symbol: "WBTC",
    name: "Wrapped Bitcoin",
  },
  // Polygon
  "0x0000000000000000000000000000000000001010": {
    address: "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270", // WMATIC
    symbol: "WPOL",
    name: "Wrapped POL",
  },
};

export const POOLS: PoolOption[] = [
  {
    token0: "POL",
    token1: "JPGC",
    fee: FeeAmount.LOW,
  },
  {
    token0: "WPOL",
    token1: "JPGC",
    fee: FeeAmount.LOW,
  },
];
