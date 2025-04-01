"use client";
import { GetStudentListByGroupID } from "@/api/student/studentApi";
import { DataTable } from "@/app/components/bellTable/table_style_1";
import { Combobox } from "@/app/components/combobox/combobox";
import StudentNameListPDF from "@/app/components/PDF/StudentNameList";
import {
  FacultyInfo,
  EducationData,
  filterProgramsParamsData,
  GetStudentListByGroupIDDto,
} from "@/dto/studentDto";
import { ConvertClassroomToExcel } from "@/lib/convertToExcel";
import {
  filterProgramsViewData,
  getRawProgramViewData,
} from "@/resource/academics/studentInfoList/viewData/filterProgramsParamsViewData";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

interface ClassroomTable {
  classLevel: string;
  faculty: string;
  program: string;
  groupId: string;
}

const getStudentDataList = async (groupId: number) => {
  try {
    const response = await GetStudentListByGroupID(groupId);
    return response;
  } catch (err) {
    return [];
  }
};

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
    (currentYear + 543 - i).toString()
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
  const [isLoadingPage, setIsLoadingPage] = useState<boolean>(false);
  const handleRowClick = (item: ClassroomTable) => {
    router.push(
      `/pages/academic/student-info-list/studentGroup?groupId=${item.groupId}`
    );
  };
  const [studentInGroup, setStudentInGroup] =
    useState<GetStudentListByGroupIDDto | null>();
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
      setIsLoadingPage(true);
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

      return matchClassLevel && matchFaculty && matchProgram && matchRoom;
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
  ]);
  const handleDownloadPDF = async (groupId: number) => {
    try {
      const item = await getStudentDataList(groupId);

      if (item && !Array.isArray(item)) {
        setStudentInGroup(item);
      } else {
        setStudentInGroup(null);
      }

      if (item && !Array.isArray(item)) {
        const studentClass = item.class + "." + item.groupName;
        StudentNameListPDF({
          studentGroup: studentClass,
          student: item.students,
        });
      } else {
        alert("No student data available for this group.");
      }
    } catch (error) {
      console.error("Error fetching student data:", error);
      alert("Failed to fetch student data. Please try again.");
    }
  };
  const handleDownloadExcel = async (groupId: number) => {
    try {
      const item = await getStudentDataList(groupId);

      if (item && !Array.isArray(item)) {
        setStudentInGroup(item);
      } else {
        setStudentInGroup(null);
      }

      if (item && !Array.isArray(item)) {
        const studentClass = item.class + "." + item.groupName;
        ConvertClassroomToExcel(item.students, studentClass);
      } else {
        alert("No student data available for this group.");
      }
    } catch (error) {
      console.error("Error fetching student data:", error);
      alert("Failed to fetch student data. Please try again.");
    }
  };

  const columns = [
    {
      label: "No.",
      key: "groupId",
      className: "w-1/12 flex justify-center ",
    },
    { label: "ระดับชั้น", key: "classLevel", className: "w-1/12" },
    { label: "หลักสูตรการศึกษา", key: "faculty", className: "w-4/12" },
    { label: "สาขาวิชา", key: "program", className: "w-3/12" },
    {
      label: "ใบออกเกรด",
      key: "action",
      className: "w-3/12 justify-center",
      render: (row: ClassroomTable) => (
        <div className="flex gap-2">
          <button
            className="px-4 bg-white border hover:bg-blue-600 rounded-full h-fit py-0.5 text-blue-400 hover:text-white flex text-sm justify-center items-center gap-2"
            onClick={(e) => {
              e.stopPropagation();
              handleDownloadPDF(Number(row.groupId));
            }}
          >
            <p>รายชื่อ PDF</p>
          </button>

          <button
            className="px-4 bg-white text-sm   hover:bg-green-600 rounded-full h-fit py-0.5 text-green-500 border flex justify-center hover:text-white items-center gap-2"
            onClick={(e) => {
              e.stopPropagation();
              handleDownloadExcel(Number(row.groupId));
            }}
          >
            <p>รายชื่อ Excel</p>
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="px-5 py-2">
      {isLoadingPage ? (
        <header className="grid px-4 py-0 border  rounded-lg">
          <div className="flex justify-center w-full">
            <div className="flex  justify-start items-center gap-6 w-full p-2 rounded-lg">
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
                  options={(selectedClassLevel === "ปวช"
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
      ) : (
        <div className="mt-2 border-2 border-dashed rounded-md border-gray-400 grid place-items-center py-20 text-3xl text-blue-400 font-semibold items-center">
          <p className="flex gap-2">
            <Loader2 className="h-10 w-10 animate-spin" />
            Loading...
          </p>
        </div>
      )}
    </div>
  );
}
