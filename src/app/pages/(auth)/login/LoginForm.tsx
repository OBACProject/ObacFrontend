"use client";

import React, { useState } from "react";
import { login, logout } from "@/app/action/authAction";
import { toast } from "react-toastify";
interface Session {
  session: string;
}

export default function LoginForm({ session }: Session) {
  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    await login(formData);
    toast.success("login success");
  };

  const handleLogout = async () => {
    await logout();
    toast.info("logout success");
  };

  return (
    <div className="w-full bg-gray-400 grid place-items-center pb-40 pt-10">
      {session ? (
        <div className="my-10 bg-white rounded-lg px-10 py-12">
          <pre>{JSON.stringify(session, null, 2)}</pre>
          <div className="grid place-items-center mt-5">
            <button
              onClick={handleLogout}
              className="bg-red-600 px-10 text-white my-3 rounded-md py-2"
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        <>
          <form
            onSubmit={handleLogin}
            className="pb-5 grid place-items-center bg-white border-[1px] lg:w-3/12 md:w-6/12 sm:w-6/12 rounded-lg shadow-sm"
          >
            <div className="mt-10 bg-blue-900 rounded-full w-28 h-28"></div>
            <div className="mt-5 w-full grid place-items-center rounded-t-lg py-2 mb-5">
              <div className=" text-black text-2xl ">ลงทะเบียนเข้าสู่ระบบ</div>
            </div>

            <input
              className="px-5 py-2 w-3/5 my-3 bg-gray-100 rounded-lg"
              type="text"
              name="username"
              placeholder="Username / ชื่อผู้ใช้"
              required
            />

            <input
              className="px-5 py-2 w-3/5 my-3 bg-gray-100 rounded-lg"
              type="password"
              name="password"
              placeholder="Password / รหัสผ่าน"
              required
            />

            <button
              type="submit"
              className="bg-blue-900 px-20 text-white my-3 rounded-md py-2"
            >
              Login
            </button>
          </form>
          {/* <div className="my-10">You are not logged in.</div> */}
        </>
      )}
    </div>
  );
}
