"use client";

import { login, logout } from "@/lib/authentication";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { Loader2, UserRound } from "lucide-react";

interface LoginFormProps {
  session?: { role?: string; name?: string };
}

export default function LoginForm({ session }: LoginFormProps) {
  const router = useRouter();

  const [role, setRole] = useState<string | null>(session?.role || null);
  const [name, setName] = useState<string | null>(session?.name || null);
  const [trigger, setTrigger] = useState<boolean>(false);
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
    setTrigger(true);
    try {
      const formData = new FormData(event.currentTarget);
      await login(formData);

      const newRole = Cookies.get("role");
      const newName = Cookies.get("name");

      if (!newRole || !newName) {
        throw new Error("Invalid token: Missing role or name.");
      }
      setTrigger(false);
      setRole(newRole || null);
      setName(newName || null);

      toast.success("เข้าสู่ระบบสำเร็จ");

      switch (newRole) {
        case "Student":
          router.push("/pages/student/schedule");
          break;
        case "Teacher":
          router.push("/pages/teacher/profile");
          break;
        case "Academic":
          router.push("/pages/academic/profile");
          break;
        case "Admin":
          router.push("/pages/admin/profile");
          break;
        default:
          toast.error("Unknown role");
      }
    } catch (error) {
      setTrigger(false);
      toast.error("เข้าสู่ระบบไม่สำเร็จ โปรดลองอีกครั้ง");
    }
  };

  const handleLogout = async () => {
    await logout();

    toast.info("ออกจากระบบสำเร็จ");
    setTrigger(false);
    window.location.reload();
  };

  const handleLoginButton = async () => {
    const newRole = Cookies.get("role");
    switch (newRole) {
      case "Student":
        router.push("/pages/student/schedule");
        break;
      case "Teacher":
        router.push("/pages/teacher/profile");
        break;
      case "Academic":
        router.push("/pages/academic/profile");
        break;
      case "Admin":
        router.push("/pages/admin/academicManagement");
        break;
      default:
        toast.error("สิทธิการเข้าถึงผิดพลาด");
    }
  };

  return (
    <div className="relative  bg-repeat bg-cover bg-opacity-10 w-full h-screen bg-bottom grid place-items-center pb-40 ">
      <img
        src="/images/obac_view.jpg"
        className="absolute object-cover h-screen w-full"
      />
      <div className="relative bg-gradient-to-t from-gray-900/60 to-gray-900/45  w-full bg-cover bg-bottom h-screen"></div>
      {role && name ? (
        <div className="my-10 absolute lelf-1/2 bg-white rounded-lg px-10 py-12">
          <div className="space-y-4">
            <div className="flex justify-center ">
              <UserRound className="h-12 w-12 rounded-full" />
            </div>
            <div className="text-2xl">{name}</div>
            {/* <div className="text-lg">Role: {role}</div> */}
            <div className="grid place-items-center mt-5">
              <button
                onClick={handleLoginButton}
                className="bg-blue-500 z-10 px-10 text-white my-3 rounded-md py-1 hover:bg-blue-700 hover:scale-105 duration-500"
              >
                กลับเข้าสู่ระบบ
              </button>
              <button
                onClick={handleLogout}
                className="bg-gradient-to-tr from-red-500/70 to-pink-400 z-10 px-10 text-white my-3 rounded-md py-1  hover:from-red-500 hover:to-red-500 hover:scale-105 duration-500"
              >
                ออกจากระบบ
              </button>
            </div>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleLogin}
          className="z-10 absolute lelf-1/2 grid place-items-center bg-white border-[1px] lg:w-3/12 md:w-6/12 sm:w-6/12 rounded-lg shadow-sm gap-8 pt-8 pb-10"
        >
          <img src="/images/obac_navbar_logo.png" className="h-28" />
        <div className="grid gap-3 w-full place-items-center">
          <input
            className="px-5 py-2 w-3/5  bg-gray-100 rounded-lg"
            type="text"
            name="userName"
            placeholder="Username / ชื่อผู้ใช้"
            required
          />

          <input
            className="px-5 py-2 w-3/5 bg-gray-100 rounded-lg"
            type="password"
            name="password"
            placeholder="Password / รหัสผ่าน"
            required
          />
        </div>
          
          {trigger ? (
            <button className="bg-[#143d66] flex gap-2 items-center px-20 text-white rounded-md py-2 font-prompt">
              <Loader2 className="w-5 h-5 animate-spin" />
              เข้าสู่ระบบ...
            </button>
          ) : (
            <button
              type="submit"
              className="bg-[#143d66] font-prompt px-20 text-white  rounded-md py-2"
            >
              เข้าสู่ระบบ
            </button>
          )}
        </form>
      )}
    </div>
  );
}
