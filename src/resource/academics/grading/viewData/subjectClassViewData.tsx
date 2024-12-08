import { ClassSubjectColumn, ClassSubjectData } from "@/dto/gradingDto";
import { faker } from "@faker-js/faker";
import { getClassSubjectData } from "../api/subjectClassData";

// const roomNumbers = ["A101", "A102", "A103"];

// const periodNumbers = ["1", "2", "3"];

// export const SubjectClassMockData: ClassSubjectColumn[] = Array.from(
//   { length: 10 },
//   (_, i) => ({
//     id: i + 1,
//     day: faker.date.weekday(),
//     period: faker.helpers.arrayElement(periodNumbers),
//     room: faker.helpers.arrayElement(roomNumbers),
//     teacherName: faker.person.fullName(),
//     isPublish: faker.datatype.boolean(), // ของจริงต้องแก้เป็น false คือยังไม่ได้เผยแพร่ และ true คือเผยแพร่แล้ว
//   })
// );

export const getSubjectClassViewData = async (
  subjectId: number,
  term: number,
  year: number
): Promise<ClassSubjectColumn[]> => {
  try {
    const data = await getClassSubjectData(subjectId, term, year);
    console.log("Fetched Data:", data);

    const subjectClassColumn = data.map((item: ClassSubjectData) => ({
      id: item.scheduleSubjectId,
      day: item.day,
      period: item.period,
      room: item.room,
      teacherName: faker.person.fullName(),
      isPublish: item.isPublish,
    }));

    return subjectClassColumn;
  } catch (error) {
    console.error("Error in getSubjectClassViewData:", error);
    throw new Error("Failed to convert to subject class view data.");
  }
};
