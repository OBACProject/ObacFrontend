import { GradingData } from "@/dto/gradingDto";
import api from "@/lib/apiCentralized";

export const getGradingData = async (): Promise<GradingData[]> => {
  try {
    const response = await api.get("Subject/GetAllActiveSubjectAsync");
    // const editResponse =
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch grading data.");
  }
};
