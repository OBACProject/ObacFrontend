export interface GetGradBySubjectId {
  [key: string]: number | string;
  gradeId: number;
  subjectId: number;
  scheduleSubjectId: number;
  studentGroup: string;
  studentId: number;
  studentCode: string;
  firstName: string;
  lastName: string;
  subjectName: string;
  collectScore: number;
  testScore: number;
  affectiveScore: number;
  totalScore: number;
  grade: string;
  remark: string;
}

export interface convertGradBySubjectId {
  studentCode: string;
  name: string; // firstName + lastName
  collectScore: number;
  testScore: number;
  affectiveScore: number;
  totalScore: number;
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
  term: number;
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
  term: string;
  year: number;
  student: Student[];
}
export interface GetGropGradeBelowModel {
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
