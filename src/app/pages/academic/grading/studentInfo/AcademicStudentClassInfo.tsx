import { fetchGetScheduleBysubjectId } from "@/api/schedule/scheduleAPI";
import GradPerTerms from "@/app/components/PDF/GradPerTerm";
import GenStudentNameInSubject from "@/app/components/PDF/genStudentNameInSubject";
import { Combobox } from "@/app/components/combobox/combobox";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { GetGradBySubjectId } from "@/dto/gradDto";
import { GetScheduleBysubjectId } from "@/dto/schedule";
import { ConvertToExcel } from "@/lib/convertToExcel";
import { getSubjectBySubjectIdViewData } from "@/resource/academics/grading/viewData/academicStudentViewData";
import { CircleX, Pencil } from "lucide-react";
import { useEffect, useState } from "react";

export function AcademicStudentInfo(props: {
  subjectId: number;
  scheduleSubjectId: number;
  room: string;
}) {
  const room = props.room;

  const [scheduleData, setSchedules] = useState<GetScheduleBysubjectId>();
  const [searchStudent, setSearchStudent] = useState<string>("");
  const [gradDatas, setGradData] = useState<GetGradBySubjectId[]>([]);
  const [gradDataFilter, setGradDataFilter] = useState<GetGradBySubjectId[]>(
    []
  );
  const [onEdit, setOnEdit] = useState<boolean>(false);

  const handleEdit = () => {
    setOnEdit(!onEdit);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const grads = await getSubjectBySubjectIdViewData(
          props.subjectId,
          props.scheduleSubjectId
        );
        setGradData(grads ?? []); // Set the fetched data
        setGradDataFilter(grads ?? []);

        const schedule: GetScheduleBysubjectId =
          await fetchGetScheduleBysubjectId(props.subjectId);
        setSchedules(schedule);
      } catch (error) {
        console.error("Error fetching grad data:", error);
        setGradData([]);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const normalizedSearch = searchStudent.toLowerCase();
    const filteredData = gradDatas.filter(
      (item) =>
        item.studentCode.toLowerCase().includes(normalizedSearch) ||
        item.firstName.toLowerCase().includes(normalizedSearch) ||
        item.lastName.toLowerCase().includes(normalizedSearch)
    );
    setGradDataFilter(filteredData);
  }, [gradDatas, searchStudent]);

  const handleInputChange = (
    index: number,
    field: keyof GetGradBySubjectId,
    value: string
  ) => {
    const updatedStudents = [...gradDatas];
    updatedStudents[index][field] = (parseFloat(value) as number) || 0;
    setGradData(updatedStudents);
  };

  const convertGrad = gradDatas.map((item) => ({
    studentCode: item.studentCode,
    name: `${item.firstName} ${item.lastName}`,
    collectScore: item.collectScore,
    testScore: item.testScore,
    affectiveScore: item.affectiveScore,
    totalScore: item.collectScore + item.testScore + item.affectiveScore,
  }));

  // const convertGrad: {
  //   studentCode: string;
  //   studentName: string;
  //   collectScore: number;
  //   testScore: number;
  //   affectiveScore: number;
  //   totalScore: number;
  // }[];

  const saveChanges = async () => {
    try {
      const payload = gradDatas.map((item) => ({
        gradeId: item.gradeId ?? 0,
        collectScore: item.collectScore,
        testScore: item.testScore,
        affectiveScore: item.affectiveScore,
      }));
      for (let i = 0; i < payload.length; i++) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL_V1}/api/Grade/UpdateStudentGrade`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload[i]),
          }
        );
        const responseBody = await response.json();
        console.log("Response from server:", responseBody);

        if (!response.ok) {
          throw new Error(
            responseBody.message || "Failed to update student grades"
          );
        }
      }
      console.log("Payload sent to the server:", payload);
      setOnEdit(!onEdit);
      alert("Grades updated successfully!");
    } catch (error) {
      console.error("Error saving changes:", error);
      alert("Failed to save grades. Please try again.");
    }
  };

  function calculateGrade(totalScore: number) {
    // Update the item to hold the totalScore

    if (totalScore >= 80) {
      return 4;
    } else if (totalScore >= 75) {
      return 3.5;
    } else if (totalScore >= 70) {
      return 3;
    } else if (totalScore >= 65) {
      return 2.5;
    } else if (totalScore >= 60) {
      return 2;
    } else if (totalScore >= 55) {
      return 1.5;
    } else if (totalScore >= 50) {
      return 1;
    } else {
      return 0;
    }
  }
  const onChangeGrade = (value: string) => {
    console.log(value);
  };

  const gradeValue = [
    "0",
    "1",
    "1.5",
    "2",
    "2.5",
    "3",
    "3.5",
    "4",
    "ผ.",
    "มผ.",
    "ขส.",
    "ขร.",
    "มส.",
  ];

  console.log("gradDatas", gradDatas);
  return (
    <div className="w-full mt-4">
      <div className="flex justify-between mb-4">
        <div className="flex items-center">
          <Badge variant={"outline"} className="text-xl">
            วิชา :
            <span className="font-semibold ml-2">
              {gradDatas[0]?.subjectName}
            </span>
          </Badge>
          <Badge variant={"outline"} className=" ml-4 text-xl">
            รหัสวิชา :
            <span className="font-semibold ml-2">
              {gradDatas[0]?.subjectId}
            </span>
          </Badge>
        </div>
        <div className="flex items-center gap-6">
          <button
            disabled={!room}
            className="text-md bg-[#e4f1f8] text-gray-600 hover:bg-gray-200 rounded-md px-5 py-2"
            onClick={() => {
              GradPerTerms({
                grads: 10,
                // studentGroup: props.room,
                // subjectId: scheduleData?.subjectCode,
                // subjectName: scheduleData?.subjectName,
              });
            }}
          >
            <p className="line-clamp-1">ดาวน์โหลดใบคะแนน</p>
          </button>
          <button
            className=" text-md text-gray-600 hover:bg-gray-200 bg-[#e4f1f8] rounded-md px-5 py-2"
            onClick={() => {
              GenStudentNameInSubject({
                grads: gradDatas,
                studentGroup: room,
                subjectId: gradDatas[0]?.studentCode,
                subjectName: gradDatas[0]?.subjectName,
              });
            }}
          >
            <p className="line-clamp-1">ดาวน์โหลดรายชื่อนักเรียน</p>
          </button>
          <button
            className=" text-md text-gray-600 hover:bg-gray-200 bg-[#e4f1f8] rounded-md px-5 py-2"
            onClick={async () => {
              ConvertToExcel(
                convertGrad,
                String(scheduleData?.term ?? ""),
                String(scheduleData?.year ?? ""),
                scheduleData?.subjectCode || "",
                gradDatas[0]?.subjectName || "",
                room || ""
              );
            }}
          >
            <p className="line-clamp-1">ดาวน์โหลดใบคะแนนนักเรียน excel</p>
          </button>
        </div>
      </div>
      <div className="w-full flex justify-between items-end ">
        <div className="bg-white w-1/3 my-4">
          <Input
            type="text"
            placeholder="Search..."
            className="w-full pr-10" // Add padding to the right for the icon
            onChange={(event) => setSearchStudent(event.target.value)}
          />
        </div>
        <div className="w-2/3 my-4 flex gap-6 justify-end">
          {onEdit ? (
            <button
              className={`bg-red-500 duration-300 text-white h-fit text-center text-lg    rounded-md hover:opacity-75 flex items-center justify-center gap-2 w-[120px] py-1 hover:rounded-sm `}
              onClick={handleEdit}
            >
              ยกเลิก
              <CircleX
                style={{ width: "1.0rem", height: "1.5rem" }}
                className="text-white"
              />
            </button>
          ) : (
            <button
              className={`bg-blue-400 duration-300 h-fit text-white  text-lg    rounded-md hover:opacity-75 w-[120px]  gap-2 flex items-center justify-center text-center py-1 hover:rounded-sm `}
              onClick={handleEdit}
            >
              แก้ไข{" "}
              <Pencil
                style={{ width: "1.0rem", height: "1.5rem" }}
                className="text-white "
              />
            </button>
          )}
        </div>
      </div>
      <div className="w-full ">
        <div className="  bg-[#cfe4ff] grid grid-cols-[5%_10%_25%_10%_10%_10%_10%_10%_10%] border-2 border-gray-400">
          <span className="grid place-items-center text-xl py-2">No.</span>
          <span className="grid place-items-center text-xl  py-2">
            รหัสนักเรียน
          </span>
          <span className="grid place-items-center text-xl  py-2">
            ชื่อ - นามสกุล
          </span>
          <span className="text-center   pt-2 pb-1">
            <div className="text-xl">คะแนนเก็บ</div>
            <div className="text-md text-gray-600">50 คะแนน</div>
          </span>
          <span className="text-center  pt-2 pb-1">
            <div className="text-xl">คะแนนจิตพิสัย</div>
            <div className="text-md text-gray-600">20 คะแนน</div>
          </span>
          <span className="text-center  pt-2 pb-1">
            <div className="text-xl">คะแนนสอบ</div>
            <div className="text-md text-gray-600">30 คะแนน</div>
          </span>
          <span className="grid place-items-center text-xl  py-2">
            คะแนนรวม
          </span>
          <span className="grid place-items-center  text-xl py-2">เกรด</span>
          <span className="grid place-items-center text-xl  py-2">
            หมายเหตุ
          </span>
        </div>
        {gradDataFilter?.map((item, index) => (
          <div
            className=" text-lg border-b-2  grid group hover:bg-[#e8f3ff]   grid-cols-[5%_10%_25%_10%_10%_10%_10%_10%_10%]"
            key={item.studentId}
          >
            <span className="text-center font-semibold border-l-2 border-r-2 py-2">
              {index + 1}.
            </span>
            <span className="text-center border-r-2 py-2">
              {item.studentCode}
            </span>
            <span className="text-start pl-5 border-r-2 py-2">
              {item.firstName} {item.lastName}
            </span>
            <input
              disabled={onEdit != true}
              type="number"
              value={item.collectScore}
              min={0}
              max={50}
              className={` text-center enabled:bg-blue-50   bg-white focus:outline-blue-500 py-2  group-hover:bg-[#e8f3ff] ${
                item.collectScore > 50 || item.collectScore < 0
                  ? "outline-red-500 border-red-500 rounded-md border-[3px]"
                  : "border-gray-300 border-r-2"
              }`}
              onChange={(e) =>
                handleInputChange(index, "collectScore", e.target.value)
              }
            />
            <input
              disabled={!onEdit}
              type="number"
              value={item.affectiveScore}
              min={0}
              max={20}
              className={`text-center enabled:bg-blue-50   focus:outline-blue-500  py-2 group-hover:bg-[#e8f3ff]  bg-white  ${
                item.affectiveScore > 20 || item.affectiveScore < 0
                  ? "border-red-500 outline-red-500 rounded-md border-[3px]"
                  : "border-gray-300 border-r-2"
              }`}
              onChange={(e) =>
                handleInputChange(index, "affectiveScore", e.target.value)
              }
            />
            <input
              disabled={onEdit != true}
              type="number"
              value={item.testScore}
              min={0}
              max={30}
              className={`text-center enabled:bg-blue-50   bg-white  focus:outline-blue-500  py-2 group-hover:bg-[#e8f3ff] ${
                item.testScore > 30 || item.testScore < 0
                  ? "rounded-md outline-red-500 border-red-500  border-[3px]"
                  : "border-gray-300 border-r-2"
              }`}
              onChange={(e) =>
                handleInputChange(index, "testScore", e.target.value)
              }
            />
            <span className="text-center flex justify-center items-center border-r-2 py-2">
              {item.collectScore + item.testScore + item.affectiveScore}
            </span>
            <span className="text-center bg-gray-100 group-hover:bg-[#cae2fa] font-semibold text-lg border-r-2 ">
              {(() => {
                const totalSum =
                  item.collectScore + item.testScore + item.affectiveScore;
                const grade = calculateGrade(totalSum);
                return (
                  <>
                    <div className="flex justify-center px-2 py-1">
                      <Combobox
                        buttonLabel="เกรด"
                        disabled={!onEdit}
                        options={gradeValue.map((item) => ({
                          label: item,
                          value: item,
                        }))}
                        onSelect={(seletedGrade) => onChangeGrade(seletedGrade)}
                        defaultValue={String(grade)}
                      />
                    </div>
                  </>
                );
              })()}
            </span>
            <input
              type="text"
              placeholder={"-"}
              className="text-center border-r-2 py-2 group-hover:bg-[#e8f3ff]"
            />
          </div>
        ))}
        <div className="my-5 w-full grid place-items-end  ">
          <button
            onClick={saveChanges}
            disabled={!onEdit}
            className="px-4 py-2  enabled:bg-green-500 enabled:hover:bg-green-300 duration-300   bg-green-300 text-white rounded hover:bg-green-300"
          >
            บันทึกคะแนน
          </button>
        </div>
        <hr />
      </div>
    </div>
  );
}
