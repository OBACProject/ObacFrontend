"use client";
import React, { useEffect, useState } from "react";
import { SubjectGradeItem } from "@/dto/gradDto";
import { Combobox } from "@/components/common/Combobox/combobox";

interface Props {
  grads?: SubjectGradeItem[];
  onEdit: boolean | null | undefined;
}

export default function SubjectTableForm({ grads, onEdit }: Props) {
  // const [remark, setRemark] = useState<string>("");
  const [gradDatas, setGradData] = useState<SubjectGradeItem[]>([]);

  useEffect(() => {
    const sortedData = [...(grads ?? [])].sort(
      (a, b) => a.studentId - b.studentId
    );
    setGradData(sortedData);
  }, [grads]);

  const handleInputChange = (
    index: number,
    field: keyof SubjectGradeItem,
    value: string
  ) => {
    const updatedStudents = [...gradDatas];
    (updatedStudents[index] as any)[field] = parseFloat(value) || 0;
    setGradData(updatedStudents);
  };

  // const token = Cookies.get("token");

  // const saveChanges = async () => {
  //   try {
  //     const result = await Swal.fire({
  //       title: "ยืนยันข้อมูล?",
  //       text: "จะไม่สามารถแก้ไขได้",
  //       icon: "warning",
  //       showCancelButton: true,
  //       confirmButtonColor: "#3085d6",
  //       cancelButtonColor: "#d33",
  //       confirmButtonText: "ตกลง",
  //     });
  //     if (result.isConfirmed) {
  //       const payload = gradDatas.map((item) => ({
  //         collectScore: item.collectScore,
  //         affectiveScore: item.affectiveScore,
  //         midtermScore: item.midtermScore,
  //         finaltermScore: item.finaltermScore,
  //         totalScore:
  //           (item.assignmentScore ?? 0) +
  //           (item.affectiveScore ?? 0) +
  //           (item.collectScore ?? 0) +
  //           (item.midtermScore ?? 0) +
  //           (item.finaltermScore ?? 0),
  //         remark: item.remarks,
  //       }));
  //       for (let i = 0; i < payload.length; i++) {
  //         const response = await fetch(
  //           `${process.env.NEXT_PUBLIC_API_URL_V1}/Grade/UpdateStudentGrade`,
  //           {
  //             method: "PUT",
  //             headers: {
  //               "Content-Type": "application/json",
  //               Authorization: `Bearer ${token}`,
  //             },
  //             body: JSON.stringify(payload[i]),
  //           }
  //         );
  //         const responseBody = await response.json();

  //         if (!response.ok) {
  //           throw new Error(
  //             responseBody.message || "Failed to update student grades"
  //           );
  //         }
  //       }
  //     }

  //     toast.success("บันทึกคะแนนสำเร็จ");
  //     window.location.reload();
  //   } catch (error) {
  //     console.error("Error saving changes:", error);
  //   }
  // };

  const gradingScorce = (totalScore: number) => {
    if (totalScore >= 80) return "4";
    if (totalScore >= 75) return "3.5";
    if (totalScore >= 70) return "3";
    if (totalScore >= 65) return "2.5";
    if (totalScore >= 60) return "2";
    if (totalScore >= 55) return "1.5";
    if (totalScore >= 50) return "1";
    return "0";
  };

  const onChangeGrade = (value: string) => {};

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

  const remarkValue = ["ผ.", "มผ.", "ขส.", "ขร.", "มส."];
  const onChangeRemark = (value: string, studentId: number) => {
    gradDatas.map((item) => {
      if (item.studentId === studentId) {
        item.remarks = value;
      }
    });
  };

  return (
    <div className="w-full mb-10 ">
      <div className="  bg-gray-100 grid grid-cols-[3%_8%_15%_10%_10%_10%_10%_10%_8%_8%_8%] border border-gray-300">
        <span className="grid place-items-center text-base py-1">No.</span>
        <span className="grid place-items-center text-base  py-1">
          รหัสนักเรียน
        </span>
        <span className="grid place-items-center text-base  py-1">
          ชื่อ - นามสกุล
        </span>
        <span className="text-center py-1 ">
          <div className="text-sm">ภาระงาน</div>
          <div className="text-sm text-gray-500">20 คะแนน</div>
        </span>
        <span className="text-center py-1 ">
          <div className="text-sm">คะแนนทดสอบ</div>
          <div className="text-sm text-gray-500">10 คะแนน</div>
        </span>
        <span className="text-center py-1 ">
          <div className="text-sm">คะแนนจิตพิสัย</div>
          <div className="text-sm text-gray-500">20 คะแนน</div>
        </span>
        <span className="text-center py-1 ">
          <div className="text-sm">คะแนนกลางภาค</div>
          <div className="text-sm text-gray-500">20 คะแนน</div>
        </span>
        <span className="text-center py-1 ">
          <div className="text-sm">คะแนนปลายภาค</div>
          <div className="text-sm text-gray-500">30 คะแนน</div>
        </span>
        <span className="grid place-items-center text-base  py-1 ">
          คะแนนรวม
        </span>
        <span className="grid place-items-center  text-base py-1">เกรด</span>
        <span className="grid place-items-center text-base  py-1">
          หมายเหตุ
        </span>
      </div>
      {gradDatas?.map((item, index) => {
        const calculatedGrade =
          item.remarks && remarkValue.includes(item.remarks)
            ? item.remarks
            : gradingScorce(
                (item.assignmentScore ?? 0) +
                  (item.affectiveScore ?? 0) +
                  (item.collectScore ?? 0) +
                  (item.midtermScore ?? 0) +
                  (item.finaltermScore ?? 0)
              );
        const finalGradeDisplay = remarkValue.includes(item.remarks ?? "")
          ? item.remarks
          : calculatedGrade;
        return (
          <div
            className=" text-sm border-b-[1px]  grid group hover:bg-[#e8f3ff] grid-cols-[3%_8%_15%_10%_10%_10%_10%_10%_8%_8%_8%]"
            key={item.studentId}
          >
            <span className="text-center flex items-center justify-center font-semibold border-l-[1px] border-r-[1px] py-1">
              {index + 1}.
            </span>
            <span className="text-center border-r-[1px] py-1 flex items-center justify-center ">
              {item.studentCode}
            </span>
            <span className="text-start pl-5 border-r-[1px] flex py-1 items-center justify-start">
              {item.firstName} {item.lastName}
            </span>
            <input
              disabled={onEdit != true}
              type="number"
              value={item.assignmentScore ?? 0}
              min={0}
              max={50}
              className={` text-center enabled:bg-blue-50  enabled:text-blue-600  bg-white focus:outline-blue-500 py-2  group-hover:bg-[#e8f3ff] ${
                (item.assignmentScore ?? 0) > 50 ||
                (item.assignmentScore ?? 0) < 0
                  ? "outline-red-500 border-red-500 rounded-md border-1"
                  : "border-gray-300 border-r-[1px]"
              }`}
              onChange={(e) =>
                handleInputChange(index, "assignmentScore", e.target.value)
              }
            />
            <input
              disabled={onEdit != true}
              type="number"
              value={item.collectScore ?? 0}
              min={0}
              max={50}
              className={` text-center enabled:bg-blue-50  enabled:text-blue-600  bg-white focus:outline-blue-500 py-2  group-hover:bg-[#e8f3ff] ${
                (item.collectScore ?? 0) > 50 || (item.collectScore ?? 0) < 0
                  ? "outline-red-500 border-red-500 rounded-md border-1"
                  : "border-gray-300 border-r-[1px]"
              }`}
              onChange={(e) =>
                handleInputChange(index, "collectScore", e.target.value)
              }
            />

            <input
              disabled={!onEdit}
              type="number"
              value={item.affectiveScore ?? 0}
              min={0}
              max={20}
              className={`text-center enabled:bg-blue-50 enabled:text-blue-600   focus:outline-blue-500  py-2 group-hover:bg-[#e8f3ff]  bg-white  ${
                (item.affectiveScore ?? 0) > 20 ||
                (item.affectiveScore ?? 0) < 0
                  ? "border-red-500 outline-red-500 rounded-md border-[1px]"
                  : "border-gray-300 border-r-[1px]"
              }`}
              onChange={(e) =>
                handleInputChange(index, "affectiveScore", e.target.value)
              }
            />
            <input
              disabled={onEdit != true}
              type="number"
              value={item.midtermScore ?? 0}
              min={0}
              max={30}
              className={`text-center enabled:bg-blue-50 enabled:text-blue-600   bg-white  focus:outline-blue-500  py-2 group-hover:bg-[#e8f3ff] ${
                (item.midtermScore ?? 0) > 30 || (item.midtermScore ?? 0) < 0
                  ? "rounded-md outline-red-500 border-red-500  border-[3px]"
                  : "border-gray-300 border-r-[1px]"
              }`}
              onChange={(e) =>
                handleInputChange(index, "midtermScore", e.target.value)
              }
            />
            <input
              disabled={onEdit != true}
              type="number"
              value={item.finaltermScore ?? 0}
              min={0}
              max={50}
              className={` text-center enabled:bg-blue-50  enabled:text-blue-600  bg-white focus:outline-blue-500 py-2  group-hover:bg-[#e8f3ff] ${
                (item.finaltermScore ?? 0) > 50 ||
                (item.finaltermScore ?? 0) < 0
                  ? "outline-red-500 border-red-500 rounded-md border-1"
                  : "border-gray-300 border-r-[1px]"
              }`}
              onChange={(e) =>
                handleInputChange(index, "finaltermScore", e.target.value)
              }
            />
            <span className="text-center text-green-600 font-semibold flex justify-center items-center border-r-[1px] py-2">
              {(item.assignmentScore ?? 0) +
                (item.affectiveScore ?? 0) +
                (item.collectScore ?? 0) +
                (item.midtermScore ?? 0) +
                (item.finaltermScore ?? 0)}
            </span>
            <span className="text-center bg-gray-100 group-hover:bg-[#cae2fa] font-semibold text-base border-r-[1px]">
              <div className="flex justify-center px-1 py-1">
                <Combobox
                  buttonLabel="เกรด"
                  disabled={true}
                  options={gradeValue.map((item) => ({
                    label: item,
                    value: item,
                  }))}
                  onSelect={(selectedGrade) => onChangeGrade(selectedGrade)}
                  defaultValue={finalGradeDisplay}
                />
              </div>
            </span>
            <div className="flex justify-center px-1 py-1 border-r-[1px]">
              <Combobox
                buttonLabel="หมายเหตุ"
                disabled={!onEdit}
                options={remarkValue.map((item) => ({
                  label: item,
                  value: item,
                }))}
                onSelect={(selectedGrade) =>
                  onChangeRemark(selectedGrade, item.studentId)
                }
                defaultValue={item.remarks || ""}
              />
            </div>
          </div>
        );
      })}
      {/* <div className="my-5 w-full grid place-items-end  ">
        <button
          onClick={saveChanges}
          disabled={!onEdit}
          className="px-4 py-2  enabled:bg-green-500 enabled:hover:bg-green-300 duration-300   bg-green-300 text-white rounded hover:bg-green-300"
        >
          บันทึกคะแนน
        </button>
      </div> */}
      <hr />
    </div>
  );
}
