"use client";

import { Combobox } from "@/components/common/Combobox/combobox";
import SelectTermAndYear from "@/components/Academic/SelectTermYear";
import { Loader2, Search, Table } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { TableSkeleton } from "@/components/common/TableSkeleton/tableSkeleton";
import { StylesTable } from "@/components/Academic/table/StylesTable";
import { useGetAllStudentGroupByTermYearQuery } from "@/lib/api/hooks/queries/studentGroup.queries";
import { GetAllStudentGroupByTermYearResponse } from "@/lib/api/models/studentGroup/studentGroup.response";
import { GetGroupSummaryGradeRequest } from "@/lib/api/models/grade/grade.request";
import { useGetGroupSummaryGradeQuery } from "@/lib/api/hooks/queries/grade.queries";
import { GetGroupSummaryGradeResponse } from "@/lib/api/models/grade/grade.response";
import {
  GroupSummaryGradeResponse,
  SubjectNameList,
  StudentList,
  Grad,
} from "@/dto/gradingDto";
import GroupSummaryGradPDF from "@/lib/PDF/score/GroupSummaryGrade";
import {
  ConvertClassroomGradingToExcel,
  GeneralData,
  StudentListExcel,
} from "@/lib/Excel/generateExcelFile";
import { getCurrentThaiTermYear } from "@/lib/utils";

interface ClassroomTable {
  class: string;
  facultyName: string;
  programName: string;
  groupId: number;
  groupCode: string;
}

export interface GetAllProgramsWithStudentGroupResponse {
  programId: number;
  facultyName: string;
  programName: string;
  subProgramName: string;
  class: string;
  groupId: number;
  groupName: string;
  groupCode: string;
  level: number;
}

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export function ClassroomGrading() {
  const router = useRouter();

  const {defaultTerm , currentYear} = getCurrentThaiTermYear()

  const [triggerDownLoadPDF, setTriggerDownLoadPDF] = useState<boolean>(false);
  const [selectedYear, setSelectedYear] = useState<string>(
    currentYear.toString()
  );
  const [selectedTerm, setSelectedTerm] = useState<string>(defaultTerm);
  const [searchInput, setSearchInput] = useState<string>("");

  const [downloadingGroupId, setDownloadingGroupId] = useState<number | null>(
    null
  );
  const [downloadingExcelGroupId, setDownloadingExcelGroupId] = useState<
    number | null
  >(null);
  const {
    data: apiData,
    isLoading,
    isError,
    refetch,
  } = useGetAllStudentGroupByTermYearQuery({
    term: selectedTerm,
    year: Number(selectedYear),
  });

  const gradeSummaryParams: GetGroupSummaryGradeRequest | null =
    downloadingGroupId !== null
      ? {
          groupId: downloadingGroupId,
          term: selectedTerm,
          year: Number(selectedYear),
        }
      : downloadingExcelGroupId !== null
      ? {
          groupId: downloadingExcelGroupId,
          term: selectedTerm,
          year: Number(selectedYear),
        }
      : null;

  const { data: gradeSummaryData, isLoading: isLoadingGradeSummary } =
    useGetGroupSummaryGradeQuery(
      gradeSummaryParams || { groupId: 0, term: "", year: 0 },
      {
        enabled: !!gradeSummaryParams,
        staleTime: 0,
        cacheTime: 0,
      } as any
    );

  const transformGradeData = (
    data: GetGroupSummaryGradeResponse
  ): GroupSummaryGradeResponse => {
    const subjectsMap = new Map<string, SubjectNameList>();
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

    const transformedStudents: StudentList[] = data.students
      .filter(
        (student) =>
          student.isActive &&
          student.status !== "คัดชื่อออก" &&
          student.status !== "ลาออก"
      )
      .map((student) => {
        const grads: Grad[] = subjectsArray.map((subject) => {
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
      })
      .sort((a, b) => a.studentId - b.studentId);

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

  const transformedDataExcel = (
    data: GetGroupSummaryGradeResponse
  ): { general: GeneralData; studentListExcel: StudentListExcel[] } => {
    const general: GeneralData = {
      groupId: data.groupId,
      groupName: data.groupName,
      groupCode: data.groupCode,
      class: data.class,
      facultyName: data.facultyName,
      programName: data.programName,
      term: data.term,
      year: data.year,
    };

    // collect all subject names and also map credits
    const subjectInfoMap = new Map<string, number>();
    data.students.forEach((student) => {
      student.subject.forEach((subj) => {
        subjectInfoMap.set(subj.subjectName, subj.credit ?? 0);
      });
    });

    const studentListExcel: StudentListExcel[] = data.students
      .filter(
        (s) => s.isActive && s.status !== "คัดชื่อออก" && s.status !== "ลาออก"
      )
      .map((student) => {
        // create array of [subjectName, grade/remark]
        const subjectsArray = Array.from(subjectInfoMap.entries()).map(
          ([subjectName, credit]) => {
            const subj = student.subject.find(
              (s) => s.subjectName === subjectName
            );
            const value = subj ? (subj.remark ? subj.remark : subj.grade) : "-";
            return { subjectName, value, credit };
          }
        );

        // sort: subjects with credit=0 go last, keep original order otherwise
        subjectsArray.sort((a, b) => {
          if (a.credit === 0 && b.credit !== 0) return 1;
          if (a.credit !== 0 && b.credit === 0) return -1;
          return 0;
        });

        // back to ordered record (if you still want Record)
        const subjectsRecord: Record<string, string> = {};
        subjectsArray.forEach(({ subjectName, value }) => {
          subjectsRecord[subjectName] = value;
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
      })
      .sort((a, b) => a.studentId - b.studentId);

    return { general, studentListExcel };
  };

  useEffect(() => {
    if (downloadingGroupId && gradeSummaryData && !isLoadingGradeSummary) {
      try {
        const transformedData = transformGradeData(gradeSummaryData);

        GroupSummaryGradPDF({ data: transformedData });
      } catch (error) {
        console.error("Error generating PDF:", error);
        console.error("Error details:", error);
      } finally {
        setDownloadingGroupId(null);
        setTriggerDownLoadPDF(false);
      }
    } else if (
      downloadingExcelGroupId &&
      gradeSummaryData &&
      !isLoadingGradeSummary
    ) {
      try {
        const { general, studentListExcel } =
          transformedDataExcel(gradeSummaryData);

        console.log(studentListExcel);
        ConvertClassroomGradingToExcel(general, studentListExcel);
      } catch (error) {
        console.error("Error generating Excel:", error);
      } finally {
        setDownloadingExcelGroupId(null);
      }
    }
  }, [
    downloadingGroupId,
    downloadingExcelGroupId,
    gradeSummaryData,
    isLoadingGradeSummary,
  ]);

  useEffect(() => {
    refetch();
  }, [selectedTerm, selectedYear, refetch]);

  const debouncedSearchInput = useDebounce(searchInput, 300);

  const transformedData: ClassroomTable[] = useMemo(() => {
    if (!apiData) return [];

    return apiData.map((item: GetAllStudentGroupByTermYearResponse) => ({
      class: `${item.class} ${item.groupName}`,
      facultyName: item.facultyName ?? "ไม่ระบุ",
      programName: item.programName ?? "ไม่ระบุ",
      groupId: item.id,
      groupCode: item.groupCode,
    }));
  }, [apiData]);

  const handleDownloadPDF = (groupId: number) => {
    setTriggerDownLoadPDF(true);
    setDownloadingGroupId(groupId);
  };

  const handleDownloadExcel = (groupId: number) => {
    setDownloadingExcelGroupId(groupId);
  };

  const filteredData = useMemo(() => {
    if (!debouncedSearchInput) {
      return transformedData.sort((a, b) => +a.groupId - +b.groupId);
    }

    const filtered = transformedData.filter((item) => {
      const matchSearch = debouncedSearchInput
        ? item.groupCode
            .toLowerCase()
            .includes(debouncedSearchInput.toLowerCase()) ||
          item.class
            .toLowerCase()
            .includes(debouncedSearchInput.toLowerCase()) ||
          item.facultyName
            .toLowerCase()
            .includes(debouncedSearchInput.toLowerCase()) ||
          item.programName
            .toLowerCase()
            .includes(debouncedSearchInput.toLowerCase())
        : true;
      return matchSearch;
    });

    return filtered.sort((a, b) => +a.groupId - +b.groupId);
  }, [transformedData, selectedYear, currentYear, debouncedSearchInput]);

  const tableData = useMemo(() => {
    const sorted = [...filteredData].sort((a, b) => {
      const parseClass = (cls: string) => {
        // Example: "ปวช 1/10" or "ปวส 2/5"
        const levelOrder = cls.startsWith("ปวช") ? 1 : 2;
        const match = cls.match(/(\d+)\/(\d+)/);
        if (!match) return [levelOrder, 0, 0];
        const year = parseInt(match[1], 10);
        const section = parseInt(match[2], 10);
        return [levelOrder, year, section];
      };

      const [levelA, yearA, sectionA] = parseClass(a.class);
      const [levelB, yearB, sectionB] = parseClass(b.class);

      if (levelA !== levelB) return levelA - levelB;
      if (yearA !== yearB) return yearA - yearB;
      return sectionA - sectionB;
    });

    return sorted.map((item, index) => ({
      ...item,
      index: index + 1,
    }));
  }, [filteredData]);

  const onRowClick = useCallback(
    (item: ClassroomTable) => {
      router.push(
        `/academic/score-management/classroom/${item.groupId}/${selectedTerm}/${selectedYear}`
      );
    },
    [router, selectedTerm, selectedYear]
  );

  const columns = [
    { label: "ลำดับ", key: "index", className: "w-1/12 justify-center" },
    { label: "ระดับชั้น", key: "class", className: "w-1/12 justify-center" },
    {
      label: "รหัสห้อง",
      key: "groupCode",
      className: "w-1/12 pl-6 justify-center",
    },
    {
      label: "หลักสูตรการศึกษา",
      key: "facultyName",
      className: "w-4/12 pl-14 xl:justify-start justify-center",
    },
    {
      label: "สาขาวิชา",
      key: "programName",
      className: "w-4/12 xl:justify-start justify-center",
    },
    {
      label: "ใบออกเกรด",
      key: "action",
      className: "w-3/12 justify-center",
      render: (row: ClassroomTable) => (
        <div className="flex gap-1">
          <button
            className="px-4 bg-white border hover:bg-blue-600 rounded-full h-fit py-0.5 text-blue-400 hover:text-white flex text-sm justify-center items-center gap-2"
            onClick={(e) => {
              handleDownloadPDF(Number(row.groupId));
              e.stopPropagation();
            }}
            disabled={downloadingGroupId === row.groupId}
          >
            {downloadingGroupId === row.groupId ? (
              <p className="flex gap-1 items-center">
                <Loader2 className="h-5 w-5 animate-spin" />
              </p>
            ) : (
              <p>PDF</p>
            )}
          </button>
          <button
            className="px-4 bg-white text-sm hover:bg-green-600 rounded-full h-fit py-0.5 text-green-500 border flex justify-center hover:text-white items-center gap-2"
            onClick={(e) => {
              handleDownloadExcel(Number(row.groupId));
              e.stopPropagation();
            }}
            disabled={downloadingExcelGroupId === row.groupId}
          >
            {downloadingExcelGroupId === row.groupId ? (
              <p className="flex gap-1 items-center">
                <Loader2 className="h-5 w-5 animate-spin" />
              </p>
            ) : (
              <p>Excel</p>
            )}
          </button>
        </div>
      ),
    },
  ];

  if (isLoading) {
    return <TableSkeleton rows={8} columns={5} />;
  }

  if (isError) {
    return (
      <div className="text-center text-red-600">
        เกิดข้อผิดพลาดในการโหลดข้อมูล
        <button
          onClick={() => refetch()}
          className="underline ml-2 text-blue-500"
        >
          ลองอีกครั้ง
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border space-y-6">
      {/* Filter Section */}
      <div className="flex flex-wrap gap-4">
        {/* Search Input */}
        <div className="flex-1 min-w-[250px] w-60">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="ค้นหาชั้นการเรียน..."
              className="pl-10 bg-white"
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
            />
          </div>
        </div>

        <div className="min-w-[150px]">
          <SelectTermAndYear
            term={selectedTerm}
            year={Number(selectedYear)}
            currentYear={currentYear}
            onChangeTerm={setSelectedTerm}
            onChangeYear={(y) => setSelectedYear(String(y))}
          />
        </div>

        {/* Active Filters */}
        {debouncedSearchInput && (
          <div className="flex flex-wrap gap-2 pt-2 border-t">
            <span className="text-sm text-gray-600">ตัวกรองที่ใช้:</span>
            {debouncedSearchInput && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                ค้นหา: "{debouncedSearchInput}"
                <button
                  onClick={() => setSearchInput("")}
                  className="ml-1 text-purple-600 hover:text-purple-800"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        )}
      </div>

      {/* Data Table */}
      <StylesTable
        title="ห้องเรียนทั้งหมด"
        icon={<Table className=" h-5 text-white w-5" />}
        columns={columns}
        data={tableData}
        onRowClick={onRowClick}
        pagination={tableData.length}
      />
    </div>
  );
}
