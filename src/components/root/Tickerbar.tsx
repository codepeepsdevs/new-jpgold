"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import images from "../../../public/images";
import Toggler from "../Toggler";
import { useGetMetalPriceForTickerBar } from "@/api/metal-price/metal-price.queries";
import { metal_price_bases, metal_price_units } from "@/constants";

const Tickerbar = () => {
  const [selectedBase, setSelectedBase] = useState<string>("USD");
  const [selectedUnit, setSelectedUnit] = useState<string>("gram");
  const [prevPrice, setPrevPrice] = useState<number | null>(null);
  const [currentPrice, setCurrentPrice] = useState<number | null>(null);

  const { res, isLoading, isError } = useGetMetalPriceForTickerBar({
    base: selectedBase,
    unit: selectedUnit,
  });

  const loading = isLoading && !isError;

  useEffect(() => {
    if (res) {
      const baseKey = `${selectedBase}XAU`;
      const newPrice = res.rates?.[baseKey] || 0;

      // Generate a unique key for each selected base/unit combination
      const storageKey = `goldPrevPrice_${selectedBase}_${selectedUnit}`;
      const storedPrevPrice = localStorage.getItem(storageKey);

      setPrevPrice(storedPrevPrice ? parseFloat(storedPrevPrice) : null);
      setCurrentPrice(newPrice);

      // Store new price as previous for next update
      localStorage.setItem(storageKey, newPrice.toString());
    }
  }, [res, selectedBase, selectedUnit]);

  const priceChange =
    prevPrice !== null && currentPrice !== null
      ? (currentPrice - prevPrice).toFixed(2)
      : "0.00";
  const percentageChange =
    prevPrice !== null && currentPrice !== null
      ? (((currentPrice - prevPrice) / prevPrice) * 100).toFixed(3)
      : "0.000";

  const isChangePositive = parseFloat(priceChange) >= 0;
  const currency = metal_price_bases.find(
    (item) => item.value === selectedBase
  );

  return (
    <div className="w-full bg-white dark:bg-bg-700">
      <div className="w-full flex justify-center bg-bg-200 dark:bg-bg-600 py-2">
        <div className="w-full container flex items-center justify-between gap-4 ">
          <div className="flex items-center gap-1 md:gap-3">
            <div className="max-2xs:hidden flex items-center">
              <Image
                alt="jpgoldLogo"
                src={images.jpgoldLogo}
                className="w-8 lg:w-10"
              />
              <p className="max-md:hidden font-semibold text-sm lg:text-base xl:text-lg text-text-200 dark:text-white">
                JPGoldCoin
              </p>
            </div>
            <Toggler />
          </div>

          {!loading && res && (
            <div className="flex max-sm:flex-col items-end sm:items-center gap-1 2xs:gap-2 xs:gap-3">
              <div className="flex items-center ">
                <span className="font-semibold text-base lg:text-lg text-[#050706] dark:text-white">
                  {currency?.symbol}
                  {currentPrice?.toLocaleString() || "0.00"}
                </span>
                <div className="flex items-center ml-2 md:ml-4 text-sm md:text-base">
                  <span
                    className={`${
                      isChangePositive ? "text-[#498F10]" : "text-red-500"
                    }`}
                  >
                    {isChangePositive ? "▲" : "▼"}
                  </span>
                  <span
                    className={`ml-1 ${
                      isChangePositive ? "text-[#498F10]" : "text-red-500"
                    }`}
                  >
                    {priceChange}
                  </span>
                  <span
                    className={`ml-2 ${
                      isChangePositive ? "text-[#498F10]" : "text-red-500"
                    }`}
                  >
                    {percentageChange}%
                  </span>
                </div>
              </div>

              {/* Dropdowns for currency and unit selection */}
              <div className="flex gap-2 text-xs md:text-sm lg:text-base">
                <select
                  className="outline-none bg-white dark:bg-white/20 text-black dark:text-white py-1 xs:py-2 px-2 rounded-md cursor-pointer border border-[#D2D5DA] dark:border-[#FFFFFF0D]"
                  value={selectedBase}
                  onChange={(e) => setSelectedBase(e.target.value)}
                >
                  {metal_price_bases.map((item, index) => (
                    <option
                      className="text-black "
                      key={index}
                      value={item.value}
                    >
                      {item.label}
                    </option>
                  ))}
                </select>

                <select
                  className="outline-none bg-white dark:bg-white/20 text-black dark:text-white py-1 xs:py-2 px-2 rounded-md cursor-pointer border border-[#D2D5DA] dark:border-[#FFFFFF0D]"
                  value={selectedUnit}
                  onChange={(e) => setSelectedUnit(e.target.value)}
                >
                  {metal_price_units.map((item, index) => (
                    <option
                      className="text-black "
                      key={index}
                      value={item.value}
                    >
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tickerbar;
