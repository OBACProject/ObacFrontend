"use client";

import React, { useState, useMemo, useDeferredValue, useEffect, useCallback } from "react";
import GradeSubjectSearchBar from "./GradeSubjectSearchBar";
import HeaderLabel from "@/components/common/labelText/HeaderLabel";
import { Calendar, ScrollText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { Combobox } from "@/components/common/Combobox/combobox";
import { StylesTable } from "@/components/Academic/table/StylesTable";
import { useGetSubjectsByStudentGroupIdTermYearQuery } from "@/lib/api/hooks/queries/subject.queries";
import { TableSkeleton } from "@/components/common/TableSkeleton/tableSkeleton";

export const columns = [
  { label: "ลำดับ", key: "index", className: "w-1/12 flex justify-center px-10" },
  { label: "รหัสวิชา", key: "SubjectName", className: "w-6/12 flex justify-center px-10" },
  { label: "อาจารย์", key: "TeacherName", className: "w-3/12 flex px-10" },
  { label: "สถานะ", key: "IsComplete", className: "w-2/12 flex px-10" },
];

interface Props {
  classroomId: number;
  term: string;
  year: number;
}

export default function FilterableTable({ classroomId, term, year }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLevel, setFilterLevel] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  const deferredSearch = useDeferredValue(searchTerm);

  const { data: apiResponse, isLoading, isError } = useGetSubjectsByStudentGroupIdTermYearQuery({
    studentGroupId: classroomId,
    term,
    year,
  }) as { data: any[] | undefined, isLoading: boolean, isError: boolean };

  console.log("FilterableTable apiResponse:", apiResponse);

  const sourceData = useMemo(() => {
    if (!apiResponse || !Array.isArray(apiResponse) || apiResponse.length === 0) {
      return [];
    }
    return apiResponse.map((d: any, index: number) => ({
      scheduleSubjectId: d.scheduleSubjectId,
      SubjectName: `${d.subjectCode} - ${d.subjectName}`,
      TeacherName: d.teacherName || "ไม่ระบุ",
      IsComplete: d.isComplete ? "ตรวจสอบเสร็จสิ้น" : "ยังไม่ตรวจสอบ",
    }));
  }, [apiResponse]);

  const filteredData = useMemo(() => {
    if (!sourceData?.length) return [];
    
    let result = sourceData;

    if (deferredSearch.trim()) {
      const searchLower = deferredSearch.toLowerCase();
      result = result.filter((item: any) =>
        item.SubjectName?.toLowerCase().includes(searchLower) ||
        item.TeacherName?.toLowerCase().includes(searchLower) ||
        item.IsComplete?.toLowerCase().includes(searchLower)
      );
    }

    if (filterLevel) {
      result = result.filter((item: any) => item.TeacherName === filterLevel);
    }
    
    if (filterStatus) {
      result = result.filter((item: any) => item.IsComplete === filterStatus);
    }

    return result;
  }, [sourceData, deferredSearch, filterLevel, filterStatus]);

  const allLevels = useMemo(() => {
    if (!sourceData?.length) return [];
    const levels = new Set<string>();
    sourceData.forEach((d: any) => {
      if (d.TeacherName) levels.add(d.TeacherName);
    });
    return Array.from(levels).sort();
  }, [sourceData]);

  const allStatuses = useMemo(() => {
    if (!sourceData?.length) return [];
    const statuses = new Set<string>();
    sourceData.forEach((d: any) => {
      if (d.IsComplete) statuses.add(d.IsComplete);
    });
    return Array.from(statuses).sort();
  }, [sourceData]);

  const tableData = useMemo(() => 
    filteredData.map((item: any, index: number) => ({
      ...item,
      index: index + 1,
    })),
    [filteredData]
  );

  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
  }, []);

  const handleFilterLevelSelect = useCallback((value: string) => {
    setFilterLevel(value);
  }, []);

  const handleFilterStatusSelect = useCallback((value: string) => {
    setFilterStatus(value);
  }, []);

  const toggleAdvanced = useCallback(() => {
    setShowAdvanced(prev => !prev);
  }, []);

  const getRowLink = useCallback((row: any) => 
    `/academic/grading/student-classroom/subject/${row.scheduleSubjectId}`,
    []
  );

  useEffect(() => {
    if (!showAdvanced) {
      setFilterLevel("");
      setFilterStatus("");
    }
  }, [showAdvanced]);

  if (isLoading) {
    return <TableSkeleton rows={4} />;
  }

  return (
    <>
      <div className="flex px-10 w-full justify-between items-center">
        <HeaderLabel
          Icon={<ScrollText className="h-7 w-7 text-white" />}
          title={`ตารางวิชาในห้องเรียน ${classroomId}/2`}
          className="text-blue"
        />
        <GradeSubjectSearchBar onChange={handleSearchChange} />
      </div>

      <div className="flex justify-end mb-3 px-12 mt-4 items-center gap-2 relative">
        <AnimatePresence mode="wait">
          {showAdvanced && (
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.2 }}
              className="flex flex-row gap-2 items-center"
            >
              <Combobox
                options={allLevels.map((v: string) => ({ value: v, label: v }))}
                buttonLabel="อาจารย์"
                onSelect={handleFilterLevelSelect}
                defaultValue={filterLevel}
              />
              <Combobox
                options={allStatuses.map((v: string) => ({ value: v, label: v }))}
                buttonLabel="สถานะ"
                onSelect={handleFilterStatusSelect}
                defaultValue={filterStatus}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <Button
          variant="outline"
          onClick={toggleAdvanced}
          className="whitespace-nowrap text-sm px-3 py-1.5"
        >
          {showAdvanced ? "ซ่อนตัวกรองเพิ่มเติม" : "ตัวกรองเพิ่มเติม"}
        </Button>
      </div>

      <div className="mt-2">
        {sourceData.length === 0 && (
          <div className="flex justify-center items-center h-96 text-gray-500 text-lg">
            {isError ? "เกิดข้อผิดพลาดในการโหลดข้อมูล" : "ไม่มีข้อมูลให้แสดงผล"}
          </div>
        )}
        
        {sourceData.length > 0 && (
          <StylesTable
            icon={<Calendar className="w-5 h-5 text-white" />}
            title={`รายชื่อวิชาทั้งหมด ปวส.${classroomId}/2`}
            columns={columns}
            data={tableData}
            getRowLink={getRowLink}
            pagination={10}
          />
        )}
      </div>
    </>
  );
}
