import { ClassroomByGroupIdData } from "@/dto/gradingDto";
import { GroupSummaryGradeResponse } from "@/lib/views/grade/grade.view";

export interface TransformedStudentData {
  index: number;
  studentId: number;
  studentCode: string;
  name: string;
  gpa: number;
  gpax: number;
  totalCredit: number;
  subjects: { [k: string]: string };

}

export const mockClassroomData: ClassroomByGroupIdData = {
  groupId: 1001,
  groupName: "MK13A",
  groupCode: "MK13A",
  class: "ปวช 1/1",
  facultyName: "บริการและการจัดการ",
  programName: "การตลาด",
  term: "1",
  year: 2568,
  student: [
    {
      studentId: 1,
      studentCode: "65000001",
      firstName: "อรทัย",
      lastName: "ตั้งใจ",
      isActive: true,
      gender: "หญิง",
      gpa: 3.55,
      gpax: 3.44,
      totalCredit: 13,
      subject: [
        { subjectName: "คณิตศาสตร์", subjectCode: "MATH101", grade: "0.0", credit: 3, remark: "" },
        { subjectName: "ภาษาไทย", subjectCode: "THAI101", grade: "1.0", credit: 2, remark: "" },
        { subjectName: "ภาษาอังกฤษ", subjectCode: "ENG101", grade: "2.5", credit: 3, remark: "" },
        { subjectName: "วิทยาศาสตร์", subjectCode: "SCI101", grade: "0.0", credit: 3, remark: "" },
        { subjectName: "ประวัติศาสตร์", subjectCode: "HIST101", grade: "0.0", credit: 2, remark: "" },
      ],
    },
    {
      studentId: 2,
      studentCode: "65000002",
      firstName: "วิชัย",
      lastName: "ใจดี",
      isActive: true,
      gender: "หญิง",
      gpa: 3.97,
      gpax: 1.84,
      totalCredit: 13,
      subject: [
        { subjectName: "คณิตศาสตร์", subjectCode: "MATH101", grade: "3.0", credit: 3, remark: "" },
        { subjectName: "ภาษาไทย", subjectCode: "THAI101", grade: "4.0", credit: 2, remark: "" },
        { subjectName: "ภาษาอังกฤษ", subjectCode: "ENG101", grade: "3.5", credit: 3, remark: "" },
        { subjectName: "วิทยาศาสตร์", subjectCode: "SCI101", grade: "0.0", credit: 3, remark: "" },
        { subjectName: "ประวัติศาสตร์", subjectCode: "HIST101", grade: "3.5", credit: 2, remark: "" },
      ],
    },
    {
      studentId: 3,
      studentCode: "65000003",
      firstName: "วิชัยเอ",
      lastName: "ใจสิงค์",
      isActive: true,
      gender: "หญิง",
      gpa: 3.97,
      gpax: 1.84,
      totalCredit: 13,
      subject: [
        { subjectName: "คณิตศาสตร์", subjectCode: "MATH101", grade: "3.0", credit: 3, remark: "" },
        { subjectName: "ภาษาไทย", subjectCode: "THAI101", grade: "4.0", credit: 2, remark: "" },
        { subjectName: "ภาษาอังกฤษ", subjectCode: "ENG101", grade: "3.5", credit: 3, remark: "" },
        { subjectName: "วิทยาศาสตร์", subjectCode: "SCI101", grade: "0.0", credit: 3, remark: "" },
        { subjectName: "ประวัติศาสตร์", subjectCode: "HIST101", grade: "3.5", credit: 2, remark: "" },
      ],
    },
    {
      studentId: 4,
      studentCode: "65000004",
      firstName: "นพมล",
      lastName: "แซ่ลิ้ม",
      isActive: true,
      gender: "หญิง",
      gpa: 3.97,
      gpax: 1.84,
      totalCredit: 13,
      subject: [
        { subjectName: "คณิตศาสตร์", subjectCode: "MATH101", grade: "3.0", credit: 3, remark: "" },
        { subjectName: "ภาษาไทย", subjectCode: "THAI101", grade: "4.0", credit: 2, remark: "" },
        { subjectName: "ภาษาอังกฤษ", subjectCode: "ENG101", grade: "3.5", credit: 3, remark: "" },
        { subjectName: "วิทยาศาสตร์", subjectCode: "SCI101", grade: "0.0", credit: 3, remark: "" },
        { subjectName: "ประวัติศาสตร์", subjectCode: "HIST101", grade: "3.5", credit: 2, remark: "" },
      ],
    },
  ],
};


export const transformToSummaryData = (
  data: ClassroomByGroupIdData
): GroupSummaryGradeResponse => {
  const allSubjects = [
    ...Array.from(new Set(data.student.flatMap((s) => s.subject.map((sub) => sub.subjectName)))),
  ];

  const students = data.student.map((s) => ({
    studentId: s.studentId,
    studentCode: s.studentCode,
    name: `${s.firstName} ${s.lastName}`,
    gpa: s.gpa,
    gpax: s.gpax,
    totalCredit: s.totalCredit,
    subjects: Object.fromEntries(
      s.subject.map((sub) => [sub.subjectName, sub.grade])
    ),
  }));

  return {
    generalData: {
      groupId: data.groupId,
      groupName: data.groupName,
      groupCode: data.groupCode,
      class: data.class,
      facultyName: data.facultyName,
      programName: data.programName,
      term: data.term,
      year: data.year,
    },
    students,
    subjects: allSubjects,
  };
};

