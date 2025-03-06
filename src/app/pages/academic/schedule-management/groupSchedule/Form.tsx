import { fetchGetScheduleOfStudentGroupByGroupID } from "@/api/schedule/scheduleAPI";
import { StudentGroupScheduleSubject } from "@/dto/schedule";
import { Boxes, PlusCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import AddGroupSchedulePopUp from "./AddGroupSchedulePopUp";

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
    return [];
  }
};

export default function Form({ term, year, groupId }: Props) {
  const [schedules, setSchedules] = useState<StudentGroupScheduleSubject[]>([]);
  const [scheduleBtn, setScheduleBtn] = useState<boolean>(false);

  useEffect(() => {
    getSchedule(term, year, groupId).then((item: any) => {
      setSchedules(item);
    });
  }, []);
  const GroupName =
    schedules?.length > 0 &&
    `${schedules[0]?.class}.${schedules[0]?.groupName}`;

  return (
    <div className="w-full  px-10 ">
      <div className="py-5 flex justify-center ">
        <h1 className="px-10 text-xl py-2 bg-pink-500 text-white flex gap-2 items-center rounded-3xl">
          <Boxes className="h-8 w-8" />
          ตารางเรียนของห้องเรียน
        </h1>
      </div>
      <div className="w-full py-2 flex justify-between items-center ">
        {schedules.map((item, index) => (
          <div key={item.class} className="flex gap-2">
            <div className="flex gap-4 items-center">
              <p className="py-1 px-2 rounded-md border border-gray-400  text-gray-950">
                {item.class}.{item.groupName}
              </p>
              <p className="py-1 px-2 rounded-md border border-gray-400">
                ภาคเรียนที่ {item.term} ปีการศึกษา {item.year}
              </p>
              <p className="py-1 px-2 rounded-md border border-gray-400">
                จำนวนวิชาเรียน {item.totalSubject} วิชา
              </p>
              <p className="py-1 px-2 rounded-md border border-gray-400">
                {item.totalCredit} หน่วยกิต
              </p>
            </div>
          </div>
        ))}

        <div className="">
          {" "}
          <button
            className="px-10 py-1.5 flex gap-2 h-fit items-center bg-blue-500 hover:bg-blue-600 text-white rounded-3xl"
            onClick={() => setScheduleBtn(true)}
          >
            <PlusCircle className="w-5 h-5 text-white  " />
            เพิ่มตารางเรียน
          </button>
        </div>
      </div>

      <div className="w-full ">
        <div className="w-full grid grid-cols-[5%_10%_20%_20%_10%_10%_10%_15%] bg-[#cfe4ff] text-blue-950 border-2 border-gray-400 text-lg rounded-t-sm">
          <div className="text-center py-2 border-r-2 border-gray-400 ">
            ลำดับ
          </div>
          <div className="text-center py-2 border-r-2 border-gray-400">
            รหัสวิชา
          </div>
          <div className="text-center py-2  border-r-2 border-gray-400">
            ชื่อวิชา
          </div>
          <div className="text-center py-2 border-r-2 border-gray-400">
            อาจารย์ผู้สอน
          </div>
          <div className="text-center py-2 border-r-2 border-gray-400">
            ห้องเรียน
          </div>
          <div className="text-center py-2 border-r-2 border-gray-400">
            หน่วยกิต
          </div>
          <div className="text-center py-2 border-r-2 border-gray-400">
            คาบเรียน
          </div>
          <div className="text-center py-2 ">วันสอน</div>
        </div>
        {schedules.length > 0 ? (
          <div>
            {schedules?.map((item: StudentGroupScheduleSubject, index) => (
              <div key={index}>
                {item.scheduleSubjects.map((subject, subIndex) => (
                  <div
                    key={subIndex}
                    className={` ${
                      subIndex % 2 == 0 ? "bg-white" : "bg-gray-100"
                    } grid grid-cols-[5%_10%_20%_20%_10%_10%_10%_15%]   border text-[16px] border-gray-400 text-gray-700  border-t-0`}
                  >
                    <div className="text-center flex items-center w-full justify-center text-gray-700 border-r py-2  border-gray-400">
                      {subIndex + 1}
                    </div>
                    <p className="text-start flex items-center px-4 border-r border-gray-400   py-1 line-clamp-1">
                      {subject.subjectCode}
                    </p>
                    <p className="text-start flex items-center  px-4 border-r border-gray-400  py-1 line-clamp-1">
                      {subject.subjectName}
                    </p>
                    <p className="text-center flex items-center justify-center border-r border-gray-400">
                      {subject.teacherName}&nbsp;&nbsp;&nbsp;&nbsp;
                      {subject.teacherLastName}
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
          <div className="grid place-items-center border text-[24px] border-gray-400  text-gray-700 py-10 text-center">
            ไม่มีตารางเรียน
          </div>
        )}
      </div>
      {scheduleBtn && GroupName && (
        <AddGroupSchedulePopUp
          term={term}
          year={year}
          groupId={groupId}
          groupName={GroupName}
          onClosePopUp={setScheduleBtn}
        />
      )}
    </div>
  );
}
