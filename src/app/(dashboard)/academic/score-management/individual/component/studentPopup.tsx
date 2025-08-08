import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Combobox } from "@/components/common/Combobox/combobox";
import Swal from "sweetalert2";
import { useGetStudentDetailAndSummaryScoreByStudentCodeQuery, useUpdateStudentGradeByGradeIdMutation } from "@/lib/api/hooks/queries/grade.queries";
import { UpdateStudentGradeScoreRequest } from "@/lib/api/models/grade/grade.request";
import { SubjectGradeScheduleSubject } from "@/lib/api/models/grade/grade.response";

export interface SubjectData {
  subject_name: string;
  subject_code: string;
  credit: string;
  finalGrade: string;
  collectScore: number;
  affectiveScore: number;
  testScore: number;
  gradeId: number;
  remark: string;
  assignmentScore?: number;
  midtermScore?: number;
  finaltermScore?: number;
  totalScore?: number;
  subjectId?: number;
  subjectName?: string;
  subjectCode?: string;
  term?: string;
  year?: number;
  gradePoint?: number;
}

interface StudentPopupProps {
  isOpen: boolean;
  onClose: (value: boolean) => void;
  student: { studentCode: string; name: string } | null;
  subjects: SubjectData | null;
}

const remarkOptions = ["ผ.", "ม.ผ.", "ข.ส.", "ข.ร.", "ม.ส."];

export function StudentPopup({
  isOpen,
  onClose,
  student,
  subjects,
}: StudentPopupProps) {
  const [score, setScore] = useState({
    assignmentScore: 0,
    collectScore: 0,
    affectiveScore: 0,
    midtermScore: 0,
    finaltermScore: 0,
  });

  const [remark, setRemark] = useState("");
  const [selectedSubject, setSelectedSubject] = useState<SubjectGradeScheduleSubject | null>(null);
  const [selectedTerm, setSelectedTerm] = useState<string>("");
  
  const { data: studentDetailData, isLoading: isLoadingDetail, error: detailError } = useGetStudentDetailAndSummaryScoreByStudentCodeQuery(
    student?.studentCode || "",
    {
      enabled: isOpen && !!student?.studentCode,
    }
  );

  const updateGradeMutation = useUpdateStudentGradeByGradeIdMutation({
    onSuccess: () => {
      Swal.fire({
        title: "อัพเดตสำเร็จ!",
        text: "ข้อมูลของนักเรียนได้รับการอัพเดตแล้ว",
        icon: "success",
        confirmButtonColor: "#3085d6",
      });
      onClose(false);
      window.location.reload();
    },
    onError: (error) => {
      console.error(error);
      Swal.fire({
        title: "เกิดข้อผิดพลาด",
        text: "ไม่สามารถอัพเดตข้อมูลได้ กรุณาลองใหม่อีกครั้ง",
        icon: "error",
        confirmButtonColor: "#d33",
      });
    }
  });

  useEffect(() => {
    if (subjects) {
      
      const hasDetailedScores = subjects.hasOwnProperty('assignmentScore') || 
                               subjects.hasOwnProperty('midtermScore') || 
                               subjects.hasOwnProperty('finaltermScore');
      
      if (hasDetailedScores) {
        setScore({
          assignmentScore: (subjects as any).assignmentScore || 0,
          collectScore: (subjects as any).collectScore || subjects.collectScore || 0,
          affectiveScore: (subjects as any).affectiveScore || subjects.affectiveScore || 0,
          midtermScore: (subjects as any).midtermScore || 0,
          finaltermScore: (subjects as any).finaltermScore || subjects.testScore || 0,
        });
      } else {
        setScore({
          assignmentScore: 0, 
          collectScore: subjects.collectScore || 0,
          affectiveScore: subjects.affectiveScore || 0,
          midtermScore: 0, 
          finaltermScore: subjects.testScore || 0, 
        });
      }
      
      setRemark(subjects.remark || "");
      
      if (studentDetailData && subjects.subject_name) {
        const matchingSubject = studentDetailData.termYearGradeGroups
          .flatMap(group => group.grades)
          .find(grade => grade.subjectName === subjects.subject_name);
        
        if (matchingSubject) {
          setSelectedSubject(matchingSubject);
          setSelectedTerm(`${matchingSubject.term}/${matchingSubject.year}`);
          
          setScore({
            assignmentScore: matchingSubject.assignmentScore || 0,
            collectScore: matchingSubject.collectScore || 0,
            affectiveScore: matchingSubject.affectiveScore || 0,
            midtermScore: matchingSubject.midtermScore || 0,
            finaltermScore: matchingSubject.finaltermScore || 0,
          });
        }
      }
    }
  }, [subjects, studentDetailData]);

  useEffect(() => {
    if (selectedSubject) {
      console.log('Selected Subject Data:', selectedSubject);
      setScore({
        assignmentScore: selectedSubject.assignmentScore || 0,
        collectScore: selectedSubject.collectScore || 0,
        affectiveScore: selectedSubject.affectiveScore || 0,
        midtermScore: selectedSubject.midtermScore || 0,
        finaltermScore: selectedSubject.finaltermScore || 0,
      });
    }
  }, [selectedSubject]);

  useEffect(() => {
    console.log('Current Score State:', score);
  }, [score]);

  const handleInputChange = (field: string, value: string) => {
    const numericValue = parseFloat(value) || 0;
    
    const maxScores = {
      assignmentScore: 20,
      collectScore: 10,
      affectiveScore: 20,
      midtermScore: 20,
      finaltermScore: 30,
    };
    
    const maxAllowed = maxScores[field as keyof typeof maxScores] || 100;
    
    const clampedValue = Math.min(Math.max(numericValue, 0), maxAllowed);
    
    setScore((prevScore) => ({
      ...prevScore,
      [field]: clampedValue,
    }));
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

  const handleConfirm = async () => {
    try {
      const result = await Swal.fire({
        title: "ยืนยันข้อมูล?",
        text: "คุณจะไม่สามารถแก้ไขข้อมูลได้หลังจากยืนยัน",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ตกลง",
        cancelButtonText: "ยกเลิก",
      });

      if (result.isConfirmed && subjects?.gradeId !== undefined) {
        const totalScore = score.assignmentScore + score.collectScore + score.affectiveScore + score.midtermScore + score.finaltermScore;
        
        const payload: UpdateStudentGradeScoreRequest = {
          gradeId: subjects.gradeId,
          finalGrade: Number(gradingScorce(totalScore)),
          remark: remark || "",
          subjectId: subjects.subjectId || 0,
          subjectName: subjects.subjectName || subjects.subject_name,
          subjectCode: subjects.subjectCode || subjects.subject_code,
          credit: Number(subjects.credit) || 0,
          gradePoint: Number(gradingScorce(totalScore)) * Number(subjects.credit) || 0,
          term: subjects.term || "1",
          year: subjects.year || new Date().getFullYear(),
          collectScore: score.collectScore,
          assignmentScore: score.assignmentScore,
          affectiveScore: score.affectiveScore,
          midtermScore: score.midtermScore,
          finaltermScore: score.finaltermScore,
          totalScore: totalScore,
        };

        updateGradeMutation.mutate(payload);
      }
    } catch (error) {
      console.error(error);
      await Swal.fire({
        title: "เกิดข้อผิดพลาด",
        text: "ไม่สามารถอัพเดตข้อมูลได้ กรุณาลองใหม่อีกครั้ง",
        icon: "error",
        confirmButtonColor: "#d33",
      });
    }
  };
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-25 z-50"
          onClick={() => onClose(false)}
        >
          <div
            className="bg-white rounded-lg shadow-lg p-6 w-2/3 max-w-4xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <h1 className="text-xl font-bold mb-4 flex justify-between">
                {student?.name}
                {(() => {
                  const totalScore = score.assignmentScore + score.collectScore + score.affectiveScore + score.midtermScore + score.finaltermScore;
                  const hasFailingRemark = subjects?.remark && subjects.remark !== "ผ." && subjects.remark !== "";
                  
                  if (hasFailingRemark || totalScore < 50) {
                    return <span className="text-red-500">ไม่ผ่าน</span>;
                  } else {
                    return <span className="text-green-500">ผ่าน</span>;
                  }
                })()}
              </h1>
              
              {/* Loading indicator */}
              {isLoadingDetail && (
                <div className="flex items-center justify-center py-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                  <span className="ml-2 text-gray-600">กำลังโหลดข้อมูลรายละเอียด...</span>
                </div>
              )}

              {/* Error indicator */}
              {detailError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                  <div className="flex items-center">
                    <div className="text-red-600 mr-2">⚠️</div>
                    <span className="text-red-700 text-sm">
                      ไม่สามารถโหลดข้อมูลรายละเอียดได้ แต่ยังสามารถแก้ไขคะแนนได้ตามปกติ
                    </span>
                  </div>
                </div>
              )}
              <div className="space-y-4">
                <div className="flex justify-between">
                  <h1>{subjects?.subject_name || "ไม่มีข้อมูลวิชา"}</h1>
                  <h1>{subjects?.subject_code || "ไม่มีข้อมูล"}</h1>
                </div>
                <div className="flex justify-between">
                  <h1>หน่วยกิต: {subjects?.credit || "0"}</h1>
                  {subjects?.remark !== null ? (
                    <h1>เกรดเดิม: {subjects?.remark}</h1>
                  ) : (
                    <h1>เกรดเดิม: {subjects?.finalGrade || "ไม่มีข้อมูล"}</h1>
                  )}
                </div>

                {/* Enhanced Score Information */}
                {selectedSubject && studentDetailData && (
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h3 className="font-semibold text-blue-800 mb-3">ข้อมูลคะแนนรายละเอียด</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="flex justify-between py-1">
                          <span className="text-gray-600">ภาคเรียน/ปี:</span>
                          <span className="font-medium">{selectedTerm}</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="text-gray-600">คะแนนงาน:</span>
                          <span className="font-medium">{selectedSubject.assignmentScore || 0}</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="text-gray-600">คะแนนเก็บ:</span>
                          <span className="font-medium">{selectedSubject.collectScore || 0}</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="text-gray-600">คะแนนจิตพิสัย:</span>
                          <span className="font-medium">{selectedSubject.affectiveScore || 0}</span>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between py-1">
                          <span className="text-gray-600">คะแนนกลางภาค:</span>
                          <span className="font-medium">{selectedSubject.midtermScore || 0}</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="text-gray-600">คะแนนปลายภาค:</span>
                          <span className="font-medium">{selectedSubject.finaltermScore || 0}</span>
                        </div>
                        <div className="flex justify-between py-1 border-t pt-2">
                          <span className="text-gray-700 font-medium">คะแนนรวม:</span>
                          <span className="font-bold text-blue-600">{selectedSubject.totalScore || 0}</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="text-gray-700 font-medium">เกรดสุดท้าย:</span>
                          <span className="font-bold text-green-600">
                            {selectedSubject.finalGrade || selectedSubject.remark || 'N/A'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div className="p-2">
                  <h1>คะแนนงาน (20 คะแนน)</h1>
                  <Input
                    type="number"
                    placeholder="คะแนนงาน"
                    value={score.assignmentScore}
                    min="0"
                    max="20"
                    onChange={(e) =>
                      handleInputChange("assignmentScore", e.target.value)
                    }
                  />
                </div>

                <div className="p-2">
                  <h1>คะแนนเก็บ/ทดสอบ (10 คะแนน)</h1>
                  <Input
                    type="number"
                    placeholder="คะแนนเก็บ"
                    value={score.collectScore}
                    min="0"
                    max="10"
                    onChange={(e) =>
                      handleInputChange("collectScore", e.target.value)
                    }
                  />
                </div>

                <div className="p-2">
                  <h1>คะแนนประพฤติ (20 คะแนน)</h1>
                  <Input
                    type="number"
                    placeholder="คะแนนประพฤติ"
                    value={score.affectiveScore}
                    min="0"
                    max="20"
                    onChange={(e) =>
                      handleInputChange("affectiveScore", e.target.value)
                    }
                  />
                </div>

                <div className="p-2">
                  <h1>คะแนนกลางภาค (20 คะแนน)</h1>
                  <Input
                    type="number"
                    placeholder="คะแนนกลางภาค"
                    value={score.midtermScore}
                    min="0"
                    max="20"
                    onChange={(e) =>
                      handleInputChange("midtermScore", e.target.value)
                    }
                  />
                </div>

                <div className="p-2">
                  <h1>คะแนนปลายภาค (30 คะแนน)</h1>
                  <Input
                    type="number"
                    placeholder="คะแนนปลายภาค"
                    value={score.finaltermScore}
                    min="0"
                    max="30"
                    onChange={(e) =>
                      handleInputChange("finaltermScore", e.target.value)
                    }
                  />
                </div>

                <div className="p-2 bg-gray-100 rounded-lg">
                  <h1 className="font-semibold">คะแนนรวม: {score.assignmentScore + score.collectScore + score.affectiveScore + score.midtermScore + score.finaltermScore}/100</h1>
                  <h1 className="font-semibold text-blue-600">เกรดที่จะได้: {gradingScorce(score.assignmentScore + score.collectScore + score.affectiveScore + score.midtermScore + score.finaltermScore)}</h1>
                </div>

                
              </div>
              
              

              <div className="p-2">
                <h1>หมายเหตุ</h1>
                <Combobox
                  buttonLabel="หมายเหตุ"
                  options={remarkOptions.map((item) => ({
                    label: item,
                    value: item,
                  }))}
                  onSelect={setRemark}
                  defaultValue={subjects?.remark}
                />
              </div>

              <div className="flex justify-between mt-4">
                <Button
                  onClick={() => onClose(false)}
                  variant="outline"
                  className="w-1/4"
                >
                  กลับ
                </Button>
                <Button
                  onClick={handleConfirm}
                  disabled={updateGradeMutation.isPending}
                  className="w-1/4 bg-blue-500 hover:bg-blue-600 disabled:opacity-50"
                >
                  {updateGradeMutation.isPending ? "กำลังบันทึก..." : "ยืนยัน"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
