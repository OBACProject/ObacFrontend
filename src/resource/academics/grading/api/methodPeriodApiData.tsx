"use server";
import { MethodDto } from "@/dto/methodDto";
import api from "@/lib/apiCentralized";
import { cookies } from "next/headers";

export const fetchGetAllMethodData = async (): Promise<MethodDto[]> => {
  const token = cookies().get("token")?.value;

  try {
    const response = await api.get(`Method/GetAllMethod`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to get subject data");
  }
};

export const fetchPutMethodData = async (
  data: MethodDto
): Promise<MethodDto> => {
  const token = cookies().get("token")?.value;
  try {
    const response = await api.put(`Method/UpdateMethod`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update subject data");
  }
};
