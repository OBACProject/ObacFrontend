import { GetScheduleBysubjectId, StudentGroupScheduleSubject, TeacherScheduleSubject } from "@/dto/schedule";

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

export const fetchGetScheduleOfTeacherByUserID = async (
  userId: string,
  term: number,
  year: number
): Promise<TeacherScheduleSubject> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL_V1}/api/Schedule/GetScheduleOfTeacherByUserID?userId=${userId}&term=${term}&year=${year}`
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
  term: number,
  year: number
): Promise<StudentGroupScheduleSubject> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL_V1}/api/Schedule/GetScheduleByStudnetGroupID?studentGroupId=${groupId}&term=${term}&year=${year}`
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
