"use client";
import { fetchGetScheduleOfTeacherByTeacherID } from "@/api/schedule/scheduleAPI";
import { fetchGetTeacherByTeacherIdAsync } from "@/api/teacher/teacherAPI";
import { TeacherScheduleSubject } from "@/dto/schedule";
import { GetTeacherByTeacherId } from "@/dto/teacherDto";
import { GraduationCap, PlusCircle } from "lucide-react";
import React from "react";
import { useEffect, useState } from "react";
import AddTeacherSchedulePopUp from "./AddTeacherSchedulePopUp";
type Props = {
  term: string;
  year: string;
  teacherID: string;
};

const getTeacherData = async (teacherId: string) => {
  try {
    const response = await fetchGetTeacherByTeacherIdAsync(Number(teacherId));
    return response;
  } catch (err) {
    console.log(err);
    return [];
  }
};

const getSchedule = async (teacherID: string, term: string, year: string) => {
  try {
    const data = await fetchGetScheduleOfTeacherByTeacherID(
      teacherID,
      Number(term),
      Number(year)
    );
    return data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export default function Form({ term, year, teacherID }: Props) {
  const [schedules, setSchedules] = useState<TeacherScheduleSubject[]>([]);
  const [teacherData, setTeacherData] = useState<GetTeacherByTeacherId>();
  const [scheduleBtn ,setschduleBtn] = useState<boolean>(false)
  useEffect(() => {
    getSchedule(teacherID, term, year).then((d: any) => {
      setSchedules(d);
    });
    getTeacherData(teacherID).then((data: any) => {
      setTeacherData(data);
    });
  }, []);

  return (
    <div className="w-full  px-10 ">
      <div className="py-5 flex justify-center ">
        <h1 className="px-10 text-xl py-2 bg-pink-500 text-white flex gap-2 items-center rounded-3xl">
          <GraduationCap className="h-8 w-8"/>
          ตารางสอนอาจารย์
        </h1>
      </div>
      <div className="w-full py-5 flex justify-between items-start ">
        <div className=" rounded-md flex border group shadow-md shadow-gray-200 border-gray-200 w-fit px-5">
          <div className="overflow-hidden w-[100px] h-auto">
            <img
              src={teacherData?.teacherProfilePicture || "/asset/user.jpg"}
              className="w-[100px] h-auto group-hover:scale-[110%] duration-500  object-cover"
            />
          </div>
          <div className="grid h-fit px-4  py-2 gap-1 ">
            <div className="flex gap-2 text-[18px]">
              <p>{teacherData?.nameTitle}</p>
              <p>{teacherData?.thaiName}</p>
              <p>{teacherData?.thaiLastName}</p>
            </div>
            <div className="flex text-gray-700 gap-2 text-[16px]">
              เบอร์ติดต่อ :<p>{teacherData?.teacherPhone}</p>
            </div>
            <div className="flex text-gray-700 gap-2 text-[16px]">
              Email :<p>{teacherData?.teacherEmail}</p>
            </div>
          </div>
        </div>
        <div className="">
          {" "}
          <button className="px-10 py-1.5 flex gap-2 h-fit items-center bg-blue-500 hover:bg-blue-600 text-white rounded-3xl" onClick={()=>setschduleBtn(true)}>
            <PlusCircle className="w-5 h-5 text-white  " />
            เพิ่มตารางเรียน
          </button>
        </div>
      </div>

      <div className="w-full ">
        <div className="w-full grid grid-cols-[10%_25%_10%_10%_10%_10%_10%_15%] bg-[#cfe4ff] text-blue-950 border-2  border-gray-400 text-lg rounded-t-md">
          <div className="text-center border-r-2  border-gray-400 py-2 ">รหัสวิชา</div>
          <div className="text-center border-r-2  border-gray-400 py-2 ">ชื่อวิชา</div>
          <div className="text-center border-r-2  border-gray-400 py-2 ">สายชั้น</div>
          <div className="text-center border-r-2  border-gray-400  py-2 ">กลุ่มนักเรียน</div>
          <div className="text-center border-r-2  border-gray-400 py-2 ">ห้องเรียน</div>
          <div className="text-center border-r-2  border-gray-400 py-2 ">หน่วยกิต</div>
          <div className="text-center border-r-2  border-gray-400 py-2 ">คาบเรียน</div>
          <div className="text-center  py-2 ">วันสอน</div>
        </div>
      </div>
      {schedules.length > 0 ? (
        <div>
          {schedules?.map((item: TeacherScheduleSubject, index) => (
            <div key={index}>
              {item.scheduleSubjects.map((subject, subIndex) => (
                <div
                  key={subIndex}
                  className={` ${
                    subIndex % 2 == 0 ? "bg-white" : "bg-gray-100"
                  } grid grid-cols-[10%_25%_10%_10%_10%_10%_10%_15%]  border-2 text-[16px] border-gray-400 text-gray-700  border-t-0`}
                >
                  <p className="text-start flex items-center px-4 border-r border-gray-400   py-1 line-clamp-1">
                    {subject.subjectCode}
                  </p>
                  <p className="text-start flex items-center  px-4 border-r border-gray-400  py-1 line-clamp-1">
                    {subject.subjectName}
                  </p>
                  <p className="text-center flex items-center justify-center border-r border-gray-400">
                    {subject.class}
                  </p>
                  <p className="text-center flex items-center justify-center border-r border-gray-400">
                    {subject.groupName}
                  </p>
                  <p className="text-center flex items-center justify-center border-r border-gray-400">
                    {subject.room}
                  </p>
                  <p className="text-center flex items-center justify-center border-r border-gray-400">
                    {subject.credit}
                  </p>
                  <p className="text-center flex items-center justify-center border-r border-gray-400">
                    {subject.period}
                  </p>
                  <p className="text-center py-2 flex items-center justify-center  ">
                    {subject.day}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="grid place-items-center border-2 border-dashed border-t-0 text-[24px] border-gray-400  text-gray-600 py-10 text-center">
          ไม่มีตารางเรียน
        </div>
      )}

      {/* {schedules.map((item, index) => (
        <div className="px-10 text-xl text-black" key={index}>
          <h2>{item.day}</h2>
          {item.scheduleSubjects.map((subject, subIndex) => (
            <div key={subIndex}>
              <p>Group: {subject.groupName}</p>
              <p>
                Subject: {subject.subjectName} ({subject.subjectCode})
              </p>
              <p>
                Room: {subject.room}, Period: {subject.period}
              </p>
            </div>
          ))}
        </div>
      ))} */}
      {scheduleBtn && (
        <AddTeacherSchedulePopUp
        term={term}
        year={year}
        teacherId={Number(teacherID)}
        teacherName={`${teacherData?.thaiName} ${teacherData?.thaiLastName}`}
        onClosePopUp={setschduleBtn}
        />
      )}
    </div>
  );
}
