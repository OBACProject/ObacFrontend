export type GetAllProgram = {
    programId : number;
  facultyName: string;
  programName: string;
  class: string;
  groupId: number;
  groupName: string;
  groupCode: string;
};


export type GetAllProgramWithStudentGroupResponse = {
    programId : number;
  facultyName: string;
  programName: string;
  subProgramName: string;
  class: string;
  groupId: number;
  groupName: string;
  groupCode: string;
  level: number;
};