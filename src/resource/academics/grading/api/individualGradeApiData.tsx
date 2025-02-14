import { GetAllStudent, StudentTranscriptData } from "@/dto/studentDto";
import api from "@/lib/apiCentralized";

export async function GetAllStudentDataApi(): Promise<GetAllStudent[]> {
  try {
    const response = await api.get(`Student/GetAllStudent`);
    return response.data.data;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to get student data");
  }
}

export async function GetStudentByIdDataApi(
  id: number
): Promise<StudentTranscriptData[]> {
  try {
    const response = await api.get(
      `Student/GetStudentGradeDetail?studentId=${id}`
    );
    return response.data.data;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to get student data");
  }
}
