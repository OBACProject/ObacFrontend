export interface GetGradBySubjectId {
  [key: string]: number | string; 
    gradeId: number,
      subjectId: number,
      scheduleSubjectId:number ,
      studentGroup: string,
      studentId: number,
      studentCode:string,
      firstName:string ,
      lastName:string ,
      subjectName:string ,
      collectScore: number,
      testScore: number,
      affectiveScore: number,
      totalScore: number,
      grade:number,
}