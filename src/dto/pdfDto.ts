export interface Student {
  studentID: number;
  studentCode: string;
  prefix: string;
  studentFirstName: string;
  studentLastName: string;
}

export interface StudentNameListInSubject {
  subjectID: number;
  subjectCode: string;
  subjectName: string;
  groupName: string;
  students: Student[];
}

export interface StudentScorenSubject {
  subjectID: number;
  subjectCode: string;
  subjectName: string;
  subjectTeacher:string;
  hour:number;
  credits : number;
  groupName: string;
  students: StudentScore[];
}

export interface StudentScore {
  studentId: number;
  studentCode: string;
  prefix: string;
  studentFirstName: string;
  studentLastName: string;
  assignmentScore: number;
  collectScore: number;
  midtermScore: number;
  finaltermScore: number;
  affectiveScore: number;
  totalScore: number;
  grade: string;
  remark: string;
}
