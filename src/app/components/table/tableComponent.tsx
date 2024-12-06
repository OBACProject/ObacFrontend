"use client";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onRowClick?: (id: number) => void;
  selectedValue?: string;
  columnWidths?: Record<string, string>;
}

export function DataTable<TData extends { [key: string]: any }, TValue>({
  columns,
  data,
  onRowClick,
  selectedValue,
  columnWidths = {},
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 6 } }, // กำหนดค่าเริ่มต้นของ pageSize
  });

  // pagination
  const getPageNumbers = () => {
    const totalPageCount = table.getPageCount();
    const currentPage = table.getState().pagination.pageIndex + 1;
    const pageNumbers = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(currentPage - 2, 1);
    let endPage = Math.min(currentPage + 2, totalPageCount);

    if (endPage - startPage + 1 < maxPagesToShow) {
      if (startPage === 1) {
        endPage = Math.min(startPage + maxPagesToShow - 1, totalPageCount);
      } else if (endPage === totalPageCount) {
        startPage = Math.max(endPage - maxPagesToShow + 1, 1);
      }
    }
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  return (
    <>
      <div className="rounded-md border ">
        <Table className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <TableHeader
            className={`min-w-full  divide-y overflow-hidden rounded-lg `}
          >
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                className="px-6 py-3 text-base font-medium tracking-wider"
                key={headerGroup.id}
              >
                {headerGroup.headers.map((header, index) => {
                  return (
                    <TableHead
                      key={header.id}
                      className={`${
                        index === headerGroup.headers.length - 1
                          ? "sticky right-0  z-10"
                          : ""
                      } text-center px-6 py-3 text-base font-medium tracking-wider`}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, index) => (
                <TableRow
                  className={`text-center  h-10`}
                  key={row.id}
                  onClick={() => {
                    const value = selectedValue
                      ? row.original[selectedValue]
                      : undefined;
                    const id = Number(value);
                    console.log("ID:", id);
                    if (!isNaN(id)) {
                      onRowClick?.(id);
                    }
                  }}
                  style={{ cursor: "pointer" }}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell, index) => {
                    // Check if the column has a custom width set
                    const columnWidth = columnWidths[cell.column.id] || "w-1/6";
                    return (
                      <TableCell
                        key={cell.id}
                        className={`${
                          index === row.getVisibleCells().length - 1
                            ? "sticky right-0 z-10"
                            : `border-r-2 ${columnWidth}`
                        }`}
                        style={{
                          zIndex:
                            index === row.getVisibleCells().length - 1
                              ? 10
                              : undefined,
                        }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="flex items-center justify-between py-4">
          {/* Left side: Showing total rows */}
          <div className="ml-4 flex gap-2">
            <span>Showing</span>
            <span>
              {table.getState().pagination.pageIndex *
                table.getState().pagination.pageSize +
                1}
            </span>
            <span>to</span>
            <span>
              {Math.min(
                (table.getState().pagination.pageIndex + 1) *
                  table.getState().pagination.pageSize,
                table.getFilteredRowModel().rows.length
              )}
            </span>
            <span>of</span>
            <span>{table.getFilteredRowModel().rows.length}</span>
            <span>results</span>
          </div>

          {/* Right side: Pagination buttons */}
          <div className="flex items-center space-x-2 mr-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              &lt;
            </Button>
            {/* Numbered page buttons */}
            {getPageNumbers().map((page) => (
              <Button
                key={page}
                variant="default"
                size="sm"
                onClick={() => table.setPageIndex(page - 1)}
              >
                {page}
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            ></Button>
          </div>
        </div>
      </div>
    </>
  );
}
