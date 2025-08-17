"use client";
import { GetStudentGroupByGroupId } from "@/api/student/route";
import StudentNameListInGroupPDF from "../PDF/name-list/StudentNameListInGroup";
import StudentScoreInSubjectPDF from "../PDF/score/StudentScoreInSubject";
import { GetStudentGroupGradeByScheduleSubjectId } from "@/api/grad/route";
import { StudentItems } from "@/dto/studentDto";

const parseStudentCode = (code?: string): number | null => {
  const digits =
    String(code ?? "")
      .match(/\d+/g)
      ?.join("") ?? "";
  if (!digits) return null;
  const n = Number(digits);
  return Number.isFinite(n) ? n : null;
};

const byStudentCodeDesc = (a: StudentItems, b: StudentItems) => {
  const an = parseStudentCode(a.studentCode);
  const bn = parseStudentCode(b.studentCode);
  if (an !== null && bn !== null) return an - bn;
  return a.studentCode.localeCompare(b.studentCode, "th");
};

export const genPDFStudentNamelistInGroup = async (
  groupID: number,
  year: number
) => {
  try {
    const data = await GetStudentGroupByGroupId(groupID);
    if (!data) throw new Error("ไม่พบข้อมูลกลุ่มนักเรียน");

    const studentsSorted = [...(data.students ?? [])].sort(byStudentCodeDesc);
    StudentNameListInGroupPDF({
      student: studentsSorted,
      studentGroup: `${data?.class}.${data?.groupName}`,
      year: year,
    });
  } catch (err) {
    console.log("Error in lib genStudentNamelistInGroup.", err);
  }
};

export const genPDFStudentScoreInSubjectPDF = async (
  scheduleSubjectID: number
) => {
  try {
    const responseData = await GetStudentGroupGradeByScheduleSubjectId(
      scheduleSubjectID
    );

    if (responseData) {
      responseData.subjectGrades.sort((a, b) =>
        a.studentCode.localeCompare(b.studentCode, "en", { numeric: true })
      );

      StudentScoreInSubjectPDF({ data: responseData });
    } else {
      console.error("ไม่พบข้อมูลคะแนนนักเรียน (responseData เป็น null)");
    }
  } catch (err) {
    console.log("Error in lib genStudentNamelistInGroup.", err);
  }
};