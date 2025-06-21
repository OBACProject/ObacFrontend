

export interface GetStudentGradesByTermYearRequest {
    studentId: number;
    term: string;
    year: number;
}


export interface GetStudentIfGradeBelowRequest {
    class : string;
    currentYear : number;
    grade : number;
    term : string;
    year : number;
}

export interface GetStudentGradeAboveRequest {
    grade :  number;
    term : string;
    year : number;
    groupId : number;
}

export interface GetStudentTranscriptRequest {
    studentId: number;
    year: number;
    term: string;
}

export interface GetGroupSummaryGradeRequest {
    groupId: number;
    term: string;
    year: number;
}

export interface GetGroupSummaryGradeAvailableStatusRequest {
    groupId: number;
    term: string;
    year: number;
}

export interface GetStudentGroupGradeByGroupIdTermYearRequest {
    groupId: number;
    term: string;
    year: number;
    studentId: number;
}

export interface UpdateStudentGradeRequest {
    gradeId: number;
    collectScore: number;
    testScore: number;
    affectiveScore: number;
    midtermScore: number;
    finalScore: number;
    totalScore: number;
    finalGrade: number;
    remark?: string; 
}

export interface PublishGradeRequest {
    scheduleSubject_id : number;
    isPublished : boolean;
}
