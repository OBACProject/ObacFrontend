"use client";

import { DataTable } from "@/components/common/MainTable/table_style_1";
import { Button } from "@/components/ui/button";
import { Download, FileText, Search, Users } from "lucide-react";
import { useState, useMemo, useCallback } from "react";
import HeaderLabel from "@/components/common/labelText/HeaderLabel";
import { GetGroupSummaryGradeResponse } from "@/lib/api/models/grade/grade.response";
import { useDebounce } from "@/hooks/useDebounce";
import { FilterState, FilterBar } from "./component/filterBar";
import { preProcessClassroomData } from "./dataProcessing";
import { TransformedStudentData } from "./mockData";
import { ClassroomInfoTable } from "@/components/Academic/table/classroomInfoTable";
import { Input } from "@/components/ui/input";
import { BulkPDFStudentTranscriptPDF } from "@/components/PDF/PDFButton";

interface Props {
  initialData: GetGroupSummaryGradeResponse;
}

export function ClassroomGradeClient({ initialData }: Props) {
  const [filters, setFilters] = useState<FilterState>({
    searchInput: "",
    selectedGradeFilter: "",
    selectedSubjectFilter: "",
  });

  const debouncedSearchInput = useDebounce(filters.searchInput, 300);
  const processedData = useMemo(
    () => preProcessClassroomData(initialData),
    [initialData]
  );
  console.log("Processed Data:", processedData);

  const columns = useMemo(() => {
    const baseColumns = [
      {
        label: "ลำดับ",
        key: "index",
        className: "w-[5%] text-sm sticky flex justify-center bg-white z-10",
      },
      {
        label: "รหัสนักเรียน",
        key: "studentCode",
        className: "w-[10%] text-sm sticky  left-[5%] bg-white z-10",
      },
      {
        label: "ชื่อ - นามสกุล",
        key: "name",
        className:
          "w-[15%] text-sm text-center flex justify-start sticky left-[15%] bg-white z-10",
      },
    ];

    // Ensure we always have 10 columns
    const filledSubjects = [
      ...processedData.subjects,
      ...Array(Math.max(0, 10 - processedData.subjects.length)).fill(""),
    ];

    const subjectColumns = filledSubjects.map((subject, idx) => ({
      label: subject || "",
      key: subject ? `subjects.${subject}` : `subjects.blank${idx}`,
      className: "w-[6%] text-center flex justify-center text-sm",
      render: (row: any) => {
        if (!subject) {
          return <span className="text-gray-400">-</span>;
        }
        const grade = row.subjects[subject] || "-";
        const gradeValue = parseFloat(grade);
        const isFailedGrade = gradeValue === 0;
        const isPassedGrade = gradeValue > 0;
        return (
          <span
            className={`px-2 py-1 rounded text-xs font-medium line-clamp-4 break-words whitespace-pre-line ${
              isFailedGrade
                ? "text-red-800"
                : isPassedGrade
                ? "text-green-800"
                : "text-gray-800"
            }`}
            style={{
              display: "block",
              maxHeight: "4.5em",
              overflow: "hidden",
            }}
          >
            {grade}
          </span>
        );
      },
    }));

    const gradeColumns = [
      {
        label: "GPA",
        key: "gpa",
        className: "w-[5%] text-center flex justify-center text-sm",
      },
      {
        label: "GPAX",
        key: "gpax",
        className: "w-[5%] text-center flex justify-center text-sm",
      },
    ];

    return [...baseColumns, ...subjectColumns, ...gradeColumns];
  }, [processedData.subjects]);

  const filteredData = useMemo(() => {
    if (
      !debouncedSearchInput &&
      !filters.selectedGradeFilter &&
      !filters.selectedSubjectFilter
    ) {
      return processedData.students;
    }

    return processedData.students.filter((student) => {
      const matchSearch = debouncedSearchInput
        ? student.studentCode
            .toLowerCase()
            .includes(debouncedSearchInput.toLowerCase()) ||
          student.name
            .toLowerCase()
            .includes(debouncedSearchInput.toLowerCase())
        : true;

      return matchSearch;
    });
  }, [
    processedData.students,
    debouncedSearchInput,
    filters.selectedGradeFilter,
    filters.selectedSubjectFilter,
  ]);

  const tableData = useMemo(() => {
    const sorted = [...filteredData].sort((a, b) =>
      a.studentCode.localeCompare(b.studentCode)
    );
    return sorted.map((student, index) => ({
      ...student,
      index: index + 1,
    }));
  }, [filteredData]);

  const getRowLink = useCallback((item: TransformedStudentData) => {
    return `/academic/score-management/individual/${item.studentCode}`;
  }, []);

  const onFilterChange = useCallback((updatedFilter: Partial<FilterState>) => {
    setFilters((prev) => ({
      ...prev,
      ...updatedFilter,
    }));
  }, []);

  return (
    <>
      <div className="w-full flex justify-start">
        <HeaderLabel
          Icon={<Users className="h-7 w-7" />}
          title={"จัดการคะแนน ห้องเรียน"}
        />
      </div>
      <div className="bg-white px-6 py-2 rounded-lg shadow-sm border">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {processedData.generalData.class} -{" "}
              {processedData.generalData.groupName}
            </h2>
            <p className="text-gray-600 mt-1">
              {processedData.generalData.facultyName} -{" "}
              {processedData.generalData.programName}
            </p>
            <p className="text-sm text-gray-500">
              ปีการศึกษา {processedData.generalData.year} เทอม{" "}
              {processedData.generalData.term}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={() => console.log("Downloading grades...")}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              <span>ดาวน์โหลดคะแนน</span>
            </Button>

            <BulkPDFStudentTranscriptPDF
              groupID={processedData.generalData.groupId}
            />

            <div className="ml-auto relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="ค้นหารหัสนักเรียน"
                className="pl-9 pr-3 w-full text-sm"
                value={filters.searchInput}
                onChange={(e) =>
                  onFilterChange({ searchInput: e.target.value })
                }
              />
            </div>
          </div>
        </div>
      </div>
      {/* Horizontal scroll wrapper with minimum table width */}
      <ClassroomInfoTable
        columns={columns}
        data={tableData}
        getRowLink={getRowLink}
        pagination={tableData.length}
      />
    </>
  );
}
