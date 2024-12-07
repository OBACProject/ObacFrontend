import { faker } from "@faker-js/faker";

export interface TeacherColumns {
  runningNumber: number;
  teacherId: string;
  teacherName: string;
  teacherSurname: string;
  programs: string;
  email: string;
  phoneNumber: string;
}

// export interface TeacherData {
//   teacherId: string;
//   teacherName: string;
//   teacherSurname: string;
//   programs: string;
//   email: string;
//   phoneNumber: string;
// }

export const TeacherColumnsData: TeacherColumns[] = Array.from(
  { length: 20 },
  (_, index) => ({
    runningNumber: index + 1,
    teacherId: (100000 + index + 1).toString(),
    teacherName: faker.person.firstName(),
    teacherSurname: faker.person.lastName(),
    programs: faker.helpers.arrayElement([
      "การบัญชี",
      "การตลาด",
      "คอมพิวเตอร์ธุรกิจ",
      "คอมพิวกราฟฟิค",
      "การจัดการสำนักงาน",
      "การท่องเที่ยว",
    ]),
    email: faker.internet.email(),
    phoneNumber: faker.phone.number(),
  })
);
