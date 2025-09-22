import { GetAllProgramsResponse, GetAllProgramWithStudentGroupResponse } from "@/dto/programDto";
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
    console.log("Error in GetAllProgramWithStudentGroup : ", err);
    return [];
  }
};
export const GetAllPrograms = async (): Promise<GetAllProgramsResponse[]> => {
  try {
    const response = await apiClient.get<{
      responseCode: string;
      responseMessage: string;
      data: GetAllProgramsResponse[];
    }>("Admin/GetAllPrograms");

    return response.data.data ?? [];
  } catch (err) {
    console.log("Error in GetAllPrograms : ", err);
    return [];
  }
};
