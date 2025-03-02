"use server";
import { GetGradBySubjectId } from "@/dto/gradDto";
import api from "@/lib/apiCentralized";
import { cookies } from "next/headers";

export const fetchGetSubjectBySubjectIdData = async (
  subjectId: number,
  scheduleSubjectId: number
): Promise<GetGradBySubjectId[]> => {
  try {
    const token = cookies().get("token")?.value;
    const response = await api.get(
      `Grade/GetGradeBySubjectAndSchedulSubjectId?subjectId=${subjectId}&scheduleSubjectId=${scheduleSubjectId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data.data;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to get subject data");
  }
};
