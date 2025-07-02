'use client';

import React from 'react';

interface Props {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const GradeSubjectSearchBar: React.FC<Props> = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="flex justify-end mt-4">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="ค้นหาวิชา / อาจารย์ / สถานะ..."
        className="border border-gray-300 rounded-md px-4 py-2 text-sm w-80"
      />
    </div>
  );
};

export default GradeSubjectSearchBar;
