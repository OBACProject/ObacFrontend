export interface studentCardSubjectProps {
  subject_name: string;
  subject_code: string;
  subject_credit: number;
  subject_room: string;
  teacher_name: string;
  day: string;
  start_time: string;
  end_time: string;
}

export const StudentCardSubjectData: studentCardSubjectProps[] = [
  {
    subject_name: "วิชาตัวเบา",
    subject_code: "GEN101",
    subject_credit: 3,
    subject_room: "A101",
    teacher_name: "สมหมาย หายยกลัง",
    day: "Monday",
    start_time: "08:00",
    end_time: "10:00",
  },
  {
    subject_name: "วิชาการนอนตีลังกา",
    subject_code: "GEN201",
    subject_credit: 3,
    subject_room: "A201",
    teacher_name: "ลำเข็ญ ลำบล",
    day: "Tuesday",
    start_time: "08:00",
    end_time: "10:00",
  },
  {
    subject_name: "วิชาหกสูง",
    subject_code: "GEN301",
    subject_credit: 3,
    subject_room: "A301",
    teacher_name: "หมูกรอบ วันนี้ไม่ขาย",
    day: "Friday",
    start_time: "08:00",
    end_time: "10:00",
  },
];
