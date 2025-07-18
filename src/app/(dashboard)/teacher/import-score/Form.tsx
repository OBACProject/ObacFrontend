"use client";
import ScoreInputForm from "@/components/Teacher/TableImportScore";
import StudentInformationCard from "@/components/Teacher/StudentInformationCard";
import React, { useState } from "react";
import { PlusCircle } from "lucide-react";
import CreateScoreTablePopup from "@/components/Teacher/CreateScoreTablePopup";
import SearchInput from "@/components/Teacher/SearchInput";
import LineCenter from "@/components/Teacher/LineCenter";
import {
  GetStudentDetailAndSummaryScoreByStudentCodeResponse,
  SubjectGrade,
} from "@/dto/gradingDto";
import {
  GetStudentDetailAndSummaryScoreByStudentCode,
  upsertStudentGrades,
} from "@/api/grad/route";

export default function Form() {
  const [edit, setEdit] = useState<boolean>(false);
  const [creatTableButton, setCreateTableButton] = useState<boolean>(false);
  const [student, setStudent] =
    useState<GetStudentDetailAndSummaryScoreByStudentCodeResponse | null>();

  const [editedStudentInfo, setEditedStudentInfo] = useState<{
    studentCode: string;
    studentFirstName: string;
    studentLastName: string;
    className: string;
    faculty: string;
  }>();

  const onSaveStudentScore = async () => {
    if (!student || !editedStudentInfo) return;

    const payload = {
      student: {
        ...student.student,
        studentCode: editedStudentInfo.studentCode,
        name: editedStudentInfo.studentFirstName,
        lastName: editedStudentInfo.studentLastName,
        class: editedStudentInfo.className,
        facultyName: editedStudentInfo.faculty,
      },
      termYearGradeGroups: student.termYearGradeGroups,
    };
    console.log("payload FE : ",payload);
    const success = await upsertStudentGrades(payload);
    if (success) {
      alert("บันทึกข้อมูลสำเร็จ");
      // setTimeout(
      //   () => {
      //     window.location.reload()
      //   },
      //   2000
      // );
      setEdit(false);
    } else {

      alert("เกิดข้อผิดพลาด");
    }
  };

  const onSearch = async (keyword: string) => {
    setStudent(undefined);
    const trimmed = keyword.trim();

    if (trimmed === "") {
      setStudent(undefined);
      return;
    }
    try {
      const result = await GetStudentDetailAndSummaryScoreByStudentCode(
        keyword
      );
      if (result) {
        setStudent(result);
      } else {
        setStudent(null);
      }
    } catch (error) {
      console.error("ไม่พบข้อมูลนักเรียนหรือเกิดข้อผิดพลาด", error);
      setStudent(undefined);
    }
  };

  return (
    <div>
      <div className="py-6"></div>
      <div className="flex justify-center items-center mt-5 gap-5 py-5">
        <i className="text-gray-600">กรอกรหัสนักเรียนเพื่อทำการค้นหา</i>
        <SearchInput onSearchKeyword={onSearch} edit={edit} />
      </div>
      <LineCenter color="text-back" />
      {student != null ? (
        <div key={student.student.studentCode}>
          <div className="py-4 flex justify-between ">
            <StudentInformationCard
              key={student?.student.id}
              StudentCode={student?.student.studentCode}
              StudentFirstName={student?.student.name || "-"}
              StudentLastName={student?.student.lastName || "-"}
              Class={student?.student.class + student?.student.groupName || "-"}
              Faculty={student?.student.facultyName || "-"}
              edit={edit}
              onChangeStudentData={(updated) => setEditedStudentInfo(updated)}
            />
            <div className="flex items-start gap-5">
              <button
                className={`px-10 py-1.5 text-white rounded-sm ${
                  edit ? "bg-red-500" : "bg-blue-500"
                }`}
                onClick={() => setEdit(!edit)}
              >
                {edit ? <p>ยกเลิก</p> : <p>แก้ไข</p>}
              </button>
              <button
                className="px-10 py-1.5 bg-green-400 text-white rounded-sm"
                onClick={() => {
                  onSaveStudentScore();
                }}
              >
                บันทึก
              </button>
            </div>
          </div>
          <div className="w-full flex gap-10 items-center pt-4">
            <button
              className="enabled:bg-blue-500 bg-blue-400 px-10 py-1.5 rounded-md flex items-center gap-2 text-center text-white disabled:cursor-not-allowed enabled:hover:bg-blue-700"
              disabled={!edit}
              onClick={() => setCreateTableButton(true)}
            >
              <PlusCircle className="w-6 h-6" />
              สร้างตารางคะแนน
            </button>
            <p className="pl-20 text-red-500">
              *** โปรดตรวจสอบข้อมูลให้ถูกต้องทุกครั้งเมื่อทำการเพิ่มหรือแก้ไข
              ***
            </p>
          </div>
          <div>
            {/* Table Score ตารางคะแนนทุกเทอมของเด็ก */}
            {student.termYearGradeGroups.map((group, index) => (
              <div className="my-6">
                <ScoreInputForm
                  key={index}
                  scores={student.termYearGradeGroups[index].grades}
                  edit={edit}
                  onChange={(updatedGrades: SubjectGrade[]) => {
                    setStudent((prev) => {
                      if (!prev) return prev;

                      const updatedGroups = [...prev.termYearGradeGroups];
                      updatedGroups[index] = {
                        ...updatedGroups[index],
                        grades: updatedGrades,
                      };
                      return {
                        ...prev,
                        termYearGradeGroups: updatedGroups,
                      };
                    });
                  }}
                  term={
                    student.termYearGradeGroups[index].grades[0]?.term || "1"
                  }
                  year={
                    student.termYearGradeGroups[index].grades[0]?.year || 2567
                  }
                  onRemoveGroup={() => {
                    setStudent((prev) => {
                      if (!prev) return prev;

                      const updatedGroups = prev.termYearGradeGroups.filter(
                        (_, i) => i !== index
                      );

                      return {
                        ...prev,
                        termYearGradeGroups: updatedGroups,
                      };
                    });
                  }}
                />
              </div>
            ))}
          </div>

          {creatTableButton && (
            <CreateScoreTablePopup
              onClickPopUp={setCreateTableButton}
              onConfirm={(year, term) => {
                const newScoreGroup: SubjectGrade[] = [
                  {
                    gradeId: 1,
                    term,
                    year,
                    subjectName: "",
                    subjectCode: "",
                    gradePoint: 0,
                    credit: 0,
                    finalGrade: 0,
                    remark: "",
                  },
                ];

                setStudent((prev) => {
                  if (!prev) return prev;

                  return {
                    ...prev,
                    termYearGradeGroups: [
                      ...prev.termYearGradeGroups,
                      {
                        term,
                        year,
                        totalGPA: 0,
                        totalCredit: 0,
                        grades: newScoreGroup,
                      },
                    ],
                  };
                });

                setCreateTableButton(false);
              }}
            />
          )}
        </div>
      ) : (
        <div className="py-10 grid place-items-center">
          <div className="text-center border-[2px] rounded-md py-10 w-fit px-20">
            <div className="text-lg mb-3">
              ใส่ผลลัพธ์เพื่อค้นหารายชื่อนักเรียนที่ต้องการแก้ไขคะแนน
            </div>
            <div className="text-red-500">
              โปรดตรวจสอบทุกครั้งให้แน่ใจก่อนและหลังแก้ไขข้อมูล
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
