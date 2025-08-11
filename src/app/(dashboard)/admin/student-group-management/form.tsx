"use client";

import { UserRoundCheck, UserPen, PlusCircle } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { GetAllStudentGroup } from "@/api/studentGroup/route";
import IsActiveToggleProps from "@/components/common/Toggle/IsActiveToggle";
import { toast } from "react-toastify";
import { GetAllStudentGroupRequest } from "@/dto/studentGroupItem";

export default function Form() {
  const [groups, setGroups] = useState<GetAllStudentGroupRequest[]>([]);
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const itemsPerPage = 10;

  // ✅ เรียงตามรหัสห้อง groupCode (natural sort)
  const sortByGroupCode = (arr: GetAllStudentGroupRequest[]) =>
    [...arr].sort((a, b) =>
      (a.groupCode ?? "").localeCompare(b.groupCode ?? "", "th", {
        numeric: true,
        sensitivity: "base",
      })
    );

  useEffect(() => {
    GetAllStudentGroup().then((d) => {
      if (Array.isArray(d)) setGroups(sortByGroupCode(d));
    });
  }, []);

  // ค้นหาจาก groupCode / groupName / class / term / year
  const filteredGroups = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return groups;

    const filtered = groups.filter((g) => {
      const code = (g.groupCode ?? "").toLowerCase();
      const name = (g.groupName ?? "").toLowerCase();
      const cls = (g.class ?? "").toLowerCase();
      const term = (g.term ?? "").toLowerCase();
      const year = String(g.year ?? "").toLowerCase();
      return (
        code.includes(q) ||
        name.includes(q) ||
        cls.includes(q) ||
        term.includes(q) ||
        year.includes(q)
      );
    });

    return sortByGroupCode(filtered); // ✅ คงลำดับตาม groupCode หลังกรอง
  }, [groups, searchTerm]);

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredGroups.slice(start, start + itemsPerPage);
  }, [filteredGroups, currentPage]);

  // ✅ toggle isActive (optimistic + rollback + toast)
  const handleToggleActive = async (id: number, nextState: boolean, e?: React.MouseEvent) => {
    e?.stopPropagation();

    const snapshot = [...groups];
    setGroups((prev) => prev.map((g) => (g.id === id ? { ...g, isActive: nextState } : g)));
    setUpdatingId(id);

    try {
      const ok = await UpdateStudentGroupActive({ id, isActive: nextState });
      if (ok) {
        toast.success("อัปเดตสถานะเรียบร้อย");
      } else {
        throw new Error("อัปเดตไม่สำเร็จ");
      }
    } catch (err: any) {
      setGroups(snapshot); // rollback
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
          ระบบจัดการห้องเรียน (Student Group)
        </h1>
      </div>

      <div className="px-10 pt-6 pb-4 flex justify-between gap-5">
        <input
          type="text"
          placeholder="ค้นหา (รหัสห้อง / ห้อง / ภาคเรียน / ปี)"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="border border-gray-400 px-4 py-1 rounded-md"
        />
        {/* ปุ่มสร้างกลุ่มเรียนใหม่ ถ้ามี popup ในระบบของคุณ ก็เรียกที่นี่ */}
        {/* <button
          className="px-10 py-1 flex text-lg gap-2 h-fit items-center bg-blue-500 hover:bg-blue-600 text-white rounded-3xl"
          onClick={() => {}}
        >
          <PlusCircle className="w-5 h-5 text-white" />
          เพิ่มกลุ่มเรียน
        </button> */}
      </div>

      {filteredGroups.length > 0 ? (
        <div className="w-full rounded-sm px-10">
          {/* Header */}
          <div className="py-2 px-5 flex items-center rounded-t-lg gap-3 bg-blue-500 ">
            <UserRoundCheck className="w-5 h-5 text-white" />
            <div className="text-lg flex items-center justify-start gap-4 text-white font-prompt">
              รายการกลุ่มเรียนทั้งหมด
              <p className="bg-blue-400 rounded-md px-4 py-0.5 text-white">
                {filteredGroups.length}
              </p>
              รายการ
            </div>
          </div>

          {/* Table */}
          <div className="shadow-lg w-full text-sm">
            {/* Header (ลำดับ | รหัสห้อง | ห้อง | ภาคเรียน | ปีการศึกษา | สถานะ) */}
            <div className="grid grid-cols-[8%_20%_27%_15%_15%_15%] text-black bg-gray-50 border-b text-lg">
              <div className="flex items-center justify-center py-2">ลำดับ</div>
              <div className="flex items-center justify-center py-2">รหัสห้อง</div>
              <div className="flex items-center justify-center py-2">ห้อง</div>
              <div className="flex items-center justify-center py-2">ภาคเรียน</div>
              <div className="flex items-center justify-center py-2">ปีการศึกษา</div>
              <div className="flex items-center justify-center py-2">สถานะ</div>
            </div>

            {/* Rows */}
            {paginated.map((item, index) => (
              <div
                key={item.id}
                // onClick={() => router.push(`/admin/student-group-details/${item.id}`)}
                className="cursor-default grid grid-cols-[8%_20%_27%_15%_15%_15%] bg-white hover:bg-blue-100 text-gray-800 text-base"
              >
                <div className="flex items-center justify-center py-2">
                  {(currentPage - 1) * itemsPerPage + index + 1}.
                </div>

                <div className="flex items-center justify-center py-2">
                  {item.groupCode || "-"}
                </div>

                <div className="flex items-center justify-center py-2">
                  {(item.class ?? "") + (item.class ? " " : "") + (item.groupName ?? "")}
                </div>

                <div className="flex items-center justify-center py-2">
                  {item.term || "-"}
                </div>

                <div className="flex items-center justify-center py-2">
                  {item.year ?? "-"}
                </div>

                <div
                  className="flex items-center justify-center py-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <IsActiveToggleProps
                    isActive={!!item.isActive}
                    disabled={updatingId === item.id}
                    onToggle={(value: boolean) => handleToggleActive(item.id as number, value)}
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
              หน้า {currentPage} / {Math.ceil(filteredGroups.length / itemsPerPage)}
            </span>

            <button
              className="px-4 py-1 bg-gray-200 rounded disabled:opacity-50"
              onClick={() => setCurrentPage((p) => p + 1)}
              disabled={currentPage >= Math.ceil(filteredGroups.length / itemsPerPage)}
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
    </div>
  );
}
