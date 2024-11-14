
import { getSession, login, logout } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";
export default async function LoginForm() {
  const session = await getSession();
  return (
    <div className="w-full grid place-items-center py-10">
      <form
        className="pb-5 grid place-items-center border-[1px] w-1/3 rounded-lg shadow-sm"
        action={async (formData) => {
          "use server";
          await login(formData);
          redirect("/pages/login");
        }}
      >
        <div className="bg-gray-800 w-full grid place-items-center rounded-t-lg py-2 mb-5">
          <div className="font-semibold  text-white text-xl ">Login Form</div>
        </div>

        <input
          className="px-5 py-2  my-3 bg-gray-100 rounded-lg"
          type="text"
          name="username"
          placeholder="Username"
          required
        />

        <input
          className="px-5 py-2 my-3 bg-gray-100 rounded-lg"
          type="password"
          name="password"
          placeholder="Password"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 px-10 text-white my-3 rounded-md py-2"
        >
          Login
        </button>
      </form>

      {session ? (
        <div className="my-10">
          <pre>{JSON.stringify(session, null, 2)}</pre>
          <form
            action={async () => {
              "use server";
              await logout();
              redirect("/pages/login");
            }}
          >
            <button
              type="submit"
              className="bg-red-600 px-10 text-white my-3 rounded-md py-2"
            >
              Logout
            </button>
          </form>
        </div>
      ) : (
        <div className="my-10">You are not login.</div>
      )}
    </div>
  );
}
