"use client";
import { CalendarClock, PlusCircle, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import AddGroupSchedulePopUp from "@/components/common/Popup/AddGroupSchedulePopup";
import { GetStudentGroupScheduleStatus } from "@/api/studentGroup/route";
import {
  ScheduleItemStudentGroups,
  StudentGroupScheduleStatus,
} from "@/dto/studentGroupItem";
import DeleteScheduleSutdentGroupPopup from "@/components/common/Popup/DeleteScheduleSutdentGroupPopup";
import LoadingDataTable from "@/components/common/loading/LoadingDataTable";

type Props = {
  term: string;
  year: string;
  groupId: number;
};

export default function Form({ term, year, groupId }: Props) {
  const [deleteTrigger, setDeleteTrigger] = useState<boolean>(false);
  const [scheduleSubjectData, setScheduleSubjectData] =
    useState<ScheduleItemStudentGroups>();
  const [popUpAddSubject, setpopUpAddSubject] = useState<boolean>(false);
  const [scheduleGroup, setScheduleGroup] =
    useState<StudentGroupScheduleStatus>();

  useEffect(() => {
    GetStudentGroupScheduleStatus(groupId, term, Number(year)).then(
      (d: StudentGroupScheduleStatus | null) => {
        if (d) {
          setScheduleGroup(d);
          setIsLoading(true);
        }
      }
    );
  }, []);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    GetStudentGroupScheduleStatus(groupId, term, Number(year)).then(
      (d: StudentGroupScheduleStatus | null) => {
        if (d) {
          setScheduleGroup(d);
        }
      }
    );
  }, [groupId, term, year]);
  return (
    <div className="w-full px-10">
      <div className="w-full py-2 flex justify-between items-center">
        <div></div>
        <button
          className="px-10 py-1.5 flex gap-2 h-fit items-center bg-blue-500 hover:bg-blue-600 text-white rounded-3xl"
          onClick={() => setpopUpAddSubject(true)}
        >
          <PlusCircle className="w-5 h-5 text-white " />
          เพิ่มตารางเรียน
        </button>
      </div>
      {isLoading ? (
        <div className="w-full">
          <div className="py-2 px-5 flex items-center rounded-t-lg gap-6 bg-gradient-to-r from-blue-500 to-indigo-600">
            <CalendarClock className="w-6 h-6 text-white" />
            <div className="text-lg flex items-center justify-start gap-4 text-white font-prompt ">
              ตารางสอนของห้อง {scheduleGroup?.class}.{scheduleGroup?.groupName}
            </div>
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
            <div className="flex items-center text-white  gap-4">
              หลักสูตร
              <p className="px-4 py-0.5 rounded-md  bg-blue-400 w-fit">
                {scheduleGroup?.facultyName}
              </p>
            </div>
          </div>
          <div className="w-full  grid grid-cols-[5%_10%_25%_10%_15%_10%_10%_10%_5%] shadow-lg bg-gray-100 text-gray-800 border-t-1 border-b-1 border-gray-400 py-1  text-center text-lg">
            <div className="text-center">ลำดับ</div>
            <div className="text-center ">รหัสวิชา</div>
            <div className="text-center ">ชื่อวิชา</div>
            <div className="text-center ">ปีหลักสูตร</div>
            <div className="text-center ">อาจารย์ผู้สอน</div>
            <div className="text-center ">คาบเรียน</div>
            <div className="text-center ">วัน</div>
            <div className="text-center ">ห้องเรียน</div>
            <div className="text-center "></div>
          </div>
          {Array.isArray(scheduleGroup?.schedules) &&
          scheduleGroup.schedules.length > 0 ? (
            <div className="w-full">
              {scheduleGroup?.schedules.map(
                (d: ScheduleItemStudentGroups, index) => {
                  return (
                    <div
                      key={`${d.subjectCode}-${d.day}-${d.period}`}
                      className="w-full shadow-md py-1 grid grid-cols-[5%_10%_25%_10%_15%_10%_10%_10%_5%] hover:bg-blue-50 border-b-[1px] bg-white border-gray-300"
                    >
                      <div className="border-l-[1px] text-center">
                        {index + 1}
                      </div>
                      <div className="border-l-[1px] h-full text-start pl-2 lg:pl-6">
                        {d.subjectCode}
                      </div>
                      <div className="border-l-[1px] text-start pl-2 lg:pl-6">
                        {d.subjectName}
                      </div>
                      <div className="border-l-[1px] text-center">
                        {d.curriculumYear}
                      </div>
                      <div className="border-l-[1px] text-start pl-2 lg:pl-6">
                        {d.teacherName} {d.teacherLastname}
                      </div>
                      <div className="border-l-[1px] text-center">
                        {d.period}
                      </div>
                      <div className="border-l-[1px] text-center">{d.day}</div>
                      <div className="border-l-[1px] text-center">{d.room}</div>
                      <div className="border-l-[1px] h-full text-center">
                        <button
                          onClick={() => {
                            setDeleteTrigger(true);
                            setScheduleSubjectData(d);
                            // alert(d.subjectId);
                          }}
                          className="px-2 py-1 rounded-md hover:bg-red-500 hover:scale-105 duration-200 bg-red-400 w-fit"
                        >
                          <Trash2 className="h-4 w-4 text-white" />
                        </button>
                      </div>
                    </div>
                  );
                }
              )}
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
        <DeleteScheduleSutdentGroupPopup
          scheduleData={scheduleSubjectData}
          onClosePopup={setDeleteTrigger}
        />
      )}
      {popUpAddSubject == true && (
        <AddGroupSchedulePopUp
          onClosePopUp={setpopUpAddSubject}
          groupId={groupId}
          term={term}
          year={Number(year)}
          // onReload={scheduleGroup}
        />
      )}
    </div>
  );
}
