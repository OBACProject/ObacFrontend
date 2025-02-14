export interface GetSubjectBySubjectId {
  id: number;
  subjectCode: string;
  subjectName: string;
  credits: number;
  description: string;
  isActive: boolean;
}
export interface GetAllSubject {
  id: number;
  subjectCode: string;
  subjectName: string;
  credits: number;
  isActive: boolean;
}

export interface GetSubjectByGroupId {
  subjectName: string;
  subjectCode: string;
  grade: string;
  credit: number;
}
