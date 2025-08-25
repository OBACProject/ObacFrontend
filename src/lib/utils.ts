import {
  StudentGroupItem,
} from "@/dto/studentGroupItem";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCurrentThaiTermYear() {
  const date = new Date();
  const currentMonth = date.getMonth();

  const currentYear =
    currentMonth > 4 ? date.getFullYear() + 543 : date.getFullYear() + 543 - 1;

  const defaultTerm = currentMonth > 4 ? "1" : "2";

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
