"use client";
import HeaderLabel from "@/components/common/labelText/HeaderLabel";
import { ScrollText } from "lucide-react";
import React, {  useDeferredValue, useEffect, useMemo, useState, useTransition } from "react";
import FilterBar from "../../component/FilterBar";
import { DataTable } from "@/components/common/MainTable/table_style_1";
import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/common/Combobox/combobox";
import { AnimatePresence, motion } from "framer-motion";
import { TableSkeleton } from "@/components/common/TableSkeleton/tableSkeleton";
import GradeToggleButton from "../../component/pushlishToggle";

const columns = [
  { label: "ภาคการศึกษา", key: "semester", className: "w-1/4 flex justify-center" },
  { label: "ระดับการศึกษา", key: "level", className: "w-1/4 flex justify-center" },
  { label: "สถานะ", key: "status", className: "w-1/4 flex justify-center" ,
    render: (row : {status : string}) => (
      <div className="flex justify-center">
          {row.status == "ตรวจสอบเสร็จสิ้น" ? (
            <span className="text-green-500">{row.status}</span>
          ) : (
            <span className="text-red-500">{row.status}</span>
          )}
      </div>
    )
  },
  { label: "เผยแพร่เกรด", key: "show", className: "w-1/4 flex justify-center",
  render: (row : dataTable) => (
    <div className="flex justify-center" onClick={(e) => e.stopPropagation()}>
      <GradeToggleButton
        isOn={row.show}
        onToggle={(newValue) => {
          setTableData((prev) =>
            prev.map((item: any, i: number) =>
              i === row.index - 1 ? { ...item, show: newValue } : item
            )
          );
        }}
      />
    </div>
  ),
},
];
interface dataTable {
  level: string;
  years: string;
  semester: string;
  status: string;
  show: boolean;
  index: number;
}

const rawData = [
  {
    level: "ปวส.",
    years: "2567",
    semester: "1",
    room: "1/1",
    status: "ตรวจสอบเสร็จสิ้น",
    show: false,
  },
  {
    level: "ปวช.",
    years: "2567",
    semester: "1",
    room: "1/2",
    status: "ตรวจสอบเสร็จสิ้น",
    show: false,
  },
  {
    level: "ปวช.",
    years: "2567",
    semester: "1",
    room: "1/3",
    status: "ตรวจสอบเสร็จสิ้น",
    show: false,
  },
  {
    level: "ปวช.",
    years: "2567",
    semester: "1",
    room: "1/4",
    status: "ตรวจสอบเสร็จสิ้น",
    show: true,
  },
  {
    level: "ปวส.",
    years: "2567",
    semester: "1",
    room: "2/1",
    status: "ตรวจสอบเสร็จสิ้น",
    show: true,
  },
  {
    level: "ปวช.",
    years: "2567",
    semester: "1",
    room: "2/2",
    status: "ยังไม่มีตรวจสอบ",
    show: false,
  },
  {
    level: "ปวช.",
    years: "2567",
    semester: "1",
    room: "2/3",
    status: "ยังไม่มีตรวจสอบ",
    show: false,
  },
  {
    level: "ปวช.",
    years: "2567",
    semester: "1",
    room: "2/4",
    status: "ยังไม่มีตรวจสอบ",
    show: false,
  },
  {
    level: "ปวส.",
    years: "2567",
    semester: "1",
    room: "3/1",
    status: "ยังไม่มีตรวจสอบ",
    show: false,
  },
  {
    level: "ปวช.",
    years: "2568",
    semester: "2",
    room: "3/2",
    status: "ยังไม่มีตรวจสอบ",
    show: true,
  },
  {
    level: "ปวช.",
    years: "2568",
    semester: "2",
    room: "3/3",
    status: "ยังไม่มีตรวจสอบ",
    show: false,
  },
  {
    level: "ปวช.",
    years: "2568",
    semester: "2",
    room: "3/4",
    status: "ตรวจสอบเสร็จสิ้น",
    show: false,
  },
  {
    level: "ปวส.",
    years: "2568",
    semester: "2",
    room: "4/1",
    status: "ตรวจสอบเสร็จสิ้น",
    show: true,
  },
  {
    level: "ปวช.",
    years: "2568",
    semester: "2",
    room: "4/2",
    status: "ตรวจสอบเสร็จสิ้น",
    show: false,
  },
  {
    level: "ปวช.",
    years: "2568",
    semester: "2",
    room: "4/3",
    status: "ยังไม่มีตรวจสอบ",
    show: false,
  },
  {
    level: "ปวช.",
    years: "2568",
    semester: "2",
    room: "4/4",
    status: "ตรวจสอบเสร็จสิ้น",
    show: false,
  },
  {
    level: "ปวส.",
    years: "2568",
    semester: "2",
    room: "5/1",
    status: "ยังไม่มีตรวจสอบ",
    show: false,
  },
  {
    level: "ปวช.",
    years: "2567",
    semester: "1",
    room: "5/2",
    status: "ตรวจสอบเสร็จสิ้น",
    show: true,
  },
  {
    level: "ปวช.",
    years: "2567",
    semester: "1",
    room: "5/3",
    status: "ตรวจสอบเสร็จสิ้น",
    show: false,
  },
  {
    level: "ปวช.",
    years: "2567",
    semester: "1",
    room: "5/4",
    status: "ยังไม่มีตรวจสอบ",
    show: true,
  },
];

const transformedData: dataTable[] = rawData.map((item , idx) => ({
  level: `${item.level} ${item.room}`, // Combine level + room
  years: item.years,
  semester: item.semester,
  status: item.status,
  show: item.show,
  index: idx + 1,
}));

export default function StudentClassroomContent() {

  const [tableData, setTableData] = useState(transformedData);


  const currentYear = new Date().getFullYear() + 543;
  const [term, setTerm] = useState("");
  const [year, setYear] = useState(currentYear);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [filterLevel, setFilterLevel] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterSemester, setFilterSemester] = useState("");
  const [isDataTableLoading, setIsDataTableLoading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const deferredSearchTerm = useDeferredValue(searchTerm);

  useEffect(() => {
    if (!showAdvanced) {
      setFilterLevel("");
      setFilterStatus("");
      setFilterSemester("");
    }
  }, [showAdvanced]);

  const allLevels = useMemo(
    () => Array.from(new Set(transformedData.map((d) => d.level))),
    []
  );
  const allStatuses = useMemo(
    () => Array.from(new Set(transformedData.map((d) => d.status))),
    []
  );
  const allSemesters = useMemo(
    () => Array.from(new Set(transformedData.map((d) => d.semester))),
    []
  );

  const filteredData = useMemo(() => {
    return tableData.filter((item) => {
      const matchYear = year === 0 || item.years === String(year);
      const matchTerm = term === "" || item.semester === term;
      const matchLevel = filterLevel === "" || item.level === filterLevel;
      const matchStatus = filterStatus === "" || item.status === filterStatus;
      const matchSemester =
        filterSemester === "" || item.semester === filterSemester;
      const matchSearch =
        item.level.includes(deferredSearchTerm) ||
        item.status.includes(deferredSearchTerm);

      return (
        matchYear &&
        matchTerm &&
        matchLevel &&
        matchStatus &&
        matchSemester &&
        matchSearch
      );
    });
  }, [
    year,
    term,
    deferredSearchTerm,
    filterLevel,
    filterStatus,
    filterSemester,
  ]);

  return (
    <>
      {/* Header */}
      <HeaderLabel
        title="ออกเกรดแต่ละรายวิชา"
        Icon={<ScrollText className="w-8 h-8" />}
      />

      {/* FilterBar */}
      <FilterBar
        term={term}
        year={year}
        currentYear={currentYear}
        onChangeTerm={(v) => startTransition(() => setTerm(v))}
        onChangeYear={(v) => startTransition(() => setYear(v))}
        searchTerm={searchTerm}
        onSearchChange={(v) => startTransition(() => setSearchTerm(v))}
      />

      {/* Advanced Filters */}
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

      {/* Table or Skeleton */}
      {isDataTableLoading || isPending ? (
        <TableSkeleton rows={10} columns={5} />
      ) : (
        <DataTable
          columns={columns}
          data={filteredData.map((item, index) => ({
            ...item,
            index: index + 1,
          }))}
          getRowLink={(row) => `/academic/grading/student-classroom/1`}
          pagination={10}
        />
      )}
    </>
  );
}

function setTableData(arg0: (prev: any) => any) {
  console.log("test")
}
