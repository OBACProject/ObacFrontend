"use client";
import { fetchGetGradPerTermByStudentId } from "@/api/grad/gradAPI";
import { DataTable } from "@/app/components/bellTable/table_style_1";
import { LabelText } from "@/app/components/labelText/labelText";
import GradPerTerms from "@/app/components/PDF/GradPerTerm";
import { Badge } from "@/components/ui/badge";
import { GetGradPerTermByStudentIdDto } from "@/dto/gradDto";
import { StudentTranscriptData, TermQuery, YearData } from "@/dto/studentDto";
import { getStudentDataById } from "@/resource/academics/grading/viewData/individualGradeViewData";
import Link from "next/link";
import { useEffect, useState } from "react";

export function StudentInfoByIdPage(props: { studentId: number }) {
  const [studentTranscriptDataById, setStudentTranscriptDataById] =
    useState<StudentTranscriptData | null>(null);

  const [term, setTerm] = useState<string>("");
  const [year, setYear] = useState<number>(0);
  // const [scoreFileData , setScoreFileData] = useState<GetGradPerTermByStudentIdDto[]>([])
  const [scoreFileData, setScoreFileData] =
    useState<GetGradPerTermByStudentIdDto>();
  //   {
  //   studentId: 1,
  //   studentCode: "S001001",
  //   firstName: "จอห์น",
  //   lastName: "โด",
  //   facultyName: "บริหารธุรกิจ",
  //   programName: "การเงินและบัญชี",
  //   class: "ปวช",
  //   groupName: "1/1",
  //   isActive: true,
  //   term: "1",
  //   year: 2024,
  //   gpa: 3.625,
  //   gpax: 3.625,
  //   totalCredit: 4,
  //   subject: [
  //     {
  //       subjectName: "การบัญชีเบื้องต้น",
  //       subjectCode: "ACC101",
  //       grade: "4.00",
  //       credit: 1,
  //     },
  //     {
  //       subjectName: "การบัญชีชั้นสูง",
  //       subjectCode: "ACC102",
  //       grade: "3.50",
  //       credit: 3,
  //     },
  //   ],
  // }

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

  // useEffect(()=>{
  //   const fetchData = async () => {
  //     try {
  //       const data = await fetchGetGradPerTermByStudentId(props.studentId , term , year);
  //       setScoreFileData(data)
  //     } catch (error) {
  //       console.error("Error fetching student data:", error);
  //     }
  //   };
  //   fetchData();
  // },[term,year])

  return (
    <div className="">
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
        <div className="px-5 ">
          <div className="w-full flex gap-4 items-center">
            <div className="flex gap-2 items-center">
              <div>เทอม</div>
              <select
                className="px-2 py-1 border border-gray-300 rounded-md"
                onChange={(e) => setTerm(e.target.value)}
                value={term}
              >
                <option value="1">1</option>
                <option value="2">2</option>
              </select>
            </div>
            <div className="flex w-full gap-2 items-center">
              <div>ปีการศึกษา</div>
              <select
                className="px-2 py-1 border border-gray-300 rounded-md"
                onChange={(e) => setYear(Number(e.target.value))}
                value={year}
              >
                <option value={2567}>2567</option>
                <option value={2566}>2566</option>
                <option value={2565}>2565</option>
              </select>
            </div>
          </div>
          <div className="flex items-center gap-2 py-3 ">
            {scoreFileData ? (
              <button
                className=" px-4 py-1 bg-sky-100 hover:bg-gray-300 rounded-md text-gray-700 text-center"
                onClick={() => {
                  GradPerTerms(scoreFileData);
                }}
              >
                ดาวโหลดน์ผลการเรียน.pdf
              </button>
            ) : (
              <button className=" px-4 py-1 bg-red-100  rounded-md text-gray-700 text-center">
                ไม่มีข้อมูลคะแนน
              </button>
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
  );
}

function StudentTermTable({ termData }: { termData: YearData[] }) {
  console.log(termData);
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

            console.log("grade", grade);
            console.log("credit", credit);
            totalGradePoints += grade * credit;
            console.log("totalGradePoints", totalGradePoints);
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
              pagination={10}
              onRowClick={(item: any) => console.log("Clicked row: ", item)}
            />
          </div>
        );
      })}
    </div>
  );
}
