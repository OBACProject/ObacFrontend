import { GetAllTeacherResponse } from "@/dto/teacherDto";
import { CreateAcademicRequest, GetAcademicDetailUserResponse, GetAllAcademicUser, UpdateIsActiveUserRequest } from "@/dto/userDto";
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

export const CreateAcademic = async (
  payload: CreateAcademicRequest
): Promise<boolean> => {
  try {
    const response = await apiClient.post("User/CreateAcademic", payload);
    return [200, 201, 204].includes(response.status) 
  } catch (err: any) {
    console.error("Error creating academic:", err);
    return false;
  }
};


export const UpdateIsActiveUser = async (
  { userId, isActive }: UpdateIsActiveUserRequest
): Promise<boolean> => {
  try {
    // ✅ PUT + query string, ไม่มี body
    const res = await apiClient.put(
      "Admin/UpdateUserActive",
      null,
      { params: { userId, isActive } }
    );
    return [200, 201, 204].includes(res.status);
  } catch (err: any) {
    console.error("UpdateIsActiveUser error:", err?.response?.data || err);
    throw err; // ให้ UI ดึงข้อความไปแสดงได้
  }
};