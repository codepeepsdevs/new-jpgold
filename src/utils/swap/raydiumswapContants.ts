export const swapConfig = {
  executeSwap: false, // Send tx when true, simulate tx when false
  useVersionedTransaction: true,
  tokenAAmount: 0.001, // Swap 0.01 SOL for USDC in this example
  tokenAAddress: "So11111111111111111111111111111111111111112", // Token to swap for the other, SOL in this case
  tokenBAddress: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v", // USDC address
  maxLamports: 1500000, // Micro lamports for priority fee
  direction: "in" as "in" | "out", // Swap direction: 'in' or 'out'
  liquidityFile: "trimmed_mainnet.json",
  maxRetries: 20,
};

// export const RPC_ENDPOINT =
//   "https://solana-mainnet.g.alchemy.com/v2/KaCUkii1gql2_D0IEX5hxy7h38ct4VM2";

export const RPC_ENDPOINT =
  "https://solana-mainnet.g.alchemy.com/v2/ikgRCsvABBf361KwRxyz4ZhjxXE1K9f4";
