"use client";
import {
  GradSummaryGroupData,
  mockGroupSummaryGradeResponse,
  mockStudentGroupGradeResponse,
  mockStudentListByGroupID,
  mockStudentNameListInSubject,
  mockStudents,
} from "@/resource/PDF/mockData";

// See createPDFFile.ts for why these PDF template imports are deferred with
// `import()` instead of static imports - keeps jsPDF/fonts out of the page
// bundle until one of these sample documents is actually generated.

export const genGradSummaryForStudent = async () => {
  try {
    const { default: ExampleTranscript } = await import(
      "../PDF/score/MockTranscript"
    );
    ExampleTranscript(GradSummaryGroupData);
  } catch (err) {
    console.log("Error in lib SummaryGradeForStudent.", err);
  }
};

export const genGroupSummaryGrad = async () => {
  try {
    const { default: GroupSummaryGradPDF } = await import(
      "../PDF/score/GroupSummaryGrade"
    );
    GroupSummaryGradPDF({ data: mockGroupSummaryGradeResponse });
  } catch (err) {
    console.log("Error in lib genGroupSummaryGrad.", err);
  }
};

export const genStudentNamelistInGroup = async () => {
  try {
    const { default: StudentNameListInGroupPDF } = await import(
      "../PDF/name-list/StudentNameListInGroup"
    );
    StudentNameListInGroupPDF({
      student: mockStudentListByGroupID,
      studentGroup: "ปวช.1/2",
      year: 2568,
    });
  } catch (err) {
    console.log("Error in lib genStudentNamelistInGroup.", err);
  }
};

export const genStudentNameInSubject = async () => {
  try {
    const { default: StudentNameInSubject } = await import(
      "../PDF/name-list/StudentNameInSubject"
    );
    StudentNameInSubject({ data: mockStudentNameListInSubject });
  } catch (err) {
    console.log("Error in lib genStudentNamelistInGroup.", err);
  }
};

export const genStudentScoreInSubject = async () => {
  try {
    const { default: StudentScoreInSubjectPDF } = await import(
      "../PDF/score/StudentScoreInSubject"
    );
    StudentScoreInSubjectPDF({ data: mockStudentGroupGradeResponse });
  } catch (err) {
    console.log("Error in lib genStudentScoreInSubject.", err);
  }
};

export const genStudentNotPassList = async () => {
  try {
    const { default: StudentFailListPDF } = await import(
      "../PDF/name-list/StudentFailList"
    );
    StudentFailListPDF({
      student: mockStudents,
      currentYear: 2568,
      classGroup: "ปวช 2",
    });
  } catch (err) {
    console.log("Error in lib genStudentNotPassList.", err);
  }
};
