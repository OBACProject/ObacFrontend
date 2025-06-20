import React from "react";
import LoginForm from "./LoginForm";
import { getSession } from "@/lib/auth";

export default async function page() {
  const session = await getSession();
  return (
    <div>
      <LoginForm session={session} />
    </div>
  );
}
