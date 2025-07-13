"use client";
import React, { useEffect, useState } from "react";
import { ClassroomGrading } from "./classroomGrading";
import { fetchGetAllStudent } from "@/api/oldApi/student/studentApi";
import { GetAllStudent } from "@/dto/studentDto";
import { useRouter } from "next/navigation";
import Select from "react-select";
import { BookUser, Loader2, Search } from "lucide-react";
import { mockStudents } from "@/resource/academics/mockData";
import HeaderLabel from "@/components/common/labelText/HeaderLabel";
export interface ClassroomByGroupIdProps {
  groupId: number;
  term: string;
  year: string;
  classroom: string;
}

const getStudentList = async () => {
  try {
    // const response = await fetchGetAllStudent();
    const response = mockStudents;
    return response;
  } catch (err) {}
};

export default function Form() {
  const [studentListName, setStudentListName] = useState<GetAllStudent[]>([]);
  const [activeTab, setActiveTab] = useState<string>("classroom");
  const [selectedClassroomData, setSelectedClassroomData] =
    useState<ClassroomByGroupIdProps>();
  const router = useRouter();
  const [searchTrigger, setSearchTrigger] = useState<boolean>(false);

  useEffect(() => {
    getStudentList().then((item: any) => {
      setStudentListName(item);
    });
  }, []);

  const [selectedStudent, setSelectedStudent] = useState<{
    value: number;
    label: string;
  } | null>(null);

  const handleTab = (tab: string) => {
    if (activeTab === tab) return;
    setActiveTab(tab);
    if (activeTab === "classroomByGroupId") {
      setSelectedClassroomData(undefined);
    }
  };

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

  const onSearch = () => {
    setSearchTrigger(true);
    router.push(`/academic/student-details/${selectedStudent?.value}`);
  };

  const studentNameOptions = studentListName.map((item) => ({
    value: item.studentId,
    label: `${item.studentCode} ${item.thaiName} ${item.thaiLastName}`,
  }));

  return (
    <div className="py-5 w-full">
      <div className="w-full justify-start px-5 flex">
        <HeaderLabel
          Icon={<BookUser className="h-7 w-7 text-white" />}
          bg_icon="bg-blue-500"
          title="รายชื่อและข้อมูลนักเรียน"
          className="text-blue-600"
        />
      </div>
      <div className="pt-2 grid place-items-start">
        <div className=" flex justify-between w-full items-center gap-4 ">
          <div className="flex w-[400px] gap-1 items-center px-5">
            <Select
              options={studentNameOptions}
              value={selectedStudent}
              onChange={handleSubjectChange}
              isSearchable
              placeholder="   -- รหัสนักเรียน --"
              styles={{
                container: (provided) => ({
                  ...provided,
                  width: "100%",
                }),
              }}
            />{" "}
            {searchTrigger ? (
              <button className=" py-1.5 bg-blue-400 flex gap-2  items-center text-white rounded-md px-4">
                <Loader2 className="w-5 h-5 animate-spin" />
                ค้นหา
              </button>
            ) : (
              <button
                className="bg-blue-300  py-1.5 enabled:bg-blue-500 enabled:hover:bg-blue-600 flex gap-2 items-center text-white rounded-md px-4"
                onClick={() => {
                  onSearch();
                }}
                disabled={!selectedStudent}
              >
                <Search className="w-5 h-5" />
                ค้นหา
              </button>
            )}
          </div>
          <div className="px-5">
            <button
              className="text-sm px-10 py-2 bg-blue-500 rounded-sm text-white hover:bg-blue-600"
              onClick={() => {
                router.push("/academic/student-name-list/student-list");
              }}
            >
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
