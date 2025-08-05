"use client";
import { GetStudentGroupByGroupId } from "@/api/student/route";
import StudentNameListInGroupPDF from "../PDF/name-list/StudentNameListInGroup";
import StudentScoreInSubjectPDF from "../PDF/score/StudentScoreInSubject";
import { GetStudentGroupGradeByScheduleSubjectId } from "@/api/grad/route";

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

export const genPDFStudentScoreInSubjectPDF = async (
  scheduleSubjectID: number
) => {
  try {
    const responseData = await GetStudentGroupGradeByScheduleSubjectId(
      scheduleSubjectID
    );
    if (responseData) {
      StudentScoreInSubjectPDF({ data: responseData });
    } else {
      console.error("ไม่พบข้อมูลคะแนนนักเรียน (responseData เป็น null)");
    }
  } catch (err) {
    console.log("Error in lib genStudentNamelistInGroup.", err);
  }
};
