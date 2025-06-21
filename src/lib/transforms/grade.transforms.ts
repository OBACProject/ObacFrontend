// src/lib/transforms/grade.transform.ts

import { gradeService } from '@/lib/api/services/grade.service';
import { GroupSummaryGradeResponse, StudentList, GeneralData } from '@/lib/views/grade/grade.view';
import { GetGroupSummaryGradeRequest } from '@/lib/api/models/grade/grade.request';

export async function getGroupSummaryGradeTransform(
  params: GetGroupSummaryGradeRequest
): Promise<GroupSummaryGradeResponse> {
  try {
    const raw = await gradeService.getGradeSummary(params);

    const generalData: GeneralData = {
      groupId: raw.groupId,
      groupName: raw.groupName,
      groupCode: raw.groupCode,
      class: raw.class,
      facultyName: raw.facultyName,
      programName: raw.programName,
      term: raw.term,
      year: raw.year,
    };

    const students: StudentList[] = raw.student.map((student) => {
      const subjects: Record<string, string> = {};
      student.subject.forEach((item) => {
        subjects[item.subjectName] = item.remark ?? item.grade;
      });

      const title = student.gender === 'Male' ? 'นาย' : 'นางสาว';
      return {
        studentId: student.studentId,
        studentCode: student.studentCode,
        name: `${title} ${student.firstName} ${student.lastName}`,
        gpa: student.gpa,
        gpax: student.gpax,
        totalCredit: student.totalCredit,
        subjects,
      };
    });

    const subjects = Array.from(
      new Set(raw.student.flatMap(s => s.subject.map(sub => sub.subjectName)))
    );

    return { generalData, students, subjects };
  } catch (error) {
    console.error('Transform failed', error);
    return {
      generalData: {
        groupId: 0,
        groupName: '',
        groupCode: '',
        class: '',
        facultyName: '',
        programName: '',
        term: '',
        year: 0,
      },
      students: [],
      subjects: [],
    };
  }
}
