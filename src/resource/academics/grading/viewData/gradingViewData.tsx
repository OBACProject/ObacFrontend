import { GradingData, GradingDataColumn } from "@/dto/gradingDto";
import { getGradingData } from "../api/gradingApiData";

export const getGradingViewData = async (): Promise<GradingDataColumn[]> => {
  try {
    const data = await getGradingData();
    console.log("Fetched Data:", data);

    const gradingDataColumn = data.map((item: GradingData) => ({
      id: item.id,
      subjectCode: item.subjectCode,
      subjectName: item.subjectName,
      description: item.description,
    }));

    return gradingDataColumn;
  } catch (error) {
    console.error("Error in getGradingViewData:", error);
    throw new Error("Failed to convert to grading view data.");
  }
};
