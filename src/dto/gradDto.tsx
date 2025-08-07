export interface GradStudentInSubject {
  [key: string]: number | string;
  gradeId: number;
  subjectId: number;
  scheduleSubjectId: number;
  studentGroup: string;
  studentId: number;
  studentCode: string;
  gender: string;
  firstName: string;
  lastName: string;
  subjectName: string;
  assignmentscore :number
  collectScore: number;
  affectiveScore: number;
  midtermscore: number;
  finaltermscore: number;
  totalScore: number;
  grade: string;
  remark: string;
}
export interface GetGradBySubjectId {
  [key: string]: number | string;
  gradeId: number;
  subjectId: number;
  scheduleSubjectId: number;
  studentGroup: string;
  studentId: number;
  studentCode: string;
  prefix : string;
  gender: string;
  firstName: string;
  lastName: string;
  subjectName: string;
  assignmentscore: number;
  collectScore: number;
  affectiveScore: number;
  midtermScore: number;
  finaltermScore: number;
  totalScore: number;
  grade: string;
  remark: string;
}
// assignmentscore คะแนนภารระงาน : 20
// collectscore คะแนนเก็บ (ทดสอบ) : 10
// affectivescore คะแนนประพฤติ : 20
// midtermscore กลางภาค : 20
// finaltermscore ปลายภาค : 30
export interface convertGradBySubjectId {
  studentCode: string;
  name: string; 
  assignmentscore: number;
  collectScore: number;
  affectiveScore: number;
  midtermScore: number;
  finaltermScore: number;
}
export interface ConvertClassroomToExcelDto {
  studentCode: string;
  name: string; // firstName + lastName
}

export interface Subject {
  subjectName: string;
  subjectCode: string;
  grade: string;
  credit: number;
}

export interface GetGradPerTermByStudentIdDto {
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

export interface ConvertGradBySubjectId {
  studentCode: string;
  name: string;
  collectScore: number;
  testScore: number;
  affectiveScore: number;
  totalScore: number;
}

export type Student = {
  studentId: number;
  studentCode: string;
  prefix: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  gpa: number;
};

export interface GetGropGradeAboveModel {
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
export interface GetGropGradeBelowModel {
  studentId: number;
  studentCode: string;
  prefix : string;
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

export interface SubjectDetail {
  subject_name: string;
  subject_code: string;
  gradeId: number;
  collectScore: number | null;
  testScore: number | null;
  affectiveScore: number | null;
  midtermScore: number | null;
  finalScore: number | null;
  totalScore: number | null;
  credit: string;
  finalGrade: string;
  remark: string;
}

export interface YearDataDetail {
  term: string;
  year: number;
  totalCredit: number;
  termQuery: SubjectDetail[];
}

export interface GetStudentGradeDetailDto {
  gender: string;
  studentId: number;
  firstName: string | null;
  lastName: string | null;
  thaiName: string;
  thaiLastName: string;
  class: string;
  currentYear: number;
  studentCode: string;
  groupName: string;
  programName: string;
  facultyName: string;
  subProgramName: string;
  year: YearDataDetail[];
}

export type GetStudentGroupGradeByGroupIdTermYearDto = {
  gradeId: number;
  subjectId: number;
  scheduleSubjectId: number;
  studentId: number;
  class: string;
  studentGroup: string;
  studentCode: string;
  firstName: string;
  lastName: string;
  subjectName: string;
  collectScore: number | null;
  testScore: number | null;
  affectiveScore: number | null;
  midtermScore: number | null;
  finalScore: number | null;
  totalScore: number | null;
  grade: number;
  remark: string | null;
};

export interface SubjectGradeItem {
  studentId: number;
  studentCode: string;
  prefix:string;
  firstName: string;
  lastName: string;
  assignmentScore:number;
  collectScore: number;
  affectiveScore: number;
  midtermScore: number;
  finaltermScore: number;
  totalScore: number;
  finalGrade: number;
  remarks: string;
}

export interface StudentGroupGradeResponse {
  subjectName: string;
  subjectCode: string;
  credit:number;
  hour:number;
  subjectTeacher:string;
  subjectId: number;
  groupId: number;
  groupName: string;
  groupCode: string;
  class: string;
  level: number;
  isPublish: boolean;
  isComplete: boolean;
  term: string;
  year: number;
  subjectGrades: SubjectGradeItem[];
}

export type StudentGroupGrade = {
  studentId: number;
  collectScore: number;
  assignmentScore: number;
  affectiveScore: number;
  midtermScore: number;
  finaltermScore: number;
  totalScore: number;
  finalGrade: number;
  remarks: string;
};

export type BulkUpdateStudentGradeResponse = {
  responseCode: string;
  responseMessage: string;
  data: boolean;
  error: null | {
    code: string;
    message: string;
  };
};