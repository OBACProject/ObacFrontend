"use client";
import { DataTable } from "@/app/components/bellTable/table_style_1";
import { Combobox } from "@/app/components/combobox/combobox";
import {
  FacultyInfo,
  EducationData,
  filterProgramsParamsData,
} from "@/dto/studentDto";
import {
  filterProgramsViewData,
  getRawProgramViewData,
} from "@/resource/academics/studentInfoList/viewData/filterProgramsParamsViewData";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

interface ClassroomTable {
  classLevel: string;
  faculty: string;
  program: string;
  groupId: string;
}

export function ClassroomGrading(props: {
  handleTab: (tab: string) => void;
  handleSelectedData: (data: {
    groupId: number;
    term: string;
    year: string;
    classroom: string;
  }) => void;
}) {
  const classLevels = ["ปวช", "ปวส"];
  const levelGrade: Record<string, string[]> = {
    ปวช: ["1", "2", "3"],
    ปวส: ["1", "2"],
  };
  const term = ["1", "2"];
  const currentYear = new Date().getFullYear() - 1;
  const yearsList = Array.from({ length: 5 }, (_, i) =>
    (currentYear - i).toString()
  );
  const [selectedTerm, setSelectedTerm] = useState<string>("1");
  const [selectedYear, setSelectedYear] = useState<string>(
    currentYear.toString()
  );
  // data in table
  const [dataTable, setDataTable] = useState<ClassroomTable[]>([]);

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

  const router = useRouter();
  const handleRowClick = (item: ClassroomTable) => {
    router.push(
      `/pages/academic/student-info-list/studentGroup?groupId=${item.groupId}`
    );
  };

  useEffect(() => {
    const fetchFilterData = async () => {
      const rawData = await getRawProgramViewData();
      const formattedData: ClassroomTable[] = rawData.map(
        (item: filterProgramsParamsData) => ({
          classLevel: `${item.class}. ${item.groupName}`,
          faculty: item.facultyName,
          groupId: item.groupId,
          program: item.programName,
        })
      );

      setDataTable(formattedData);

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
    const filtered = dataTable.filter((item) => {
      const matchClassLevel = selectedClassLevel
        ? item.classLevel.substring(0, 3) === selectedClassLevel
        : true;
      const matchFaculty = selectedFaculty
        ? item.faculty === selectedFaculty
        : true;
      const matchProgram = selectedProgram
        ? item.program === selectedProgram
        : true;
      const matchRoom = selectedRoom
        ? item.classLevel === selectedClassLevel
        : true;

      return (
        // matchSearch &&
        matchClassLevel && matchFaculty && matchProgram && matchRoom
      );
    });
    const sortedData = filtered.sort((a, b) => +a.groupId - +b.groupId);

    return sortedData;
  }, [
    dataTable,
    selectedClassLevel,
    selectedFaculty,
    selectedProgram,
    selectedGradeLevel,
    selectedRoom,
    // searchClassroom,
  ]);
  // console.log("filteredData", filteredData);

  const columns = [
    {
      label: "ลำดับ",
      key: "groupId",
      className: "w-1/12 flex justify-center ",
    },
    { label: "ระดับชั้น", key: "classLevel", className: "w-2/12" },
    { label: "หลักสูตรการศึกษา", key: "faculty", className: "w-6/12" },
    { label: "สาขาวิชา", key: "program", className: "w-3/12" },
  ];

  return (
    < div className="px-5 py-2">
      <header className="grid px-4 py-0 border  rounded-lg">

          <div className="flex justify-center w-full">
            <div className="flex  justify-center items-center gap-6 w-full p-2 rounded-lg">
              <div className="w-1/6 flex flex-col gap-4">
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
              <div className="w-1/6 flex flex-col gap-">
                <Combobox
                  buttonLabel="กรุณาเลือกสาขา"
                  options={program.map((program) => {
                    return { value: program, label: program };
                  })}
                  onSelect={(selected) => handleProgramChange(selected)}
                  disabled={!selectedFaculty}
                />
              </div>
              <div className="w-auto items-center gap-2  flex ">
                <div>เทอม </div>
                <Combobox
                  options={term.map((item) => ({
                    value: item,
                    label: item,
                  }))}
                  defaultValue="1"
                  buttonLabel="เลือกภาคเรียน"
                  onSelect={(selectedTerm) => setSelectedTerm(selectedTerm)}
                />
              </div>
              <div className="w-1/6 flex items-center gap-2  p-2 ">
                <h1>ปี </h1>
                <Combobox
                  options={yearsList.map((item) => ({
                    value: item,
                    label: item,
                  }))}
                  defaultValue={currentYear.toString()}
                  buttonLabel="เลือกปีการศึกษา"
                  onSelect={(selectedYear) => setSelectedYear(selectedYear)}
                />
              </div>
            </div>
          </div>


        <DataTable
          columns={columns}
          data={filteredData.map((item, index) => ({
            ...item,
            index: index + 1,
          }))}
          onRowClick={handleRowClick}
          pagination={10}
        />
      </header>
    </div>
  );
}
