"use client";

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation"; // ใช้ router เพื่อ back
import { DeleteUser } from "@/api/user/userAPI";

type Props = {
  userId: string;
  onClose: () => void;
};

const DeleteUserPopup: React.FC<Props> = ({ userId, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // ปิดด้วยปุ่ม ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleConfirmDelete = async () => {
     if (isSubmitting) return;
  setIsSubmitting(true);
    
    try {
      setLoading(true);
      const ok = await DeleteUser(userId);
      if (ok) {
        toast.success("ลบผู้ใช้เรียบร้อย");
        setTimeout(() => {
          router.back(); // กลับไปหน้าก่อนหน้า
        }, 1200); // เว้นเวลาให้ toast โชว์สักนิด
        return;
      }
      toast.error("ลบผู้ใช้ไม่สำเร็จ");
    } catch (err: any) {
      const msg =
        err?.response?.data?.responseMessage ||
        err?.response?.data?.title ||
        err?.message ||
        "ลบผู้ใช้ไม่สำเร็จ";
      toast.error(msg);
    } finally {
      setLoading(false);
      setIsSubmitting(false);
    }
    
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-6 w-[420px]"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold text-red-600 mb-4">ยืนยันการลบผู้ใช้</h2>
        <p className="mb-6">
          ต้องการลบผู้ใช้หมายเลข <span className="font-semibold">{userId}</span> ใช่หรือไม่?
          การกระทำนี้ไม่สามารถย้อนกลับได้
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 disabled:opacity-60"
            disabled={loading}
          >
            ยกเลิก
          </button>
          <button
            onClick={handleConfirmDelete}
            className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white disabled:opacity-60"
            disabled={loading ||isSubmitting}
          >
            {loading ? "กำลังลบ..." : "ลบผู้ใช้"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteUserPopup;
