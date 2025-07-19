


export interface GetAllStudentGroupByTermYearRequest  {
    term : string;
    year : number,
}

export interface GetStudentGroupScheduleStatusRequest  {
    studentGroupId : number;
    term : string; 
    year : number
}
export interface UpdateStudentGroupByStudentGroupIdRequest {
  studentId: number[];
  studentGroup: CreateStudentGroupDto;
}

export interface CreateStudentGroupDto {
  groupName: string;
  class: string;
  groupCode: string;
  level: number;
  programId?: number;
  isPublish?: boolean;
  isComplete?: boolean;
  isActive?: boolean;
  year: number;
  term: string;
}