"use server";

import { login as serverLogin, logout as serverLogout } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  await serverLogin(formData);
  redirect("/login");
}
export async function logout() {
  await serverLogout();
  redirect("/login");
}

