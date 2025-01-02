"use client";
import React, { useEffect, useState } from "react";
import { GetGradBySubjectId } from "@/dto/gradDto";
import { useRouter } from "next/navigation";
import { Combobox } from "@/app/components/combobox/combobox";

interface Props {
  grads?: GetGradBySubjectId[];
  onEdit: boolean | null | undefined;
}

export default function SubjectTableForm({ grads, onEdit }: Props) {
  const router = useRouter();
  const [gradDatas, setGradData] = useState<GetGradBySubjectId[]>([]);
  useEffect(() => {
    setGradData(grads ?? []);
  }, [grads]);
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
        gradeId: item.gradeId,
        collectScore: item.collectScore,
        affectiveScore: item.affectiveScore,
        testScore: item.testScore,
        totalScore: item.affectiveScore + item.collectScore + item.testScore,
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
      alert("บันทึกคะแนนสำเร็จ");
      router.push("/pages/teacher/subject");
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

  return (
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
        <span className="grid place-items-center text-xl  py-2">คะแนนรวม</span>
        <span className="grid place-items-center  text-xl py-2">เกรด</span>
        <span className="grid place-items-center text-xl  py-2">หมายเหตุ</span>
      </div>
      {gradDatas?.map((item, index) => (
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
          <span className="text-center bg-gray-100 group-hover:bg-[#cae2fa] font-semibold text-lg border-r-2 py-2">
            {(() => {
              const totalSum =
                item.collectScore + item.testScore + item.affectiveScore;
              const grade = calculateGrade(totalSum);
              return (
                <>
                  <div className="flex justify-center p-4">
                    <Combobox
                      buttonLabel="เกรด"
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
          onClick={saveChanges} disabled={!onEdit}
          className="px-4 py-2  enabled:bg-green-500 enabled:hover:bg-green-300 duration-300   bg-green-300 text-white rounded hover:bg-green-300"
        >
          บันทึกคะแนน
        </button>
      </div>
      <hr />
    </div>
  );
}
