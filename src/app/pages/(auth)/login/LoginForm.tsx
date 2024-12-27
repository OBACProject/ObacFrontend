"use client";

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
    <div className="relative bg-authBg bg-repeat bg-cover bg-opacity-10 w-full h-screen bg-bottom grid place-items-center pb-40 ">
      <div className="relative bg-gradient-to-t from-gray-900/60 to-gray-900/45  w-full bg-cover bg-bottom h-screen"></div>
      {session ? (
        <div className="my-10 absolute lelf-1/2 bg-white rounded-lg px-10 py-12">
          <pre>{JSON.stringify(session, null, 2)}</pre>
          <div className="grid place-items-center mt-5">
            <button
              onClick={handleLogout}
              className="bg-red-600 z-10 px-10 text-white my-3 rounded-md py-2"
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        <>
          <form
            onSubmit={handleLogin}
            className="z-10 absolute lelf-1/2 pb-5 grid place-items-center bg-white border-[1px] lg:w-3/12 md:w-6/12 sm:w-6/12 rounded-lg shadow-sm"
          >
            <div className="mt-10 bg-blue-900 rounded-full w-28 h-28"></div>
            <div className="mt-5 w-full grid place-items-center rounded-t-lg py-2 mb-5">
              <div className=" text-black text-2xl ">เข้าสู่ระบบ</div>
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
      {session && (
        <div className="flex gap-4 mt-5">
        <a
          className="px-5 py-2 shadow-md text-white bg-blue-500 rounded-md hover:opacity-70"
          href="/pages/student/schedule"
        >
          Student
        </a>
        <a
          className="px-5 py-2 shadow-md text-white bg-green-400 rounded-md hover:opacity-70"
          href="/pages/teacher/profile"
        >
          Teacher
        </a>
        <a
          className="px-5 py-2 shadow-md text-white bg-yellow-500 rounded-md hover:opacity-70"
          href="/pages/academic"
        >
          Academic
        </a>
        <a
          className="px-5 py-2 shadow-md text-white bg-purple-500 rounded-md hover:opacity-70"
          href="/pages/admin/academicManagement"
        >
          Admin
        </a>
      </div>
      )}
      
    </div>
  );
}
