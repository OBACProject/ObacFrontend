
"use client";

import { UserRoundCheck, PlusCircle, GraduationCap } from "lucide-react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import AddStudentAccountPopup from "@/components/common/Popup/AddStudentAccountPopup";
import IsActiveToggleProps from "@/components/common/Toggle/IsActiveToggle";
import { toast } from "react-toastify";
import { UpdateIsActiveUser } from "@/api/user/userAPI";
import { GetAllStudentsPaged } from "@/api/student/route";
import { GetAllStudentUser } from "@/dto/studentDto";

export default function Form() {
  const router = useRouter();


  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(15);

  
  const [searchTerm, setSearchTerm] = useState("");


  const [students, setStudents] = useState<GetAllStudentUser[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [hasPrev, setHasPrev] = useState(false);
  const [hasNext, setHasNext] = useState(false);

  
  const [loading, setLoading] = useState(true);    
  const [isFetching, setIsFetching] = useState(false); 

  const [openCreateStudentPopup, setOpenCreateStudentPopup] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);


  const abortRef = useRef<AbortController | null>(null);
  const mountedRef = useRef(false);

  const fetchPage = async (page = pageNumber, code = searchTerm.trim()) => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    if (!mountedRef.current) {
      setLoading(true);
    } else {
      setIsFetching(true);
    }

    try {
      const res = await GetAllStudentsPaged({
        pageNumber: page,
        pageSize,
      
        searchTerm: code || undefined,
        searchCategory: "studentCode",
        sortBy: "studentCode",
        ascending: true,
      });

      if (controller.signal.aborted) return;

      setStudents(res.items);
      setTotalPages(res.totalPages);
      setTotalCount(res.totalCount);
      setHasPrev(res.hasPreviousPage);
      setHasNext(res.hasNextPage);
    } catch (e) {
      if (!controller.signal.aborted) {
        console.error(e);
        toast.error("โหลดข้อมูลไม่สำเร็จ");
      }
    } finally {
      if (!controller.signal.aborted) {
        setLoading(false);
        setIsFetching(false);
        mountedRef.current = true;
      }
    }
  };


  useEffect(() => {
    fetchPage(pageNumber);
   
  }, [pageNumber]);

  const handleSearch = () => {
    setPageNumber(1);
    
    fetchPage(1, searchTerm.trim());
  };

  const clearSearch = () => {
    setSearchTerm("");
    setPageNumber(1);
    fetchPage(1, "");
  };

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

  const currentFrom = useMemo(
    () => (totalCount === 0 ? 0 : (pageNumber - 1) * pageSize + 1),
    [pageNumber, pageSize, totalCount]
  );
  const currentTo = useMemo(
    () => Math.min(pageNumber * pageSize, totalCount),
    [pageNumber, pageSize, totalCount]
  );

  return (
    <div className="w-full">
      <div className="flex py-3 px-10 justify-start">
        <h1 className="px-8 py-2 rounded-3xl flex gap-2 items-center text-xl w-fit border border-gray-100 shadow-md text-blue-700">
          <GraduationCap className="h-8 w-8" />
          ระบบจัดการนักเรียน
        </h1>
      </div>

      <div className="px-10 pt-6 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="ค้นหารหัสนักเรียน"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
            className="border border-gray-400 px-4 py-1 rounded-md"
          />
          <button
            className="px-4 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded"
            onClick={handleSearch}
            disabled={isFetching}
          >
            ค้นหา
          </button>
          <button
            className="px-3 py-1  hover:bg-gray-300 rounded"
            onClick={clearSearch}
            disabled={isFetching && !searchTerm}
          >
            รีเซ็ต
          </button>
        </div>

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
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse bg-gray-200 h-10 mb-2 rounded" />
          ))}
        </div>
      ) : (
        <div className="w-full rounded-sm px-10 relative">
          {isFetching && (
            <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px] rounded pointer-events-none transition-opacity" />
          )}

          <div className="py-2 px-5 flex items-center rounded-t-lg gap-3 bg-blue-500 ">
            <UserRoundCheck className="w-5 h-5 text-white" />
            <div className="text-lg flex items-center justify-start gap-4 text-white font-prompt">
              รายชื่อนักเรียนทั้งหมด
              <p className="bg-blue-400 rounded-md px-4 py-0.5 text-white">
                {totalCount}
              </p>
              รายการ
              <span className="text-sm opacity-90">
                (แสดง {currentFrom}-{currentTo})
              </span>
              {isFetching && <span className="text-xs italic opacity-80">กำลังโหลด…</span>}
            </div>
          </div>

          <div className={`shadow-lg w-full text-sm transition-opacity ${isFetching ? "opacity-90" : "opacity-100"}`}>
            <div className="grid grid-cols-[5%_20%_25%_20%_15%_15%] text-black bg-gray-50 border-b text-lg">
              <div className="flex items-center justify-center py-2">ลำดับ</div>
              <div className="flex items-center justify-center py-2">รหัสนักเรียน</div>
              <div className="flex items-center justify-center py-2">ชื่อ-นามสกุล</div>
              <div className="flex items-center justify-center py-2">ห้องเรียน</div>
              <div className="flex items-center justify-center py-2">เพศ</div>
              <div className="flex items-center justify-center py-2">สถานะ</div>
            </div>

            {students.length === 0 ? (
              <div className="py-10 text-center text-gray-500">ไม่พบข้อมูล</div>
            ) : (
              students.map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  onClick={() => {
                    if (item.studentId) {
                      router.push(`/admin/student-details/${item.studentId}`);
                    }
                  }}
                  className="cursor-pointer grid grid-cols-[5%_20%_25%_20%_15%_15%] bg-white hover:bg-blue-100 text-gray-800 text-base"
                >
                  <div className="flex items-center justify-center py-2">
                    {currentFrom + index}.
                  </div>
                  <div className="flex items-center justify-center py-2">
                    {item.studentCode || "-"}
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
                      isActive={!!item.isActive}
                      disabled={updatingId === item.id}
                      onToggle={(value: boolean) => handleToggleActive(String(item.id), value)}
                    />
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="flex justify-center items-center gap-4 mt-4">
            <button
              className="px-4 py-1 bg-gray-200 rounded disabled:opacity-50"
              onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
              disabled={!hasPrev || pageNumber === 1 || isFetching}
            >
              ก่อนหน้า
            </button>

            <span className="text-sm text-gray-700">
              หน้า {pageNumber} / {Math.max(1, totalPages)}
            </span>

            <button
              className="px-4 py-1 bg-gray-200 rounded disabled:opacity-50"
              onClick={() => setPageNumber((p) => p + 1)}
              disabled={!hasNext || isFetching}
            >
              ถัดไป
            </button>
          </div>
        </div>
      )}

      {openCreateStudentPopup && (
        <AddStudentAccountPopup
          onClosePopUp={async (shouldReload: boolean) => {
            setOpenCreateStudentPopup(false);
            if (shouldReload) await fetchPage(1, searchTerm.trim());
          }}
        />
      )}
    </div>
  );
}
