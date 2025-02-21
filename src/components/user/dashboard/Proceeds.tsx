"use client";
import { IoChevronDownCircleOutline } from "react-icons/io5";
import LineChart from "./LineChart";
import { useState } from "react";
import { useEffect } from "react";
import { useTheme } from "@/store/theme.store";

const Proceeds = () => {
  const theme = useTheme();
  const [padding, setPadding] = useState(15);

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

  // Dummy data for 12 days
  const dummyData = {
    labels: Array.from({ length: 12 }, (_, i) => `Day ${i + 1}`),
    datasets: [
      {
        data: [
          0, 2000, 4000, 3800, 3500, 3500, 3600, 4500, 5000, 5500, 6000,
          6437.45,
        ],
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
          callback: (value: number) => `$${value.toLocaleString()}`,
          padding,
          color: theme === "dark" ? "#FFFFFF" : "#00000080",
          font: {
            size: 12,
          },
          stepSize: 5000,
        },
        min: 0,
        max: 25000,
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

  // Change this to toggle between empty and filled states
  const hasData = true;
  const currentAmount = hasData ? 6437.45 : 0;
  const percentageIncrease = hasData ? "+102%" : "0%";

  return (
    <div className="w-full flex flex-col gap-6 px-1 xs:px-3 py-1.5 xs:py-3.5">
      <div className="w-full flex flex-col gap-2">
        <div className="w-full flex items-center justify-between gap-2 2xs:gap-4 xs:gap-8 sm:gap-10">
          <h2 className="text-xl font-ibold text-[#282828] dark:text-white">
            Proceeds
          </h2>
          <button
            disabled={!hasData}
            className="disabled:opacity-30 disabled:cursor-not-allowed px-6 py-2.5 flex items-center gap-2 rounded-full bg-black text-white"
          >
            <span className="text-sm font-medium">Withdraw</span>
            <IoChevronDownCircleOutline className="text-2xl" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <h2 className="text-3xl font-ibold text-[#282828] dark:text-white">
            ${currentAmount.toLocaleString()}
          </h2>
          {hasData && (
            <span className="text-sm font-medium text-green-500">
              {percentageIncrease}
            </span>
          )}
        </div>

        <div className="mt-10 h-96 w-full">
          <LineChart
            chartData={hasData ? dummyData : emptyData}
            chartOption={chartOptions}
          />
        </div>
      </div>
    </div>
  );
};

export default Proceeds;
