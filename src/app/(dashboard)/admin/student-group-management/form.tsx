"use client";

import { UserRoundCheck, PlusCircle, DoorOpen, Trash2 } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  GetAllStudentGroup,
  UpdateStudentGroupActive,
  DeleteStudentGroupById,
} from "@/api/studentGroup/route";
import IsActiveToggleProps from "@/components/common/Toggle/IsActiveToggle";
import { toast } from "react-toastify";
import { GetAllStudentGroupRequest } from "@/dto/studentGroupItem";
import AddStudentGroupPopup from "@/components/common/Popup/AddStudentGroupPopup";

export default function Form() {
  const [groups, setGroups] = useState<GetAllStudentGroupRequest[]>([]);
  const [openCreatePopup, setOpenCreatePopup] = useState(false);
  const [openDeleteId, setOpenDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false); 
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const itemsPerPage = 10;

  const sortByGroupCode = (arr: GetAllStudentGroupRequest[]) =>
    [...arr].sort((a, b) =>
      (a.groupCode ?? "").localeCompare(b.groupCode ?? "", "th", {
        numeric: true,
        sensitivity: "base",
      })
    );

  const fetchGroups = async () => {
    const d = await GetAllStudentGroup();
    if (Array.isArray(d)) setGroups(sortByGroupCode(d));
  };

  useEffect(() => {
    fetchGroups();
  }, []);

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

    return sortByGroupCode(filtered);
  }, [groups, searchTerm]);

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredGroups.slice(start, start + itemsPerPage);
  }, [filteredGroups, currentPage]);

  const handleToggleActive = async (id: number, nextState: boolean, e?: React.MouseEvent) => {
    e?.stopPropagation();

    const snapshot = [...groups];
    setGroups((prev) => prev.map((g) => (g.id === id ? { ...g, isActive: nextState } : g)));
    setUpdatingId(id);

    try {
      const ok = await UpdateStudentGroupActive({
        studentGroupId: id.toString(),
        isActive: nextState,
      });
      if (ok) {
        toast.success("อัปเดตสถานะเรียบร้อย");
      } else {
        throw new Error("อัปเดตไม่สำเร็จ");
      }
    } catch (err: any) {
      setGroups(snapshot);
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

  const openDeleteConfirm = (id: number) => setOpenDeleteId(id);

  const confirmDelete = async () => {
    if (openDeleteId == null) return;
    try {
      setDeleting(true);
      const ok = await DeleteStudentGroupById(openDeleteId);
      if (ok) {
        toast.success("ลบกลุ่มเรียนเรียบร้อย");
        setOpenDeleteId(null);
        fetchGroups();
      } else {
        toast.error("ลบกลุ่มเรียนไม่สำเร็จ");
      }
    } catch (err: any) {
      const msg =
        err?.response?.data?.responseMessage ||
        err?.response?.data?.title ||
        err?.message ||
        "เกิดข้อผิดพลาดจากเซิร์ฟเวอร์";
      toast.error(msg);
    } finally {
      setDeleting(false);
    }
  };


  return (
    <div className="w-full">
      <div className="flex py-3 px-10 justify-start">
        <h1 className="px-8 py-2 rounded-3xl flex gap-2 items-center text-xl w-fit border border-gray-100 shadow-md text-blue-700">
          <DoorOpen className="h-8 w-8" />
          ระบบจัดการห้องเรียน
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

        <button
          className="px-10 py-1 flex text-lg gap-2 h-fit items-center bg-blue-500 hover:bg-blue-700 text-white rounded-3xl"
          onClick={() => setOpenCreatePopup(true)}
        >
          <PlusCircle className="w-5 h-5 text-white" />
          เพิ่มกลุ่มเรียน
        </button>
      </div>

      {filteredGroups.length > 0 ? (
        <div className="w-full rounded-sm px-10">
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

          <div className="shadow-lg w-full text-sm">
            <div className="grid grid-cols-[8%_18%_22%_12%_12%_14%_14%] text-black bg-gray-50 border-b text-lg">
              <div className="flex items-center justify-center py-2">ลำดับ</div>
              <div className="flex items-center justify-center py-2">รหัสห้อง</div>
              <div className="flex items-center justify-center py-2">ห้อง</div>
              <div className="flex items-center justify-center py-2">ภาคเรียน</div>
              <div className="flex items-center justify-center py-2">ปีการศึกษา</div>
              <div className="flex items-center justify-center py-2">สถานะการใช้งาน</div>
              <div className="flex items-center justify-center py-2">การจัดการ</div>
            </div>

            {paginated.map((item, index) => (
              <div
                key={item.id}
                className="cursor-default grid grid-cols-[8%_18%_22%_12%_12%_14%_14%] bg-white hover:bg-blue-100 text-gray-800 text-base"
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

                <div className="flex items-center justify-center py-2">
                  <IsActiveToggleProps
                    isActive={!!item.isActive}
                    disabled={updatingId === item.id}
                    onToggle={(value: boolean) => handleToggleActive(item.id as number, value)}
                  />
                </div>

                <div className="flex items-center justify-center py-2 gap-3">
                  <Trash2
                    className="w-5 h-5 text-red-500 cursor-pointer hover:text-red-700"
                    onClick={() => openDeleteConfirm(item.id as number)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="w-full grid place-items-center py-10">
          <div className="py-10 border-gray-400 border-2 border-dashed text-5xl text-gray-500 font-extrabold rounded-lg grid place-items-center w-[700px]">
            ไม่มีข้อมูล
          </div>
        </div>
      )}

      {openCreatePopup && (
        <AddStudentGroupPopup
          onClosePopUp={(shouldReload) => {
            setOpenCreatePopup(false);
            if (shouldReload) fetchGroups();
          }}
        />
      )}

      {(() => {
        const selectedItem = groups.find((g) => g.id === openDeleteId);
        return openDeleteId !== null && selectedItem && (
          <div
            className="fixed inset-0 z-[100] bg-black/40 flex items-center justify-center"
            onClick={() => {
              if (!deleting) setOpenDeleteId(null);
            }}
          >
            <div
              className="bg-white rounded-lg shadow-xl w-[420px] p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-semibold text-red-600 mb-2">ยืนยันการลบ</h3>
              <p className="text-sm text-gray-700 mb-6">
                ต้องการลบกลุ่มเรียนหมายเลข{" "}
                <b>
                  {`${selectedItem.class ?? ""}${selectedItem.class ? " " : ""}${selectedItem.groupName ?? ""} 
  เทอม ${selectedItem.term || "-"} ปี ${selectedItem.year ?? "-"}`}
                </b>{" "}
                ใช่หรือไม่? การกระทำนี้ไม่สามารถย้อนกลับได้
              </p>
              <div className="flex justify-end gap-3">
                <button
                  className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                  onClick={() => setOpenDeleteId(null)}
                  disabled={deleting}
                >
                  ยกเลิก
                </button>
                <button
                  className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white disabled:opacity-50"
                  onClick={confirmDelete}
                  disabled={deleting}
                >
                  {deleting ? "กำลังลบ..." : "ยืนยันลบ"}
                </button>
              </div>
            </div>
          </div>
        );
      })()}

    </div>
  );
}


