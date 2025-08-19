import { YearData, GetStudentByGroupId } from "@/dto/studentDto";
import { Student } from "./grade.request";


export interface GetGradBelowResponse {
  studentId: number;
  studentCode: string;
  prefix?:string;
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

export interface GetStudentGroupGradeAboveResponse {
  groupId: number;
  groupName: string;
  groupCode: string;
  class: string;
  facultyName: string;
  programName: string;
  programId: number;
  term: string;
  year: number;
  student: Student[];
  level: number;
}

export interface StudentTranscriptResponse {
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

export interface GetGroupSummaryGradeResponse {
  groupId: number;
  groupName: string;
  groupCode: string;
  class: string;
  facultyName: string;
  programName: string;
  term: string;
  year: number;
  students: GetStudentByGroupId[];
}


export interface GetStudentGradesByTermYearResponse {
  grades : Grades[];
  gpa : number;
  gpax : number;  
}

export interface GetStudentGroupGradeByScheduleSubjectIdResponse {
  subjectName : string;
  subjectCode : string;
  subjectId : number;
  groupName : string;
  groupCode : string;
  class : string;
  level : number;
  isPublish : boolean;
  iscomplete : boolean;
  term : string;
  year : number;
  subjectGrades : SubjectGradeScheduleSubject[];
}

export interface GetStudentIfGradeBelowResponse {
  studentId: number;
  studentCode: string;
  prefix?: string;
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

export interface GetStudentDetailAndSummaryScoreByStudentCodeResponse {
  student: StudentDetail;
  termYearGradeGroups: TermYearGradeGroup[];
}
  export interface Grades {
    subjectName: string;
    subjectCode: string;
    grade : number;
    remark : string;
    credit: number;
  }
  
  interface StudentDetail {
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
  }
  
  export interface SubjectGradeScheduleSubject {
    gradeId: number;
    studentId: number;
    studentCode: string;
    prefix: string;
    firstName: string;
    lastName: string;
    assignmentScore: number;
    collectScore: number;
    affectiveScore: number;
    midtermScore: number;
    finaltermScore: number;
    totalScore: number;
    finalGrade: number;
    remark: string | null;
    subjectName: string;
    subjectCode: string;
    credit: number;
    gradePoint: number;
    term: string;
    year: number;
  }
  
   interface TermYearGradeGroup {
    term: string;
    year: number;
    totalGPA: number;
    totalCredit: number;
    grades: SubjectGradeScheduleSubject[];
  }