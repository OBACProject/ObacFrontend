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
  classLevel: string;
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


export interface StudentGroup  {
  studentGroupId: number;
  studentGroupName: string;
  class: string;
  program: string;
  studentCount: number;
};
