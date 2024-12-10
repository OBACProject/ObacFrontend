"use client";
import CardSubject from "@/app/components/card/card-subject";
import { TeacherEnrollment } from "@/dto/teacherDto";
import Link from "next/link";
import React, { useState } from "react";

interface Props {
  slug: string;
}

export default function Center({ slug }: Props) {
  const [subjectCards, setCard] = useState<TeacherEnrollment[]>([]);

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thusday",
    "Friday",
    "Saturday",
  ];
  const handleClickPopUp = () => {
    setpopUpAddSubject((popUpAddSubject) => !popUpAddSubject);
  };
  const onClosePopUp = () => {
    setpopUpAddSubject(false);
  };
  const [popUpAddSubject, setpopUpAddSubject] = useState<boolean>(false);
  return (
    <div>
      <div className="shadow-md ">
        <div className="my-5 text-center text-2xl font-semibold">
          ข้อมูลอาจารย์
        </div>
        <div className="grid place-items-center py-10 px-10 border-[1px]">
          detail
        </div>
      </div>
      <div className="py-5 px-10 flex justify-end">
        <button
          className="text-white text-md bg-blue-600 px-10 py-2 hover:opacity-75 rounded-md d"
          onClick={handleClickPopUp}
        >
          เพิ่มวิชาสอน
        </button>
      </div>
      <div className=" grid place-items-center mb-20">
        {subjectCards.length > 0 ? (
          <div className=" lg:w-9/12 sm:w-full md:w-full">
            {subjectCards?.map((items) => (
              <Link href="/pages">
                <CardSubject cardSubjectData={items} />
              </Link>
            ))}
          </div>
        ) : (
          <div className="grid text-gray-500 text-3xl font-semibold place-items-center py-10">
            ไม่มีวิชาที่สอน
          </div>
        )}
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
              เพิ่มวิชาสอน
            </div>
            <div className="px-5 py-5">
              <div className="grid my-3 grid-cols-2">
                <span className="flex gap-2 justify-center">
                  <label className="py-1 px-2 ">วัน</label>
                  <select className="px-5 py-1 rounded-md bg-gray-50 border border-gray-300 focus:outline-blue-500 ">
                    <option selected>- เลือก -</option>
                    {days.map((items) => (
                      <option value={items}>{items}</option>
                    ))}
                  </select>
                </span>
                <span className="flex gap-2 justify-center">
                  <label className="py-1 px-2">คาบเรียน</label>
                  <select className="rounded-md px-5 py-1 bg-gray-50 border border-gray-300 focus:outline-blue-500 ">
                    <option selected>- เลือก -</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                </span>
              </div>
              <div className=" my-3 ">
                <span className=" gap-0 grid grid-cols-[30%_70%] ">
                  <label className="py-1 pl-10 ">รหัสวิชา </label>
                  <input
                    type="text"
                    className="px-4 w-2/3 focus:outline-blue-400 border-[1px] rounded-md border-gray-300 py-1"
                    placeholder="code"
                  />
                </span>
              </div>
              <div className="my-3">
                <span className="grid grid-cols-[30%_70%] gap-0 ">
                  <label className="py-1 pl-10  ">ชื่อวิชา</label>
                  <input
                    type="text"
                    className="w-2/3 border-[1px] focus:outline-blue-400 rounded-md border-gray-300 px-4 py-1"
                    placeholder="subject"
                  />
                </span>
              </div>
              <div className="my-4">
                <span className="grid grid-cols-[50%_50%] gap-0 ">
                  <div className="flex gap-2">
                    <label className="py-1 pl-10  ">ห้องเรียน</label>
                    <input
                      type="text"
                      className="w-1/3 focus:outline-blue-400 border-[1px] rounded-md border-gray-300 px-4 py-1"
                      placeholder="room"
                    />
                  </div>
                  <div className="flex gap-2">
                    <label className="py-1 pl-0  ">กลุ่มเรียน</label>
                    <input
                      type="text"
                      className="w-5/12 focus:outline-blue-400 border-[1px] rounded-md border-gray-300 px-4 py-1"
                      placeholder="ปวส. ปวช."
                    />
                  </div>
                </span>
              </div>

              <div className="mt-4 mb-6">
                <span className="flex gap-2 ">
                  <label className="py-1 pl-10  ">ปีการศึกษา</label>
                  <select className="rounded-md border-[1px] px-5 border-gray-200">
                    <option selected>- เลือกปี -</option>
                    <option value="1/2567">1/2567</option>
                    <option value="2/2567">2/2567</option>
                  </select>
                </span>
              </div>
              <div className="flex justify-between gap-5 px-28 mb-5">
                <button className="px-8 text-white py-2 bg-blue-500 rounded-sm hover:text-black hover:bg-blue-300">
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
