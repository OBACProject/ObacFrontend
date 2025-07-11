import { Table } from "lucide-react";
import Link from "next/link";
import React, { useMemo, useState } from "react";

export type Column<T> = {
  label: string;
  key?: string;
  className?: string;
  render?: (row: T) => React.ReactNode;
};

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  pagination: number;
  onRowClick?: (item: T) => void;
  getRowLink?: (item: T) => string;
  isEdit?: boolean;
  title?: string;
  icon?: React.ReactNode;
}

export function StylesTable<T extends Record<string, any>>({
  columns,
  data,
  pagination,
  onRowClick,
  getRowLink,
  title,
  icon,
}: TableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pagination;
    return data.slice(startIndex, startIndex + pagination);
  }, [currentPage, data, pagination]);

  const totalPages = Math.ceil(data.length / pagination);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderRow = (item: T, rowIndex: number) => {
    const rowContent = columns.map((col, colIndex) => {
      const cellValue = col.key ? item[col.key] : null;
      const renderContent = col.render ? col.render(item) : cellValue;

      return (
        <div
          key={`cell-${rowIndex}-${colIndex}`}
          className={`text-center flex items-center px-4 py-1   border-1 ${col.className}`}
        >
          {renderContent != null ? renderContent : "-"}
        </div>
      );
    });

    if (getRowLink) {
      return (
        <Link key={`row-${rowIndex}`} href={getRowLink(item)}>
          <div
            className={`w-full shadow-md flex border border-r-0 border-gray-100 border-t-0 hover:bg-blue-100 text-gray-700 cursor-pointer ${
              rowIndex % 2 === 0 ? "bg-white" : "bg-white"
            }`}
          >
            {rowContent}
          </div>
        </Link>
      );
    } else {
      return (
        <div
          key={`row-${rowIndex}`}
          className={`w-full shadow-md flex border border-r-0 border-gray-200 border-t-0 hover:bg-blue-100 text-gray-700 cursor-pointer ${
            rowIndex % 2 === 0 ? "bg-white" : "bg-white"
          }`}
          onClick={() => onRowClick && onRowClick(item)}
        >
          {rowContent}
        </div>
      );
    }
  };

  return (
    <div className="w-full rounded-sm py-5 px-10">
      {/* Table Header */}
      <div className="py-2 px-5 flex items-center rounded-t-lg gap-3 bg-gradient-to-r from-blue-500 to-indigo-600">
        {icon}
        <h1 className="text-lg text-white font-prompt ">{title}</h1>
      </div>
      <div className="w-full flex shadow-lg ">
        {columns.map((col, index) => (
          <div
            key={col.key || `header-${index}`}
            className={`bg-gray-100 text-gray-800 border-t-1 border-b-1 border-gray-400 py-1 px-4 text-center text-lg flex items-center justify-center ${col.className}`}
          >
            {col.label || "-"}
          </div>
        ))}
      </div>

      {paginatedData.length > 0 ? (
        paginatedData.map((item, rowIndex) => renderRow(item, rowIndex))
      ) : (
        <div className="text-center text-gray-600 py-4">No data available</div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-end items-center space-x-2 py-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50"
          >
            Prev
          </button>
          <span className="text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
