import {
  GetGradBySubjectId,
  GetGradPerTermByStudentIdDto,
  Subject,
} from "@/dto/gradDto";

export const fetchGetGradBySubjectId = async (
  subjectId: number,
  scheduleId: number
): Promise<GetGradBySubjectId[]> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL_V1}/api/Grade/GetGradeBySubjectAndSchedulSubjectId?subjectId=${subjectId}&scheduleSubjectId=${scheduleId}`
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
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL_V1}/api/Grade/GetStudentGradeByTermYear?studentId=${studentId}&term=${term}&year=${year}`
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
