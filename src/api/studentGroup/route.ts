import {
  GetAllStudentGroupRequest,
  StudentGroupItem,
  StudentGroupScheduleStatus,
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

