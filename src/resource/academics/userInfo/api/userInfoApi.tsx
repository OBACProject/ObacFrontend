"use server";
import { GetUserInfoById } from "@/dto/userDto";
import api from "@/lib/apiCentralized";
import { cookies } from "next/headers";

export const fetchGetUserInfoById = async (
  userId: string
): Promise<GetUserInfoById> => {
  try {
    const token = cookies().get("token")?.value;
    const response = await api.get(`User/GetUserInfoById?userId=${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to get user data");
  }
};
