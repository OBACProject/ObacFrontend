import { GetAllTeacherResponse } from "@/dto/teacherDto";
import { CreateAcademicRequest, GetAcademicDetailUserResponse, GetAllAcademicUser, GetUserCountRespond, UpdateIsActiveUserRequest, UpdateUserDetailRequest, UpdateUserPasswordRequest } from "@/dto/userDto";
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
    console.error("Error in GetAcademicDetailUser:", error);
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
  
    const res = await apiClient.put(
      "Admin/UpdateUserActive",
      null,
      { params: { userId, isActive } }
    );
    return [200, 201, 204].includes(res.status);
  } catch (err: any) {
    console.error("UpdateIsActiveUser error:", err?.response?.data || err);
    throw err; 
  }
};

export const UpdateUserDetails = async (payload: UpdateUserDetailRequest)=> {
  try {
    const res = await apiClient.put(
      "Admin/UpdateUserDetails",payload);
    return [200, 201, 204].includes(res.status);
  } catch (err: any) {
    console.error("UpdateUserDetails error:", err?.response?.data || err);
    throw err; 
  }
};


export const UpdateUserPassword = async (
  { userId, newPassword,confirmPassword }: UpdateUserPasswordRequest
): Promise<boolean> => {
  try {
    const res = await apiClient.put(
      "Admin/UpdateUserPassword",
      null,
      { params: { userId, newPassword,confirmPassword } }
    );
    return [200, 201, 204].includes(res.status);
  } catch (err: any) {
    console.error("UpdateUserPassword error:", err?.response?.data || err);
    throw err; 
  }
};

export const DeleteUser = async (userId: string): Promise<boolean> => {
  try {
    const response = await apiClient.delete(`Admin/DeleteUser`, {
      params: { userId },
    });
    return response.status >= 200 && response.status < 300;
  } catch (err: any) {
    console.error("DeleteUser error:", err?.response?.data || err);
    throw err;
  }
};

export const GetUserCount = async (): Promise<GetUserCountRespond> => {
  try {
    const response = await apiClient.get<{
      responseCode: string;
      responseMessage: string;
      data: GetUserCountRespond;
    }>("Admin/GetUserCount");

    return response.data.data;
  } catch (err) {
    console.log("Error in GetAllAcademicUsers: ", err);
    return {
      totalUserCount: 0,
      totalStudentCount: 0,
      totalTeacherCount: 0,
      totalAcademicCount: 0,
    };
  }
};

