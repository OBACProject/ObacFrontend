import { GetGradBySubjectId } from "@/dto/gradDto";
import api from "@/lib/apiCentralized";

export const fetchGetSubjectBySubjectIdData = async (
  subjectId: number,
  scheduleSubjectId: number
): Promise<GetGradBySubjectId[]> => {
  try {
    const response = await api.get(
      `Grade/GetGradeBySubjectAndSchedulSubjectId?subjectId=${subjectId}&scheduleSubjectId=${scheduleSubjectId}`
    );

    return response.data.data;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to get subject data");
  }
};
