

export interface GetGroupSummaryGradeRequest {
    groupId: number;
    term: string;
    year: number;
}

export interface GetStudentGradesByTermYearRequest {
    studentId: number;
    term: string;
    year: number;
}

export interface GetStudentDetailAndSummaryScoreByStudentCodeRequest {
    studentCode: string;
}

export interface UpsertStudentGradesRequest {
    student : Student;
    grades: SubjectGrade[];
}

export interface DeleteGradeRequest {
    gradeId: number;
}

export interface GetStudentGroupGradeByScheduleSubjectIdRequest {
    scheduleSubjectId: number;
}


export interface GetStudentIfGradeBelowRequest {
    className : string;
    currentLevel : number;
    grade : number;
    term : string;
    year : number;
}
export interface Student {
  id: number;
  prefix: string;
  name: string;
  lastName: string;
  gender: string;
  nationality: string;
  birthDate: string; 
  citizenId: string;
  studentCode: string;
  phoneNumber: string;
  studentGroupId: number;
  groupName: string;
  groupCode: string;
  class: string;
  level: number;
  programName: string;
  subProgramName: string;
  facultyName: string;
  gpax: number;
  status: string;
}

export interface SubjectGrade {
  gradeId: number;
  finalGrade: number;
  remark: string;
  subjectName: string;
  subjectCode: string;
  credit: number;
  gradePoint: number;
  term: string;
  year: number;
}

export interface TermYearGradeGroup {
  term: string;
  year: number;
  totalGPA: number;
  totalCredit: number;
  grades: SubjectGrade[];
}

// export interface BulkUpdateStudents {
//     studentId : number;
//     collectScore: number;
//     assignmentScore: number;
//     affectiveScore: number;
//     midtermScore: number;
//     finaltermScore: number;
//     totalScore: number;
//     finalGrade: number;
//     remarks: string;
// }

export interface BulkUpdateStudentGradeByScheduleSubjectIdRequest {
    studentId : number;
    collectScore: number;
    assignmentScore: number;
    affectiveScore: number;
    midtermScore: number;
    finaltermScore: number;
    totalScore: number;
    finalGrade: number;
    remarks: string;
}