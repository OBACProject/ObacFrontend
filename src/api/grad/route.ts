import {
  BulkUpdateStudentGradeResponse,
  StudentGradesResponse,
  StudentGroupGrade,
  StudentGroupGradeResponse,
  StudentGroupGrades,
} from "@/dto/gradDto";
import {
  GetStudentDetailAndSummaryScoreByStudentCodeResponse,
  UpsertStudentGradesRequest,
} from "@/dto/gradingDto";
import apiClient from "@/lib/apiClient";

export const GetStudentDetailAndSummaryScoreByStudentCode = async (
  studentCode: string
): Promise<GetStudentDetailAndSummaryScoreByStudentCodeResponse | null> => {
  try {
    const response = await apiClient.get<{
      responseCode: string;
      responseMessage: string;
      data: GetStudentDetailAndSummaryScoreByStudentCodeResponse;
    }>(`Grade/GetStudentDetailAndSummaryScoreByStudentCode`, {
      params: { studentCode },
    });

    return response.data.data;
  } catch (err) {
    console.error("Error fetching student details:", err);
    return null;
  }
};

export const UpsertStudentGrades = async (
  payload: UpsertStudentGradesRequest
): Promise<boolean> => {
  try {
    const response = await apiClient.put("Grade/UpsertStudentGrades", payload);
    return response.status === 200;
  } catch (err) {
    console.error("Error upserting student grades:", err);
    return false;
  }
};

export const GetStudentGroupGradeByScheduleSubjectId = async (
  scheduleSubjectId: number
): Promise<StudentGroupGradeResponse | null> => {
  try {
    const response = await apiClient.get<{
      responseCode: string;
      responseMessage: string;
      data: StudentGroupGradeResponse;
    }>(
      `Grade/GetStudentGroupGradeByScheduleSubjectId?scheduleSubjectId=${scheduleSubjectId}`
    );

    return response.data.data;
  } catch (error) {
    console.error("Error fetching student group grades:", error);
    return null;
  }
};

export const BulkUpdateStudentGradeByScheduleSubjectId = async (
  scheduleSubjectID: number,
  payload: StudentGroupGrade[]
): Promise<BulkUpdateStudentGradeResponse | null> => {
  try {
    const response = await apiClient.put<BulkUpdateStudentGradeResponse>(
      `Grade/BulkUpdateStudentGradeByScheduleSubjectId?scheduleSubjectId=${scheduleSubjectID}`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "text/plain",
        },
      }
    );
    return response.data;
  } catch (err) {
    console.error("API error:", err);
    return null;
  }
};

export const BulkGetStudentGradeByStudentGroupId = async (
  groupID: number
): Promise<StudentGroupGrades | null> => {
  try {
    const response = await apiClient.get<{
      responseCode: string;
      responseMessage: string;
      data: StudentGroupGrades;
    }>(`Grade/BulkGetStudentGradeByStudentGroupId?studentGroupId=${groupID}`);

    const data = response.data.data;

    if (data && data.studentGrades) {
      data.studentGrades.sort((a, b) =>
        a.studentCode.localeCompare(b.studentCode, "en", { numeric: true })
      );
    }

    return data;
  } catch (error) {
    console.error("Error fetching student group grades:", error);
    return null;
  }
};

export const BulkGetStudentGradeByStudentId = async (
  studentID: number
): Promise<StudentGradesResponse | null> => {
  try {
    const response = await apiClient.get<{
      responseCode: string;
      responseMessage: string;
      data: StudentGradesResponse;
    }>(`Grade/BulkGetStudentGradeByStudentId?studentId=${studentID}`);

    return response.data.data;
  } catch (error) {
    console.error("Error fetching student group grades:", error);
    return null;
  }
};
