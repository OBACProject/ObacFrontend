import React from "react";

interface ColumnConfig {
  header: string;
  field: string; 
  width: string; 
  align?: "left" | "center" | "right";
  padding? :string;
}

interface DynamicTableProps<T> {
  data: T[];
  columns: ColumnConfig[];
  onRowClick?: (row: T) => void;
}

export default function DynamicTable<T>({
  data,
  columns,
  onRowClick,
}: DynamicTableProps<T>) {
  const gridCols = columns.map((col) => col.width).join(" ");

  return (
    <div className="">
      <div
        className="grid shadow-lg h-fit bg-white border-t-2 border-b-2 border-gray-400 text-gray-800 text-lg font-prompt"
        style={{ gridTemplateColumns: gridCols }}
      >
        {columns.map((col, idx) => (
          <div
            key={idx}
            className={`py-2 px-2 text-center border-r last:border-none`}
          >
            {col.header}
          </div>
        ))}
      </div>

      {data.map((row, rowIndex) => (
        <div
          key={rowIndex}
          onClick={() => onRowClick?.(row)}
          className="grid bg-white text-black border-b border-gray-300 hover:bg-blue-100 shadow-lg"
          style={{ gridTemplateColumns: gridCols }}
        >
          {columns.map((col, colIndex) => (
            <div
              key={colIndex}
              className={`py-2 px-2 text-${col.align ?? "center"} ${col.padding ?? "pl-0"} border-r last:border-none`}
            >
              {String((row as any)[col.field] ?? "-")}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
