import { Combobox } from "@/app/components/combobox/combobox";
import { makeColumns } from "@/app/components/table/makeColumns";
import { DataTable } from "@/app/components/table/tableComponent";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ClassSubjectColumn } from "@/dto/gradingDto";
import { getSubjectClassViewData } from "@/resource/academics/grading/viewData/subjectClassViewData";
import { useEffect, useState } from "react";

export function ClassSubject(props: {
  id: number;
  subjectName: string;
  year: number;
  term: number;
}) {
  const [searchClassSubject, setSearchClassSubject] = useState<string>("");
  const [classSubjectData, setClassSubjectData] = useState<
    ClassSubjectColumn[]
  >([]);
  const [classSubjectDataFiltered, setClassSubjectDataFiltered] = useState<
    ClassSubjectColumn[]
  >([]);

  //filter data
  const [roomNumbers, setRoomNumbers] = useState<string[]>([]);
  const [periodNumbers, setPeriodNumbers] = useState<string[]>([]);
  const [teacherNames, setTeacherNames] = useState<string[]>([]);

  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null);
  const [selectedTeacher, setSelectedTeacher] = useState<string | null>(null);

  // console.log(selectedPeriod, selectedRoom, selectedTeacher);
  // const roomNumbers = ["A101", "A102", "A103"];

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
        onClick: (id: any) => console.log("Selected data", id),
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
        const data = await getSubjectClassViewData(
          props.id,
          props.term,
          props.year
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
  }, [searchClassSubject, classSubjectData]);

  return (
    <>
      <div>
        <header className="flex flex-col p-4 border-2 mt-4 rounded-lg">
          {/* filter Data */}
          <div className="flex gap-12 mt-6 p-4 bg-slate-50 rounded-lg">
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

            <div className="relative w-1/4 flex items-end">
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
            {/* detail table */}
            <div className=" flex mb-4 justify-between">
              <div className="flex w-1/5">
                <Badge variant={"outline"}>
                  <h1 className="text-base">รายวิชา : {props.subjectName}</h1>
                </Badge>
              </div>
              <div className="flex w-1/6 gap-6 text-base">
                <div>
                  <Badge variant={"outline"}>
                    <h1 className="text-base">year : {props.year}</h1>
                  </Badge>
                </div>
                <div>
                  <Badge variant={"outline"}>
                    <h1 className="text-base">term : {props.term}</h1>
                  </Badge>
                </div>
              </div>
            </div>
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
          </div>
          {/* breadcrumb zone */}
        </header>
      </div>
    </>
  );
}
