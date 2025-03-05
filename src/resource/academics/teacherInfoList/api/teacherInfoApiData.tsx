
type TeacherInfoData = {
  runningNumber: number;
  teacherId: string;
  teacherName: string;
  teacherSurname: string;
  programs: string;
  email: string;
  phoneNumber: string;
}

import api from "@/lib/apiCentralized";

export const getTeacherInfoData = async (): Promise<TeacherInfoData[]> => {
  try {
    const response = await api.get("Teacher/GetAllActiveTeacher");
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch teacher info data.");
  }
};
