import { GradingData } from "@/dto/gradingDto";
import api from "@/lib/apiCentralized";
import Cookies from "js-cookie";

export const getGradingData = async (): Promise<GradingData[]> => {
  const token = Cookies.get("token");
  try {
    const response = await api.get("Subject/GetAllActiveSubjectAsync", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch grading data.");
  }
};
