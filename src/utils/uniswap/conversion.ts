import { BigNumberish, ethers } from "ethers";

const READABLE_FORM_LEN = 4;

export function fromReadableAmount(
  amount: number | string,
  decimals: number
): BigNumberish {
  if (typeof amount !== "string") {
    amount = amount.toString();
  }
  return ethers.utils.parseUnits(amount, decimals);
}

export function toReadableAmount(rawAmount: number, decimals: number): string {
  const formattedAmount = ethers.utils.formatUnits(rawAmount, decimals);
  return parseFloat(formattedAmount).toFixed(READABLE_FORM_LEN);
}
