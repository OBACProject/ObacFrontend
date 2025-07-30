"use client";

import React from "react";
import Link from "next/link";

export interface ColumnConfig<T> {
  label: string;
  width: string;
  render: (item: T, index: number) => React.ReactNode;
  className?: string;
}

interface NameListScheduleTableProps<T> {
  data: T[];
  columns: ColumnConfig<T>[];
  rowHref?: (item: T) => string;
  emptyText?: string;
  title?: string;
  icon?: React.ReactNode;
}

export default function NameListScheduleTable<T>({
  data,
  columns,
  rowHref,
  emptyText = "ไม่มีข้อมูล",
  icon,
  title,
}: NameListScheduleTableProps<T>) {
  return (
    <div className="w-full rounded-sm py-2 px-10">
      {/* Header */}
      <div className="py-2 px-5 flex items-center rounded-t-lg gap-3 bg-gradient-to-r from-blue-500 to-indigo-600">
        {icon}
        <h1 className="text-lg text-white font-prompt ">{title}</h1>
      </div>
      <div
        className={`grid bg-gray-100 text-gray-800 border-t-1 border-b-1 border-gray-400 py-1 px-4 text-center text-lg`}
        style={{
          gridTemplateColumns: columns.map((col) => col.width).join(" "),
        }}
      >
        {columns.map((col, i) => (
          <div key={i} className="text-center py-1.5">
            {col.label}
          </div>
        ))}
      </div>

      {/* Body */}
      {data && data.length > 0 ? (
        <div className="shadow-md">
          {data.map((item, index) => {
            const rowContent = (
              <div
                className={`grid bg-white hover:bg-blue-50 border border-gray-300 border-t-0 text-gray-700`}
                style={{
                  gridTemplateColumns: columns
                    .map((col) => col.width)
                    .join(" "),
                }}
              >
                {columns.map((col, colIndex) => (
                  <div
                    key={colIndex}
                    className={`flex items-center py-1 px-2 border-r border-gray-300 ${
                      col.className ?? "justify-center line-clamp-1"
                    }`}
                  >
                    {col.render(item, index)}
                  </div>
                ))}
              </div>
            );

            return rowHref ? (
              <Link href={rowHref(item)} key={index}>
                {rowContent}
              </Link>
            ) : (
              <div key={index}>{rowContent}</div>
            );
          })}
        </div>
      ) : (
        <div className="border-2 py-10 border-dashed grid place-items-center border-t-0 text-2xl text-gray-500 border-gray-400">
          {emptyText}
        </div>
      )}
    </div>
  );
}
