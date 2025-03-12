'use client'
import  { PropsWithChildren, useEffect } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
function AuthLayout({ children }: PropsWithChildren) {
  const router = useRouter();

  const newRole = Cookies.get("role");
  useEffect(() => {
    
      // Assuming you have a function to get the user's role from the token
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
    }
  , [newRole, router]);

  return {children};
}

export default AuthLayout;
