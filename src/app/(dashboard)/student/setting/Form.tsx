"use client";
import React, { useMemo, useState } from "react";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";
import { ChangePassword } from "@/api/auth/route";
const MIN_LEN = 6;

export default function Form() {
  const [oldPwd, setOldPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [loading, setLoading] = useState(false);
  const [okMsg, setOkMsg] = useState<string | null>(null);
  const [errMsg, setErrMsg] = useState<string | null>(null);

  const canSubmit = useMemo(() => {
    if (!oldPwd || !newPwd) return false;
    if (oldPwd === newPwd) return false;
    if (newPwd.length < MIN_LEN) return false;
    const hasUpper = /[A-Z]/.test(newPwd);
    const hasNum = /\d/.test(newPwd);
    // const hasSym = /[^A-Za-z0-9]/.test(newPwd);
    return hasUpper && hasNum
  }, [oldPwd, newPwd]);

  const strength = useMemo(() => {
    let score = 0;
    if (newPwd.length >= MIN_LEN) score++;
    if (/[A-Z]/.test(newPwd)) score++;
    if (/[a-z]/.test(newPwd)) score++;
    if (/\d/.test(newPwd)) score++;
    // if (/[^A-Za-z0-9]/.test(newPwd)) score++;
    return score; 
  }, [newPwd]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrMsg(null);
    setOkMsg(null);

    if (!canSubmit) return;
    try {
      setLoading(true);
      const ok = await ChangePassword({
        currentPassword: oldPwd,
        newPassword: newPwd,
      });

      if (ok == true) {
        setOkMsg("เปลี่ยนรหัสผ่านสำเร็จ");
        setOldPwd("");
        setNewPwd("");
      } else {
        setErrMsg(
          "เปลี่ยนรหัสผ่านไม่สำเร็จ กรุณาตรวจสอบรหัสผ่านเดิมหรือเงื่อนไขความปลอดภัย"
        );
      }
    } catch (err) {
      console.error(err);
      setErrMsg("เกิดข้อผิดพลาดระหว่างเชื่อมต่อเซิร์ฟเวอร์");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" grid place-items-center p-4 ">
      <div className="w-full max-w-md">
        <div className="rounded-2xl shadow-xl bg-white/80 backdrop-blur p-6 border border-indigo-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-xl bg-indigo-600 text-white">
              <LockKeyhole className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-prompt tracking-tight">
              เปลี่ยนรหัสผ่าน
            </h1>
          </div>
          <p className="text-sm text-gray-500 mb-6">
            เพื่อความปลอดภัย กรุณาใช้รหัสผ่านใหม่ที่แข็งแรง
          </p>

          {okMsg && (
            <div className="mb-4 flex items-start gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-emerald-800">
              <ShieldCheck className="w-5 h-5 mt-0.5" />
              <span className="text-sm">{okMsg}</span>
            </div>
          )}
          {errMsg && (
            <div className="mb-4 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-red-800">
              <AlertCircle className="w-5 h-5 mt-0.5" />
              <span className="text-sm">{errMsg}</span>
            </div>
          )}

          <form onSubmit={onSubmit} className="grid gap-5">
            <div className="grid gap-2">
              <label className="text-sm font-medium">รหัสผ่านเดิม</label>
              <div className="relative">
                <input
                  type={showOld ? "text" : "password"}
                  value={oldPwd}
                  onChange={(e) => setOldPwd(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 pr-11 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="กรอกรหัสผ่านเดิม"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowOld((s) => !s)}
                  className="absolute inset-y-0 right-2 grid place-items-center px-2 text-gray-500 hover:text-gray-700"
                  aria-label={showOld ? "ซ่อนรหัสผ่านเดิม" : "แสดงรหัสผ่านเดิม"}
                >
                  {showOld ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">รหัสผ่านใหม่</label>
              <div className="relative">
                <input
                  type={showNew ? "text" : "password"}
                  value={newPwd}
                  onChange={(e) => setNewPwd(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 pr-11 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="อย่างน้อย 8 ตัว มีตัวพิมพ์ใหญ่ ตัวเลข และสัญลักษณ์"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowNew((s) => !s)}
                  className="absolute inset-y-0 right-2 grid place-items-center px-2 text-gray-500 hover:text-gray-700"
                  aria-label={showNew ? "ซ่อนรหัสผ่านใหม่" : "แสดงรหัสผ่านใหม่"}
                >
                  {showNew ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              <div className="mt-1">
                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      strength <= 1
                        ? "bg-red-400 w-1/5"
                        : strength === 2
                        ? "bg-orange-400 w-2/5"
                        : strength === 3
                        ? "bg-yellow-400 w-3/5"
                        : strength === 4
                        ? "bg-lime-500 w-4/5"
                        : "bg-emerald-500 w-full"
                    }`}
                  />
                </div>
                <p className="text-[12px] text-gray-500 mt-1">
                  ความแข็งแรงของรหัสผ่าน:{" "}
                  {
                    ["อ่อนมาก", "อ่อน", "ปานกลาง", "ดี", "แข็งแรง"][
                      Math.max(0, strength - 1)
                    ]
                  }
                </p>
              </div>

              {/* Tips */}
              <ul className="text-[12px] text-gray-500 grid gap-1 mt-1">
                <li
                  className={`${
                    newPwd.length >= MIN_LEN ? "text-emerald-600" : ""
                  }`}
                >
                  • ยาวอย่างน้อย {MIN_LEN} ตัวอักษร
                </li>
                <li
                  className={`${
                    /[A-Z]/.test(newPwd) ? "text-emerald-600" : ""
                  }`}
                >
                  • มีตัวอักษรพิมพ์ใหญ่ (A–Z)
                </li>
                <li
                  className={`${/\d/.test(newPwd) ? "text-emerald-600" : ""}`}
                >
                  • มีตัวเลข (0–9)
                </li>
                {/* <li
                  className={`${
                    /[^A-Za-z0-9]/.test(newPwd) ? "text-emerald-600" : ""
                  }`}
                >
                  • มีสัญลักษณ์ (!@#$%^&* เป็นต้น)
                </li> */}
                <li
                  className={`${
                    newPwd && newPwd !== oldPwd ? "text-emerald-600" : ""
                  }`}
                >
                  • ต้องไม่ซ้ำกับรหัสผ่านเดิม
                </li>
              </ul>
            </div>

            <button
              type="submit"
              disabled={!canSubmit || loading}
              className="relative inline-flex items-center justify-center rounded-xl bg-indigo-600 text-white px-4 py-2.5 font-medium shadow-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/70 border-t-transparent" />
                  กำลังบันทึก...
                </span>
              ) : (
                <span>ยืนยันการเปลี่ยนรหัสผ่าน</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
