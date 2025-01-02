export interface EducationData {
  classLevel: string;
  groupsCourse: FacultyInfo[];
}
export interface FacultyInfo {
  facultyName: string;
  groupProgram: levelInfo[];
}
export interface levelInfo {
  programName: string;
  group: {
    groupId: number;
    groupName: string;
  };
}
