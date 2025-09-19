"use server";
import {
  GetStudentDetailResponse,
  ScheduleSubject,
  StudentTranscript,
} from "@/dto/student-account-dto";
import apiClient from "@/lib/apiClient";
import { cookies } from "next/headers";

export const GetStudentDetail =
  async (): Promise<GetStudentDetailResponse | null> => {
    try {
      const cookieStore = cookies();
      const token = cookieStore.get("token")?.value;

      const response = await apiClient.get<{
        responseCode: string;
        responseMessage: string;
        data: GetStudentDetailResponse;
      }>("Student/GetStudentDetail", {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      return response.data.data ?? null;
    } catch (err) {
      console.error("Error in api GetStudentDetail", err);
      return null;
    }
  };

export const GetStudentTranscript =
  async (): Promise<StudentTranscript | null> => {
    try {
      const cookieStore = cookies();
      const token = cookieStore.get("token")?.value;

      const response = await apiClient.get<{
        responseCode: string;
        responseMessage: string;
        data: StudentTranscript;
      }>("Student/GetStudentTranscript", {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      return response.data.data ?? null;
    } catch (err) {
      console.error("Error in api GetStudentTranscript", err);
      return null;
    }
  };

export const GetStudentScheduleByStudentIdTermYear = async (
  term: string,
  year: number
): Promise<ScheduleSubject[] | null> => {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    const response = await apiClient.get<{
      responseCode: string;
      responseMessage: string;
      data: ScheduleSubject[];
    }>(
      `Student/GetStudentScheduleByStudentIdTermYear?term=${term}&year=${year}'`,
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      }
    );

    return response.data.data ?? [];
  } catch (err) {
    console.error("Error in api GetStudentScheduleByStudentIdTermYear", err);
    return [];
  }
};
