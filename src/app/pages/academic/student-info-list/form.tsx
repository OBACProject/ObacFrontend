"use client";
import React, { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Combobox } from "@/app/components/combobox/combobox";
import { Badge } from "@/components/ui/badge";
import {
  StudentColumns,
  studentColumnsData,
} from "@/resource/academics/studentInfoList/studentDataTable";

import { makeColumns } from "@/app/components/table/makeColumns";
import { DataTable } from "@/app/components/table/tableComponent";
import { Input } from "@/components/ui/input";
import { EducationData, FacultyInfo } from "@/dto/studentDto";
import { filterProgramsViewData } from "@/resource/academics/studentInfoList/viewData/filterProgramsParamsViewData";
import { getStudentByGroupIdDataView } from "@/resource/academics/studentInfoList/viewData/getStudentByGroupIdDataView";

export default function Form() {
  const router = useRouter();
  const [group, setGroup] = useState<string | null>();

  // filter data from api
  const classLevels = ["ปวช.", "ปวส."];
  const levelGrade: Record<string, string[]> = {
    "ปวช.": ["1", "2", "3"],
    "ปวส.": ["1", "2"],
  };

  const [searchStudent, setSearchStudent] = useState<string>("");
  const [searchStudentData, setSearchStudentData] = useState<StudentColumns[]>(
    []
  );
  const [searchStudentFilter, setSearchStudentFilter] = useState<
    StudentColumns[]
  >([]);

  // use for selected filter
  const [selectedClassLevel, setSelectedClassLevel] = useState<string>("");
  const [selectedFaculty, setSelectedFaculty] = useState<string>("");
  const [selectedProgram, setSelectedProgram] = useState<string>("");
  const [selectedGradeLevel, setSelectedGradeLevel] = useState<string>("");
  const [selectedRoom, setSelectedRoom] = useState<string>("");

  const [vocationalFaculties, setVocationalFaculties] = useState<FacultyInfo[]>(
    []
  );

  const [diplomaFaculties, setDiplomaFaculties] = useState<FacultyInfo[]>([]);

  const [program, setProgram] = useState<string[]>([]);
  const [levels, setLevels] = useState<string[]>([]);
  const [room, setRoom] = useState<string[]>([]);

  // get faculties from selected course
  const getFaculties = (courseData: EducationData[]): FacultyInfo[] => {
    return courseData.flatMap((faculty) =>
      faculty.groupsCourse.map((group) => ({
        facultyName: group.facultyName,
        groupProgram: group.groupProgram,
      }))
    );
  };
  // get program from selected faculty
  const getPrograms = (selectedFaculty: string) => {
    const faculties = [...vocationalFaculties, ...diplomaFaculties].filter(
      (item) => item.facultyName === selectedFaculty
    );
    return faculties[0]?.groupProgram.map((item) => item.programName) || [];
  };
  // get grade level from selected Program
  const getGradeLevels = () => {
    return levelGrade[selectedClassLevel];
  };

  const getRoom = (selectedGradeLevel: string) => {
    const faculties = [...vocationalFaculties, ...diplomaFaculties].filter(
      (item) => item.facultyName === selectedFaculty
    );
    const program = faculties[0]?.groupProgram.filter(
      (item) => item.programName === selectedProgram
    );
    const group = program[0]?.group.filter((item) => {
      return item.groupName[0] === selectedGradeLevel;
    });
    return group?.map((item) => item.groupName) || [];
  };

  console.log(studentColumnsData);
  // Function to handle selection change

  const handleClassLevelChange = (selected: string) => {
    setSelectedClassLevel(selected);
    setSelectedFaculty("");
    setSelectedProgram("");
    setSelectedGradeLevel("");
    setSelectedRoom("");
  };

  const handleFacultyChange = (selected: string) => {
    setSelectedFaculty(selected);
    setSelectedProgram("");
    setSelectedGradeLevel("");
    setSelectedRoom("");
    const getProgramsBySelected = getPrograms(selected);
    setProgram(getProgramsBySelected);
  };
  const handleProgramChange = (selected: string) => {
    setSelectedProgram(selected);
    setSelectedGradeLevel("");
    setSelectedRoom("");
    const fetchedLevels = getGradeLevels();
    setLevels(fetchedLevels);
  };

  const handleGlassLevelChange = (selected: string) => {
    setSelectedGradeLevel(selected);
    setSelectedRoom("");
    const fetchRooms = getRoom(selected);
    setRoom(fetchRooms);
  };

  const handleRoom = (selected: string) => {
    setSelectedRoom(selected);
  };
  console.log("selectedRoom", selectedRoom);

  useEffect(() => {
    const fetchFilterData = async () => {
      // const data = await getStudentByGroupIdDataView(groupId);
      const data = await filterProgramsViewData();
      console.log("Fetched Data:", data);
      const vocational = data.filter(
        (item: EducationData) => item.classLevel === "ปวช"
      );
      const diploma = data.filter(
        (item: EducationData) => item.classLevel === "ปวส"
      );

      setVocationalFaculties(getFaculties(vocational));
      setDiplomaFaculties(getFaculties(diploma));
    };

    fetchFilterData();
  }, []);

  // useEffect for searching a room by selected grade level
  // useEffect for searching
  useEffect(() => {
    const normalizedSearch = searchStudent.toLowerCase();
    const filteredStudent = searchStudentData.filter(
      (student) =>
        student.studentId.toLowerCase().includes(normalizedSearch) ||
        student.studentName.toLowerCase().includes(normalizedSearch) ||
        student.studentSurname.toLowerCase().includes(normalizedSearch) ||
        student.more?.toLowerCase().includes(normalizedSearch)
    );
    setSearchStudentFilter(filteredStudent);
  }, [searchStudent, studentColumnsData, searchStudentData]);

  const handleSearch = async () => {
    const faculties = [...vocationalFaculties, ...diplomaFaculties].filter(
      (item) => item.facultyName === selectedFaculty
    );
    const program = faculties[0]?.groupProgram.filter(
      (item) => item.programName === selectedProgram
    );
    const group = program[0]?.group.filter((item) => {
      return item.groupName[0] === selectedGradeLevel;
    });

    const selectGroup = group?.filter(
      (item) => item.groupName === selectedRoom
    );
    const groupId = selectGroup[0]?.groupId;
    // console.log("groupId", groupId);
    const data = await getStudentByGroupIdDataView(groupId);
    setSearchStudentData(data);
    // const data = await getStudentByGroupIdDataView();
    // router.push(`/pages/academic/student-info-list/${group}`);
  };

  // ----------------- Table -----------------
  // const [studentData, setStudentData] = useState<StudentColumns[]>([]);

  const handleRowClick = (id: number) => {
    router.push(`/pages/academic/student-details/${id}`);
  };
  const columns = makeColumns<StudentColumns>(
    {
      runningNumber: 1,
      studentId: "",
      studentName: "",
      studentSurname: "",
      blank: "",
      more: "",
    },
    "studentId",
    {
      runningNumber: "No.",
      studentId: "รหัสนักเรียน",
      studentName: "ชื่อ",
      studentSurname: "นามสกุล",
      blank: " ",
      more: "หมายเหตุ",
    }
  );

  return (
    <>
      <header className="mx-4 sm:mx-10 lg:mx-44 p-4 mt-10 flex-col">
        <div className="flex flex-col">
          <div>
            <Badge className="text-xl" variant={"outline"}>
              รายชื่อนักเรียน
            </Badge>
          </div>
          <div className="flex justify-center w-full">
            <div className="flex justify-center w-full">
              {/* filter bar */}
              <div className="flex gap-6 mt-6 w-full bg-slate-200 p-4 rounded-lg">
                {/* ระดับการศึกษา */}
                <div className="w-1/6 flex flex-col gap-4">
                  <h1 className="text-md font-semibold text-gray-900">
                    ระดับการศึกษา
                  </h1>
                  <Combobox
                    buttonLabel="กรุณาเลือกระดับการศึกษา"
                    options={classLevels.map((classLevel) => ({
                      value: classLevel,
                      label: classLevel,
                    }))}
                    onSelect={(selected) => handleClassLevelChange(selected)}
                  />
                </div>
                {/* faculty select */}
                <div className="w-1/6 flex flex-col gap-4">
                  <h1 className="text-md font-semibold text-gray-900">
                    หลักสูตรการศึกษา
                  </h1>
                  <Combobox
                    buttonLabel="กรุณาเลือกหลักสูตร"
                    options={(selectedClassLevel === "ปวช."
                      ? vocationalFaculties
                      : diplomaFaculties
                    ).map((item) => ({
                      value: item.facultyName,
                      label: item.facultyName,
                    }))}
                    onSelect={(selected) => handleFacultyChange(selected)}
                    disabled={!selectedClassLevel}
                  />
                </div>

                {/* faculty select */}
                <div className="w-1/6 flex flex-col gap-4">
                  <h1 className="text-md font-semibold text-gray-900">สาขา</h1>
                  <Combobox
                    buttonLabel="กรุณาเลือกสาขา"
                    options={program.map((program) => {
                      return { value: program, label: program };
                    })}
                    onSelect={(selected) => handleProgramChange(selected)}
                    disabled={!selectedFaculty}
                  />
                </div>

                {/* level select */}
                <div className="w-1/6 flex flex-col gap-4">
                  <h1 className="text-md font-semibold text-gray-900">
                    ชั้นปี
                  </h1>
                  <Combobox
                    buttonLabel="select Grade Level"
                    options={levels.map((item) => ({
                      value: item,
                      label: item,
                    }))}
                    onSelect={(selected) => handleGlassLevelChange(selected)}
                    disabled={!selectedProgram}
                  />
                </div>

                {/* room select */}
                <div className="w-1/6 flex flex-col gap-4">
                  <h1 className="text-md font-semibold text-gray-900">
                    ห้องเรียน
                  </h1>
                  <Combobox
                    buttonLabel="กรุณาเลือกห้องเรียน"
                    options={room.map((item) => ({
                      value: item,
                      label: item,
                    }))}
                    onSelect={(selected) => handleRoom(selected)}
                    disabled={!selectedGradeLevel}
                  />
                </div>

                <div className="flex  items-end justify-center ml-10 w-1/6">
                  <button
                    className={`${
                      selectedRoom
                        ? "bg-blue-500 hover:bg-blue-400"
                        : "bg-blue-200"
                    } text-md mr-16 rounded-sm w-full py-2  text-white `}
                    disabled={!selectedRoom}
                    onClick={handleSearch}
                  >
                    ค้นหา
                  </button>
                </div>
              </div>
            </div>
            {/* <div className="w-1/5"></div> */}
          </div>
          <hr className="bg-black mt-4 text-black" />
          <div className="mt-4 flex flex-col gap-6">
            {/* <h1>
              รายชื่อนักเรียน ห้องเรียน : {selectedSec}
              <br />
              <span className="text-sm text-gray-400">
                พบข้อมูลทั้งหมด {studentColumnsData.length} รายการ
              </span>
            </h1> */}

            <Input
              type="text"
              placeholder="Search..."
              className="w-1/3"
              onChange={(event) => setSearchStudent(event.target.value)}
            />
            <DataTable
              columns={columns}
              data={searchStudentFilter}
              selectedValue="studentId"
              columnWidths={{
                runningNumber: "w-1/12",
                studentId: "w-1/12",
                studentName: "w-1/6",
                studentSurname: "w-1/6",
                blank: "w-1/4",
                more: "w-1/2",
              }}
              onRowClick={handleRowClick}
            />
          </div>
        </div>
      </header>
      <div>
        {/* filter bar */}
        {/* <div className="shadow-md shadow-gray-200 border-b-[1px] border-gray-200 py-5 lg:px-48 sm:px-20 md:px-32 ">
          <div
            className="grid lg:grid-cols[25%_25%_25%_25%] md:grid-cols-4 
        "
          >
            <div className="gridborder-2 lg:place-items-start sm:place-items-start">
              <label className="block pl-1 mb-2 text-md font-semibold text-gray-900">
                ระดับการศึกษา
              </label>
              <select
                id="education"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-md focus:ring-blue-500 focus:border-blue-500 block text-center py-2 px-4 cursor-pointer"
                onChange={handleEducationChange}
              >
                <option value="" selected>
                  -- เลือก --
                </option>
                {education.map((item) => (
                  <option className="text-start" key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid lg:place-items-start sm:place-items-start ">
              <label className="block pl-1  mb-2 text-md font-semibold text-gray-900">
                หลักสูตรการศึกษา
              </label>
              <select
                id="faculty"
                className="w-4/5 bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-md focus:ring-blue-500 focus:border-blue-500 block text-center py-2 px-4 cursor-pointer"
                onChange={handleFacultyChange}
                disabled={!selectedEducation}
              >
                <option value="" selected>
                  -- เลือก --
                </option>
                {secondDropdownData.map((item) => (
                  <option className="text-start" key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid lg:place-items-start sm:place-items-start">
              <label className="block pl-1 mb-2 text-md font-semibold text-gray-900">
                ชั้นปี
              </label>
              <select
                id="level"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-md focus:ring-blue-500 focus:border-blue-500 block text-center py-2 px-4 cursor-pointer"
                disabled={!selectedEducation}
                onChange={handleLevelChange}
              >
                <option value="" selected>
                  -- เลือก --
                </option>
                {thridDropdownData.map((item) => (
                  <option className="text-start" key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid lg:place-items-start sm:place-items-start">
              <label className="block pl-1 mb-2 text-md font-semibold text-gray-900">
                กลุ่มการเรียน
              </label>
              <select
                id="level"
                className="bg-gray-50  w-2/3 border border-gray-300 text-gray-900 text-md rounded-md focus:ring-blue-500 focus:border-blue-500 block text-center py-2 px-4 cursor-pointer"
                disabled={!faculty || !level}
                onChange={handleGroupChange}
              >
                <option value="" selected>
                  -- เลือก --
                </option>
                {EndDropdownData.map((item) => (
                  <option
                    className="text-start"
                    key={item.id}
                    value={item.label}
                  >
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div
            className="w-full mt-5 grid lg:grid-cols-4
          md:grid-cols-4 sm:grid-cols-1"
          >
            <div></div>
            <div></div>
            <div></div>
            <button
              className={`${
                group ? "bg-blue-500 hover:bg-blue-400" : "bg-blue-200"
              } text-md mr-16 rounded-sm w-2/3 py-2  text-white `}
              disabled={!group}
              onClick={handleSearch}
            >
              ค้นหา
            </button>
          </div>
          <hr className="my-5" />
          <div className=" flex mt-10 mb-5  gap-0">
            <input
              type="text"
              placeholder="รหัสนักเรียน"
              className="text-md  border-gray-300 bg-gray-50 border-2 border-r-[0px] w-fit rounded-l-md px-5 py-2 focus:outline-blue-400"
            />
            <button
              className={`text-md mr-16 rounded-r-md py-2 px-5 text-white bg-blue-500 hover:bg-blue-400`}
              onClick={handleSearch}
            >
              <Search
                style={{ width: "1.0rem", height: "1.0rem" }}
                className="text-[#ffff]"
              />
            </button>
          </div>
        </div> */}
      </div>
    </>
  );
}
