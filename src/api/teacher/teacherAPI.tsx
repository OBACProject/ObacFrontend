"use server";
import {
  GetAllTeacher,
  GetTeacherByTeacherId,
  TeacherEnrollment,
} from "@/dto/teacherDto";
import { cookies } from "next/headers";

export const fetchGetAllTeacherAsync = async (): Promise<GetAllTeacher[]> => {
  try {
    const token = cookies().get("token")?.value
    const api = process.env.NEXT_PUBLIC_API_URL_V1;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL_V1}/api/Teacher/GetAllTeacher`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch teacher data");
    }
    const text = await response.text();
    const json = JSON.parse(text);
    const data: GetAllTeacher[] = json.data;
    return data;
  } catch (err) {
    console.error("Error fetching teacher data:", err);
    throw err;
  }
};
export const fetchGetTeacherByTeacherIdAsync = async (
  id: number
): Promise<GetTeacherByTeacherId> => {
  try {
    const token = cookies().get("token")?.value;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL_V1}/api/Teacher/GetTeacherByTeacherId?teacherId=${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to get teacher data");
    }
    const text = await response.text();
    const json = JSON.parse(text);
    const data: GetTeacherByTeacherId = json.data;
    return data;
  } catch (err) {
    console.error("Error:", err);
    throw err;
  }
};

export const fetchGetTeacherEnrollmentsByTeacherId = async (
  teacherId: number,
  term: number,
  year: number
): Promise<TeacherEnrollment[]> => {
  try {
    const token = cookies().get("token")?.value;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL_V1}/api/Teacher/GetTeacherEnrollmentsByTeacherId?teacherId=${teacherId}&term=${term}&year=${year}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to get teacher enrollment data");
    }
    const text = await response.text();
    const json = JSON.parse(text);
    const data: TeacherEnrollment[] = json.data;
    return data;
  } catch (err) {
    console.error("Error:", err);
    throw err;
  }
};

export const fetchTeacherUser = async (
): Promise<GetTeacherByTeacherId> => {
  try {
    const userId = cookies().get("userId")?.value;
    const token = cookies().get("token")?.value;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL_V1}/api/Teacher/GetTeacherByUserId?userId=${userId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to get teacher data");
    }
    const text = await response.text();
    const json = JSON.parse(text);
    const data: GetTeacherByTeacherId = json.data;
    return data;
  } catch (err) {
    console.error("Error:", err);
    throw err;
  }
};

