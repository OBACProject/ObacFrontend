export interface TeacherData {
  id: string;
  thaiName: string; //
  thaiLastName: string; //
  teacherFirstName: string; //
  teacherLastName: string; //
  teacherGender: string; //
  teacherPhone: string; //
  teacherEmail: string; //
  teacherNationality: string; //
  teacherQualification: string; //
  teacherReligion: string; //
  teacherRank: string; //
  teacherFaculty: string; //
  teacherProgram: string;
  teacherDateOfJoining: string; //
  teacherProfilePicture?: string; // path
}

export interface TeacherColumn {
  id: string;
  thaiName: string;
  thaiLastName: string;
  teacherFirstName: string;
  teacherLastName: string;
  teacherFaculty: string;
  teacherEmail: string;
}

export const exampleTeacherColumns: TeacherColumn[] = [
  {
    id: "1",
    thaiName: "สมชาย",
    thaiLastName: "ใจดี",
    teacherFirstName: "Somchai",
    teacherLastName: "Jaidee",
    teacherFaculty: "Computer Science",
    teacherEmail: "",
  },
  {
    id: "2",
    thaiName: "สายสมร",
    thaiLastName: "สุขสันต์",
    teacherFirstName: "Saisamorn",
    teacherLastName: "Suksan",
    teacherFaculty: "Education",
    teacherEmail: "",
  },
  {
    id: "3",
    thaiName: "อาทิตย์",
    thaiLastName: "รุ่งเรือง",
    teacherFirstName: "Arthit",
    teacherLastName: "Rungreung",
    teacherFaculty: "Mathematics",
    teacherEmail: "",
  },
  {
    id: "4",
    thaiName: "สมหมาย",
    thaiLastName: "สุขสันต์",
    teacherFirstName: "Sommai",
    teacherLastName: "Suksan",
    teacherFaculty: "Education",
    teacherEmail: "",
  },
];

export const exampleTeacherData: TeacherData[] = [
  {
    id: "1",
    thaiName: "สมชาย",
    thaiLastName: "ใจดี",
    teacherFirstName: "Somchai",
    teacherLastName: "Jaidee",
    teacherGender: "Male",
    teacherPhone: "0812345678",
    teacherEmail: "somchai.jaidee@example.com",
    teacherNationality: "Thai",
    teacherQualification: "Ph.D. in Computer Science",
    teacherReligion: "Buddhism",
    teacherRank: "Associate Professor",
    teacherFaculty: "Computer Science",
    teacherProgram: "Software Engineering",
    teacherDateOfJoining: "2015-08-15",
    teacherProfilePicture: "/images/teachers/somchai.jpg",
  },
  {
    id: "2",
    thaiName: "สายสมร",
    thaiLastName: "สุขสันต์",
    teacherFirstName: "Saisamorn",
    teacherLastName: "Suksan",
    teacherGender: "Female",
    teacherPhone: "0823456789",
    teacherEmail: "saisamorn.suksan@example.com",
    teacherNationality: "Thai",
    teacherQualification: "Master's in Education",
    teacherReligion: "Christianity",
    teacherRank: "Lecturer",
    teacherFaculty: "Education",
    teacherProgram: "Curriculum Development",
    teacherDateOfJoining: "2018-01-12",
    teacherProfilePicture: "",
  },
  {
    id: "3",
    thaiName: "อาทิตย์",
    thaiLastName: "รุ่งเรือง",
    teacherFirstName: "Arthit",
    teacherLastName: "Rungreung",
    teacherGender: "Male",
    teacherPhone: "0834567890",
    teacherEmail: "arthit.rungreung@example.com",
    teacherNationality: "Thai",
    teacherQualification: "Master's in Mathematics",
    teacherReligion: "Islam",
    teacherRank: "Senior Lecturer",
    teacherFaculty: "Mathematics",
    teacherProgram: "Applied Mathematics",
    teacherDateOfJoining: "2010-05-20",
    teacherProfilePicture: "",
  },
];

export function getTeacherDataById(id: string) {
  return exampleTeacherData.find((data) => data.id === id);
}
