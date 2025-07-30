"use client";

import { GetStudentGroupByGroupId } from "@/api/student/route";
import NameListScheduleTable, {
  ColumnConfig,
} from "@/components/Academic/table/NameListScheduleTable";
import { StudentGroupDetail, StudentItems } from "@/dto/studentDto";
import { Box } from "lucide-react";
import React, { useEffect, useState } from "react";

interface Props {
  GroupID: number;
}
export default function Form({ GroupID }: Props) {
  const [studentGroupDetail, setStudentGroupDetail] =
    useState<StudentGroupDetail | null>(null);

  const studentColumns: ColumnConfig<StudentItems>[] = [
    { label: "No.", width: "5%", render: (_, i) => i + 1 },
    {
      label: "รหัสนักเรียน",
      width: "10%",
      render: (item) => `${item.studentCode} `,
    },
    {
      label: "ชื่อ",
      width: "15%",
      render: (item) => `${item.prefix}    ${item.firstName}`,
      className: "text-start lg:pl-6 line-clamp-1",
    },
    {
      label: "นามสกุล",
      width: "15%",
      render: (item) => `${item.lastName}`,
      className: "text-start lg:pl-6 line-clamp-1",
    },
    {
      label: "สถานะ",
      width: "60%",
      render: (item) => item.status || "-",
      className: "flex justify-center",
    },
  ];
  useEffect(() => {
    GetStudentGroupByGroupId(GroupID).then((items) => {
      setStudentGroupDetail(items);
    });
  }, []);
  const students: StudentItems[] = studentGroupDetail?.students ?? [];

  return (
    <div className="bg-white rounded-xl py-4">
      <NameListScheduleTable
        data={students}
        icon={<Box className="h-6 w-6 text-white" />}
        title={`ห้อง ${studentGroupDetail?.class}.${studentGroupDetail?.groupName}`}
        columns={studentColumns}
        rowHref={(item) => `/academic/student-details/${item.id}`}
        emptyText="ไม่มีข้อมูลชั้นเรียน"
      />
    </div>
  );
}
