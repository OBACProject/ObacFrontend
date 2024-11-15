"use client";

import React, { useState } from "react";
import { login , logout } from "@/app/action/authAction";
import { toast } from "react-toastify";
interface Session {
  session: string; 
}

export default function LoginForm({ session }:Session) {
  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    await login(formData);
    toast.success("login success")
  };

  const handleLogout = async () => {
    await logout(); 
    toast.info("logout success")
  };

  return (
    <div className="w-full grid place-items-center py-10">
     

      {session ? (
        <div className="my-10">
          <pre>{JSON.stringify(session, null, 2)}</pre>
          <button
            onClick={handleLogout} // Bind the client-side logout handler
            className="bg-red-600 px-10 text-white my-3 rounded-md py-2"
          >
            Logout
          </button>
        </div>
      ) : (<>
        <form
        onSubmit={handleLogin} // Bind the client-side login handler
        className="pb-5 grid place-items-center border-[1px] w-1/3 rounded-lg shadow-sm"
      >
        <div className="bg-gray-800 w-full grid place-items-center rounded-t-lg py-2 mb-5">
          <div className="font-semibold text-white text-xl">Login Form</div>
        </div>

        <input
          className="px-5 py-2 my-3 bg-gray-100 rounded-lg"
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
        <div className="my-10">You are not logged in.</div></>
      )}
    </div>
  );
}
