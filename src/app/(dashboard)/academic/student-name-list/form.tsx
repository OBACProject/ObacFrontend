"use client";
import React, { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BookUser, Box, Users } from "lucide-react";

import HeaderLabel from "@/components/common/labelText/HeaderLabel";
import SearchInput from "@/components/Teacher/SearchInput";
import { StudentGroupItem } from "@/dto/studentGroupItem";
import { getCurrentThaiTermYear } from "@/lib/utils";
import { GetAllStudentGroupByTermYear } from "@/api/studentGroup/route";
import NameListScheduleTable, {
  ColumnConfig,
} from "@/components/Academic/table/NameListScheduleTable";
import SelectTermAndYear from "@/components/Academic/SelectTermYear";

export default function Form() {
  const router = useRouter();
  const onSearch = () => {};

  const [studentGroup, setStudentGroup] = useState<StudentGroupItem[]>();
  const { defaultTerm, currentYear } = getCurrentThaiTermYear();
  const [year, setYear] = useState<number>(currentYear);
  const [term, setTerm] = useState<string>(defaultTerm);

  useEffect(() => {
    GetAllStudentGroupByTermYear(term, year).then(
      (items: StudentGroupItem[]) => {
        const sorted = items.sort((a, b) => {
        if (a.class === "ปวช" && b.class === "ปวส") return -1;
        if (a.class === "ปวส" && b.class === "ปวช") return 1;
        const parseNums = (str: string) =>
          str.match(/\d+/g)?.map(Number) ?? [];

        const numsA = parseNums(a.groupName);
        const numsB = parseNums(b.groupName);
        const majorA = numsA[0] ?? 0;
        const majorB = numsB[0] ?? 0;
        if (majorA !== majorB) {
          return majorA - majorB;
        }
        const minorA = numsA[1] ?? 0;
        const minorB = numsB[1] ?? 0;
        if (minorA !== minorB) {
          return minorA - minorB;
        }

        return a.groupName.localeCompare(b.groupName, "th");
      });
        setStudentGroup(sorted);
      }
    );
  }, []);

  useEffect(() => {
    GetAllStudentGroupByTermYear(term, year).then(
      (items: StudentGroupItem[]) => {
        const sorted = items.sort((a, b) => {
          if (a.class === "ปวช" && b.class === "ปวส") return -1;
          if (a.class === "ปวส" && b.class === "ปวช") return 1;

          const parseNums = (str: string) =>
            str.match(/\d+/g)?.map(Number) ?? [];

          const numsA = parseNums(a.groupName);
          const numsB = parseNums(b.groupName);

          const majorA = numsA[0] ?? 0;
          const majorB = numsB[0] ?? 0;
          if (majorA !== majorB) {
            return majorA - majorB;
          }
          const minorA = numsA[1] ?? 0;
          const minorB = numsB[1] ?? 0;
          if (minorA !== minorB) {
            return minorA - minorB;
          }
          return a.groupName.localeCompare(b.groupName, "th");
        });
        setStudentGroup(sorted);
      }
    );
  }, [term, year]);

  const studentColumns: ColumnConfig<StudentGroupItem>[] = [
    { label: "No.", width: "5%", render: (_, i) => i + 1 },
    {
      label: "ระดับชั้น",
      width: "10%",
      render: (item) => `${item.class}.${item.groupName}`,
    },
    {
      label: "หลักสูตร",
      width: "30%",
      render: (item) => item.facultyName,
      className: "text-start lg:pl-6 line-clamp-1",
    },
    {
      label: "สาขา",
      width: "30%",
      render: (item) => item.programName,
      className: "text-start lg:pl-6 line-clamp-1",
    },
    { label: "รหัสห้อง", width: "15%", render: (item) => item.groupCode },
    { label: "จำนวนนักเรียน", width: "10%", render: (_) => "-" },
  ];
  return (
    <div className="py-5 w-full">
      <div className="w-full justify-start lg:px-10 flex">
        <HeaderLabel
          Icon={<BookUser className="h-7 w-7 text-white" />}
          bg_icon="bg-blue-500"
          title="รายชื่อและข้อมูลนักเรียน"
          className="text-blue-600"
        />
      </div>

      <div className="flex pt-5 lg:px-10 justify-start  w-full items-center lg:gap-8 ">
        <button
          className="text-sm px-10 py-2 bg-blue-500 rounded-sm text-white hover:bg-blue-600 flex items-center gap-4"
          onClick={() => {
            router.push("/academic/student-name-list/student-list");
          }}
        >
          <Users className="text-white h-5 w-5" />
          รายชื่อนักเรียนทั้งหมด
        </button>
        <SearchInput onSearchKeyword={onSearch} edit={false} />
        <SelectTermAndYear
          term={term}
          year={year}
          currentYear={currentYear}
          onChangeTerm={setTerm}
          onChangeYear={setYear}
        />
      </div>

      <div className="py-2">
        <NameListScheduleTable
          data={studentGroup || []}
          icon={<Box className="h-6 w-6 text-white" />}
          title={`รายชื่อห้องเรียนของ เทอม ${term} ปีการศึกษา ${year}`}
          columns={studentColumns}
          rowHref={(item) =>
            `/academic/student-name-list/student-group/${item.id}`
          }
          emptyText="ไม่มีข้อมูลชั้นเรียน"
        />
      </div>
    </div>
  );
}
