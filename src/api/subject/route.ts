import {
  SubjectItem,
  CreateSubjectRequest,
  UpdateSubjectRequest,
} from "@/dto/subjectDto";
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
export const GetAllActiveSubjectAsync = async (): Promise<
  SubjectItem[] | []
> => {
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

export const CreateSubject = async (
  payload: CreateSubjectRequest
): Promise<boolean> => {
  try {
    const response = await apiClient.post("Subject/CreateSubject", payload);
    return response.status === 201;
  } catch (err) {
    console.error("Error creating subject:", err);
    return false;
  }
};

export const UpdateSubject = async (payload: UpdateSubjectRequest) => {
  try {
    const res = await apiClient.put("Subject/UpdateSubject", payload);
    return res.data;
  } catch (error) {
    console.error("UpdateSubject Error:", error);
    return null;
  }
};

export const DeleteSubjectById = async (id: number): Promise<boolean> => {
  try {
    const response = await apiClient.delete(`Subject/DeleteSubject/${id}`);
    return true;
  } catch (error: any) {
    console.error("Delete failed:", error.response?.data || error.message);
    return false;
  }
};
