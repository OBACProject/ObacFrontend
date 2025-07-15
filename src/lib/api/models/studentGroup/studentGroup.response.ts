


export interface GetAllStudentGroupByTermYearResponse {
    id: number;
    groupName: string;
    class: string;
    groupCode: string;
    level: number;
    programId: number | null;
    isPublish: boolean;
    isComplete: boolean;
    isActive: boolean;
    year: number;
    term: string;
    program: {
        id: number;
        name: string;
        code: string;
        level: number;
        isActive: boolean;
    } | null;
    scheduleSubjects: Array<{
        id: number;
        subjectName: string;
        subjectCode: string;
        creditHours: number;
        isActive: boolean;
    }>;
    students: Array<{
        id: number;
        prefix: string;
        name: string;
        lastName: string;
        studentCode: string;
        phoneNumber: string;
        studentGroupId: number;
        groupName: string;
        groupCode: string;
        class: string;
        level: number;
        programName: string;
        subProgramName: string;
        facultyName: string;
        gpax: number;
        status: string;
    }>;
}