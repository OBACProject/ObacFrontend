"use server";
import { filterProgramsParamsData } from "@/dto/studentDto";
import api from "@/lib/apiCentralized";
import { cookies } from "next/headers";

export const filterProgramsData = async (): Promise<
  filterProgramsParamsData[]
> => {
  try {
    const token = cookies().get("token")?.value;

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
