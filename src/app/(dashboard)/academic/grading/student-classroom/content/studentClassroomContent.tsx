"use client";
import HeaderLabel from "@/components/common/labelText/HeaderLabel";
import { School, ScrollText } from "lucide-react";
import React, {
  useDeferredValue,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import FilterBar from "../../component/FilterBar";
import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/common/Combobox/combobox";
import { AnimatePresence, motion } from "framer-motion";
import { TableSkeleton } from "@/components/common/TableSkeleton/tableSkeleton";
import GradeToggleButton from "../../component/pushlishToggle";
import { StylesTable } from "@/components/Academic/table/StylesTable";
import { useGetAllStudentGroupByTermYearQuery } from "@/lib/api/hooks/queries/studentGroup.queries";

interface dataTable {
  level: string;
  years: string;
  semester: string;
  status: string;
  show: boolean;
  index: number;
  groupId?: number; // Add groupId for navigation
}

export default function StudentClassroomContent() {
  const currentYear = new Date().getFullYear() + 543;
  const [term, setTerm] = useState("1");
  const [year, setYear] = useState(currentYear);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [filterLevel, setFilterLevel] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterSemester, setFilterSemester] = useState("");
  const [isPending, startTransition] = useTransition();
  const deferredSearchTerm = useDeferredValue(searchTerm);

  // Fetch real data
  const { data, isLoading, error } = useGetAllStudentGroupByTermYearQuery({
    term: term,
    year: year,
  });

  console.log("StudentClassroomContent data:", data);

  // Transform real data to table format
  const transformedData: dataTable[] = useMemo(() => {
    if (!data || !Array.isArray(data)) return [];

    return data.map((item: any, idx: number) => ({
      level: `${item.level || item.educationLevel || "N/A"} ${
        item.room || item.roomNumber || item.className || ""
      }`.trim(),
      years: String(item.year || item.academicYear || year),
      semester: String(item.term || item.semester || term),
      status: item.status || item.gradeStatus || "ยังไม่มีตรวจสอบ",
      show: item.isPublished || item.show || false,
      index: idx + 1,
      groupId: item.groupId || item.id, // For navigation
    }));
  }, [data, year, term]);

  // State for table data (for toggle functionality)
  const [tableData, setTableData] = useState<dataTable[]>([]);

  // Update table data when transformed data changes
  useEffect(() => {
    setTableData(transformedData);
  }, [transformedData]);

  // Columns definition
  const columns = [
    {
      label: "ภาคการศึกษา",
      key: "semester",
      className: "w-1/4 flex justify-center",
    },
    {
      label: "ระดับการศึกษา",
      key: "level",
      className: "w-1/4 flex justify-center",
    },
    {
      label: "สถานะ",
      key: "status",
      className: "w-1/4 flex justify-center",
      render: (row: { status: string }) => (
        <div className="flex justify-center">
          {row.status === "ตรวจสอบเสร็จสิ้น" ? (
            <span className="text-green-500">{row.status}</span>
          ) : (
            <span className="text-red-500">{row.status}</span>
          )}
        </div>
      ),
    },
    {
      label: "เผยแพร่เกรด",
      key: "show",
      className: "w-1/4 flex justify-center",
      render: (row: dataTable) => {
        const isDisabled = row.status !== "ตรวจสอบเสร็จสิ้น";
        return (
          <div
            className="flex justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <GradeToggleButton
              isOn={row.show}
              disabled={isDisabled}
              onToggle={(newValue) => {
                if (!isDisabled) {
                  setTableData((prev) =>
                    prev.map((item, i) =>
                      i === row.index - 1 ? { ...item, show: newValue } : item
                    )
                  );
                }
              }}
            />
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    if (!showAdvanced) {
      setFilterLevel("");
      setFilterStatus("");
      setFilterSemester("");
    }
  }, [showAdvanced]);

  const allLevels = useMemo(
    () => Array.from(new Set(tableData.map((d) => d.level))),
    [tableData]
  );
  const allStatuses = useMemo(
    () => Array.from(new Set(tableData.map((d) => d.status))),
    [tableData]
  );
  const allSemesters = useMemo(
    () => Array.from(new Set(tableData.map((d) => d.semester))),
    [tableData]
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
        item.level.toLowerCase().includes(deferredSearchTerm.toLowerCase()) ||
        item.status.toLowerCase().includes(deferredSearchTerm.toLowerCase());

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
    tableData,
    year,
    term,
    deferredSearchTerm,
    filterLevel,
    filterStatus,
    filterSemester,
  ]);

  // Handle loading and error states
  if (isLoading || isPending) {
    return (
      <>
        <HeaderLabel
          title="ออกเกรดแต่ละรายวิชา"
          Icon={<ScrollText className="h-7 w-7 text-white" />}
        />
        <FilterBar
          term={term}
          year={year}
          currentYear={currentYear}
          onChangeTerm={(v) => startTransition(() => setTerm(v))}
          onChangeYear={(v) => startTransition(() => setYear(v))}
          searchTerm={searchTerm}
          onSearchChange={(v) => startTransition(() => setSearchTerm(v))}
        />
        <TableSkeleton rows={10} columns={4} />
      </>
    );
  }

  if (error) {
    return (
      <>
        <HeaderLabel
          title="ออกเกรดแต่ละรายวิชา"
          Icon={<ScrollText className="h-7 w-7 text-white" />}
        />
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-red-600 mb-2">
              เกิดข้อผิดพลาด
            </h2>
            <p className="text-gray-600">ไม่สามารถโหลดข้อมูลห้องเรียนได้</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Header */}
      <HeaderLabel
        title="ออกเกรดแต่ละรายวิชา"
        Icon={<ScrollText className="h-7 w-7 text-white" />}
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

      {/* Table */}
      <StylesTable
        icon={<School className="w-5 h-5 text-white" />}
        title="ห้องเรียนทั้งหมด"
        columns={columns}
        data={filteredData.map((item, index) => ({
          ...item,
          index: index + 1,
        }))}
        getRowLink={(row) =>
          `/academic/grading/student-classroom/${row.groupId}/${term}/${year}`
        }
        pagination={10}
      />
    </>
  );
}
