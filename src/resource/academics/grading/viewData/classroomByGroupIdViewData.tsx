import {
  GeneralData,
  GroupSummaryGradeResponse,
  StudentList,
} from "@/app/pages/academic/grading/management/classroom/classroomByGroupId";
import { GetStudentByGroupId } from "@/dto/studentDto";
import { getClassroomByGroupId } from "../api/classroomByGroupIdApiData";

export async function getGroupSummaryGradeViewData(
  groupId: number,
  term: string,
  year: string
): Promise<GroupSummaryGradeResponse> {
  try {
    const data = await getClassroomByGroupId(groupId, term, Number(year));
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
          subjects[item.subjectName] =
            item.remark === null ? item.grade : item.remark;
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
  } catch {
    const nullGroup: GroupSummaryGradeResponse = {
      generalData: {
        groupId: 0,
        groupName: "",
        groupCode: "",
        class: "",
        facultyName: "",
        programName: "",
        term: "",
        year: 0,
      },
      students: [],
      subjects: [],
    };

    return nullGroup;
  }
}
