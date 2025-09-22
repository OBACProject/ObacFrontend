import apiClient from "@/lib/apiClient";
import axios from "axios";
import Cookies from "js-cookie";

export interface AcademicDetailsResponse {
  academicId: number;
  name: string;
  lastName: string;
  phoneNumber: string;
  gender: string;
  isActive: boolean;
}

export const GetAcademicDetails =
  async (): Promise<AcademicDetailsResponse | null> => {
    try {
      const token = Cookies.get("token");

      if (!token) {
        console.warn("No token found in cookies.");
        return null;
      }

      const response = await apiClient.get<{
        responseCode: string;
        responseMessage: string;
        data: AcademicDetailsResponse;
      }>("Academic/GetAcademicDetails", {
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
