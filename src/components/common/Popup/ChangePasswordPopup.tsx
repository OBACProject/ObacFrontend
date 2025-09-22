"use client";

import { UpdateUserPassword } from "@/api/user/userAPI";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
// ปรับพาธให้ตรงกับโปรเจกต์ของคุณ

export interface ChangePasswordPopupProps {
  userId: string;                     // จำเป็น
  onClosePopUp: (changed: boolean) => void;  // true = เปลี่ยนสำเร็จ, false = ปิดเฉย ๆ
}

const ChangePasswordPopup: React.FC<ChangePasswordPopupProps> = ({
  userId,
  onClosePopUp,
}) => {
  const [newPassword, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  // ปิดด้วยปุ่ม ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClosePopUp(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClosePopUp]);

  const submit = async () => {
    if (!newPassword || !confirm) {
      toast.error("กรุณากรอก password และ confirm password");
      return;
    }
    if (newPassword !== confirm) {
      toast.error("รหัสผ่านไม่ตรงกัน");
      return;
    }
    try {
      setLoading(true);
      const ok = await UpdateUserPassword({
        userId,
        newPassword,
        confirmPassword: confirm,
      });
      if (ok) {
        toast.success("เปลี่ยนรหัสผ่านเรียบร้อย");
        onClosePopUp(true);
      } else {
        toast.error("เปลี่ยนรหัสผ่านไม่สำเร็จ");
      }
    } catch (err: any) {
      const errors = err?.response?.data?.errors;
      if (errors && typeof errors === "object") {
        const firstKey = Object.keys(errors)[0];
        const firstMsg = Array.isArray(errors[firstKey])
          ? errors[firstKey][0]
          : String(errors[firstKey]);
        toast.error(firstMsg);
      } else {
        const msg =
          err?.response?.data?.responseMessage ||
          err?.response?.data?.title ||
          err?.message ||
          "เกิดข้อผิดพลาดจากเซิร์ฟเวอร์";
        toast.error(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center"
      onClick={() => onClosePopUp(false)}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-6 w-[420px] space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold text-blue-700">เปลี่ยนรหัสผ่าน</h2>

        <div>
          <label className="text-sm">รหัสผ่านใหม่</label>
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border px-3 py-2 rounded pr-10"
              autoFocus
            />
            <button
              type="button"
              className="absolute top-1/2 right-3 -translate-y-1/2 text-sm text-gray-500"
              onClick={() => setShowPass((s) => !s)}
            >
              {showPass ? "ซ่อน" : "แสดง"}
            </button>
          </div>
        </div>

        <div>
          <label className="text-sm">ยืนยันรหัสผ่าน</label>
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="w-full border px-3 py-2 rounded pr-10"
              onKeyDown={(e) => e.key === "Enter" && !loading && submit()}
            />
            <button
              type="button"
              className="absolute top-1/2 right-3 -translate-y-1/2 text-sm text-gray-500"
              onClick={() => setShowConfirm((s) => !s)}
            >
              {showConfirm ? "ซ่อน" : "แสดง"}
            </button>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <button
            className="px-4 py-1 bg-gray-300 rounded"
            onClick={() => onClosePopUp(false)}
            disabled={loading}
          >
            ยกเลิก
          </button>
          <button
            className="px-4 py-1 bg-blue-600 text-white rounded disabled:opacity-50"
            onClick={submit}
            disabled={loading}
          >
            บันทึก
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordPopup;
