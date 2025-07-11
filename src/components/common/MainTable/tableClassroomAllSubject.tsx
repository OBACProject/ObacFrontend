"use client";

import Link from "next/link";
import React, { useMemo, useState } from "react";

export type Column<T> = {
  label: string;
  key?: string;
  className?: string;
  render?: (row: T) => React.ReactNode;
};

interface TableProps<T> {
  generalColumns: Column<T>[]; // index, studentCode, name, GPA, GPAX
  subjectColumns: Column<T>[]; // dynamic subject columns
  data: T[];
  pagination: number;
  onRowClick?: (item: T) => void;
  getRowLink?: (item: T) => string;
}

export function ClassroomAllSubjectTable<T extends Record<string, any>>({
  generalColumns,
  subjectColumns,
  data,
  pagination,
  onRowClick,
  getRowLink,
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
    const generalCells = generalColumns.map((col, colIndex) => {
      const content = col.render ? col.render(item) : col.key ? item[col.key] : "-";
      return (
        <div
          key={`gen-${rowIndex}-${colIndex}`}
          className={`text-sm text-center px-3 py-2 border-r border-gray-300 ${col.className}`}
        >
          {content}
        </div>
      );
    });

    const subjectCells = subjectColumns.map((col, colIndex) => {
      const content = col.render ? col.render(item) : col.key ? item[col.key] : "-";
      return (
        <div
          key={`sub-${rowIndex}-${colIndex}`}
          className={`text-sm text-center px-3 py-2 border-r border-gray-300 ${col.className}`}
        >
          {content}
        </div>
      );
    });

    const rowContent = (
      <div className="flex min-w-full">
        {/* Fixed Part */}
        <div className="flex w-[400px] min-w-[400px] bg-white">{generalCells}</div>

        {/* Scrollable Part */}
        <div className="flex overflow-x-auto">{subjectCells}</div>
      </div>
    );

    const rowWrapperClasses = `w-full border-b border-gray-200 hover:bg-blue-50 cursor-pointer ${
      rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"
    }`;

    return getRowLink ? (
      <Link key={`row-${rowIndex}`} href={getRowLink(item)}>
        <div className={rowWrapperClasses}>{rowContent}</div>
      </Link>
    ) : (
      <div key={`row-${rowIndex}`} className={rowWrapperClasses} onClick={() => onRowClick?.(item)}>
        {rowContent}
      </div>
    );
  };

  return (
    <div className="w-full rounded-lg border">
      {/* Table Header */}
      <div className="flex min-w-full sticky top-0 z-10 bg-white border-b">
        {/* General headers */}
        <div className="flex w-[400px] min-w-[400px] bg-white">
          {generalColumns.map((col, i) => (
            <div
              key={col.key || `gen-header-${i}`}
              className={`font-semibold text-center text-sm px-3 py-2 border-r border-gray-300 ${col.className}`}
            >
              {col.label}
            </div>
          ))}
        </div>

        {/* Scrollable subject headers */}
        <div className="flex overflow-x-auto bg-white">
          {subjectColumns.map((col, i) => (
            <div
              key={col.key || `sub-header-${i}`}
              className={`font-semibold text-center text-sm px-3 py-2 border-r border-gray-300 ${col.className}`}
            >
              {col.label}
            </div>
          ))}
        </div>
      </div>

      {/* Table Body */}
      <div>
        {paginatedData.length > 0 ? (
          paginatedData.map((item, rowIndex) => renderRow(item, rowIndex))
        ) : (
          <div className="text-center text-gray-600 py-6">No data available</div>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-end items-center space-x-2 py-4 px-4 bg-gray-50 border-t">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50"
          >
            Prev
          </button>
          <span className="text-gray-700 text-sm">
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
