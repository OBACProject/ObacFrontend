import { ClassSubjectColumn } from "@/dto/gradingDto";
import { faker } from "@faker-js/faker";

const roomNumbers = ["A101", "A102", "A103"];

const periodNumbers = ["1", "2", "3"];

export const SubjectClassMockData: ClassSubjectColumn[] = Array.from(
  { length: 10 },
  (_, i) => ({
    id: i + 1,
    day: faker.date.weekday(),
    period: faker.helpers.arrayElement(periodNumbers),
    room: faker.helpers.arrayElement(roomNumbers),
    teacherName: faker.person.fullName(),
    isPublish: faker.datatype.boolean(), // ของจริงต้องแก้เป็น false คือยังไม่ได้เผยแพร่ และ true คือเผยแพร่แล้ว
  })
);
