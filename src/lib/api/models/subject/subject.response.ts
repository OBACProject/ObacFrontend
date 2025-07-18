
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
    data : subject[];
}

export interface GetAllActiveSubjectsResponse {
     data : subject[];
}


export interface GetSubjectByIdResponse {
    data : subject;
}

export interface CreateSubjectResponse {
    data : subject;
}


export interface UpdateSubjectResponse {
    data : subject;
}

export interface DeleteSubjectResponse {
    data : subject;
}
export interface GetSubjectByTermResponse {
    data : subject[];
}

export interface GetSubjectsByStudentGroupIdTermYearResponse {
    scheduleSubjectId : number;
    SubjectId : number;
    SubjectName : string;
    SubjectCode : string;
    TeacherName : string;
    Term: string;
    Year: number;
    IsPublish : boolean;
    IsComplete: boolean;
}