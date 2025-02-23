import { filterProgramsParamsData } from "@/dto/studentDto";
import api from "@/lib/apiCentralized";

import Cookies from "js-cookie";

export const filterProgramsData = async (): Promise<filterProgramsParamsData[]> => {
  try {
    // Retrieve token from cookies
    const token = Cookies.get("token");
    
    // Make sure token exists before making the request
    if (!token) {
      throw new Error("No auth token found in cookies.");
    }
    
    const response = await api.get("Program/GetAllProgramAsync", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch program data.");
  }
};
