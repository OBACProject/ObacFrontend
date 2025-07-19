import { StudentGroupGradeResponse } from "@/dto/gradDto";
import { GetStudentDetailAndSummaryScoreByStudentCodeResponse, UpsertStudentGradesRequest } from "@/dto/gradingDto";
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
    console.log("payload : ",payload)
    const response = await apiClient.post(
      "Grade/UpsertStudentGrades",
      payload
    );
    console.log(response)
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
    }>(`Grade/GetStudentGroupGradeByScheduleSubjectId?scheduleSubjectId=${scheduleSubjectId}`);

    return response.data.data;
  } catch (error) {
    console.error("Error fetching student group grades:", error);
    return null;
  }
};
