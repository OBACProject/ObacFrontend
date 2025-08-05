"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { GetGradBySubjectId } from "@/dto/gradDto";
import { createColumns } from "./columns";
import HeaderLabel from "@/components/common/labelText/HeaderLabel";
import { CircleX, Pencil, ScrollText, CheckCircle } from "lucide-react";
import ConfirmDialog from "@/components/common/ConfirmDialog/ConfirmDialog";
import { AnimatePresence, motion } from "framer-motion";
import ExportFile from "./ExportFile";
import { Input } from "@/components/ui/input";
import { useGetStudentGroupGradeByScheduleSubjectIdQuery, useBulkUpdateStudentGradeByScheduleSubjectId } from "@/lib/api/hooks/queries/grade.queries";
import { useUpdateScheduleSubject } from "@/lib/api/hooks/queries/scheduleSubject.queries";
import { StylesTable } from "@/components/Academic/table/StylesTable";
import { BulkUpdateStudentGradeByScheduleSubjectIdRequest, UpsertStudentGradesRequest } from "@/lib/api/models/grade/grade.request";

interface EditableGradePageProps {
  schuduleSubjectId: string;
} 

export default function EditableGradePage(props: EditableGradePageProps) {
  const router = useRouter();
  const [onEdit, setOnEdit] = useState(false);
  const [filterTerm, setFilterTerm] = useState("");
  const [showExport, setShowExport] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    type: "question" as "question" | "success" | "error",
    title: "",
    text: "",
    onConfirm: () => {},
    showCancel: true,
    autoClose: 0,
  });

  const { data: apiData, isLoading, error, refetch } = useGetStudentGroupGradeByScheduleSubjectIdQuery(
    Number(props.schuduleSubjectId)
  );

  const bulkUpdateMutation = useBulkUpdateStudentGradeByScheduleSubjectId({
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      console.error("Error updating grades:", error);
      setConfirmDialog({
        isOpen: true,
        type: "error",
        title: "เกิดข้อผิดพลาด",
        text: "ไม่สามารถบันทึกข้อมูลได้",
        onConfirm: () => {},
        showCancel: false,
        autoClose: 0,
      });
    }
  });

  const updateScheduleSubjectMutation = useUpdateScheduleSubject({
    onSuccess: () => {
      refetch();
      setConfirmDialog({
        isOpen: true,
        type: "success",
        title: "ตรวจสอบเสร็จสิ้น",
        text: "อัพเดทสถานะสำเร็จ กำลังกลับไปยังหน้ารายการวิชา",
        onConfirm: () => {
          const classroomId = subjectData?.subjectId ;
          const term = subjectData?.term ;
          const year = subjectData?.year;
          router.push(`/academic/grading/student-classroom/${classroomId}/${term}/${year}`);
        },
        showCancel: false,
        autoClose: 2000,
      });
    },
    onError: (error) => {
      console.error("Error updating schedule subject:", error);
      setConfirmDialog({
        isOpen: true,
        type: "error",
        title: "เกิดข้อผิดพลาด",
        text: "ไม่สามารถอัพเดทสถานะได้",
        onConfirm: () => {},
        showCancel: false,
        autoClose: 0,
      });
    }
  });

  const subjectData = useMemo(() => {
    if (apiData) {
      return apiData;
    }
    return {
      subjectName: "ไม่มีข้อมูลวิชา",
      subjectCode: "N/A",
      subjectId: 0,
      groupName: "N/A",
      groupCode: "N/A",
      class: "N/A",
      level: 0,
      isPublish: false,
      iscomplete: false,
      term: "1",
      year: 2568,
      subjectGrades: []
    };
  }, [apiData]);

  const transformData = useMemo(() => {
    if (apiData && apiData.subjectGrades && apiData.subjectGrades.length > 0 && subjectData) {
      return apiData.subjectGrades.map((item, index) => ({
        gradeId: item.gradeId || index + 1,
        subjectId: subjectData.subjectId,
        scheduleSubjectId: Number(props.schuduleSubjectId),
        studentGroup: subjectData.groupName,
        studentId: item.studentId,
        studentCode: item.studentCode,
        prefix: item.prefix,
        gender: "",
        firstName: item.firstName,
        lastName: item.lastName,
        subjectName: subjectData.subjectName,
        assignmentscore: item.assignmentScore || 0,
        collectScore: item.collectScore || 0,
        affectiveScore: item.affectiveScore || 0,
        midtermScore: item.midtermScore || 0,
        finaltermScore: item.finaltermScore || 0,
        totalScore: item.totalScore || 0,
        grade: (item.finalGrade !== null ? item.finalGrade?.toString() : "0") || "0",
        remark: item.remarks || "",
        index: index + 1,
      }));
    }
    
    return [];
  }, [apiData, subjectData, props.schuduleSubjectId]);

  const [tableData, setTableData] = useState<GetGradBySubjectId[]>([]);
  const [originalData, setOriginalData] = useState<GetGradBySubjectId[]>([]);

  const calculateGrade = (totalScore: number): string => {
    if (totalScore >= 80) return "4";     
    if (totalScore >= 75) return "3.5";   
    if (totalScore >= 70) return "3";      
    if (totalScore >= 65) return "2.5";    
    if (totalScore >= 60) return "2";      
    if (totalScore >= 55) return "1.5";    
    if (totalScore >= 50) return "1";      
    return "0";                            
  };

  const updateTotalScoreAndGrade = (updatedData: GetGradBySubjectId[]) => {
    return updatedData.map(item => {
      const newTotalScore = (item.assignmentscore || 0) + 
                           (item.collectScore || 0) + 
                           (item.affectiveScore || 0) + 
                           (item.midtermScore || 0) + 
                           (item.finaltermScore || 0);
      
      return {
        ...item,
        totalScore: newTotalScore,
        grade: calculateGrade(newTotalScore)
      };
    });
  };

  useMemo(() => {
    const updatedData = updateTotalScoreAndGrade(transformData || []);
    setTableData(updatedData);
  }, [transformData]);

  if (!apiData || isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">กำลังโหลดข้อมูล...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-red-600">เกิดข้อผิดพลาดในการโหลดข้อมูล: {error.toString()}</div>
      </div>
    );
  }

  const handleConfirm = async () => {
    setConfirmDialog({
      isOpen: true,
      type: "question",
      title: "ยืนยันการบันทึกข้อมูล?",
      text: "คุณต้องการบันทึกคะแนนทั้งหมดใช่หรือไม่",
      onConfirm: async () => {
        try {
          const updateParams: BulkUpdateStudentGradeByScheduleSubjectIdRequest[] = tableData.map((item) => ({
            studentId: item.studentId,
            assignmentScore: item.assignmentscore,
            collectScore: item.collectScore,
            affectiveScore: item.affectiveScore,
            midtermScore: item.midtermScore,
            finaltermScore: item.finaltermScore,
            totalScore: item.totalScore,
            finalGrade: parseFloat(item.grade) || 0,
            remarks: item.remark || "",
          }));

          await bulkUpdateMutation.mutateAsync({
            scheduleSubjectId: Number(props.schuduleSubjectId),
            params: updateParams
          });

          setConfirmDialog({
            isOpen: true,
            type: "success",
            title: "บันทึกสำเร็จ",
            text: "",
            onConfirm: () => {},
            showCancel: false,
            autoClose: 1500,
          });

          setOriginalData(JSON.parse(JSON.stringify(tableData)));
          setOnEdit(false);
        } catch (error) {
          console.error("Save error:", error);
        }
      },
      showCancel: true,
      autoClose: 0,
    });
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
    const newTotalScore = 
      (field === "assignmentscore" ? numericValue : assignmentscore) +
      (field === "collectScore" ? numericValue : collectScore) +
      (field === "affectiveScore" ? numericValue : affectiveScore) +
      (field === "midtermScore" ? numericValue : midtermScore) +
      (field === "finaltermScore" ? numericValue : finaltermScore);

    updated[index].totalScore = newTotalScore;
    updated[index].grade = calculateGrade(newTotalScore);

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
    const updated = tableData.map((item) => {
      if (item.studentId === studentId && item.remark && item.remark.trim() !== "") {
        return { ...item, grade };
      }
      return item;
    });
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
    setConfirmDialog({
      isOpen: true,
      type: "question",
      title: "ยกเลิกการแก้ไข?",
      text: "การเปลี่ยนแปลงทั้งหมดจะไม่ถูกบันทึก",
      onConfirm: () => {
        setTableData(originalData);
        setOnEdit(false);
      },
      showCancel: true,
      autoClose: 0,
    });
  };

  const handleComplete = () => {
    setConfirmDialog({
      isOpen: true,
      type: "question",
      title: "ยืนยันการตรวจสอบเสร็จสิ้น?",
      text: "คุณต้องการทำเครื่องหมายการตรวจสอบเสร็จสิ้นใช่หรือไม่",
      onConfirm: async () => {
        try {
          await updateScheduleSubjectMutation.mutateAsync({
            params: {
              scheduleSubjectId: Number(props.schuduleSubjectId),
              isComplete: true
            }
          });
        } catch (error) {
          console.error("Complete error:", error);
        }
      },
      showCancel: true,
      autoClose: 0,
    });
  };

  const columnDefs = createColumns({
    onEdit,
    handleInputChange,
    onChangeGrade,
    onChangeRemark,
  });

  return (
    <div className="pb-20 mb-10">
      <div className=" flex px-10 w-full justify-between items-center mb-4">
        <HeaderLabel
          Icon={<ScrollText className="h-7 w-7 text-white" />}
          title={`ตารางวิชาในห้องเรียน ${subjectData?.class || `ปวส.${subjectData?.groupName}/2`} (รหัสวิชา: ${subjectData?.subjectCode}) - ${subjectData?.subjectName}`}
          className="text-blue"
        />

      </div>

      <div className="bg-white h-fit py-4 my-2 rounded-lg border border-gray-200 mx-4">
        <div className="bg-white flex items-center justify-between px-6 mb-4">
          <div className="flex justify-start items-center gap-2 relative ">
            <div className="relative inline-block">
              <button
                onClick={() => setShowExport((prev) => !prev)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Export
              </button>

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
                        id: subjectData?.subjectId || 0,
                        subjectCode: subjectData?.subjectCode || "",
                        subjectName: subjectData?.subjectName || "ชื่อวิชา",
                        credits: 0,
                        description: "",
                        isActive: true,
                      }}
                      roomName={subjectData?.class || `ปวส.${subjectData?.groupName}/2`}
                      term={subjectData?.term || "1"}
                      year={subjectData?.year?.toString() || "2568"}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          <div className="flex justify-end w-1/3">
            <Input
              type="text"
              placeholder="ค้นหาชื่อนักเรียน / รหัส / หมายเหตุ"
              className="border border-gray-300 rounded-md w-full"
              value={filterTerm}
              onChange={(e) => setFilterTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-end gap-4 px-6 mb-4">
          {onEdit ? (
            <>
              <button
                className="bg-green-600 text-white text-lg px-4 py-2 rounded-md flex items-center gap-2 hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleConfirm}
                disabled={bulkUpdateMutation.isPending}
              >
                {bulkUpdateMutation.isPending ? "กำลังบันทึก..." : "ยืนยัน"}
              </button>
              <button
                className="bg-red-500 text-white text-lg px-4 py-2 rounded-md flex items-center gap-2 hover:bg-red-600 transition-colors"
                onClick={handleNotEdit}
              >
                ยกเลิก <CircleX className="w-5 h-5" />
              </button>
            </>
          ) : (
            <>
            <button
              className="bg-green-500 text-white text-lg px-4 py-2 rounded-md flex items-center gap-2 hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleComplete}
              disabled={updateScheduleSubjectMutation.isPending}
            >
              {updateScheduleSubjectMutation.isPending ? "กำลังประมวลผล..." : "ตรวจสอบเสร็จสิ้น"} <CheckCircle className="w-5 h-5" />
            </button>
              <button
                className="bg-blue-500 text-white text-lg px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-600 transition-colors"
                onClick={handleEdit}
              >
                แก้ไข <Pencil className="w-5 h-5" />
              </button>
          </>
          )}
        </div>

        <div className="px-4 pb-8">
          <StylesTable
            icon={<ScrollText className="w-5 h-5 text-white" />}
            title={`รายชื่อนักเรียนในห้อง ${subjectData?.class || `ปวส.${subjectData?.groupName}/2`}`}
            data={filteredData}
            columns={columnDefs}
            pagination={filteredData.length}
          />
        </div>
      </div>

      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={() => setConfirmDialog(prev => ({ ...prev, isOpen: false }))}
        onConfirm={confirmDialog.onConfirm}
        title={confirmDialog.title}
        text={confirmDialog.text}
        type={confirmDialog.type}
        showCancel={confirmDialog.showCancel}
        autoClose={confirmDialog.autoClose}
      />
    </div>
  );
}