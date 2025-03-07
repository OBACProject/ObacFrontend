"use client";
import { fetchGetGradPerTermByStudentId } from "@/api/grad/gradAPI";
import {
  fetchGetAllStudentGroup,
  fetchGetStudentByStudentId,
} from "@/api/student/studentApi";
import GenTranscript from "@/app/components/PDF/genTranscript";
import GradPerTerms from "@/app/components/PDF/GradPerTerm";
import { GetGradPerTermByStudentIdDto } from "@/dto/gradDto";
import { GetStudentByStudentId, StudentGroup } from "@/dto/studentDto";
import { CircleX, Pencil, Save, UserRound } from "lucide-react";
import React, { useEffect, useState } from "react";
import Select from "react-select";
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
    const data = await fetchGetGradPerTermByStudentId(studentId, term, year);
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
  const [educateStatus, setEducateStatus] = useState<string>("");
  const [allGroup, setAllGroup] = useState<StudentGroup[]>([]);
  const [term, setTerm] = useState<string>("2");
  const [year, setYear] = useState<number>(2567);
  const [groupID, setGroupID] = useState<number>(0);
  const [promoteTrigger, setPromoteTrigger] = useState<boolean>(false);
  useEffect(() => {
    fetchStudentGrad(studentId, term, year).then((d : any) => {
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
    fetchStudentGrad(studentId, term, year).then((d:any) => {
      setGrad(d);
    });
  }, [term, year]);

  const groupOptions = allGroup.map((item) => ({
    value: item.studentGroupId,
    label: `${item.class}.${item.studentGroupName}`,
  }));

  const handleGroupChange = (
    selectedOption: { value: number; label: string } | null
  ) => {
    if (selectedOption) {
      const selectedGroup = allGroup.find(
        (item) => item.studentGroupId === selectedOption.value
      );
      if (selectedGroup) {
        setGroupID(selectedGroup.studentGroupId);
        setPromoteTrigger(true);
      }
    } else {
      setGroupID(0);
    }
  };
  return (
    <div className="px-10">
      <div className="flex justify-between my-5">
        <div className="rounded-3xl text-white bg-teal-600 flex gap-2 items-center  border-slate-300 text-xl w-fit px-5 py-2 ">
          <UserRound className="w-8 h-8" />
          รายละเอียดนักเรียน
        </div>
        <div className="flex gap-4">
          {grads? (
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

      <div className="w-full flex justify-between my-2">
        <div className="w-full items-center  flex gap-3">
          {/* <label className="w-[90px] ">ปรับเลื่อนชั้น</label> */}
          <select
            className="border border-gray-300 rounded-sm px-4 py-2"
            onChange={(e) => setTerm(e.target.value)}
            value={term}
          >
            <option value="">เทอม</option>
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
          <select
            className="border border-gray-300 rounded-sm px-4 py-2"
            onChange={(e) => setYear(Number(e.target.value))}
            value={year}
          >
            <option value="">ปีการศึกษา</option>
            <option value={2567}>2567</option>
            <option value={2568}>2568</option>
          </select>
          <Select
            options={groupOptions}
            value={groupOptions.find(
              (option) => option.value === groupID || null
            )}
            onChange={handleGroupChange}
            isSearchable
            placeholder="-- เลือกกลุ่มนักเรียน --"
          />
          <button
            className="px-5 text-white enabled:bg-green-500 enabled:hover:bg-green-600  bg-gray-300 rounded-md py-1 "
            disabled={!promoteTrigger}
          >
            เลื่อนชั้น
          </button>
        </div>
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
            className="w-[120px] h-fit bg-blue-400 rounded-md items-centerhover:opacity-75 pl-2 gap-2 flex justify-center py-1 text-white "
            onClick={handleEditChange}
          >
            {" "}
            <Pencil className="w-5 h-5" />
            แก้ไข
          </button>
        )}
      </div>

      <div className=" flex justify-between gap-2 rounded-md bg-slate-100 px-10 py-5">
        {/* <div className="">
          <div className="flex">
            <div className="rounded-l-md  text-gray-700 border border-gray-300 border-r-0  bg-white py-1 pl-4 pr-1">
              ชื่อ :{" "}
            </div>
            <input
              type="text"
              disabled={!onEdit}
              className=" text-md enabled:text-gray-600 border focus:outline-blue-300 border-gray-300 text-gray-700 bg-white enabled:bg-blue-50 border-l-0 w-[200px] mr-5 px-4 py-1  rounded-r-md"
              placeholder="ชื่อ"
              defaultValue={students?.thaiName}
            />

            <div className="rounded-l-md text-gray-700 border border-gray-300 border-r-0 bg-white py-1 pl-4 pr-1">
              นามสกุล :{" "}
            </div>
            <input
              disabled={!onEdit}
              type="text"
              className="text-md focus:outline-blue-300 border mr-5 text-gray-700 border-gray-300 enabled:text-gray-600 bg-white enabled:bg-blue-50 border-l-0 w-[200px]  px-4 py-1  rounded-r-md"
              placeholder="นามสกุล"
              defaultValue={students?.thaiLastName}
            />

<div className="rounded-l-md text-gray-700 border border-gray-300 border-r-0 bg-white py-1 pl-4 pr-1">
              รหัสนักเรียน :
            </div>
            <input
              disabled={!onEdit}
              type="text"
              className="text-md focus:outline-blue-300 border mr-5 text-gray-700 border-gray-300 enabled:text-gray-600 bg-white enabled:bg-blue-50 border-l-0 w-[200px]  px-4 py-1  rounded-r-md"
              placeholder="รหัสนักเรียน"
              defaultValue={students?.studentCode}
            />
          </div>
          <div className="mt-5 flex">
            <div className="rounded-l-md border text-gray-700 border-gray-300 border-r-0 bg-white  py-1 pl-4 pr-1">
              ระดับการศึกษา{" "}
            </div>
            <input
              disabled={!onEdit}
              type="text"
              className="text-md enabled:text-gray-600  focus:outline-blue-300 border text-gray-700 border-gray-300 bg-white enabled:bg-blue-50 mr-4 border-l-0 w-[100px]  px-4 py-1  rounded-r-md"
              placeholder="ชื่อจริง"
              defaultValue={students?.class+"."+students?.currentRoom}
            />
            <div className="rounded-l-md  text-gray-700 border border-gray-300 border-r-0 w-fit bg-white py-1 pl-4 pr-1">
              หลักสูตร :{" "}
            </div>
            <input
              disabled={!onEdit}
              type="text"
              className=" text-md border enabled:text-gray-600 border-gray-300 text-gray-700 border-l-0 w-[150px] mr-5 px-4 py-1 bg-white enabled:bg-blue-50 focus:outline-blue-300  rounded-r-md"
              placeholder="หลักสูตร"
              defaultValue={students?.facultyName}
            />
            <div className="rounded-l-md   text-gray-700 border border-gray-300 border-r-0 w-fit bg-white py-1 pl-4 pr-1">
              สาขา :{" "}
            </div>
            <input
              disabled={!onEdit}
              type="text"
              className=" text-md enabled:text-gray-600 bg-white enabled:bg-blue-50 border border-gray-300 text-gray-700 border-l-0 w-[100px] mr-5 px-4 py-1 focus:outline-blue-300 rounded-r-md"
              placeholder="สาขา"
              defaultValue={students?.programName}
            />
          </div>
        </div> */}
        <div className="w-full">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              {students?.gender == "Male" ? (
                <p>นาย</p>
              ) : students?.gender == "FeMale" ? (
                <p>นางสาว</p>
              ) : (
                <p>Laoding..</p>
              )}
              <input
                type="text"
                className="w-[150px] rounded-sm px-2 py-1"
                defaultValue={students?.thaiName}
              />
              <input
                type="text"
                className="w-[150px] rounded-sm px-2 py-1"
                defaultValue={students?.thaiLastName}
              />
              
            </div>
            <div className="flex items-center gap-3">
              <div>รหัสนักเรียน</div>
              <input type="text" className="px-2 py-1 w-[100px] text-center" defaultValue={students?.studentCode}/>
                <div>ห้อง</div>
                <div className="px-2 bg-white py-1 rounded-sm">
                  {students?.class}.{students?.currentRoom}
                </div>
              </div>
          </div>
        </div>
        <div className="w-fit">
          <img width={100} className="rounded-sm" src="/asset/user.jpg" />
        </div>
      </div>

      <div className="py-5 ">
        <div className="grid w-full border px-4 py-4">
          <div className="gap-8 flex justify-start items-center  w-full">
            <div className="w-fit items-center flex gap-3">
              <div className="w-[100px]">สถานะนักเรียน</div>
              <select
                className="border border-gray-300 rounded-sm px-4 py-1"
                onChange={(e) => setEducateStatus(e.target.value)}
                value={educateStatus}
              >
                <option value="">เลือก</option>
                <option value="กำลังศึกษา">กำลังศึกษา</option>
                <option value="สำเร็จการศึกษา">สำเร็จการศึกษา</option>
                <option value="พักการเรียน">พักการเรียน</option>
                <option value="ลาออก">ลาออก</option>
                <option value="คัดชื่อออก">คัดชื่อออก</option>
                <option value="ทดลองเรียน">ทดลองเรียน</option>
                <option value="นักศึกษาใหม่">นักศึกษาใหม่</option>
                <option value="กำลังติดตาม">กำลังติดตาม</option>
                <option value="เงินอุดหนุน">เงินอุดหนุน</option>
              </select>
              <button
                className="px-5 text-white enabled:bg-green-500 enabled:hover:bg-green-600  bg-gray-300 rounded-md py-1 "
                disabled={!educateStatus}
              >
                ปรับสถานะ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
