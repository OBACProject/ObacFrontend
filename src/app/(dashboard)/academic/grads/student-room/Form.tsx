'use client';

import React, { useState, useEffect } from 'react';
import FilterBar from '../components/FilterBar';
import GradeTable from '../components/GradeTable';

interface Column {
  key: string;
  label: string;
}

interface Row {
  [key: string]: any;
}

interface GradsFormProps {
  columns: Column[];
  data: Row[];
}

const GradRoomsForm: React.FC<GradsFormProps> = ({ columns, data }) => {
  const currentYear = new Date().getFullYear() + 543;
  const [term, setTerm] = useState('');
  const [year, setYear] = useState(currentYear);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState<Row[]>(data);

  const handleFilter = () => {
  const filtered = data.filter((item) => {
    const matchYear = year === 0 || item.years === String(year);
    const matchTerm = term === '' || item.semester === term;
    const matchSearch =
      item.level.includes(searchTerm) ||
      item.room.includes(searchTerm) ||
      item.status.includes(searchTerm);

    return matchYear && matchTerm && matchSearch;
  });

  setFilteredData(filtered);
};


  useEffect(() => {
    handleFilter();
  }, [term, year, searchTerm]);

  return (
    <>
      <FilterBar
        term={term}
        year={year}
        currentYear={currentYear}
        onChangeTerm={setTerm}
        onChangeYear={setYear}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <GradeTable columns={columns} data={filteredData} />
    </>
  );
};

export default GradRoomsForm;
