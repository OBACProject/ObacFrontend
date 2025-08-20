"use client";
import React, { useEffect, useState } from "react";
import { SubjectGradeItem } from "@/dto/gradDto";
import { Combobox } from "@/components/common/Combobox/combobox";
import { BulkUpdateStudentGradeByScheduleSubjectId } from "@/api/grad/route";
import { toast } from "react-toastify";
import { Pencil } from "lucide-react";

interface Props {
  grads?: SubjectGradeItem[];
  scheduleID: number;
}

export default function SubjectTableForm({ grads, scheduleID }: Props) {
  const [onEdit, setEdit] = useState<boolean>(false);
  const [gradDatas, setGradData] = useState<SubjectGradeItem[]>([]);

  useEffect(() => {
    const sortedData = [...(grads ?? [])].sort(
      (a, b) => a.studentId - b.studentId
    );
    setGradData(sortedData);
  }, [grads]);

  const LIMITS: Record<
    | "affectiveScore"
    | "collectScore"
    | "assignmentScore"
    | "midtermScore"
    | "finaltermScore",
    number
  > = {
    affectiveScore: 20,
    collectScore: 10,
    assignmentScore: 20,
    midtermScore: 20,
    finaltermScore: 30,
  };

  const clamp = (n: number, min: number, max: number) =>
    Math.max(min, Math.min(max, n));

  const handleScoreChange = (
    index: number,
    field: keyof typeof LIMITS,
    raw: string
  ) => {
    if (raw === "") {
      const updated = [...gradDatas];
      (updated[index] as any)[field] = 0;
      setGradData(updated);
      return;
    }

    const sanitizeInt = (raw: string) => raw.replace(/[^\d]/g, "");
    const cleaned = sanitizeInt(raw);

    const num = cleaned === "" ? 0 : Number(cleaned);
    const safe = clamp(num, 0, LIMITS[field]);

    const updated = [...gradDatas];
    (updated[index] as any)[field] = safe;
    setGradData(updated);
  };

  const handlePasteNumeric: React.ClipboardEventHandler<HTMLInputElement> = (
    e
  ) => {
    const text = e.clipboardData.getData("text");
    if (!/^\d+$/.test(text)) {
      e.preventDefault();
    }
  };

  const blockNonNumericKeys: React.KeyboardEventHandler<HTMLInputElement> = (
    e
  ) => {
    if (["e", "E", "+", "-", ".", ","].includes(e.key)) {
      e.preventDefault();
    }
  };

  const onSaveGrad = async () => {
    const payload = gradDatas.map((g) => ({
      studentId: g.studentId,
      collectScore: g.collectScore ?? 0,
      assignmentScore: g.assignmentScore ?? 0,
      affectiveScore: g.affectiveScore ?? 0,
      midtermScore: g.midtermScore ?? 0,
      finaltermScore: g.finaltermScore ?? 0,
      totalScore:
        (g.assignmentScore ?? 0) +
        (g.affectiveScore ?? 0) +
        (g.collectScore ?? 0) +
        (g.midtermScore ?? 0) +
        (g.finaltermScore ?? 0),
      finalGrade: 0,
      remarks: g.remarks ?? "",
    }));

    const result = await BulkUpdateStudentGradeByScheduleSubjectId(
      scheduleID,
      payload
    );

    if (result) {
      toast.success("บันทึกคะแนนสำเร็จ");
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } else {
      alert("เกิดข้อผิดพลาดในการบันทึก");
    }
  };

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
    <div className="w-full">
      <div className="flex justify-end  my-2">
        {onEdit ? (
          <div className="flex items-center gap-2 justify-center">
            <button
              className="py-1.5 bg-red-500 text-white px-10 flex items-center gap-2 rounded-md shadow-md hover:bg-red-400-400 "
              onClick={() => setEdit(!onEdit)}
            >
              ยกเลิก
            </button>
            <button
              onClick={() => onSaveGrad()}
              className="py-1.5 bg-green-500 text-white px-10 flex items-center gap-2 rounded-md shadow-md hover:bg-green-400 "
            >
              บันทึก
            </button>
          </div>
        ) : (
          <button
            className="py-1.5 bg-blue-500 text-white px-10 flex items-center gap-2 rounded-md shadow-md hover:bg-blue-400 "
            onClick={() => setEdit(!onEdit)}
          >
            <Pencil className="h-5 w-5" />
            แก้ไข
          </button>
        )}
      </div>
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
            <div className="text-sm">คะแนนจิตพิสัย</div>
            <div className="text-sm text-gray-500">20 คะแนน</div>
          </span>

          <span className="text-center py-1 ">
            <div className="text-sm">คะแนนทดสอบ</div>
            <div className="text-sm text-gray-500">10 คะแนน</div>
          </span>
          <span className="text-center py-1 ">
            <div className="text-sm">ภาระงาน</div>
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
              className=" text-sm border-b-[1px] h-fit grid group hover:bg-[#e8f3ff] grid-cols-[3%_8%_15%_10%_10%_10%_10%_10%_8%_8%_8%]"
              key={item.studentId}
            >
              <span className="text-center flex items-center justify-center font-semibold border-l-[1px] border-r-[1px] py-0">
                {index + 1}.
              </span>
              <span className="text-center border-r-[1px] py-0 flex items-center justify-center ">
                {item.studentCode}
              </span>
              <span className="text-start pl-5 border-r-[1px] flex py-0 items-center justify-start">
                {item.firstName} {item.lastName}
              </span>
              <input
                disabled={!onEdit}
                onKeyDown={blockNonNumericKeys}
                type="number"
                value={
                  item.affectiveScore === 0 ? "" : item.affectiveScore ?? ""
                }
                min={0}
                max={20}
                onPaste={handlePasteNumeric}
                className={`text-center enabled:bg-blue-50 enabled:text-blue-600   focus:outline-blue-500  py-0 group-hover:bg-[#e8f3ff]  bg-white  ${
                  (item.affectiveScore ?? 0) > 20 ||
                  (item.affectiveScore ?? 0) < 0
                    ? "border-red-500 outline-red-500 rounded-md border-[1px]"
                    : "border-gray-300 border-r-[1px]"
                }`}
                onChange={(e) =>
                  handleScoreChange(index, "affectiveScore", e.target.value)
                }
              />
              <input
                onPaste={handlePasteNumeric}
                onKeyDown={blockNonNumericKeys}
                disabled={onEdit != true}
                type="number"
                value={item.collectScore === 0 ? "" : item.collectScore ?? ""}
                min={0}
                max={10}
                className={` text-center enabled:bg-blue-50  enabled:text-blue-600  bg-white focus:outline-blue-500 py-0  group-hover:bg-[#e8f3ff] ${
                  (item.collectScore ?? 0) > 10 || (item.collectScore ?? 0) < 0
                    ? "outline-red-500 border-red-500 rounded-md border-1"
                    : "border-gray-300 border-r-[1px]"
                }`}
                onChange={(e) =>
                  handleScoreChange(index, "collectScore", e.target.value)
                }
              />
              <input
                onPaste={handlePasteNumeric}
                onKeyDown={blockNonNumericKeys}
                disabled={onEdit != true}
                type="number"
                value={
                  item.assignmentScore === 0 ? "" : item.assignmentScore ?? ""
                }
                min={0}
                max={20}
                className={` text-center enabled:bg-blue-50  enabled:text-blue-600  bg-white focus:outline-blue-500 py-0  group-hover:bg-[#e8f3ff] ${
                  (item.assignmentScore ?? 0) > 20 ||
                  (item.assignmentScore ?? 0) < 0
                    ? "outline-red-500 border-red-500 rounded-md border-1"
                    : "border-gray-300 border-r-[1px]"
                }`}
                onChange={(e) =>
                  handleScoreChange(index, "assignmentScore", e.target.value)
                }
              />

              <input
                onPaste={handlePasteNumeric}
                onKeyDown={blockNonNumericKeys}
                disabled={onEdit != true}
                type="number"
                value={item.midtermScore === 0 ? "" : item.midtermScore ?? ""}
                min={0}
                max={20}
                className={`text-center enabled:bg-blue-50 enabled:text-blue-600   bg-white  focus:outline-blue-500  py-0 group-hover:bg-[#e8f3ff] ${
                  (item.midtermScore ?? 0) > 20 || (item.midtermScore ?? 0) < 0
                    ? "rounded-md outline-red-500 border-red-500  border-[3px]"
                    : "border-gray-300 border-r-[1px]"
                }`}
                onChange={(e) =>
                  handleScoreChange(index, "midtermScore", e.target.value)
                }
              />
              <input
                onPaste={handlePasteNumeric}
                onKeyDown={blockNonNumericKeys}
                disabled={onEdit != true}
                type="number"
                value={
                  item.finaltermScore === 0 ? "" : item.finaltermScore ?? ""
                }
                min={0}
                max={30}
                className={` text-center enabled:bg-blue-50  enabled:text-blue-600  bg-white focus:outline-blue-500 py-0  group-hover:bg-[#e8f3ff] ${
                  (item.finaltermScore ?? 0) > 30 ||
                  (item.finaltermScore ?? 0) < 0
                    ? "outline-red-500 border-red-500 rounded-md border-1"
                    : "border-gray-300 border-r-[1px]"
                }`}
                onChange={(e) =>
                  handleScoreChange(index, "finaltermScore", e.target.value)
                }
              />
              <span className="text-center text-green-600 font-semibold flex justify-center items-center border-r-[1px] py-0">
                {(item.assignmentScore ?? 0) +
                  (item.affectiveScore ?? 0) +
                  (item.collectScore ?? 0) +
                  (item.midtermScore ?? 0) +
                  (item.finaltermScore ?? 0)}
              </span>
              <span className="text-center bg-gray-100 group-hover:bg-[#cae2fa] font-semibold text-base border-r-[1px]">
                <div className="flex justify-center px-1 py-0.5">
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
              <div className="flex justify-center px-1 py-0.5 border-r-[1px]">
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
      </div>{" "}
    </div>
  );
}
