
import {
  CardSubjectResponse,
  CreateTeacherRequest,
  GetAllTeacherResponse,
  GetTeacherDetailUserResponse,
  TeacherDetailAndScheduleResponse,
  TeacherDetails,
  UpdateTeacherUserRequest,
} from "@/dto/teacherDto";
import apiClient from "@/lib/apiClient";
import axios from "axios";
import Cookies from "js-cookie";

export const GetTeacherSchedule = async (
  term: string,
  year: number
): Promise<CardSubjectResponse[] | null> => {
  try {
    const token = Cookies.get("token");
    const response = await apiClient.get<{
      responseCode: string;
      responseMessage: string;
      data: CardSubjectResponse[];
    }>(`Teacher/GetTeacherSchedule/${term}/${year}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      const errorMessage =
        err.response?.data?.error?.message || "Unknown error occurred";
      console.log("API Teacher Error:", errorMessage);
    } else {
      console.log("Unexpected Error:", err);
    }
    return [];
  }
};

export const GetTeacherDetails = async (): Promise<TeacherDetails | null> => {
  try {
    const token = Cookies.get("token");

    if (!token) {
      console.warn("No token found in cookies.");
      return null;
    }

    const response = await apiClient.get<{
      responseCode: string;
      responseMessage: string;
      data: TeacherDetails;
    }>("Teacher/GetTeacherDetails", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data;
  } catch (err) {
    console.error("Error fetching teacher details:", err);
    return null;
  }
};

export const GetAllTeachers = async (): Promise<GetAllTeacherResponse[]> => {
  try {
    const response = await apiClient.get<{
      responseCode: string;
      responseMessage: string;
      data: GetAllTeacherResponse[];
    }>("Teacher/GetAllTeachers");

    return response.data.data ?? [];
  } catch (err) {
    console.log("Error in GetAllTeachers : ", err);
    return [];
  }
};
export const GetAllTeacherUsers = async (): Promise<GetAllTeacherResponse[] | []> => {
  try {
    const response = await apiClient.get("Admin/GetAllTeacherUsers");
    const users = response.data?.data?.users;
    return Array.isArray(users) ? users : [];
  } catch (err) {
    console.log("Error in GetAllTeachers : ", err);
    return [];
  }
};


export const GetTeacherDetailUser = async (
  teacherId: number
): Promise<GetTeacherDetailUserResponse | null> => {
  try {
    const response = await apiClient.get<{
      responseCode: string;
      responseMessage: string;
      data: GetTeacherDetailUserResponse;
    }>("Admin/GetTeacherDetails", {
      params: { teacherId },
    });

    return response.data?.data ?? null;
  } catch (err) {
    console.error("Error in GetTeacherDetailUser: ", err);
    return null;
  }
};

export const GetTeacherDetailAndSchedule = async (
  teacherId: number,
  term: string,
  year: number
): Promise<TeacherDetailAndScheduleResponse | null> => {
  try {
    const response = await apiClient.get<{
      responseCode: string;
      responseMessage: string;
      data: TeacherDetailAndScheduleResponse;
    }>(`Teacher/GetTeacherDetailAndSchedule/${teacherId}/${term}/${year}`);

    return response.data.data ?? null;
  } catch (error) {
    console.error("Error fetching teacher detail and schedule:", error);
    return null;
  }
};

const t = (msg?: string) => {
  if (!msg) return msg;
  if (/This UserName Already Exists/i.test(msg)) return "ชื่อผู้ใช้นี้ถูกใช้แล้ว โปรดใช้ชื่อผู้ใช้อื่น";
  if (/This TeacherCode Already Exists/i.test(msg)) return "รหัสอาจารย์นี้ถูกใช้แล้ว โปรดใช้รหัสอื่น";
  return msg;
};

export const CreateTeacher = async (
  payload: CreateTeacherRequest
): Promise<{ success: boolean; message?: string }> => {
  try {
    const res = await apiClient.post("User/CreateTeacher", payload);
    const msg = t(String(res.data?.message ?? res.data?.responseMessage ?? ""));
    if ([200, 201, 204].includes(res.status)) {
      // ถ้า backend ใส่ข้อความ error มาใน 200 จะถูกแปลและส่งกลับเป็น error
      if (/ชื่อผู้ใช้นี้ถูกใช้แล้ว|รหัสอาจารย์นี้ถูกใช้แล้ว/.test(msg ?? "")) {
        return { success: false, message: msg };
      }
      return { success: true, message: "เพิ่มบัญชีอาจารย์สำเร็จ" };
    }
    return { success: false, message: msg || "เกิดข้อผิดพลาด กรุณาลองอีกครั้ง" };
  } catch (err: any) {
    const raw = err?.response?.data?.message || err?.response?.data?.responseMessage || err?.message;
    return { success: false, message: t(String(raw)) || "ไม่สามารถติดต่อเซิร์ฟเวอร์ได้" };
  }
};



export const UpdateTeacherUser = async (payload: UpdateTeacherUserRequest) => {
  try {
  
    const res = await apiClient.put("Teacher/UpdateTeacherUser", payload);
    return res.data;
  } catch (error) {
    console.error("UpdateTeacherUser Error:", error);
    return null;
  }
};
