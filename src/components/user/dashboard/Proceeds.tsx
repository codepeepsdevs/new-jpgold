"use client";
import { IoChevronDownCircleOutline } from "react-icons/io5";
import LineChart from "./LineChart";
import { useState, useEffect, useCallback, useMemo } from "react";
import { useTheme } from "@/store/theme.store";
import { useWalletInfo } from "@/hooks/useWalletInfo";
import useWeb3ModalStore from "@/store/web3Modal.store";
import { useGetMetrics } from "@/api/metrics/metrics.queries";
import { getProvider } from "@/services/jpgnft/jpgnft";
import { getProceeds, withdrawProceeds } from "@/services/jpgnft/jpgnft";
import { useWallet } from "@solana/wallet-adapter-react";
import toast from "react-hot-toast";

const Proceeds = () => {
  const theme = useTheme();
  const { publicKey, sendTransaction, signTransaction } = useWallet();

  const [padding, setPadding] = useState(15);
  const { chain } = useWeb3ModalStore();
  const { address, connected } = useWalletInfo();
  const [currentAmount, setCurrentAmount] = useState(0);
  const [isWithdrawing, setIsWithdrawing] = useState(false);

  const { metrics } = useGetMetrics({
    network: chain.type,
    walletAddress: address!,
  });

  const program = useMemo(
    () => getProvider(publicKey, signTransaction, sendTransaction),
    [publicKey, signTransaction, sendTransaction]
  );

  // Function to fetch user's proceeds balance
  const fetchProceeds = useCallback(async () => {
    if (!connected || !address) return;

    try {
      if (!program) {
        console.error("Program not initialized");
        return;
      }

      const { proceedsBalance } = await getProceeds(program, address);
      setCurrentAmount(proceedsBalance);
    } catch (error) {
      console.error("Error fetching proceeds:", error);
    }
  }, [connected, address, program]);

  // Function to handle withdrawal
  const handleWithdraw = async () => {
    if (!connected || !address || currentAmount <= 0) return;

    setIsWithdrawing(true);
    try {
      if (!program) {
        throw new Error("Program not initialized");
      }

      await withdrawProceeds(program, currentAmount);

      toast.success("Successfully withdrew proceeds");

      // Reset balance after successful withdrawal
      setCurrentAmount(0);
    } catch (error) {
      console.error("Error withdrawing proceeds:", error);
      // Convert error to string properly for toast message
      const errorMessage =
        error instanceof Error ? error.message : "Error withdrawing proceeds";

      toast.error(errorMessage);
    } finally {
      setIsWithdrawing(false);
    }
  };

  useEffect(() => {
    fetchProceeds();
    // Set up an interval to refresh proceeds balance periodically
    const intervalId = setInterval(fetchProceeds, 60000); // Refresh every minute

    return () => clearInterval(intervalId);
  }, [fetchProceeds]);

  useEffect(() => {
    const handleResize = () => {
      setPadding(window.innerWidth <= 640 ? 5 : 15);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const hasData = metrics?.proceedsData && metrics?.proceedsData.length > 0;

  const populatedData = {
    labels: Array.from({ length: 12 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (11 - i));
      return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
      });
    }),
    datasets: [
      {
        data: metrics?.proceedsData,
        borderColor: "rgb(34, 197, 94)",
        backgroundColor: "rgba(34, 197, 94, 0.1)",
        tension: 0.4,
        fill: true,
        pointRadius: 0,
        borderWidth: 2,
      },
    ],
  };

  const emptyData = {
    labels: Array.from({ length: 12 }, (_, i) => `Day ${i + 1}`),
    datasets: [
      {
        data: Array(12).fill(0),
        borderColor: "rgba(0, 0, 0, 0)",
        backgroundColor: "rgba(0, 0, 0, 0)",
        tension: 0.4,
        fill: true,
        pointRadius: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    },
    scales: {
      x: {
        display: true,
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        ticks: {
          color: theme === "dark" ? "#FFFFFF80" : "#00000080",
          font: {
            size: 12,
          },
          padding,
        },
      },
      y: {
        position: "left",
        beginAtZero: true,
        border: {
          display: false,
        },
        grid: {
          drawTicks: false,
          color: theme === "dark" ? "#525252" : "#DEDEDE",
          lineWidth: 1,
          drawBorder: false,
          borderDash: [8, 4],
          drawOnChartArea: true,
        },
        ticks: {
          beginAtZero: true,
          callback: (value: number) => `${value.toLocaleString()} sol`,
          padding,
          color: theme === "dark" ? "#FFFFFF" : "#00000080",
          font: {
            size: 12,
          },
          stepSize: (() => {
            const maxValue =
              hasData &&
              metrics?.proceedsData &&
              Math.max(...metrics.proceedsData) > 0
                ? Math.max(...metrics.proceedsData) * 2
                : 5000;

            // Strategy: divide the max value into 5-10 steps for readability
            const idealSteps = 8; // Aim for this many grid lines
            const rawStepSize = maxValue / idealSteps;

            // Round to a "nice" number (1, 2, 5, 10, 20, 50, 100, etc.)
            const magnitude = Math.pow(10, Math.floor(Math.log10(rawStepSize)));
            const normalized = rawStepSize / magnitude;

            if (normalized < 1.5) return magnitude;
            if (normalized < 3) return 2 * magnitude;
            if (normalized < 7.5) return 5 * magnitude;
            return 10 * magnitude;
          })(),
        },
        min: 0,
        max:
          hasData && metrics?.proceedsData
            ? Math.max(...metrics.proceedsData) > 0
              ? Math.max(...metrics.proceedsData) * 2
              : 5000
            : 5000,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
  };

  return (
    <div className="w-full flex flex-col gap-6 px-1 xs:px-3 py-1.5 xs:py-3.5">
      <div className="w-full flex flex-col gap-2">
        <div className="w-full flex items-center justify-between gap-2 2xs:gap-4 xs:gap-8 sm:gap-10">
          <h2 className="text-xl font-ibold text-[#282828] dark:text-white">
            Proceeds
          </h2>
          <button
            onClick={handleWithdraw}
            disabled={!connected || currentAmount <= 0 || isWithdrawing}
            className="disabled:opacity-30 disabled:cursor-not-allowed px-6 py-2.5 flex items-center gap-2 rounded-full bg-black text-white"
          >
            <span className="text-sm font-medium">
              {isWithdrawing ? "Withdrawing..." : "Withdraw"}
            </span>
            <IoChevronDownCircleOutline className="text-2xl" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <h2 className="text-3xl font-ibold text-[#282828] dark:text-white">
            {currentAmount.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 4,
            })}{" "}
            sol
          </h2>
          {/* {!connected && (
            <span className="text-sm text-red-500">
              Connect wallet to view your proceeds
            </span>
          )} */}
        </div>

        <div className="mt-10 h-96 w-full">
          <LineChart
            chartData={hasData ? populatedData : emptyData}
            chartOption={chartOptions}
          />
        </div>
      </div>
    </div>
  );
};

export default Proceeds;
