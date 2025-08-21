"use client";
import { GetStudentGroupByGroupId } from "@/api/student/route";
import StudentNameListInGroupPDF from "../PDF/name-list/StudentNameListInGroup";
import StudentScoreInSubjectPDF from "../PDF/score/StudentScoreInSubject";
import {
  BulkGetTranscriptByGroupID,
  GetStudentGroupGradeByScheduleSubjectId,
  GetStudentIfGradeBelow,
  GetTranscriptByStudentID,
} from "@/api/grad/route";
import { StudentItems } from "@/dto/studentDto";
import BulkStudentTranscript from "../PDF/score/BulkStudentTranscript";
import StudentTranscript from "../PDF/score/StudentTranscript";
import StudentFailListPDF from "../PDF/name-list/StudentFailList";

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
    const EXCLUDED_STATUSES = new Set(["คัดชื่อออก", "ลาออก"]);

    const activeStudents = (data.students ?? []).filter((s) => {
      const status = (s.status ?? "").trim();
      return !EXCLUDED_STATUSES.has(status);
    });

    const studentsSorted = [...(activeStudents ?? [])].sort(byStudentCodeDesc);
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

    const EXCLUDED_STATUSES = new Set(
      ["คัดชื่อออก", "ลาออก"].map((s) => s.trim())
    );

    if (responseData) {
      const filteredSorted = (responseData.subjectGrades ?? [])
        .filter((s) => !EXCLUDED_STATUSES.has((s.status ?? "").trim()))
        .sort((a, b) =>
          (a.studentCode ?? "").localeCompare(b.studentCode ?? "", "en", {
            numeric: true,
          })
        );

      responseData.subjectGrades = filteredSorted;

      StudentScoreInSubjectPDF({ data: responseData });
    } else {
      console.error("ไม่พบข้อมูลคะแนนนักเรียน (responseData เป็น null)");
    }
  } catch (err) {
    console.log("Error in lib genStudentNamelistInGroup.", err);
  }
};

export const genPDFStudentTranscriptPDF = async (studentID: number) => {
  try {
    const response = await GetTranscriptByStudentID(studentID);
    if (response) {
      StudentTranscript(response);
    }
  } catch (err) {
    console.log("Error in lib genStudentNamelistInGroup.", err);
  }
};

export const genBulkPDFStudentTranscriptPDF = async (
  groupID: number
): Promise<boolean> => {
  try {
    const response = await BulkGetTranscriptByGroupID(groupID);
    if (response) {
      BulkStudentTranscript(
        response.studentGrades,
        response.class,
        response.groupName,
        response.term,
        response.year
      );
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log("Error in lib genStudentNamelistInGroup.", err);
    return false;
  }
};

export const genPDFFailedStudentNamelist = async (
  className: string,
  currentLevel: number,
  grade: number,
  term: string,
  year: number
): Promise<boolean> => {
  try {
    const response = await GetStudentIfGradeBelow(
      className,
      currentLevel,
      grade,
      term,
      year
    );
    if (response) {
      StudentFailListPDF({
        student: response,
        currentYear: currentLevel,
        classGroup: className,
      });
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log("err PDF API ", err);
    return false;
  }
};
