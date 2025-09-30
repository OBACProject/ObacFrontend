"use client";
import { CalendarClock, PlusCircle, Table, Trash2 } from "lucide-react";
import React from "react";
import { useEffect, useState } from "react";
import AddTeacherSchedulePopUp from "@/components/common/Popup/AddTeacherSchedulePopup";
import {
  TeacherDetailAndScheduleResponse,
  TeacherScheduleItem,
} from "@/dto/teacherDto";
import { GetTeacherDetailAndSchedule } from "@/api/teacher/route";
import DeleteScheduleTeacherPopup from "@/components/common/Popup/DeleteScheduleTeacherPopup";
import LoadingDataTable from "@/components/common/loading/LoadingDataTable";

type Props = {
  term: string;
  year: string;
  teacherID: string;
};

export default function Form({ term, year, teacherID }: Props) {
  const [popUpAddSubject, setpopUpAddSubject] = useState<boolean>(false);
  const [deleteTrigger, setDeleteTrigger] = useState<boolean>(false);
  const [scheduleSubjectData, setScheduleSubjectData] =
    useState<TeacherScheduleItem>();
  const [teacherSchedule, setTeacherSchedule] =
    useState<TeacherDetailAndScheduleResponse | null>();
  const reloadTeacherSchedule = () => {
    GetTeacherDetailAndSchedule(Number(teacherID), term, Number(year)).then(
      (d: TeacherDetailAndScheduleResponse | null) => {
        if (d) {
          setTeacherSchedule(d);
        }
      }
    );
  };

  useEffect(() => {
    GetTeacherDetailAndSchedule(Number(teacherID), term, Number(year)).then(
      (d: TeacherDetailAndScheduleResponse | null) => {
        if (d) {
          setTeacherSchedule(d);
          setIsLoading(true);
        }
      }
    );
  }, [teacherID]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <div className="w-full  px-10 h-full pb-14 ">
      <div className="w-full py-5 flex justify-between items-start ">
        <div className=" rounded-md flex border group shadow-md shadow-gray-200 border-gray-200 w-fit px-5">
          <div className="overflow-hidden w-[100px] h-auto">
            <img
              alt="obac"
              src={"/asset/user.jpg"}
              className="w-[100px] h-auto group-hover:scale-[110%] duration-500  object-cover"
            />
          </div>
          <div className="grid h-fit px-4  py-2 gap-1 ">
            <div className="flex gap-2 text-[20px]">
              {teacherSchedule?.teacher ? (
                <>
                  <p>{teacherSchedule.teacher.prefix || "คำนำหน้า"}</p>
                  <p>{teacherSchedule.teacher.firstName || "ชื่อ"}</p>
                  <p>{teacherSchedule.teacher.lastName || "นามสกุล"}</p>
                </>
              ) : (
                <>
                  <p>คำนำหน้า</p>
                  <p>ชื่อ</p>
                  <p>นามสกุล</p>
                </>
              )}
            </div>
            <div className="flex text-gray-700 gap-2 text-[16px]">
              เบอร์ติดต่อ :
              {teacherSchedule?.teacher && (
                <p>{teacherSchedule?.teacher.phoneNumber || "08X-XXX-XXXX"}</p>
              )}
            </div>
          </div>
        </div>
        <div className="">
          {" "}
          <button
            className="px-10 py-1.5 flex gap-2 h-fit items-center bg-blue-500 hover:bg-blue-600 text-white rounded-3xl"
            onClick={() => setpopUpAddSubject(true)}
          >
            <PlusCircle className="w-5 h-5 text-white " />
            เพิ่มตารางเรียน
          </button>
        </div>
      </div>
      {isLoading ? (
        <div className="w-full ">
          <div className="py-2 px-5 flex items-center rounded-t-lg gap-6 bg-gradient-to-r from-blue-500 to-indigo-600">
            <CalendarClock className="text-white h-6 w-6" />
            <div className="text-white ">ตารางสอนของอาจารย์</div>
            <div className="flex items-center text-white  gap-4">
              ภาคเรียนที่{" "}
              <p className="px-4 py-0.5 rounded-md  bg-blue-400 w-fit">
                {term}
              </p>
              ปีการศึกษา{" "}
              <p className="px-4 py-0.5 rounded-md  bg-blue-400 w-fit">
                {year}
              </p>
            </div>
          </div>
          <div className="w-full grid grid-cols-[5%_10%_25%_10%_10%_10%_10%_10%_10%] shadow-lg bg-gray-100 text-gray-800 border-t-1 border-b-1 border-gray-400 py-1  text-center text-lg">
            <div className="text-center ">ลำดับ</div>
            <div className="text-center ">รหัสวิชา</div>
            <div className="text-center ">ชื่อวิชา</div>
            <div className="text-center ">ปีหลักสูตร</div>
            <div className="text-center ">สายชั้น</div>
            <div className="text-center ">ห้องเรียน</div>
            <div className="text-center ">คาบเรียน</div>
            <div className="text-center  ">วันสอน</div>
            <div className="text-center "></div>
          </div>{" "}
          {Array.isArray(teacherSchedule?.schedule) &&
          teacherSchedule.schedule.length > 0 ? (
            <div className="w-full">
              {teacherSchedule.schedule.map((d: TeacherScheduleItem, index) => {
                return (
                  <div
                    key={d.level}
                    className="w-full grid grid-cols-[5%_10%_25%_10%_10%_10%_10%_10%_10%] py-1 shadow-md hover:bg-blue-50 border-b-[1px] bg-white border-gray-300"
                  >
                    <div className="border-l-[1px] text-center">
                      {index + 1}
                    </div>
                    <div className="border-l-[1px] text-center">
                      {d.subjectCode}
                    </div>
                    <div className="border-l-[1px] text-start pl-6">
                      {d.subjectName}
                    </div>
                    <div className="border-l-[1px] text-center">
                      {d.curriculumYear}
                    </div>
                    <div className="border-l-[1px] text-center">
                      {d.class}.{d.studentGroupName}
                    </div>
                    <div className="border-l-[1px] text-center">{d.room}</div>
                    <div className="border-l-[1px] text-center">{d.period}</div>
                    <div className="border-l-[1px] text-center">{d.day}</div>
                    <div className="border-l-[1px] flex justify-center boder-r-[1px] text-center">
                      <button
                        onClick={() => {
                          setDeleteTrigger(true);
                          setScheduleSubjectData(d);
                        }}
                        className="px-2 py-1 h-fit rounded-md hover:bg-red-500 hover:scale-105 duration-200 bg-red-400 w-fit"
                      >
                        <Trash2 className="h-4 w-4 text-white" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="w-full py-10 grid place-items-center border-2 border-gray-300 border-dashed rounded-lg">
              <p className="text-4xl text-gray-500 font-extrabold">
                ไม่มีตารางเรียน
              </p>
            </div>
          )}
        </div>
      ) : (
        <LoadingDataTable />
      )}

      {deleteTrigger && scheduleSubjectData && (
        <DeleteScheduleTeacherPopup
          scheduleData={scheduleSubjectData}
          onClosePopup={setDeleteTrigger}
        />
      )}

      {popUpAddSubject == true && (
        <AddTeacherSchedulePopUp
          onClosePopUp={setpopUpAddSubject}
          teacherId={Number(teacherID)}
          onReload={reloadTeacherSchedule}
        />
      )}
    </div>
  );
}
