"use server";
import {
  GetGradBySubjectId,
  GetGradPerTermByStudentIdDto,
  GetGropGradeAboveModel,
} from "@/dto/gradDto";
import { cookies } from "next/headers";

export const fetchGetGradBySubjectId = async (
  subjectId: number,
  scheduleId: number
): Promise<GetGradBySubjectId[]> => {
  try {
    const token = cookies().get("token")?.value;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL_V1}/api/Grade/GetGradeBySubjectAndSchedulSubjectId?subjectId=${subjectId}&scheduleSubjectId=${scheduleId}`,
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
    const data: GetGradBySubjectId[] = json.data;
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const fetchGetGradPerTermByStudentId = async (
  studentId: number,
  term: number,
  year: number
): Promise<GetGradPerTermByStudentIdDto[]> => {
  try {
    const token = cookies().get("token")?.value;
    if (!token) {
      throw new Error("No auth token found");
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL_V1}/api/Grade/GetStudentGradeByTermYear?studentId=${studentId}&term=${term}&year=${year}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to get data");
    }
    const text = await response.text();
    const json = JSON.parse(text);
    if (!json?.data) {
      throw new Error("API response does not contain 'data'");
    }
    const data: GetGradPerTermByStudentIdDto[] = json.data;
    return data;
  } catch (err) {
    console.error("Error fetching data:", err);
    return [];
  }
};

export const GetGropGradeAbove = async (
  grade: number,
  term: string,
  year: number,
  groupId: number
): Promise<GetGropGradeAboveModel | null> => {
  try {
    const token = cookies().get("token")?.value;
    if (!token) {
      throw new Error("No auth token found");
    }
    const queryParams = new URLSearchParams({
      grade: grade.toString(),
      term,
      year: year.toString(),
      groupId: groupId.toString(),
    });

    const url = `${process.env.NEXT_PUBLIC_API_URL_V1}/api/Grade/GetGropGradeAbove?${queryParams.toString()}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get data");
    }

    const json = await response.json();
    if (!json?.data) {
      throw new Error("API response does not contain 'data'");
    }

    const data: GetGropGradeAboveModel = json.data;
    return data;
  } catch (err) {
    console.error("Error in API fetching data:", err);
    return null;
  }
};
