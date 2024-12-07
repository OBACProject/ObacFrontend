import { makeColumns } from "@/app/components/table/makeColumns";
import { DataTable } from "@/app/components/table/tableComponent";
import { Input } from "@/components/ui/input";
import { ClassSubjectColumn } from "@/dto/gradingDto";
import { SubjectClassMockData } from "@/resource/academics/grading/viewData/subjectClassViewData";
import { useEffect, useState } from "react";

export function ClassSubject(props: {
  id: number;
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
  const roomNumbers = ["A101", "A102", "A103"];

  const columns = makeColumns<ClassSubjectColumn>(
    {
      id: 1,
      day: "",
      period: "",
      room: "",
      teacherName: "",
      isPublish: false,
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
    ]
  );

  // get a init data from api
  useEffect(() => {
    setClassSubjectData(SubjectClassMockData);
    // const fetchData = async () => {
    //   try {
    //     const data = await getGradingViewData();
    //     setClassSubjectData(data);
    //   } catch (error) {
    //     console.error("Error fetching grading data:", error);
    //   }
    // };
    // fetchData();
  });

  // use for search
  useEffect(() => {
    const normalizedSearch = searchClassSubject.toLowerCase();
    const filterData = classSubjectData.filter((item) => {
      const matchSearch =
        item.day.toLowerCase().includes(normalizedSearch) ||
        item.period.toLowerCase().includes(normalizedSearch) ||
        item.room.toLowerCase().includes(normalizedSearch) ||
        item.teacherName.toLowerCase().includes(normalizedSearch);
      return matchSearch;
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

            <div className="relative w-1/3 flex flex-col gap-4 p-4">
              <h1>ค้นหาห้องเรียน</h1>
              <div className="bg-white">
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
          </div>
          {/* breadcrumb zone */}
        </header>
      </div>
    </>
  );
}
