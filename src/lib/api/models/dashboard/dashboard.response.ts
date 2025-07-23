

export interface DashboardGetGenderInfoCountResponse {
    gender : string; 
    count : number; 
}

export interface DashboardGetStudentClassCountResponse {
    class : string; 
    count : number; 
}

export interface DashboardGetStudentClassCountDtosResponse {
    class : string;
    level : number;
    genderCount :{
        gender: string;
        count: number;
    }
}