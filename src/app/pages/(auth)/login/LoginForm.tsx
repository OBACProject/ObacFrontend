"use client";

import { login, logout } from "@/lib/authentication";
import { useState } from "react";
import { useRouter } from "next/navigation";

// import { logout } from "@/app/action/authAction";
import { toast } from "react-toastify";
interface Session {
  session: string;
}

export default function LoginForm({ session }: Session) {
  // from a local storage
  const router = useRouter();

  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    await login(formData);

    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");
    const storedName = localStorage.getItem("name");

    setToken(storedToken);
    setRole(storedRole);
    setName(storedName);

    toast.success("login success");

    if (storedRole === "Student") {
      router.push("/pages/student/schedule");
    } else if (storedRole === "Teacher") {
      router.push("/pages/teacher/profile");
    } else if (storedRole === "Academic") {
      router.push("/pages/academic");
    } else if (storedRole === "Admin") {
      router.push("/pages/admin/academicManagement");
    }
  };

  const handleLogout = async () => {
    await logout();

    setToken(null);
    setRole(null);
    setName(null);
    toast.info("logout success");
  };

  return (

    <div className="w-full bg-gray-400 grid place-items-center pb-40 pt-10">
      {token && role && name ? (
        <div className="my-10 bg-white rounded-lg px-10 py-12 grid place-items-center mx-auto">
          <div className="space-y-4">
            {" "}
            {/* Add space between elements */}
            <div className="text-2xl">Welcome {name}</div>
            <div className="text-lg">Role: {role}</div>
            {/* <div className="text-sm break-words whitespace-normal">
              Token: {token}
            </div> */}
            <div className="grid place-items-center mt-5">
              <button
                onClick={handleLogout}
                className="bg-red-600 px-10 text-white my-3 rounded-md py-2"
              >
                Logout
              </button>
            </div>

          </div>
        </div>
      ) : (
        <>
          <form
            onSubmit={handleLogin}
            className="z-10 absolute lelf-1/2 pb-5 grid place-items-center bg-white border-[1px] lg:w-3/12 md:w-6/12 sm:w-6/12 rounded-lg shadow-sm"
          >
              <img src="/images/obac_navbar_logo.png" className="mt-5 h-28" />
            <div className="mt-5 w-full grid place-items-center rounded-t-lg py-2 mb-5">
              <div className=" text-black text-2xl ">เข้าสู่ระบบ</div>
            </div>

            <input
              className="px-5 py-2 w-3/5 my-3 bg-gray-100 rounded-lg"
              type="text"
              name="userName"
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
