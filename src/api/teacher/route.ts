import { CardSubjectResponse, TeacherDetails } from "@/dto/teacherDto";
import apiClient from "@/lib/apiClient";
import axios from "axios";

export const GetTeacherSchedule = async (
  teacherID: number,
  term: string,
  year: number
): Promise<CardSubjectResponse[] | null> => {
  try {
    const response = await apiClient.get<{
      responseCode: string;
      responseMessage: string;
      data: CardSubjectResponse[];
    }>(`Teacher/GetTeacherSchedule/${teacherID}/${term}/${year}`);

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

    const token = localStorage.getItem("authToken"); 
    if (!token) {
      console.warn("No auth token found.");
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