// export interface GetAllTeacher {
//   teacherId: number;
//   firstName: string;
//   lastName: string;
//   thaiName: string;
//   thaiLastName: string;
//   gender: string;
//   rank: string;
//   qualification: string;
//   thaiId: string;
//   email: string;
//   phoneNumber: string;
//   address: string;
//   nationality: string;
//   religion: string;
//   userId: string;
//   isActive: boolean;
//   hiredDate: Date;
//   programId: number;
//   programName: string;
//   facultyId: number;
//   facultyName: string;
//   birthDate: Date;
// }

export interface GetAllTeacherResponse {
  id : number;
  teacherId: number;
  prefix:string;
  firstName: string;
  lastName: string;
  teacherCode: string;
  gender :string;
  facultyId: number;
  facultyName: string;
  program: string;
  phoneNumber: string | null;
  isActive : boolean;
}


export interface TeacherDetails {
  teacherId: number;
  teacherCode: string;
  name: string;
  lastName: string;
  phoneNumber: string;
  gender: string;
  nationality: string;
  faculty: string;
  program: string;
  hiredDate: string; 
}

export interface TeacherEnrollment {
    id: number;
    teacherId: number;
    teacherCode: string;
    teacherThaiName: string;
    teacherThaiLastName: string;
    scheduleSubjectId: number;
    subjectId: number;
    subjectCode: string;
    subjectName: string;
    studentGroupId: number;
    studentClass:string;
    groupName:string
    totalStudent: number;
    room: string;
    day: string;
    period: string;
    subjectStatus: boolean;
    isComplete: boolean;
    year: number;
    term: string;
}

export interface TeacherInfoData {
  teacherId: number | string;
  firstName: string;
  lastName: string;
  facultyName: string;
  email: string;
}

export interface TeacherColumns {
  runningNumber: number;
  teacherId: string;
  teacherName: string;
  teacherSurname: string;
  programs: string;
  email: string;
  phoneNumber: string;
}

export interface CardSubjectResponse {
  scheduleSubjectId: number;
  day: string;                  // eg. "วันจันทร์"
  period: number;              // คาบเรียนที่
  room: string;                // ห้องเรียน
  subjectId: number;
  subjectName: string;
  subjectCode: string;
  term: string;
  year: number;
  studentGroupId: number;
  studentGroupName: string;    // eg. "ห้อง 1"
  studentGroupCode: string;    // eg. "A1"
  class: string;               // eg. "ปวช"
  level: number;               // ชั้นปี
  studentAmount: number;      
  isComplete: boolean;       
  isPublish: boolean;
  timing : number;
}

export interface TeacherDetail {
  teacherId: number;
  firstName: string;
  lastName: string;
  prefix: string;
  gender: string;
  teacherCode: string;
  facultyId: number;
  facultyName: string;
  program: string;
  phoneNumber: string;
}


export interface TeacherScheduleItem {
  scheduleSubjectId: number;
  day: string;
  period: number;
  room: string;
  subjectId: number;
  subjectName: string;
  subjectCode: string;
  term: string;
  year: number;
  studentGroupId: number;
  studentGroupName: string;
  studentGroupCode: string;
  studentCount: number;
  class: string;
  level: number;
  isComplete: boolean;
  isPublish: boolean;
  curriculumYear: number;
}

export interface TeacherDetailAndScheduleResponse {
  teacher: TeacherDetail;
  schedule: TeacherScheduleItem[];
}
export interface CreateTeacherRequest {
  prefix: string;
  teacherCode: string;
  hiredDate : string;
  programId?: number;
  userName :string;
  password : string;
  firstName : string;
  lastName : string;
  gender : string;
  citizenId : string;
  phoneNumber : string;
  nationality : string;
  birthDate : string;
}