"use client";
import GenStudentNameList from "@/app/components/PDF/genStudentNameList";
import GenSubjectScore from "@/app/components/PDF/genSubjectScore";
import { GetGradBySubjectId, convertGradBySubjectId } from "@/dto/gradDto";
import { GetScheduleBysubjectId } from "@/dto/schedule";
import { GetSubjectBySubjectId } from "@/dto/subjectDto";
import { ConvertToExcel } from "@/lib/convertToExcel";
import { useEffect, useState } from "react";
interface Props {
  grads?: GetGradBySubjectId[];
  schedules?: GetScheduleBysubjectId;
  subjects: GetSubjectBySubjectId;
  onEditReturn: (data: boolean) => void;
}

export default function MenuBar({
  schedules,
  grads,
  subjects,
  onEditReturn,
}: Props) {
  const [gradData, setGradData] = useState<GetGradBySubjectId[]>([]);
  const [scheduleData, setSchedules] = useState<GetScheduleBysubjectId>();
  const [subjectData, setSubject] = useState<GetSubjectBySubjectId>();

  const convertGrad: convertGradBySubjectId[] = gradData.map((item) => ({
    studentCode: item.studentCode,
    name: item.firstName + " " + item.lastName,
    collectScore: item.collectScore,
    testScore: item.testScore,
    affectiveScore: item.affectiveScore,
    totalScore: item.totalScore,
  }));

  useEffect(() => {
    setGradData(grads ?? []);
  }, grads);
  useEffect(() => {
    setSchedules(schedules);
    setSubject(subjects);
  }, []);
  let student_group_list = [];
  for (let i = 1; i < gradData.length; i++) {
    student_group_list.push(gradData[i].studentGroup);
  }

  const handleEditChange = () => {
    onEditReturn(true);
  };
  return (
    <div className="bg-white border-[1px] border-gray-200 px-5 py-2">
      <div className="grid grid-cols-[70%_30%]">
        <div className="grid grid-cols-[40%_60%] ">
          <div className="rounded-md bg-blue-900 text-white py-3 mr-4">
            <span className=" text-xl px-5 py-1 mt-2 ">
              รหัสวิชา : {subjectData?.subjectCode}
            </span>
            <span className="text-md text-gray-500 font-semibold bg-white rounded-sm ml-2 text-center py-1 w-fit px-2">
              กลุ่มเรียน : {student_group_list[0]}{" "}
            </span>
            <div className="px-5   text-2xl rounded-md py-2">
              วิชา : {subjectData?.subjectName}
            </div>
          </div>
          <div className="text-2xl border-2 grid place-items-center border-gray-400 border-dashed rounded-md  font-semibold text-center">
            พื้นที่ประกาศ
          </div>
        </div>
        <div className="grid row-2 gap-2 p-2">
          <div className="flex justify-end gap-3">
            <button
              className="text-md bg-[#e4f1f8] text-gray-600 hover:bg-gray-200 rounded-md px-5 py-2"
              onClick={() => {
                GenSubjectScore({ grads: grads });
              }}
            >
              ดาวน์โหลดใบคะแนน
            </button>
            <button
              className=" text-md text-gray-600 hover:bg-gray-200 bg-[#e4f1f8] rounded-md px-5 py-2"
              onClick={() => {
                GenStudentNameList({ grads: grads });
              }}
            >
              ดาวน์โหลดรายชื่อนักเรียน
            </button>
            <button
              className=" text-md text-gray-600 hover:bg-gray-200 bg-[#e4f1f8] rounded-md px-5 py-2"
              onClick={async () => {
                ConvertToExcel(
                  convertGrad,
                  String(scheduleData?.term ?? ""),
                  String(scheduleData?.year ?? ""),
                  subjectData?.subjectCode || "",
                  subjectData?.subjectName || "",
                  student_group_list[0] || ""
                );
              }}
            >
              ดาวน์โหลดใบคะแนนนักเรียน excel
            </button>
          </div>

          <div className="flex justify-end gap-3">
            <button
              className="duration-300 text-white  text-lg px-10 border-blue-400     rounded-md hover:opacity-75 py-1 hover:rounded-sm bg-blue-400"
              onClick={handleEditChange}
            >
              แก้ไข
            </button>
            {/* <button
              className="duration-300  text-md rounded-md  px-10 border-gray-200 border-[1px] hover:text-gray-700 hover:rounded-sm hover:bg-blue-200"
              onClick={() => {
                GenTranscript({ score: 50 });
              }}
            >
              บันทึก
            </button> */}
          </div>
        </div>
      </div>
      <div className="place-items-end"></div>
    </div>
  );
}
