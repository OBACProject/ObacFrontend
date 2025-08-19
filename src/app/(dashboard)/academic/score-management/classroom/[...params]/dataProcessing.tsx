import { GetGroupSummaryGradeResponse } from "@/lib/api/models/grade/grade.response";

export interface TransformedStudentData {
  studentId: number;
  studentCode: string;
  name: string;
  gpa: number;
  gpax: number;
  totalCredit: number;
  subjects: Record<string, string>;
  failedSubjects: number;
  passedSubjects: number;
}

export interface ProcessedClassroomData {
  generalData: {
    groupId: number;
    groupName: string;
    groupCode: string;
    class: string;
    facultyName: string;
    programName: string;
    term: string;
    year: number;
  };
  students: TransformedStudentData[];
  subjects: string[];
}

export const preProcessClassroomData = (
  data: GetGroupSummaryGradeResponse
): ProcessedClassroomData => {
  const students = data.students ?? [];

  const subjectToStudentsMap: Record<string, string[]> = {};

  students.forEach((s) => {
    (s.subject ?? []).forEach((sub) => {
      if (!subjectToStudentsMap[sub.subjectName]) {
        subjectToStudentsMap[sub.subjectName] = [];
      }
      subjectToStudentsMap[sub.subjectName].push(
        `${s.firstName} ${s.lastName}`
      );
    });
  });

  const uniqueSubjects = Object.keys(subjectToStudentsMap).sort();

  const processedStudents: TransformedStudentData[] = students.map(
    (student) => ({
      studentId: student.studentId,
      studentCode: student.studentCode,
      name: `${student.prefix}${student.firstName} ${student.lastName}`,
      gpa: Number(Number(student.gpa).toFixed(2)),
      gpax: Number(Number(student.gpax).toFixed(2)),
      totalCredit: student.totalCredit,
      subjects: Object.fromEntries(
        (student.subject ?? []).map((sub) => [
          sub.subjectName,
          sub.remark && sub.remark.trim() !== "" ? sub.remark : sub.grade,
        ])
      ),
      failedSubjects: (student.subject ?? []).filter(
        (sub) => parseFloat(sub.grade) === 0
      ).length,
      passedSubjects: (student.subject ?? []).filter(
        (sub) => parseFloat(sub.grade) > 0
      ).length,
    })
  );

  return {
    generalData: {
      groupId: data.groupId,
      groupName: data.groupName,
      groupCode: data.groupCode,
      class: data.class,
      facultyName: data.facultyName,
      programName: data.programName,
      term: data.term,
      year: data.year,
    },
    students: processedStudents,
    subjects: uniqueSubjects.length > 0 ? uniqueSubjects : [],
  };
};
