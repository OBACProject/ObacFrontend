import {
  ClassCount,
  CreateAcademicRequest,
  GetAcademicDetailUserResponse,
  GetAllAcademicUser,
  GetGenderCount,
  GetUserCountRespond,
  UpdateIsActiveUserRequest,
  UpdateUserDetailRequest,
  UpdateUserPasswordRequest,
} from "@/dto/userDto";
import apiClient from "@/lib/apiClient";

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
): Promise<{ success: boolean; message?: string; status?: number }> => {
  try {
    const response = await apiClient.post("User/CreateAcademic", payload);

    const msg =
      String(response.data?.message ?? response.data?.responseMessage ?? "").trim();

    if (/This UserName Already Exists/i.test(msg)) {
      return {
        success: false,
        status: 409,
        message: "ชื่อผู้ใช้นี้ถูกใช้แล้ว โปรดใช้ชื่อผู้ใช้อื่น",
      };
    }
    if ([200, 201, 204].includes(response.status)) {
      return { success: true, status: response.status, message: "เพิ่มบัญชีฝ่ายทะเบียนสำเร็จ" };
    }

    return {
      success: false,
      status: response.status,
      message: msg || "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง",
    };
  } catch (err: any) {
    const status = err?.response?.status;
    const data = err?.response?.data || {};
    const rawMsg = String(
      data?.message || data?.responseMessage || err?.message || ""
    );

    if (/This UserName Already Exists/i.test(rawMsg)) {
      return {
        success: false,
        status: status ?? 409,
        message: "ชื่อผู้ใช้นี้ถูกใช้แล้ว โปรดใช้ชื่อผู้ใช้อื่น",
      };
    }

    // อื่น ๆ
    return {
      success: false,
      status,
      message:
        status === 400
          ? "คำขอไม่ถูกต้อง กรุณาตรวจสอบข้อมูลอีกครั้ง"
          : status === 401
          ? "คุณไม่มีสิทธิ์เข้าถึง (401)"
          : status && status >= 500
          ? "ระบบขัดข้องชั่วคราว กรุณาลองใหม่อีกครั้ง"
          : rawMsg || "ไม่สามารถติดต่อเซิร์ฟเวอร์ได้",
    };
  }
};


export const UpdateIsActiveUser = async ({
  userId,
  isActive,
}: UpdateIsActiveUserRequest): Promise<boolean> => {
  try {
    const res = await apiClient.put("Admin/UpdateUserActive", null, {
      params: { userId, isActive },
    });
    return [200, 201, 204].includes(res.status);
  } catch (err: any) {
    console.error("UpdateIsActiveUser error:", err?.response?.data || err);
    throw err;
  }
};

export const UpdateUserDetails = async (payload: UpdateUserDetailRequest) => {
  try {
    const res = await apiClient.put("Admin/UpdateUserDetails", payload);
    return [200, 201, 204].includes(res.status);
  } catch (err: any) {
    console.error("UpdateUserDetails error:", err?.response?.data || err);
    throw err;
  }
};

export const UpdateUserPassword = async ({
  userId,
  newPassword,
  confirmPassword,
}: UpdateUserPasswordRequest): Promise<boolean> => {
  try {
    const res = await apiClient.put("Admin/UpdateUserPassword", null, {
      params: { userId, newPassword, confirmPassword },
    });
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

export const GetGenderInfoCount = async (
  role: "Student"
): Promise<GetGenderCount[]> => {
  try {
    const response = await apiClient.get<{
      responseCode: string;
      responseMessage: string;
      data: GetGenderCount[];
    }>(`Dashboard/GetGenderInfoCount/${role}`);

    return response.data.data ?? [];
  } catch (err) {
    console.log("Error in GetGenderInfoCount: ", err);
    return [];
  }
};

export const GetStudentClassCount = async (): Promise<ClassCount[]> => {
  try {
    const response = await apiClient.get<{
      responseCode: string;
      responseMessage: string;
      data: ClassCount[];
    }>(`Dashboard/GetStudentClassCount`);

    return response.data.data ?? [];
  } catch (err) {
    console.log("Error in GetGenderInfoCount: ", err);
    return [];
  }
};
