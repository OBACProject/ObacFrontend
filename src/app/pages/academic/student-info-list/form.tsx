"use client";
import React, { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Combobox } from "@/app/components/combobox/combobox";
import {
  EducationData,
  FacultyInfo,
  educationData,
} from "@/resource/academics/studentInfoList/studentData";
import { Badge } from "@/components/ui/badge";
import {
  StudentColumns,
  studentColumnsData,
} from "@/resource/academics/studentInfoList/studentDataTable";

import { makeColumns } from "@/app/components/table/makeColumns";
import { DataTable } from "@/app/components/table/tableComponent";
import { Input } from "@/components/ui/input";
import { filterProgramsData } from "@/resource/academics/studentInfoList/api/filterProgramsApiParams";
import { filterProgramsParamsData } from "@/dto/studentDto";

export default function Form() {
  const router = useRouter();
  const [group, setGroup] = useState<string | null>();

  const [filterProgramsDataFromApi, setFilterProgramsDataFromApi] = useState<
    filterProgramsParamsData[]
  >([]);
  // filter data from api
  const [classLevelsFilter, setClassLevelsFilter] = useState<string[]>([]);
  const [facultiesFilter, setFacultiesFilter] = useState<string[]>([]);
  const [programsFilter, setProgramsFilter] = useState<string[]>([]);
  const [levelGradeFilter, setLevelGradeFilter] = useState<
    Record<string, string[]>
  >({
    "ปวช.": ["1", "2", "3"],
    "ปวส.": ["1", "2"],
  });
  const [roomFilter, setRoomFilter] = useState<string[]>([]);

  const [searchStudent, setSearchStudent] = useState<string>("");
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
  // const [program, setProgram] = useState<string[]>([]);
  const [sec, setSec] = useState<string[]>([]);

  // get faculties from selected course
  const getFaculties = (courseData: EducationData[]): FacultyInfo[] => {
    return courseData.flatMap((item) => item.groupsCourse);
  };

  const facultyNames = ["พาณิชยกรรม", "การท่องเที่ยว"];
  const programNames = [
    "การบัญชี",
    "การตลาด",
    "คอมพิวเตอร์ธุรกิจ",
    "คอมพิวกราฟฟิค",
    "การจัดการสำนักงาน",
    "การท่องเที่ยว",
  ];

  // // get level from selected faculty
  // const getLevels = (selectedFaculty: string) => {
  //   const faculties = [...vocationalFaculties, ...diplomaFaculties].filter(
  //     (item) => item.faculty === selectedFaculty
  //   );
  //   return faculties[0]?.faculties.map((faculty) => faculty.level) || [];
  // };

  // // get level from selected level
  // const getSec = (selectedLevel: string) => {
  //   const faculties = [...vocationalFaculties, ...diplomaFaculties].find(
  //     (item) => item.faculty === selectedFaculty
  //   );

  //   if (!faculties) return [];

  //   const levelData = faculties.faculties.find(
  //     (faculty) => faculty.level === selectedLevel
  //   );

  //   return levelData?.class || [];
  // };
  console.log(studentColumnsData);
  // Function to handle selection change
  const getFacultiesFromLevels = (classLevel: string) => {
    const faculties = filterProgramsDataFromApi.filter(
      (item) => item.classLevel === classLevel
    );
    return faculties.map((item) => item.facultyName);
  };

  const handleClassLevelChange = (selected: string) => {
    setSelectedClassLevel(selected);
    setSelectedFaculty("");
    setSelectedProgram("");
    setSelectedGradeLevel("");
    setSelectedRoom("");
    handleFacultyChange("");
  };

  const handleFacultyChange = (selected: string) => {
    setSelectedFaculty(selected);
    setSelectedProgram("");
    setSelectedGradeLevel("");
    setSelectedRoom("");
    // const fetchedLevels = getLevels(selected);
    // setLevels(fetchedLevels);
  };
  const handleProgramChange = (selected: string) => {
    setSelectedProgram(selected);
    setSelectedGradeLevel("");
    setSelectedRoom("");
  };

  const handleLevelChange = (selected: string) => {
    setSelectedGradeLevel(selected);
    setSelectedRoom("");
    // const fetchedSec = getSec(selected);
    // setSec(fetchedSec);
  };

  const handleSecChange = (selected: string) => {
    setSelectedRoom(selected);
  };

  useEffect(() => {
    const fetchFilterData = async () => {
      const data = await filterProgramsData();
      console.log("Fetched Data:", data);
      setFilterProgramsDataFromApi(data);
      const levels = Array.from(new Set(data.map((item) => item.classLevel)));
      setClassLevelsFilter(levels);
      // call function to get faculties from levels
      // const faculties = getFacultiesFromLevels();
      // const faculties = Array.from(
      //   new Set(data.map((item) => item.facultyName))
      // );
      // call function to get programName from Faculty
      const programNames = Array.from(
        new Set(data.map((item) => item.programName))
      );
      // call function to get room from programName
      const room = Array.from(new Set(data.map((item) => item.groupName)));
    };
    // edit Data from a educationData
    // course data : [ปวช,ปวส]
    const vocational = educationData.filter((item) => item.course === "ปวช.");
    const diploma = educationData.filter((item) => item.course === "ปวส.");

    // faculty data : [การบัญชี,การตลาด,เทคโนโลยีธุรกิจดิจิทัล]

    setVocationalFaculties(getFaculties(vocational));
    setDiplomaFaculties(getFaculties(diploma));

    // level data : [1,2,3]
    // group data : [1.1,1.2,1.3,1.4,1.5,1.6,1.7,1.8,2.1,2.2,2.3,2.4,2.5,2.6,2.7,2.8,2.9,3.1,3.2,3.3,3.4,3.5,3.6]
  }, []);
  // useEffect for geting Data from filter
  useEffect(() => {
    // call function to get faculties from levels
    if (selectedClassLevel != null) {
      const faculties = getFacultiesFromLevels(selectedClassLevel);
      if (selectedFaculty != null) {
        if (selectedProgram != null) {
          if (selectedGradeLevel != null) {
            if (selectedRoom != null) {
              // call api to get a student data from a groupId
            }
          }
        }
      }
    }
  }, [
    selectedClassLevel,
    selectedFaculty,
    selectedProgram,
    selectedGradeLevel,
    selectedRoom,
  ]);
  // useEffect for searching
  useEffect(() => {
    const normalizedSearch = searchStudent.toLowerCase();
    const filteredStudent = studentColumnsData.filter(
      (student) =>
        student.studentId.toLowerCase().includes(normalizedSearch) ||
        student.studentName.toLowerCase().includes(normalizedSearch) ||
        student.studentSurname.toLowerCase().includes(normalizedSearch) ||
        student.more?.toLowerCase().includes(normalizedSearch)
    );
    setSearchStudentFilter(filteredStudent);
  }, [searchStudent, studentColumnsData]);

  const handleSearch = () => {
    router.push(`/pages/academic/student-info-list/${group}`);
  };

  // ----------------- Table -----------------
  // const [studentData, setStudentData] = useState<StudentColumns[]>([]);
  const studentColumns: StudentColumns[] = [];

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
                    buttonLabel="select education"
                    options={classLevelsFilter.map((classLevel) => ({
                      value: classLevel,
                      label: classLevel,
                    }))}
                    onSelect={(selected) => setSelectedClassLevel(selected)}
                  />
                </div>
                {/* faculty select */}
                <div className="w-1/6 flex flex-col gap-4">
                  <h1 className="text-md font-semibold text-gray-900">
                    หลักสูตรการศึกษา
                  </h1>
                  <Combobox
                    buttonLabel="select faculty"
                    options={facultyNames.map((faculty) => ({
                      value: faculty,
                      label: faculty,
                    }))}
                    onSelect={(selected) => handleFacultyChange(selected)}
                    // disabled={!selectedCourse}
                  />
                  {/* <Combobox
                    buttonLabel="select faculty"
                    options={(selectedCourse === "ปวช."
                      ? vocationalFaculties
                      : diplomaFaculties
                    ).map((item) => ({
                      value: item.faculty,
                      label: item.faculty,
                    }))}
                    onSelect={(selected) => handleFacultyChange(selected)}
                    disabled={!selectedCourse}
                  /> */}
                </div>

                {/* faculty select */}
                <div className="w-1/6 flex flex-col gap-4">
                  <h1 className="text-md font-semibold text-gray-900">สาขา</h1>
                  <Combobox
                    buttonLabel="select program"
                    options={programNames.map((program) => ({
                      value: program,
                      label: program,
                    }))}
                    onSelect={(selected) => handleProgramChange(selected)}
                    disabled={!selectedFaculty}
                  />
                </div>

                {/* level select */}
                {/* <div className="w-1/6 flex flex-col gap-4">
                  <h1 className="text-md font-semibold text-gray-900">
                    ชั้นปี
                  </h1>
                  <Combobox
                    buttonLabel="select Grade Level"
                    options={levels.map((item) => ({
                      value: item,
                      label: item,
                    }))}
                    onSelect={(selected) => handleLevelChange(selected)}
                    disabled={!selectedProgram}
                  />
                </div> */}

                {/* room select */}
                {/* <div className="w-1/6 flex flex-col gap-4">
                  <h1 className="text-md font-semibold text-gray-900">
                    ห้องเรียน
                  </h1>
                  <Combobox
                    buttonLabel="select class"
                    options={sec.map((item) => ({
                      value: item,
                      label: item,
                    }))}
                    onSelect={(selected) => handleSecChange(selected)}
                    disabled={!selectedLevel}
                  />
                </div> */}

                {/* <div className="flex  items-end justify-center ml-10 w-1/6">
                  <button
                    className={`${
                      selectedSec
                        ? "bg-blue-500 hover:bg-blue-400"
                        : "bg-blue-200"
                    } text-md mr-16 rounded-sm w-full py-2  text-white `}
                    disabled={!selectedSec}
                    onClick={handleSearch}
                  >
                    ค้นหา
                  </button>
                </div> */}
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
// const [noneData, setNone] = useState<DropdownData[]>([
//   { id: "01", label: "ไม่มีข้อมูล" },
// ]);
// const [faculty1, setFaculty1] = useState<DropdownData[]>([
//   { id: "01", label: "OBAC Subject A" },
//   { id: "02", label: "OBAC Subject B" },
//   { id: "03", label: "OBAC Subject C" },
//   { id: "04", label: "OBAC Subject D" },
//   { id: "05", label: "OBAC Subject E" },
// ]);

// const [faculty2, setFaculty2] = useState<DropdownData[]>([
//   { id: "11", label: "OBAC Subject F" },
//   { id: "12", label: "OBAC Subject G" },
//   { id: "13", label: "OBAC Subject H" },
//   { id: "14", label: "OBAC Subject I" },
//   { id: "15", label: "OBAC Subject J" },
// ]);

// const [level1, setLevel1] = useState<DropdownData[]>([
//   { id: "1", label: "1" },
//   { id: "2", label: "2" },
//   { id: "3", label: "3" },
// ]);
// const [level2, setLevel2] = useState<DropdownData[]>([
//   { id: "1", label: "1" },
//   { id: "2", label: "2" },
// ]);

// const [subjectA_lv1, setSAL1] = useState<DropdownData[]>([
//   { id: "1", label: "ปวช1.1" },
//   { id: "2", label: "ปวช1.2" },
//   { id: "3", label: "ปวช1.3" },
// ]);
// const [subjectA_lv2, setSAL2] = useState<DropdownData[]>([
//   { id: "1", label: "ปวช2.1" },
//   { id: "2", label: "ปวช2.2" },
// ]);
// const [subjectA_lv3, setSAL3] = useState<DropdownData[]>([
//   { id: "1", label: "ปวช3.1" },
//   { id: "2", label: "ปวช3.2" },
// ]);

// const [subjectB_lv1, setSBL1] = useState<DropdownData[]>([
//   { id: "1", label: "ปวช1.3" },
//   { id: "2", label: "ปวช1.4" },
// ]);
// const [subjectB_lv2, setSBL2] = useState<DropdownData[]>([
//   { id: "1", label: "ปวช2.3" },
//   { id: "2", label: "ปวช2.4" },
// ]);
// const [subjectB_lv3, setSBL3] = useState<DropdownData[]>([
//   { id: "1", label: "ปวช3.3" },
// ]);

// const [subjectC_lv1, setSCL1] = useState<DropdownData[]>([
//   { id: "1", label: "ปวช1.5" },
//   { id: "2", label: "ปวช1.6" },
// ]);
// const [subjectC_lv2, setSCL2] = useState<DropdownData[]>([
//   { id: "1", label: "ปวช2.5" },
//   { id: "2", label: "ปวช2.6" },
// ]);
// const [subjectC_lv3, setSCL3] = useState<DropdownData[]>([
//   { id: "1", label: "ปวช3.4" },
// ]);

// const [subjectD_lv1, setSDL1] = useState<DropdownData[]>([
//   { id: "1", label: "ปวช1.7" },
//   { id: "2", label: "ปวช1.8" },
// ]);
// const [subjectD_lv2, setSDL2] = useState<DropdownData[]>([
//   { id: "1", label: "ปวช2.7" },
//   { id: "2", label: "ปวช2.8" },
// ]);
// const [subjectD_lv3, setSDL3] = useState<DropdownData[]>([
//   { id: "1", label: "ปวช3.5" },
// ]);

// const [subjectE_lv1, setSEL1] = useState<DropdownData[]>([
//   { id: "1", label: "ปวช1.9" },
// ]);
// const [subjectE_lv2, setSEL2] = useState<DropdownData[]>([
//   { id: "1", label: "ปวช2.9" },
// ]);
// const [subjectE_lv3, setSEL3] = useState<DropdownData[]>([
//   { id: "1", label: "ปวช3.6" },
// ]);

// const [subjectF_lv1, setSFL1] = useState<DropdownData[]>([
//   { id: "1", label: "ปวส1.1" },
//   { id: "2", label: "ปวส1.2" },
//   { id: "3", label: "ปวส1.3" },
// ]);
// const [subjectF_lv2, setSFL2] = useState<DropdownData[]>([
//   { id: "1", label: "ปวส2.1" },
//   { id: "2", label: "ปวส2.2" },
// ]);

// const [subjectG_lv1, setSGL1] = useState<DropdownData[]>([
//   { id: "1", label: "ปวส1.4" },
//   { id: "2", label: "ปวส1.5" },
// ]);
// const [subjectG_lv2, setSGL2] = useState<DropdownData[]>([
//   { id: "1", label: "ปวส2.3" },
// ]);

// const [subjectH_lv1, setSHL1] = useState<DropdownData[]>([
//   { id: "1", label: "ปวส1.6" },
//   { id: "2", label: "ปวส1.7" },
// ]);
// const [subjectH_lv2, setSHL2] = useState<DropdownData[]>([
//   { id: "1", label: "ปวส2.4" },
//   { id: "2", label: "ปวส2.5" },
// ]);

// const [subjectI_lv1, setSIL1] = useState<DropdownData[]>([
//   { id: "1", label: "ปวส1.8" },
// ]);
// const [subjectI_lv2, setSIL2] = useState<DropdownData[]>([
//   { id: "1", label: "ปวส2.6" },
// ]);

// const [subjectJ_lv1, setSJL1] = useState<DropdownData[]>([
//   { id: "1", label: "ปวส1.9" },
// ]);
// const [subjectJ_lv2, setSJL2] = useState<DropdownData[]>([
//   { id: "1", label: "ปวส2.7" },
// ]);

// const secondDropdownData =
//   selectedEducation === "1"
//     ? faculty1
//     : selectedEducation === "2"
//     ? faculty2
//     : [];
// const thridDropdownData =
//   selectedEducation === "1" ? level1 : selectedEducation === "2" ? level2 : [];

// const EndDropdownData =
//   faculty == "01" && level == "1"
//     ? subjectA_lv1
//     : faculty == "01" && level == "2"
//     ? subjectA_lv2
//     : faculty == "01" && level == "3"
//     ? subjectA_lv3
//     : faculty == "02" && level == "1"
//     ? subjectB_lv1
//     : faculty == "02" && level == "2"
//     ? subjectB_lv2
//     : faculty == "02" && level == "3"
//     ? subjectB_lv3
//     : faculty == "03" && level == "1"
//     ? subjectC_lv1
//     : faculty == "03" && level == "2"
//     ? subjectC_lv2
//     : faculty == "03" && level == "3"
//     ? subjectC_lv3
//     : faculty == "04" && level == "1"
//     ? subjectD_lv1
//     : faculty == "04" && level == "2"
//     ? subjectD_lv2
//     : faculty == "04" && level == "3"
//     ? subjectD_lv3
//     : faculty == "05" && level == "1"
//     ? subjectE_lv1
//     : faculty == "05" && level == "2"
//     ? subjectE_lv2
//     : faculty == "05" && level == "3"
//     ? subjectE_lv3
//     : faculty == "11" && level == "1"
//     ? subjectF_lv1
//     : faculty == "11" && level == "2"
//     ? subjectF_lv2
//     : faculty == "12" && level == "1"
//     ? subjectG_lv1
//     : faculty == "12" && level == "2"
//     ? subjectG_lv2
//     : faculty == "13" && level == "1"
//     ? subjectH_lv1
//     : faculty == "13" && level == "2"
//     ? subjectH_lv2
//     : faculty == "14" && level == "1"
//     ? subjectI_lv1
//     : faculty == "14" && level == "2"
//     ? subjectI_lv2
//     : faculty == "15" && level == "1"
//     ? subjectJ_lv1
//     : faculty == "15" && level == "2"
//     ? subjectJ_lv2
//     : [];
