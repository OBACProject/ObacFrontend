"use client";
import { UserRoundCheck, UserPen, PlusCircle } from "lucide-react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { GetAllTeacherUsers } from "@/api/teacher/route";
import { GetAllTeacherResponse } from "@/dto/teacherDto";
import AddTeacherAccountPopup from "@/components/common/Popup/AddTeacherAccountPopup";
import { useRouter } from "next/navigation";
import IsActiveToggleProps from "@/components/common/Toggle/IsActiveToggle";
import { toast } from "react-toastify";
import { UpdateIsActiveUser } from "@/api/user/userAPI";

export default function Form() {
  const [teachers, setTeacher] = useState<GetAllTeacherResponse[]>([]);
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [openCreatSubjectPopup, setOpenCreatePopUp] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const sortByTeacherId = (arr: GetAllTeacherResponse[]) =>
    [...arr].sort((a, b) => Number(a.teacherId ?? 0) - Number(b.teacherId ?? 0));

  const fetchTeachers = useCallback(async () => {
    const d = await GetAllTeacherUsers();
    if (d) setTeacher(sortByTeacherId(d));
  }, []);

  useEffect(() => {
    fetchTeachers();
  }, [fetchTeachers]);

  const filteredTeachers = useMemo(() => {
    const lowerSearch = searchTerm.trim().toLowerCase();
    const filtered = teachers.filter((teacher) => {
      const code = teacher.teacherCode?.toLowerCase() ?? "";
      const firstName = teacher.firstName?.toLowerCase() ?? "";
      const lastName = teacher.lastName?.toLowerCase() ?? "";
      const fullName = `${teacher.prefix ?? ""} ${teacher.firstName ?? ""} ${teacher.lastName ?? ""}`.toLowerCase();
      return (
        lowerSearch === "" ||
        code.includes(lowerSearch) ||
        firstName.includes(lowerSearch) ||
        lastName.includes(lowerSearch) ||
        fullName.includes(lowerSearch)
      );
    });
    return sortByTeacherId(filtered);
  }, [teachers, searchTerm]);

  const paginatedTeachers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredTeachers.slice(start, end);
  }, [filteredTeachers, currentPage]);

  const handleToggleActive = async (userId: string, nextState: boolean, e?: React.MouseEvent) => {
    e?.stopPropagation();

    const snapshot = [...teachers];
    setTeacher((prev) =>
      prev.map((t) => (String(t.id) === userId ? { ...t, isActive: nextState } : t))
    );
    setUpdatingId(userId);

    try {
      const ok = await UpdateIsActiveUser({ userId, isActive: nextState });
      if (ok) toast.success("อัปเดตสถานะเรียบร้อย");
      else throw new Error("อัปเดตไม่สำเร็จ");
    } catch (err: any) {
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
          <UserPen className="h-8 w-8" />
          ระบบจัดการอาจารย์
        </h1>
      </div>

      <div className="px-10 pt-6 pb-4 flex justify-between gap-5">
        <input
          type="text"
          placeholder="ค้นหารายชื่อ"
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
          เพิ่มบัญชีอาจารย์
        </button>
      </div>

      {teachers.length > 0 ? (
        <div className="w-full rounded-sm px-10">
          <div className="py-2 px-5 flex items-center rounded-t-lg gap-3 bg-blue-500 ">
            <UserRoundCheck className="w-5 h-5 text-white" />
            <div className="text-lg flex items-center justify-start gap-4 text-white font-prompt">
              รายชื่ออาจารย์ทั้งหมด
              <p className="bg-blue-400 rounded-md px-4 py-0.5 text-white">
                {filteredTeachers.length || "-"}
              </p>
              รายการ
            </div>
          </div>

          <div className="shadow-lg w-full text-sm ">
            <div className="grid grid-cols-[5%_15%_30%_20%_30%] text-black bg-gray-50 border-b to-indigo-600 text-lg">
              <div className="flex items-center justify-center py-2 ">ลำดับ</div>
              <div className="flex items-center justify-center py-2">รหัสอาจารย์</div>
              <div className="flex items-center justify-center py-2">ชื่ออาจารย์</div>
              <div className="flex items-center justify-center py-2">แผนก</div>
              <div className="flex items-center justify-center py-2">สถานะการใช้งาน</div>
            </div>

            {paginatedTeachers.map((item, index) => (
              <div
                key={item.id}
                onClick={() => router.push(`/admin/teacher-details/${item.teacherId}`)}
                className="cursor-pointer grid grid-cols-[5%_15%_9%_21%_20%_30%] bg-white hover:bg-blue-100 text-gray-800 text-base"
              >
                <div className="flex items-center justify-center py-2">
                  {(currentPage - 1) * itemsPerPage + index + 1}.
                </div>

                <div className="flex items-center justify-center py-2">
                  {item.teacherCode}
                </div>
                <div></div>

                <div className="flex items-center py-2 px-4 w-full">
                  <span className="text-start">{`${item.prefix ?? ""} ${item.firstName ?? ""} ${item.lastName ?? ""}`}</span>
                </div>

                <div className="flex items-center justify-center py-2">
                  {item.programName}
                </div>

                <div
                  className="flex items-center justify-center py-2"
                  onClick={(e) => e.stopPropagation()}
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

          <div className="flex justify-center items-center gap-4 mt-4">
            <button
              className="px-4 py-1 bg-gray-200 rounded disabled:opacity-50"
              onClick={() => setCurrentPage((prev) => prev - 1)}
              disabled={currentPage === 1}
            >
              ก่อนหน้า
            </button>

            <span className="text-sm text-gray-700">
              หน้า {currentPage} / {Math.ceil(filteredTeachers.length / itemsPerPage)}
            </span>

            <button
              className="px-4 py-1 bg-gray-200 rounded disabled:opacity-50"
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={currentPage >= Math.ceil(filteredTeachers.length / itemsPerPage)}
            >
              ถัดไป
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full px-10 py-5">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse bg-gray-200 h-10 mb-2 rounded" />
          ))}
        </div>
      )}

      {openCreatSubjectPopup && (
        <AddTeacherAccountPopup
          onClosePopUp={setOpenCreatePopUp}
          // ✅ หลังสร้างเสร็จ: รีเฟรชตาราง + กลับหน้า 1
          onCreated={async () => {
            await fetchTeachers();
            setCurrentPage(1);
          }}
        />
      )}
    </div>
  );
}
