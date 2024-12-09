import { GetScheduleBysubjectId } from "@/dto/schedule";

export const fetchGetScheduleBysubjectId= async (
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
    const data : GetScheduleBysubjectId =  json.data;
    return data
  } catch (err) {
    console.log(err);
    throw err;
  }
};
