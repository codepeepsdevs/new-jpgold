"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { IoSearch, IoList, IoCheckmark, IoChevronDown } from "react-icons/io5";
import { TbLayoutGrid } from "react-icons/tb";
import images from "../../../public/images";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { MdOutlineShoppingCart, MdVerified } from "react-icons/md";
import { ExtractedNFTAsset } from "@/constants/types";
import useNavigate from "@/hooks/useNavigate";
import { useGetAllListedNfts } from "@/api/jpgnft/jpgnft.queries";
import { LuPackageX } from "react-icons/lu";
import NFTCard from "../cards/NFTCards";
import Pagination from "../common/Pagination";
import {
  extractNFTProperties,
  formatNumberWithoutExponential,
  scrollToTop,
} from "@/utils/utilityFunctions";
import classNames from "classnames";
import SkeletonComponent from "../Skeleton";
import { AllNftSortByEnum, SortDirectionEnum } from "@/api/jpgnft/jpgnft.types";

const sortOptions = [
  {
    value: {
      sortBy: AllNftSortByEnum.PRICE,
      sortDirection: SortDirectionEnum.ASC,
    },
    label: "Price low to high",
  },
  {
    value: {
      sortBy: AllNftSortByEnum.PRICE,
      sortDirection: SortDirectionEnum.DESC,
    },
    label: "Price high to low",
  },
  {
    value: {
      sortBy: AllNftSortByEnum.AMOUNT,
      sortDirection: SortDirectionEnum.ASC,
    },
    label: "Amount low to high",
  },
  {
    value: {
      sortBy: AllNftSortByEnum.AMOUNT,
      sortDirection: SortDirectionEnum.DESC,
    },
    label: "Amount high to low",
  },
];

const NFTList = () => {
  const navigate = useNavigate();

  const [isGridView, setIsGridView] = useState(true);
  const [sortBy, setSortBy] = useState<{
    sortBy: AllNftSortByEnum;
    sortDirection: SortDirectionEnum;
  }>(sortOptions[0].value);
  const [search, setSearch] = useState("");

  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(32);

  const { nftData, isLoading } = useGetAllListedNfts({
    search,
    page: currentPage,
    limit: itemsPerPage,
    sortBy,
  });

  const hasNFTs = nftData?.nfts && nftData.nfts.length > 0;
  const extractedNFTs = useMemo(() => {
    if (!nftData?.nfts || nftData.nfts.length === 0) {
      return [];
    }

    return nftData.nfts.map((nft) => extractNFTProperties(nft));
  }, [nftData?.nfts]);

  const columnHelper = createColumnHelper<ExtractedNFTAsset>();
  const columns = useMemo(
    () => [
      columnHelper.accessor("image", {
        header: "Name",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded">
              <Image
                src={images.marketplace.nftGold}
                alt={`JPNFT #${row.original.image}`}
                width={150}
                height={150}
                className="object-contain"
              />
            </div>
            <span>JPNFT #{row.original.description}</span>
            <MdVerified className="text-gold-200" />
          </div>
        ),
      }),
      columnHelper.accessor("weight", {
        header: "Amount",
        cell: ({ getValue }) => `${getValue()} grams`,
      }),
      columnHelper.accessor("listingPrice", {
        id: "listingPrice",
        header: "Listed Price",
        cell: ({ getValue }) => `$${getValue()?.toLocaleString()}`,
      }),

      columnHelper.accessor("price", {
        id: "currentPrice",
        header: "Current Price",
        cell: ({ getValue }) =>
          `$${formatNumberWithoutExponential(getValue() || 0, 2)}`,
      }),
      columnHelper.accessor("rate", {
        header: "Rate",
        cell: (info) => {
          const rate = info.getValue();
          return (
            <span
              className={classNames("", {
                "text-[#63BA23]": rate.status === "low",
                "text-[#D20832]": rate.status === "high",
                "text-primary": rate.status === "stable",
              })}
            >
              {rate.status === "low" ? "▲" : rate.status === "high" ? "▼" : ""}
              {rate.value}%
            </span>
          );
        },
      }),

      columnHelper.display({
        id: "actions",
        header: "Purchase",
        cell: (info) => (
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => navigate(`/marketplace/${info.row.original.id}`)}
              className="bg-[#CC8F00] font-semibold text-white px-6 py-2 rounded hover:bg-[#B37E00] transition-colors"
            >
              Buy
            </button>
            <button className="bg-black/5 py-2 px-4">
              <MdOutlineShoppingCart size={20} />
            </button>
          </div>
        ),
      }),
    ],
    [columnHelper, navigate]
  );

  const table = useReactTable({
    data: extractedNFTs || [],
    columns,

    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    scrollToTop({
      id: "marketplace-nfts",
      height: 130,
    });
  };

  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items);
  };

  return (
    <section id="marketplace-nfts" className="w-full py-8 h-full min-h-screen">
      <div
        className={`flex flex-col gap-3 md:flex-row md:items-center md:justify-between p-2 bg-transparent rounded-lg mb-6`}
      >
        <div className="relative w-full md:w-1/2">
          <div className="flex items-center gap-2 bg-white dark:bg-[#1C1C1E] border border-[#D5D5DD] dark:border-[#717179] rounded-lg px-4 py-3">
            <IoSearch size={20} className="text-gray-500 dark:text-[#4E4E4E]" />
            <input
              type="text"
              placeholder="Search nft discriminant"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-transparent outline-none dark:text-white"
            />
          </div>
        </div>

        {/* Sort Dropdown */}
        <div className="relative flex justify-end gap-2">
          <button
            onClick={() => setIsSelectOpen(!isSelectOpen)}
            className="w-full bg-white dark:bg-[#1C1C1E] border border-[#D5D5DD] dark:border-[#717179] dark:text-white rounded-lg px-4 py-3 flex gap-2 items-center justify-between"
          >
            <span>
              {sortOptions.find((option) => option.value === sortBy)?.label}
            </span>
            <IoChevronDown
              className={`transform transition-transform ${
                isSelectOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isSelectOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-[#1C1C1E] border border-[#D5D5DD] rounded-lg shadow-lg z-10">
              {sortOptions.map((option, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSortBy(option.value);
                    setIsSelectOpen(false);
                  }}
                  className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-100 dark:hover:bg-[#2C2C2E] dark:text-white"
                >
                  <span>{option.label}</span>
                  {sortBy === option.value && (
                    <IoCheckmark className="text-primary-500" size={20} />
                  )}
                </button>
              ))}
            </div>
          )}

          <div className="hidden sm:flex items-center gap-1 bg-white dark:bg-black/20 p-1 rounded-lg border dark:border-none shadow-lg">
            <button
              onClick={() => setIsGridView(true)}
              className={`p-2 rounded ${
                isGridView
                  ? "dark:bg-white bg-[#0A0C0F] dark:text-[#1C1B1F] text-white"
                  : "text-[#1C1B1F] dark:text-[#DDDDDD]"
              }`}
            >
              <TbLayoutGrid size={20} />
            </button>
            <button
              onClick={() => setIsGridView(false)}
              className={`p-2 rounded ${
                !isGridView
                  ? "dark:bg-white bg-[#0A0C0F] dark:text-[#1C1B1F] text-white"
                  : "text-[#1C1B1F] dark:text-[#DDDDDD]"
              }`}
            >
              <IoList size={20} />
            </button>
          </div>
        </div>
      </div>

      {isGridView ? (
        isLoading ? (
          <div className="flex flex-col items-center justify-center text-center py-2 sm:py-4">
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <SkeletonComponent
                  key={index}
                  style={{
                    borderRadius: "0.5rem",
                  }}
                  className="px-10 py-2 w-full border border-[#E6E6E6] dark:border-[#3D3D3D] h-60"
                />
              ))}
            </div>
          </div>
        ) : !hasNFTs ? (
          <div className="flex flex-col items-center justify-center text-center py-20 sm:py-40">
            <div className="w-20 h-20 mb-4 text-gray-300 dark:text-gray-600">
              <LuPackageX size={80} />
            </div>
            <h3 className="text-xl font-semibold text-[#050706] dark:text-white mb-2">
              There are no NFTs listed at the moment
            </h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {nftData.nfts.map((nft) => (
              <NFTCard key={nft.id} nft={nft} type="marketplace" />
            ))}
          </div>
        )
      ) : (
        <div className="w-full border border-[#E2E2E2] dark:border-[#E2E2E2]/20  p-4 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr
                    key={headerGroup.id}
                    className="border-b border-gray-200 dark:border-gray-700"
                  >
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="text-left px-6 py-4 dark:text-white font-semibold"
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
                    className="group border-b dark:text-white border-[#E2E2E2] cursor-pointer dark:border-[#E2E2E2]/20 hover:bg-[#FAFAFA] dark:hover:bg-[#FAFAFA]/10 transition-colors"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-6 py-4 font-semibold">
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

      <div className="mt-4">
        {nftData && (
          <Pagination
            currentPage={currentPage}
            onPageChange={handlePageChange}
            itemsPerPage={itemsPerPage}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
        )}
      </div>
    </section>
  );
};

export default NFTList;
