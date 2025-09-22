"use client";
import { Combobox } from "@/components/common/Combobox/combobox";
import { GetGradBySubjectId } from "@/dto/gradDto";
import { Column } from "@/components/common/MainTable/table_style_1";

type Field =
  | "assignmentscore"
  | "collectScore"
  | "affectiveScore"
  | "midtermScore"
  | "finaltermScore";

export const createColumns = ({
  onEdit,
  handleInputChange,
  handleBlur,
  draft,
  commitNumber,
  onChangeGrade,
  onChangeRemark,
}: {
  onEdit: boolean;
  handleInputChange: (index: number, field: Field, value: string) => void;
  handleBlur: (
    index: number,
    field: Field,
    min: number,
    max: number,
    commitNumber: (idx: number, field: Field, n: number) => void
  ) => void;
  draft: Record<number, Partial<Record<Field, string>>>;
  commitNumber: (idx: number, field: Field, n: number) => void;
  onChangeGrade: (grade: string, studentId: number) => void;
  onChangeRemark: (remark: string, studentId: number) => void;
}): Column<GetGradBySubjectId>[] => {
  const gradeOptions = ["0", "1", "1.5", "2", "2.5", "3", "3.5", "4"];
  const remarkOptions = ["", "ผ.", "ม.ผ.", "ข.ส.", "ข.ร."];

  const valueOf = (
    row: GetGradBySubjectId,
    idx: number,
    field: Field
  ): string => {
    const inDraft = draft[idx]?.[field];
    if (inDraft !== undefined) return inDraft;
    const raw = (row as any)[field];
    return raw === null || raw === undefined ? "" : String(raw);
  };

  const getGradeColor = (grade: string): string => {
    switch (grade) {
      case "0":
        return "bg-red-100 text-red-700";
      default:
        return "bg-green-100 text-green-800";
    }
  };

  const idxOf = (row: GetGradBySubjectId) => {
    const n =
      typeof row.index === "number" ? row.index : Number(row.index ?? 1);
    return (Number.isFinite(n) ? n : 1) - 1;
  };

  return [
    {
      label: "ลำดับ",
      className: "w-1/12 flex justify-center text-sm",
      render: (row) => `${row.index}`,
    },
    { label: "รหัสนักเรียน", key: "studentCode", className: "w-1/12 text-sm" },
    {
      label: "ชื่อ - นามสกุล",
      className: "w-3/12 text-sm",
      render: (row) => (
        <span className="pl-6">
          {row.prefix} {row.firstName} {row.lastName}
        </span>
      ),
    },

    // จิตพิสัย (20)
    {
      label: "คะแนนจิตพิสัย (20)",
      className: `w-1/12 text-sm  'bg-white`,
      render: (row) =>
        onEdit && !row.remarks ? (
          <input
            type="number"
            inputMode="decimal"
            step="any"
            min={0}
            max={20}
            value={valueOf(row, idxOf(row), "affectiveScore")}
            className={`text-center  ${
              onEdit ? "bg-blue-50" : "bg-white"
            }  rounded-sm w-full px-2 py-1`}
            onChange={(e) =>
              handleInputChange(idxOf(row), "affectiveScore", e.target.value)
            }
            onBlur={() =>
              handleBlur(idxOf(row), "affectiveScore", 0, 20, commitNumber)
            }
          />
        ) : (
          <div className="text-center w-full px-2 py-1 ">
            {row.affectiveScore}
          </div>
        ),
    },

    // ทดสอบ (10)
    {
      label: "คะแนนทดสอบ (10)",
      className: `w-1/12 text-sm  'bg-white`,
      render: (row) =>
        onEdit && !row.remarks ? (
          <input
            type="number"
            inputMode="decimal"
            step="any"
            min={0}
            max={10}
            value={valueOf(row, idxOf(row), "collectScore")}
            className={`text-center  ${
              onEdit ? "bg-blue-50" : "bg-white"
            }  rounded-sm w-full px-2 py-1`}
            onChange={(e) =>
              handleInputChange(idxOf(row), "collectScore", e.target.value)
            }
            onBlur={() =>
              handleBlur(idxOf(row), "collectScore", 0, 10, commitNumber)
            }
          />
        ) : (
          <div className="text-center w-full px-2 py-1">{row.collectScore}</div>
        ),
    },

    // ภาระงาน (20)
    {
      label: "ภาระงาน (20)",
      className: `w-1/12 text-sm  'bg-white`,
      render: (row) =>
        onEdit && !row.remarks ? (
          <input
            type="number"
            inputMode="decimal"
            step="any"
            min={0}
            max={20}
            value={valueOf(row, idxOf(row), "assignmentscore")}
            className={`text-center  ${
              onEdit ? "bg-blue-50" : "bg-white"
            }  rounded-sm w-full px-2 py-1`}
            onChange={(e) =>
              handleInputChange(idxOf(row), "assignmentscore", e.target.value)
            }
            onBlur={() =>
              handleBlur(idxOf(row), "assignmentscore", 0, 20, commitNumber)
            }
          />
        ) : (
          <div className="text-center w-full px-2 py-1">
            {row.assignmentscore}
          </div>
        ),
    },

    // กลางภาค (20)
    {
      label: "คะแนนกลางภาค (20)",
      className: `w-1/12 text-sm  'bg-white`,
      render: (row) =>
        onEdit && !row.remarks ? (
          <input
            type="number"
            inputMode="decimal"
            step="any"
            min={0}
            max={20}
            value={valueOf(row, idxOf(row), "midtermScore")}
            className={`text-center  ${
              onEdit ? "bg-blue-50" : "bg-white"
            }  rounded-sm w-full px-2 py-1`}
            onChange={(e) =>
              handleInputChange(idxOf(row), "midtermScore", e.target.value)
            }
            onBlur={() =>
              handleBlur(idxOf(row), "midtermScore", 0, 20, commitNumber)
            }
          />
        ) : (
          <div className="text-center w-full px-2 py-1 ">
            {row.midtermScore}
          </div>
        ),
    },

    // ปลายภาค (30)
    {
      label: "คะแนนปลายภาค (30)",
      className: `w-1/12 text-sm  'bg-white`,
      render: (row) =>
        onEdit && !row.remarks ? (
          <input
            type="number"
            inputMode="decimal"
            step="any"
            min={0}
            max={30}
            value={valueOf(row, idxOf(row), "finaltermScore")}
            className={`text-center  ${
              onEdit ? "bg-blue-50" : "bg-white"
            }  rounded-sm w-full px-2 py-1`}
            onChange={(e) =>
              handleInputChange(idxOf(row), "finaltermScore", e.target.value)
            }
            onBlur={() =>
              handleBlur(idxOf(row), "finaltermScore", 0, 30, commitNumber)
            }
          />
        ) : (
          <div className="text-center w-full px-2 py-1">
            {row.finaltermScore}
          </div>
        ),
    },

    {
      label: "รวม (100)",
      className: "w-1/12 text-sm",
      render: (row) => (
        <div className="text-center text-blue-700 w-full rounded-sm px-2 py-1 font-semibold ">
          {row.totalScore}
        </div>
      ),
    },
    {
      label: "เกรด",
      className: "w-1/12 flex justify-center text-sm",
      render: (row) => {
        const calculateGradeFromScore = (total: number): string =>
          total >= 80
            ? "4"
            : total >= 75
            ? "3.5"
            : total >= 70
            ? "3"
            : total >= 65
            ? "2.5"
            : total >= 60
            ? "2"
            : total >= 55
            ? "1.5"
            : total >= 50
            ? "1"
            : "0";

        const hasRemark = row.remarks && row.remarks.trim() !== "";
        const calculatedGrade = calculateGradeFromScore(row.totalScore);
        const gradeColor =
          row.finalGrade != null
            ? getGradeColor(String(row.finalGrade))
            : getGradeColor(calculatedGrade);

        if (hasRemark) {
          return (
            <div className="text-center w-full  px-2 py-1 rounded font-semibold text-blue-800">
              {row.remarks}
            </div>
          );
        }

        if (row.finalGrade && !hasRemark) {
          return onEdit ? (
            <Combobox
              disabled={!onEdit}
              buttonLabel="เกรด"
              options={["0", "1", "1.5", "2", "2.5", "3", "3.5", "4"].map(
                (g) => ({ label: g, value: g })
              )}
              onSelect={(val) => onChangeGrade(val, row.studentId)}
              defaultValue={String(row.finalGrade)}
            />
          ) : (
            <div
              className={`text-center w-full  px-2 py-1 rounded ${gradeColor}`}
            >
              {row.finalGrade}
            </div>
          );
        }

        return (
          <div
            className={`text-center w-full px-2 py-1 rounded font-semibold ${gradeColor}`}
            title={`คำนวณอัตโนมัติจากคะแนนรวม ${row.totalScore}`}
          >
            {calculatedGrade}
          </div>
        );
      },
    },
    {
      label: "หมายเหตุ",
      className: "w-1/12",
      render: (row) =>
        onEdit ? (
          <Combobox
            disabled={!onEdit}
            buttonLabel="หมายเหตุ"
            options={remarkOptions.map((r) => ({ label: r || "-", value: r }))}
            onSelect={(val) => onChangeRemark(val, row.studentId)}
            defaultValue={row.remarks || ""}
          />
        ) : (
          <div className="text-center w-full  h-6 px-2">
            {row.remarks || ""}
          </div>
        ),
    },
  ];
};
