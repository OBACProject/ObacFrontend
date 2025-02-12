import { fetchGetScheduleOfStudentGroupByGroupID } from "@/api/schedule/scheduleAPI";
import { StudentGroupScheduleSubject } from "@/dto/schedule";
import React, { useEffect, useState } from "react";

type Props = {
  term: string;
  year: string;
  groupId: number;
};

const getSchedule = async (term: string, year: string, groupId: number) => {
  try {
    const response = await fetchGetScheduleOfStudentGroupByGroupID(
      groupId,
      Number(term),
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
  useEffect(() => {
    getSchedule(term, year, groupId).then((item: any) => {
      setSchedules(item);
    });
  }, []);
  console.log(schedules);
  return (
    <div className="w-full  px-10 ">
      <div className="py-5 flex justify-center ">
        <h1 className="px-10 text-xl py-1 bg-gray-700 text-white rounded-3xl">
          ตารางสอนของห้องเรียน
        </h1>
      </div>
      <div className="w-full ">
        <div className="w-full grid grid-cols-[5%_10%_20%_10%_10%_10%_10%_10%_15%] bg-[#cfe4ff] text-blue-950 border border-blue-100 text-lg py-2 rounded-t-md">
          <div className="text-center">ลำดับ</div>
          <div className="text-center">รหัสวิชา</div>
          <div className="text-center">ชื่อวิชา</div>
          <div className="text-center">สายชั้น</div>
          <div className="text-center">กลุ่มนักเรียน</div>
          <div className="text-center">ห้องเรียน</div>
          <div className="text-center">หน่วยกิต</div>
          <div className="text-center">คาบเรียน</div>
          <div className="text-center">วันสอน</div>
        </div>
        {schedules.length > 0 ? (
          <div>
            {schedules?.map((item: StudentGroupScheduleSubject, index) => (
              <div key={index}>
                {item.scheduleSubjects.map((subject, subIndex) => (
                  <div
                    key={index}
                    className={` ${
                      index % 2 == 0 ? "bg-white" : "bg-gray-100"
                    } grid grid-cols-[5%_10%_20%_10%_10%_10%_10%_10%_15%]   border text-[16px] border-gray-400 text-gray-700  border-t-0`}
                  >
                    <div className="text-center flex items-center w-full justify-center text-gray-700 border-r py-2  border-gray-400">
                      {index + 1}
                    </div>
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
          <div className="grid place-items-center border text-[24px] border-gray-400  text-gray-700 py-10 text-center">
            ไม่มีตารางเรียน
          </div>
        )}
      </div>
    </div>
  );
}
