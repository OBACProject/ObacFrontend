
export interface GetAllStudentGroupByTermYearResponse {
    id: number;
    groupName: string;
    class: string;
    groupCode: string;
    level: number;
    programId: number | null;
    programName: string | null;
    facultyName: string | null;
    isPublish: boolean;
    isComplete: boolean;
    completeStatus: string;
    isActive: boolean;
    year: number;
    term: string;
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
export interface GetStudentGroupByGroupIdResponse {
  studentGroupId: number;
  groupName: string;
  groupCode: string;
  class: string;
  level: number;
  students: StudentItems[];
}

export interface GetStudentGroupScheduleStatusResponse {
    studentGroupId : number;
    groupName : string;
    groupCode : string;
   class : string;
   level : number;
   isPublish : boolean;
   isComplete : boolean;
   schedules : Array<{
        subjectId : number;
        subjectName : string;
        SubjectCode : string;
        ScheduleSubjectsId : number;
        IsComplete : boolean ;
        IsPublish : boolean ;
        Class : string ;
        Term : string ;
        Year : number;
   }>;
}