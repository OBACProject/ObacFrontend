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
  term: string;
}

export interface ScheduleSubject {
  groupName: string;
  subjectName: string;
  subjectCode: string;
  teacherName: string;
  teacherLastName: string;
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
  groupName: string;
  class: string;
  year: string;
  term: string;
  totalCredit: number;
  totalSubject: number;
  scheduleSubjects: ScheduleSubject[];
};
export type CreateScheduleSubjectRequest = {
  day: string;
  period: string;
  subject_id: number;
  year: number;
  term: string;
  student_group_id: number;
  teacher_id: number;
  room: string;
};
