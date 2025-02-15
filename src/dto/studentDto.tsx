import { GetSubjectByGroupId } from "./subjectDto";

export interface StudentCreateData {
  userName: string;
  password: string;
  firstName: string; // /
  lastName: string; // /
  thaiName: string; // /
  thaiLastName: string; // /
  gender: string; // /
  studentGroupId: number; // 1
  studentCode: string; // null
  thaiId: string; // /
  email: string; // /
  phoneNumber: string; // /
  address: string;
  nationality: string;
  religion: string;
  class: string; // null
  enrollYear: number; // หลังบ้านทำให้ได้
  currentYear: number; // null
  graduateYear: number; // null
  currentRoom: string; // null
  programId: number;
  facultyId: number;
  birthDate: Date; // /
}
export interface EducationData {
  classLevel: string;
  groupsCourse: FacultyInfo[];
}
export interface FacultyInfo {
  facultyName: string;
  groupProgram: ProgramInfo[];
}
export interface ProgramInfo {
  programName: string;
  group: GroupInfo[];
}

export interface GroupInfo {
  groupId: number;
  groupName: string;
}

export interface filterProgramsParamsData {
  facultyName: string;
  programName: string;
  class: string;
  groupId: string;
  groupName: string;
}

export interface StudentColumns {
  runningNumber: number;
  studentId: string;
  studentName: string;
  studentSurname: string;
  blank: string;
  more: string | null;
}

export interface StudentInfoByGroupId {
  studentId: number;
  studentName: string;
  studentSurname: string;
}

export interface StudentGroup {
  studentGroupId: number;
  studentGroupName: string;
  class: string;
  program: string;
  studentCount: number;
}

export interface GetStudentByGroupId {
  studentId: number;
  studentCode: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  gpa: number;
  gpax: number;
  totalCredit: number;
  subject: GetSubjectByGroupId[];
}


export interface GetStudentUser {
  studentId: number;
  firstName: string;
  lastName: string;
  thaiName: string;
  thaiLastName: string;
  gender: string;
  groupName: string;
  studentGroupId: number;
  studentCode: string;
  thaiId: string;
  email: string;
  phoneNumber: string;
  address: string;
  nationality: string;
  religion: string;
  role: string;
  userId: string;
  isActive: boolean;
  class: string;
  enrollYear: number;
  currentYear: number;
  graduateYear: number;
  currentRoom: string;
  programId: number;
  programName: string;
  facultyId: number;
  facultyName: string;
  birthDate: string;
}