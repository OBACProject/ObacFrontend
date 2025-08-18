"use client";

import React, {
  useState,
  useMemo,
  useDeferredValue,
  useEffect,
  useCallback,
} from "react";
import GradeSubjectSearchBar from "./GradeSubjectSearchBar";
import HeaderLabel from "@/components/common/labelText/HeaderLabel";
import { Calendar, ScrollText, CheckCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AnimatePresence, motion } from "framer-motion";
import { Combobox } from "@/components/common/Combobox/combobox";
import { StylesTable } from "@/components/Academic/table/StylesTable";
import { useGetSubjectsByStudentGroupIdTermYearQuery } from "@/lib/api/hooks/queries/subject.queries";
import { TableSkeleton } from "@/components/common/TableSkeleton/tableSkeleton";
// const sorted: {
//     scheduleSubjectId: any;
//     SubjectCode: any;
//     TeacherName: any;
//     IsComplete: React.JSX.Element;
//     IsCompleteText: string;
// }[]
export const columns = [
  {
    label: "ลำดับ",
    key: "index",
    className: "w-1/12 text-center flex justify-center",
  },
  {
    label: "รหัสวิชา - ชื่อวิชา",
    key: "SubjectCode",
    className: "w-6/12",
    render: (row : any) => {

      return <span className="flex justify-start pl-16">{row.SubjectCode} </span>
    }
  },
  {
    label: "อาจารย์ผู้สอน",
    key: "TeacherName",
    className: "w-3/12 flex justify-center",
  },
  {
    label: "สถานะการตรวจสอบ",
    key: "IsComplete",
    className: "w-2/12 text-center flex justify-center",
  },
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

  const {
    data: apiResponse,
    isLoading,
    isError,
  } = useGetSubjectsByStudentGroupIdTermYearQuery({
    studentGroupId: classroomId,
    term,
    year,
  });

  const sourceData = useMemo(() => {
    if (
      !apiResponse ||
      !apiResponse.subjects ||
      !Array.isArray(apiResponse.subjects) ||
      apiResponse.subjects.length === 0
    ) {
      return [];
    }
    console.log("Source Data subjects:", apiResponse.subjects);
    console.log("First subject:", apiResponse.subjects[0]);
    
    return apiResponse.subjects.map((d: any,) => {
      console.log("Processing subject:", d);
      
      const isComplete = d.isComplete; 
      const statusBadge = isComplete ? (
        <Badge
          variant="default"
          className="bg-green-100 text-green-800 border-green-200"
        >
          <CheckCircle className="w-3 h-3 mr-1" />
          ตรวจสอบเสร็จสิ้น
        </Badge>
      ) : (
        <Badge
          variant="secondary"
          className="bg-yellow-100 text-yellow-800 border-yellow-200"
        >
          <Clock className="w-3 h-3 mr-1" />
          ยังไม่ตรวจสอบ
        </Badge>
      );

      return {
        scheduleSubjectId: d.scheduleSubjectId,
        SubjectCode: d.subjectCode && d.subjectName ? `${d.subjectCode} - ${d.subjectName}` : d.subjectCode || d.subjectName || "ไม่ระบุรหัสวิชา", 
        TeacherName: d.teacherName || "ไม่ระบุอาจารย์", 
        IsComplete: statusBadge,
        IsCompleteText: isComplete ? "ตรวจสอบเสร็จสิ้น" : "ยังไม่ตรวจสอบ",
      };
    });
  }, [apiResponse]);

  const classroomInfo = useMemo(() => {

    return {
      class: apiResponse?.class,
      groupName: apiResponse?.groupName
    };
  }, [apiResponse, classroomId]);

  const filteredData = useMemo(() => {
    if (!sourceData?.length) return [];

    let result = sourceData;

    if (deferredSearch.trim()) {
      const searchLower = deferredSearch.toLowerCase();
      result = result.filter(
        (item: any) =>
          item.SubjectCode?.toLowerCase().includes(searchLower) ||
          item.TeacherName?.toLowerCase().includes(searchLower) ||
          item.IsCompleteText?.toLowerCase().includes(searchLower)
      );
    }

    if (filterLevel) {
      result = result.filter((item: any) => item.TeacherName === filterLevel);
    }

    if (filterStatus) {
      result = result.filter(
        (item: any) => item.IsCompleteText === filterStatus
      );
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
      if (d.IsCompleteText) statuses.add(d.IsCompleteText);
    });
    return Array.from(statuses).sort();
  }, [sourceData]);

  const tableData = useMemo(
    () => {
      const sorted = [...filteredData].sort((a, b) => String(a.scheduleSubjectId).localeCompare(String(b.scheduleSubjectId)));
      return sorted.map((item: any, index: number) => ({
        ...item,
        index: index + 1,
      }));
    },
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
    setShowAdvanced((prev) => !prev);
  }, []);

  const getRowLink = useCallback(
    (row: any) =>
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
    <div className="space-y-6">
      <div className="flex px-10 w-full justify-between items-center">
        <HeaderLabel
          Icon={<ScrollText className="h-7 w-7 text-white" />}
          title={`ตารางวิชาในห้องเรียน ${classroomInfo.class}.${classroomInfo.groupName}`}
          className="text-blue"
        />
        <div className="w-1/3">
          <GradeSubjectSearchBar onChange={handleSearchChange} />
        </div>
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
                options={allStatuses.map((v: string) => ({
                  value: v,
                  label: v,
                }))}
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

      <div className="mt-2 px-4">
        {sourceData.length === 0 && (
          <div className="flex flex-col justify-center items-center h-96 text-gray-500 bg-white rounded-lg border border-gray-200 shadow-sm">
            <ScrollText className="w-16 h-16 text-gray-300 mb-4" />
            <div className="text-lg font-medium mb-2">
              {isError
                ? "เกิดข้อผิดพลาดในการโหลดข้อมูล"
                : "ไม่มีข้อมูลวิชาที่ลงทะเบียน"}
            </div>
            <p className="text-sm text-gray-400">
              {isError
                ? "กรุณาลองใหม่อีกครั้ง"
                : "ยังไม่มีการลงทะเบียนวิชาสำหรับภาคเรียนนี้"}
            </p>
          </div>
        )}

        {sourceData.length > 0 && (
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <StylesTable
              icon={<Calendar className="w-5 h-5 text-white" />}
              title={`รายชื่อวิชาทั้งหมด ${classroomInfo.class} - ภาคเรียนที่ ${term} ปีการศึกษา ${year}`}
              columns={columns}
              data={tableData}
              getRowLink={getRowLink}
              pagination={10}
            />
          </div>
        )}
      </div>
    </div>
  );
}
