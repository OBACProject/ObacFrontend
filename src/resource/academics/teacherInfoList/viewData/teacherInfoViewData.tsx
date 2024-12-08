import { TeacherColumns, TeacherInfoData } from "@/dto/teacherDto";
import { getTeacherInfoData } from "../api/teacherInfoApiData";
import { faker } from "@faker-js/faker";

export const getTeacherInfoViewData = async (): Promise<TeacherColumns[]> => {
  try {
    const data = await getTeacherInfoData();
    console.log("Fetched Data:", data);

    const gradingDataColumn = data.map((item: TeacherInfoData) => ({
      runningNumber: item.teacherId,
      teacherId: item.teacherId.toString(),
      teacherName: item.firstName,
      teacherSurname: item.lastName,
      programs: item.facultyName,
      email: item.email,
      phoneNumber: faker.phone.number(),
    }));

    return gradingDataColumn;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch teacher info data.");
  }
};
