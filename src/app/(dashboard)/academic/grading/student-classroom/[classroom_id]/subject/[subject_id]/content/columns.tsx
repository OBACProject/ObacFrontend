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
      "collectScore" | "affectiveScore" | "testScore"
    >,
    value: string
  ) => void;
  onChangeGrade: (grade: string, studentId: number) => void;
  onChangeRemark: (remark: string, studentId: number) => void;
}): Column<GetGradBySubjectId>[] => {
  const gradeOptions = ["0", "1", "1.5", "2", "2.5", "3", "3.5", "4"];
  const remarkOptions = ["ผ.", "มผ.", "ขส.", "ขร.", "มส."];

  return [
    {
      label: "ลำดับ",
      className: "w-1/12 ",
      render: (row) => `${row.index}`,
    },
    {
      label: "รหัสนักเรียน",
      key: "studentCode",
      className: "w-1/6  ",
    },
    {
      label: "ชื่อ - นามสกุล",
      className: "w-1/6 ",
      render: (row) => `${row.firstName} ${row.lastName}`,
    },
    {
      label: "คะแนนเก็บ",
      className: "w-1/6",
      render: (row) =>
        onEdit && !row.remark ? (
          <input
            type="number"
            min={0}
            max={50}
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
      label: "จิตพิสัย",
      className: "w-1/6",
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
      label: "สอบ",
      className: "w-1/6",
      render: (row) =>
        onEdit && !row.remark ? (
          <input
            type="number"
            min={0}
            max={30}
            value={row.testScore}
            className="text-center w-full border px-2 py-1"
            onChange={(e) =>
              handleInputChange(
                row.index !== undefined ? Number(row.index) - 1 : 0,
                "testScore",
                e.target.value
              )
            }
          />
        ) : (
          <div className="text-center w-full border px-2 py-1">
            {row.testScore}
          </div>
        ),
    },
    {
      label: "รวม",
      className: "w-1/6",
      render: (row) => (
        <div className="text-center w-full border px-2 py-1">
          {row.collectScore + row.affectiveScore + row.testScore}
        </div>
      ),
    },
    {
      label: "เกรด",
      className: "w-1/6 flex justify-center",
      render: (row) => {
        const hasRemark = row.remark !== null && row.remark.trim() !== "";

        return onEdit && !hasRemark ? (
          <Combobox
            disabled={!onEdit}
            buttonLabel="เกรด"
            options={gradeOptions.map((g) => ({ label: g, value: g }))}
            onSelect={(val) => onChangeGrade(val, row.studentId)}
            defaultValue={row.grade}
          />
        ) : (
          <div className="text-center w-full border px-2 py-1">{row.grade}</div>
        );
      },
    },
    {
      label: "หมายเหตุ",
      className: "w-1/6",
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
          <div className="text-center w-full border px-2 py-1">
            {row.remark}
          </div>
        ),
    },
  ];
};
