"use client";

import { Combobox } from "@/app/components/combobox/combobox";
import { ClassroomByGroupIdProps } from "./main";
import { GetStudentByGroupId } from "@/dto/studentDto";
import { useEffect, useMemo, useState } from "react";
import { getGroupSummaryGradeViewData } from "@/resource/academics/grading/viewData/classroomByGroupIdViewData";
import { GetSubjectByGroupId } from "@/dto/subjectDto";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/app/components/bellTable/table_style_1";

export interface GeneralData {
  groupId: number;
  groupName: string;
  groupCode: string;
  class: string;
  facultyName: string;
  programName: string;
  term: string;
  year: number;
}

export interface StudentList {
  studentId: number;
  studentCode: string;
  name: string;
  gpa: number;
  gpax: number;
  totalCredit: number;
  subjects: Record<string, string>;
}

export interface GroupSummaryGradeResponse {
  generalData: GeneralData;
  students: StudentList[];
  subjects: string[];
}

export function ClassroomByGroupId(data: ClassroomByGroupIdProps) {
  const [summaryData, setSummaryData] =
    useState<GroupSummaryGradeResponse | null>(null);

  const [selectedGPA, setSelectedGPA] = useState<string>("");
  const [selectedGPAX, setSelectedGPAX] = useState<string>("");

  // filter data
  const filteredData = useMemo(() => {
    if (!summaryData) return [];

    const filtered = summaryData.students.filter((student) => {
      const matchGPA = selectedGPA
        ? student.gpa >= parseFloat(selectedGPA.split("-")[0]) &&
          student.gpa <= parseFloat(selectedGPA.split("-")[1])
        : true;
      const matchGPAX = selectedGPAX
        ? student.gpax >= parseFloat(selectedGPAX.split("-")[0]) &&
          student.gpax <= parseFloat(selectedGPAX.split("-")[1])
        : true;

      return matchGPA && matchGPAX;
    });

    // Sort data by student ID or another relevant key
    return filtered.sort((a, b) => a.studentId - b.studentId);
  }, [summaryData, selectedGPA, selectedGPAX]);

  // get data from api
  useEffect(() => {
    const fetchData = async () => {
      const result = await getGroupSummaryGradeViewData(
        data.groupId,
        data.term,
        data.year
      );
      setSummaryData(result);
    };
    fetchData();
  }, []);

  const baseColumns = [
    { label: "ลำดับ", key: "index", className: "w-1/16" },
    { label: "รหัสนักศึกษา", key: "studentCode", className: "w-1/16" },
    { label: "ชื่อ-นามสกุล", key: "name", className: "w-2/16" },
  ];
  const subjectColumns = summaryData?.subjects.map((subject) => ({
    label: subject,
    key: subject,
    className: "w-1/16 text-center",
  }));
  const GradeColumns = [
    { label: "เฉลี่ย", key: "gpa", className: "w-1/16" },
    { label: "เฉลี่ยสะสม", key: "gpax", className: "w-1/16" },
  ];
  const finalColumns = [
    ...baseColumns,
    ...(subjectColumns ?? []),
    ...GradeColumns,
  ];

  return (
    <>
      <header className="flex flex-col  p-4 border-2 mt-4 rounded-lg">
        {/* filter classroom have a name , gpa filter 0-4 , gpax filter */}
        <div className="flex gap-10 mt-4">
          <Badge variant={"outline"}>
            <h1 className="text-xl">
              สรุปการศึกษา ภาคเรียนที่ {data.term} ปีการศึกษา {data.year}{" "}
              ห้องเรียน {summaryData?.generalData.groupCode}{" "}
            </h1>
          </Badge>
        </div>
        <div className="flex gap-10 mt-4">
          <div className="w-1/6 ">
            <Combobox
              buttonLabel="GPA"
              options={[
                { label: "0 - 1", value: "0-1" },
                { label: "1 - 2", value: "1-2" },
                { label: "2 - 3", value: "2-3" },
                { label: "3 - 4", value: "3-4" },
              ]}
              onSelect={(value) => setSelectedGPA(value)}
            />
          </div>
          <div className="w-1/6">
            <Combobox
              buttonLabel="GPAX "
              options={[
                { label: "0 - 1", value: "0-1" },
                { label: "1 - 2", value: "1-2" },
                { label: "2 - 3", value: "2-3" },
                { label: "3 - 4", value: "3-4" },
              ]}
              onSelect={(value) => setSelectedGPAX(value)}
            />
          </div>
        </div>
        <div className="mt-4">
          <DataTable
            columns={finalColumns}
            data={
              filteredData.map((student, index) => ({
                index: index + 1,
                studentCode: student.studentCode,
                name: student.name,
                gpa: student.gpa.toFixed(2),
                gpax: student.gpax.toFixed(2),
                ...student.subjects,
              })) || []
            }
            pagination={summaryData?.students.length || 0}
          />
        </div>
      </header>
    </>
  );
}
