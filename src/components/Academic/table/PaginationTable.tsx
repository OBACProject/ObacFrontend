import Link from "next/link";
import React from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

export type Column<T> = {
  label: string;
  key?: string;
  className?: string;
  render?: (row: T) => React.ReactNode;
};

interface ServerPaginatedTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (item: T) => void;
  getRowLink?: (item: T) => string;
  currentPage: number;
  totalPages: number;
  totalCount: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  title?: string;
  icon?: React.ReactNode;
}

export function StyledServerPaginatedDataTable<T extends Record<string, any>>({
  columns,
  data,
  onRowClick,
  getRowLink,
  currentPage,
  totalPages,
  totalCount,
  pageSize,
  onPageChange,
  hasNextPage = false,
  hasPreviousPage = false,
  title,
  icon,
}: ServerPaginatedTableProps<T>) {
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  const generatePageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push(-1);
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push(-1);
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push(-1);
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push(-2);
        pages.push(totalPages);
      }
    }
    return pages;
  };

  const pageNumbers = generatePageNumbers();

  const renderRow = (item: T, rowIndex: number) => {
    const rowContent = columns.map((col, colIndex) => {
      const cellValue = col.key ? item[col.key] : null;
      const renderContent = col.render ? col.render(item) : cellValue;
      return (
        <div
          key={`cell-${rowIndex}-${colIndex}`}
          className={`text-center flex items-center px-4 py-1 border-1 ${col.className}`}
        >
          {renderContent != null ? renderContent : "-"}
        </div>
      );
    });

    const rowStyle =
      "w-full shadow-md flex border border-r-0 border-gray-100 border-t-0 hover:bg-blue-100 text-gray-700 cursor-pointer bg-white";

    return getRowLink ? (
      <Link key={`row-${rowIndex}`} href={getRowLink(item)}>{
        <div className={rowStyle}>{rowContent}</div>
      }</Link>
    ) : (
      <div
        key={`row-${rowIndex}`}
        className={rowStyle}
        onClick={() => onRowClick && onRowClick(item)}
      >
        {rowContent}
      </div>
    );
  };

  return (
    <div className="w-full rounded-sm py-5 px-10">
      {/* Table Header */}
      <div className="py-2 px-5 flex items-center rounded-t-lg gap-3 bg-gradient-to-r from-blue-500 to-indigo-600">
        {icon}
        <h1 className="text-lg text-white font-prompt">{title}</h1>
      </div>

      <div className="w-full flex shadow-lg">
        {columns.map((col, index) => (
          <div
            key={col.key || `header-${index}`}
            className={`bg-gray-100 text-gray-800 border-t border-b border-gray-400 py-1 px-4 text-center text-lg flex items-center justify-center ${col.className}`}
          >
            {col.label || "-"}
          </div>
        ))}
      </div>

      {data.length > 0 ? (
        data.map((item, rowIndex) => renderRow(item, rowIndex))
      ) : (
        <div className="text-center text-gray-600 py-8 border border-t-0 border-gray-200">
          ไม่มีข้อมูลที่จะแสดง
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center space-y-4 sm:space-y-0 py-6">
          <div className="text-sm text-gray-600">
            แสดง {Math.min((currentPage - 1) * pageSize + 1, totalCount)} ถึง {" "}
            {Math.min(currentPage * pageSize, totalCount)} จาก {totalCount.toLocaleString()} รายการ
          </div>

          <div className="flex items-center space-x-1">
            <button
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
              className="p-2 rounded-md border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              title="หน้าแรก"
            >
              <ChevronsLeft className="h-4 w-4" />
            </button>

            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={!hasPreviousPage}
              className="p-2 rounded-md border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              title="หน้าก่อนหน้า"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            {pageNumbers.map((pageNum, index) => (
              pageNum < 0 ? (
                <span key={`ellipsis-${index}`} className="px-3 py-2 text-gray-500">...</span>
              ) : (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`px-3 py-2 rounded-md border text-sm font-medium transition-colors ${
                    pageNum === currentPage
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {pageNum}
                </button>
              )
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={!hasNextPage}
              className="p-2 rounded-md border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              title="หน้าถัดไป"
            >
              <ChevronRight className="h-4 w-4" />
            </button>

            <button
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-md border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              title="หน้าสุดท้าย"
            >
              <ChevronsRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}