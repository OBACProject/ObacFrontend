"use client";

import { UserRoundCheck, PlusCircle, Trash2, Settings } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import {
  UpdateStudentGroupActive,
  DeleteStudentGroupById,
  GetAllStudentGroupByTermYear,
} from "@/api/studentGroup/route";
import IsActiveToggleProps from "@/components/common/Toggle/IsActiveToggle";
import { toast } from "react-toastify";
import { StudentGroupItem } from "@/dto/studentGroupItem";
import AddStudentGroupPopup from "@/components/common/Popup/AddStudentGroupPopup";
import { getCurrentThaiTermYear } from "@/lib/utils";
import SelectTermAndYear from "@/components/Academic/SelectTermYear";
import { EditGroupPopup } from "@/components/common/Popup/EditGroupPopup";

export default function Form() {
  const [groups, setGroups] = useState<StudentGroupItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [openCreatePopup, setOpenCreatePopup] = useState(false);
  const [openEditGroupPopup, setOpenEditGrupPopup] = useState(false);
  const [openDeleteId, setOpenDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const { defaultTerm, currentYear } = getCurrentThaiTermYear();
  const [term, setTerm] = useState<string>(defaultTerm);
  const [year, setYear] = useState<number>(currentYear);
  const [groupEdit, setGroupEdit] = useState<StudentGroupItem | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const filtered = useMemo(() => {
    const kw = searchInput.trim().toLowerCase();
    if (!kw) return groups;

    const hit = (v: unknown) => (v ?? "").toString().toLowerCase().includes(kw);

    return groups.filter((g) => {
      const room = `${g.class ?? ""} ${g.groupName ?? ""}`.trim();
      return hit(g.groupCode) || hit(room) || hit(g.term) || hit(g.year);
    });
  }, [groups, searchInput]);
  useEffect(() => {
    setCurrentPage(1);
  }, [searchInput, term, year]);
  const totalCount = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / itemsPerPage));

  const [updatingId, setUpdatingId] = useState<number | null>(null);

  useEffect(() => {
    GetAllStudentGroupByTermYear(term, year).then((d) => {
      if (d) {
        setGroups(d);
      }
    });
  }, []);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = Math.min(startIdx + itemsPerPage, totalCount);
  const currentFrom = totalCount === 0 ? 0 : startIdx + 1;
  const currentTo = endIdx;

  const paginated = useMemo(
    () => filtered.slice(startIdx, endIdx),
    [filtered, startIdx, endIdx]
  );
  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const d = await GetAllStudentGroupByTermYear(term, year);
        if (d) setGroups(d);
      } catch (e) {
        toast.error("โหลดข้อมูลไม่สำเร็จ");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [term, year]);
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages]);

  const fetchGroups = async () => {
    try {
      setLoading(true);
      const d = await GetAllStudentGroupByTermYear(term, year);
      if (d) setGroups(d);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const handleToggleActive = async (
    id: number,
    nextState: boolean,
    e?: React.MouseEvent
  ) => {
    e?.stopPropagation();
    const snapshot = [...groups];
    setGroups((prev) =>
      prev.map((g) => (g.id === id ? { ...g, isActive: nextState } : g))
    );
    setUpdatingId(id);

    try {
      const ok = await UpdateStudentGroupActive({
        studentGroupId: id.toString(),
        isActive: nextState,
      });
      if (ok) toast.success("อัปเดตสถานะเรียบร้อย");
      else throw new Error("อัปเดตไม่สำเร็จ");
    } catch (err: any) {
      setGroups(snapshot);
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

  const openDeleteConfirm = (id: number) => {
    const found = groups.find((g) => g.id === id);
    const count = Number(found?.total ?? 0);
    if (count > 0) {
      toast.warn(`ไม่สามารถลบห้องนี้ได้ เนื่องจากมีนักเรียนอยู่ ${count} คน`);
      return;
    }
    setOpenDeleteId(id);
  };

  const confirmDelete = async () => {
    if (openDeleteId == null) return;

    const found = groups.find((g) => g.id === openDeleteId);
    const count = Number(found?.total ?? 0);
    if (count > 0) {
      toast.warn(`ไม่สามารถลบห้องนี้ได้ เนื่องจากมีนักเรียนอยู่ ${count} คน`);
      setOpenDeleteId(null);
      return;
    }

    try {
      setDeleting(true);
      const ok = await DeleteStudentGroupById(openDeleteId);
      if (ok) {
        toast.success("ลบกลุ่มเรียนเรียบร้อย");
        setOpenDeleteId(null);
        setGroups([]);
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
      <div className="px-10 pt-6 pb-4 flex flex-wrap items-center gap-3">
        <input
          type="text"
          placeholder="ค้นหา (รหัสห้อง / ห้อง / ภาคเรียน / ปี)"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="border border-gray-400 px-4 py-1 rounded-md"
        />

        <SelectTermAndYear
          term={term}
          year={year}
          onChangeTerm={setTerm}
          onChangeYear={setYear}
          currentYear={currentYear}
        />

        <button
          className="ml-auto px-10 py-1 flex text-lg gap-2 h-fit items-center bg-blue-500 hover:bg-blue-700 text-white rounded-3xl"
          onClick={() => setOpenCreatePopup(true)}
        >
          <PlusCircle className="w-5 h-5 text-white" />
          เพิ่มกลุ่มเรียน
        </button>
      </div>

      {loading ? (
        <div className="w-full px-10 py-5">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="animate-pulse bg-gray-200 h-10 mb-2 rounded"
            />
          ))}
        </div>
      ) : totalCount === 0 ? (
        <div className="w-full grid place-items-center py-10">
          <div className="py-10 border-gray-400 border-2 border-dashed text-5xl text-gray-500 font-extrabold rounded-lg grid place-items-center w-[700px]">
            ไม่มีข้อมูล
          </div>
        </div>
      ) : (
        <div className="w-full rounded-sm px-10">
          <div className="py-2 px-5 flex items-center rounded-t-lg gap-3 bg-blue-500 ">
            <UserRoundCheck className="w-5 h-5 text-white" />
            <div className="text-lg flex items-center justify-start gap-4 text-white font-prompt">
              รายการกลุ่มเรียนทั้งหมด
              <p className="bg-blue-400 rounded-md px-4 py-0.5 text-white">
                {totalCount}
              </p>
              รายการ
              <span className="text-sm opacity-90">
                (แสดง {currentFrom}-{currentTo})
              </span>
            </div>
          </div>

          <div className="shadow-lg w-full text-sm">
            <div className="grid grid-cols-[8%_16%_22%_10%_12%_12%_10%_10%] text-black bg-gray-50 border-b text-lg">
              <div className="flex items-center justify-center py-2">ลำดับ</div>
              <div className="flex items-center justify-center py-2">
                รหัสห้อง
              </div>
              <div className="flex items-center justify-center py-2">ห้อง</div>
              <div className="flex items-center justify-center py-2">
                ภาคเรียน
              </div>
              <div className="flex items-center justify-center py-2">
                ปีการศึกษา
              </div>
              <div className="flex items-center justify-center py-2">
                จำนวนนักเรียน
              </div>
              <div className="flex items-center justify-center py-2">
                สถานะการใช้งาน
              </div>
              <div className="flex items-center justify-center py-2">แก้ไข</div>
            </div>

            {paginated.map((item, index) => {
              const count = Number(item.total ?? 0);
              const canDelete = count === 0;

              return (
                <div
                  key={item.id}
                  className="cursor-default grid grid-cols-[8%_16%_22%_10%_12%_12%_10%_10%] bg-white hover:bg-blue-100 text-gray-800 text-base"
                >
                  <div className="flex items-center justify-center py-2">
                    {(currentPage - 1) * itemsPerPage + index + 1}.
                  </div>

                  <div className="flex items-center justify-center py-2">
                    {item.groupCode || "-"}
                  </div>

                  <div className="flex items-center justify-center py-2">
                    {(item.class ?? "") +
                      (item.class ? " " : "") +
                      (item.groupName ?? "")}
                  </div>

                  <div className="flex items-center justify-center py-2">
                    {item.term || "-"}
                  </div>

                  <div className="flex items-center justify-center py-2">
                    {item.year ?? "-"}
                  </div>

                  <div className="flex items-center justify-center py-2">
                    {count}
                  </div>

                  <div className="flex items-center justify-center py-2">
                    <IsActiveToggleProps
                      isActive={!!item.isActive}
                      disabled={updatingId === item.id}
                      onToggle={(value: boolean) =>
                        handleToggleActive(item.id as number, value)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-center py-2 gap-3">
                    <span className="group">
                      <Settings
                        className={
                          "w-5 h-5 cursor-pointer text-blue-400 group-hover:text-blue-500"
                        }
                        onClick={() => {
                          setOpenEditGrupPopup(true);
                          setGroupEdit(item);
                        }}
                      />
                    </span>
                    <span>
                      <Trash2
                        className={
                          "w-5 h-5 cursor-pointer " +
                          (canDelete
                            ? "text-red-500 hover:text-red-700"
                            : "text-gray-300 cursor-not-allowed")
                        }
                        onClick={() =>
                          canDelete && openDeleteConfirm(item.id as number)
                        }
                      />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center items-center gap-4 mt-4">
            <button
              className="px-4 py-1 bg-gray-200 rounded disabled:opacity-50"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              ก่อนหน้า
            </button>

            <span className="text-sm text-gray-700">
              หน้า {currentPage} / {totalPages}
            </span>

            <button
              className="px-4 py-1 bg-gray-200 rounded disabled:opacity-50"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage >= totalPages}
            >
              ถัดไป
            </button>
          </div>
        </div>
      )}

      {openCreatePopup && (
        <AddStudentGroupPopup
          onClosePopUp={(shouldReload) => {
            setOpenCreatePopup(false);
            if (shouldReload) {
              setCurrentPage(1);
              fetchGroups();
            }
          }}
        />
      )}

      {(() => {
        const selectedItem = groups.find((g) => g.id === openDeleteId);
        return (
          openDeleteId !== null &&
          selectedItem && (
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
                <h3 className="text-lg font-semibold text-red-600 mb-2">
                  ยืนยันการลบ
                </h3>
                <p className="text-sm text-gray-700 mb-6">
                  ต้องการลบกลุ่มเรียนหมายเลข{" "}
                  <b>
                    {(selectedItem.class ?? "") +
                      (selectedItem.class ? " " : "") +
                      (selectedItem.groupName ?? "")}{" "}
                    เทอม {selectedItem.term || "-"} ปี{" "}
                    {selectedItem.year ?? "-"}
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
          )
        );
      })()}

      {openEditGroupPopup && groupEdit && (
        <EditGroupPopup
          onClosePopUp={setOpenEditGrupPopup}
          payload={groupEdit}
        />
      )}
    </div>
  );
}
