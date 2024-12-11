import { faker } from "@faker-js/faker";

export interface StudentFailDataColumn {
  runningNumber: number;
  thaiName: string;
  thaiLastName: string;
  gender: string;
  class: string;
  facultyName: string;
  programName: string;
}
export interface SubjectOfStudentFailDataColumn {
  id: number;
  subjectCode: string;
  subjectName: string;
  score: number;
  grade: "มผ" | "ร";
}

export const SubjectOfFailStudentData: SubjectOfStudentFailDataColumn[] =
  Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    subjectCode: faker.string.alphanumeric(5), // ใช้ alphanumeric
    subjectName: faker.word.noun(),
    score: faker.number.int({ min: 0, max: 49 }),
    grade: faker.helpers.arrayElement(["มผ", "ร"]), // มผ , ร
  }));

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

export const StudentFailColumnData: StudentFailDataColumn[] = Array.from(
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
