"use client";
import StudentFailListPDF from "../PDF/name-list/StudentFailList";
import StudentNameInSubject from "../PDF/name-list/StudentNameInSubject";
import StudentNameListInGroupPDF from "../PDF/name-list/StudentNameListInGroup";
import GroupSummaryGradPDF from "../PDF/score/GroupSummaryGrade";
import StudentScoreInSubjectPDF from "../PDF/score/StudentScoreInSubject";
import SummaryGradeForStudent from "../PDF/score/SummaryGradeForStudent";
import {
  GradSummaryGroupData,
  mockGetGradBelowResponse,
  mockGroupSummaryGradeResponse,
  mockStudentListByGroupID,
  mockStudentNameListInSubject,
  mockStudentScorenSubject,
} from "@/resource/PDF/mockData";

export const genGradSummaryForStudent = async () => {
  try {
    SummaryGradeForStudent(GradSummaryGroupData);
  } catch (err) {
    console.log("Error in lib SummaryGradeForStudent.", err);
  }
};

export const genGroupSummaryGrad = async () => {
  try {
    GroupSummaryGradPDF({ data: mockGroupSummaryGradeResponse });
  } catch (err) {
    console.log("Error in lib genGroupSummaryGrad.", err);
  }
};

export const genStudentNamelistInGroup = async () => {
  try {
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
    StudentNameInSubject({ data: mockStudentNameListInSubject });
  } catch (err) {
    console.log("Error in lib genStudentNamelistInGroup.", err);
  }
};

export const genStudentScoreInSubject = async () => {
  try {
    StudentScoreInSubjectPDF({ data: mockStudentScorenSubject });
  } catch (err) {
    console.log("Error in lib genStudentScoreInSubject.", err);
  }
};

export const genStudentNotPassList = async () => {
  try {
    StudentFailListPDF({
      student: mockGetGradBelowResponse,
      currentYear: 2568,
      classGroup: "ปวช 2",
    });
  } catch (err) {
    console.log("Error in lib genStudentNotPassList.", err);
  }
};
