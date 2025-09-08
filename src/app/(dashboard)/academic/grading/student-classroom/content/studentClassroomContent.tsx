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
import { useUpdatePublishStatusByStudentGroupIdMutation } from "@/lib/api/hooks/queries/studentGroup.queries";
import { GetAllStudentGroupByTermYearResponse } from "@/lib/api/models/studentGroup/studentGroup.response";

interface dataTable {
  index: number;
  class: string;
  space: string;
  isComplete: boolean;
  status: string;
  isPublish: boolean;
  groupId: number;
}

export default function StudentClassroomContent() {
  const currentYear = new Date().getFullYear() + 543;
  const [term, setTerm] = useState("1");
  const [year, setYear] = useState(currentYear);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [filterStatus, setFilterStatus] = useState("");
  const [filterPublished, setFilterPublished] = useState("");
  const [filterClass, setFilterClass] = useState("");
  const [isPending, startTransition] = useTransition();
  const deferredSearchTerm = useDeferredValue(searchTerm);

  const { data, isLoading, error } = useGetAllStudentGroupByTermYearQuery({
    term: term,
    year: year,
  });

  // Mutation for updating publish status
  const updatePublishStatusMutation =
    useUpdatePublishStatusByStudentGroupIdMutation({
      onSuccess: () => {
        console.log("Publish status updated successfully");
      },
      onError: (error) => {
        console.error("Failed to update publish status:", error);
      },
    });

  const transformedData: dataTable[] = useMemo(() => {
    if (!data || !Array.isArray(data)) return [];

    return data
      .sort((a, b) => a.id - b.id)
      .map((item: GetAllStudentGroupByTermYearResponse, idx: number) => ({
        index: idx + 1,
        class: `${item.class}.${item.groupName}`,
        space: "",
        status: item.completeStatus,
        isComplete: item.isComplete,
        isPublish: item.isPublish,
        groupId: item.id,
      }));
  }, [data]);

  const [tableData, setTableData] = useState<dataTable[]>([]);

  useEffect(() => {
    setTableData(transformedData);
  }, [transformedData]);

  const columns = [
    {
      label: "ลำดับ",
      key: "index",
      className: "w-[10%] flex justify-center",
    },
    {
      label: "ห้องเรียน",
      key: "class",
      className: "w-[30%] flex justify-center items-center pl-32",
    },
    {
      label: " ",
      key: "space",
      className: "w-[20%] flex justify-center",
    },
    {
      label: "สถานะการตรวจสอบ",
      key: "isComplete",
      className: "w-[20%] flex justify-center",
      render: (row: dataTable) => {
          const status = (row.status || "").trim();
          let bgClass = "bg-yellow-100";
          let textClass = "text-yellow-800";

          if (status === "ยังไม่ตรวจสอบ") {
            bgClass = "bg-red-100";
            textClass = "text-red-800";
          } else if (status === "ตรวจสอบแล้ว" || status === "ตรวจสอบเสร็จสิ้น") {
            bgClass = "bg-green-100";
            textClass = "text-green-800";
          }

          return (
            <div className="flex justify-center">
              <span className={`${bgClass} ${textClass} px-3 py-1 rounded-full text-sm font-medium`}>
                {row.status}
              </span>
            </div>
          );
        },
    },
    {
      label: "เผยแพร่เกรด",
      key: "isPublish",
      className: "w-[20%] flex justify-center",
      render: (row: dataTable) => {
        const isDisabled = !row.isComplete;
        return (
          <div
            className="flex justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <GradeToggleButton
              isOn={row.isPublish}
              disabled={isDisabled}
              onToggle={(newValue) => {
                if (!isDisabled) {
                  setTableData((prev) =>
                    prev.map((item, i) =>
                      i === row.index - 1
                        ? { ...item, isPublish: newValue }
                        : item
                    )
                  );

                  // Call API to update publish status
                  updatePublishStatusMutation.mutate(
                    {
                      studentGroupId: row.groupId,
                      isPublished: newValue,
                    },
                    {
                      onError: () => {
                        setTableData((prev) =>
                          prev.map((item, i) =>
                            i === row.index - 1
                              ? { ...item, isPublish: !newValue }
                              : item
                          )
                        );
                      },
                    }
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
      setFilterStatus("");
      setFilterPublished("");
      setFilterClass("");
    }
  }, [showAdvanced]);

  const allStatuses = useMemo(() => ["ตรวจสอบเสร็จสิ้น", "ยังไม่ตรวจสอบ"], []);

  const allPublishedStatuses = useMemo(
    () => ["เผยแพร่แล้ว", "ยังไม่เผยแพร่"],
    []
  );

  const allClasses = useMemo(
    () => Array.from(new Set(tableData.map((d) => d.class))).sort(),
    [tableData]
  );

  const filteredData = useMemo(() => {
    return tableData
      .filter((item) => {
        const matchStatus =
          filterStatus === "" ||
          (filterStatus === "ตรวจสอบเสร็จสิ้น" && item.isComplete) ||
          (filterStatus === "ยังไม่ตรวจสอบ" && !item.isComplete);

        const matchPublished =
          filterPublished === "" ||
          (filterPublished === "เผยแพร่แล้ว" && item.isPublish) ||
          (filterPublished === "ยังไม่เผยแพร่" && !item.isPublish);

        const matchClass = filterClass === "" || item.class === filterClass;

        const matchSearch = item.class
          .toLowerCase()
          .includes(deferredSearchTerm.toLowerCase());

        return matchStatus && matchPublished && matchClass && matchSearch;
      })
      .sort((a, b) => {
        const parseClass = (className: string) => {
          const match = className.match(/(ปวช|ปวส)\.(\d+)/);
          if (!match) return { level: "", year: 0 };
          const [_, level, year] = match;
          return { level, year: parseInt(year, 10) };
        };

        const aClass = parseClass(a.class);
        const bClass = parseClass(b.class);

        // Prioritize ปวช.1 explicitly
        if (a.class === "ปวช.1" && b.class !== "ปวช.1") {
          return -1;
        }
        if (b.class === "ปวช.1" && a.class !== "ปวช.1") {
          return 1;
        }

        if (aClass.level !== bClass.level) {
          return aClass.level === "ปวช" ? -1 : 1;
        }

        return aClass.year - bClass.year;
      })
      .map((item, idx) => ({ ...item, index: idx + 1 }));
  }, [
    tableData,
    deferredSearchTerm,
    filterStatus,
    filterPublished,
    filterClass,
  ]);

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
                options={allClasses.map((v) => ({ value: v, label: v }))}
                buttonLabel="ห้องเรียน"
                onSelect={setFilterClass}
                defaultValue={filterClass}
              />
              <Combobox
                options={allStatuses.map((v) => ({ value: v, label: v }))}
                buttonLabel="สถานะการตรวจสอบ"
                onSelect={setFilterStatus}
                defaultValue={filterStatus}
              />
              <Combobox
                options={allPublishedStatuses.map((v) => ({
                  value: v,
                  label: v,
                }))}
                buttonLabel="สถานะการเผยแพร่"
                onSelect={setFilterPublished}
                defaultValue={filterPublished}
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

      {/* Data Source Indicator */}
      <div className="flex justify-center mb-4">
        {data?.length == 0 && (
          <div className="text-sm text-orange-600 bg-orange-100 px-4 py-2 rounded-md">
            ไม่พบข้อมูลห้องเรียน
          </div>
        )}
      </div>

      {/* Table */}
      <StylesTable
        icon={<School className="w-5 h-5 text-white" />}
        title="ห้องเรียนทั้งหมด"
        columns={columns}
        data={filteredData}
        getRowLink={(row) =>
          `/academic/grading/student-classroom/${row.groupId}/${term}/${year}`
        }
        pagination={20}
      />
    </>
  );
}
