export interface GetScheduleBysubjectId {
  scheduleSubjectId: number;
  scheduleId: number;
  subjectId: number;
  studentGroupId: number;
  studentGroupName: string;
  room: string;
  isPublish: boolean;
  isComplete: boolean;
  subjectCode: string;
  subjectName: string;
  teacherName: string;
  studentCount: number;
  day: string;
  period: number;
  year: number;
  term: number;
}
