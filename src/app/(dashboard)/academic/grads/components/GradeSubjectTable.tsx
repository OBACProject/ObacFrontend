'use client';

import React from 'react';

interface Column {
  key: string;
  label: string;
}

interface Row {
  [key: string]: any;
}

interface GradeSubjectTableProps {
  columns: Column[];
  data: Row[];
}

const GradeSubjectTable: React.FC<GradeSubjectTableProps> = ({ columns, data }) => {
  return (
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full table-fixed border-collapse text-sm">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="px-4 py-2 border text-center font-medium">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx} className="hover:bg-gray-50">
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-2 border text-center">
                  <span
                    className={
                      col.key === 'status_graded'
                        ? row[col.key] === 'การประเมินเสร็จสิ้น'
                          ? 'text-green-600'
                          : row[col.key] === 'ยังไม่ได้ประเมิน'
                          ? 'text-red-500'
                          : 'text-orange-500'
                        : ''
                    }
                  >
                    {row[col.key]}
                  </span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GradeSubjectTable;
