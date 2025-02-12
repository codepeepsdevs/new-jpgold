import React from "react";
import { useTable } from "react-table";

interface StatsTableRow {
  feature: string;
  jpgcGold: string | number;
  majorEtfs: string | number;
  goldFutures: string | number;
  custodyFees1: string | number;
  custodyFees2: string | number;
}

const StatsTable = ({ data }: { data: StatsTableRow[] }) => {
  const [isScrolled, setIsScrolled] = React.useState(false);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setIsScrolled(e.currentTarget.scrollLeft > 0);
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "",
        accessor: "feature" as keyof StatsTableRow,
        fixed: true,
      },
      {
        Header: "JPGC Gold",
        accessor: "jpgcGold" as keyof StatsTableRow,
      },
      {
        Header: "Major Gold ETFs",
        accessor: "majorEtfs" as keyof StatsTableRow,
      },
      {
        Header: "Gold Futures",
        accessor: "goldFutures" as keyof StatsTableRow,
      },
      {
        Header: "Custody Fees",
        accessor: "custodyFees1" as keyof StatsTableRow,
      },
      {
        Header: "Custody Fees",
        accessor: "custodyFees2" as keyof StatsTableRow,
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div className="w-full overflow-hidden">
      <div className="w-full overflow-x-auto" onScroll={handleScroll}>
        <table
          {...getTableProps()}
          className="w-full relative text-[#000000CC] dark:text-[#FFFFFFCC] text-xs 2xs:text-sm lg:text-base"
        >
          <thead>
            {headerGroups.map((headerGroup) => {
              const { key, ...headerGroupProps } =
                headerGroup.getHeaderGroupProps();
              return (
                <tr key={key} {...headerGroupProps} className="">
                  {headerGroup.headers.map((column, index) => {
                    const { key, ...columnProps } = column.getHeaderProps();
                    return (
                      <th
                        key={key}
                        {...columnProps}
                        className={`p-4 text-center bg-transparent font-bold
                          ${
                            index === 0 && isScrolled
                              ? "sticky left-0 bg-white z-20 after:absolute after:top-0 after:right-0 after:w-[2px] after:h-full after:bg-[#D6BB3F]"
                              : "z-0"
                          }
                        `}
                      >
                        {column.render("Header")}
                      </th>
                    );
                  })}
                </tr>
              );
            })}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, rowIndex) => {
              prepareRow(row);
              const { key, ...rowProps } = row.getRowProps();
              return (
                <tr
                  key={key}
                  {...rowProps}
                  className={
                    rowIndex % 2 === 0
                      ? "bg-white dark:text-[#000000CC]"
                      : "bg-transparent"
                  }
                >
                  {row.cells.map((cell, colIndex) => {
                    const { key, ...cellProps } = cell.getCellProps();
                    return (
                      <td
                        key={key}
                        {...cellProps}
                        className={`p-4 text-center ${
                          colIndex === 0
                            ? `sticky left-0 font-bold z-20 ${
                                rowIndex % 2 === 0
                                  ? "bg-white"
                                  : `${
                                      isScrolled
                                        ? "bg-[#FCEAB7] dark:text-[#000000CC]"
                                        : "bg-transparent"
                                    }`
                              } ${
                                isScrolled
                                  ? "after:absolute after:top-0 after:right-0 after:w-[2px] after:h-full after:bg-[#D6BB3F]"
                                  : ""
                              }`
                            : "z-0"
                        } ${
                          colIndex === 1
                            ? `bg-[#FFDB8A] dark:text-[#000000CC] font-bold z-0 `
                            : ""
                        }`}
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StatsTable;
