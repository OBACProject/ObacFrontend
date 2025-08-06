import { GetAllTeacherResponse } from "@/dto/teacherDto";
import { GetAllAcademicUser } from "@/dto/userDto";
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