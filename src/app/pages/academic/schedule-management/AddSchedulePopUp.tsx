import { fetchCreateScheduleSubject } from "@/api/schedule/scheduleAPI";
import { fetchGetAllStudentGroup } from "@/api/student/studentApi";
import { fetchGetAllSubjectByTerm } from "@/api/subject/subjectAPI";
import { fetchGetAllTeacherAsync } from "@/api/teacher/teacherAPI";
import { Combobox } from "@/app/components/combobox/combobox";
import { Input } from "@/components/ui/input";
import { CreateScheduleSubjectRequest } from "@/dto/schedule";
import { StudentGroup } from "@/dto/studentDto";
import { GetAllSubject } from "@/dto/subjectDto";
import { GetAllTeacher } from "@/dto/teacherDto";
import { Label } from "@radix-ui/react-dropdown-menu";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";

type AddSchedulePopUp = {
  onClosePopUp: (value: boolean) => void;
  year: string;
};

interface TeacherOption {
  value: string;
  label: string;
}
interface SubjectOption {
  value: number;
  label: string;
}
const getAllSubjectByTerm = async (term: number) => {
  try {
    const response = await fetchGetAllSubjectByTerm(term);
    return response;
  } catch (err) {
    console.log(err);
    return [];
  }
};

const getAllTeacher = async () => {
  try {
    const response = await fetchGetAllTeacherAsync();
    return response;
  } catch (err) {
    return [];
  }
};

const getAllStudentGroup = async () => {
  try {
    const response = await fetchGetAllStudentGroup();
    return response;
  } catch (err) {
    return [];
  }
};

export default function AddSchedulePopUp({
  onClosePopUp,
  year,
}: AddSchedulePopUp) {
  const [subjects, setSubject] = useState<GetAllSubject[]>([]);
  const [teachers, setTeacher] = useState<GetAllTeacher[]>([]);
  const [studentGroup, setStudentGroup] = useState<StudentGroup[]>([]);
  const term = ["1", "2", "3", "4", "5", "6"];
  const currentYear = new Date().getFullYear() - 1 + 543;
  const yearsList = Array.from({ length: 3 }, (_, i) =>
    (currentYear - i).toString()
  );
  const [selectedTerm, setSelectedTerm] = useState<string>("1");
  const [selectedYear, setSelectedYear] = useState<string>(
    currentYear.toString()
  );
  useEffect(() => {
    getAllTeacher().then((item) => {
      setTeacher(item);
    });
    getAllStudentGroup().then((item) => {
      setStudentGroup(item);
    });
  }, []);

  useEffect(() => {
    const studentGroupById = studentGroup.find(
      (item) => item.studentGroupId === studentGroupId
    );
    const studentGroupName = studentGroupById?.studentGroupName;
    getAllSubjectByTerm(
      parseInt(selectedTerm) +
        2 * (parseInt(studentGroupName?.substring(0) ?? "1") - 1)
    ).then((item) => {
      setSubject(item);
    });
  }, [selectedTerm]);

  const days = [
    "วันอาทิตย์",
    "วันจันทร์",
    "วันอังคาร",
    "วันพุธ",
    "วันพฤหัสบดี",
    "วันศุกร์",
    "วันเสาร์",
  ];
  const [day, setDay] = useState<string>("");
  const [period, setPeriod] = useState<string>("");
  const [room, setRoom] = useState<string>("");
  const [teacherID, setTeacherID] = useState<number>(0);
  const [subjectID, setSubjectID] = useState<number>(0);
  const [studentGroupId, setStudentGroupId] = useState<number>(0);

  const subjectOptions: SubjectOption[] = subjects.map((item) => ({
    value: item.id,
    label: `${item.subjectCode} : ${item.subjectName}`,
  }));

  const teacherOptions = teachers.map((teacher, index) => ({
    value: teacher.teacherId,
    label: `${teacher.teacherCode ?? `${index + 1}`} : ${teacher.thaiName} ${
      teacher.thaiLastName
    }`,
  }));

  const groupOptions = studentGroup.map((item) => ({
    value: item.studentGroupId,
    label: `${item.class}.${item.studentGroupName}`,
  }));

  const onSubmit = async () => {
    const studentGroupById = studentGroup.find(
      (item) => item.studentGroupId === studentGroupId
    );
    const studentGroupName = studentGroupById?.studentGroupName;
    // console.log(studentGroupName);
    const requestBody: CreateScheduleSubjectRequest = {
      day: day,
      period: period,
      subject_id: subjectID,
      year: Number(year),
      term: (
        parseInt(selectedTerm) +
        2 * (parseInt(studentGroupName?.substring(0) ?? "1") - 1)
      ).toString(),
      student_group_id: studentGroupId,
      teacher_id: teacherID,
      room: room,
    };

    try {
      await fetchCreateScheduleSubject(requestBody);
      toast.success("สร้างสำเร็จ");
      onClosePopUp(false);
    } catch (err) {
      console.error("Error creating schedule:", err);
    }
  };

  return (
    <div
      className="fixed duration-1000 animate-appearance-in inset-0 flex items-center justify-center bg-gray-700 bg-opacity-45"
      onClick={() => onClosePopUp(false)}
    >
      <div
        className=" bg-white shadow-lg shadow-gray-400   rounded-lg w-4/12 z-100 duration-500"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-4 py-5">
          <div className="py-2 text-center text-xl text-gray-900 rounded-t-lg bg-white w-full">
            เพิ่มวิชาสอน
          </div>
          <div className="flex  px-4 py-2">
            <div className="w-full flex flex-col p-2 relative">
              <h1>ภาคเรียน</h1>
              <Combobox
                options={term.map((item) => ({
                  value: item,
                  label: item,
                }))}
                defaultValue="1"
                buttonLabel="เลือกภาคเรียน"
                onSelect={(selectedTerm) => setSelectedTerm(selectedTerm)}
              />
            </div>
            <div className="w-full flex flex-col p-2 relative">
              <h1>ปีการศึกษา</h1>
              <Combobox
                options={yearsList.map((item) => ({
                  value: item,
                  label: item,
                }))}
                defaultValue={currentYear.toString()}
                buttonLabel="เลือกปีการศึกษา"
                onSelect={(selectedYear) => setSelectedYear(selectedYear)}
              />
            </div>
          </div>
          <div className="flex px-4 py-2">
            <div className="w-full px-2">
              <h1>ห้องเรียน</h1>
              <Input
                type="text"
                placeholder="ห้องเรียน"
                className="w-full pr-10"
                onChange={(e) => setRoom(e.target.value)}
              />
            </div>
            <div className="w-full">
              <h1>กลุ่มเรียน</h1>
              <Combobox
                options={groupOptions.map((item) => ({
                  value: item.value.toString(),
                  label: `${item.label} `,
                }))}
                defaultValue=""
                buttonLabel="เลือกกลุ่มเรียน"
                onSelect={(selectedGroupId) =>
                  setStudentGroupId(Number(selectedGroupId))
                }
              />
            </div>
          </div>
          <div className="flex px-4 py-2">
            <div className="w-full px-2">
              <h1>วิชาเรียน</h1>
              <Combobox
                options={subjectOptions.map((item) => ({
                  value: item.value.toString(),
                  label: `${item.label} `,
                }))}
                defaultValue=""
                buttonLabel="เลือกวิชา"
                onSelect={(selectedSubjectId) =>
                  setSubjectID(Number(selectedSubjectId))
                }
              />
            </div>
          </div>
          <div className="flex  px-4 py-2">
            <div className="w-full flex flex-col  px-2 relative">
              <h1>วันที่สอน</h1>
              <Combobox
                options={days.map((item) => ({
                  value: item,
                  label: item,
                }))}
                defaultValue=""
                buttonLabel="เลือกวันที่สอน"
                onSelect={(selectedDay) => setDay(selectedDay)}
              />
            </div>
            <div className="w-full flex flex-col px-2 relative">
              <h1>คาบเรียน</h1>
              <Combobox
                options={Array.from({ length: 5 }, (_, i) => i + 1).map(
                  (item) => ({
                    value: item.toString(),
                    label: item.toString(),
                  })
                )}
                defaultValue=""
                buttonLabel="เลือกคาบเรียน"
                onSelect={(selectedPeriod) => setPeriod(selectedPeriod)}
              />
            </div>
          </div>
          <div className="flex  px-4 py-2">
            <div className="w-full px-2">
              <h1>อาจารย์ผู้สอน</h1>
              <Combobox
                options={teacherOptions.map((item) => ({
                  value: item.value.toString(),
                  label: `${item.label} `,
                }))}
                defaultValue=""
                buttonLabel="เลือกวิชา"
                onSelect={(selectedSubjectId) =>
                  setSubjectID(Number(selectedSubjectId))
                }
              />
            </div>
          </div>

          <div className="flex justify-center gap-5 mt-4">
            <button
              className="px-8 text-white py-1 hover:bg-gray-300 hover:text-black bg-gray-400 rounded-sm"
              onClick={() => onClosePopUp(false)}
            >
              ยกเลิก
            </button>{" "}
            <button
              className="px-8 text-white py-1 bg-blue-500 rounded-sm hover:bg-blue-600"
              disabled={
                !period ||
                !day ||
                !room ||
                !teacherID ||
                !subjectID ||
                !studentGroup
              }
              onClick={onSubmit}
            >
              ตกลง
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
