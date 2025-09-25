export interface GetStudentDetailResponse {
  userId: string;
  citizenId: string;
  nationality: string;
  religion: string;
  phoneNumber: string;
  email: string;
  birthDate: string;
  currentAddress: string;
  fatherFirstName: string;
  fatherLastName: string;
  motherFirstName: string;
  motherLastName: string;
  userName: string;
  id: number;
  prefix: string;
  name: string;
  lastName: string;
  gender: string;
  studentCode: string;
  studentGroupId: number;
  groupName: string;
  groupCode: string;
  section: string;
  class: string;
  level: number;
  programName: string;
  subProgramName: string;
  facultyName: string;
  status: string;
  programId: number;
  isActive: boolean;
}

export interface SubjectGrade {
  gradeId: number;
  finalGrade: number;
  remark: string;
  subjectId: number;
  subjectName: string;
  subjectCode: string;
  credit: number;
  gradePoint: number;
  term: string;
  year: number;
  collectScore: number;
  assignmentScore: number;
  affectiveScore: number;
  midtermScore: number;
  finaltermScore: number;
  totalScore: number;
  receiptNo: string;
}

export interface SubjectGradesTermYear {
  term: string;
  year: number;
  subjectGrades: SubjectGrade[];
}

export interface StudentTranscript {
  studentId: number;
  studentCode: string;
  prefix: string;
  firstName: string;
  lastName: string;
  facultyName: string;
  programName: string;
  subProgramName: string;
  class: string;
  isPublish:boolean;
  groupName: string;
  section: string;
  gpax:string;
  subjectGradesTermYear: SubjectGradesTermYear[];
}

export interface ScheduleSubject {
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