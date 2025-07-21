"use client";
import { GetSubjectsByTermAndClass } from "@/api/subject/route";
import { SubjectGrade } from "@/dto/gradingDto";
import { SubjectItem } from "@/dto/subjectDto";
import { Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import BasicSubjectCombobox from "./๋SubjectCombobox";

interface ScoreInputFormProps {
  scores: SubjectGrade[];
  edit: boolean;
  onChange: (updated: SubjectGrade[]) => void;
  onRemoveGroup?: () => void;
  term: string;
  year: number;
  classLevel: string;
}

export default function ScoreInputForm({
  scores,
  edit,
  onChange,
  onRemoveGroup,
  term,
  year,
  classLevel,
}: ScoreInputFormProps) {
  const [subjects, setSubject] = useState<SubjectItem[]>();
  useEffect(() => {
    GetSubjectsByTermAndClass(String(term), String(classLevel)).then((d) => {
      if (d) {
        setSubject(d);
      }
    });
  }, []);

  const handleChange = (
    index: number,
    field: keyof SubjectGrade,
    value: any
  ) => {
    let newValue =
      field === "gradePoint" || field === "credit" || field === "finalGrade"
        ? parseFloat(value) || 0
        : value;

    if (field === "credit") {
      newValue = Math.max(0, Math.min(newValue, 3));
    }
    if (field === "finalGrade") {
      newValue = Math.max(0, Math.min(newValue, 4));
    }

    updated[index] = {
      ...updated[index],
      [field]: newValue,
    };

    onChange(updated);
  };

  const addRow = () => {
    const newRow: SubjectGrade = {
      gradeId: 0,
      term,
      year,
      subjectId: 0,
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
            <th className="border px-2 py-1">ชื่อวิชา - รหัสวิชา</th>
            {/* <th className="border px-2 py-1">รหัสวิชา</th> */}
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
                    <BasicSubjectCombobox
                      subjects={subjects || []}
                      selectedId={row.subjectId}
                      onSelect={(subject) => {
                        handleChange(index, "subjectId", subject.id);
                        handleChange(index, "subjectCode", subject.code);
                        handleChange(index, "subjectName", subject.name);
                        handleChange(index, "credit", subject.credits);
                      }}
                    />
                  ) : (
                    `${row.subjectName} (${row.subjectCode})`
                  )}
                </td>

                <td className="border text-center px-2 py-1">{row.credit}</td>
                <td className="border text-center px-2 py-1">
                  {edit ? (
                    <input
                      type="number"
                      value={row.finalGrade}
                      max={4}
                      min={0}
                      onChange={(e) =>
                        handleChange(index, "finalGrade", e.target.value)
                      }
                      className="w-[80px] text-center py-1 px-2 border  border-gray-200"
                    />
                  ) : (
                    row.finalGrade
                  )}
                </td>
                <td className="border text-center px-2 py-1">
                  {row.finalGrade * row.credit}
                </td>
                <td className="border text-center px-2 py-1">
                  {edit ? (
                    <select
                      value={row.remark ?? ""}
                      onChange={(e) =>
                        handleChange(index, "remark", e.target.value || null)
                      }
                      className="w-full py-1 px-2 border border-gray-200"
                    >
                      <option value="">-</option>
                      <option value="น.ร.">น.ร.</option>
                      <option value="ข.ป.">ข.ป.</option>
                      <option value="ถ.ล.">ถ.ล.</option>
                      <option value="ถ.น.">ถ.น.</option>
                      <option value="ถ.พ.">ถ.พ.</option>
                      <option value="ท.">ท.</option>
                      <option value="ม.ส.">ม.ส.</option>
                      <option value="ม.ท.">ม.ท.</option>
                      <option value="ผ.">ผ.</option>
                      <option value="ม.ผ.">ม.ผ.</option>
                      <option value="ม.ก.">ม.ก.</option>
                    </select>
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
