"use client";
import React, { useEffect, useState } from "react";
import { BookUser, Box, Boxes } from "lucide-react";
import HeaderLabel from "@/components/common/labelText/HeaderLabel";
import SearchInput from "@/components/Teacher/SearchInput";
import { StudentGroupItem } from "@/dto/studentGroupItem";
import { getCurrentThaiTermYear } from "@/lib/utils";
import { GetAllStudentGroupByTermYear } from "@/api/studentGroup/route";
import NameListScheduleTable, {
  ColumnConfig,
} from "@/components/Academic/table/NameListScheduleTable";
import SelectTermAndYear from "@/components/Academic/SelectTermYear";
import DownloadStudentListPopup from "@/components/common/Popup/DownloadStudentListPopup";
import LoadingDataTable from "@/components/common/loading/LoadingDataTable";

export default function Form() {
  const onSearch = () => {};

  const [studentGroup, setStudentGroup] = useState<StudentGroupItem[]>();
  const { defaultTerm, currentYear } = getCurrentThaiTermYear();
  const [year, setYear] = useState<number>(currentYear);
  const [term, setTerm] = useState<string>(defaultTerm);

  const [pdfListPopup, setPDFListPopup] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
        setIsLoading(true);
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
    { label: "จำนวนนักเรียน", width: "10%", render: (item) =>  item.total  },
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
      <div className="flex pt-5 lg:px-10 items-center justify-between">
        <div className="flex justify-start   w-fit items-center lg:gap-8 ">
          {/* <SearchInput onSearchKeyword={onSearch} edit={false} /> */}
          <SelectTermAndYear
            term={term}
            year={year}
            currentYear={currentYear}
            onChangeTerm={setTerm}
            onChangeYear={setYear}
          />
        </div>

        <button
          onClick={() => setPDFListPopup(true)}
          className="px-8  bg-white text-blue-600 font-prompt_Light hover:scale-[101%] duration-300 border-gray-300 shadow border-[1px] rounded-md py-1 flex items-center gap-3"
        >
          <Boxes className="w-5 h-5 text-blue-600 " />
          โหลดใบรายชื่อแบบสายชั้น
        </button>
      </div>

      <div className="py-2">
        {isLoading ? (
          <NameListScheduleTable
            data={studentGroup || []}
            icon={<Box className="h-6 w-6 text-white" />}
            title={`รายชื่อห้องเรียนของ เทอม ${term} ปีการศึกษา ${year}`}
            columns={studentColumns}
            rowHref={(item) =>
              `/academic/student-name-list/student-group/${item.id}/${year}`
            }
            emptyText="ไม่มีข้อมูลชั้นเรียน"
          />
        ) : (
          <LoadingDataTable />
        )}
      </div>
      {pdfListPopup && (
        <DownloadStudentListPopup onClosePopUp={setPDFListPopup} />
      )}
    </div>
  );
}
