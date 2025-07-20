import { SubjectItem } from "@/dto/subjectDto";
import apiClient from "@/lib/apiClient";

export const GetSubjectsByTermAndClass = async (
  term: string,
  className: string
): Promise<SubjectItem[] | null> => {
  try {
    const response = await apiClient.get<{
      responseCode: string;
      responseMessage: string;
      data: SubjectItem[];
    }>("Subject/GetSubjectsByTermAndClass", {
      params: {
        term,
        className,
      },
    });

    return response.data.data;
  } catch (err) {
    console.log("Error fetching subjects:", err);
    return null;
  }
};

export const GetAllSubjectAsync = async (): Promise<SubjectItem[] | []> => {
  try {
    const response = await apiClient.get<{
      responseCode: string;
      responseMessage: string;
      data: SubjectItem[];
    }>("Subject/GetAllSubjectAsync");

    return response.data.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};
export const GetAllActiveSubjectAsync = async (): Promise<SubjectItem[] | []> => {
  try {
    const response = await apiClient.get<{
      responseCode: string;
      responseMessage: string;
      data: SubjectItem[];
    }>("Subject/GetAllActiveSubjects");

    return response.data.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

