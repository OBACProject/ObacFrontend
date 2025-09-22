


export interface CreateEnrollmentWithGradeAndScheduleRequest {
    studentId: number; 
    subjectId: number;
    term: string; 
    year: number;
    finalGrade: number; 
    room: string; 
    day: string; 
    period: number;
    studentGroupId: number; 
    collectScore: number; 
    testScore: number; 
    affectiveScore: number; 
    midtermScore: number; 
    totalScore: number;
    remarks: string;
}

