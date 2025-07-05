'use client';

import React, { useMemo, useState } from 'react';
import GradeSubjectSearchBar from '../components/GradeSubjectSearchBar';
import GradeSubjectTable from '../components/GradeSubjectTable';

interface Column {
  key: string;
  label: string;
}

interface Row {
  [key: string]: any;
}

interface GradeSubjectFormProps {
  columns: Column[];
  data: Row[];
}

const GradeSubjectForm: React.FC<GradeSubjectFormProps> = ({ columns, data }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = useMemo(() => {
    return data.filter(
      (item) =>
        item.name_subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.teacher.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.status_graded.includes(searchTerm)
    );
  }, [searchTerm, data]);

  return (
    <>
      <GradeSubjectSearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <GradeSubjectTable columns={columns} data={filteredData} />
    </>
  );
};

export default GradeSubjectForm;
