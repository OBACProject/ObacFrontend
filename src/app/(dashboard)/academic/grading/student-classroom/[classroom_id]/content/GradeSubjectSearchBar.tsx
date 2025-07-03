'use client';

import React, { useState, useEffect } from 'react';

interface Props {
  onChange: (value: string) => void;
}

const GradeSubjectSearchBar: React.FC<Props> = ({ onChange }) => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    onChange(searchTerm);
  }, [searchTerm, onChange]);

  return (
    <div className="flex justify-end mt-4 px-4">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="ค้นหาวิชา / อาจารย์ / สถานะ..."
        className="border border-gray-300 rounded-md px-4 py-2 text-sm w-80"
      />
    </div>
  );
};

export default GradeSubjectSearchBar;
