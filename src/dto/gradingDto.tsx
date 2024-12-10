// data from api
export interface GradingData {
  id: number;
  subjectCode: string;
  subjectName: string;
  credits: number;
  description: string;
  isActive: boolean;
}

export interface ClassSubjectData {
  scheduleSubjectId: number;
  scheduleId: number; // ไม่เอา
  subjectId: number;
  studentGroupId: number;
  studentGroupName: string;
  room: string;
  isPublish: boolean;
  subjectCode: string; // ไม่เอาคับ
  subjectName: string; // ไม่เอาคับ
  day: string;
  period: string;
  teacherName: string;
  year: number; // ไม่เอา
  term: number; // ไม่เอา
}

// data to show in columns
export interface GradingDataColumn {
  id: number;
  subjectCode: string;
  subjectName: string;
  description: string;
}

export interface ClassSubjectColumn {
  id: number;
  day: string;
  period: string;
  room: string;
  teacherName: string;
  isPublish: boolean;
}

export interface GradingInfo {}
