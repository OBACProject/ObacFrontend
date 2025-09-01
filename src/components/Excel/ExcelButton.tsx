"use client";
import { ConvertClassroomToExcelDto, convertGradBySubjectId } from "@/dto/gradDto";
import { useGetStudentGroupGradeByScheduleSubjectIdQuery } from "@/lib/api/hooks/queries/grade.queries";
import { useGetStudentGroupByGroupIdQuery } from "@/lib/api/hooks/queries/studentGroup.queries";
import { GetStudentGroupGradeByScheduleSubjectIdResponse } from "@/lib/api/models/grade/grade.response";
import {
  ConvertClassroomToExcel,
  ConvertClassroomToExcelWithSubject,
  ConvertScoreToExcel,
} from "@/lib/Excel/generateExcelFile";
import { Download } from "lucide-react";

export const convertToExcelFormat = (
  data: GetStudentGroupGradeByScheduleSubjectIdResponse
): {
  convertedData: convertGradBySubjectId[];
  metadata: {
    term: string;
    year: string;
    subjectCode: string;
    subjectName: string;
    classroom: string;
  };
} => {
  const convertedData: convertGradBySubjectId[] = data.subjectGrades.map(
    (grade) => ({
      studentCode: grade.studentCode,
      name: `${grade.prefix} ${grade.firstName} ${grade.lastName}`,
      assignmentscore: grade.assignmentScore,
      collectScore: grade.collectScore,
      affectiveScore: grade.affectiveScore,
      midtermScore: grade.midtermScore,
      finaltermScore: grade.finaltermScore,
      finalGrade: grade.finalGrade,
      remarks: grade.remarks || "",
      status: grade.status,
    })
  );

  const filteredData = [...(convertedData ?? [])]
    .filter((s) => s.status !== "คัดชื่อออก" && s.status !== "ลาออก")
    .sort((a, b) =>
      a.studentCode.localeCompare(b.studentCode, "en", { numeric: true })
    );

  const metadata = {
    term: data.term,
    year: data.year.toString(),
    subjectCode: data.subjectCode,
    subjectName: data.subjectName,
    classroom: `${data.class}.${data.groupName}`,
  };

  return { convertedData: filteredData, metadata };
};

export const ExcelStudentNamelistInGroupButton = ({
  groupID,
}: {
  groupID: string;
}) => {
  const { data: studentData } = useGetStudentGroupByGroupIdQuery(groupID);

  const sortedStudents = [...(studentData?.students ?? [])]
    .filter((s) => s.status !== "คัดชื่อออก" && s.status !== "ลาออก")
    .sort((a, b) =>
      a.studentCode.localeCompare(b.studentCode, "en", { numeric: true })
    );

  const downloadExcel = async () => {
    ConvertClassroomToExcel(sortedStudents ?? [], studentData?.groupName || "");
  };

  return (
    <button
      className="flex h-fit px-8 border-[1px] border-gray-300 text-green-600 font-prompt_Light bg-white py-1.5
       hover:bg-blue-50 duration-300 text-sm rounded-md items-center justify-center gap-3"
      onClick={downloadExcel}
    >
      <Download className="text-green-600 w-5 h-5" />
      รายชื่อนักเรียน Excel
    </button>
  );
};

export const ExcelSubjectStudentNamelistInGroupButton = ({
  scheduleSubjectID
}: {
  scheduleSubjectID: number;
}) => {
  const {
    data: apiData,
    isLoading,
    error,
    refetch,
  } = useGetStudentGroupGradeByScheduleSubjectIdQuery(
    Number(scheduleSubjectID)
  );

  // Sort students by student code
  const sortedStudents = [...(apiData?.subjectGrades ?? [])]
    .filter((s) => s.status !== "คัดชื่อออก" && s.status !== "ลาออก")
    .sort((a, b) =>
      a.studentCode.localeCompare(b.studentCode, "en", { numeric: true })
    );

  const downloadExcel = async () => {
    if (!apiData) return;

    // Transform API data to Excel DTO format
    const studentsForExcel: ConvertClassroomToExcelDto[] = sortedStudents.map((student) => ({
      studentCode: student.studentCode,
      name: `${student.prefix}${student.firstName} ${student.lastName}`,
    }));

    const classroom = `${apiData.class}.${apiData.groupName}`;
    
    await ConvertClassroomToExcelWithSubject(
      studentsForExcel,
      apiData.subjectCode,
      apiData.subjectName,
      classroom
    );
  };

  // Handle loading and error states
  if (isLoading) {
    return (
      <button
        disabled
        className="flex h-fit px-8 border-[1px] border-gray-300 text-gray-400 font-prompt_Light bg-gray-100 py-1.5
         text-sm rounded-md items-center justify-center gap-3 cursor-not-allowed"
      >
        <Download className="text-gray-400 w-5 h-5" />
        กำลังโหลด...
      </button>
    );
  }

  if (error || !apiData) {
    return (
      <button
        disabled
        className="flex h-fit px-8 border-[1px] border-red-300 text-red-400 font-prompt_Light bg-red-50 py-1.5
         text-sm rounded-md items-center justify-center gap-3 cursor-not-allowed"
      >
        <Download className="text-red-400 w-5 h-5" />
        ไม่สามารถโหลดข้อมูลได้
      </button>
    );
  }

  return (
    <button
      className="flex h-fit px-8 border-[1px] border-gray-300 text-green-600 font-prompt_Light bg-white py-1.5
       hover:bg-blue-50 duration-300 text-sm rounded-md items-center justify-center gap-3"
      onClick={downloadExcel}
    >
      <Download className="text-green-600 w-5 h-5" />
      รายชื่อนักเรียน Excel
    </button>
  );
};


export const ExcelGradStudentGroup = ({
  scheduleSubjectId,
}: {
  scheduleSubjectId: number;
}) => {
  const { data } =
    useGetStudentGroupGradeByScheduleSubjectIdQuery(scheduleSubjectId);
  const downloadExcel = async () => {
    if (!data) {
      console.error("No data available for export");
      return;
    }

    try {
      const { convertedData, metadata } = convertToExcelFormat(data);
      await ConvertScoreToExcel(
        convertedData,
        metadata.term,
        metadata.year,
        metadata.subjectCode,
        metadata.subjectName,
        metadata.classroom
      );
    } catch (error) {
      console.error("Error exporting to Excel:", error);
    }
  };

  return (
    <button
      className="flex h-fit px-8 border-[1px] border-gray-300 text-green-600  font-prompt_Light bg-white py-1.5
       hover:bg-blue-50 duration-300 text-sm rounded-md items-center justify-center gap-3"
      onClick={downloadExcel}
      disabled={!data}
    >
      <Download className="text-green-600  w-5 h-5" />
      ใบคะแนน Excel
    </button>
  );
};
