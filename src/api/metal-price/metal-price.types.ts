export enum METAL_PRICE_BASES {
  USD = "USD",
  NGN = "NGN",
  EUR = "EUR",
  GBP = "GBP",
  JPY = "JPY",
  CAD = "CAD",
  AUD = "AUD",
  CNY = "CNY",
  INR = "INR",
  CHF = "CHF",
}

export enum METAL_PRICE_UNITS {
  TROY_OUNCE = "troy_oz",
  GRAM = "gram",
  KILOGRAM = "kilogram",
}

export interface IGetMetalGoldPrice {
  base: string;
  unit: string;
}

export interface MetalGoldPriceResponse {
  success: boolean;
  base: string;
  timestamp: number;
  rates: {
    [key: string]: number;
  };
}
