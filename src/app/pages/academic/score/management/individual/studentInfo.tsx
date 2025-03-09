"use client";
import { fetchGetStudentGradeDetail } from "@/api/grad/gradAPI";
import { DataTable } from "@/app/components/bellTable/table_style_1";
import { LabelText } from "@/app/components/labelText/labelText";
import SummaryGradPDF from "@/app/components/PDF/SummaryGrade";
import { Badge } from "@/components/ui/badge";
import { GetStudentGradeDetailDto } from "@/dto/gradDto";
import { StudentTranscriptData, TermQuery, YearData } from "@/dto/studentDto";
import { getStudentDataById } from "@/resource/academics/grading/viewData/individualGradeViewData";
import { Loader2 } from "lucide-react";

import Link from "next/link";
import { useEffect, useState } from "react";

export function StudentInfoByIdPage(props: { studentId: number }) {
  const [studentTranscriptDataById, setStudentTranscriptDataById] =
    useState<StudentTranscriptData | null>(null);

  // const [term, setTerm] = useState<string>("1");
  // const [year, setYear] = useState<number>(2567);
  // const [loadingFile, setLoadingFile] = useState<boolean>(false);

  const [scoreFileData, setScoreFileData] =
    useState<GetStudentGradeDetailDto | null>();
    const [isLoadingPage, setIsLoadingPage] = useState<boolean>(false);

  const [termData, setTermData] = useState<YearData[]>([]);
  console.log("termData", termData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getStudentDataById(props.studentId);
        setStudentTranscriptDataById(data);
        setTermData(data.year);
        const data2 = await fetchGetStudentGradeDetail(props.studentId);
        setScoreFileData(data2);
        setIsLoadingPage(true)
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };
    fetchData();
  }, [props.studentId]);

  return (
    <div className=""> 
    {isLoadingPage ? (
      <div>
      <div className="flex justify-between w-full py-4">
        <Link
          href={
            "/pages/academic/student-details/" +
            studentTranscriptDataById?.studentId
          }
          className="grid align-middle lg:w-[800px] hover:bg-gray-50 duration-300   w-fit px-4 py-2 border  rounded-lg"
        >
          <div className="flex gap-8 items-center">
            <div className="bg-gray-600 text-white px-5 py-0.5 text-xl rounded-md">
              ข้อมูลนักเรียน
            </div>
            <div className="text-lg text-black">
              {studentTranscriptDataById?.class}.
              {studentTranscriptDataById?.groupName}
            </div>
          </div>
          <div className="flex items-center">
            <LabelText
              topic={"ชื่อ-นามสกุล"}
              data={`${studentTranscriptDataById?.thaiName} ${studentTranscriptDataById?.thaiLastName}`}
            />
            <LabelText
              topic={"รหัสนักเรียน"}
              data={`${studentTranscriptDataById?.studentCode}  (${props.studentId})`}
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
        <div className="px-5 ">
          <div className="flex items-center gap-2 py-3 ">
            {scoreFileData ? (
              <button
                className=" px-4 py-1 bg-sky-100 hover:bg-gray-300 rounded-md text-gray-700 text-center"
                onClick={() => {
                  SummaryGradPDF(scoreFileData);
                }}
              >
                <p>ดาวโหลดน์ผลการเรียน.pdf</p>
              </button>
            ) : (
              <div>ไม่มี</div>
            )}

            <button
              className=" px-4 py-1 bg-sky-100 cursor-not-allowed hover:bg-gray-300 rounded-md text-gray-700 text-center"
              // onClick={() => {
              //   GradPerTerms(scoreFileData);
              // }}
            >
              ดาวโหลดน์ Transcript.pdf
            </button>
          </div>
        </div>
      </div>
      <StudentTermTable termData={termData} />
      </div>
    ):(
      <div className="mt-2 border-2 border-dashed rounded-md border-gray-400 grid place-items-center py-20 text-3xl text-blue-400 font-semibold items-center">
          <p className="flex gap-2">
            <Loader2 className="h-10 w-10 animate-spin" />
            Loading...
          </p>
        </div>
    )}
      
    </div>
  );
}

function StudentTermTable({ termData }: { termData: YearData[] }) {
  return (
    <div className="">
      {termData.map((year, index) => {
        const transformedData = year.termQuery.map((term) => ({
          subject_name: term.subject_name,
          subject_code: term.subject_code,
          credit: term.credit,
          finalGrade: term.remark === "N/A" ? term.finalGrade : term.remark,
          // isNegative: term.remark !== "ผ" && Number(term.finalGrade) <= 0,
          // isPass: term.remark === "ผ",
        }));

        // Define columns after checking transformedData
        const columns = [
          {
            label: "รายวิชา",
            key: "subject_name",
            className: "w-5/12 px-4 py-2 text-left font-semibold",
          },
          {
            label: "รหัสวิชา",
            key: "subject_code",
            className: "w-2/12 px-4 py-2 text-center font-semibold",
          },
          {
            label: "หน่วยกิต",
            key: "credit",
            className: "w-2/12 px-4 py-2 text-center font-semibold",
          },
          {
            label: "เกรด",
            key: "finalGrade",
            className: "w-3/12 px-4 py-2 text-center font-semibold",
            render: (row: any) => (
              <span
                className={`px-2 py-1 rounded ${
                  row.isNegative
                    ? "bg-red-600 text-white"
                    : row.isPass
                    ? "bg-green-600 text-white"
                    : ""
                }`}
              >
                {row.finalGrade}
              </span>
            ),
          },
        ];

        const calculateGpa = (termQuery: TermQuery[], totalCredit: number) => {
          let totalGradePoints = 0;

          termQuery.forEach((term) => {
            if (!term.finalGrade || term.finalGrade === "N/A") {
              return;
            }

            const grade = parseFloat(term.finalGrade);
            const credit = parseFloat(term.credit);

            if (isNaN(grade) || isNaN(credit)) {
              return;
            }

            totalGradePoints += grade * credit;
          });

          if (totalCredit <= 0) return "0.00";

          const gpa = totalGradePoints / totalCredit;
          return gpa.toFixed(2);
        };

        return (
          <div key={index} className="mb-6 border p-4 rounded-lg">
            <div className="mx-6 justify-between flex text-xl">
              <Badge variant={"outline"}>
                <h3 className="text-lg font-bold ">
                  ปีการศึกษา {year.year} เทอม {year.term.slice(0, 1)}
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
              pagination={year.termQuery.length}
              onRowClick={(item: any) => console.log("Clicked row: ", item)}
            />
          </div>
        );
      })}
    </div>
  );
}
