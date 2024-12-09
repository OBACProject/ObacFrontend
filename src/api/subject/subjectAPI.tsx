import { GetSubjectBySubjectId } from "@/dto/subjectDto";


export const fetchGetSubjectBySubjectId = async (
    id : number
  ): Promise<GetSubjectBySubjectId> => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL_V1}/api/Subject/GetSubjectByIdAsync?id=${id}`
      );
      if (!response.ok) {
        throw new Error("Failed to get  data");
      }
      const text = await response.text();
      const json = JSON.parse(text);
      const data:GetSubjectBySubjectId = json.data;
      return data
    } catch (err) {
      console.error("Error:", err);
      throw err;
    }
  };