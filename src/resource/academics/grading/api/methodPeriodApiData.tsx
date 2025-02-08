import { MethodDto } from "@/dto/methodDto";
import api from "@/lib/apiCentralized";

export const fetchGetAllMethodData = async (): Promise<MethodDto[]> => {
  try {
    const response = await api.get(`Method/GetAllMethod`);
    return response.data.data;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to get subject data");
  }
};

export const fetchPutMethodData = async (
  data: MethodDto
): Promise<MethodDto> => {
  try {
    const response = await api.put(`Method/UpdateMethod`, data);
    return response.data.data;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update subject data");
  }
};
