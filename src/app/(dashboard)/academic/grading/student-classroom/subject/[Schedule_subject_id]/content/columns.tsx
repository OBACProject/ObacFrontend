import { Combobox } from "@/components/common/Combobox/combobox";
import { GetGradBySubjectId } from "@/dto/gradDto";
import { Column } from "@/components/common/MainTable/table_style_1";

export const createColumns = ({
  onEdit,
  handleInputChange,
  onChangeGrade,
  onChangeRemark,
}: {
  onEdit: boolean;
  handleInputChange: (
    index: number,
    field: keyof Pick<
      GetGradBySubjectId,
      "assignmentscore" | "collectScore" | "affectiveScore" | "midtermScore" | "finaltermScore"
    >,
    value: string
  ) => void;
  onChangeGrade: (grade: string, studentId: number) => void;
  onChangeRemark: (remark: string, studentId: number) => void;
}): Column<GetGradBySubjectId>[] => {
  const gradeOptions = ["0", "1", "1.5", "2", "2.5", "3", "3.5", "4"];
  const remarkOptions = ["ผ.", "มผ.", "ขส.", "ขร.", "มส."];

  const calculateGradeFromScore = (totalScore: number): string => {
    if (totalScore >= 80) return "4";      
    if (totalScore >= 75) return "3.5";   
    if (totalScore >= 70) return "3";     
    if (totalScore >= 65) return "2.5";    
    if (totalScore >= 60) return "2";     
    if (totalScore >= 55) return "1.5";   
    if (totalScore >= 50) return "1";      
    return "0";                          
  };

  const getGradeColor = (grade: string): string => {
    switch (grade) {
      case "0": return "bg-red-400 text-white";
      default: return "bg-blue-200 text-blue-900";
    }
  };

  return [
    {
      label: "ลำดับ",
      className: "w-1/12",
      render: (row) => `${row.index}`,
    },
    {
      label: "รหัสนักเรียน",
      key: "studentCode",
      className: "w-1/12",
    },
    {
      label: "ชื่อ - นามสกุล",
      className: "w-3/12",
      render: (row) => `${row.prefix} ${row.firstName} ${row.lastName}`,
    },
    {
      label: "คะแนนภารระงาน (20)",
      className: "w-1/12",
      render: (row) =>
        onEdit && !row.remark ? (
          <input
            type="number"
            min={0}
            max={20}
            value={row.assignmentscore}
            className="text-center w-full border px-2 py-1"
            onChange={(e) =>
              handleInputChange(
                row.index !== undefined ? Number(row.index) - 1 : 0,
                "assignmentscore",
                e.target.value
              )
            }
          />
        ) : (
          <div className="text-center w-full border px-2 py-1">
            {row.assignmentscore}
          </div>
        ),
    },
    {
      label: "คะแนนเก็บ (10)",
      className: "w-1/12",
      render: (row) =>
        onEdit && !row.remark ? (
          <input
            type="number"
            min={0}
            max={10}
            value={row.collectScore}
            className="text-center w-full border px-2 py-1"
            onChange={(e) =>
              handleInputChange(
                row.index !== undefined ? Number(row.index) - 1 : 0,
                "collectScore",
                e.target.value
              )
            }
          />
        ) : (
          <div className="text-center w-full border px-2 py-1">
            {row.collectScore}
          </div>
        ),
    },
    {
      label: "คะแนนประพฤติ (20)",
      className: "w-1/12",
      render: (row) =>
        onEdit && !row.remark ? (
          <input
            type="number"
            min={0}
            max={20}
            value={row.affectiveScore}
            className="text-center w-full border px-2 py-1"
            onChange={(e) =>
              handleInputChange(
                row.index !== undefined ? Number(row.index) - 1 : 0,
                "affectiveScore",
                e.target.value
              )
            }
          />
        ) : (
          <div className="text-center w-full border px-2 py-1">
            {row.affectiveScore}
          </div>
        ),
    },
    {
      label: "กลางภาค (20)",
      className: "w-1/12",
      render: (row) =>
        onEdit && !row.remark ? (
          <input
            type="number"
            min={0}
            max={20}
            value={row.midtermScore}
            className="text-center w-full border px-2 py-1"
            onChange={(e) =>
              handleInputChange(
                row.index !== undefined ? Number(row.index) - 1 : 0,
                "midtermScore",
                e.target.value
              )
            }
          />
        ) : (
          <div className="text-center w-full border px-2 py-1">
            {row.midtermScore}
          </div>
        ),
    },
    {
      label: "ปลายภาค (30)",
      className: "w-1/12",
      render: (row) =>
        onEdit && !row.remark ? (
          <input
            type="number"
            min={0}
            max={30}
            value={row.finaltermScore}
            className="text-center w-full border px-2 py-1"
            onChange={(e) =>
              handleInputChange(
                row.index !== undefined ? Number(row.index) - 1 : 0,
                "finaltermScore",
                e.target.value
              )
            }
          />
        ) : (
          <div className="text-center w-full border px-2 py-1">
            {row.finaltermScore}
          </div>
        ),
    },
    {
      label: "รวม (100)",
      className: "w-1/12",
      render: (row) => (
        <div className="text-center w-full border px-2 py-1 font-semibold bg-blue-50">
          {row.totalScore}
        </div>
      ),
    },
    {
      label: "เกรด",
      className: "w-1/12 flex justify-center",
      render: (row) => {
        const hasRemark = row.remark !== null && row.remark.trim() !== "";
        const calculatedGrade = calculateGradeFromScore(row.totalScore);
        const gradeColor = getGradeColor(calculatedGrade);

        // Show calculated grade (read-only) or manual grade selection for special cases
        return hasRemark ? (
          // If student has remarks, allow manual grade selection
          onEdit ? (
            <Combobox
              disabled={!onEdit}
              buttonLabel="เกรด"
              options={gradeOptions.map((g) => ({ label: g, value: g }))}
              onSelect={(val) => onChangeGrade(val, row.studentId)}
              defaultValue={row.grade}
            />
          ) : (
            <div className={`text-center w-full border px-2 py-1 rounded ${gradeColor}`}>
              {row.grade}
            </div>
          )
        ) : (
          // Auto-calculated grade (read-only)
          <div 
            className={`text-center w-full border px-2 py-1 rounded font-semibold ${gradeColor}`}
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
            options={remarkOptions.map((r) => ({ label: r, value: r }))}
            onSelect={(val) => onChangeRemark(val, row.studentId)}
            defaultValue={row.remark || "หมายเหตุ"}
          />
        ) : (
          <div className="text-center w-full border h-6 px-2">
            {row.remark}
          </div>
        ),
    },
  ];
};