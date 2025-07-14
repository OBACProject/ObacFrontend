

export interface GetStudentGradesByTermYearRequest {
    studentId: number;
    term: string;
    year: number;
}


export interface GetStudentIfGradeBelowRequest {
    class : string;
    currentYear : number;
    grade : number;
    term : string;
    year : number;
}

export interface GetStudentGradeAboveRequest {
    grade :  number;
    term : string;
    year : number;
    groupId : number;
}

export interface GetStudentTranscriptRequest {
    studentId: number;
    year: number;
    term: string;
}

export interface GetGroupSummaryGradeRequest {
    groupId: number;
    term: string;
    year: number;
}

export interface GetGroupSummaryGradeAvailableStatusRequest {
    groupId: number;
    term: string;
    year: number;
}

export interface GetStudentGroupGradeByGroupIdTermYearRequest {
    groupId: number;
    term: string;
    year: number;
    studentId: number;
}

export interface UpdateStudentGradeRequest {
    gradeId: number;
    collectScore: number;
    testScore: number;
    affectiveScore: number;
    midtermScore: number;
    finalScore: number;
    totalScore: number;
    finalGrade: number;
    remark?: string; 
}

export interface PublishGradeRequest {
    scheduleSubject_id : number;
    isPublished : boolean;
}

export interface Student {
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

export interface SubjectGrade {
  gradeId: number;
  finalGrade: number;
  remark: string;
  subjectName: string;
  subjectCode: string;
  credit: number;
  gradePoint: number;
  term: string;
  year: number;
}

export interface TermYearGradeGroup {
  term: string;
  year: number;
  totalGPA: number;
  totalCredit: number;
  grades: SubjectGrade[];
}

export interface UpsertStudentGradesRequest {
  student: Student;
  termYearGradeGroups: TermYearGradeGroup[];
}
