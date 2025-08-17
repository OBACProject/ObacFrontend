import { GetSubjectByGroupId } from "@/dto/subjectDto";

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
  groupCode: string;
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
  groupName: string;
  class: string;
  program: string;
  studentCount: number;
}

export interface GetStudentByGroupId {
  studentId: number;
  studentCode: string;
  prefix: string | null;
  firstName: string;
  lastName: string;
  isActive: boolean;
  gender: string;
  gpa: number;
  gpax: number;
  totalCredit: number;
  subject: GetSubjectByGroupId[];
}

export interface GetAllStudent {
  id: number;
  studentId: number;
  prefix: string | null;
  firstName: string | null;
  lastName: string | null;
  thaiName: string;
  thaiLastName: string;
  gender: string;
  groupName: string;
  groupCode: string;
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
  status: string | null;
  birthDate: string | null;
}


export interface GetAllStudentUser {
  studentId: number;
  studentCode: string;
  class: string;
  groupName: string;
  groupCode: string;
  id: string;
  userName: string;
  prefix: string;
  firstName: string;
  lastName: string;
  gender: string;
  role: string;
  isActive: boolean;
  userId : string;
}

export type GetAllStudentsPagedParams = {
  pageNumber?: number;    
  pageSize?: number;       
  searchTerm?: string;    
  searchCategory?: string; 
  sortBy?: string;         
  ascending?: boolean;     
};

export type GetAllStudentsPagedResponse = {
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  items: GetAllStudentUser[];
};

export interface GetStudentDetailResponse {
  id: number;
  username: string;
  password: string;
  prefix: string;
  firstName: string;
  lastName: string;
  studentCode: string;
  class: string;
  groupName: string;
  gender: string;
  citizenId: string;
  phoneNumber: string;
  nationality: string;
  birthDate: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateStudentRequest {
  userName: string;
  password: string;
  firstName: string;
  lastName: string;
  studentCode: string;
  gender: string;
  citizenId: string;
  phoneNumber: string;
  nationality: string;
  birthDate: string;
  prefix: string;
  studentGroupId : number;
}


export interface GetAllStudentTableDto {
  studentId: number;
  studentCode: string;
  thaiName: string;
  class: string;
  currentYear: number;
  facultyName: string;
  subProgramName: string;
  programName: string;
}
// {
//   "affectiveScore": 20,
//   "assignmentScore": 0,
//   "collectScore": 0,
//   "credit": 2,
//   "finalGrade": 3,
//   "finaltermScore": 30,
//   "gradeId": 1823,
//   "gradePoint": 6,
//   "midtermScore": 20,
//   "remark": "",
//   "subjectCode": "30000-1101",
//   "subjectId": 1,
//   "subjectName": "ทักษะภาษาไทยเพื่อการสื่อสารในงานอาชีพ",
//   "term": "1",
//   "totalScore": 70,
//   "year": 2568
// }
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

export interface StudentTranscriptData {
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

export type StudentDto = {
  studentCode: string;
  studentId: number;
  studentName: string;
  studentSurname: string;
};

export type GetStudentListByGroupIDDto = {
  groupId: number;
  groupName: string;
  groupCode: string;
  programName: string;
  programId: number;
  facultyName: string;
  subProgramName: string;
  class: string;
  students: StudentItems[];
};
export type StudentDetailByStudentID = {
  studentId: number;
  firstName: string | null;
  lastName: string | null;
  thaiName: string;
  thaiLastName: string;
  gender: "Male" | "Female" | string;
  groupName: string;
  studentGroupId: number;
  studentCode: string;
  studentStatus: string;
  thaiId: string | null;
  email: string | null;
  phoneNumber: string | null;
  address: string | null;
  nationality: string | null;
  religion: string | null;
  role: string;
  userId: string;
  isActive: boolean;
  class: string;
  enrollYear: number | null;
  currentYear: number;
  graduateYear: number | null;
  currentRoom: string;
  programId: number;
  programName: string;
  facultyId: number;
  facultyName: string;
  birthDate: string | null;
};

export type UpdateStudentRequestBody = {
  studentId: number;
  firstName: string | null;
  lastName: string | null;
  thaiName: string;
  thaiLastName: string;
  gender: string;
  studentGroupId: number;
  studentCode: string;
  thaiId: string | null;
  email: string | null;
  phoneNumber: string | null;
  address: string | null;
  nationality: string | null;
  religion: string | null;
  class: string;
  enrollYear: number | null;
  currentYear: number;
  graduateYear: number | null;
  programId: number;
  facultyId: number;
  birthDate: string | null;
  isActive: boolean;
  isAgree: boolean;
};

export interface StudentGroupDetail {
  sort(arg0: (a: StudentItems, b: StudentItems) => number): unknown;
  studentGroupId: number;
  groupName: string;
  groupCode: string;
  class: string;
  level: number;
  students: StudentItems[];
}

export interface StudentItems {
  gender: string;
  status: string | null;
  id: number;
  prefix: string;
  firstName: string;
  lastName: string;
  studentCode: string;
}

export interface StudentDetail {
  studentId: number;
  firstName: string;
  lastName: string;
  status: string;
  gender: string;
  thaiId: string;
  groupId: number;
  studentCode: string;
  email: string;
  phoneNumber: string;
  class: string;
  address: string;
  nationality: string;
  enrollYear: number;
  religion: string;
  currentYear: number;
  graduateYear: number;
  programId: number;
  facultyId: number;
  programName: string;
  facultyName: string;
  birthDate: string;
  currentRoom: string;
  isActive: boolean;
  isAgree: boolean;
}

export interface StudentDetails {
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
  programId: number;
  isActive: boolean;
  
  thaiID:string;
  religion:string;
  address:string;
  email:string;
}


export interface UpdateStudentUserRequest {
  studentId: number;
  prefix: string;
  firstName: string;
  lastName: string;
  gender: string;
  studentGroupId: number;
  birthDate: string;         
  studentCode: string;
  enrollYear: number;
  currentLevel: number;
  graduateYear: number;
  programId: number;
  isActive: boolean;
  status: string;
}