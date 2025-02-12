"use client";
import { DataTable } from "@/app/components/bellTable/table_style_1";
import { Combobox } from "@/app/components/combobox/combobox";
import { Input } from "@/components/ui/input";
import { FacultyInfo, EducationData } from "@/dto/studentDto";
import {
  filterProgramsViewData,
  getRawProgramViewData,
} from "@/resource/academics/studentInfoList/viewData/filterProgramsParamsViewData";
import { useEffect, useMemo, useState } from "react";

interface ClassroomTable {
  class: string;
  faculty: string;
  program: string;
  room: string;
}

export function ClassroomGrading(props: {
  handleTab: (tab: string) => void;
  handleSelectedData: (data: { groupId: number; room: string }) => void;
}) {
  const classLevels = ["ปวช", "ปวส"];
  const levelGrade: Record<string, string[]> = {
    ปวช: ["1", "2", "3"],
    ปวส: ["1", "2"],
  };
  // data in table
  const [dataTable, setDataTable] = useState<ClassroomTable[]>([]);
  console.log("dataTable", dataTable);

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

  const [searchClassroom, setSearchClassroom] = useState<string>("");

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

  //   console.log(studentColumnsData);
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

      // set for table data
      const rawData = await getRawProgramViewData();
      const formattedData: ClassroomTable[] = rawData.map((item) => ({
        class: item.classLevel,
        faculty: item.facultyName,
        program: item.programName,
        room: item.groupName, // Adjust if this doesn't match the expected "room"
      }));
      setDataTable(formattedData);

      // set for filter data
      const data = await filterProgramsViewData();
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

  const filteredData = useMemo(() => {
    const normalizedSearch = searchClassroom.toLowerCase();
    const filtered = dataTable.filter((item) => {
      const matchSearch =
        item.class.toLowerCase().includes(normalizedSearch) ||
        item.faculty.toLowerCase().includes(normalizedSearch) ||
        item.program.toLowerCase().includes(normalizedSearch) ||
        item.room.toLowerCase().includes(normalizedSearch);
      const matchClassLevel = selectedClassLevel
        ? item.class === selectedClassLevel
        : true;
      const matchFaculty = selectedFaculty
        ? item.faculty === selectedFaculty
        : true;
      const matchProgram = selectedProgram
        ? item.program === selectedProgram
        : true;
      const matchGradeLevel = selectedGradeLevel
        ? item.room.charAt(0) === selectedGradeLevel
        : true;
      const matchRoom = selectedRoom ? item.room === selectedRoom : true;

      return (
        matchSearch &&
        matchClassLevel &&
        matchFaculty &&
        matchProgram &&
        matchGradeLevel &&
        matchRoom
      );
    });
    return filtered;
  }, [
    dataTable,
    selectedClassLevel,
    selectedFaculty,
    selectedProgram,
    selectedGradeLevel,
    selectedRoom,
    searchClassroom,
  ]);
  console.log("filteredData", filteredData);

  const columns = [
    { label: "ลำดับ", key: "index", className: "w-1/12" },
    { label: "ระดับชั้น", key: "class", className: "w-1/12" },
    { label: "หลักสูตรการศึกษา", key: "faculty", className: "w-4/12" },
    { label: "สาขาวิชา", key: "program", className: "w-3/12" },
    { label: "ห้องเรียน", key: "room", className: "w-3/12" },
  ];

  return (
    <>
      <header className="flex flex-col p-4 border-2 mt-4 rounded-lg">
        <div className="flex gap-12 mt-6">
          <div className="flex justify-center w-full">
            <div className="flex gap-6 mt-6 w-full p-4 rounded-lg">
              <div className="w-1/6 flex flex-col gap-4">
                <h1>ระดับการศึกษา</h1>
                <Combobox
                  options={classLevels.map((classData) => ({
                    value: classData,
                    label: classData,
                  }))}
                  buttonLabel="ระดับการศึกษา"
                  onSelect={(selectedClass) =>
                    handleClassLevelChange(selectedClass)
                  }
                />
              </div>
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
              <div className="w-1/6 flex flex-col gap-4">
                <h1 className="text-md font-semibold text-gray-900">ชั้นปี</h1>
                <Combobox
                  buttonLabel="กรุณาเลือกชั้นปี"
                  options={levels.map((item) => ({
                    value: item,
                    label: item,
                  }))}
                  onSelect={(selected) => handleGlassLevelChange(selected)}
                  disabled={!selectedProgram}
                />
              </div>
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
            </div>
          </div>
          <hr className="bg-black mt-4 text-black" />
        </div>
        <div className="mt-4 flex flex-col gap-6">
          <Input
            type="text"
            placeholder="Search..."
            className="w-1/3"
            onChange={(event) => setSearchClassroom(event.target.value)}
          />
        </div>
        <DataTable
          columns={columns}
          data={filteredData.map((item, index) => ({
            ...item,
            index: index + 1,
          }))}
          pagination={10}
        />
      </header>
    </>
  );
}
