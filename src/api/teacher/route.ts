import { CardSubjectResponse, TeacherDetails } from "@/dto/teacherDto";
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
