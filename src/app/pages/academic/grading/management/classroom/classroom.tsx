"use client";
import { DataTable } from "@/app/components/bellTable/table_style_1";
import { Combobox } from "@/app/components/combobox/combobox";
// import { Input } from "@/components/ui/input";
// import { }
import {
  FacultyInfo,
  EducationData,
  filterProgramsParamsData,
} from "@/dto/studentDto";
import {
  filterProgramsViewData,
  getRawProgramViewData,
} from "@/resource/academics/studentInfoList/viewData/filterProgramsParamsViewData";
import { useEffect, useMemo, useState } from "react";

interface ClassroomTable {
  class: string;
  facultyName: string;
  programName: string;
  groupId: string;
  groupCode: string;
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
  };

  const handleRowClick = (item: ClassroomTable) => {
    if (!selectedTerm || !selectedYear) {
      alert("กรุณาเลือกภาคเรียนและปีการศึกษา");
      return;
    } else {
      if (item) {
        console.log(item);
        // props.handleTab("classroomByGroupId");
        props.handleSelectedData({
          groupId: parseInt(item.groupId),
          term: selectedTerm || "",
          year: selectedYear || "",
          classroom: `${item.class}`,
        });
      } else {
        alert("ไม่พบข้อมูล");
      }
    }
    console.log("Clicked Group ID:", item.groupId);
  };

  useEffect(() => {
    const fetchFilterData = async () => {
      // const data = await getStudentByGroupIdDataView(groupId);

      // set for table data
      const rawData = await getRawProgramViewData();
      console.log("rawData", rawData);

      const formattedData: ClassroomTable[] = rawData.map(
        (item: filterProgramsParamsData) => ({
          class: `${item.class}. ${item.groupName}`,
          facultyName: item.facultyName,
          groupId: item.groupId,
          programName: item.programName,
          groupCode: item.groupCode,
        })
      );

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
    // const normalizedSearch = searchClassroom.toLowerCase();
    const filtered = dataTable.filter((item) => {
      const matchClassLevel = selectedClassLevel
        ? item.class.substring(0, 3) === selectedClassLevel
        : true;
      const matchFaculty = selectedFaculty
        ? item.facultyName === selectedFaculty
        : true;
      const matchProgram = selectedProgram
        ? item.programName === selectedProgram
        : true;
      const matchRoom = selectedRoom ? item.class === selectedClassLevel : true;

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
  console.log("filteredData", filteredData);

  // "facultyName": "บริหารธุรกิจ",
  //     "programName": "การเงินและบัญชี",
  //     "class": "ปวช",
  //     "groupId": 1,
  //     "groupName": "1/1",
  //     "groupCode": "AC-101"
  const columns = [
    { label: "ลำดับ", key: "groupId", className: "w-2/12 justify-center" },
    { label: "ระดับชั้น", key: "class", className: "w-2/12" },
    { label: "รหัสห้อง", key: "groupCode", className: "w-2/12" },
    { label: "หลักสูตรการศึกษา", key: "facultyName", className: "w-5/12" },
    { label: "สาขาวิชา", key: "programName", className: "w-3/12 " },
  ];

  return (
    <>
      <header className="flex flex-col p-4 border-2 mt-4 rounded-lg">
        <div className="flex gap-12 mt-4">
          <div className="flex justify-center w-full">
            <div className="flex mx-auto justify-start gap-6 w-full p-2 rounded-lg">
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
            </div>
          </div>
          <hr className="bg-black mt-4 text-black" />
        </div>
        <div className="flex gap-12 justify-start p-2 w-full">
          <div className="w-1/6 flex flex-col p-2 relative">
            <h1>ภาคเรียน</h1>
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
          <div className="w-1/6 flex flex-col p-2 relative">
            <h1>ปีการศึกษา</h1>
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
    </>
  );
}
