export interface TeacherInfoData {
  teacherId: number;
  firstName: string;
  lastName: string;
  thaiName: string;
  thaiLastName: string;
  email: string;
  facultyId: number;
  facultyName: string;
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
