import { ClassroomByGroupIdData } from "@/dto/gradingDto";
import api from "@/lib/apiCentralized";

export async function getClassroomByGroupId(
  groupId: number,
  term: string,
  year: string
): Promise<ClassroomByGroupIdData> {
  try {
    const response = await api.get(
      `Grade/GetGroupSummaryGrade?groupId=${groupId}&term=${term}&year=${year}`
    );

    return response.data.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch classroom by group id data");
  }
}
