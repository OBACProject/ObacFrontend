"use server";

import apiClient from "@/lib/apiClient";
import { cookies } from "next/headers";

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export const ChangePassword = async (
  payload: ChangePasswordRequest
): Promise<boolean> => {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    const response = await apiClient.put("Auth/ChangePassword", payload, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    console.log(response.data)
    console.log("success")
    return true;
  } catch (err) {
    console.error("Error in ChangePassword API:", err);
    return false;
  }
};
