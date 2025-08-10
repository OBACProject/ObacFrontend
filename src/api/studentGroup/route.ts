import {
  StudentGroupItem,
  StudentGroupResponse,
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

export const GetStudentListByClass = async (
  className: string,
  level: number
): Promise<StudentGroupResponse[]> => {
  try {
    const response = await apiClient.get<{
      responseCode: string;
      responseMessage: string;
      data: StudentGroupResponse[];
    }>(`Student/GetStudentListByClass?className=${className}&level=${level}`);
    return response.data.data ?? [];
  } catch (err) {
    console.error("Error in api GetStudentListByClass ", err);
    return [];
  }
};
