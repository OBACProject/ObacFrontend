"use client";
import React, { useEffect, useState } from "react";
import MenuBar from "./MenuBar";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Combobox } from "@/app/components/combobox/combobox";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/app/components/table/tableComponent";
import { TeacherColumns } from "@/resource/academics/teacherInfoList/teacherDataTable";
import { makeColumns } from "@/app/components/table/makeColumns";
import { getTeacherInfoViewData } from "@/resource/academics/teacherInfoList/viewData/teacherInfoViewData";

export default function Form() {
  const router = useRouter();
  const id = "test";
  const handleSearch = () => {
    router.push(`/pages/academic/schedule-management/${id}`);
  };

  // data from api
  const [teacherInfoData, setTeacherInfoData] = useState<TeacherColumns[]>([]);
  const [searchTeacherFilter, setSearchTeacherFilter] = useState<
    TeacherColumns[]
  >([]);

  const [selectedProgram, setSelectedProgram] = useState<string>("");
  const [searchTeacher, setSearchTeacher] = useState<string>("");

  // const programNames = [
  //   "การบัญชี",
  //   "การตลาด",
  //   "คอมพิวเตอร์ธุรกิจ",
  //   "คอมพิวกราฟฟิค",
  //   "การจัดการสำนักงาน",
  //   "การท่องเที่ยว",
  // ];
  const [programNames, setProgramNames] = useState<string[]>([]);
  console.log("programNames", programNames);
  const handleCourseChange = (selected: string) => {
    setSelectedProgram(selected);
  };

  useEffect(() => {
    const normalizedSearch = searchTeacher.toLowerCase();
    const filtered = teacherInfoData?.filter((item) => {
      const matchSearch =
        item.teacherName.toLowerCase().includes(normalizedSearch) ||
        item.teacherSurname.toLowerCase().includes(normalizedSearch) ||
        item.programs.toLowerCase().includes(normalizedSearch) ||
        item.email.toLowerCase().includes(normalizedSearch) ||
        item.phoneNumber.toLowerCase().includes(normalizedSearch);

      const matchProgram = selectedProgram
        ? item.programs === selectedProgram
        : true;

      return matchSearch && matchProgram;
    });
    setSearchTeacherFilter(filtered);
  }, [searchTeacher, selectedProgram, teacherInfoData]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTeacherInfoViewData();
      setTeacherInfoData(data);

      const programNames = Array.from(
        new Set(data.map((item) => item.programs).filter((program) => program))
      );

      setProgramNames(programNames);
    };

    fetchData();
  }, []);
  console.log("teacherInfoData", teacherInfoData);

  const columns = makeColumns<TeacherColumns>(
    {
      runningNumber: 1,
      teacherId: "",
      teacherName: "",
      teacherSurname: "",
      programs: "",
      email: "",
      phoneNumber: "",
    },
    "teacherId",
    {
      runningNumber: "No.",
      teacherId: "รหัสอาจารย์",
      teacherName: "ชื่อ",
      teacherSurname: "นามสกุล",
      programs: "สาขาวิชา",
      email: "อีเมล",
      phoneNumber: "เบอร์โทร",
    }
  );

  return (
    <div>
      {/* <MenuBar /> */}
      <header className="mx-4 sm:mx-10 lg:mx-44 p-4 mt-10 flex-col">
        <div className="flex flex-col">
          <div>
            <Badge className="text-xl" variant={"outline"}>
              รายชื่ออาจารย์
            </Badge>
          </div>
        </div>
        <div className="flex justify-center w-full">
          <div className="flex justify-center w-full">
            <div className="flex gap-6 mt-6 w-full p-4 rounded-lg">
              <div className="w-1/6 flex flex-col gap-4">
                <h1>สาขาวิชา</h1>
                <Combobox
                  buttonLabel="select education"
                  options={programNames.map((item) => ({
                    value: item,
                    label: item,
                  }))}
                  onSelect={(selected) => handleCourseChange(selected)}
                />
              </div>
              <div className="flex flex-col w-2/6 gap-4">
                <h1>ค้นหารายชื่ออาจารย์</h1>
                <Input
                  type="text"
                  placeholder="Search..."
                  onChange={(event) => setSearchTeacher(event.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <DataTable
          columns={columns}
          data={searchTeacherFilter}
          selectedValue=""
          columnWidths={{
            runningNumber: "w-1/12",
            teacherId: "w-1/12",
            teacherName: "w-1/6",
            teacherSurname: "w-1/6",
            programs: "w-1/6",
            email: "w-1/6",
            phoneNumber: "w-1/6",
          }}
        />
      </header>
      {/* <div className="py-5 border-b-[1px] border-gray-100 shadow-md shadow-gray-100 ">
        <div className="my-5 text-center text-black text-3xl ">
          รายชื่ออาจารย์
        </div>
        <div className="flex my-10 justify-center">
          <input
            type="text"
            placeholder="ชื่ออาจารย์"
            className="px-5  border-r-none focus:outline-blue-400 focus:outline-r-white border-gray-200 py-1 rounded-l-md border "
          />
          <button
            className="px-5 text-white py-1 bg-blue-500 hover:bg-blue-400 cursor-pointer rounded-r-md"
            onClick={handleSearch}
          >
            ค้นหา
          </button>
        </div>
      </div> */}
    </div>
  );
}
