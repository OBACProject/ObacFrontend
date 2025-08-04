import { CreateEnrollmentWithGradeAndScheduleRequest } from "@/dto/subjectDto";
import apiClient from "@/lib/apiClient";

interface ApiResponse<T> {
  responseCode: string;
  responseMessage: string;
  data: T;
  error?: {
    code: string;
    message: string;
  };
}

export const CreateEnrollmentWithGradeAndSchedule = async (
  studentGroupId: number,
  payload: CreateEnrollmentWithGradeAndScheduleRequest
): Promise<{ success: boolean; error?: string }> => {
  try {
    console.log(payload);
    const response = await apiClient.post(
      `Enrollment/CreateEnrollmentWithGradeAndSchedule?studentGroupId=${studentGroupId}`,
      payload
    );
    return { success: true };
  } catch (error: any) {
    const errorMsg =
      error.response?.data?.message || error.message || "Unknown error";
    console.error("CreateEnrollment failed:", errorMsg);
    return { success: false, error: errorMsg };
  }
};

export const DeleteEnrollmentGradeAndScheduleByScheduleSubjectId = async (
  scheduleSubjectId: number
): Promise<{ success: boolean; error?: string }> => {
  try {
    const res = await apiClient.delete<ApiResponse<boolean>>(
      "Enrollment/DeleteEnrollmentGradeAndScheduleByScheduleSubjectId",
      { params: { scheduleSubjectId } }
    );

    if (res.data.data) {
      return { success: true };
    } else {
      return { success: false, error: res.data.responseMessage };
    }
  } catch (err: any) {
    const msg =
      err.response?.data?.error?.message ||
      err.response?.data?.responseMessage ||
      err.message ||
      "Unknown error";
    console.error(
      "DeleteEnrollmentGradeAndScheduleByScheduleSubjectId failed:",
      msg
    );
    return { success: false, error: msg };
  }
};
