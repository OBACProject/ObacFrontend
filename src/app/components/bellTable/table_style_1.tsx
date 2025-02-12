import React, { useMemo, useState } from "react";
import Link from "next/link";

type Column = {
  label: string;
  key: string;
  className?: string;
};

type TableProps<T> = {
  columns: Column[];
  data: T[];
  pagination: number;
  rowLink?: (item: T) => string;
};

export function DataTable<T>({
  columns,
  data,
  pagination,
  rowLink,
}: TableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);

  // Compute paginated data efficiently
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

  return (
    <div className="w-full rounded-sm py-5 px-10">
      {/* Table Header */}
      <div className="w-full flex border border-gray-400">
        {columns.map((col, index) => (
          <div
            key={col.key || index}
            className={`bg-[#cfe4ff] text-gray-800 border border-gray-400 py-2 px-4 text-center font-semibold flex items-center justify-center ${col.className}`}
          >
            {col.label}
          </div>
        ))}
      </div>

      {/* Table Body */}
      {paginatedData.length > 0 ? (
        paginatedData.map((item, index) => (
          <div
            key={index}
            className={`w-full flex border border-gray-400 border-t-0 hover:bg-blue-100 text-gray-700 ${
              index % 2 === 0 ? "bg-white" : "bg-gray-100"
            }`}
          >
            {columns.map((col, colIndex) => {
              const cellValue = (item as any)[col.key] ?? "-"; // Ensure non-null values
              const cellContent = (
                <div
                  key={`${index}-${colIndex}`}
                  className={`text-center flex items-center px-4 py-2 border-r border-gray-400 ${col.className}`}
                >
                  <p className="whitespace-normal break-words">{cellValue}</p>
                </div>
              );

              return rowLink ? (
                <Link
                  href={rowLink(item)}
                  key={`link-${index}-${colIndex}`}
                  className="contents"
                >
                  {cellContent}
                </Link>
              ) : (
                cellContent
              );
            })}
          </div>
        ))
      ) : (
        <div className="text-center text-gray-600 py-4">No data available</div>
      )}

      {/* Pagination Controls */}
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
