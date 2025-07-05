'use client';

import React, { useState } from 'react';
import GradeToggleButton from './ToggleButton';
import { LucideAArrowUp, LucideArrowDown, LucideArrowUp, LucideArrowUpDown } from 'lucide-react';

interface Column {
  key: string;
  label: string;
}

interface Row {
  [key: string]: any;
}

interface GradeTableProps {
  columns: Column[];
  data: Row[];
}

const GradeTable: React.FC<GradeTableProps> = ({ columns, data }) => {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortAsc, setSortAsc] = useState<boolean>(true);

  const handleSort = (key: string) => {
    if (key === 'show') return; // ✅ ข้อ 1: ไม่ให้ sort toggle

    if (sortColumn === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortColumn(key);
      setSortAsc(true);
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortColumn || sortColumn === 'show') return 0;

    const valA = a[sortColumn];
    const valB = b[sortColumn];

    if (typeof valA === 'string' && typeof valB === 'string') {
      return sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
    }

    return sortAsc ? valA - valB : valB - valA;
  });

  return (
    <div className="overflow-x-auto">
      <div className="w-full max-w-7xl mx-auto border rounded-md overflow-hidden relative">
        <div className="overflow-y-auto max-h-[600px]">
          <table className="w-full table-fixed border-collapse text-sm">
            <thead className="sticky top-0 bg-gray-100 shadow z-10">
              <tr>
                {columns.map((col) => {
                  const isSorted = sortColumn === col.key;
                  const showSortArrow = col.key !== 'show';

                  return (
                    <th
                      key={col.key}
                      className={`px-2 py-2 border text-center ${
                        showSortArrow ? 'cursor-pointer select-none' : ''
                      }`}
                      onClick={() => handleSort(col.key)}
                    >
                      <div className="flex justify-center items-center gap-1">
                        <span>{col.label}</span>
                        {showSortArrow && (
                          <span className="text-xs">
                            {isSorted ? (sortAsc ? <LucideArrowUp className='w-3 h-3'/> : <LucideArrowDown className='w-3 h-3'/> ) : <LucideArrowUpDown className='w-3 h-3'/>}
                          </span>
                        )}
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {sortedData.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  {columns.map((col) => (
                    <td key={col.key} className="px-2 py-1 border text-center truncate">
                      {col.key === 'status' ? (
                        <span
                          className={
                            row[col.key] === 'การประเมินเสร็จสิ้น'
                              ? 'text-green-600'
                              : row[col.key] === 'ยังไม่มีการประเมิน'
                              ? 'text-red-500'
                              : row[col.key] === 'แสดงเกรด'
                              ? 'text-blue-500'
                              : 'text-orange-500'
                          }
                        >
                          {row[col.key]}
                        </span>
                      ) : col.key === 'show' ? (
                        <GradeToggleButton isOn={row[col.key]}
                disabled={
                    row.status === 'การประเมินยังไม่เสร็จสมบูรณ์' ||
                    row.status === 'ยังไม่มีการประเมิน'
                }
                className={
                    row.status === 'การประเมินยังไม่เสร็จสมบูรณ์' ||
                    row.status === 'ยังไม่มีการประเมิน'
                    ? 'opacity-50 pointer-events-none'
                    : ''
                } />
                      ) : (
                        row[col.key]
                      )}
        

                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>




  );
};

export default GradeTable;
