import { faker } from "@faker-js/faker";

export interface StudentColumns {
  runningNumber: number;
  studentId: string;
  studentName: string;
  studentSurname: string;
  blank: string;
  more: string | null;
}

export interface inputStudent {
  studentId: string;
  studentName: string;
  studentSurname: string;
  blank: string;
  more: string | null;
}

// get data from backend be like
export const studentInput: inputStudent[] = Array.from(
  { length: 20 },
  (_, index) => ({
    studentId: (100000 + index + 1).toString(),
    studentName: faker.person.firstName(),
    studentSurname: faker.person.lastName(),
    blank: "",
    more: faker.datatype.boolean() ? faker.lorem.sentence() : null,
  })
);

// make a data to use in table
export const studentColumnsData: StudentColumns[] = studentInput.map(
  (student, index) => ({
    runningNumber: index + 1,
    studentId: student.studentId,
    studentName: student.studentName,
    studentSurname: student.studentSurname,
    blank: "",
    more: student.more,
  })
);
