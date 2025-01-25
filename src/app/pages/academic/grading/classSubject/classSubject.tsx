import { Combobox } from "@/app/components/combobox/combobox";
import { makeColumns } from "@/app/components/table/makeColumns";
import { DataTable } from "@/app/components/table/tableComponent";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ClassSubjectColumn, ClassSubjectData } from "@/dto/gradingDto";
import { getSubjectClassViewData } from "@/resource/academics/grading/viewData/subjectClassViewData";
import { useEffect, useState } from "react";
import { ClassSubject } from "../main";
import {
  getClassSubjectData,
  putPublishGrade,
} from "@/resource/academics/grading/api/subjectClassData";

export function ClassSubjectPage(props: {
  handleTab: (tab: string) => void;
  classSubjecPassingData: ClassSubject;
  handleSelectedData: (data: {
    subjectId: number;
    scheduleSubjectId: number;
    room: string;
  }) => void;
}) {
  const { classSubjecPassingData } = props;
  // raw data
  const [rawClassSubjectData, setRawClassSubjectData] = useState<
    ClassSubjectData[]
  >([]);

  // search
  const [searchClassSubject, setSearchClassSubject] = useState<string>("");
  const [classSubjectData, setClassSubjectData] = useState<
    ClassSubjectColumn[]
  >([]);
  console.log("classSubjectData", classSubjectData);
  const [classSubjectDataFiltered, setClassSubjectDataFiltered] = useState<
    ClassSubjectColumn[]
  >([]);
  console.log("classSubjectDataFiltered", classSubjectDataFiltered);
  //filter data
  const [roomNumbers, setRoomNumbers] = useState<string[]>([]);
  const [periodNumbers, setPeriodNumbers] = useState<string[]>([]);
  const [teacherNames, setTeacherNames] = useState<string[]>([]);

  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null);
  const [selectedTeacher, setSelectedTeacher] = useState<string | null>(null);

  const handleSelectedInfoClassData = (id: number) => {
    props.handleTab("infoClass");
    const item = rawClassSubjectData.find(
      (item) => item.scheduleSubjectId === id
    );
    console.log("item", item);
    if (item) {
      props.handleSelectedData({
        subjectId: item.subjectId,
        scheduleSubjectId: item.scheduleSubjectId,
        room: item.room,
      });
      console.log("Selected data infoClass", id);
    } else {
      alert("ไม่พบข้อมูล");
    }
  };

  const handlePusblishGrade = async () => {
    console.log("publish Grade");
    const list_of_schudule_subject_id = classSubjectDataFiltered.map(
      (item) => item.id
    );

    try {
      for (const item of list_of_schudule_subject_id) {
        await putPublishGrade(item);
      }
      console.log("Grades published successfully!");

      // Reload data after publishing grades
      const rawData = await getClassSubjectData(
        classSubjecPassingData.id,
        classSubjecPassingData.term,
        classSubjecPassingData.year
      );
      setRawClassSubjectData(rawData);

      const data = await getSubjectClassViewData(
        classSubjecPassingData.id,
        classSubjecPassingData.term,
        classSubjecPassingData.year
      );
      setClassSubjectData(data);

      // Reinitialize filters
      const roomNumbers = Array.from(
        new Set(data.map((item) => item.room).filter((room) => room))
      );
      const periodNumbers = Array.from(
        new Set(data.map((item) => item.period).filter((period) => period))
      );
      const teacherNames = Array.from(
        new Set(
          data
            .map((item) => item.teacherName)
            .filter((teacherName) => teacherName)
        )
      );

      setRoomNumbers(roomNumbers);
      setPeriodNumbers(periodNumbers);
      setTeacherNames(teacherNames);

      // Optionally clear selected filters
      setSelectedRoom(null);
      setSelectedPeriod(null);
      setSelectedTeacher(null);

      console.log("Data reloaded successfully!");
    } catch (error) {
      console.error("Error publishing grade or reloading data:", error);
    }
  };

  const columns = makeColumns<ClassSubjectColumn>(
    {
      isPublish: false,
      id: 1,
      day: "",
      period: "",
      room: "",
      teacherName: "",
    },
    "id",
    {
      id: "ID",
      day: "วัน",
      period: "คาบ",
      room: "ห้อง",
      teacherName: "ชื่อครู",
      isPublish: "เผยแพร่",
    },
    [
      {
        label: "ตรวจสอบรายละเอียด",
        onClick: (id: string | number | boolean) =>
          handleSelectedInfoClassData(Number(id)),
        className: "hover:bg-blue-600 bg-blue-500",
      },
    ],
    {
      isPublish: (row) => (
        <div className={`flex items-center justify-center`}>
          {row.isPublish ? (
            <div className="text-green-500">✅ Published</div>
          ) : (
            <div className="text-red-500">❌ Unpublished</div>
          )}
        </div>
      ),
    }
  );

  // get a init data from api
  useEffect(() => {
    // setClassSubjectData(SubjectClassMockData);
    const fetchData = async () => {
      try {
        const rawData = await getClassSubjectData(
          classSubjecPassingData.id,
          classSubjecPassingData.term,
          classSubjecPassingData.year
        );
        setRawClassSubjectData(rawData);
        const data = await getSubjectClassViewData(
          classSubjecPassingData.id,
          classSubjecPassingData.term,
          classSubjecPassingData.year
        );
        setClassSubjectData(data);

        // filter data to dropdown
        const roomNumbers = Array.from(
          new Set(data.map((item) => item.room).filter((room) => room))
        );
        const periodNumbers = Array.from(
          new Set(data.map((item) => item.period).filter((period) => period))
        );
        const teacherNames = Array.from(
          new Set(
            data
              .map((item) => item.teacherName)
              .filter((teacherName) => teacherName)
          )
        );

        setRoomNumbers(roomNumbers);
        setPeriodNumbers(periodNumbers);
        setTeacherNames(teacherNames);
      } catch (error) {
        console.error("Error fetching grading data:", error);
      }
    };
    fetchData();
  }, []);

  // use for search
  useEffect(() => {
    const normalizedSearch = searchClassSubject.toLowerCase();
    const filterData = classSubjectData.filter((item) => {
      const matchSearch =
        item.day.toLowerCase().includes(normalizedSearch) ||
        item.period.toLowerCase().includes(normalizedSearch) ||
        item.room.toLowerCase().includes(normalizedSearch) ||
        item.teacherName.toLowerCase().includes(normalizedSearch);

      const matchesRoom = selectedRoom ? item.room === selectedRoom : true;

      const matchesPeriod = selectedPeriod
        ? item.period === selectedPeriod
        : true;

      const matchesTeacher = selectedTeacher
        ? item.teacherName === selectedTeacher
        : true;

      return matchSearch && matchesRoom && matchesPeriod && matchesTeacher;
    });
    setClassSubjectDataFiltered(filterData);
  }, [
    searchClassSubject,
    classSubjectData,
    selectedRoom,
    selectedPeriod,
    selectedTeacher,
  ]);

  return (
    <>
      <div>
        <header className="flex flex-col p-4 border-2 mt-4 rounded-lg">
          {/* detail table */}
          <div className=" flex mb-4 justify-between">
            <div className="flex w-1/5">
              <Badge variant={"outline"}>
                <h1 className="text-base">
                  รายวิชา : {classSubjecPassingData.subjectName}
                </h1>
              </Badge>
            </div>
            <div className="flex w-1/6 gap-6 text-base">
              <div>
                <Badge variant={"outline"}>
                  <h1 className="text-base">
                    year : {classSubjecPassingData.year}
                  </h1>
                </Badge>
              </div>
              <div>
                <Badge variant={"outline"}>
                  <h1 className="text-base">
                    term : {classSubjecPassingData.term}
                  </h1>
                </Badge>
              </div>
            </div>
          </div>
          {/* filter Data */}
          <div className="flex gap-12 p-4 bg-slate-50 rounded-lg">
            {/* filter */}
            <div className="w-1/4 flex flex-col gap-4">
              <h1>รายชื่ออาจารย์</h1>
              <Combobox
                options={teacherNames.map((item) => ({
                  value: item,
                  label: item,
                }))}
                buttonLabel="เลือกอาจารย์ผู้สอน"
                onSelect={(selected) => setSelectedTeacher(selected)}
              />
            </div>

            <div className="w-1/4 flex flex-col gap-4">
              <h1>ห้องเรียน</h1>
              <Combobox
                options={roomNumbers.map((item) => ({
                  value: item,
                  label: item,
                }))}
                buttonLabel="เลือกห้องเรียน"
                onSelect={(selected) => setSelectedRoom(selected)}
              />
            </div>

            <div className="w-1/4 flex flex-col gap-4">
              <h1>คาบเรียน</h1>
              <Combobox
                options={periodNumbers.map((item) => ({
                  value: item,
                  label: item,
                }))}
                buttonLabel="เลือกคาบเรียน"
                onSelect={(selected) => setSelectedPeriod(selected)}
              />
            </div>

            <div className="relative w-1/3 flex items-end">
              <div className="bg-white w-full">
                <Input
                  type="text"
                  placeholder="Search..."
                  className="w-full pr-10" // Add padding to the right for the icon
                  onChange={(event) =>
                    setSearchClassSubject(event.target.value)
                  }
                />
              </div>
            </div>
          </div>
          {/* data zone */}
          <div className="mt-4 w-full p-4">
            <DataTable
              columns={columns}
              data={classSubjectDataFiltered}
              selectedValue="id"
              columnWidths={{
                id: "w-1/12",
                day: "w-1/12",
                period: "w-1/12",
                room: "w-1/12",
                teacherName: "w-4/12",
                isPublish: "w-1/12",
              }}
            />
            <div className="flex justify-end mt-4">
              <button onClick={handlePusblishGrade}>
                <Badge
                  variant={"outline"}
                  className="h-10 text-lg hover:bg-slate-200 transition:duration-500 rounded-md"
                >
                  publish Grade
                </Badge>
              </button>
            </div>
          </div>
        </header>
      </div>
    </>
  );
}
