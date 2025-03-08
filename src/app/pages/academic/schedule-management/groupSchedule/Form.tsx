"use client"
import { fetchDeleteScheduleSubject, fetchGetScheduleOfStudentGroupByGroupID } from "@/api/schedule/scheduleAPI";
import { ScheduleSubject, StudentGroupScheduleSubject } from "@/dto/schedule";
import { Boxes, PlusCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import AddGroupSchedulePopUp from "./AddGroupSchedulePopUp";
import { toast } from "react-toastify";

type Props = {
  term: string;
  year: string;
  groupId: number;
};

const getSchedule = async (term: string, year: string, groupId: number) => {
  try {
    const response = await fetchGetScheduleOfStudentGroupByGroupID(
      groupId,
      term,
      Number(year)
    );
    return response;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export default function Form({ term, year, groupId }: Props) {
  const [schedules, setSchedules] = useState<StudentGroupScheduleSubject | null>(null);
  const [scheduleBtn, setScheduleBtn] = useState<boolean>(false);
  const [groupName, setGroupName] = useState<string>("");

  useEffect(() => {
    getSchedule(term, year, groupId).then((item: any) => {
      if (item) {
        setSchedules(item);
        setGroupName(`${item.class}.${item.groupName}`);
      }
    });
    
  }, []);
  const onDeleteSchedule = async (id:number , subjectName : string)=>{
    const response  = await fetchDeleteScheduleSubject(id)
    if (response.success){
     toast.success(`ลบวิชา ${subjectName} สำเร็จ`)
    }
  }
console.log(schedules)
  return (
    <div className="w-full px-10">
      <div className="py-5 flex justify-center">
        <h1 className="px-10 text-xl py-2 bg-pink-500 text-white flex gap-2 items-center rounded-3xl">
          <Boxes className="h-8 w-8" />
          ตารางเรียนของห้องเรียน
        </h1>
      </div>
      <div className="w-full py-2 flex justify-between items-center">
        <div className="flex gap-2">
          <div className="flex gap-4 items-center">
            <p className="py-1 px-2 rounded-md border border-gray-400 text-gray-950">
              {schedules?.class}.{schedules?.groupName}
            </p>
            <p className="py-1 px-2 rounded-md border border-gray-400">
              ภาคเรียนที่ {schedules?.term} ปีการศึกษา {schedules?.year}
            </p>
            <p className="py-1 px-2 rounded-md border border-gray-400">
              จำนวนวิชาเรียน {schedules?.totalSubject} วิชา
            </p>
            <p className="py-1 px-2 rounded-md border border-gray-400">
              {schedules?.totalCredit} หน่วยกิต
            </p>
          </div>
        </div>

        <button
          className="px-10 py-1.5 flex gap-2 h-fit items-center bg-blue-500 hover:bg-blue-600 text-white rounded-3xl"
          onClick={() => setScheduleBtn(true)}
        >
          <PlusCircle className="w-5 h-5 text-white" />
          เพิ่มตารางเรียน
        </button>
      </div>

      <div className="w-full">
        <div className="w-full grid grid-cols-[10%_20%_20%_10%_10%_10%_15%_5%] bg-[#cfe4ff] text-blue-950 border-2 border-gray-400 text-lg rounded-t-sm">
          <div className="text-center py-2 border-r-2 border-gray-400">รหัสวิชา</div>
          <div className="text-center py-2 border-r-2 border-gray-400">ชื่อวิชา</div>
          <div className="text-center py-2 border-r-2 border-gray-400">อาจารย์ผู้สอน</div>
          <div className="text-center py-2 border-r-2 border-gray-400">ห้องเรียน</div>
          <div className="text-center py-2 border-r-2 border-gray-400">หน่วยกิต</div>
          <div className="text-center py-2 border-r-2 border-gray-400">คาบเรียน</div>
          <div className="text-center py-2 border-r-2 border-gray-400">วันสอน</div>
          <div className="text-center py-2 "></div>
        </div>

        {schedules && schedules.scheduleSubjects?.length > 0 ? (
          schedules.scheduleSubjects.map((item: ScheduleSubject, index) => (
            <div
              key={index}
              className={`${
                index % 2 === 0 ? "bg-white" : "bg-gray-100"
              } grid grid-cols-[10%_20%_20%_10%_10%_10%_15%_5%] border text-[16px] border-gray-400 text-gray-700 border-t-0`}
            >
            
              <p className="text-start flex items-center px-4 border-r border-gray-400 py-1 line-clamp-1">
                {item.subjectCode}
              </p>
              <p className="text-start flex items-center px-4 border-r border-gray-400 py-1 line-clamp-1">
                {item.subjectName}
              </p>
              <p className="text-center flex items-center justify-center border-r border-gray-400">
                {item.teacherName}&nbsp;&nbsp;&nbsp;&nbsp;{item.teacherLastName}
              </p>
              <p className="text-center flex items-center justify-center border-r border-gray-400">
                {item.room}
              </p>
              <p className="text-center flex items-center justify-center border-r border-gray-400">
                {item.credit}
              </p>
              <p className="text-center flex items-center justify-center border-r border-gray-400">
                {item.period}
              </p>
              <p className="text-center py-2 flex items-center justify-center border-r border-gray-400">
                {item.day}
              </p>
              <div className="text-center flex items-center w-full justify-center text-gray-700  py-2 ">
                <p className="px-4 py-1 bg-red-500 hover:bg-red-700 text-white rounded-sm" onClick={()=>{
                  onDeleteSchedule(item.id , item.subjectName)
                }}>
                  ลบ
                </p>
                  
              </div>
            </div>
          ))
        ) : (
          <div className="grid place-items-center border-2 border-dashed border-t-0 text-[24px] border-gray-400 text-gray-700 py-10 text-center">
            ไม่มีตารางเรียน
          </div>
        )}
      </div>

      {scheduleBtn && groupName && (
        <AddGroupSchedulePopUp
          term={term}
          year={year}
          groupId={groupId}
          groupName={groupName}
          onClosePopUp={setScheduleBtn}
        />
      )}
    </div>
  );
}
