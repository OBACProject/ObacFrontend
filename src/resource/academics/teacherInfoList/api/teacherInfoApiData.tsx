
type TeacherInfoData = {
  
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
