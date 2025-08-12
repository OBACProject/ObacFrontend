"use client";
import { UserRoundCheck, PlusCircle, GraduationCap } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { GetAllStudents } from "@/api/student/route";
import { GetAllStudentUser } from "@/dto/studentDto";
import AddStudentAccountPopup from "@/components/common/Popup/AddStudentAccountPopup";
import IsActiveToggleProps from "@/components/common/Toggle/IsActiveToggle";
import { toast } from "react-toastify";
import { UpdateIsActiveUser } from "@/api/user/userAPI";

export default function Form() {
  const [students, setStudents] = useState<GetAllStudentUser[]>([]);
  const [loading, setLoading] = useState(true); 
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [openCreateStudentPopup, setOpenCreateStudentPopup] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const itemsPerPage = 10;

  const sortByStudentCode = (arr: GetAllStudentUser[]) =>
    [...arr].sort((a, b) =>
      (a.studentCode ?? "").localeCompare(b.studentCode ?? "", undefined, {
        numeric: true,
        sensitivity: "base",
      })
    );

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const data = await GetAllStudents();
        if (isMounted && Array.isArray(data)) {
          setStudents(sortByStudentCode(data));
        }
      } catch (err) {
        console.error("โหลดข้อมูลนักเรียนล้มเหลว:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();
    return () => {
      isMounted = false;
    };
  }, []);

  const filteredStudents = useMemo(() => {
    const lowerSearch = searchTerm.trim().toLowerCase();
    if (!lowerSearch) return students;

    return students.filter((student) => {
      const combinedText = Object.values(student)
        .map((value) => String(value ?? "").toLowerCase())
        .join(" ");
      return combinedText.includes(lowerSearch);
    });
  }, [students, searchTerm]);

  const paginatedStudents = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredStudents.slice(start, start + itemsPerPage);
  }, [filteredStudents, currentPage]);

  const handleToggleActive = async (userId: string, nextState: boolean) => {
    const snapshot = [...students];
    setStudents((prev) =>
      prev.map((s) => (s.id === userId ? { ...s, isActive: nextState } : s))
    );
    setUpdatingId(userId);

    try {
      const ok = await UpdateIsActiveUser({ userId, isActive: nextState });
      if (ok) {
        toast.success("อัปเดตสถานะเรียบร้อย");
      } else {
        throw new Error("อัปเดตไม่สำเร็จ");
      }
    } catch (err: any) {
      setStudents(snapshot);
      const errors = err?.response?.data?.errors;
      if (errors && typeof errors === "object") {
        const firstKey = Object.keys(errors)[0];
        const firstMsg = Array.isArray(errors[firstKey])
          ? errors[firstKey][0]
          : String(errors[firstKey]);
        toast.error(firstMsg);
      } else {
        const msg =
          err?.response?.data?.detail ||
          err?.response?.data?.title ||
          err?.message ||
          "อัปเดตไม่สำเร็จ";
        toast.error(msg);
      }
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="w-full">
      <div className="flex py-3 px-10 justify-start">
        <h1 className="px-8 py-2 rounded-3xl flex gap-2 items-center text-xl w-fit border border-gray-100 shadow-md text-blue-700">
          <GraduationCap className="h-8 w-8" />
          ระบบจัดการนักเรียน
        </h1>
      </div>

      <div className="px-10 pt-6 pb-4 flex justify-between gap-5">
        <input
          type="text"
          placeholder="ค้นหารายชื่อนักเรียน"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="border border-gray-400 px-4 py-1 rounded-md"
        />
        <button
          className="px-10 py-1 flex text-lg gap-2 h-fit items-center bg-blue-500 hover:bg-blue-600 text-white rounded-3xl"
          onClick={() => setOpenCreateStudentPopup(true)}
        >
          <PlusCircle className="w-5 h-5 text-white" />
          เพิ่มบัญชีนักเรียน
        </button>
      </div>

      {loading ? (
        <div className="w-full px-10 py-5">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="animate-pulse bg-gray-200 h-10 mb-2 rounded"
            ></div>
          ))}
        </div>
      ) : students.length > 0 ? (
        <div className="w-full rounded-sm px-10">
          <div className="py-2 px-5 flex items-center rounded-t-lg gap-3 bg-blue-500 ">
            <UserRoundCheck className="w-5 h-5 text-white" />
            <div className="text-lg flex items-center justify-start gap-4 text-white font-prompt">
              รายชื่อนักเรียนทั้งหมด
              <p className="bg-blue-400 rounded-md px-4 py-0.5 text-white">
                {filteredStudents.length || "-"}
              </p>
              รายการ
            </div>
          </div>

          <div className="shadow-lg w-full text-sm">
            <div className="grid grid-cols-[5%_20%_25%_20%_15%_15%] text-black bg-gray-50 border-b to-indigo-600 text-lg">
              <div className="flex items-center justify-center py-2">ลำดับ</div>
              <div className="flex items-center justify-center py-2">รหัสนักเรียน</div>
              <div className="flex items-center justify-center py-2">ชื่อ-นามสกุล</div>
              <div className="flex items-center justify-center py-2">ห้องเรียน</div>
              <div className="flex items-center justify-center py-2">เพศ</div>
              <div className="flex items-center justify-center py-2">สถานะ</div>
            </div>

            {paginatedStudents.map((item, index) => (
              <div
                key={item.id}
                onClick={() => {
                  if (item.studentId) {
                    router.push(`/admin/student-details/${item.studentId}`);
                  }
                }}
                className="cursor-pointer grid grid-cols-[5%_20%_25%_20%_15%_15%] bg-white hover:bg-blue-100 text-gray-800 text-base"
              >
                <div className="flex items-center justify-center py-2">
                  {(currentPage - 1) * itemsPerPage + index + 1}.
                </div>
                <div className="flex items-center justify-center py-2">
                  {item.studentCode}
                </div>
                <div className="flex items-center justify-start py-2 px-4">
                  {item.prefix} {item.firstName} {item.lastName}
                </div>
                <div className="flex items-center justify-center py-2">
                  {item.class} {item.groupName}
                </div>
                <div className="flex items-center justify-center py-2">
                  {item.gender}
                </div>
                <div
                  className="flex items-center justify-center py-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <IsActiveToggleProps
                    isActive={item.isActive}
                    disabled={updatingId === item.id}
                    onToggle={(value: boolean) => handleToggleActive(item.id, value)}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center items-center gap-4 mt-4">
            <button
              className="px-4 py-1 bg-gray-200 rounded disabled:opacity-50"
              onClick={() => setCurrentPage((prev) => prev - 1)}
              disabled={currentPage === 1}
            >
              ก่อนหน้า
            </button>

            <span className="text-sm text-gray-700">
              หน้า {currentPage} / {Math.ceil(filteredStudents.length / itemsPerPage)}
            </span>

            <button
              className="px-4 py-1 bg-gray-200 rounded disabled:opacity-50"
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={currentPage >= Math.ceil(filteredStudents.length / itemsPerPage)}
            >
              ถัดไป
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full grid place-items-center py-10">
          <div className="py-10 border-gray-400 border-2 border-dashed text-5xl text-gray-500 font-extrabold rounded-lg grid place-items-center w-[700px]">
            ไม่มีข้อมูล
          </div>
        </div>
      )}

      {openCreateStudentPopup && (
        <AddStudentAccountPopup
          onClosePopUp={(shouldReload: boolean) => {
            setOpenCreateStudentPopup(false);
            if (shouldReload) {
              GetAllStudents().then((d) => {
                if (Array.isArray(d)) setStudents(sortByStudentCode(d));
              });
            }
          }}
        />
      )}
    </div>
  );
}
