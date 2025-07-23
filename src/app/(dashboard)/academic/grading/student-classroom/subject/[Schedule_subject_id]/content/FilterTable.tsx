"use client";

import { useState, useMemo } from "react";
import { DataTable } from "@/components/common/MainTable/table_style_1";
import { GetGradBySubjectId } from "@/dto/gradDto";
import { createColumns } from "./columns";
import HeaderLabel from "@/components/common/labelText/HeaderLabel";
import { CircleX, Pencil, ScrollText } from "lucide-react";
import Swal from "sweetalert2";
import { AnimatePresence, motion } from "framer-motion";
import ExportFile from "./ExportFile";
import { Input } from "@/components/ui/input";
import { useGetStudentGroupGradeByScheduleSubjectIdQuery } from "@/lib/api/hooks/queries/grade.queries";

const mockGradData: GetGradBySubjectId[] = [
  {
    gradeId: 101,
    subjectId: 1,
    scheduleSubjectId: 1,
    studentGroup: "A104",
    studentId: 1,
    studentCode: "631001",
    prefix: "นาย",
    gender: "Male",
    firstName: "สมชาย",
    lastName: "ใจดี",
    subjectName: "คณิตศาสตร์",
    assignmentscore: 15,
    collectScore: 8,
    affectiveScore: 18,
    midtermScore: 15,
    finaltermScore: 25,
    totalScore: 81,
    grade: "3",
    remark: "",
  },
  {
    gradeId: 102,
    subjectId: 1,
    scheduleSubjectId: 1,
    studentGroup: "A104",
    studentId: 2,
    studentCode: "631002",
    prefix: "นางสาว",
    gender: "Female",
    firstName: "สุมิตรา",
    lastName: "สุขใจ",
    subjectName: "คณิตศาสตร์",
    assignmentscore: 12,
    collectScore: 6,
    affectiveScore: 15,
    midtermScore: 12,
    finaltermScore: 20,
    totalScore: 65,
    grade: "1.5",
    remark: "ผ.",
  },
  {
    gradeId: 103,
    subjectId: 1,
    scheduleSubjectId: 1,
    studentGroup: "A104",
    studentId: 3,
    studentCode: "631003",
    prefix: "นางสาว",
    gender: "Female",
    firstName: "จารุวรรณ",
    lastName: "เก่งกล้า",
    subjectName: "คณิตศาสตร์",
    assignmentscore: 18,
    collectScore: 9,
    affectiveScore: 19,
    midtermScore: 18,
    finaltermScore: 28,
    totalScore: 92,
    grade: "4",
    remark: "",
  },
];

// Mock subject data for when API data is not available
const mockSubjectData = {
  subjectName: "คณิตศาสตร์",
  subjectCode: "MATH101",
  subjectId: 1,
  groupName: "A104",
  groupCode: "A104",
  class: "ปวส.2",
  level: 2,
  isPublish: false,
  iscomplete: false,
  term: "1",
  year: 2568,
  subjectGrades: []
};

interface EditableGradePageProps {
  schuduleSubjectId: string;
} 

export default function EditableGradePage(props: EditableGradePageProps) {
  const [onEdit, setOnEdit] = useState(false);
  const [filterTerm, setFilterTerm] = useState("");
  const [showExport, setShowExport] = useState(false);

  const { data: apiData, isLoading, error } = useGetStudentGroupGradeByScheduleSubjectIdQuery(
    Number(props.schuduleSubjectId)
  );

  // Use API data if available, otherwise use mock data
  const subjectData = useMemo(() => {
    if (apiData) {
      return apiData;
    }
    return mockSubjectData;
  }, [apiData]);

  const transformData = useMemo(() => {
    return mockGradData.map((item, index) => ({
      ...item,
      index: index + 1,
      assignmentscore: item.assignmentscore || 0,
      collectScore: item.collectScore || 0,
      affectiveScore: item.affectiveScore || 0,
      midtermScore: item.midtermScore || 0,
      finaltermScore: item.finaltermScore || 0,
      totalScore:
        (item.assignmentscore || 0) +
        (item.collectScore || 0) +
        (item.affectiveScore || 0) +
        (item.midtermScore || 0) +
        (item.finaltermScore || 0),
    }));
  }, []);

  const [tableData, setTableData] = useState<GetGradBySubjectId[]>(transformData);
  const [originalData, setOriginalData] = useState<GetGradBySubjectId[]>([]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">กำลังโหลดข้อมูล...</div>
      </div>
    );
  }

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
      "assignmentscore" | "collectScore" | "affectiveScore" | "midtermScore" | "finaltermScore"
    >,
    value: string
  ) => {
    const updated = [...tableData];
    const numericValue = parseFloat(value) || 0;
    updated[index][field] = numericValue;

    const { assignmentscore, collectScore, affectiveScore, midtermScore, finaltermScore } = updated[index];
    updated[index].totalScore =
      (field === "assignmentscore" ? numericValue : assignmentscore) +
      (field === "collectScore" ? numericValue : collectScore) +
      (field === "affectiveScore" ? numericValue : affectiveScore) +
      (field === "midtermScore" ? numericValue : midtermScore) +
      (field === "finaltermScore" ? numericValue : finaltermScore);

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
    <div className="">
      <div className=" flex px-10 w-full justify-between items-center">
        <HeaderLabel
          Icon={<ScrollText className="h-7 w-7 text-white" />}
          title={`ตารางวิชาในห้องเรียน ปวส.${subjectData.groupName}/2 (รหัสวิชา: ${subjectData.subjectCode})`}
          className="text-blue"
        />
        {/* Show indicator when using mock data
        {!apiData && !isLoading && (
          <div className="text-sm text-orange-600 bg-orange-100 px-3 py-1 rounded-md">
            ใช้ข้อมูลตัวอย่าง
          </div>
        )} */}
      </div>

      <div className="bg-white h-fit py-2 my-2 rounded-lg border border-gray-200">
        <div className="bg-white flex items-center justify-between px-10 mt-4">
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
                        id: subjectData.subjectId,
                        subjectCode: subjectData.subjectCode || "",
                        subjectName: subjectData.subjectName || "ชื่อวิชา",
                        credits: 0,
                        description: "",
                        isActive: true,
                      }}
                      roomName={`ปวส.${subjectData.groupName}/2`}
                      term={subjectData.term || "1"}
                      year={subjectData.year?.toString() || "2568"}
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

        <div className="mb-4">
          <DataTable
            data={filteredData}
            columns={columnDefs}
            pagination={filteredData.length}
          />
        </div>
      </div>
    </div>
  );
}