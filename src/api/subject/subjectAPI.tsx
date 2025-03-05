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
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
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

export const fetchAddSubject = async (
  addSubjectCode: string,
  addSubjectName: string
): Promise<boolean> => {
  try {
    const token = cookies().get("token")?.value;
    if (!token) {
      console.error("No authentication token found.");
      return false;
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL_V1}/api/Grade/UpdateStudentGrade`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ addSubjectCode, addSubjectName }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `API error: ${response.status} ${response.statusText} | ${errorText}`
      );
      return false;
    }

    return true;
  } catch (err) {
    console.error("Error adding subject:", err);
    return false;
  }
};

export const fetchUpdateSubject = async (
  id: number,
  subjectCode: string,
  subjectName: string,
  credits: number,
  isActive: boolean
): Promise<boolean> => {
  try {
    const token = cookies().get("token")?.value;
    if (!token) {
      console.error("No authentication token found.");
      return false;
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL_V1}/api/Subject/UpdateSubject`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id,
          subjectCode,
          subjectName,
          credits,
          isActive,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `API error: ${response.status} ${response.statusText} | ${errorText}`
      );
      return false;
    }
    return true;
  } catch (err) {
    console.error("Error updating subject:", err);
    return false;
  }
};
