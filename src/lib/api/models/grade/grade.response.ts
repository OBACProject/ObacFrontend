export interface Subject {
  subjectName: string;
  subjectCode: string;
  grade: string;
  credit: number;
}
export interface GetSubjectByGroupId {
  subjectName: string;
  subjectCode: string;
  grade: string;
  credit: number;
  remark: string;
}
export interface GetStudentByGroupId {
  studentId: number;
  studentCode: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  gender : string;
  gpa: number;
  gpax: number;
  totalCredit: number;
  subject: GetSubjectByGroupId[];
}

export type Student = {
  studentId: number;
  studentCode: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  gpa: number;
};
export interface TermQuery {
  subject_name: string;
  subject_code: string;
  credit: string;
  finalGrade: string;
  remark: string;
  collectScore: number;
  affectiveScore: number;
  testScore: number;
  gradeId: number;
}
export interface YearData {
  term: string;
  year: number;
  totalCredit: number;
  termQuery: TermQuery[];
}


export interface GetGradPerTermYearByStudentIdResponse {
  studentId: number;
  studentCode: string;
  firstName: string;
  lastName: string;
  facultyName: string;
  programName: string;
  class: string;
  groupName: string;
  isActive: boolean;
  term: string;
  year: number;
  gpa: number;
  gpax: number;
  totalCredit: number;
  subject: Subject[];
}

export interface GetGradBelowResponse {
  studentId: number;
  studentCode: string;
  firstName: string;
  lastName: string;
  facultyName: string;
  programName: string;
  class: string;
  groupName: string;
  term: string;
  year: number;
  gpa: number;
}

export interface GetStudentGroupGradeAboveResponse {
    groupId: number;
  groupName: string;
  groupCode: string;
  class: string;
  facultyName: string;
  programName: string;
  programId: number;
  term: string;
  year: number;
  student: Student[];
  level: number;
}

export interface StudentTranscriptResponse {
  studentId: number;
  firstName: string;
  lastName: string;
  thaiName: string;
  thaiLastName: string;
  class: string;
  currentYear: number;
  studentCode: string;
  groupName: string;
  programName: string;
  facultyName: string;
  subProgramName: string;
  year: YearData[];
}

export interface GetGroupSummaryGradeResponse {
  groupId: number;
  groupName: string;
  groupCode: string;
  class: string;
  facultyName: string;
  programName: string;
  term: string;
  year: number;
  student: GetStudentByGroupId[];
}