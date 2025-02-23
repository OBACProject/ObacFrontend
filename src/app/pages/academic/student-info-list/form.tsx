"use client";
import React, { useEffect, useState } from "react";
import { ClassroomGrading } from "./classroomGrading";
import { fetchGetAllStudent } from "@/api/student/studentApi";
import { GetAllStudent } from "@/dto/studentDto";
import { useRouter } from "next/navigation";
import Select from "react-select";
import { Search } from "lucide-react";
export interface ClassroomByGroupIdProps {
  groupId: number;
  term: string;
  year: string;
  classroom: string;
}

const getStudentList = async () => {
  try {
    const response = await fetchGetAllStudent();
    return response;
  } catch (err) {}
};

export default function Form() {
  const [studentListName, setStudentListName] = useState<GetAllStudent[]>([]);
  useEffect(() => {
    getStudentList().then((item: any) => {
      setStudentListName(item);
    });
  }, []);
  const [selectedStudent, setSelectedStudent] = useState<{
    value: number;
    label: string;
  } | null>(null);
  const [activeTab, setActiveTab] = useState<string>("classroom");
  const handleTab = (tab: string) => {
    if (activeTab === tab) return;
    setActiveTab(tab);
    if (activeTab === "classroomByGroupId") {
      setSelectedClassroomData(undefined);
    }
  };
  const [selectedClassroomData, setSelectedClassroomData] =
    useState<ClassroomByGroupIdProps>();

  const router = useRouter();
  const handleSelectedClassRoomDataByGroupId = (
    data: ClassroomByGroupIdProps
  ) => {
    setSelectedClassroomData(data);
    setActiveTab("classroomByGroupId");
  };
  const handleSubjectChange = (
    option: { value: number; label: string } | null
  ) => {
    setSelectedStudent(option);
  };

  const onSearch = ()=>{
      router.push(`/pages/academic/student-details/${selectedStudent?.value}`);
    
  }

  const studentNameOptions = studentListName.map((item) => ({
    value: item.studentId,
    label: `${item.studentCode} ${item.thaiName} ${item.thaiLastName}`,
  }));

  return (
    <div className="py-5 w-full">
      <div className="flex justify-between items-center">
        <h1 className="px-10 py-2 rounded-3xl translate-x-16 text-xl w-fit bg-gray-600 text-white">
          รายชื่อและข้อมูลนักเรียน
        </h1>
        <div className=" flex items-center gap-4  px-10">
          <div className="flex w-[350px] gap-1 items-center">
            <button className="bg-gray-400  py-1.5 enabled:bg-gray-500 enabled:hover:bg-gray-700 flex gap-2 items-center text-white rounded-md px-4" onClick={()=>{ onSearch()}} disabled={!selectedStudent}> 
              <Search className="w-5 h-5"/>
              ค้นหา
            </button>
            <Select
              options={studentNameOptions}
              value={selectedStudent}
              onChange={handleSubjectChange}
              isSearchable
              placeholder="-- รหัสนักเรียน --"
              styles={{
                container: (provided) => ({
                  ...provided,
                  width: "100%", 
                }),
              }}
            />
          </div>
          <div>
            <button className="text-sm px-10 py-2 bg-blue-500 rounded-sm text-white hover:bg-blue-600">
              รายชื่อนักเรียนทั้งหมด
            </button>
          </div>
        </div>
      </div>
      <div>
        {activeTab === "classroom" && (
          <ClassroomGrading
            handleTab={handleTab}
            handleSelectedData={handleSelectedClassRoomDataByGroupId}
          />
        )}
      </div>
    </div>
  );
}
