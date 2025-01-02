import { filterProgramsParamsData } from "@/dto/studentDto";
import api from "@/lib/apiCentralized";

export const filterProgramsData = async (): Promise<
  filterProgramsParamsData[]
> => {
  try {
    const response = await api.get("Program/GetAllProgramAsync");
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch program data.");
  }
};
