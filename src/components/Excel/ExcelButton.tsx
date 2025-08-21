"use client"
import { useGetStudentGroupByGroupIdQuery } from "@/lib/api/hooks/queries/studentGroup.queries";
import { ConvertClassroomToExcel } from "@/lib/Excel/generateExcelFile";
import { Download } from "lucide-react";



export const ExcelStudentNamelistInGroupButton = ({
  groupID,
}: {
  groupID: string;
}) => {
    const {data : studentData} = useGetStudentGroupByGroupIdQuery(groupID);
    console.log("studentData", studentData);

    const downloadExcel = async () => {
        // call excel generate
        ConvertClassroomToExcel(
          studentData?.students ?? [],
          studentData?.groupName || "",
        );
    }

  return (
    <button
      className="flex h-fit px-8 border-[1px] border-gray-300 text-blue-500 font-prompt_Light bg-white py-1.5
       hover:bg-blue-50 duration-300 text-sm rounded-md items-center justify-center gap-3"
      onClick={downloadExcel}
    >
      <Download className="text-blue-500 w-5 h-5" />
      รายชื่อนักเรียน Excel
    </button>
  );
};


