"use client";
import { GetStudentGroupByGroupId } from "@/api/student/route";
import {
  BulkGetTranscriptByGroupID,
  GetStudentGroupGradeByScheduleSubjectId,
  GetStudentIfGradeBelow,
  GetTranscriptByStudentID,
} from "@/api/grad/route";
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

// The jsPDF/jspdf-autotable + embedded Thai font modules pulled in by
// src/lib/PDF/** are heavy and were previously imported statically here,
// shipping them in the bundle of every page with a download button even if
// it was never clicked. Loading them with `import()` inside each handler
// only pulls them in the moment a user actually generates that PDF - the
// PDF templates/content themselves are untouched.

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
    const { default: StudentNameListInGroupPDF } = await import(
      "../PDF/name-list/StudentNameListInGroup"
    );
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

      const { default: StudentScoreInSubjectPDF } = await import(
        "../PDF/score/StudentScoreInSubject"
      );
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
      const { default: StudentTranscript } = await import(
        "../PDF/score/StudentTranscript"
      );
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
      const { default: BulkStudentTranscript } = await import(
        "../PDF/score/BulkStudentTranscript"
      );
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
  year: number
): Promise<boolean> => {
  try {
    const response = await GetStudentIfGradeBelow(
      className,
      currentLevel,
      grade,
      year
    );
    if (response) {
      const { default: StudentFailListPDF } = await import(
        "../PDF/name-list/StudentFailList"
      );
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
