"use client";
import { DataTable } from "@/components/common/MainTable/table_style_1";
import { Combobox } from "@/components/common/Combobox/combobox";
import { Input } from "@/components/ui/input";
import { GetAllStudentTableDto } from "@/DTO/studentDto";
import { getAllStudentViewData } from "@/resource/academics/grading/viewData/individualGradeViewData";
import { Loader2 } from "lucide-react";
import { Suspense, useEffect, useMemo, useState } from "react";
import { TableSkeleton } from "./component/skeletons/TableSkeleton";

export function StudentListPage() {
  const [individualStudentData, setIndividualStudentData] = useState<
    GetAllStudentTableDto[]
  >([]);
  const [isLoadingPage, setIsLoadingPage] = useState<boolean>(false);
  const classLevels = Array.from(
    new Set(individualStudentData.map((student) => student.class))
  );

  const uniqueFaculties = Array.from(
    new Set(individualStudentData.map((student) => student.facultyName))
  );

  const [searchInput, setSearchInput] = useState<string>("");
  const [selectedClassLevel, setSelectedClassLevel] = useState<string>("");
  const [selectedFaculty, setSelectedFaculty] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllStudentViewData();
      setIndividualStudentData(data);
      setIsLoadingPage(true);
    };

    fetchData();
  }, []);

  const columns = [
    { label: "ลำดับ", key: "index", className: "w-2/16" },
    { label: "รหัสนักเรียน", key: "studentCode", className: "w-2/16" },
    { label: "ชื่อ - นามสกุล", key: "thaiName", className: "w-6/16" },
    { label: "ระดับชั้น", key: "class", className: "w-2/16" },
    {
      label: "หลักสูตรการศึกษา",
      key: "facultyName",
      className: "w-4/16 text-start line-clamp-1",
    },
  ];

  const filteredData = useMemo(() => {
    return individualStudentData.filter((student) => {
      const matchClassLevel = selectedClassLevel
        ? student.class === selectedClassLevel
        : true;
      const matchFaculty = selectedFaculty
        ? student.facultyName === selectedFaculty
        : true;
      const matchSearch = searchInput.toLocaleLowerCase()
        ? student.studentCode.toLocaleLowerCase().includes(searchInput) ||
          student.thaiName.toLocaleLowerCase().includes(searchInput)
        : true;

      return matchClassLevel && matchFaculty && matchSearch;
    });
  }, [individualStudentData, selectedClassLevel, selectedFaculty, searchInput]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border space-y-6">
      {/* Filter Section */}
      <div className="flex gap-4">
        <div className="w-1/4">
          <Suspense fallback={<div className="h-10 bg-gray-100 rounded animate-pulse"></div>}>
            <Combobox
              options={classLevels.map((classData) => ({
                value: classData,
                label: classData,
              }))}
              buttonLabel="ระดับการศึกษา"
              onSelect={setSelectedClassLevel}
            />

            <Combobox
              options={uniqueFaculties.map((data) => ({
                value: data,
                label: data,
              }))}
              buttonLabel="ระดับการศึกษา"
              onSelect={setSelectedClassLevel}
            />

          </Suspense>
        </div>
        <div className="flex-1">
          <Input
            type="text"
            placeholder="ค้นหารหัสนักเรียนหรือชื่อ..."
            className="w-full"
            onChange={(event) => setSearchInput(event.target.value)}
          />
        </div>
      </div>

      {/* Data Table */}
      <Suspense fallback={<TableSkeleton />}>
        <DataTable
          columns={columns}
          data={filteredData.map((item, index) => ({
            ...item,
            index: index + 1,
          }))}
          getRowLink={(item) => {
            const student = individualStudentData.find(
              (student) => student.studentCode === item.studentCode
            );
            return `/academic/score-management/individual/${student?.studentId}`;
          }}
          pagination={10}
        />
      </Suspense>
    </div>
  );
}
