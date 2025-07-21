import { StudentGroupItem } from "@/dto/studentGroupItem";
import apiClient from "@/lib/apiClient";

export const GetAllStudentGroupByTermYear = async (
  term: string,
  year: number
): Promise<StudentGroupItem[]> => {
  try {
    const response = await apiClient.get<{
      responseCode: string;
      responseMessage: string;
      data: StudentGroupItem[];
    }>("StudentGroup/GetAllStudentGroupByTermYear", {
      params: { term, year },
    });
    return response.data.data ?? [];
  } catch (err) {
    console.log("Error in GetAllStudentGroupByTermYear : ", err);
    return [];
  }
};
