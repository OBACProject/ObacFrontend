"use client";
import { SubjectGrade } from "@/dto/gradingDto";
import { Trash2 } from "lucide-react";
import React from "react";

interface ScoreInputFormProps {
  scores: SubjectGrade[];
  edit: boolean;
  onChange: (updated: SubjectGrade[]) => void;
  onRemoveGroup?: () => void;
  term: string;
  year: number;
}

export default function ScoreInputForm({
  scores,
  edit,
  onChange,
  onRemoveGroup,
  term,
  year,
}: ScoreInputFormProps) {
  const handleChange = (
    index: number,
    field: keyof SubjectGrade,
    value: any
  ) => {
    updated[index] = {
      ...updated[index],
      [field]:
        field === "gradePoint" || field === "credit" || field === "finalGrade"
          ? parseFloat(value) || 0
          : value,
    };

    if (field === "credit" || field === "finalGrade") {
      updated[index].credit = updated[index].credit * updated[index].finalGrade;
    }

    onChange(updated);
  };

  const addRow = () => {
    const newRow: SubjectGrade = {
      gradeId: 0,
      term,
      year,
      subjectName: "",
      subjectCode: "",
      credit: 0,
      gradePoint: 0,
      finalGrade: 0,
      remark: "",
    };
    onChange([...scores, newRow]);
  };
  const removeRow = (index: number) => {
    const updated = scores.filter((_, i) => i !== index);
    onChange(updated);
  };
  const updated = [...scores];
  return (
    <div className="p-4 border border-gray-300 rounded-md mb-4">
      <table className="w-full border border-gray-300 text-sm">
        <thead className="bg-gray-200 text-lg font-prompt_Light text-center text-gray-800 font-semibold">
          <tr>
            <th className="border px-2 py-1 w-[100px]">เทอม</th>
            <th className="border px-2 py-1">ปีการศึกษา</th>
            <th className="border px-2 py-1">ชื่อวิชา</th>
            <th className="border px-2 py-1">รหัสวิชา</th>
            <th className="border px-2 py-1">หน่วยกิต</th>
            <th className="border px-2 py-1">เกรด</th>
            <th className="border px-2 py-1">ผลคูณ</th>
            <th className="border px-2 py-1 w-[100px]">หมายเหตุ</th>
            <th className="border px-2 py-1 w-[60px]">
              {edit && (
                <div className="flex  items-center">
                  {onRemoveGroup && (
                    <button
                      onClick={onRemoveGroup}
                      className="bg-red-700 hover:bg-red-800 text-white px-2 py-1.5 rounded"
                    >
                      <Trash2 className="w-5 h-5 text-white" />
                    </button>
                  )}
                </div>
              )}
            </th>
          </tr>
        </thead>
        <tbody>
          {scores.length === 0 && !edit ? (
            <tr>
              <td
                colSpan={8}
                className="text-center text-lg text-gray-500 py-4"
              >
                ไม่มีข้อมูลคะแนนในตาราง
              </td>
            </tr>
          ) : scores.length === 0 && edit ? (
            <tr>
              <td colSpan={8} className="text-center text-gray-500 py-4">
                <button
                  onClick={addRow}
                  className="mt-2 bg-gray-600 hover:bg-gray-800 text-white px-4 py-1.5 rounded"
                >
                  เพิ่มแถวแรก
                </button>
              </td>
            </tr>
          ) : (
            scores.map((row, index) => (
              <tr key={index} className="">
                <td className="border text-center  px-2 py-1">{row.term}</td>
                <td className="border text-center px-2 py-1">{row.year}</td>
                <td className="border px-2 py-1">
                  {edit ? (
                    <input
                      type="text"
                      value={row.subjectName}
                      onChange={(e) =>
                        handleChange(index, "subjectName", e.target.value)
                      }
                      className="w-full py-1 px-2 text-start border border-gray-200"
                    />
                  ) : (
                    row.subjectName || "-"
                  )}
                </td>
                <td className="border text-center px-2 py-1">
                  {edit ? (
                    <input
                      type="text"
                      value={row.subjectCode}
                      onChange={(e) =>
                        handleChange(index, "subjectCode", e.target.value)
                      }
                      className="w-full py-1 text-center px-2 border border-gray-200"
                    />
                  ) : (
                    row.subjectCode || "-"
                  )}
                </td>
                <td className="border text-center px-2 py-1">
                  {edit ? (
                    <input
                      type="number"
                      value={row.credit}
                      onChange={(e) =>
                        handleChange(index, "credit", e.target.value)
                      }
                      className="w-[80px] text-center py-1 px-2 border  border-gray-200"
                    />
                  ) : (
                    row.credit
                  )}
                </td>
                <td className="border text-center px-2 py-1">
                  {edit ? (
                    <input
                      type="number"
                      value={row.gradePoint}
                      onChange={(e) =>
                        handleChange(index, "gradePoint", e.target.value)
                      }
                      className="w-[80px] text-center py-1 px-2 border  border-gray-200"
                    />
                  ) : (
                    row.gradePoint
                  )}
                </td>
                <td className="border text-center px-2 py-1">
                  {row.finalGrade}
                </td>
                <td className="border text-center px-2 py-1">
                  {edit ? (
                    <input
                      type="text"
                      value={row.remark}
                      onChange={(e) =>
                        handleChange(index, "remark", e.target.value)
                      }
                      className="w-full py-1  px-2 border border-gray-200"
                    />
                  ) : (
                    row.remark || "-"
                  )}
                </td>
                <td className="border text-center px-2 py-1">
                  {edit && (
                    <button
                      onClick={() => removeRow(index)}
                      className="bg-red-400 hover:bg-red-600 text-white px-2 py-1 rounded"
                    >
                      ลบ
                    </button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {edit && (
        <div className="mt-4">
          <button
            onClick={addRow}
            className="bg-gray-600 hover:bg-gray-800 text-white px-4 py-1.5 rounded"
          >
            เพิ่มแถว
          </button>
        </div>
      )}
    </div>
  );
}
