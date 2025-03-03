"use server";
import { GetAllSubject, GetSubjectBySubjectId } from "@/dto/subjectDto";
import { cookies } from "next/headers";

export const fetchGetSubjectBySubjectId = async (
  id: number
): Promise<GetSubjectBySubjectId> => {
  const token = cookies().get("token")?.value;
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL_V1}/api/Subject/GetSubjectByIdAsync?id=${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to get  data");
    }
    const text = await response.text();
    const json = JSON.parse(text);
    const data: GetSubjectBySubjectId = json.data;
    return data;
  } catch (err) {
    console.error("Error:", err);
    throw err;
  }
};

export const fetchGetAllSubject = async (): Promise<GetAllSubject[]> => {
  const token = cookies().get("token")?.value;
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL_V1}/api/Subject/GetAllSubjectAsync`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch subject");
    }
    const text = await response.text();
    const json = JSON.parse(text);

    if (!json?.data) {
      throw new Error("Invalid API response: Missing 'data' field");
    }

    const data: GetAllSubject[] = json.data;
    return data;
  } catch (err) {
    console.error("Error fetching subjects:", err);
    return [];
  }
};

export const fetchGetAllActiveSubject = async (): Promise<GetAllSubject[]> => {
  const token = cookies().get("token")?.value;
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL_V1}/api/Subject/GetAllActiveSubjectAsync`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch subject");
    }
    const text = await response.text();
    const json = JSON.parse(text);

    if (!json?.data) {
      throw new Error("Invalid API response: Missing 'data' field");
    }

    const data: GetAllSubject[] = json.data;
    return data;
  } catch (err) {
    console.error("Error fetching subjects:", err);
    return [];
  }
};
