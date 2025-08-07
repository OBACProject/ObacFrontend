import { GetAllStudent, GetAllStudentUser, GetStudentDetailResponse, StudentGroupDetail } from "@/dto/studentDto";
import apiClient from "@/lib/apiClient";

export const GetStudentGroupByGroupId = async (
  groupID: number
): Promise<StudentGroupDetail | null> => {
  try {
    const response = await apiClient.get<{
      responseCode: string;
      responseMessage: string;
      data: StudentGroupDetail;
    }>(`StudentGroup/GetStudentGroupByGroupId?studentGroupId=${groupID}`);
    return response.data.data ?? null;
  } catch (err) {
    console.log("Error in API route.ts GetStudentGroupByGroupId : ", err);
    return null;
  }
};
export const GetStudentByStudentId = async (
  StudentId : Number
): Promise<StudentGroupDetail | null> => {
  try {
    const response = await apiClient.get<{
      responseCode: string;
      responseMessage: string;
      data: StudentGroupDetail;
    }>(`StudentGroup/GetStudentByStudentId?studentGroupId=${StudentId}`);
    return response.data.data ?? null;
  } catch (err) {
    console.log("Error in API route.ts GetStudentByStudentId : ", err);
    return null;
  }
};
export const GetAllStudents = async (): Promise<GetAllStudentUser[] | []> => {
  try {
    const response = await apiClient.get("Admin/GetAllStudentUsers");
    console.log("📦 Response from API:", response.data);

    const users = response.data?.data?.users;

    return Array.isArray(users) ? users : [];
  } catch (err) {
    console.log("❌ Error in GetAllStudents:", err);
    return [];
  }
};

export const GetStudentDetailById = async (
  studentId: number
): Promise<GetStudentDetailResponse | null> => {
  try {
    const response = await apiClient.get<{
      responseCode: string;
      responseMessage: string;
      data: GetStudentDetailResponse;
    }>("/Admin/GetStudentDetails", {
      params: { studentId },
    });

    console.log("📦 Response from API:", response.data);
    return response.data?.data ?? null;
  } catch (err) {
    console.error("❌ Error in GetStudentDetailById: ", err);
    return null;
  }
};
