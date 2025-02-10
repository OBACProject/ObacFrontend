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

export interface ScheduleSubject {
  groupName: string;
  subjectName: string;
  subjectCode: string;
  day: string;
  period: string;
  room: string;
  class: string;
  credit: number;
}
export type TeacherScheduleSubject = {
  day: string;
  scheduleSubjects: ScheduleSubject[];
};

export type StudentGroupScheduleSubject = {
  day: string;
  scheduleSubjects: ScheduleSubject[];
};
