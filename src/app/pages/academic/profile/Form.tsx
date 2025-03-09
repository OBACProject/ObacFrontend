"use client";

import React from "react";
import { useState, useEffect } from "react";
import { fetchGetTeacherByTeacherIdAsync } from "@/api/teacher/teacherAPI";
import { GetTeacherByTeacherId } from "@/dto/teacherDto";
import { fetchGetUserInfoById } from "@/resource/academics/userInfo/api/userInfoApi";
import { GetUserInfoById } from "@/dto/userDto";
import cookies from "js-cookie";

const getUserInfoById = async (userId: string) => {
  try {
    const user = await fetchGetUserInfoById(userId);
    return user;
  } catch (err) {
    console.error("Failed to fetch user by ID:", err);
  }
};

const getTeachData = async (id: number) => {
  try {
    const teacher = await fetchGetTeacherByTeacherIdAsync(id);
    return teacher;
  } catch (err) {
    console.error("Failed to fetch teacher by ID:", err);
  }
};

export default function ProfileForm() {
  const [teachers, setTeacher] = useState<GetTeacherByTeacherId>(); // profile
  const [academics, setAcademics] = useState<GetUserInfoById>(); // academic
  const userId = cookies.get("userId");
  // console.log(userId);
  useEffect(() => {
    if (userId) {
      getUserInfoById(userId).then((items) => {
        setAcademics(items);
      });
    } else {
      getTeachData(27).then((items) => {
        setTeacher(items);
      });
    }
  }, []);

  return (
    <div className="text-xl font-sans">
      <div className="grid gap-4 px-5">
        <div className=" lg:text-xl text-xl px-10 w-fit bg-gray-700 shadow-sm text-white py-1 rounded-3xl   ">
          ข้อมูลฝ่ายทะเบียน
        </div>
        <div className="border-[1px] bg-white duration-1000 shadow-md w-full shadow-gray-200 border-gray-200 px-5 py-5 rounded-sm  ">
          <div className="flex ">
            <div className=" overflow-hidden">
              <img
                className="hover:scale-125  duration-700 justify-start border-[1px] border-gray-400 rounded-md"
                src={"/asset/user.jpg"}
                width="150"
              />
            </div>

            <div className="px-5 grid lg:gap-3 md:gap-2 gap-4">
              {/* <div className="flex px-4 rounded-md py-1 w-fit bg-[#e4f1f8]">
                <div className="text-xl font-semibold">เลขประจำตัว</div>
                <div className="ml-2">{academics?.teacherCode}</div>
              </div> */}
              <div className=" flex">
                <div className="text-xl pl-4 font-semibold ">นาย</div>
                <div className="mx-4 text-gray-700">{academics?.thaiName}</div>
                <div className="mx-4 text-gray-700">
                  {academics?.thaiLastname}
                </div>
              </div>
              <div className="flex pl-4 ">
                <div className="mx-4 text-gray-700">{academics?.firstName}</div>
                <div className="mx-2 text-gray-700">{academics?.lastName}</div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="border-[1px] bg-white duration-1000  shadow-md w-fit shadow-gray-200 border-gray-200 px-5  py-5 rounded-sm">
            <div className="flex">
              <div className="text-xl font-semibold">Email :</div>
              <div className="mx-4 text-gray-700">{academics?.email}</div>
              <div className="border-l-2 pl-4 font-semibold">
                เบอร์ติดต่อ :{" "}
              </div>
              <div className="mx-4 text-gray-700">{academics?.phoneNumber}</div>
            </div>
          </div>

          <div className="border-[1px] bg-white duration-1000 shadow-md w-fit shadow-gray-200 border-gray-200 px-5  py-5 rounded-sm">
            <div className="flex">
              <div className="text-xl font-semibold">Gender : </div>
              <div className="mx-4 text-gray-700">{academics?.gender}</div>
              <div className="border-l-2 pl-4 text-xl font-semibold">
                ศาสนา :{" "}
              </div>
              <div className="mx-4 text-gray-700">{academics?.religion}</div>
              <div className="border-l-2 pl-4 text-xl font-semibold">
                สัญชาติ :{" "}
              </div>
              <div className="mx-4 text-gray-700">{academics?.nationality}</div>
            </div>
          </div>
        </div>{" "}
      </div>
      <div className="py-40"></div>
    </div>
  );
}
