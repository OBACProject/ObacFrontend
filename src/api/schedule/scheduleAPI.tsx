"use server";
import {
  GetScheduleBysubjectId,
  StudentGroupScheduleSubject,
  TeacherScheduleSubject,
  CreateScheduleSubjectRequest,
} from "@/dto/schedule";
import { cookies } from "next/headers";

export const fetchGetScheduleBysubjectId = async (
  subjectId: number
): Promise<GetScheduleBysubjectId[]> => {
  try {
    const token = cookies().get("token")?.value;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL_V1}/api/Schedule/GetScheduleSubjectBySubjectId?subjectId=${subjectId}`,
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
    const data: GetScheduleBysubjectId[] = json.data;
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const fetchGetScheduleOfTeacherByTeacherID = async (
  teacherID: string,
  term: number,
  year: number
): Promise<TeacherScheduleSubject> => {
  try {
    const token = cookies().get("token")?.value;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL_V1}/api/Schedule/GetScheduleOfTeacherByTeacherID?teacherID=${teacherID}&term=${term}&year=${year}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch Schedule");
    }

    const text = await response.text();
    const json = JSON.parse(text);
    const data: TeacherScheduleSubject = json.data;
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const fetchGetScheduleOfStudentGroupByGroupID = async (
  groupId: number,
  term: string,
  year: number
): Promise<StudentGroupScheduleSubject> => {
  const token = cookies().get("token")?.value;
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL_V1}/api/Schedule/GetScheduleByStudentGroupID?studentGroupId=${groupId}&term=${term}&year=${year}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch Schedule");
    }
    const text = await response.text();
    const json = JSON.parse(text);
    const data: StudentGroupScheduleSubject = json.data;
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
export const fetchGetScheduleOfStudentByStudentID = async (
  studentId: number,
  term: string,
  year: number
): Promise<StudentGroupScheduleSubject> => {
  const token = cookies().get("token")?.value;
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL_V1}/api/Schedule/GetScheduleOfStudentByStudentID?studentID=${studentId}&term=${term}&year=${year}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch Schedule");
    }
    const text = await response.text();
    const json = JSON.parse(text);
    const data: StudentGroupScheduleSubject = json.data;
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const fetchCreateScheduleSubject = async (
  requestBody: CreateScheduleSubjectRequest
): Promise<any> => {
  try {
    const token = cookies().get("token")?.value;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL_V1}/api/Schedule/CreateScheduleSubjectAsync`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (!response.ok) {
      let errorMessage = `Error: ${response.status} - ${response.statusText}`;

      try {
        const errorData = await response.json();
        errorMessage += ` | ${errorData.message || JSON.stringify(errorData)}`;
      } catch {
        console.warn("Response does not contain JSON.");
      }

      throw new Error(errorMessage);
    }

    const text = await response.text();
    return text ? JSON.parse(text) : {};

    
  } catch (err) {
    console.log(err);
    throw err;
  }
};
