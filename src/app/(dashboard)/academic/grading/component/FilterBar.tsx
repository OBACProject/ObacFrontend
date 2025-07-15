'use client';

import React from 'react';
import SelectTermYear from '@/components/Academic/SelectTermYear';


interface FilterBarProps {
  term: string;
  year: number;
  currentYear: number;
  onChangeTerm: (term: string) => void;
  onChangeYear: (year: number) => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  term,
  year,
  currentYear,
  onChangeTerm,
  onChangeYear,
  searchTerm,
  onSearchChange,
}) => {
  return (
    <div className="flex flex-row justify-end items-center gap-4 mb-4 px-10">
      <SelectTermYear
        term={term}
        year={year}
        currentYear={currentYear}
        onChangeTerm={onChangeTerm}
        onChangeYear={onChangeYear}
      />

      <div className="flex items-center gap-2 ">
        <label className="text-sm font-medium">ค้นหาข้อมูล</label>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-1 text-sm w-64"
          placeholder="ค้นหาห้อง / สาขา / สถานะ..."
        />
      </div>
    </div>
  );
};

export default FilterBar;
