"use client";

import { GetStudentListByGroupID } from "@/api/oldApi/student/studentApi";
import { Combobox } from "@/components/common/Combobox/combobox";
import StudentNameListPDF from "@/lib/PDF/name-list/StudentNameListInGroup";
import { ConvertClassroomToExcel } from "@/lib/Excel/generateExcelFile";
import { Download, FileText, Loader2, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { StylesTable } from "@/components/Academic/table/StylesTable";
import { useGetAllProgramsQuery } from "@/lib/api/hooks/queries/program.queries";
import { Input } from "@/components/ui/input";
import { GetAllProgramsWithStudentGroupResponse } from "@/lib/api/models/program/program.response";
import { useDebounce } from "@/hooks/useDebounce";

interface ClassroomTable {
  classLevel: string;
  faculty: string;
  program: string;
  groupId: string;
}


const getStudentDataList = async (groupId: number) => {
  try {
    const response = await GetStudentListByGroupID(groupId);
    return response;
  } catch (err) {
    console.error("Error fetching student data:", err);
    return [];
  }
};

export function ClassroomGrading(props: {
  handleTab: (tab: string) => void;
  handleSelectedData: (data: {
    groupId: number;
    term: string;
    year: string;
    classroom: string;
  }) => void;
}) {
  const router = useRouter();
  
  const classLevels = ["ปวช", "ปวส"];
  const term = ["1", "2"];
  const dateTime = new Date();
  const currentMonth = dateTime.getMonth();
  const currentYear = currentMonth > 5 
    ? dateTime.getFullYear() + 543 
    : dateTime.getFullYear() + 543 - 1;
  const defaultTerm = currentMonth > 5 ? "1" : "2";
  const yearsList = Array.from({ length: 3 }, (_, i) =>
    (currentYear - i).toString()
  );

  // State
  const [selectedTerm, setSelectedTerm] = useState<string>(defaultTerm);
  const [selectedYear, setSelectedYear] = useState<string>(currentYear.toString());
  const [selectedClassLevel, setSelectedClassLevel] = useState<string>("");
  const [selectedFaculty, setSelectedFaculty] = useState<string>("");
  const [selectedProgram, setSelectedProgram] = useState<string>("");
  const [searchInput, setSearchInput] = useState<string>("");
  const [isDownloading, setIsDownloading] = useState<{ [key: string]: boolean }>({});

  const {
    data: studentGroupsData,
    isLoading: isLoadingData,
    error: dataError,
    refetch,
  } = useGetAllProgramsQuery();

  const debouncedSearchInput = useDebounce(searchInput, 300);

  const transformedData: ClassroomTable[] = useMemo(() => {
    if (!studentGroupsData) return [];

    return studentGroupsData.map((item: GetAllProgramsWithStudentGroupResponse) => ({
      classLevel: `${item.class}.${item.groupName}`,
      faculty: item.facultyName,
      program: item.programName,
      groupId: item.groupId.toString(),
    }));
  }, [studentGroupsData]);

  const uniqueFaculties = useMemo(() => {
    return Array.from(
      new Set(transformedData.map((item) => item.faculty))
    ).sort();
  }, [transformedData]);

  const filteredPrograms = useMemo(() => {
    return Array.from(
      new Set(
        transformedData
          .filter((item) =>
            selectedFaculty ? item.faculty === selectedFaculty : true
          )
          .map((item) => item.program)
      )
    ).sort();
  }, [selectedFaculty, transformedData]);

  // Clear all filters
  const clearFilters = useCallback(() => {
    setSelectedClassLevel("");
    setSelectedFaculty("");
    setSelectedProgram("");
    setSearchInput("");
  }, []);

    const filteredData = useMemo(() => {
    if (
      !selectedClassLevel &&
      !selectedFaculty &&
      !selectedProgram &&
      !debouncedSearchInput
    ) {
      return transformedData.sort((a, b) => +a.groupId - +b.groupId);
    }

    const filtered = transformedData.filter((item) => {
      const matchClassLevel = selectedClassLevel
        ? item.classLevel.substring(0, 3) === selectedClassLevel
        : true;

      const matchFaculty = selectedFaculty
        ? item.faculty === selectedFaculty
        : true;

      const matchProgram = selectedProgram
        ? item.program === selectedProgram
        : true;

      // Extract year level from classLevel (e.g., "ปวช. 1" → yearLevel = 1)
      const yearLevel = parseInt(item.classLevel.substring(5, 6), 10);
      const matchYearLevel = currentYear - Number(selectedYear);
      let isYearLevelValid = false;

      if (matchYearLevel === 0) {
        isYearLevelValid = true;
      } else if (matchYearLevel === 1) {
        isYearLevelValid = yearLevel > 1;
      } else if (matchYearLevel === 2) {
        isYearLevelValid = yearLevel === 3;
      }

      const matchSearch = debouncedSearchInput
        ? item.classLevel
            .toLowerCase()
            .includes(debouncedSearchInput.toLowerCase()) ||
          item.faculty
            .toLowerCase()
            .includes(debouncedSearchInput.toLowerCase()) ||
          item.program
            .toLowerCase()
            .includes(debouncedSearchInput.toLowerCase()) ||
          item.groupId.includes(debouncedSearchInput)
        : true;

      return (
        matchClassLevel &&
        matchFaculty &&
        matchProgram &&
        isYearLevelValid &&
        matchSearch
      );
    });

    return filtered.sort((a, b) => +a.groupId - +b.groupId);
  }, [
    transformedData,
    selectedClassLevel,
    selectedFaculty,
    selectedProgram,
    selectedYear,
    currentYear,
    debouncedSearchInput,
  ]);

  useEffect(() => {
    refetch();
  }, [selectedTerm, selectedYear, refetch]);

  // Handle row click
  const handleRowClick = useCallback((item: ClassroomTable) => {
    router.push(
      `/academic/student-name-list/student-group?groupId=${item.groupId}`
    );
  }, [router]);

  const handleDownloadPDF = async (groupId: number) => {
    const downloadKey = `pdf_${groupId}`;
    setIsDownloading(prev => ({ ...prev, [downloadKey]: true }));

    try {
      const item = await getStudentDataList(groupId);

      if (item && !Array.isArray(item)) {
        const studentClass = item.class + "." + item.groupName;
        const filteredStudents = item.students.filter(
          (student) =>
            !["คัดชื่อออก", "พักการเรียน", "ลาออก"].includes(
              student.studentStatus
            )
        );
        StudentNameListPDF({
          studentGroup: studentClass,
          student: filteredStudents,
          year: Number(selectedYear),
        });
      } else {
        alert("No student data available for this group.");
      }
    } catch (error) {
      console.error("Error downloading PDF:", error);
      alert("Failed to download PDF. Please try again.");
    } finally {
      setIsDownloading(prev => ({ ...prev, [downloadKey]: false }));
    }
  };

  // Download Excel handler
  const handleDownloadExcel = async (groupId: number) => {
    const downloadKey = `excel_${groupId}`;
    setIsDownloading(prev => ({ ...prev, [downloadKey]: true }));

    try {
      const item = await getStudentDataList(groupId);

      if (item && !Array.isArray(item)) {
        const studentClass = item.class + "." + item.groupName;
        const filteredStudents = item.students.filter(
          (student) =>
            !["คัดชื่อออก", "พักการเรียน", "ลาออก"].includes(
              student.studentStatus
            )
        );
        ConvertClassroomToExcel(filteredStudents, studentClass);
      } else {
        alert("No student data available for this group.");
      }
    } catch (error) {
      console.error("Error downloading Excel:", error);
      alert("Failed to download Excel. Please try again.");
    } finally {
      setIsDownloading(prev => ({ ...prev, [downloadKey]: false }));
    }
  };

  const columns = [
    {
      label: "No.",
      key: "groupId",
      className: "w-1/12 flex justify-center",
    },
    { label: "ระดับชั้น", key: "classLevel", className: "w-1/12 flex justify-center" },
    { label: "หลักสูตรการศึกษา", key: "faculty", className: "w-4/12 xl:justify-start justify-center" },
    { label: "สาขาวิชา", key: "program", className: "w-3/12 xl:justify-start justify-center" },
    {
      label: "ใบรายชื่อ",
      key: "action",
      className: "w-3/12 justify-center",
      render: (row: ClassroomTable) => {
        const pdfKey = `pdf_${row.groupId}`;
        const excelKey = `excel_${row.groupId}`;
        
        return (
          <div className="flex gap-2">
            <button
              className="px-4 bg-white border hover:bg-blue-600 rounded-lg h-fit py-1 text-blue-400 hover:text-white flex text-sm justify-center items-center gap-2 disabled:opacity-50"
              onClick={(e) => {
                e.stopPropagation();
                handleDownloadPDF(Number(row.groupId));
              }}
              disabled={isDownloading[pdfKey]}
            >
              {isDownloading[pdfKey] ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <FileText className="h-4 w-4" />
              )}
              <p>{isDownloading[pdfKey] ? "กำลังดาวโหลด..." : "รายชื่อ PDF"}</p>
            </button>

            <button
              className="px-4 bg-white text-sm hover:bg-green-500 rounded-lg h-fit py-1 text-green-500 border border-green-300 flex justify-center hover:text-white items-center gap-2 disabled:opacity-50"
              onClick={(e) => {
                e.stopPropagation();
                handleDownloadExcel(Number(row.groupId));
              }}
              disabled={isDownloading[excelKey]}
            >
              {isDownloading[excelKey] ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Download className="h-4 w-4" />
              )}
              <p>{isDownloading[excelKey] ? "กำลังดาวโหลด..." : "รายชื่อ Excel"}</p>
            </button>
          </div>
        );
      },
    },
  ];

  // Error state
  if (dataError) {
    return (
      <div className="px-5 py-2">
        <div className="mt-2 border-2 border-dashed rounded-md border-red-400 grid place-items-center py-20 text-3xl text-red-400 font-semibold items-center">
          <p>Error loading data. Please try again.</p>
          <button
            onClick={() => refetch()}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            ลองอีกครั้ง
          </button>
        </div>
      </div>
    );
  }

  // Loading state
  if (isLoadingData) {
    return (
      <div className="px-5 py-2">
        <div className="mt-2 border-2 border-dashed rounded-md border-gray-400 grid place-items-center py-20 text-3xl text-blue-400 font-semibold items-center">
          <p className="flex gap-2">
            <Loader2 className="h-10 w-10 animate-spin" />
            Loading...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border space-y-6 mt-6">
      {/* Filter Section */}
      <div className="bg-gray-50 p-4 rounded-lg border">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">ตัวกรองข้อมูล</h3>
            {(selectedClassLevel ||
              selectedFaculty ||
              selectedProgram ||
              searchInput) && (
              <button
                onClick={clearFilters}
                className="text-blue-600 hover:text-blue-800 underline text-sm"
              >
                ล้างตัวกรอง
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Class Level Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ระดับการศึกษา
              </label>
              <Combobox
                options={[
                  { value: "", label: "ทั้งหมด" },
                  ...classLevels.map((value) => ({ value, label: value })),
                ]}
                buttonLabel={selectedClassLevel || "เลือกระดับการศึกษา"}
                onSelect={(value) => {
                  setSelectedClassLevel(value);
                  setSelectedFaculty("");
                  setSelectedProgram("");
                }}
              />
            </div>

            {/* Faculty Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                หลักสูตรการศึกษา
              </label>
              <Combobox
                options={[
                  { value: "", label: "ทั้งหมด" },
                  ...uniqueFaculties.map((value) => ({ value, label: value })),
                ]}
                buttonLabel={selectedFaculty || "เลือกหลักสูตรการศึกษา"}
                onSelect={(value) => {
                  setSelectedFaculty(value);
                  setSelectedProgram("");
                }}
              />
            </div>

            {/* Program Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                สาขาวิชา
              </label>
              <Combobox
                options={[
                  { value: "", label: "ทั้งหมด" },
                  ...filteredPrograms.map((value) => ({ value, label: value })),
                ]}
                buttonLabel={selectedProgram || "เลือกสาขาวิชา"}
                onSelect={(value) => setSelectedProgram(value)}
              />
            </div>

            {/* Term Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ภาคเรียน
              </label>
              <Combobox
                options={term.map((item) => ({
                  value: item,
                  label: `ภาคเรียนที่ ${item}`,
                }))}
                buttonLabel={`ภาคเรียนที่ ${selectedTerm}`}
                onSelect={setSelectedTerm}
              />
            </div>

            {/* Year Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ปีการศึกษา
              </label>
              <Combobox
                options={yearsList.map((item) => ({
                  value: item,
                  label: item,
                }))}
                buttonLabel={selectedYear}
                onSelect={setSelectedYear}
              />
            </div>
          </div>

          {/* Search Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ค้นหา
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="ค้นหาระดับชั้น, หลักสูตร, สาขาวิชา..."
                className="pl-10 w-full"
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
              />
            </div>
          </div>

          {/* Active Filters Display */}
          {(selectedClassLevel ||
            selectedFaculty ||
            selectedProgram ||
            debouncedSearchInput) && (
            <div className="flex flex-wrap gap-2 pt-2 border-t">
              <span className="text-sm text-gray-600">ตัวกรองที่ใช้:</span>
              {selectedClassLevel && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  ระดับ: {selectedClassLevel}
                  <button
                    onClick={() => setSelectedClassLevel("")}
                    className="ml-1 text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </span>
              )}
              {selectedFaculty && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  หลักสูตร: {selectedFaculty}
                  <button
                    onClick={() => setSelectedFaculty("")}
                    className="ml-1 text-green-600 hover:text-green-800"
                  >
                    ×
                  </button>
                </span>
              )}
              {selectedProgram && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  สาขา: {selectedProgram}
                  <button
                    onClick={() => setSelectedProgram("")}
                    className="ml-1 text-purple-600 hover:text-purple-800"
                  >
                    ×
                  </button>
                </span>
              )}
              {debouncedSearchInput && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  ค้นหา: "{debouncedSearchInput}"
                  <button
                    onClick={() => setSearchInput("")}
                    className="ml-1 text-yellow-600 hover:text-yellow-800"
                  >
                    ×
                  </button>
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>
          แสดง {filteredData.length} จาก {transformedData.length} รายการ
        </span>
        <span className="text-sm text-gray-700">
          ภาคเรียนที่ {selectedTerm} ปีการศึกษา {selectedYear}
        </span>
      </div>

      <StylesTable
        title="รายชื่อห้องเรียนทั้งหมด"
        columns={columns}
        data={filteredData.map((item, index) => ({
          ...item,
          index: index + 1,
        }))}
        onRowClick={handleRowClick}
        pagination={10}
      />
    </div>
  );
}