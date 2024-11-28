export interface AcademicColumn {
  id: string;
  name: string;
  surname: string;
  email: string;
  image?: string;
}

export const AcademicData: AcademicColumn[] = [
  {
    id: "1",
    name: "I Bell",
    surname: "นาง12",
    email: "test@gmail.com",
  },
  {
    id: "2",
    name: "I Com",
    surname: "พี่พลอยคนเดียว",
    email: "test@gmail.com",
  },
  {
    id: "3",
    name: "I Mhing",
    surname: "ซุ่มเงียบ",
    email: "test3@gmail.com",
  },
];

export function getAcademicDataById(id: string) {
  return AcademicData.find((data) => data.id === id);
}
