import { ClassSubjectData } from "@/dto/gradingDto";
import api from "@/lib/apiCentralized";

export const getClassSubjectData = async (
  subjectId: number,
  term: number,
  year: number
): Promise<ClassSubjectData[]> => {
  try {
    const response = await api.get(
      `Schedule/GetListOfClassBySubjectId?subjectId=${subjectId}&term=${term}&year=${year}`
    );
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch class subject data.");
  }
};
