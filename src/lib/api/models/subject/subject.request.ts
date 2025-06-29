

export interface GetSubjectByIdRequest {
    subjectId: number;
}

export interface CreateSubjectRequest {
    name: string;
    code: string;
    credits: number;
    term: string;
    level: number;
    class?: string;
    description?: string;
}

export interface UpdateSubjectRequest {
    id: number;
    name: string;
    code: string;
    credits: number;
    term: string;
    level: number;
    class?: string;
    description?: string;
}


export interface DeleteSubjectRequest {
    subjectId: number;
}

export interface GetSubjectByTermRequest {
    term: string;
    level: number;
    className: string;
}