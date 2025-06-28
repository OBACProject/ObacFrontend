import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCurrentThaiTermYear() {
  const date = new Date();
  const currentMonth = date.getMonth(); 

  const currentYear = currentMonth > 4
    ? date.getFullYear() + 543
    : date.getFullYear() + 543 - 1;

  const defaultTerm = currentMonth > 4 ? "1" : "2";

  return { defaultTerm, currentYear };
}
