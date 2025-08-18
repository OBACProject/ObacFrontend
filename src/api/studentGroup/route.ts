import {
  CreateStudentGroupRequest,
  GetAllStudentGroupRequest,
  StudentGroupItem,
  StudentGroupResponse,
  StudentGroupScheduleStatus,
  UpdateStudentGroupActiveRequest,
} from "@/dto/studentGroupItem";
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

export const GetStudentGroupScheduleStatus = async (
  studentGroupId: number,
  term: string,
  year: number
): Promise<StudentGroupScheduleStatus | null> => {
  try {
    const response = await apiClient.get<{
      responseCode: string;
      responseMessage: string;
      data: StudentGroupScheduleStatus;
    }>(
      `StudentGroup/GetStudentGroupScheduleStatus?studentGroupId=${studentGroupId}&term=${term}&year=${year}`
    );
    return response.data.data ?? null;
  } catch (error) {
    console.error("Failed to fetch student group schedule status", error);
    return null;
  }
};

export const GetStudentListByClassLevelTermYear = async (
  className: string,
  level: number,
  term: string,
  year: number
): Promise<StudentGroupResponse[]> => {
  try {
    const response = await apiClient.get<{
      responseCode: string;
      responseMessage: string;
      data: StudentGroupResponse[];
    }>(
      `Student/GetStudentListByClassLevelTermYear?className=${className}&level=${level}&term=${term}&year=${year}`
    );
    return response.data.data ?? [];
  } catch (err) {
    console.error("Error in api GetStudentListByClass ", err);
    return [];
  }
};

export const GetAllStudentGroup = async (): Promise<GetAllStudentGroupRequest[]> => {
  try {
    const response = await apiClient.get<{
      responseCode: string;
      responseMessage: string;
      data: GetAllStudentGroupRequest[];
    }>("StudentGroup/GetAllStudentGroup");

    return response.data.data ?? [];
  } catch (err) {
    console.log("Error in GetAllStudentGroup : ", err);
    return [];
  }
};

export const CreateStudentGroup = async (
  payload: CreateStudentGroupRequest
): Promise<boolean> => {
  try {
    const response = await apiClient.post("StudentGroup/CreateStudentGroup", payload);
    return [200, 201, 204].includes(response.status) 
  } catch (err: any) {
    console.error("Error creating academic:", err);
    return false;
  }
};

export const UpdateStudentGroupActive = async (
  { studentGroupId, isActive }: UpdateStudentGroupActiveRequest
): Promise<boolean> => {
  try {
  
    const res = await apiClient.put(
      "StudentGroup/UpdateStudentGroupActive",
      null,
      { params: { studentGroupId, isActive } }
    );
    return [200, 201, 204].includes(res.status);
  } catch (err: any) {
    console.error("UpdateStudentGroupActive error:", err?.response?.data || err);
    throw err; 
  }
};

export const DeleteStudentGroupById = async (id: number): Promise<boolean> => {
  try {
    const res = await apiClient.delete("StudentGroup/DeleteStudentGroup", {
      params: { studentGroupId: id }, 
    });
    return [200, 201, 204].includes(res.status);
  } catch (err: any) {
    console.error("DeleteStudentGroupById error:", err?.response?.data || err);
    throw err; 
  }
};
