"use client";

import { DataTable } from "@/components/common/MainTable/table_style_1";
import { Combobox } from "@/components/common/Combobox/combobox";
import type { FacultyInfo, EducationData } from "@/dto/studentDto";
import { Loader2, Search } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { TableSkeleton } from "./component/skeletons/TableSkeleton";
import { Input } from "@/components/ui/input";

interface ClassroomTable {
  class: string;
  facultyName: string;
  programName: string;
  groupId: string;
  groupCode: string;
}

const classRoomTable: ClassroomTable[] = [
  {
    class: "ปวช 1/1",
    facultyName: "บริการและการจัดการ",
    programName: "การตลาด",
    groupId: "G1001",
    groupCode: "MK13A",
  },
  {
    class: "ปวส 1/2",
    facultyName: "พานิชยกรรม",
    programName: "การบัญชี",
    groupId: "G1002",
    groupCode: "AC12B",
  },
  {
    class: "ปวช 1/3",
    facultyName: "พานิชยกรรม",
    programName: "การตลาด",
    groupId: "G1003",
    groupCode: "MK13B",
  },
  {
    class: "ปวส 1/1",
    facultyName: "บริการและการจัดการ",
    programName: "การบัญชี",
    groupId: "G1004",
    groupCode: "AC12A",
  },
  {
    class: "ปวช 1/4",
    facultyName: "พานิชยกรรม",
    programName: "การบัญชี",
    groupId: "G1005",
    groupCode: "AC13C",
  },
  {
    class: "ปวส 1/2",
    facultyName: "บริการและการจัดการ",
    programName: "การตลาด",
    groupId: "G1006",
    groupCode: "MK12D",
  },
  {
    class: "ปวช 1/5",
    facultyName: "บริการและการจัดการ",
    programName: "การตลาด",
    groupId: "G1007",
    groupCode: "MK13F",
  },
  {
    class: "ปวส 1/3",
    facultyName: "พานิชยกรรม",
    programName: "การตลาด",
    groupId: "G1008",
    groupCode: "MK12B",
  },
  {
    class: "ปวช 1/6",
    facultyName: "พานิชยกรรม",
    programName: "การบัญชี",
    groupId: "G1009",
    groupCode: "AC13A",
  },
  {
    class: "ปวส 1/4",
    facultyName: "บริการและการจัดการ",
    programName: "การบัญชี",
    groupId: "G1010",
    groupCode: "AC12F",
  },
  {
    class: "ปวช 1/7",
    facultyName: "บริการและการจัดการ",
    programName: "การตลาด",
    groupId: "G1011",
    groupCode: "MK13D",
  },
  {
    class: "ปวส 1/5",
    facultyName: "พานิชยกรรม",
    programName: "การบัญชี",
    groupId: "G1012",
    groupCode: "AC12D",
  },
  {
    class: "ปวช 1/8",
    facultyName: "พานิชยกรรม",
    programName: "การตลาด",
    groupId: "G1013",
    groupCode: "MK13E",
  },
  {
    class: "ปวส 1/6",
    facultyName: "บริการและการจัดการ",
    programName: "การบัญชี",
    groupId: "G1014",
    groupCode: "AC12G",
  },
  {
    class: "ปวช 1/9",
    facultyName: "บริการและการจัดการ",
    programName: "การตลาด",
    groupId: "G1015",
    groupCode: "MK13G",
  },
  {
    class: "ปวส 1/7",
    facultyName: "พานิชยกรรม",
    programName: "การบัญชี",
    groupId: "G1016",
    groupCode: "AC12C",
  },
  {
    class: "ปวช 1/10",
    facultyName: "พานิชยกรรม",
    programName: "การตลาด",
    groupId: "G1017",
    groupCode: "MK13C",
  },
  {
    class: "ปวส 1/8",
    facultyName: "บริการและการจัดการ",
    programName: "การบัญชี",
    groupId: "G1018",
    groupCode: "AC12E",
  },
  {
    class: "ปวช 1/11",
    facultyName: "บริการและการจัดการ",
    programName: "การบัญชี",
    groupId: "G1019",
    groupCode: "AC13B",
  },
  {
    class: "ปวส 1/9",
    facultyName: "พานิชยกรรม",
    programName: "การตลาด",
    groupId: "G1020",
    groupCode: "MK12A",
  },
];

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
  const classLevels = ["ปวช", "ปวส"];
  const term = ["1", "2"];

  // Calculate current academic year and term
  const dateTime = new Date();
  const currentMonth = dateTime.getMonth();
  const currentYear =
    currentMonth > 5
      ? dateTime.getFullYear() + 543
      : dateTime.getFullYear() + 543 - 1;
  const defaultTerm = currentMonth > 5 ? "1" : "2";

  const yearsList = Array.from({ length: 3 }, (_, i) =>
    (currentYear - i).toString()
  );

  // State management
  const [dataTable, setDataTable] = useState<ClassroomTable[]>(classRoomTable);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [triggerDownLoadPDF, setTriggerDownLoadPDF] = useState<boolean>(false);

  // Filter states
  const [selectedTerm, setSelectedTerm] = useState<string>(defaultTerm);
  const [selectedYear, setSelectedYear] = useState<string>(
    currentYear.toString()
  );
  const [selectedClassLevel, setSelectedClassLevel] = useState<string>("");
  const [selectedFaculty, setSelectedFaculty] = useState<string>("");
  const [selectedProgram, setSelectedProgram] = useState<string>("");

  // Faculty and program data

  const [searchInput, setSearchInput] = useState<string>("");
  const debouncedSearchInput = useDebounce(searchInput, 300);

  const uniqueFaculties = useMemo(() => {
    return Array.from(
      new Set(classRoomTable.map((item) => item.facultyName))
    ).sort();
  }, []);

  const filteredPrograms = useMemo(() => {
    return Array.from(
      new Set(
        classRoomTable
          .filter((item) =>
            selectedFaculty ? item.facultyName === selectedFaculty : true
          )
          .map((item) => item.programName)
      )
    ).sort();
  }, [selectedFaculty]);

  // Get faculties from selected course
  const getFaculties = useCallback(
    (courseData: EducationData[]): FacultyInfo[] => {
      return courseData.flatMap((faculty) =>
        faculty.groupsCourse.map((group) => ({
          facultyName: group.facultyName,
          groupProgram: group.groupProgram,
        }))
      );
    },
    []
  );

  // Clear all filters
  const clearFilters = useCallback(() => {
    setSelectedClassLevel("");
    setSelectedFaculty("");
    setSelectedProgram("");
    setSearchInput("");
  }, []);

  // Optimized filtering logic
  const filteredData = useMemo(() => {
    if (
      !selectedClassLevel &&
      !selectedFaculty &&
      !selectedProgram &&
      !debouncedSearchInput
    ) {
      return dataTable.sort(
        (a, b) => +a.groupId.slice(1) - +b.groupId.slice(1)
      );
    }

    const filtered = dataTable.filter((item) => {
      const matchClassLevel = selectedClassLevel
        ? item.class.substring(0, 3) === selectedClassLevel
        : true;

      const matchFaculty = selectedFaculty
        ? item.facultyName === selectedFaculty
        : true;

      const matchProgram = selectedProgram
        ? item.programName === selectedProgram
        : true;

      const yearLevel = Number.parseInt(item.class.substring(5, 6), 10);
      const matchYearLevel = currentYear - Number(selectedYear);
      let isYearLevelValid = false;

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

      if (matchYearLevel === 0) {
        isYearLevelValid = true;
      } else if (matchYearLevel === 1) {
        isYearLevelValid = yearLevel > 1;
      } else if (matchYearLevel === 2) {
        isYearLevelValid = yearLevel === 3;
      }

      return (
        matchClassLevel &&
        matchFaculty &&
        matchProgram &&
        isYearLevelValid &&
        matchSearch
      );
    });

    return filtered.sort((a, b) => +a.groupId.slice(1) - +b.groupId.slice(1));
  }, [
    dataTable,
    selectedClassLevel,
    selectedFaculty,
    selectedProgram,
    selectedYear,
    currentYear,
    debouncedSearchInput,
  ]);

  const tableData = useMemo(() => {
    return filteredData.map((item, index) => ({
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

  // Uncomment when ready to use real data
  // useEffect(() => {
  //   const fetchFilterData = async () => {
  //     setIsLoading(true);
  //     try {
  //       const rawData = await getRawProgramViewData(selectedTerm, selectedYear);
  //       const formattedData: ClassroomTable[] = rawData.map(
  //         (item: filterProgramsParamsData) => ({
  //           class: `${item.class}. ${item.groupName}`,
  //           facultyName: item.facultyName,
  //           groupId: item.groupId,
  //           programName: item.programName,
  //           groupCode: item.groupCode,
  //         })
  //       );
  //       setDataTable(formattedData);

  //       const data = await filterProgramsViewData(selectedTerm, selectedYear);
  //       const vocational = data.filter(
  //         (item: EducationData) => item.classLevel === "ปวช"
  //       );
  //       const diploma = data.filter(
  //         (item: EducationData) => item.classLevel === "ปวส"
  //       );

  //       setVocationalFaculties(getFaculties(vocational));
  //       setDiplomaFaculties(getFaculties(diploma));
  //     } catch (error) {
  //       console.error("Error fetching filter data:", error);
  //       toast.error("ไม่สามารถโหลดข้อมูลได้");
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   fetchFilterData();
  // }, [selectedTerm, selectedYear, getFaculties]);

  const columns = [
    { label: "ลำดับ", key: "index", className: "w-1/12 justify-center" },
    { label: "ระดับชั้น", key: "class", className: "w-2/12" },
    { label: "รหัสห้อง", key: "groupCode", className: "w-2/12" },
    {
      label: "หลักสูตรการศึกษา",
      key: "facultyName",
      className: "w-4/12 xl:justify-start justify-center",
    },
    {
      label: "ใบออกเกรด",
      key: "action",
      className: "w-3/12 justify-center",
      render: (row: ClassroomTable) => (
        <div className="flex gap-1">
          <button
            className="px-3 bg-white border hover:bg-blue-600 rounded-full h-fit py-0.5 text-blue-400 hover:text-white flex text-sm justify-center items-center gap-2"
            onClick={(e) => {
              // handleDownloadPDF(Number(row.groupId), row.class);
              e.stopPropagation();
            }}
          >
            {!triggerDownLoadPDF ? (
              <p>ใบออกเกรด PDF</p>
            ) : (
              <p className="flex gap-1 items-center">
                <Loader2 className="h-5 w-5 animate-spin" />
                กำลังดาวโหลด
              </p>
            )}
          </button>
          <button
            className="px-3 bg-white text-sm hover:bg-green-600 rounded-full h-fit py-0.5 text-green-500 border flex justify-center hover:text-white items-center gap-2"
            onClick={(e) => {
              // handleDownloadExcel(Number(row.groupId));
              e.stopPropagation();
            }}
          >
            <p>ใบออกเกรดExcel</p>
          </button>
        </div>
      ),
    },
  ];

  if (isLoading) {
    return <TableSkeleton rows={8} columns={5} />;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border space-y-6">
      {/* Filter Section - Above Table */}
      <div className="bg-gray-50 p-4 rounded-lg border">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">ตัวกรองข้อมูล</h3>
            {(selectedClassLevel ||
              selectedFaculty ||
              // selectedProgram ||
              searchInput) && (
              <button
                onClick={clearFilters}
                className="text-blue-600 hover:text-blue-800 underline text-sm"
              >
                ล้างตัวกรอง
              </button>
            )}
          </div>
          <div></div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
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
                placeholder="ค้นหาชั้นการเรียน..."
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
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>
          แสดง {tableData.length} จาก {dataTable.length} รายการ
        </span>
        <span className="text-xs text-gray-500">
          ภาคเรียนที่ {selectedTerm} ปีการศึกษา {selectedYear}
        </span>
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={tableData}
        onRowClick={onRowClick}
        pagination={10}
      />
    </div>
  );
}
