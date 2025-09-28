import { StudentGroupItem } from "@/dto/studentGroupItem";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import type {
  StudentDetails,
  UpdateStudentDetailsRequest,
} from "@/dto/studentDto";

export function getCurrentThaiTermYear(now: Date = new Date()) {
  const y = now.getFullYear();
  const may1 = new Date(y, 4, 1);  
  const nov1 = new Date(y, 10, 1); 

  let defaultTerm: "1" | "2";
  let currentYear: number; 

  if (now >= may1 && now < nov1) {
    defaultTerm = "1";
    currentYear = y + 543;
  } else if (now >= nov1) {
    defaultTerm = "2";
    currentYear = y + 543;
  } else {
    defaultTerm = "2";
    currentYear = (y - 1) + 543;
  }

  return { defaultTerm, currentYear };
}

export function sortStudentGroupItems(
  groups: StudentGroupItem[]
): StudentGroupItem[] {
  return [...groups].sort((a, b) => {
    if (a.class === "ปวช" && b.class === "ปวส") return -1;
    if (a.class === "ปวส" && b.class === "ปวช") return 1;

    const parseGroup = (name: string) => {
      const [first, second] = name.split("/").map(Number);
      return { first: first || 0, second: second || 0 };
    };

    const aGroup = parseGroup(a.groupName);
    const bGroup = parseGroup(b.groupName);

    if (aGroup.first !== bGroup.first) {
      return aGroup.first - bGroup.first;
    }
    return aGroup.second - bGroup.second;
  });
}

export function genRandomGroupCode(letters = 2, digits = 3): string {
  const alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const rand = (max: number) => {
    if (typeof crypto !== "undefined" && crypto.getRandomValues) {
      const buf = new Uint32Array(1);
      crypto.getRandomValues(buf);
      return buf[0] % max;
    }
    return Math.floor(Math.random() * max);
  };

  let letterPart = "";
  for (let i = 0; i < letters; i++) {
    letterPart += alpha[rand(alpha.length)];
  }

  const numberPart = String(rand(10 ** digits)).padStart(digits, "0");
  return `${letterPart}-${numberPart}`;
}
const s = (v: string | null | undefined) => {
  return v ?? "-";
};
const d = (v: string | null | undefined) => v ?? "";

const formatTodayYMD = (): string => {
  const now = new Date(); // เวลาเครื่องผู้ใช้ (Local)
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

export function toUpdatePayload(
  src: StudentDetails
): UpdateStudentDetailsRequest {
  return {
    studentId: src.id,
    prefix: s(src.prefix),
    firstName: s(src.name),
    lastName: s(src.lastName),
    gender: s(src.gender),
    studentGroupId: src.studentGroupId ?? 0,
    studentCode: s(src.studentCode),
    programId: src.programId ?? 0,
    isActive: !!src.isActive,
    status: s(src.status),
    birthDate:
      src.birthDate && src.birthDate.trim() !== ""
        ? src.birthDate
        : formatTodayYMD(),
    citizenId: s(src.citizenId),
    nationality: s(src.nationality),
    religion: s(src.religion),
    phoneNumber: s(src.phoneNumber),
    email: s(src.email),
    currentAddress: s(src.currentAddress),
    fatherFirstName: s(src.fatherFirstName),
    fatherLastName: s(src.fatherLastName),
    motherFirstName: s(src.motherFirstName),
    motherLastName: s(src.motherLastName),
    class: s(src.class),
    level: src.level ?? 0,
    programName: s(src.programName),
    subProgramName: s(src.subProgramName),
    facultyName: s(src.facultyName),
    gpax: typeof src.gpax === "number" ? src.gpax : 0,
  };
}
