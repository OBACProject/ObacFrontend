import { StudentInfoByGroupId } from "@/dto/studentDto";
import api from "@/lib/apiCentralized";

export const getStudentByGroupId = async (
  groupId: number
): Promise<StudentInfoByGroupId[]> => {
  try {
    const response = await api.get(
      `Student/GetStudentListByGroupID?groupid=${groupId}`
    );
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch student data.");
  }
};
