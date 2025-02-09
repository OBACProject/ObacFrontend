export interface GetSubjectBySubjectId  {
    id: number,
    subjectCode:string ,
    subjectName:string ,
    credits: number,
    description: string,
    isActive: boolean,
}
export interface GetAllSubject {
    ID: string;
    subjectCode: string;
    subjectName: string;
    isActive: boolean;
}