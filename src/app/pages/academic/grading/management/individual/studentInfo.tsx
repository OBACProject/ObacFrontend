"use client";
import { DataTable } from "@/app/components/bellTable/table_style_1";
import { LabelText } from "@/app/components/labelText/labelText";
import { Badge } from "@/components/ui/badge";
import { StudentTranscriptData, TermQuery, YearData } from "@/dto/studentDto";
import { getStudentDataById } from "@/resource/academics/grading/viewData/individualGradeViewData";
import Link from "next/link";
import { useEffect, useState } from "react";

export function StudentInfoByIdPage(props: { studentId: number }) {
  const [studentTranscriptDataById, setStudentTranscriptDataById] =
    useState<StudentTranscriptData | null>(null);

  const [termData, setTermData] = useState<YearData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getStudentDataById(props.studentId);
        setStudentTranscriptDataById(data);
        setTermData(data.year);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };
    fetchData();
  }, [props.studentId]);

  return (
    <div className="">
      <div className="flex justify-between w-full py-4">
        <Link
          href={
            "/pages/academic/student-details/" +
            studentTranscriptDataById?.studentId
          }
          className="grid align-middle lg:w-[800px] hover:bg-gray-50 duration-300   w-fit p-4 border  rounded-lg"
        >
          <div className="px-5 py-1 text-lg font-semibold rounded-sm text-black border ">
            ข้อมูลนักเรียน
          </div>
          <div className="flex items-center">
            <LabelText
              topic={"ชื่อ-นามสกุล"}
              data={`${studentTranscriptDataById?.thaiName} ${studentTranscriptDataById?.lastName}`}
            />
            <LabelText
              topic={"รหัสนักเรียน"}
              data={`${studentTranscriptDataById?.studentCode}`}
            />
          </div>
          <div className="flex items-center">
            <LabelText
              topic={"หลักสูตร"}
              data={`${studentTranscriptDataById?.programName}`}
            />
            <LabelText
              topic={"สาขาวิชา"}
              data={`${studentTranscriptDataById?.subProgramName}`}
            />
          </div>
        </Link>
        <div className="px-40 py-10 border border-gray-300 rounded-md">
          ไว้วางไฟล์
        </div>
      </div>

      <StudentTermTable termData={termData} />
    </div>
  );
}

function StudentTermTable({ termData }: { termData: YearData[] }) {
  return (
    <div className="">
      {termData.map((year, index) => {
        const columns = [
          { label: "รายวิชา", key: "subject_name", className: "w-5/12" },
          { label: "รหัสวิชา", key: "subject_code", className: "w-2/12" },
          { label: "หน่วยกิต", key: "credit", className: "w-2/12" },
          { label: "เกรด", key: "finalGrade", className: "w-3/12" },
        ];

        const transformedData = year.termQuery.map((term) => ({
          subject_name: term.subject_name,
          subject_code: term.subject_code,
          credit: term.credit,
          finalGrade: term.finalGrade,
        }));

        // GPA = Sum(FinalGrade  * subj.Credits ) / yearTermGroup.Sum(subj.Credits)
        const calculateGpa = (termQuery: TermQuery[], totalCredit: number) => {
          let totalGradePoints = 0;

          termQuery.forEach((term) => {
            const grade = parseFloat(parseFloat(term.finalGrade).toFixed(2));
            const credit = parseFloat(parseFloat(term.credit).toFixed(2));

            totalGradePoints += grade * credit;
          });

          if (totalCredit === 0) return "0.00";

          const gpa = totalGradePoints / totalCredit;
          return gpa.toFixed(2);
        };

        return (
          <div key={index} className="mb-6 border p-4 rounded-lg">
            <div className="mx-6 justify-between flex text-xl">
              <Badge variant={"outline"}>
                <h3 className="text-lg font-bold ">
                  ปีการศึกษา {year.year} เทอม {year.term}
                </h3>
              </Badge>
              <Badge variant={"outline"}>
                <h3 className="text-lg font-bold ">
                  GPA: {calculateGpa(year.termQuery, year.totalCredit)}
                </h3>
              </Badge>
            </div>

            <DataTable
              columns={columns}
              data={transformedData}
              pagination={5}
              onRowClick={(item: any) => console.log("Clicked row: ", item)}
            />
          </div>
        );
      })}
    </div>
  );
}
