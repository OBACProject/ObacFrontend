"use client";

import React, { useMemo, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Combobox } from "@/components/common/Combobox/combobox";
import { useGetAllStudentsQuery } from "@/lib/api/hooks/queries/student.queries";
import { GetAllStudentsResponse } from "@/lib/api/models/student/student.response";
import { Column } from "exceljs";
import { StyledServerPaginatedDataTable } from "@/components/Academic/table/PaginationTable";


export function StudentListPage() {
  const router = useRouter();

  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebounce(searchInput, 500);

  const [selectedClassLevel, setSelectedClassLevel] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;

  const { data: lastSuccessfulData, isLoading } = useGetAllStudentsQuery({
    pageNumber: currentPage,
    pageSize,
    searchText: debouncedSearch || undefined,
    sortBy: undefined,
    Ascending: true,
  });

  const students = useMemo(() => lastSuccessfulData?.items || [], [lastSuccessfulData]);

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchClass = selectedClassLevel ? student.class === selectedClassLevel : true;
      const matchFaculty = selectedFaculty ? student.facultyName === selectedFaculty : true;
      return matchClass && matchFaculty;
    });
  }, [students, selectedClassLevel, selectedFaculty]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getRowLink = (item: GetAllStudentsResponse["items"][0]) =>
    `/academic/student-details/${item.id}`;

  

  const classLevelOptions = useMemo(() => {
    const levels = Array.from(new Set(students.map((s) => s.class))).sort();
    return [{ value: "", label: "ทั้งหมด" }, ...levels.map((c) => ({ value: c, label: c }))];
  }, [students]);

  const facultyOptions = useMemo(() => {
    const faculties = Array.from(new Set(students.map((s) => s.facultyName))).sort();
    return [{ value: "", label: "ทั้งหมด" }, ...faculties.map((f) => ({ value: f, label: f }))];
  }, [students]);
  const columns = [
    { label: "รหัสนักเรียน", key: "studentCode", className: "w-3/16 flex justify-center" },
    {
      label: "ชื่อ - นามสกุล",
      key: "fullName",
      className: "w-7/16 flex items-center justify-start md:justify-center text-start jus",
      render: (item: any) => `${item.prefix}${item.name} ${item.lastName}`,
    },
    { label: "ระดับชั้น", key: "class", className: "w-2/16 flex justify-center" },
    {
      label: "หลักสูตรการศึกษา",
      key: "facultyName",
      className: "w-4/16 text-start line-clamp-1 flex justify-center",
    },
  ]
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border space-y-6 mt-4">
      <div className="bg-gray-50 p-4 rounded-lg border space-y-4">
        <h3 className="font-semibold text-gray-900">ตัวกรองข้อมูล</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ระดับการศึกษา
            </label>
            <Combobox
              options={classLevelOptions}
              buttonLabel={selectedClassLevel || "เลือกระดับการศึกษา"}
              onSelect={setSelectedClassLevel}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              หลักสูตรการศึกษา
            </label>
            <Combobox
              options={facultyOptions}
              buttonLabel={selectedFaculty || "เลือกหลักสูตรการศึกษา"}
              onSelect={setSelectedFaculty}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ค้นหา
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="ค้นหารหัสนักเรียนหรือชื่อ..."
                className="pl-10 w-full"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <StyledServerPaginatedDataTable
      title="รายชื่อนักเรียน"
      icon={<Search className="h-5 w-5 text-gray-500" />}
        columns={columns}
        data={filteredStudents}
        getRowLink={getRowLink}
        currentPage={currentPage}
        totalPages={lastSuccessfulData?.totalPages || 1}
        totalCount={lastSuccessfulData?.totalCount || 0}
        pageSize={pageSize}
        onPageChange={handlePageChange}
        hasNextPage={lastSuccessfulData?.hasNextPage || false}
        hasPreviousPage={lastSuccessfulData?.hasPreviousPage || false}
      />
    </div>
  );
}
