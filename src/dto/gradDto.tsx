export interface GetGradBySubjectId {
  [key: string]: number | string; 
    gradeId: number,
      subjectId: number,
      scheduleSubjectId:number ,
      studentId: number,
      firstName:string ,
      lastName:string ,
      subjectName:string ,
      collectScore: number,
      testScore: number,
      affectiveScore: number,
      totalScore: number,
      grade:number,
}