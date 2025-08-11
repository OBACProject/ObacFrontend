"use client";

import { BookOpen, LibraryBig, PlusCircle } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { GetAllAcademicUsers, UpdateIsActiveUser } from "@/api/user/userAPI";
import { GetAllAcademicUser } from "@/dto/userDto";
import AddAcademicAccountPopup from "@/components/common/Popup/AddAcademicAccountPopup";
import IsActiveToggleProps from "@/components/common/Toggle/IsActiveToggle";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function Form() {
  const [teachers, setTeacher] = useState<GetAllAcademicUser[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [openCreatSubjectPopup, setOpenCreatePopUp] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const router = useRouter();
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const sortByFirstName = (arr: GetAllAcademicUser[]) =>
  [...arr].sort((a, b) => {
    const aFirst = a.firstName ?? "";
    const bFirst = b.firstName ?? "";
    const firstCmp = aFirst.localeCompare(bFirst, "th", { sensitivity: "base" });
    if (firstCmp !== 0) return firstCmp;
    // tie-breaker ด้วย lastName
    return (a.lastName ?? "").localeCompare(b.lastName ?? "", "th", { sensitivity: "base" });
  });

  useEffect(() => {
  GetAllAcademicUsers().then((d) => {
    if (d) setTeacher(sortByFirstName(d)); 
  });
}, []);

  const filteredAcademicUsers = useMemo(() => {
  const q = searchTerm.trim().toLowerCase();
  if (!q) return teachers; 

  const filtered = teachers.filter((u) => {
    const first = u.firstName?.toLowerCase() ?? "";
    const last = u.lastName?.toLowerCase() ?? "";
    const full = `${u.prefix ?? ""} ${u.firstName ?? ""} ${u.lastName ?? ""}`.toLowerCase();
    const phone = u.phoneNumber?.toLowerCase() ?? "";
    return first.includes(q) || last.includes(q) || full.includes(q) || phone.includes(q);
  });

  return sortByFirstName(filtered);
}, [teachers, searchTerm]);

  const paginatedTeachers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredAcademicUsers.slice(start, start + itemsPerPage);
  }, [filteredAcademicUsers, currentPage]);

  const handleToggleActive = async (userId: string, nextState: boolean) => {
    // optimistic update
    const snapshot = [...teachers];
    setTeacher((prev) => prev.map((t) => (String(t.id) === userId ? { ...t, isActive: nextState } : t)));
    setUpdatingId(userId);

    try {
      const ok = await UpdateIsActiveUser({ userId, isActive: nextState });
      if (ok) {
        toast.success("อัปเดตสถานะเรียบร้อย");
      } else {
        throw new Error("อัปเดตไม่สำเร็จ");
      }
    } catch (err: any) {
      // rollback
      setTeacher(snapshot);
      const errors = err?.response?.data?.errors;
      if (errors && typeof errors === "object") {
        const firstKey = Object.keys(errors)[0];
        const firstMsg = Array.isArray(errors[firstKey]) ? errors[firstKey][0] : String(errors[firstKey]);
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
          <LibraryBig className="h-8 w-8" />
          ระบบจัดการฝ่ายทะเบียน
        </h1>
      </div>

      <div className="px-10 pt-6 pb-4 flex justify-between gap-5">
        <input
          type="text"
          placeholder="ค้นหาราชชื่อ"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="border border-gray-400 px-4 py-1 rounded-md"
        />
        <button
          className="px-10 py-1 flex text-lg gap-2 h-fit items-center bg-blue-500 hover:bg-blue-600 text-white rounded-3xl"
          onClick={() => setOpenCreatePopUp(true)}
        >
          <PlusCircle className="w-5 h-5 text-white" />
          เพิ่มบัญชีฝ่ายทะเบียน
        </button>
      </div>

      {filteredAcademicUsers.length > 0 ? (
        <div className="w-full rounded-sm px-10">
          {/* Header */}
          <div className="py-2 px-5 flex items-center rounded-t-lg gap-3 bg-blue-500 ">
            <BookOpen className="w-5 h-5 text-white" />
            <div className="text-lg flex items-center justify-start gap-4 text-white font-prompt">
              รายชื่อฝ่ายทะเบียนทั้งหมด
              <p className="bg-blue-400 rounded-md px-4 py-0.5 text-white">
                {filteredAcademicUsers.length}
              </p>
              รายการ
            </div>
          </div>

          {/* Table */}
          <div className="shadow-lg w-full text-sm">
            {/* Header */}
            <div className="grid grid-cols-[5%_40%_25%_30%] text-black bg-gray-50 border-b text-lg">
              <div className="flex items-center justify-center py-2">ลำดับ</div>
              <div className="flex items-center justify-center py-2">ชื่อฝ่ายทะเบียน</div>
              <div className="flex items-center justify-center py-2">เบอร์โทร</div>
              <div className="flex items-center justify-center py-2">สถานะการใช้งาน</div>
            </div>

            {/* Rows */}
            {paginatedTeachers.map((item, index) => (
              <div
                key={item.id}
                onClick={() => router.push(`/admin/academic-details/${item.id}`)}
                className="cursor-pointer grid grid-cols-[5%_14%_26%_25%_30%] bg-white hover:bg-blue-100 text-gray-800 text-base"
              >
                <div className="flex items-center justify-center py-2">
                  {(currentPage - 1) * itemsPerPage + index + 1}.
                </div>
                <div></div>
                <div className="flex text-center items-center justify-start py-2 px-4">
                  {`${item.prefix ?? ""} ${item.firstName ?? ""} ${item.lastName ?? ""}`}
                </div>
                <div className="flex items-center justify-center py-2">
                  {item.phoneNumber || "-"}
                </div>
                <div
                  className="flex items-center justify-center py-2"
                  onClick={(e) => e.stopPropagation()} // กันเผลอเปิดหน้า detail ตอนกดสวิตช์
                >
                  <IsActiveToggleProps
                    isActive={item.isActive}
                    disabled={updatingId === String(item.id)}
                    onToggle={(value: boolean) => handleToggleActive(String(item.id), value)}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-4 mt-4">
            <button
              className="px-4 py-1 bg-gray-200 rounded disabled:opacity-50"
              onClick={() => setCurrentPage((p) => p - 1)}
              disabled={currentPage === 1}
            >
              ก่อนหน้า
            </button>

            <span className="text-sm text-gray-700">
              หน้า {currentPage} / {Math.ceil(filteredAcademicUsers.length / itemsPerPage)}
            </span>

            <button
              className="px-4 py-1 bg-gray-200 rounded disabled:opacity-50"
              onClick={() => setCurrentPage((p) => p + 1)}
              disabled={currentPage >= Math.ceil(filteredAcademicUsers.length / itemsPerPage)}
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

      {/* Popup */}
      {openCreatSubjectPopup && (
        <AddAcademicAccountPopup onClosePopUp={setOpenCreatePopUp} />
      )}
    </div>
  );
}
