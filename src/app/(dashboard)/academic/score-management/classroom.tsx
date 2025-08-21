"use client";

import { Combobox } from "@/components/common/Combobox/combobox";
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

  const term = ["1", "2"];
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

  const [triggerDownLoadPDF, setTriggerDownLoadPDF] = useState<boolean>(false);
  const [selectedTerm, setSelectedTerm] = useState<string>(defaultTerm);
  const [selectedYear, setSelectedYear] = useState<string>(
    currentYear.toString()
  );

  const [searchInput, setSearchInput] = useState<string>("");

  const {
    data: apiData,
    isLoading,
    isError,
    refetch,
  } = useGetAllStudentGroupByTermYearQuery({
    term: selectedTerm,
    year: Number(selectedYear),
  });

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
  // const handleDownloadPDF = (groupId: number) => {
  //   const paramsSummary: GetGroupSummaryGradeRequest = { groupId , selectedTerm ,selectedYear};

  //   const {data } = useGetGroupSummaryGradeQuery(paramsSummary)
  //   // get data from groupId

  //   // set to use a PDF export Library
  // };

  const clearFilters = useCallback(() => {
    setSearchInput("");
  }, []);

  const filteredData = useMemo(() => {
    if (
      !debouncedSearchInput
    ) {
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
      return (
        matchSearch
      );
    });

    return filtered.sort((a, b) => +a.groupId - +b.groupId);
  }, [
    transformedData,
    selectedYear,
    currentYear,
    debouncedSearchInput,
  ]);

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

  // const handleDownloadExcel = async () => {};

  const columns = [
    { label: "ลำดับ", key: "index", className: "w-1/12 justify-center" },
    { label: "ระดับชั้น", key: "class", className: "w-1/12 justify-center" },
    { label: "รหัสห้อง", key: "groupCode", className: "w-1/12 pl-6 justify-center" },
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
            className="px-3 bg-white border hover:bg-blue-600 rounded-full h-fit py-0.5 text-blue-400 hover:text-white flex text-sm justify-center items-center gap-2"
            onClick={(e) => {
              // handleDownloadPDF(Number(row.groupId));
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
              // handleDownloadExcel(Number(row.groupId), row.class);
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
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ค้นหา
            </label>
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

          {/* Term Filter */}
          <div className="min-w-[150px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">
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
          <div className="min-w-[150px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">
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
