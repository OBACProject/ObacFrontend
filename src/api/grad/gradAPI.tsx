import { GetGradBySubjectId } from "@/dto/gradDto";

export const fetchGetGradBySubjectId = async (
  subjectId: number
): Promise<GetGradBySubjectId[]> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL_V1}/api/Grade/GetGradeBySubjectId?subjectId=${subjectId}`
    );
    if (!response.ok) {
      throw new Error("Failed to get teacher enrollment data");
    }
    const text = await response.text();
    const json = JSON.parse(text);
    const data : GetGradBySubjectId[] =  json.data;
    return data
  } catch (err) {
    console.log(err);
    throw err;
  }
};
