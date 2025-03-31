"use client";

import { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import { IoSearch, IoFilter, IoClose } from "react-icons/io5";
import { IoChevronDown } from "react-icons/io5";
import { useGetTransactions } from "@/api/transactions/transactions.queries";
import { TransactionProps, TRX_STATUS, TRX_TYPE } from "@/constants/types";
import { format, parseISO } from "date-fns";
import {
  formatNumberWithoutExponential,
  truncateAddress,
} from "@/utils/utilityFunctions";
import { LuCopy } from "react-icons/lu";
import { useWalletInfo } from "@/hooks/useWalletInfo";
import { MdOutlineReceiptLong } from "react-icons/md";
import { AiFillWallet } from "react-icons/ai";

const transactionTypes = [
  { label: "JPGC (Buy)", value: TRX_TYPE.JPGC_BUY },
  { label: "JPGNFT (Buy)", value: TRX_TYPE.JPGNFT_BUY },
  { label: "JPGNFT (Marketplace)", value: TRX_TYPE.JPGNFT_MARKETPLACE },
  { label: "JPGNFT (Transfer)", value: TRX_TYPE.JPGNFT_TRANSFER },
  { label: "JPGNFT (Fractionalize)", value: TRX_TYPE.JPGNFT_FRACTIONALIZE },
];

const columnHelper = createColumnHelper<TransactionProps>();

// Create a component for the transaction ID cell
const TransactionIdCell = ({ value }: { value: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <div className="text-sm text-[#050706] dark:text-white flex items-center gap-1">
      {truncateAddress(value)}
      {copied ? (
        <span className="text-xs font-medium text-green-500">Copied!</span>
      ) : (
        <LuCopy
          onClick={handleCopy}
          className="text-sm text-[#050706] dark:text-white/70 cursor-pointer hover:text-[#CC8F00] dark:hover:text-gold-200 transition-colors"
        />
      )}
    </div>
  );
};

const columns = [
  columnHelper.accessor("createdAt", {
    header: "Date",
    cell: ({ getValue }) => {
      const date = getValue();

      try {
        // Check if the date is already a Date object or a string
        const dateValue = date instanceof Date ? date : parseISO(String(date));

        // Format the date and time separately
        const formattedDate = format(dateValue, "MMM d, yyyy");
        const formattedTime = format(dateValue, "h:mm a");

        return (
          <div className="space-y-1">
            <div className="text-sm font-medium text-[#050706] dark:text-white">
              {formattedDate}
            </div>
            <div className="text-xs text-[#A7A9BA]">{formattedTime}</div>
          </div>
        );
      } catch (error) {
        // Fallback for any parsing errors
        console.error("Error parsing date:", error);
        return (
          <div className="space-y-1">
            <div className="text-sm font-medium text-[#050706] dark:text-white">
              {String(date || "--")}
            </div>
            <div className="text-xs text-[#A7A9BA]">--</div>
          </div>
        );
      }
    },
  }),
  columnHelper.accessor("trxRef", {
    header: "Transaction ID",
    cell: ({ getValue }) => <TransactionIdCell value={getValue()} />,
  }),
  columnHelper.accessor("type", {
    header: "Type",
    cell: ({ getValue }) => (
      <div className="text-sm text-[#050706] dark:text-white">
        {transactionTypes.find((item) => item.value === getValue())?.label ||
          "--"}
      </div>
    ),
  }),
  columnHelper.accessor("quantity", {
    header: "Details",
    cell: ({ row, getValue }) => (
      <div className="flex flex-col gap-1 text-sm">
        <div className="font-medium text-[#050706] dark:text-white">
          Amount: {getValue()}g
        </div>
        {row.original.type === TRX_TYPE.JPGNFT_TRANSFER ? (
          <div className="text-[#4B4D4C] dark:text-white/70">
            Paid: gas fees
          </div>
        ) : (
          <div className="flex flex-col gap-0.5">
            <div className="text-[#4B4D4C] dark:text-white/70">
              Fee: ${formatNumberWithoutExponential(row.original.fee, 2)}
            </div>
            <div className="text-[#4B4D4C] dark:text-white/70">
              Paid: $
              {formatNumberWithoutExponential(
                row.original.fee + row.original.amount,
                2
              )}{" "}
              + gas fees
            </div>
          </div>
        )}
      </div>
    ),
  }),

  columnHelper.accessor("network", {
    header: "Network",
    cell: (info) => (
      <div className="text-sm text-[#050706] dark:text-white capitalize">
        {info.getValue()}
      </div>
    ),
  }),
  columnHelper.accessor("paymentMethod", {
    header: "Payment Method",
    cell: ({ getValue }) => (
      <div className="text-sm text-[#050706] dark:text-white capitalize">
        {getValue()}
      </div>
    ),
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: ({ getValue, row }) => (
      <div className="flex items-center gap-2">
        <span
          className={`px-3 py-1 text-xs rounded-lg ${
            getValue() === TRX_STATUS.COMPLETED
              ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/30 text-green-600 dark:text-green-400"
              : getValue() === TRX_STATUS.PENDING
              ? "bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/30 text-amber-600 dark:text-amber-400"
              : "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30 text-red-600 dark:text-red-400"
          }`}
        >
          {getValue()}
        </span>
        <button
          onClick={() => {
            if (row.original.network === "ethereum") {
              if (process.env.NEXT_PUBLIC_CLUSTER === "devnet") {
                window.open(
                  `https://sepolia.etherscan.io/tx/${row.original.signature}`,
                  "_blank"
                );
              } else {
                window.open(
                  `https://etherscan.io/tx/${row.original.signature}`,
                  "_blank"
                );
              }
            } else if (row.original.network === "solana") {
              window.open(
                `https://explorer.solana.com/tx/${row.original.signature}?cluster=${process.env.NEXT_PUBLIC_CLUSTER}`,
                "_blank"
              );
            }
          }}
          className="text-gray-400 hover:text-[#CC8F00] dark:hover:text-gold-200 transition-colors"
          aria-label="View on blockchain explorer"
          title="View on blockchain explorer"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.3333 7.33327C13.1565 7.33327 12.987 7.40351 12.8619 7.52853C12.7369 7.65356 12.6667 7.82313 12.6667 7.99994V11.9999C12.6667 12.1768 12.5964 12.3463 12.4714 12.4713C12.3464 12.5964 12.1768 12.6666 12 12.6666H4C3.82319 12.6666 3.65362 12.5964 3.5286 12.4713C3.40357 12.3463 3.33333 12.1768 3.33333 11.9999V3.99994C3.33333 3.82313 3.40357 3.65356 3.5286 3.52853C3.65362 3.40351 3.82319 3.33327 4 3.33327H8C8.17681 3.33327 8.34638 3.26303 8.4714 3.13801C8.59643 3.01299 8.66667 2.84342 8.66667 2.66661C8.66667 2.48979 8.59643 2.32023 8.4714 2.1952C8.34638 2.07018 8.17681 1.99994 8 1.99994H4C3.46957 1.99994 2.96086 2.21065 2.58579 2.58573C2.21071 2.9608 2 3.46951 2 3.99994V11.9999C2 12.5304 2.21071 13.0391 2.58579 13.4142C2.96086 13.7892 3.46957 13.9999 4 13.9999H12C12.5304 13.9999 13.0391 13.7892 13.4142 13.4142C13.7893 13.0391 14 12.5304 14 11.9999V7.99994C14 7.82313 13.9298 7.65356 13.8047 7.52853C13.6797 7.40351 13.5101 7.33327 13.3333 7.33327Z"
              fill="currentColor"
            />
            <path
              d="M10.6673 3.33333H11.7206L7.52728 7.52C7.46479 7.58198 7.4152 7.65571 7.38135 7.73695C7.3475 7.81819 7.33008 7.90533 7.33008 7.99333C7.33008 8.08134 7.3475 8.16848 7.38135 8.24972C7.4152 8.33096 7.46479 8.40469 7.52728 8.46667C7.58925 8.52915 7.66299 8.57875 7.74423 8.61259C7.82547 8.64644 7.9126 8.66387 8.00061 8.66387C8.08862 8.66387 8.17576 8.64644 8.25699 8.61259C8.33823 8.57875 8.41197 8.52915 8.47394 8.46667L12.6673 4.28V5.33333C12.6673 5.51014 12.7375 5.67971 12.8625 5.80474C12.9876 5.92976 13.1571 6 13.3339 6C13.5108 6 13.6803 5.92976 13.8053 5.80474C13.9304 5.67971 14.0006 5.51014 14.0006 5.33333V2.66667C14.0006 2.48986 13.9304 2.32029 13.8053 2.19526C13.6803 2.07024 13.5108 2 13.3339 2H10.6673C10.4905 2 10.3209 2.07024 10.1959 2.19526C10.0708 2.32029 10.0006 2.48986 10.0006 2.66667C10.0006 2.84348 10.0708 3.01305 10.1959 3.13807C10.3209 3.2631 10.4905 3.33333 10.6673 3.33333Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>
    ),
  }),
];

const TransactionPage = () => {
  const { address, connected } = useWalletInfo();

  const [searchQuery, setSearchQuery] = useState(""); // Actual query sent to API
  const [showFilter, setShowFilter] = useState(false);
  const [selectedType, setSelectedType] = useState<TRX_TYPE | undefined>(
    undefined
  );
  const [page, setPage] = useState<number>(1);
  const count = 10;

  // Handle search input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setPage(1); // Reset to first page when search changes
  };

  // Handle filter type changes
  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as TRX_TYPE | "";
    setSelectedType(value ? (value as TRX_TYPE) : undefined);
  };

  // Apply filter
  const handleApplyFilter = () => {
    setPage(1); // Reset to first page when filter changes
    setShowFilter(false);
  };

  // Clear filters
  const handleClearFilters = () => {
    setSelectedType(undefined);
    setPage(1); // Reset to first page
    setShowFilter(false);
  };

  // Get transaction data
  const { transactionData, isLoading } = useGetTransactions({
    page,
    count,
    type: selectedType,
    search: searchQuery,
    walletAddress: address!,
  });

  // Initialize table
  const table = useReactTable({
    data: transactionData?.data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // Wallet not connected state
  if (!connected) {
    return (
      <div className="bg-white dark:bg-[#151515] rounded-lg border border-[#E3E3E8] dark:border-[#3D3D3D] p-8 flex flex-col items-center justify-center text-center min-h-[400px]">
        <div className="h-16 w-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
          <AiFillWallet className="text-[#CC8F00] dark:text-gold-200 h-8 w-8" />
        </div>
        <h2 className="text-xl font-semibold text-[#050706] dark:text-white mb-3">
          Wallet Not Connected
        </h2>
        <p className="text-[#4B4D4C] dark:text-gray-400 max-w-md mb-6">
          Please connect your wallet to view your transaction history. Your
          transactions will appear here once you connect.
        </p>
        <button
          onClick={() => {
            // Trigger your wallet connect modal or function here
            console.log("Connect wallet clicked");
          }}
          className="px-6 py-3 bg-[#CC8F00] hover:bg-[#B07D00] dark:bg-gold-200 dark:hover:bg-gold-300 text-white rounded-lg transition-colors"
        >
          Connect Wallet
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-2 md:gap-4">
        <div className="relative flex-1">
          <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search transaction ID"
            className="outline-none w-full md:w-1/2 pl-10 pr-4 py-2 md:py-3 bg-white dark:bg-[#151515] border border-[#C5C5CA] dark:border-[#3D3D3D] rounded-lg text-[#050706] dark:text-white placeholder-gray-400"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <div className="relative">
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="flex items-center gap-3 px-4 py-2 md:py-3 bg-white dark:bg-[#151515] border border-[#C5C5CA] dark:border-[#3D3D3D] rounded-lg text-[#050706] dark:text-white hover:border-[#CC8F00] dark:hover:border-gold-200 transition-colors"
          >
            <IoFilter />
            Filter
          </button>

          {/* Filter Modal */}
          {showFilter && (
            <div className="absolute right-0 top-16 w-80 bg-white dark:bg-[#151515] border border-[#ECECEC] dark:border-[#3D3D3D] rounded-lg shadow-lg z-50">
              <div className="p-4 flex justify-between items-center border-b border-[#ECECEC] dark:border-[#3D3D3D]">
                <h3 className="text-base font-medium text-[#050706] dark:text-white">
                  Filter By
                </h3>
                <button
                  onClick={() => setShowFilter(false)}
                  className="text-[#4E4E4E] dark:text-gray-400 bg-[#EBEBEB] dark:bg-gray-700 hover:text-[#4E4E4E] rounded-full p-1"
                >
                  <IoClose size={20} />
                </button>
              </div>

              <div className="p-4 space-y-4">
                <div className="space-y-2">
                  <label className="text-base text-[#050706] dark:text-white font-medium">
                    Transaction Type
                  </label>
                  <div className="relative">
                    <select
                      value={selectedType || ""}
                      onChange={handleTypeChange}
                      className="w-full p-2 bg-white dark:bg-[#151515] border border-[#ECECEC] dark:border-[#3D3D3D] rounded-lg text-[#050706] dark:text-white appearance-none focus:outline-none focus:ring-1 focus:ring-[#CC8F00] dark:focus:ring-gold-200 focus:border-[#CC8F00] dark:focus:border-gold-200"
                    >
                      <option value="">All Types</option>
                      {transactionTypes.map((type, index) => (
                        <option key={index} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                    <IoChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 gap-2 border-t border-[#ECECEC] dark:border-[#3D3D3D]">
                  <button
                    onClick={handleClearFilters}
                    className="text-base w-1/2 py-3 rounded-lg border border-[#ECECEC] dark:border-[#3D3D3D] text-[#070707] dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    Clear filters
                  </button>
                  <button
                    onClick={handleApplyFilter}
                    className="py-3 w-1/2 bg-[#CC8F00] hover:bg-[#B07D00] dark:bg-gold-200 dark:hover:bg-gold-300 text-white rounded-lg transition-colors"
                  >
                    Apply Filter
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white dark:bg-[#151515] rounded-lg border border-[#E3E3E8] dark:border-[#3D3D3D] w-full overflow-hidden">
        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-16">
            {/* <SpinnerLoader width={40} height={40} /> */}
            <div className="w-12 h-12 rounded-full border-4 border-t-4 border-[#CC8F00] dark:border-gold-200 border-t-transparent animate-spin mb-4"></div>
            <p className="text-lg text-[#050706] dark:text-white">
              Loading transactions...
            </p>
            <p className="text-sm text-[#4B4D4C] dark:text-gray-400 mt-2">
              This may take a moment
            </p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && transactionData?.data?.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="h-16 w-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
              <MdOutlineReceiptLong className="text-[#CC8F00] dark:text-gold-200 h-8 w-8" />
            </div>
            <h2 className="text-xl font-semibold text-[#050706] dark:text-white mb-3">
              No Transactions Found
            </h2>
            <p className="text-[#4B4D4C] dark:text-gray-400 max-w-md text-center mb-1">
              {searchQuery || selectedType
                ? "No transactions match your current search criteria."
                : "You haven't made any transactions yet."}
            </p>
            {(searchQuery || selectedType) && (
              <button
                onClick={handleClearFilters}
                className="text-[#CC8F00] dark:text-gold-200 font-medium hover:underline mt-4"
              >
                Clear filters
              </button>
            )}
          </div>
        )}

        {/* Transaction Table */}
        {!isLoading && transactionData?.data?.length > 0 && (
          <div className="overflow-x-auto w-full">
            <div className="inline-block min-w-full align-middle">
              <table className="min-w-full">
                <thead>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr
                      key={headerGroup.id}
                      className="border-b border-[#E3E3E8] dark:border-[#3D3D3D]"
                    >
                      {headerGroup.headers.map((header) => (
                        <th
                          key={header.id}
                          className="px-6 py-4 text-left text-sm font-medium text-[#00000099] dark:text-[#FFFFFFB2]"
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {table.getRowModel().rows.map((row) => (
                    <tr
                      key={row.id}
                      className={`
                        border-b border-[#E3E3E8] dark:border-[#3D3D3D] last:border-0
                        ${
                          row.index % 2 === 0
                            ? "bg-[#FAFAFA] dark:bg-[#181818]"
                            : "bg-white dark:bg-[#151515]"
                        }
                        hover:bg-gray-50 dark:hover:bg-[#1C1C1C] transition-colors
                      `}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td
                          key={cell.id}
                          className="px-6 py-4 text-base whitespace-nowrap"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Pagination */}
        {!isLoading && (
          <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-t border-[#E3E3E8] dark:border-[#3D3D3D]">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (page > 1) {
                    setPage(page - 1);
                  }
                }}
                disabled={page <= 1 || isLoading}
                className="px-4 py-2 text-sm text-[#050706] dark:text-white border border-[#E3E3E8] dark:border-[#3D3D3D] rounded-lg disabled:opacity-50 hover:bg-gray-50 dark:hover:bg-[#1C1C1C] transition-colors"
              >
                Previous
              </button>
              <button
                onClick={() => {
                  if (
                    transactionData?.meta?.hasNextPage ||
                    (transactionData?.data &&
                      transactionData.data.length === count)
                  ) {
                    setPage(page + 1);
                  }
                }}
                disabled={
                  isLoading ||
                  !(
                    transactionData?.meta?.hasNextPage ||
                    (transactionData?.data &&
                      transactionData.data.length === count)
                  )
                }
                className="px-4 py-2 text-sm text-[#050706] dark:text-white border border-[#E3E3E8] dark:border-[#3D3D3D] rounded-lg disabled:opacity-50 hover:bg-gray-50 dark:hover:bg-[#1C1C1C] transition-colors"
              >
                Next
              </button>
            </div>

            <span className="text-sm text-[#4B4D4C] dark:text-gray-400">
              Page{" "}
              <span className="font-medium text-[#050706] dark:text-white">
                {page}
              </span>{" "}
              of{" "}
              <span className="font-medium text-[#050706] dark:text-white">
                {transactionData?.meta?.totalPages ||
                  Math.ceil((transactionData?.meta?.totalCount || 0) / count) ||
                  (transactionData?.data?.length ? page : 0)}
              </span>
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionPage;
