import { GetAllTeacherResponse } from "@/dto/teacherDto";
import { GetAcademicDetailUserResponse, GetAllAcademicUser } from "@/dto/userDto";
import apiClient from "@/lib/apiClient";
import { cookies } from "next/headers";

export const GetAllAcademicUsers = async (): Promise<GetAllAcademicUser[]> => {
  try {
    const response = await apiClient.get<{
      responseCode: string;
      responseMessage: string;
      data: {
        users: GetAllAcademicUser[];
        totalCount: number;
      };
    }>("Admin/GetAllAcademicUsers");

    return response.data.data.users ?? [];
  } catch (err) {
    console.log("Error in GetAllAcademicUsers: ", err);
    return [];
  }
};

export const GetAcademicDetailUser = async (
  academicId: number
): Promise<GetAcademicDetailUserResponse | null> => {
  try {
    const response = await apiClient.get<{
      responseCode: string;
      responseMessage: string;
      data: GetAcademicDetailUserResponse;
    }>(`/Admin/GetAcademicDetails?academicId=${academicId}`);
    return response.data.data ?? null;
  } catch (error) {
    console.error("❌ Error in GetAcademicDetailUser:", error);
    return null;
  }
};