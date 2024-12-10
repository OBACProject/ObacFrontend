import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { GetGradBySubjectId } from "@/dto/gradDto";
import { getSubjectBySubjectIdViewData } from "@/resource/academics/grading/viewData/academicStudentViewData";
import { useEffect, useState } from "react";

export function AcademicStudentInfo(props: {
  subjectId: number;
  scheduleSubjectId: number;
}) {
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
        </div>
        <div className="flex items-center gap-6">
          <button className="text-md bg-[#e4f1f8] text-gray-600 hover:bg-gray-200 rounded-md px-5 py-2">
            ดาวน์โหลดใบคะแนน
          </button>
          <button className=" text-md text-gray-600 hover:bg-gray-200 bg-[#e4f1f8] rounded-md px-5 py-2">
            ดาวน์โหลดรายชื่อนักเรียน
          </button>
          <Badge variant={"outline"} className="text-xl">
            รหัสวิชา :
            <span className="font-semibold ml-2">
              {gradDatas[0]?.studentCode}
            </span>
          </Badge>
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
          <button
            onClick={handleEdit}
            className="bg-blue-500 text-white px-4 py-2 rounded-md w-1/6 hover:bg-blue-600"
          >
            Edit Grade
          </button>
          <button
            onClick={saveChanges}
            className="px-4 py-2  bg-blue-500 text-white rounded w-1/6 hover:bg-blue-600"
          >
            บันทึกคะแนน
          </button>
        </div>
      </div>
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
        <span className="grid place-items-center text-xl  py-2">คะแนนรวม</span>
        <span className="grid place-items-center  text-xl py-2">เกรด</span>
        <span className="grid place-items-center text-xl  py-2">หมายเหตุ</span>
      </div>
      {gradDataFilter?.map((item, index) => (
        <div
          className="text-lg border-b-2 grid group hover:bg-[#e8f3ff] grid-cols-[5%_10%_25%_10%_10%_10%_10%_10%_10%]"
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
            className={` text-center focus:outline-blue-300 py-2 group-hover:bg-[#e8f3ff] ${
              item.collectScore > 50 || item.collectScore < 0
                ? "outline-red-500 border-red-500 rounded-md border-[3px]"
                : "border-gray-300 border-r-2"
            }`}
            onChange={(e) =>
              handleInputChange(index, "collectScore", e.target.value)
            }
          />
          <input
            disabled={onEdit != true}
            type="number"
            value={item.testScore}
            min={0}
            max={20}
            className={`text-center focus:outline-blue-300  py-2 group-hover:bg-[#e8f3ff] ${
              item.testScore > 20 || item.testScore < 0
                ? "border-red-500 outline-red-500 rounded-md border-[3px]"
                : "border-gray-300 border-r-2"
            }`}
            onChange={(e) =>
              handleInputChange(index, "testScore", e.target.value)
            }
          />
          <input
            disabled={onEdit != true}
            type="number"
            value={item.affectiveScore}
            min={0}
            max={30}
            className={`text-center focus:outline-blue-300  py-2 group-hover:bg-[#e8f3ff] ${
              item.affectiveScore > 30 || item.affectiveScore < 0
                ? "rounded-md outline-red-500 border-red-500  border-[3px]"
                : "border-gray-300 border-r-2"
            }`}
            onChange={(e) =>
              handleInputChange(index, "affectiveScore", e.target.value)
            }
          />

          <span className="text-center bg-gray-100 group-hover:bg-[#cae2fa] font-semibold text-lg border-r-2 py-2">
            {50 <= item.collectScore + item.testScore + item.affectiveScore &&
            item.collectScore + item.testScore + item.affectiveScore < 55 ? (
              <div>1</div>
            ) : 55 <=
                item.collectScore + item.testScore + item.affectiveScore &&
              item.collectScore + item.testScore + item.affectiveScore < 60 ? (
              <div>1.5</div>
            ) : 60 <=
                item.collectScore + item.testScore + item.affectiveScore &&
              item.collectScore + item.testScore + item.affectiveScore < 65 ? (
              <div>2</div>
            ) : 65 <=
                item.collectScore + item.testScore + item.affectiveScore &&
              item.collectScore + item.testScore + item.affectiveScore < 70 ? (
              <div>2.5</div>
            ) : 70 <=
                item.collectScore + item.testScore + item.affectiveScore &&
              item.collectScore + item.testScore + item.affectiveScore < 75 ? (
              <div>3</div>
            ) : 75 <=
                item.collectScore + item.testScore + item.affectiveScore &&
              item.collectScore + item.testScore + item.affectiveScore < 80 ? (
              <div>3.5</div>
            ) : item.collectScore + item.testScore + item.affectiveScore >=
              80 ? (
              <div>4</div>
            ) : (
              <div>0</div>
            )}
          </span>

          {/* Replace input with a span */}
          <span className="text-center border-r-2 py-2 group-hover:bg-[#e8f3ff]">
            {"-"}
          </span>
        </div>
      ))}
    </div>
  );
}
