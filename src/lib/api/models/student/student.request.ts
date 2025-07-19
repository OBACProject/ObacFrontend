

export interface GetStudentByStudentIdRequest {
    studentId: number;
}

export interface GetStudentGradeDetailRequest {
    studentId: number;
}

export interface UpdateStudentStatusRequest {
    studentId: number;
    status: string;
}

export interface UpdateStudentRequest {
    studentId: number;
    prefix?: string;
    firstName?: string;
    lastName?: string;
    gender?: string;
    studentGroupId?: number;
    studentCode?: string;
    gpa?: number;
    citizenId?: string;
    phoneNumber?: string;
    enrollYear?: number;
    currentLevel?: number;
    graduateYear?: number;
    programId?: number;
    birthDate?: string;
    isActive?: boolean;
    status?: string;
    noReceipt?: string;
}

export interface GetStudentListInStudentGroupRequest {
    className : string;
    level : number;
    groupName : string;
}

export interface GetStudentListByClassRequest {
    className: string;
    level: number;
}

export interface GetStudentDetailAndGradeByStudentCodeRequest {
    className  : string;
    level: number;
    groupName: string;
    year : number;
    term : string;
}

export interface GetStudentsByProgramIdRequest {
    programId: number;
}