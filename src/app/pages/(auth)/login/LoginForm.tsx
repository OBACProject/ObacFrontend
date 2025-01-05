"use client";

import { login, logout } from "@/lib/authentication";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

interface LoginFormProps {
  session?: { role?: string; name?: string };
}

export default function LoginForm({ session }: LoginFormProps) {
  const router = useRouter();

  const [role, setRole] = useState<string | null>(session?.role || null);
  const [name, setName] = useState<string | null>(session?.name || null);

  useEffect(() => {
    if (!role || !name) {
      // Fetch cookies only if session is not passed
      const storedRole = Cookies.get("role");
      const storedName = Cookies.get("name");

      if (storedRole && storedName) {
        setRole(storedRole);
        setName(storedName);
      }
    }
  }, [role, name]);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);
      await login(formData);

      const newRole = Cookies.get("role");
      const newName = Cookies.get("name");

      setRole(newRole || null);
      setName(newName || null);

      toast.success("Login successful");

      switch (newRole) {
        case "Student":
          router.push("/pages/student/schedule");
          break;
        case "Teacher":
          router.push("/pages/teacher/profile");
          break;
        case "Academic":
          router.push("/pages/academic");
          break;
        case "Admin":
          router.push("/pages/admin/academicManagement");
          break;
        default:
          toast.error("Unknown role");
      }
    } catch (error) {
      toast.error("Login failed. Please try again.");
    }
  };

  const handleLogout = async () => {
    await logout();

    Cookies.remove("role");
    Cookies.remove("name");
    setRole(null);
    setName(null);

    toast.info("Logout successful");
  };

  return (
    <div className="w-full bg-gray-400 grid place-items-center pb-40 pt-10">
      {role && name ? (
        <div className="my-10 bg-white rounded-lg px-10 py-12 grid place-items-center mx-auto">
          <div className="space-y-4">
            <div className="text-2xl">Welcome {name}</div>
            <div className="text-lg">Role: {role}</div>
            <div className="grid place-items-center mt-5">
              <button
                onClick={handleLogout}
                className="bg-red-600 z-10 px-10 text-white my-3 rounded-md py-2"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleLogin}
          className="z-10 relative mt-10 pb-5 grid place-items-center bg-white border-[1px] lg:w-3/12 md:w-6/12 sm:w-6/12 rounded-lg shadow-sm"
        >
          <img src="/images/obac_navbar_logo.png" className="mt-5 h-28" />
          <div className="mt-5 w-full grid place-items-center rounded-t-lg py-2 mb-5">
            <div className="text-black text-2xl">เข้าสู่ระบบ</div>
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
      )}
    </div>
  );
}