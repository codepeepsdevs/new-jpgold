"use client";
import { SectionWrapper } from "@/utils/hoc";
import { useTheme } from "@/store/theme.store";
import { useMemo } from "react";
import StatsTable from "./StatsTable";

type ThemeMode = "light" | "dark";

const Stats = () => {
  // const navigate = useNavigate();
  const theme = useTheme();

  const gradientStyles = {
    light: {
      background: `
        linear-gradient(to top, 
          #FFD061 0%,
          rgba(251, 216, 151, 0.9) 0%,
          rgba(251, 216, 151, 0.7) 45%, 
          rgba(251, 216, 151, 0.4) 65%,
          rgba(251, 216, 151, 0.2) 85%,
          rgba(251, 216, 151, 0.1) 95%,
          rgba(255, 255, 255, 0.2) 100%
        )
      `,
      overlay: `
        linear-gradient(74.71deg,
          rgba(251, 216, 151, 0.15) 0%,
          rgba(255, 208, 97, 0.2) 42.91%,
          rgba(251, 216, 151, 0.1) 100%
        )
      `,
    },
    dark: {
      background: `
    
        linear-gradient(135deg,
          rgba(251, 216, 151, 0) 0%,
          rgba(255, 208, 97, 0.05) 65%,
          rgba(255, 208, 97, 0.08) 100%
        )
      `,
      overlay: `
        linear-gradient(74.71deg,
          rgba(251, 216, 151, 0.02) 0%,
          rgba(255, 208, 97, 0.03) 42.91%,
          rgba(251, 216, 151, 0) 100%
        )
      `,
    },
  } as const;

  const getGradient = (type: "background" | "overlay") => {
    return gradientStyles[theme as ThemeMode][type];
  };

  const tableData = useMemo(
    () => [
      {
        feature: "Custody Fees",
        jpgcGold: "No Fee",
        majorEtfs: "5-25 bps per annum",
        goldFutures: "5-25 bps per annum",
        custodyFees1: "5-25 bps per annum",
        custodyFees2: "5-25 bps per annum",
      },
      {
        feature: "Minimum Purchase",
        jpgcGold: "0.01 t oz - $20",
        majorEtfs: "1 share (currently $200)",
        goldFutures: "1 share (currently $200)",
        custodyFees1: "1 share (currently $200)",
        custodyFees2: "1 share (currently $200)",
      },
      {
        feature: "Gold Mining Rewards",
        jpgcGold: "✓",
        majorEtfs: "✕",
        goldFutures: "✕",
        custodyFees1: "✕",
        custodyFees2: "✕",
      },
      {
        feature: "Allocated",
        jpgcGold: "Instant*",
        majorEtfs: "Variable",
        goldFutures: "Variable",
        custodyFees1: "Variable",
        custodyFees2: "Variable",
      },
      {
        feature: "Instantly Redeemable",
        jpgcGold: "Instant*",
        majorEtfs: "Instantly Redeemable",
        goldFutures: "Instantly Redeemable",
        custodyFees1: "✓",
        custodyFees2: "Instantly Redeemable",
      },
      {
        feature: "Time to Settle",
        jpgcGold: "✓",
        majorEtfs: "T+2 days",
        goldFutures: "Variable",
        custodyFees1: "T+2 days",
        custodyFees2: "T+2 days",
      },
      {
        feature: "Regulated",
        jpgcGold: "NYDFS",
        majorEtfs: "SEC & equivalents",
        goldFutures: "SEC & equivalents",
        custodyFees1: "SEC & equivalents",
        custodyFees2: "SEC & equivalents",
      },
    ],
    []
  );

  return (
    <div className="w-full flex flex-col justify-center h-full relative ">
      <div
        style={{
          background: getGradient("background"),
        }}
        className=" relative flex items-center max-lg:justify-center w-full h-full overflow-hidden  "
      >
        <div
          className="absolute inset-0"
          style={{
            background: getGradient("overlay"),
            mixBlendMode: "overlay",
          }}
        />

        <div className="container w-full flex flex-col gap-10 2xl:gap-12 relative z-10 py-16 sm:py-20 md:py-24 lg:py-32">
          <div className="w-full flex justify-center items-center text-center flex-col gap-6 2xl:gap-8">
            <h2 className="w-[90%] xl:w-full 2xl:w-[90%] font-isemibold text-text-200 dark:text-white text-4xl xl:text-5xl 3xl:text-6xl 2xl:leading-[3.8rem] 3xl:leading-[4.2rem]">
              Why JPGC?
            </h2>
          </div>

          <div className="w-full flex flex-col gap-4 2xs:gap-6 xs:gap-8">
            <StatsTable data={tableData} />
            <p className=" w-full text-xs 2xs:text-sm text-[#000000B2] dark:text-[#FFFFFFCC] font-semibold">
              *Typical on-chain transactions for Pax Gold moving on Ethereum
              settle near instantly. When you create PAXG on the Paxos platform,
              tokens will typically be minted and delivered the same day (some
              larger transactions will settle the next business day).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper(Stats);
