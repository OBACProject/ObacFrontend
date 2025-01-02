"use client";
import React, { useState } from "react";

type ScheduleData = {
  id: string;
  subjectName: string;
  subjectId: string;
  periode: string;
  teacherName: string;
  day: string;
  room: string;
};

interface Props {
  id: string;
}

export default function Form({ id }: Props) {
  const [subject_id, setSubject_Id] = useState<string>("");
  const [subjectId, setSubjectId] = useState<string>("");
  const [subjectName, setSubjectName] = useState<string>("");
  const [day, setDay] = useState<string>("");
  const [periode, setPeriode] = useState<string>("");
  const [teacherName, setTeacherName] = useState<string>("");
  const [room, setRoom] = useState<string>("");

  const [schedules, setSchedule] = useState<ScheduleData[]>([
    {
      id: "1",
      subjectName: "บริหารธุรกิจเบื้องต้น",
      subjectId: "101101",
      periode: "1",
      teacherName: "หทัยชนก",
      day: "monday",
      room: "102",
    },
    {
      id: "2",
      subjectName: "เศรษฐศาสตร์",
      subjectId: "202021",
      periode: "2",
      teacherName: "นรินทร์",
      day: "friday",
      room: "102",
    },
  ]);
  const [popUpAddSubject, setpopUpAddSubject] = useState<boolean>(false);
  const days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thusday",
    "friday",
    "saturday",
  ];

  const handleClickPopUp = () => {
    setpopUpAddSubject((popUpAddSubject) => !popUpAddSubject);
    setSubjectId('')
    setSubjectName('')
    setSubject_Id('')
    setPeriode('')
    setTeacherName('')
    setDay('')
    setRoom('')
  };
  const onClosePopUp = () => {
    setpopUpAddSubject(false);
  };

  const handleChangeDay = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDay(e.target.value);
  };

  const handleChangePeriod = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPeriode(e.target.value);
  };

  const handleAddSubject = () => {
    setSchedule((item: any) => {
      const updatedInventory = item && [
        ...item,
        {
          id: subject_id,
          subjectName: subjectName,
          subjectId: subjectId,
          periode: periode,
          teacherName: teacherName,
          day: day,
          room: room,
        },
      ];
      return updatedInventory;
    });
    onClosePopUp();
  };

  return (
    <div className="px-20 pb-20">
      <div className="mt-5 w-full flex justify-end">
        <button
          className="text-md text-white px-10 py-2 rounded-sm bg-blue-600 hover:bg-blue-400"
          onClick={handleClickPopUp}
        >
          เพิ่มรายวิชา
        </button>
      </div>
      <div className="grid my-5 place-items-center">
        {schedules?.map((items, index) => (
          <div className="w-4/5 mt-2  border-[1px] hover:border-slate-400 border-gray-200 shadow-md shadow-gray-200  rounded-md grid grid-cols-[20%_30%_25%_25%]">
            <div
              className={`${
                items.day == "monday"
                  ? "bg-yellow-200"
                  : items.day == "tuesday"
                  ? "bg-pink-200"
                  : items.day == "wednesday"
                  ? "bg-green-300"
                  : items.day == "thusday"
                  ? "bg-orange-200"
                  : items.day == "friday"
                  ? "bg-blue-200"
                  : items.day == "sunday"
                  ? "bg-red-200"
                  : items.day == "saturday"
                  ? "bg-purple-300"
                  : ""
              } py-5 px-5 rounded-l-md border-r-2 border-slate-200 place-items-center grid text-lg font-semibold`}
            >
              {items.day}
            </div>
            <div className="px-5 py-2 border-r-2 border-slate-200 ">
              <div className="text-lg text-blue-500 font-semibold">
                วิชา : {items.subjectName}
              </div>
              <div>รหัส : {items?.subjectId || "000"}</div>
            </div>
            <div className="text-center text-gray-500 py-2">
              <div>อาจารย์ผู้สอน : {items?.teacherName || "000"}</div>
            </div>
            <div className="text-end px-5 py-5">
              <div>คาบเรียน : {items?.periode || "ยังไม่ทราบ"}</div>
              <div>ห้องเรียน : {items?.room || "ยังไม่ทราบ"}</div>
            </div>
          </div>
        ))}
      </div>
      {popUpAddSubject == true && (
        <div
          className="fixed inset-0 flex items-center duration-1000 animate-appearance-in justify-center bg-gray-200 bg-opacity-60"
          onClick={onClosePopUp}
        >
          <div
            className=" bg-white shadow-lg shadow-gray-400   rounded-lg w-4/12 z-100 duration-500"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="py-2 text-center text-lg text-white rounded-t-lg bg-blue-500 w-full">
              เพิ่มรายวิชา
            </div>
            <div className="px-5 py-5">
              <div className="grid my-3 grid-cols-2">
                <span className="flex gap-2 justify-center">
                  <label className="py-1 px-2 ">วัน</label>
                  <select
                    className="px-5 py-1 rounded-md bg-gray-50 border border-gray-300 focus:outline-blue-500 "
                    onChange={handleChangeDay}
                  >
                    <option selected>- เลือก -</option>
                    {days.map((items) => (
                      <option value={items}>{items}</option>
                    ))}
                  </select>
                </span>
                <span className="flex gap-2 justify-center">
                  <label className="py-1 px-2">คาบเรียน</label>
                  <select
                    className="rounded-md px-5 py-1 bg-gray-50 border border-gray-300 focus:outline-blue-500 "
                    onChange={handleChangePeriod}
                  >
                    <option selected>- เลือก -</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </span>
              </div>
              <div className=" my-3 ">
                <span className=" gap-0 grid grid-cols-[30%_70%] ">
                  <label className="py-1 pl-10 ">รหัสวิชา </label>
                  <input
                    type="text"
                    onChange={(e) => setSubjectId(e.target.value)}
                    value={subjectId}
                    className="px-4 w-2/3 focus:outline-blue-400 border-[1px] rounded-md border-gray-300 py-1"
                    placeholder="code"
                  />
                </span>
              </div>
              <div className="my-3">
                <span className="grid grid-cols-[30%_70%] gap-0 ">
                  <label className="py-1 pl-10  ">ชื่อวิชา</label>
                  <input
                    onChange={(e) => setSubjectName(e.target.value)}
                    value={subjectName}
                    type="text"
                    className="w-2/3 border-[1px] focus:outline-blue-400 rounded-md border-gray-300 px-4 py-1"
                    placeholder="subject"
                  />
                </span>
              </div>
              <div className="my-3">
                <span className="grid grid-cols-[30%_70%] gap-0 ">
                  <label className="py-1 pl-10  ">ชื่ออาจารย์</label>
                  <input
                    onChange={(e) => setTeacherName(e.target.value)}
                    value={teacherName}
                    type="text"
                    className="w-2/3 border-[1px] focus:outline-blue-400 rounded-md border-gray-300 px-4 py-1"
                    placeholder="name"
                  />
                </span>
              </div>
              <div className="my-3">
                <span className="grid grid-cols-[30%_30%] gap-0 ">
                  <label className="py-1 pl-10  ">ห้องเรียน</label>
                  <input
                    onChange={(e) => setRoom(e.target.value)}
                    value={room}
                    type="text"
                    className="w-2/3 focus:outline-blue-400 border-[1px] rounded-md border-gray-300 px-4 py-1"
                    placeholder="room"
                  />
                </span>
              </div>
              <div className="flex justify-between gap-5 px-28 mb-5">
                <button
                  className="px-8 text-white py-2 bg-blue-500 rounded-sm hover:text-black hover:bg-blue-300"
                  onClick={handleAddSubject}
                >
                  ตกลง
                </button>
                <button
                  className="px-8 text-white py-2 hover:bg-gray-300 hover:text-black bg-gray-400 rounded-sm"
                  onClick={onClosePopUp}
                >
                  ยกเลิก
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
