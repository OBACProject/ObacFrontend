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
  remark: string;
}

export interface SubjectItem {
  id: number;
  name: string;
  code: string;
  credits: number;
  term: string;
  level: number;
  class: string;
  curriculumYear:number;
  description: string | null;
  isActive: boolean;
}

export interface CreateSubjectRequest {
  name: string;
  code: string;
  credits: number;
  term: string;
  level: number;
  class: string;
  curriculumYear:number;
  description: string | null;
}

export interface UpdateSubjectRequest  {
  id: number;
  name: string;
  code: string;
  credits: number;
  term: string;
  level: number;
  class: string;
  curriculumYear: number;
  description: string;
  isActive: boolean;
}