import { faker } from "@faker-js/faker";

export interface StudentRegisterDataColumn {
  runningNumber: number;
  thaiName: string;
  thaiLastName: string;
  gender: string;
  class: string;
  facultyName: string;
  programName: string;
}

const facultyNames = ["พาณิชยกรรม", "การท่องเที่ยว"];
const programNames = [
  "การบัญชี",
  "การตลาด",
  "คอมพิวเตอร์ธุรกิจ",
  "คอมพิวกราฟฟิค",
  "การจัดการสำนักงาน",
  "การท่องเที่ยว",
];
const classes = ["ปวช.", "ปวส."];

export const StudentRegisterColumn: StudentRegisterDataColumn[] = Array.from(
  { length: 20 },
  (_, index) => ({
    runningNumber: index + 1,
    thaiName: faker.person.firstName(),
    thaiLastName: faker.person.lastName(),
    gender: faker.person.sexType(),
    class: faker.helpers.arrayElement(classes),
    facultyName: faker.helpers.arrayElement(facultyNames),
    programName: faker.helpers.arrayElement(programNames),
  })
);
