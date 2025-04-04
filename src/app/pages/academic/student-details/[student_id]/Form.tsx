"use client";
import { fetchGetStudentGradeByTermYear } from "@/api/grad/gradAPI";
import {
  fetchGetAllStudentGroup,
  fetchGetStudentByStudentId,
} from "@/api/student/studentApi";
import GenTranscript from "@/app/components/PDF/genTranscript";
import GradPerTerms from "@/app/components/PDF/GradPerTerm";
import ChangeStudentGroup from "@/app/components/popup/changeStudentGroup";
import ConfirmChangeStudentsStatus from "@/app/components/popup/confirmChangeStudentsStatus";
import { GetGradPerTermByStudentIdDto } from "@/dto/gradDto";
import { GetStudentByStudentId, StudentGroup } from "@/dto/studentDto";
import { educationOptions } from "@/resource/academics/options/studentOption";
import { CircleX, Pencil, Save, UserRound } from "lucide-react";
import React, { useEffect, useState } from "react";
type Props = {
  studentId: number;
};

const getStudentGroupData = async () => {
  try {
    const response = await fetchGetAllStudentGroup();
    return response;
  } catch (err) {
    return [];
  }
};

const fetchStudentGrad = async (
  studentId: number,
  term: string,
  year: number
) => {
  try {
    const data = await fetchGetStudentGradeByTermYear(studentId, term, year);
    return data;
  } catch (err) {
    console.error("Failed to fetch data.");
    return [];
  }
};

const fetchStudentData = async (studentId: number) => {
  try {
    const data = await fetchGetStudentByStudentId(studentId);
    return data;
  } catch (err) {
    return null;
  }
};

export default function Form({ studentId }: Props) {
  const [onEdit, setOnEdit] = useState<boolean>(false);
  const [grads, setGrad] = useState<GetGradPerTermByStudentIdDto | null>();
  const [students, setStudent] = useState<GetStudentByStudentId>();
  const [educateStatus, setEducateStatus] = useState(students?.studentStatus || "");
  const [allGroup, setAllGroup] = useState<StudentGroup[]>([]);
  const [term, setTerm] = useState<string>("1");
  const [year, setYear] = useState<number>(2567);
  const [groupID, setGroupID] = useState<number>(0);
  const [promoteTrigger, setPromoteTrigger] = useState<boolean>(false);
  const [submitStudentStatus, setSubmitStudentStatus] =
    useState<boolean>(false);
  const [changeGroupPopUp, setChangeGroupPopUp] = useState<boolean>(false);
  useEffect(() => {
    fetchStudentGrad(studentId, term, year).then((d: any) => {
      setGrad(d);
    });
    fetchStudentData(studentId).then((d: any) => {
      setStudent(d);
    });
    getStudentGroupData().then((d: StudentGroup[]) => {
      setAllGroup(d);
    });
  }, []);

  const handleEditChange = () => {
    setOnEdit((onEdit) => !onEdit);
  };

  useEffect(() => {
    getStudentGroupData().then((d: StudentGroup[]) => {
      setAllGroup(d);
    });
    fetchStudentGrad(studentId, term, year).then((d: any) => {
      setGrad(d);
    });
  }, [term, year]);
  useEffect(() => {
    if (students?.studentStatus) {
      setEducateStatus(students.studentStatus);
    }
  }, [students]);

  const groupOptions = allGroup.map((item) => ({
    value: item.studentGroupId,
    label: `${item.class}.${item.studentGroupName}`,
  }));

  // const handleGroupChange = (
  //   selectedOption: { value: number; label: string } | null
  // ) => {
  //   if (selectedOption) {
  //     const selectedGroup = allGroup.find(
  //       (item) => item.studentGroupId === selectedOption.value
  //     );
  //     if (selectedGroup) {
  //       setGroupID(selectedGroup.studentGroupId);
  //       setPromoteTrigger(true);
  //     }
  //   } else {
  //     setGroupID(0);
  //   }
  // };

  return (
    <div className="px-10">
      <div className="flex justify-between my-5">
        <div className="rounded-3xl t flex gap-2 items-center  border border-gray-100 shadow-md  py-2 text-blue-700 text-xl w-fit px-5  ">
          <UserRound className="w-8 h-8" />
          รายละเอียดนักเรียน
        </div>
        <div className="flex gap-4">
          {grads ? (
            <button
              className="text-md bg-[#e4f1f8] text-gray-700 hover:bg-gray-200 rounded-md px-5 py-2 h-fit"
              onClick={() => {
                GradPerTerms(grads);
              }}
            >
              ดาวโหลดน์ผลการเรียนล่าสุด
            </button>
          ) : (
            <div className="text-md bg-[#e4f1f8] text-gray-700 rounded-md px-5 py-2 h-fit">
              รอทราบผลเกรด
            </div>
          )}

          <button
            className="text-md bg-[#e4f1f8] text-gray-700 hover:bg-gray-200 rounded-md px-5 py-2 shadow-sm shadow-slate-300 h-fit"
            onClick={() => GenTranscript({ score: 10 })}
          >
            ดาวน์โหลดน์ Transcript.pdf
          </button>
          <button className="text-md bg-[#e4f1f8] text-gray-700 hover:bg-gray-200 rounded-md px-5 py-2 shadow-sm shadow-slate-300 h-fit cursor-not-allowed">
            ประวัติส่วนตัว.pdf
          </button>
        </div>
      </div>

      <div className="w-full flex justify-end my-2">
        {onEdit ? (
          <div className="flex gap-2">
            <button
              className="w-[120px] h-fit bg-green-500 rounded-md items-center hover:opacity-75 pl-2 gap-2 flex justify-center py-1 text-white "
              // onClick={handleEditChange}
            >
              {" "}
              <Save className="w-5 h-5" />
              บันทึก
            </button>{" "}
            <button
              className="w-[120px] h-fit bg-red-500 rounded-md hover:opacity-75 pl-2 gap-2 flex justify-center items-center py-1 text-white "
              onClick={handleEditChange}
            >
              <CircleX className="w-5 h-5" />
              ยกเลิก
            </button>{" "}
          </div>
        ) : (
          <button
            className="w-[120px] h-fit bg-blue-400 rounded-md items-centerhover:opacity-75 pl-2 gap-2 flex justify-center py-1 items-center text-white "
            onClick={handleEditChange}
          >
            {" "}
            <Pencil className="w-5 h-5" />
            แก้ไข
          </button>
        )}
      </div>
      <div className="w-full flex justify-start gap-5 items-center">
        <div className="gap-8 flex justify-start items-center  w-fit">
          <div className="w-fit items-center flex gap-3">
            <div className="w-[100px]">สถานะนักเรียน</div>
            <select
              className="border border-gray-300 rounded-sm px-4 py-1"
              onChange={(e) => setEducateStatus(e.target.value)}
              value={educateStatus}
            >
              <option value={educateStatus}>{educateStatus}</option>
              {educationOptions
                .filter((option) => option !== educateStatus)
                .map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
            </select>
            <button
              className="px-5 text-white enabled:bg-slate-500 enabled:hover:bg-slate-600  bg-gray-300 rounded-md py-1 "
              disabled={!educateStatus}
              onClick={() => {
                setSubmitStudentStatus(!submitStudentStatus);
              }}
            >
              ปรับสถานะ
            </button>
          </div>
        </div>
        <button
          className="w-fit py-1 px-4 rounded-md bg-slate-500 text-white hover:bg-slate-600 "
          onClick={() => setChangeGroupPopUp(!changeGroupPopUp)}
        >
          ย้ายห้องเรียน
        </button>
      </div>
      <div className="pt-4 w-full">
        <div className="relative rounded-md border-t shadow-gray-300 w-fit shadow-md  bg-white ">
          <div className="grid gap-4 px-10 py-10">
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-2">
                <p className="w-[100px]">รหัสนักเรียน</p>
                <input
                  type="text"
                  className="px-4 w-[150px] focus:outline-blue-400 py-1.5 rounded-sm border border-gray-300"
                  defaultValue={students?.studentCode}
                />
              </div>
              <div className="flex items-center gap-2">
                <p className="">ชั้นปี</p>
                <div className="px-4 border-gray-300 border bg-white py-1.5 rounded-sm">
                  {students?.class}.{students?.currentRoom}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <p className="w-[100px]">ชื่อ - นามสกุล</p>
              <input
                type="text"
                className="px-4 w-[150px] focus:outline-blue-400 py-1.5 rounded-sm border border-gray-300"
                defaultValue={students?.thaiName}
              />
              <input
                type="text"
                className="px-4 focus:outline-blue-400 w-[150px]  py-1.5 rounded-sm border border-gray-300"
                defaultValue={students?.thaiLastName}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="py-5 ">
        <div className="grid w-full border px-4 py-4"></div>
      </div>
      {submitStudentStatus && students?.studentId && (
        <ConfirmChangeStudentsStatus
          onClickPopUp={(value) => setSubmitStudentStatus(value)}
          status={educateStatus}
          studentId={students.studentId}
        />
      )}
      {changeGroupPopUp && students?.studentId && (
        <ChangeStudentGroup 
        onClickPopUp={(value)=>setChangeGroupPopUp(value)}
        studentId={students?.studentId}
        />
      )}
    </div>
  );
}
