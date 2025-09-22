export interface GetSubjectBySubjectId {
  id: number;
  subjectCode: string;
  subjectName: string;
  credits: number;
  description: string;
  isActive: boolean;
}
export interface GetAllSubjectRespond {
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
  hour:number;
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
  hour:number;
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
  hour:number;
}

export interface CreateEnrollmentWithGradeAndScheduleRequest  {
  subjectId: number,
  teacherId: number,
  term: string,
  year: number,
  finalGrade: number,
  room: string,
  day: string,
  period: number,
  collectScore: number,
  affectiveScore: number,
  assignmentScore: number,
  midtermScore: number,
  finalTermScore: number,
  totalScore: number,
  remarks: string
}