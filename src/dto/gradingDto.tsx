import { GetStudentByGroupId } from "./studentDto";

// data from api
export interface GradingData {
  id: number;
  subjectCode: string;
  subjectName: string;
  credits: number;
  term: string;
  isActive: boolean;
}

export interface ClassSubjectData {
  scheduleSubjectId: number;
  scheduleId: number;
  subjectId: number;
  studentGroupId: number;
  studentGroupName: string;
  class: string;
  room: string;
  isPublish: boolean;
  subjectCode: string;
  subjectName: string;
  day: string;
  period: string;
  teacherName: string;
  year: number;
  term: number;
}

export interface GradingDataColumn {
  id: number;
  subjectCode: string;
  subjectName: string;
  term: string;
}

export interface ClassSubjectColumn {
  id: number;
  day: string;
  period: string;
  room: string;
  teacherName: string;
  isPublish: boolean;
}

export interface GradingInfo {}

export interface ClassroomByGroupIdData {
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

export interface UpdateStudentGrade {
  gradeId: number;
  collectScore: number;
  testScore: number;
  affectiveScore: number;
  // midtermScore: number;
  finalGrade: string;
  totalScore: number;
  remark?: string;
}


export interface Grad {
  grad : number;
  remark :string;
}

export interface StudentList {
  studentId: number;
  prefix: string;
  studentCode: string;
  studentFirstName: string;
  studentLastName: string;
  gpa: number;
  gpax: number;
  totalCredit: number;
  grads: Grad[];
}

export interface SubjectNameList {
  subjectID: number;
  subjectCode: string;
  subjectName: string;
}
export interface GroupSummaryGradeResponse {
  groupId: number;
  groupName: string;
  groupCode: string;
  class: string;
  facultyName: string;
  programName: string;
  term: string;
  year: number;
  student: StudentList[];
  subjects:SubjectNameList[];
}