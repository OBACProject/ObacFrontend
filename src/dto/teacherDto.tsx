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

export interface GetAllTeacher {
  teacherId: number;
  firstName: string;
  lastName: string;
  thaiName: string;
  thaiLastName: string;
  email: string;
  teacherCode: string;
  facultyId: number;
  facultyName: string;
}

export type GetTeacherByTeacherId = {
  teacherId: number;
  teacherCode: string;
  teacherEngFirstName: string;
  teacherEngLastName: string;
  teacherRank: string;
  thaiName: string;
  thaiLastName: string;
  teacherEmail: string;
  teacherPhone: string;
  teacherGender: string;
  teacherNationality: string;
  teacherReligion: string;
  teacherQualification: string;
  teacherFaculty: string;
  teacherProgram: string;
  teacherDateOfJoining: string;
  teacherProfilePicture: string | null;
  nameTitle: string;
};
export interface TeacherEnrollment {
    id: number;
    teacherId: number;
    teacherCode: string;
    teacherName: string;
    teacherLastName: string;
    teacherThaiName: string;
    teacherThaiLastName: string;
    scheduleSubjectId: number;
    subjectId: number;
    subjectCode: string;
    subjectName: string;
    studentGroupId: number;
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
