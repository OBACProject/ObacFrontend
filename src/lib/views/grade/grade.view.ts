export interface GroupSummaryGradeResponse {
  generalData: GeneralData;
  students: StudentList[];
  subjects: string[];
}

export interface GeneralData {
  groupId: number;
  groupName: string;
  groupCode: string;
  class: string;
  facultyName: string;
  programName: string;
  term: string;
  year: number;
}

export interface StudentList {
  studentId: number;
  studentCode: string;
  name: string;
  gpa: number;
  gpax: number;
  totalCredit: number;
  subjects: Record<string, string>;
}

