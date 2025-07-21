"use client";

import React, { useState, useMemo, useDeferredValue, useEffect } from "react";
import GradeSubjectSearchBar from "./GradeSubjectSearchBar";
import HeaderLabel from "@/components/common/labelText/HeaderLabel";
import { Calendar, ScrollText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { Combobox } from "@/components/common/Combobox/combobox";
import { StylesTable } from "@/components/Academic/table/StylesTable";
import { useGetSubjectsByStudentGroupIdTermYearQuery } from "@/lib/api/hooks/queries/subject.queries";

export const columns = [
  { label: "ลำดับ", key: "index", className: "w-1/12 flex justify-center px-10" },
  { label: "รหัสวิชา", key: "id", className: "w-1/4 flex justify-center px-10" },
  { label: "ชื่อวิชา", key: "name", className: "w-1/4 flex px-10" },
  { label: "อาจารย์", key: "teacher", className: "w-1/4 flex px-10" },
  { label: "สถานะ", key: "status", className: "w-1/4 flex px-10" },
];

const mockData = [
  {
    id: "000101",
    name: "ภาษาไทยพื้นฐาน",
    teacher: "อาจารย์ กนกพร ชัยภูมิ",
    status: "ตรวจสอบเสร็จสิ้น",
  },
  {
    id: "000102",
    name: "คณิตศาสตร์พื้นฐาน",
    teacher: "อาจารย์ สุชาติ แสงเพชร",
    status: "ยังไม่ตรวจสอบ",
  },
  {
    id: "000103",
    name: "วิทยาศาสตร์ทั่วไป",
    teacher: "อาจารย์ อรอุมา หาญกล้า",
    status: "ยังไม่ตรวจสอบ",
  },
  {
    id: "000104",
    name: "ภาษาอังกฤษ",
    teacher: "อาจารย์ รุจิรา นามทอง",
    status: "ตรวจสอบเสร็จสิ้น",
  },
  {
    id: "000105",
    name: "ประวัติศาสตร์",
    teacher: "อาจารย์ ธงชัย สมจิต",
    status: "ยังไม่ตรวจสอบ",
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

  const { data, isLoading, isError } = useGetSubjectsByStudentGroupIdTermYearQuery({
    studentGroupId: classroomId,
    term,
    year,
  });

  const sourceData = useMemo(() => {
    if (data && data.length > 0) {
      return data.map((d) => ({
        id: d.SubjectCode,
        name: d.SubjectName,
        teacher: d.TeacherName || "ไม่ระบุ",
        status: d.IsComplete ? "ตรวจสอบเสร็จสิ้น" : "ยังไม่ตรวจสอบ",
      }));
    }
    return mockData;
  }, [data]);

  const filteredData = useMemo(() => {
    return sourceData
      .filter((item) =>
        Object.values(item).some((val) =>
          String(val).toLowerCase().includes(deferredSearch.toLowerCase())
        )
      )
      .filter(
        (item) =>
          (filterLevel ? item.teacher === filterLevel : true) &&
          (filterStatus ? item.status === filterStatus : true)
      );
  }, [sourceData, deferredSearch, filterLevel, filterStatus]);

  const allLevels = useMemo(() => {
    return Array.from(new Set(sourceData.map((d) => d.teacher || "ไม่ระบุ")));
  }, [sourceData]);

  const allStatuses = useMemo(() => {
    return Array.from(new Set(sourceData.map((d) => d.status)));
  }, [sourceData]);

  useEffect(() => {
    if (!showAdvanced) {
      setFilterLevel("");
      setFilterStatus("");
    }
  }, [showAdvanced]);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 p-10">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="animate-pulse h-10 bg-gray-300 rounded w-full" />
        ))}
      </div>
    );
  }

  if (isError || !sourceData || sourceData.length === 0) {
    return (
      <div className="flex justify-center items-center h-96 text-gray-500 text-lg">
        {isError ? "เกิดข้อผิดพลาดในการโหลดข้อมูล" : "ไม่มีข้อมูลให้แสดงผล"}
      </div>
    );
  }

  return (
    <>
      <div className="flex px-10 w-full justify-between items-center">
        <HeaderLabel
          Icon={<ScrollText className="h-7 w-7 text-white" />}
          title={`ตารางวิชาในห้องเรียน ปวส.${classroomId}/2`}
          className="text-blue"
        />
        <GradeSubjectSearchBar onChange={setSearchTerm} />
      </div>

      <div className="flex justify-end mb-3 px-12 mt-4 items-center gap-2 relative">
        <AnimatePresence>
          {showAdvanced && (
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
              className="flex flex-row gap-2 items-center"
            >
              <Combobox
                options={allLevels.map((v) => ({ value: v, label: v }))}
                buttonLabel="อาจารย์"
                onSelect={setFilterLevel}
                defaultValue={filterLevel}
              />
              <Combobox
                options={allStatuses.map((v) => ({ value: v, label: v }))}
                buttonLabel="สถานะ"
                onSelect={setFilterStatus}
                defaultValue={filterStatus}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <Button
          variant="outline"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="whitespace-nowrap text-sm px-3 py-1.5"
        >
          {showAdvanced ? "ซ่อนตัวกรองเพิ่มเติม" : "ตัวกรองเพิ่มเติม"}
        </Button>
      </div>

      <div className="mt-2">
        <StylesTable
          icon={<Calendar className="w-5 h-5 text-white" />}
          title={`รายชื่อวิชาทั้งหมด ปวส.${classroomId}/2`}
          columns={columns}
          data={filteredData.map((item, index) => ({
            ...item,
            index: index + 1,
          }))}
          getRowLink={(row) =>
            `/academic/grading/student-classroom/subject/${row.id}`
          }
          pagination={10}
        />
      </div>
    </>
  );
}
