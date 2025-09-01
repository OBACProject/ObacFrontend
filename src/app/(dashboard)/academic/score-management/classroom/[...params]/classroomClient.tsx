"use client";

import { DataTable } from "@/components/common/MainTable/table_style_1";
import { Button } from "@/components/ui/button";
import { Download, FileText, Search, Users, Loader2 } from "lucide-react";
import { useState, useMemo, useCallback } from "react";
import HeaderLabel from "@/components/common/labelText/HeaderLabel";
import { GetGroupSummaryGradeResponse } from "@/lib/api/models/grade/grade.response";
import { useDebounce } from "@/hooks/useDebounce";
import { FilterState, FilterBar } from "./component/filterBar";
import {
  preProcessClassroomData,
  TransformedStudentData,
} from "./dataProcessing";
// import { TransformedStudentData } from "./mockData";
import { ClassroomInfoTable } from "@/components/Academic/table/classroomInfoTable";
import { Input } from "@/components/ui/input";
import { BulkPDFStudentTranscriptPDF } from "@/components/PDF/PDFButton";
import { ConvertClassroomGradingToExcel } from "@/lib/Excel/generateExcelFile";
import GroupSummaryGradPDF from "@/lib/PDF/score/GroupSummaryGrade";

interface Props {
  initialData: GetGroupSummaryGradeResponse;
}

export function ClassroomGradeClient({ initialData }: Props) {
  const [filters, setFilters] = useState<FilterState>({
    searchInput: "",
    selectedGradeFilter: "",
    selectedSubjectFilter: "",
  });

  // Add new state for download buttons
  const [isDownloadingPDF, setIsDownloadingPDF] = useState(false);
  const [isDownloadingExcel, setIsDownloadingExcel] = useState(false);

  const debouncedSearchInput = useDebounce(filters.searchInput, 300);
  const processedData = useMemo(
    () => preProcessClassroomData(initialData),
    [initialData]
  );

  // Helper function to transform data for PDF
  const transformGradeDataForPDF = (data: GetGroupSummaryGradeResponse) => {
    const subjectsMap = new Map();
    let subjectIdCounter = 1;

    data.students.forEach((student) => {
      student.subject.forEach((subject) => {
        if (!subjectsMap.has(subject.subjectCode)) {
          subjectsMap.set(subject.subjectCode, {
            subjectID: subjectIdCounter++,
            subjectCode: subject.subjectCode,
            subjectName: subject.subjectName,
          });
        }
      });
    });

    const subjectsArray = Array.from(subjectsMap.values());

    const transformedStudents = data.students
      .filter((student) => student.isActive && student.status !== "คัดชื่อออก" && student.status !== "ลาออก")
      .map((student) => {
        const grads = subjectsArray.map((subject) => {
          const studentSubject = student.subject.find(
            (s) => s.subjectCode === subject.subjectCode
          );
          if (studentSubject) {
            let gradeNumber = 0;
            if (!isNaN(parseFloat(studentSubject.grade))) {
              gradeNumber = parseFloat(studentSubject.grade);
            }

            return {
              grad: gradeNumber,
              remark: studentSubject.remark || "",
            };
          }
          return {
            grad: 0,
            remark: "-",
          };
        });

        return {
          studentId: student.studentId,
          prefix: student.prefix || "",
          studentCode: student.studentCode,
          studentFirstName: student.firstName,
          studentLastName: student.lastName,
          gpa: student.gpa || 0,
          gpax: student.gpax || 0,
          totalCredit: student.totalCredit || 0,
          grads: grads,
        };
      });

    return {
      groupId: data.groupId,
      groupName: data.groupName,
      groupCode: data.groupCode,
      class: data.class,
      facultyName: data.facultyName,
      programName: data.programName,
      term: data.term,
      year: data.year,
      student: transformedStudents,
      subjects: subjectsArray,
    };
  };

  // Helper function to transform data for Excel
  const transformDataForExcel = (data: GetGroupSummaryGradeResponse) => {
    const general = {
      groupId: data.groupId,
      groupName: data.groupName,
      groupCode: data.groupCode,
      class: data.class,
      facultyName: data.facultyName,
      programName: data.programName,
      term: data.term,
      year: data.year,
    };

    const subjectNames: string[] = [];
    data.students.forEach((student) => {
      student.subject.forEach((subj) => {
        if (!subjectNames.includes(subj.subjectName)) {
          subjectNames.push(subj.subjectName);
        }
      });
    });

    const studentListExcel = data.students
      .filter((s) => s.isActive && s.status !== "คัดชื่อออก" && s.status !== "ลาออก")
      .map((student) => {
        const subjectsRecord: Record<string, string> = {};
        subjectNames.forEach((name) => {
          const subj = student.subject.find((s) => s.subjectName === name);
          subjectsRecord[name] = subj ? subj.grade : "-";
        });

        return {
          studentId: student.studentId,
          studentCode: student.studentCode,
          name: `${student.prefix ?? ""}${student.firstName} ${
            student.lastName
          }`,
          gpa: student.gpa ?? 0,
          gpax: student.gpax ?? 0,
          totalCredit: student.totalCredit ?? 0,
          subjects: subjectsRecord,
        };
      }).sort((a, b) => a.studentId - b.studentId);

    return { general, studentListExcel };
  };

  // Add download handlers
  const handleDownloadGradePdf = async () => {
    setIsDownloadingPDF(true);
    try {
      const transformedData = transformGradeDataForPDF(initialData);
      console.log("Transformed data for PDF:", transformedData);

      GroupSummaryGradPDF({ data: transformedData });

      console.log(
        "Downloading PDF for group:",
        processedData.generalData.groupId
      );
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsDownloadingPDF(false);
    }
  };

  const handleDownloadGradeExcel = async () => {
    setIsDownloadingExcel(true);
    try {
      const { general, studentListExcel } = transformDataForExcel(initialData);

      ConvertClassroomGradingToExcel(general, studentListExcel);

      console.log(
        "Downloading Excel for group:",
        processedData.generalData.groupId
      );
    } catch (error) {
      console.error("Error generating Excel:", error);
    } finally {
      setIsDownloadingExcel(false);
    }
  };

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
        render: (row: any) => {
          const gpa = row.gpa;
          return (
            <span
              className={`px-2 py-1 rounded text-xs font-medium ${
                typeof gpa === "number" ? "text-gray-800" : "text-gray-400"
              }`}
            >
              {typeof gpa === "number" ? gpa.toFixed(2) : "-"}
            </span>
          );
        },
      },
      {
        label: "GPAX",
        key: "gpax",
        className: "w-[5%] text-center flex justify-center text-sm",
        render: (row: any) => {
          const gpax = row.gpax;
          return (
            <span
              className={`px-2 py-1 rounded text-xs font-medium ${
                typeof gpax === "number" ? "text-gray-800" : "text-gray-400"
              }`}
            >
              {typeof gpax === "number" ? gpax.toFixed(2) : "-"}
            </span>
          );
        },
      },
    ];

    return [...baseColumns, ...subjectColumns, ...gradeColumns];
  }, [processedData.subjects]);

  const processedData3 = useMemo(() => {
    return processedData.students.filter(
      (item) => item.status !== "คัดชื่อออก" && item.status !== "ลาออก"
    );
  }, [processedData.students]);

  const filteredData = useMemo(() => {
    if (
      !debouncedSearchInput &&
      !filters.selectedGradeFilter &&
      !filters.selectedSubjectFilter
    ) {
      return processedData3;
    }

    return processedData3.filter((student) => {
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
    processedData3,
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
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          {/* Left side - Info */}
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

          {/* Right side - Actions */}
          <div className="flex flex-col items-end gap-2 w-full sm:w-auto">
            {/* Buttons row */}
            <div className="flex flex-row gap-2">
              {/* PDF Download Button */}
              <button
                className="flex h-9 px-4 py-2 border border-gray-300 text-blue-500 bg-white
      hover:bg-blue-50 duration-200 text-xs rounded items-center justify-center gap-2 disabled:opacity-60 min-w-[100px]"
                onClick={handleDownloadGradePdf}
                disabled={isDownloadingPDF}
                type="button"
              >
                {isDownloadingPDF ? (
                  <>
                    <Loader2 className="h-3 w-3 animate-spin" />
                    ใบคะแนน PDF
                  </>
                ) : (
                  <>
                    <FileText className="h-3 w-3" />
                    ใบคะแนน PDF
                  </>
                )}
              </button>

              {/* Excel Download Button */}
              <button
                className="flex h-9 px-4 py-2 border border-gray-300 text-green-500 bg-white
      hover:bg-green-50 duration-200 text-xs rounded items-center justify-center gap-2 disabled:opacity-60 min-w-[100px]"
                onClick={handleDownloadGradeExcel}
                disabled={isDownloadingExcel}
                type="button"
              >
                {isDownloadingExcel ? (
                  <>
                    <Loader2 className="h-3 w-3 animate-spin" />
                    ใบคะแนน Excel
                  </>
                ) : (
                  <>
                    <Download className="h-3 w-3" />
                    ใบคะแนน Excel
                  </>
                )}
              </button>

              {/* Existing BulkPDF Button */}
              <BulkPDFStudentTranscriptPDF
                groupID={processedData.generalData.groupId}
              />
            </div>

            {/* Search input (under buttons, right aligned) */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="ค้นหารหัสนักเรียน"
                className="pl-9 pr-3 w-full text-sm h-9"
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
