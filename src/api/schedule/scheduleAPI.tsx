import { GetScheduleBysubjectId, StudentGroupScheduleSubject, TeacherScheduleSubject,CreateScheduleSubjectRequest } from "@/dto/schedule";

export const fetchGetScheduleBysubjectId = async (
  subjectId: number
): Promise<GetScheduleBysubjectId> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL_V1}/api/Schedule/GetScheduleSubjectBySubjectId?subjectId=${subjectId}`
    );
    if (!response.ok) {
      throw new Error("Failed to get  data");
    }
    const text = await response.text();
    const json = JSON.parse(text);
    const data: GetScheduleBysubjectId = json.data;
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
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL_V1}/api/Schedule/GetScheduleOfTeacherByTeacherID?teacherID=${teacherID}&term=${term}&year=${year}`
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
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL_V1}/api/Schedule/GetScheduleByStudentGroupID?studentGroupId=${groupId}&term=${term}&year=${year}`
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
): Promise<void> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL_V1}/api/Schedule/CreateScheduleSubjectAsync`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to create Schedule Subject");
    }

    console.log("Schedule Subject created successfully");
  } catch (err) {
    console.log(err);
    throw err;
  }
};