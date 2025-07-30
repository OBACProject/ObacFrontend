"use client";
import { GetStudentGroupByGroupId } from "@/api/student/route";
import StudentNameListInGroupPDF from "../PDF/name-list/StudentNameListInGroup";

export const genPDFStudentNamelistInGroup = async (
  groupID: number,
  year: number
) => {
  try {
    const data = await GetStudentGroupByGroupId(groupID);
    StudentNameListInGroupPDF({
      student: data?.students,
      studentGroup: `${data?.class}.${data?.groupName}`,
      year: year,
    });
  } catch (err) {
    console.log("Error in lib genStudentNamelistInGroup.", err);
  }
};
