import React, { useMemo, useState } from "react";

type Column<T> = {
  label: string;
  key?: string;
  className?: string;
  render?: (row: T) => React.ReactNode; // Ensures render returns ReactNode
};

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  pagination: number;
  onRowClick?: (item: T) => void;
  isEdit?: boolean;
}

export function DataTableStudentInfo<T extends Record<string, any>>({
  columns,
  data,
  pagination,
  onRowClick,
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

  return (
    <div className="w-full rounded-sm py-5 px-10">
      {/* Table Header */}
      <div className="w-full flex border-2 border-l-0 border-r-0 border-gray-400">
        {columns.map((col, index) => (
          <div
            key={col.key || `header-${index}`}
            className={`bg-[#cfe4ff] text-gray-800  py-0 text-center font-semibold flex items-center justify-center ${col.className}`}
          >
            {col.label || "-"}
          </div>
        ))}
      </div>

      {/* Table Body */}
      {paginatedData.length > 0 ? (
        paginatedData.map((item, rowIndex) => (
          <div
            key={`row-${rowIndex}`}
            className={`w-full flex border border-gray-300 h-fit  border-t-0 border-r-0 shadow-md hover:bg-blue-50 text-gray-600 cursor-pointer ${
              rowIndex % 2 === 0 ? "bg-white" : "bg-white"
            }`}
            onClick={() => onRowClick && onRowClick(item)}
          >
            {columns.map((col, colIndex) => {
              const cellValue = col.key ? item[col.key] : null;
              const renderContent = col.render ? col.render(item) : cellValue;
              return (
                <div
                  key={`cell-${rowIndex}-${colIndex}`}
                  className={`text-center flex items-center px-4   border-r font-light
                     border-gray-300 ${col.className} ${
                    item.isFailed ? "bg-red-200" : ""
                  }
                `}
                >
                  {renderContent != null ? renderContent : "-"}
                </div>
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
            className="px-4 py-1 bg-gray-300 rounded-lg disabled:opacity-50"
          >
            Prev
          </button>
          <span className="text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-1 bg-gray-300 rounded-lg disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
