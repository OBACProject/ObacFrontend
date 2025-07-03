"use client";
import HeaderLabel from "@/components/common/labelText/HeaderLabel";
import { ScrollText } from "lucide-react";
import React, { Suspense, useEffect, useMemo, useState } from "react";
import FilterBar from "../../component/FilterBar";
import { DataTable } from "@/components/common/MainTable/table_style_1";
import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/common/Combobox/combobox";
import { AnimatePresence, motion } from "framer-motion";
import { TableSkeleton } from "@/components/common/TableSkeleton/tableSkeleton";

const columns = [
  { label: "ระดับการศึกษา", key: "level", className: "w-1/4" },
  { label: "ปีการศึกษา", key: "years", className: "w-1/4" },
  { label: "ภาคการศึกษา", key: "semester", className: "w-1/4" },
  { label: "ห้องเรียน", key: "room", className: "w-1/4" },
  { label: "สถานะ", key: "status", className: "w-1/4" },
];
interface dataTable {
  level: string;
  years: string;
  semester: string;
  room: string;
  status: string;
  show: boolean;
}

const data: dataTable[] = [
  {
    level: "ปวส.",
    years: "2567",
    semester: "1",
    room: "ห้อง 1/1",
    status: "การประเมินเสร็จสิ้น",
    show: false,
  },
  {
    level: "ปวช.",
    years: "2567",
    semester: "1",
    room: "ห้อง 1/2",
    status: "ยังไม่มีการประเมิน",
    show: false,
  },
  {
    level: "ปวช.",
    years: "2567",
    semester: "1",
    room: "ห้อง 1/3",
    status: "การประเมินยังไม่เสร็จสมบูรณ์",
    show: false,
  },
  {
    level: "ปวช.",
    years: "2567",
    semester: "1",
    room: "ห้อง 1/4",
    status: "แสดงเกรด",
    show: true,
  },
  {
    level: "ปวส.",
    years: "2567",
    semester: "1",
    room: "ห้อง 2/1",
    status: "แสดงเกรด",
    show: true,
  },
  {
    level: "ปวช.",
    years: "2567",
    semester: "1",
    room: "ห้อง 2/2",
    status: "ยังไม่มีการประเมิน",
    show: false,
  },
  {
    level: "ปวช.",
    years: "2567",
    semester: "1",
    room: "ห้อง 2/3",
    status: "การประเมินเสร็จสิ้น",
    show: false,
  },
  {
    level: "ปวช.",
    years: "2567",
    semester: "1",
    room: "ห้อง 2/4",
    status: "การประเมินยังไม่เสร็จสมบูรณ์",
    show: false,
  },
  {
    level: "ปวส.",
    years: "2567",
    semester: "1",
    room: "ห้อง 3/1",
    status: "การประเมินยังไม่เสร็จสมบูรณ์",
    show: false,
  },
  {
    level: "ปวช.",
    years: "2568",
    semester: "2",
    room: "ห้อง 3/2",
    status: "แสดงเกรด",
    show: true,
  },
  {
    level: "ปวช.",
    years: "2568",
    semester: "2",
    room: "ห้อง 3/3",
    status: "การประเมินเสร็จสิ้น",
    show: false,
  },
  {
    level: "ปวช.",
    years: "2568",
    semester: "2",
    room: "ห้อง 3/4",
    status: "ยังไม่มีการประเมิน",
    show: false,
  },
  {
    level: "ปวส.",
    years: "2568",
    semester: "2",
    room: "ห้อง 4/1",
    status: "แสดงเกรด",
    show: true,
  },
  {
    level: "ปวช.",
    years: "2568",
    semester: "2",
    room: "ห้อง 4/2",
    status: "ยังไม่มีการประเมิน",
    show: false,
  },
  {
    level: "ปวช.",
    years: "2568",
    semester: "2",
    room: "ห้อง 4/3",
    status: "การประเมินเสร็จสิ้น",
    show: false,
  },
  {
    level: "ปวช.",
    years: "2568",
    semester: "2",
    room: "ห้อง 4/4",
    status: "การประเมินยังไม่เสร็จสมบูรณ์",
    show: false,
  },
  {
    level: "ปวส.",
    years: "2568",
    semester: "2",
    room: "ห้อง 5/1",
    status: "การประเมินเสร็จสิ้น",
    show: false,
  },
  {
    level: "ปวช.",
    years: "2567",
    semester: "1",
    room: "ห้อง 5/2",
    status: "แสดงเกรด",
    show: true,
  },
  {
    level: "ปวช.",
    years: "2567",
    semester: "1",
    room: "ห้อง 5/3",
    status: "ยังไม่มีการประเมิน",
    show: false,
  },
  {
    level: "ปวช.",
    years: "2567",
    semester: "1",
    room: "ห้อง 5/4",
    status: "แสดงเกรด",
    show: true,
  },
];

export default function studentClassroomContent() {
  const currentYear = new Date().getFullYear() + 543;
  const [term, setTerm] = useState("");
  const [year, setYear] = useState(currentYear);
  const [searchTerm, setSearchTerm] = useState("");
  // const [filteredData, setFilteredData] = useState<dataTable[]>([]);

  const [showAdvanced, setShowAdvanced] = useState(false);
  const [filterLevel, setFilterLevel] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterSemester, setFilterSemester] = useState("");

  const [isDataTableLoading, setIsDataTableLoading] = useState(false);

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchYear = year === 0 || item.years === String(year);
      const matchTerm = term === "" || item.semester === term;
      const matchLevel = filterLevel === "" || item.level === filterLevel;
      const matchStatus = filterStatus === "" || item.status === filterStatus;
      const matchSemester =
        filterSemester === "" || item.semester === filterSemester;

      const matchSearch =
        item.level.includes(searchTerm) ||
        item.room.includes(searchTerm) ||
        item.status.includes(searchTerm);

      return (
        matchYear &&
        matchTerm &&
        matchLevel &&
        matchStatus &&
        matchSemester &&
        matchSearch
      );
    });
  }, [year, term, searchTerm, filterLevel, filterStatus, filterSemester]);

  useEffect(() => {
  if (!showAdvanced) {
    setFilterLevel("");
    setFilterStatus("");
    setFilterSemester("");
  }
}, [showAdvanced]);

  const allLevels = Array.from(new Set(data.map((d) => d.level)));
  const allStatuses = Array.from(new Set(data.map((d) => d.status)));
  const allSemesters = Array.from(new Set(data.map((d) => d.semester)));

  return (
    // split the page into two parts filter and table
    <>
      <div className="w-full justify-start  flex">
        <HeaderLabel
          title="ออกเกรดแต่ละรายวิชา"
          Icon={<ScrollText className="w-8 h-8" />}
        />
      </div>
      {/* filter part have 2 point 1.search bar (room), 2. static combobox with a year data  */}
      <FilterBar
        term={term}
        year={year}
        currentYear={currentYear}
        onChangeTerm={setTerm}
        onChangeYear={setYear}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
      {/* make little button to tricker a advanced option (have a filter semester , levels , status in combobox ) */}
      {/* Advanced Toggle Button */}
      <div className="flex justify-end mb-3 px-10 items-center gap-2 relative">
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
                buttonLabel="ระดับการศึกษา"
                onSelect={setFilterLevel}
                defaultValue={filterLevel}
              />
              <Combobox
                options={allStatuses.map((v) => ({ value: v, label: v }))}
                buttonLabel="สถานะ"
                onSelect={setFilterStatus}
                defaultValue={filterStatus}
              />
              <Combobox
                options={allSemesters.map((v) => ({
                  value: v,
                  label: `ภาคเรียน ${v}`,
                }))}
                buttonLabel="ภาคเรียน"
                onSelect={setFilterSemester}
                defaultValue={filterSemester}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle Button */}
        <Button
          variant="outline"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="whitespace-nowrap text-sm px-3 py-1.5"
        >
          {showAdvanced ? "ซ่อนตัวกรองเพิ่มเติม" : "ตัวกรองเพิ่มเติม"}
        </Button>
      </div>
      {/* table part */}

      {isDataTableLoading ? (
        <TableSkeleton rows={10} columns={5} />
      ) : (
        // when fetch data use suspense to show loading
        <DataTable
          columns={columns}
          data={filteredData.map((item, index) => ({
            ...item,
            index: index + 1,
          }))}
          getRowLink={(classroom) => {
            const studentClassroomData = data.find(
              (item) =>
                item.level === classroom.level &&
                item.years === classroom.years &&
                item.semester === classroom.semester &&
                item.room === classroom.room
            );

            return `/academic/grading/student-classroom/1`;
          }}
          pagination={10}
        />
      )}
    </>
  );
}
