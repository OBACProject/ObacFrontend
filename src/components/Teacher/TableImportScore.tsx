"use client";
import React from "react";

interface ScoreImportProps {
  term: string;
  year: number;
  subjectName: string;
  subjectCode: string;
  unit: number;
  credite: number;
  summaryCredit: number;
  remark: string;
}

interface ScoreInputFormProps {
  scores: ScoreImportProps[];
  edit: boolean;
  onChange: (updated: ScoreImportProps[]) => void;
  term: string;
  year: number;
}

export default function ScoreInputForm({
  scores,
  edit,
  onChange,
  term,
  year,
}: ScoreInputFormProps) {
  const handleChange = (
    index: number,
    field: keyof ScoreImportProps,
    value: any
  ) => {
    const updated = [...scores];
    updated[index] = {
      ...updated[index],
      [field]:
        field === "unit" || field === "credite" || field === "summaryCredit"
          ? parseFloat(value) || 0
          : value,
    };

    if (field === "unit" || field === "credite") {
      updated[index].summaryCredit =
        updated[index].unit * updated[index].credite;
    }

    onChange(updated);
  };

  const addRow = () => {
    const newRow: ScoreImportProps = {
      term,
      year,
      subjectName: "",
      subjectCode: "",
      unit: 0,
      credite: 0,
      summaryCredit: 0,
      remark: "",
    };
    onChange([...scores, newRow]);
  };

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
                      value={row.unit}
                      onChange={(e) =>
                        handleChange(index, "unit", e.target.value)
                      }
                      className="w-[80px] text-center py-1 px-2 border  border-gray-200"
                    />
                  ) : (
                    row.unit
                  )}
                </td>
                <td className="border text-center px-2 py-1">
                  {edit ? (
                    <input
                      type="number"
                      value={row.credite}
                      onChange={(e) =>
                        handleChange(index, "credite", e.target.value)
                      }
                      className="w-[80px] text-center py-1 px-2 border  border-gray-200"
                    />
                  ) : (
                    row.credite
                  )}
                </td>
                <td className="border text-center px-2 py-1">
                  {row.summaryCredit}
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
