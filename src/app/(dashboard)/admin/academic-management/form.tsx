"use client";
import { BookOpen, LibraryBig, PlusCircle } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { GetAllAcademicUsers } from "@/api/user/userAPI";
import { GetAllAcademicUser } from "@/dto/userDto";
import AddTeacherAccountPopup from "@/components/common/Popup/AddTeacherAccountPopup";
import IsActiveToggleProps from "../../../../components/common/Toggle/IsActiveToggle";
import { useRouter } from "next/navigation"; 
import AddAcademicAccountPopup from "@/components/common/Popup/AddAcademicAccountPopup";

export default function Form() {
  const [teachers, setTeacher] = useState<GetAllAcademicUser[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [openCreatSubjectPopup, setOpenCreatePopUp] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;
   const router = useRouter();

  useEffect(() => {
    GetAllAcademicUsers().then((d: GetAllAcademicUser[]) => {
      if (d) {
        setTeacher(d);
      }
    });
  }, []);

  const filteredAcademicUsers = useMemo(() => {
    const lowerSearch = searchTerm.trim().toLowerCase();
    if (!Array.isArray(teachers)) return [];

    return teachers.filter((user) => {
      const firstName = user.firstName?.toLowerCase() ?? "";
      const lastName = user.lastName?.toLowerCase() ?? "";
      const fullName = `${user.prefix ?? ""} ${user.firstName ?? ""} ${user.lastName ?? ""}`.toLowerCase();
      const phone = user.phoneNumber?.toLowerCase() ?? "";

      return (
        lowerSearch === "" ||
        firstName.includes(lowerSearch) ||
        lastName.includes(lowerSearch) ||
        fullName.includes(lowerSearch) ||
        phone.includes(lowerSearch)
      );
    });
  }, [teachers, searchTerm]);

  const paginatedTeachers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredAcademicUsers.slice(start, end);
  }, [filteredAcademicUsers, currentPage]);

  const handleToggleActive = (userId: string, newState: boolean) => {
    // setTeacher((prev) =>
    //   prev.map((t) =>
    //     t.id === userId ? { ...t, isActive: newState } : t
    //   )
    // );
    // TODO: call API update ถ้ามี
  };

  return (
    <div className="w-full">
      <div className="flex py-3 px-10 justify-start">
        <h1 className="px-8 py-2 rounded-3xl flex gap-2 items-center text-xl w-fit border border-gray-100 shadow-md text-blue-700">
          <LibraryBig className="h-8 w-8" />
          ระบบจัดการบุคลากรภายใน
        </h1>
      </div>

      <div className="px-10 pt-6 pb-4 flex justify-between gap-5">
        <input
          type="text"
          placeholder="ค้นหาราชื่อ"
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
          เพิ่มบัญชีบุคลากรภายใน
        </button>
      </div>

      {filteredAcademicUsers.length > 0 ? (
        <div className="w-full rounded-sm px-10">
          {/* Header */}
          <div className="py-2 px-5 flex items-center rounded-t-lg gap-3 bg-gradient-to-r from-blue-500 to-blue-600">
            <BookOpen className="w-5 h-5 text-white" />
            <div className="text-lg flex items-center justify-start gap-4 text-white font-prompt">
              รายชื่อบุคลากรภายในทั้งหมด
              <p className="bg-blue-400 rounded-md px-4 py-0.5 text-white">
                {filteredAcademicUsers.length || "-"}
              </p>
              รายการ
            </div>
          </div>

          {/* ตาราง */}
          <div className="shadow-lg w-full text-sm">
            {/* Header */}
            <div className="grid grid-cols-[5%_40%_25%_30%] text-white bg-gradient-to-r from-blue-500 to-blue-600 text-lg">
              <div className="flex items-center justify-center py-2">ลำดับ</div>
              <div className="flex items-center justify-center py-2">ชื่อบุคลากรภายใน</div>
              <div className="flex items-center justify-center py-2">เบอร์โทร</div>
              <div className="flex items-center justify-center py-2">สถานะการใช้งาน</div>
            </div>

            {/* Data Rows */}
            {paginatedTeachers.map((item, index) => (
              <div
                key={item.id}
                onClick={() => router.push(`/admin/academic-details/1`)}

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
                <div className="flex items-center justify-center py-2">
                  <IsActiveToggleProps
                    isActive={item.isActive} 
                    // onToggle={(value) =>
                    //   handleToggleActive(item.id, value)
                    // }
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-4 mt-4">
            <button
              className="px-4 py-1 bg-gray-200 rounded disabled:opacity-50"
              onClick={() => setCurrentPage((prev) => prev - 1)}
              disabled={currentPage === 1}
            >
              ก่อนหน้า
            </button>

            <span className="text-sm text-gray-700">
              หน้า {currentPage} / {Math.ceil(filteredAcademicUsers.length / itemsPerPage)}
            </span>

            <button
              className="px-4 py-1 bg-gray-200 rounded disabled:opacity-50"
              onClick={() => setCurrentPage((prev) => prev + 1)}
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

      {/* Popups */}
      {openCreatSubjectPopup && (
        <AddAcademicAccountPopup onClosePopUp={setOpenCreatePopUp} />
      )}
    </div>
  );
}
