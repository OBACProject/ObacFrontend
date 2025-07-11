"use client";
import GroupSummaryGradPDF from "../PDF/GroupSummaryGrade";
import SummaryGradeForStudent from "../PDF/SummaryGradeForStudent";
import {  GradSummaryGroupData, mockGroupSummaryGradeResponse } from "@/resource/PDF/mockData";

export const genGradSummaryForStudent = async () => {
  try {
    SummaryGradeForStudent(GradSummaryGroupData);
  } catch (err) {
    console.log("Error in lib SummaryGradeForStudent.", err);
  }
};

export const genGroupSummaryGrad = async () => {
  try {
    GroupSummaryGradPDF({data:mockGroupSummaryGradeResponse})
  } catch (err) {
    console.log("Error in lib SummaryGradeForStudent.", err);
  }
};
