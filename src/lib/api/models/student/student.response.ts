import { SubjectDetail } from "@/dto/gradDto";


export interface GetStudentByStudentIdResponse {
    id: number;
    userId: string;
    studentCode: string;
    gpa: number | null;
    enrollYear: number;
    class: string;
    currentLevel: number;
    graduateYear: number | null;
    programId: number | null;
    studentGroupId: number;
    updatedAt: string;
    isGraduate: boolean;
    isActive: boolean;
    status: string | null;
}

export interface GetAllStudentsResponse {
    pageNumber: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
    items: {
        id: number;
        prefix: string;
        name: string;
        lastName: string;
        gender: string;
        nationality: string | null;
        birthDate: string | null;
        citizenId: string | null;
        studentCode: string;
        phoneNumber: string | null;
        studentGroupId: number;
        groupName: string;
        groupCode: string;
        class: string;
        level: number;
        programName: string | null;
        subProgramName: string | null;
        facultyName: string;
        gpax: number | null;
        status: string | null;
        programId: number;
    }[];
}
    
export interface GetStudentGradeDetailResponse {
    studentId: number;
    studentCode: string;
    firstName: string;
    lastName: string;
    class: string;
    currentLevel: number;
    groupName: string;
    facultyName: string;
    programName: string;
    subProgramName: string | null;
    gpax: number | null;
    year : yearTerm[];
}
export interface GetStudentDetailAndGradeByStudentCodeResponse {
    studentGroupId: number;
    groupName: string;
    groupCode: string;
    class: string;
    level: number;
    students: StudentDetail[];
    facultyName: string;
    programName: string;
    term: string;
    year: number;
    subjects: SubjectDetail[];
}

export interface GetStudentsByProgramIdResponse {
    id: number;
    prefix: string;
    firstName: string;
    lastName: string;
    studentCode: string;
    class: string;
    level: number;
    groupName: string;
    groupCode: string;
    currentYear: number;
    programName: string;
    subProgramName: string | null;
    facultyName: string;
}

export interface StudentDetail {
    id: number;
    prefix: string;
    firstName: string;
    lastName: string;
    studentCode: string;
    gpax: number;
    gpa: number;
    totalCredit: number;
    subjectGrade: {
        gradeId: number;
        finalGrade: number;
        remark: string;
        subjectName: string;
        subjectCode: string;
        credit: number;
        gradePoint: number;
        term: string;
        year: number;
    }[];
}



export interface yearTerm {
    term : string;
    year : number;
    totalCredit : number;
    gpa : number;
    termQueryData : termQueryData[];
}

export interface termQueryData {
    subjectName: string;
    subjectCode: string;
    gradeId: number;
    collectScore: number;
    affectiveScore: number;
    midtermScore: number;
    totalScore: number;
    credit: number;
    finalGrade: number;
    remarks: string;
}


