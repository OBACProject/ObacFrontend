// data from api
export interface GradingData {
  id: number;
  subjectCode: string;
  subjectName: string;
  credits: number;
  description: string;
  isActive: boolean;
}

// data to show in columns
export interface GradingDataColumn {
  id: number;
  subjectCode: string;
  subjectName: string;
  description: string;
}
