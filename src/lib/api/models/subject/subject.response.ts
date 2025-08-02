interface subject {
  id: number;
  name: string;
  code: string;
  credits: number;
  term: string;
  level: number;
  class?: string;
  description?: string | null;
  isActive: boolean;
}
export interface GetAllSubjectAsyncResponse {
    id: number;
    name: string;
    code: string;
    credits: number;
    term: string;
    level: number;
    class?: string;
    description?: string | null;
    isActive: boolean;
}

export interface GetAllActiveSubjectsResponse {
    id: number;
    name: string;
    code: string;
    credits: number;
    term: string;
    level: number;
    class?: string;
    description?: string | null;
    isActive: boolean;
}

export interface GetSubjectByIdResponse {
    id: number;
    name: string;
    code: string;
    credits: number;
    term: string;
    level: number;
    class?: string;
    description?: string | null;
    isActive: boolean;
}

export interface CreateSubjectResponse {
    id: number;
    name: string;
    code: string;
    credits: number;
    term: string;
    level: number;
    class?: string;
    description?: string | null;
    isActive: boolean;
}

export interface UpdateSubjectResponse {
    id: number;
    name: string;
    code: string;
    credits: number;
    term: string;
    level: number;
    class?: string;
    description?: string | null;
    isActive: boolean;
}

export interface DeleteSubjectResponse {
    id: number;
    name: string;
    code: string;
    credits: number;
    term: string;
    level: number;
    class?: string;
    description?: string | null;
    isActive: boolean;
}
export interface GetSubjectByTermResponse {
  data: subject[];
}


export interface GetSubjectsByStudentGroupIdTermYearResponse {
    class : string;
    groupName : string;
    subjects : {
        scheduleSubjectId: number;
        subjectId: number;
        subjectName: string;
        subjectCode: string;
        teacherName: string;
        term: string;
        year: number;
        isPublish: boolean;
        isComplete: boolean;
    }
}

export interface GetSubjectByStudentId {
  scheduleSubjectId: number;
      SubjectId: number;
      SubjectName: string;
      SubjectCode: string;
      TeacherName: string;
      Term: string;
      Year: number;
      IsPublish: boolean;
      IsComplete: boolean;
}
