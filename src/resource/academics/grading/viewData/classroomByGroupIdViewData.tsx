import {
  GeneralData,
  GroupSummaryGradeResponse,
  StudentList,
} from "@/app/pages/academic/grading/management/classroom/classroomByGroupId";
import { Subject } from "@/dto/gradDto";
import { GetStudentByGroupId } from "@/dto/studentDto";
import { getClassroomByGroupId } from "../api/classroomByGroupIdApiData";
import { ClassroomByGroupIdData } from "@/dto/gradingDto";
import { GetSubjectByGroupId } from "@/dto/subjectDto";

export async function getGroupSummaryGradeViewData(
  groupId: number,
  term: string,
  year: string
): Promise<GroupSummaryGradeResponse> {
  const data = await getClassroomByGroupId(groupId, term, year);
  console.log(data);

  // Mapping to split data
  const generalData: GeneralData = {
    groupId: data.groupId,
    groupName: data.groupName,
    groupCode: data.groupCode,
    class: data.class,
    facultyName: data.facultyName,
    programName: data.programName,
    term: data.term,
    year: data.year,
  };

  const students: StudentList[] = data.student.map(
    (student: GetStudentByGroupId) => {
      const subjects: Record<string, string> = {};
      student.subject.forEach((item) => {
        subjects[item.subjectName] = item.grade;
      });

      return {
        studentId: student.studentId,
        studentCode: student.studentCode,
        name: `${student.firstName} ${student.lastName}`,
        gpa: student.gpa,
        gpax: student.gpax,
        totalCredit: student.totalCredit,
        subjects,
      };
    }
  );

  const subjects: string[] = Array.from(
    new Set(
      data.student.flatMap((student) =>
        student.subject.map((subject: any) => subject.subjectName)
      )
    )
  );

  return { generalData, students, subjects };
}
