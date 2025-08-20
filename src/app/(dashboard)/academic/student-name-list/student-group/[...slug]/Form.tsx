"use client";

import { GetStudentGroupByGroupId } from "@/api/student/route";
import NameListScheduleTable, {
  ColumnConfig,
} from "@/components/Academic/table/NameListScheduleTable";
import LoadingDataTable from "@/components/common/loading/LoadingDataTable";
import { StudentGroupDetail, StudentItems } from "@/dto/studentDto";
import { Box } from "lucide-react";
import React, { useEffect, useState } from "react";

interface Props {
  GroupID: number;
}
export default function Form({ GroupID }: Props) {
  const [studentGroupDetail, setStudentGroupDetail] =
    useState<StudentGroupDetail>();

  const [isLoading, setIsLoading] = useState<boolean>(false);

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
      render: (item) => (
        <span
          className={`inline-flex items-center justify-center px-2 py-0.5 text-sm font-medium rounded-full border ${getStatusClass(
            item.status || ""
          )}`}
        >
          {item.status || "-"}
        </span>
      ),
      className: "flex justify-center",
    },
  ];
  useEffect(() => {
    (async () => {
      const data = (await GetStudentGroupByGroupId(
        GroupID
      )) as StudentGroupDetail;
      const sortedStudents = [...(data.students ?? [])].sort((a, b) =>
        a.studentCode.localeCompare(b.studentCode, undefined, { numeric: true })
      );

      setStudentGroupDetail({ ...data, students: sortedStudents });
      setIsLoading(true);
    })();
  }, [GroupID]);
  const students: StudentItems[] = studentGroupDetail?.students ?? [];
  const getStatusClass = (status?: string) => {
    switch (status) {
      case "กำลังศึกษา":
        return "text-green-600 bg-green-50 border-green-200 px-8";
      case "นักศึกษาใหม่":
        return "text-yellow-600 bg-yellow-50 border-yellow-200 px-8";
      case "พักการเรียน":
        return "bg-red-600 text-white  px-4";
      case "คัดชื่อออก":
        return "text-red-600 bg-red-50 border-red-200 w-[80%]";
      case "สำเร็จการศึกษา":
        return "bg-blue-600 text-white  px-8";
      case "ทดลองเรียน":
        return "bg-yellow-500 text-white  px-4";
      case "ลาออก":
        return "bg-gray-500 text-white  w-[80%]";
      case "กำลังติดตาม":
        return "bg-gradient-to-r from-purple-500 via-pink-400 to-orange-400 text-white  px-8";
      default:
        return "text-gray-700 bg-gray-50 border-gray-200 px-8";
    }
  };

  return (
    <div className="bg-white rounded-xl py-4">
      {isLoading ? (
        <NameListScheduleTable
          data={students}
          icon={<Box className="h-6 w-6 text-white" />}
          title={`ห้อง ${studentGroupDetail?.class}.${studentGroupDetail?.groupName} `}
          columns={studentColumns}
          rowHref={(item) => `/academic/student-details/${item.id}`}
          emptyText="ไม่มีข้อมูลชั้นเรียน"
        />
      ) : (
        <LoadingDataTable />
      )}
    </div>
  );
}
