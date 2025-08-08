import { GetAllProgramWithStudentGroupResponse } from "@/dto/programDto";
import { CreateEnrollmentWithGradeAndScheduleRequest } from "@/dto/subjectDto";
import apiClient from "@/lib/apiClient";


export const GetAllProgramWithStudentGroup = async (): Promise<GetAllProgramWithStudentGroupResponse[]> => {
  try {
    const response = await apiClient.get<{
      responseCode: string;
      responseMessage: string;
      data: GetAllProgramWithStudentGroupResponse[];
    }>("Program/GetAllProgramWithStudentGroup");

    return response.data.data ?? [];
  } catch (err) {
    console.log("Error in GetAllTeachers : ", err);
    return [];
  }
};