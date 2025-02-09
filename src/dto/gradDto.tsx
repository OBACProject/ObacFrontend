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
  grade: number;
}

export interface convertGradBySubjectId {
  studentCode: string;
  name: string; // firstName + lastName
  collectScore: number;
  testScore: number;
  affectiveScore: number;
  totalScore: number;
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