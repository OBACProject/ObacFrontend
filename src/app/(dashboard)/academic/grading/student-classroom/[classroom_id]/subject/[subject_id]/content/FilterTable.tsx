"use client";

import { useState } from "react";
import { DataTable } from "@/components/common/MainTable/table_style_1";
import { GetGradBySubjectId } from "@/dto/gradDto";
import { createColumns } from "./columns";
import HeaderLabel from "@/components/common/labelText/HeaderLabel";
import { CircleX, Pencil, ScrollText } from "lucide-react";
import Swal from "sweetalert2";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import ExportFile from "./ExportFile";
import { Input } from "@/components/ui/input";

const mockGradData: GetGradBySubjectId[] = [
  {
    gradeId: 101,
    subjectId: 1,
    scheduleSubjectId: 1,
    studentGroup: "A104",
    studentId: 1,
    studentCode: "631001",
    gender: "Male",
    firstName: "สมชาย",
    lastName: "ใจดี",
    subjectName: "คณิตศาสตร์",
    collectScore: 45,
    testScore: 27,
    affectiveScore: 18,
    totalScore: 90,
    grade: "4",
    remark: "",
  },
  {
    gradeId: 102,
    studentId: 2,
    studentCode: "631002",
    firstName: "สุมิตรา",
    lastName: "สุขใจ",
    collectScore: 20,
    affectiveScore: 25,
    testScore: 20,
    remark: "ผ.",
    grade: "1.5",
    gender: "Female",
    class: "ปวช.1/2",
    studentGroup: "A104",
    subjectId: 1,
    scheduleSubjectId: 1,
    subjectName: "คณิตศาสตร์",
    totalScore: 65,
  },
  {
    gradeId: 103,
    studentId: 3,
    studentCode: "631003",
    firstName: "จารุวรรณ",
    lastName: "เก่งกล้า",
    collectScore: 48,
    affectiveScore: 20,
    testScore: 30,
    remark: "มผ.",
    finalGrade: "4",
    gender: "Female",
    class: "ปวช.1/2",
    studentGroup: "A104",
    subjectId: 1,
    scheduleSubjectId: 1,
    subjectName: "คณิตศาสตร์",
    totalScore: 98,
    grade: "4",
  },
];

const transformData = mockGradData.map((item, index) => ({
  ...item,
  index: index + 1,
  collectScore: item.collectScore || 0,
  affectiveScore: item.affectiveScore || 0,
  testScore: item.testScore || 0,
  totalScore:
    (item.collectScore || 0) +
    (item.affectiveScore || 0) +
    (item.testScore || 0),
}));
interface EditableGradePageProps {
  subjectId?: string;
  classroom?: string;
}

interface EditableGradePageProps {
  subjectId?: string;
  classroom?: string;
}

export default function EditableGradePage(props: EditableGradePageProps) {
  const [onEdit, setOnEdit] = useState(false);
  const [tableData, setTableData] =
    useState<GetGradBySubjectId[]>(transformData);
  const [originalData, setOriginalData] = useState<GetGradBySubjectId[]>([]);
  const [filterTerm, setFilterTerm] = useState("");
  const [showExport, setShowExport] = useState(false);

  const handleConfirm = async () => {
    const result = await Swal.fire({
      title: "ยืนยันการบันทึกข้อมูล?",
      text: "คุณต้องการบันทึกคะแนนทั้งหมดใช่หรือไม่",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "ยืนยัน",
      cancelButtonText: "ยกเลิก",
    });

    if (result.isConfirmed) {
      Swal.fire({
        title: "บันทึกสำเร็จ",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
      setOriginalData(JSON.parse(JSON.stringify(tableData)));
      setOnEdit(false);
    } else {
      setTableData(originalData);
      setOnEdit(false);
    }
  };

  const handleInputChange = (
    index: number,
    field: keyof Pick<
      GetGradBySubjectId,
      "collectScore" | "affectiveScore" | "testScore"
    >,
    value: string
  ) => {
    const updated = [...tableData];
    const numericValue = parseFloat(value) || 0;
    updated[index][field] = numericValue;

    const { collectScore, affectiveScore, testScore } = updated[index];
    updated[index].totalScore =
      (field === "collectScore" ? numericValue : collectScore) +
      (field === "affectiveScore" ? numericValue : affectiveScore) +
      (field === "testScore" ? numericValue : testScore);

    setTableData(updated);
  };

  const filteredData = tableData.filter((item) => {
    const fullName = `${item.firstName} ${item.lastName}`.toLowerCase();
    const code = item.studentCode.toLowerCase();
    const remark = item.remark?.toLowerCase() || "";
    const search = filterTerm.toLowerCase();

    return (
      fullName.includes(search) ||
      code.includes(search) ||
      remark.includes(search)
    );
  });

  const onChangeGrade = (grade: string, studentId: number) => {
    const updated = tableData.map((item) =>
      item.studentId === studentId ? { ...item, grade } : item
    );
    setTableData(updated);
  };

  const onChangeRemark = (remark: string, studentId: number) => {
    const updated = tableData.map((item) =>
      item.studentId === studentId ? { ...item, remark } : item
    );
    setTableData(updated);
  };

  const handleEdit = () => {
    setOriginalData(JSON.parse(JSON.stringify(tableData))); 
    setOnEdit(true);
  };

  const handleNotEdit = () => {
    setTableData(originalData); 
    setOnEdit(false);
  };

  const columnDefs = createColumns({
    onEdit,
    handleInputChange,
    onChangeGrade,
    onChangeRemark,
  });

  return (
    <>
      <div className="flex px-10 w-full justify-between items-center">
        <HeaderLabel
          Icon={<ScrollText className="w-8 h-8" />}
          title={`ตารางวิชาในห้องเรียน ปวส.${props.classroom}/2 (รหัสวิชา: ${props.subjectId})`}
          className="text-blue"
        />
      </div>

      <div className="flex items-center justify-between px-10 mt-4">
        <div className="flex justify-start items-center gap-2 relative ">
          <div className="relative inline-block">
            <button
              onClick={() => setShowExport((prev) => !prev)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Export
            </button>

            {/* Drawer ที่โผล่ด้านขวาของปุ่ม */}
            <AnimatePresence>
              {showExport && (
                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.3 }}
                  className="absolute left-full top-0 ml-2 z-50 flex flex-col gap-2 border p-4 rounded-md bg-white shadow-md"
                >
                  <ExportFile
                    grads={tableData}
                    subject={{
                      id: 1,
                      subjectCode: props.subjectId || "",
                      subjectName: "ชื่อวิชา",
                      credits: 0,
                      description: "",
                      isActive: true,
                    }}
                    roomName={`ปวส.${props.classroom}/2`}
                    term={"1"}
                    year={"2568"}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <div className="  flex justify-end w-1/3">
          <Input
            type="text"
            placeholder="ค้นหาชื่อนักเรียน / รหัส / หมายเหตุ"
            className="border border-gray-300 rounded-md w-full"
            value={filterTerm}
            onChange={(e) => setFilterTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="flex justify-end gap-4 px-10 mt-4">
        {onEdit ? (
          <>
            <button
              className="bg-green-600 text-white text-lg px-4 py-2 rounded-md flex items-center gap-2 hover:opacity-80"
              onClick={handleConfirm}
            >
              ยืนยัน
            </button>
            <button
              className="bg-red-500 text-white text-lg px-4 py-2 rounded-md flex items-center gap-2 hover:opacity-80"
              onClick={handleNotEdit}
            >
              ยกเลิก <CircleX className="w-5 h-5" />
            </button>
          </>
        ) : (
          <button
            className="bg-blue-500 text-white text-lg px-4 py-2 rounded-md flex items-center gap-2 hover:opacity-80"
            onClick={handleEdit}
          >
            แก้ไข <Pencil className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="min-h-screen">
        <DataTable
          data={filteredData}
          columns={columnDefs}
          pagination={filteredData.length}
        />
      </div>
    </>
  );
}
