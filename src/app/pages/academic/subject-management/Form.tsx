import { PlusCircle } from "lucide-react";
import React, { useState } from "react";

type Subject = {
  ID: string;
  SubjectID: string;
  SubjectName: string;
  Status: boolean;
};

export default function Form() {
  const [subjects, setSubject] = useState<Subject[] | null>([
    {
      ID: "bas3fleanf12ha",
      SubjectID: "303101",
      SubjectName: "English For Life Long",
      Status: false,
    },
    {
      ID: "xjs83jds92kda",
      SubjectID: "303102",
      SubjectName: "Mathematics Basics",
      Status: true,
    },
    {
      ID: "pqw74mdns92ka",
      SubjectID: "303103",
      SubjectName: "Introduction to Physics",
      Status: false,
    },
    {
      ID: "dks83hdd92lal",
      SubjectID: "303104",
      SubjectName: "Chemistry in Everyday Life",
      Status: true,
    },
    {
      ID: "smd93mdla02ma",
      SubjectID: "303105",
      SubjectName: "World History Overview",
      Status: false,
    },
    {
      ID: "as93jdkl28sma",
      SubjectID: "303106",
      SubjectName: "Computer Science Fundamentals",
      Status: true,
    },
    {
      ID: "wkd83nd92dkan",
      SubjectID: "303107",
      SubjectName: "Art and Creativity",
      Status: false,
    },
    {
      ID: "zms93hdla82ka",
      SubjectID: "303108",
      SubjectName: "Environmental Science",
      Status: true,
    },
    {
      ID: "xks92jdla74mao",
      SubjectID: "303109",
      SubjectName: "Business and Economics",
      Status: false,
    },
  ]);

  return (
    <div className="w-full">
      <div className="flex py-5 justify-between">
        <div></div>
        <h1 className="px-10 py-1 rounded-3xl text-lg w-fit bg-gray-600 text-white">
          ระบบจัดการรายวิชา
        </h1>
        <div className="px-5 flex gap-2">
          <button className="px-10 py-1 flex gap-2 h-fit items-center bg-blue-500 hover:bg-blue-600 text-white rounded-md">
            <PlusCircle className="w-5 h-5 text-white  " />
            เพิ่มวิชา
          </button>
        </div>
      </div>
      <div className="w-full rounded-sm px-10">
        <div className="grid grid-cols-[5%_30%_35%_15%_15%] bg-[#5fbfff] text-white border border-gray-200 py-2 rounded-t-md">
          <div className="text-center">ลำดับ</div>
          <div className="text-center">รหัสวิชา</div>
          <div className="text-center">ชื่อวิชา</div>
          <div className="text-center">สถานะ</div>
          <div className="text-center">Action</div>
        </div>
        {subjects?.map((item: Subject, index) => (
          <div
            key={item.ID}
            className="grid grid-cols-[5%_30%_35%_15%_15%] bg-white hover:bg-gray-50 border border-gray-200  border-t-0"
          >
            <div className="text-center flex items-center w-full justify-center text-gray-600 border-r py-1  border-gray-200">
              {index+1}
            </div>
            <div className="text-start flex items-center text-gray-600 py-1 px-4 border-r ">
              {item.SubjectID}
            </div>
            <div className="text-start flex items-center text-gray-600 py-1 px-4 border-r ">
              {item.SubjectName}
            </div>
            <div className="text-center flex items-center w-full justify-center py-1 border-r ">
              {item.Status ? (
                <p className="text-green-400 font-thin lg:text-[16px] text-[14px]">
                  Enable
                </p>
              ) : (
                <p className="text-red-400 font-thin lg:text-[16px] text-[14px]]">
                  Disable
                </p>
              )}
            </div>
            <div className=" flex items-center justify-center gap-2 py-1">
                <button className="w-[80px] py-1 rounded-sm bg-blue-400 text-white">แก้ไข</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
