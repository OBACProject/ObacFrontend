"use client";

import { Combobox } from "@/app/components/combobox/combobox";
import { ClassroomByGroupIdProps } from "./main";
import { useEffect, useMemo, useState } from "react";
import { getGroupSummaryGradeViewData } from "@/resource/academics/grading/viewData/classroomByGroupIdViewData";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/app/components/bellTable/table_style_1";
import { ConvertClassroomGradingToExcel } from "@/lib/convertToExcel";
import { useRouter } from "next/navigation";
import TotalScoreInGroup, {
  DataList,
} from "@/app/components/PDF/TotalScoreInGroup";
import { Loader2 } from "lucide-react";

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

export interface StudentInRowClick {
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

interface IndividualStudentInfoData {
  studentId: number;
  studentName: string;
}

export function ClassroomByGroupId(data: ClassroomByGroupIdProps) {
  const rounter = useRouter();
  const [summaryData, setSummaryData] =
    useState<GroupSummaryGradeResponse | null>(null);

  const [selectedGPA, setSelectedGPA] = useState<string>("");
  const [selectedGPAX, setSelectedGPAX] = useState<string>("");
  const [isLoadingPage, setIsLoadingPage] = useState<boolean>(false);
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
      setIsLoadingPage(true);
    };
    fetchData();
  }, []);

  const baseColumns = [
    { label: "ลำดับ", key: "index", className: "w-1/16 justify-center" },
    { label: "รหัสนักศึกษา", key: "studentCode", className: "w-2/16" },
    { label: "ชื่อ-นามสกุล", key: "name", className: "w-2/16 text-start" },
  ];
  // const subjectColumns = summaryData?.subjects.map((subject) => ({
  //   label: subject,
  //   key: subject,
  //   className: "w-1/16 text-center",
  // }));

  const subjectColumns = Array.from({ length: 10 }, (_, index) => {
    if (summaryData?.subjects && index < summaryData.subjects.length) {
      return {
        label: summaryData.subjects[index],
        key: summaryData.subjects[index],
        className: "w-1/16 justify-center overflow-hidden",
      };
    } else {
      return {
        label: "",
        key: `empty_${index}`,
        className: "w-1/16 justify-center",
      };
    }
  });

  const GradeColumns = [
    { label: "เฉลี่ย", key: "gpa", className: "w-1/16 justify-center" },
    { label: "เฉลี่ยสะสม", key: "gpax", className: "w-1/16 justify-center" },
  ];
  const finalColumns = [
    ...baseColumns,
    ...(subjectColumns ?? []),
    ...GradeColumns,
  ];

  const handleExportToExcel = async () => {
    if (summaryData) {
      ConvertClassroomGradingToExcel(
        summaryData.generalData,
        summaryData.students
      );
    } else {
      console.error("Summary data is not available");
    }
  };
  const onRowClick = (studentCode: string) => {
    const studentData: IndividualStudentInfoData = {
      studentId:
        summaryData?.students.find(
          (student) => student.studentCode === studentCode
        )?.studentId || 0,
      studentName:
        summaryData?.students.find(
          (student) => student.studentCode === studentCode
        )?.name || "",
    };

    localStorage.setItem("activeTabStudent", "individualStudentInfo");
    localStorage.setItem("selectedStudentData", JSON.stringify(studentData));
    rounter.push(`/pages/academic/score/management/individual`);
  };

  const convertTOPDFData: DataList = {
    generalData: summaryData?.generalData
      ? {
          groupId: summaryData.generalData.groupId,
          groupName: summaryData.generalData.groupName,
          groupCode: summaryData.generalData.groupCode,
          class: summaryData.generalData.class,
          facultyName: summaryData.generalData.facultyName,
          programName: summaryData.generalData.programName,
          term: summaryData.generalData.term,
          year: summaryData.generalData.year,
        }
      : {
          groupId: 0,
          groupName: "",
          groupCode: "",
          class: "",
          facultyName: "",
          programName: "",
          term: "",
          year: 0,
        },
    studentList: summaryData?.students || [],
  };

  return (
    <>
      {isLoadingPage ? (
        <header className="flex flex-col  px-2 py-4 border-2 mt-4 rounded-lg">
          {/* filter classroom have a name , gpa filter 0-4 , gpax filter */}
          <div className="flex gap-10  justify-between">
            <Badge variant={"outline"}>
              <h1 className="text-xl">
                สรุปการศึกษา ภาคเรียนที่ {data.term} ปีการศึกษา {data.year}{" "}
                ห้องเรียน {summaryData?.generalData.class}.
                {summaryData?.generalData.groupName}{" "}
              </h1>
            </Badge>
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  TotalScoreInGroup(convertTOPDFData);
                }}
                className="text-md text-gray-600 hover:bg-gray-200 bg-[#e4f1f8] rounded-md px-5 py-2"
              >
                ใบตรวจเกรด {summaryData?.generalData.class}.
                {summaryData?.generalData.groupName} .pdf
              </button>
              <button
                onClick={handleExportToExcel}
                className="text-md text-gray-600 hover:bg-gray-200 bg-[#e4f1f8] rounded-md px-5 py-2"
              >
                เกรดนักเรียนห้อง {summaryData?.generalData.class}.
                {summaryData?.generalData.groupName} Excel
              </button>
            </div>
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
              // isEdit={true}
              onRowClick={(student) => onRowClick(student.studentCode)}
              pagination={summaryData?.students.length || 0}
            />
          </div>
          {/* <StudentPopup
          isOpen={isOpenPopUp}
          onClose={() => setIsOpenPopUp(false)}
          student={selectedStudent}
          subjects={summaryData?.subjects || []}
        /> */}
        </header>
      ) : (
        <div className="mt-2 border-2 border-dashed rounded-md border-gray-400 grid place-items-center py-20 text-3xl text-blue-400 font-semibold items-center">
          <p className="flex gap-2">
            <Loader2 className="h-10 w-10 animate-spin" />
            Loading...
          </p>
        </div>
      )}
    </>
  );
}
