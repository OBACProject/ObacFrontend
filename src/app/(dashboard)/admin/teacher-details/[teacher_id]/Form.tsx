"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Pencil, Save, CircleX, KeyRound, Trash2, UserPen } from "lucide-react";
import { toast } from "react-toastify";

import { GetTeacherDetailUser } from "@/api/teacher/route";
import type { GetTeacherDetailUserResponse } from "@/dto/teacherDto";

import { UpdateUserDetails } from "@/api/user/userAPI";
import type { UpdateUserDetailRequest } from "@/dto/userDto";

import ChangePasswordPopup from "@/components/common/Popup/ChangePasswordPopup";
import DeleteUserPopup from "@/components/common/Popup/DeleteUserPopup";

// ✅ ใช้รายการ Program เพื่อให้ผู้ใช้เลือกเปลี่ยนได้
import { GetAllPrograms } from "@/api/program/rount";
import type { GetAllProgramsResponse } from "@/dto/programDto";

/* ---------------- Date helpers ---------------- */
function toISODate(input?: string | null): string {
  if (!input) return "";
  const t = String(input).match(/^(\d{4})-(\d{2})-(\d{2})T/);
  if (t) return `${t[1]}-${t[2]}-${t[3]}`;
  if (/^\d{4}-\d{2}-\d{2}$/.test(String(input))) return String(input);
  const dmy = String(input).match(/^(\d{1,2})[\/-](\d{1,2})[\/-](\d{4})$/);
  if (dmy) {
    const dd = dmy[1].padStart(2, "0");
    const mm = dmy[2].padStart(2, "0");
    const yy = dmy[3];
    return `${yy}-${mm}-${dd}`;
  }
  const d = new Date(String(input));
  if (!isNaN(d.getTime())) {
    const yy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yy}-${mm}-${dd}`;
  }
  return String(input);
}
function isoToDMY(iso?: string | null): string {
  if (!iso) return "";
  const m = String(iso).match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return String(iso);
  const [, y, mm, dd] = m;
  return `${dd}/${mm}/${y}`;
}

/* ---------------- Component ---------------- */
type Props = { teacherId: number };

export default function TeacherDetailForm({ teacherId }: Props) {
  const [formData, setFormData] = useState<GetTeacherDetailUserResponse | null>(null);
  const [originalData, setOriginalData] = useState<GetTeacherDetailUserResponse | null>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [saving, setSaving] = useState(false);

  // ✅ Programs สำหรับ dropdown
  const [programRows, setProgramRows] = useState<GetAllProgramsResponse[]>([]);
  const [loadingPrograms, setLoadingPrograms] = useState(false);
  const [programsError, setProgramsError] = useState<string | null>(null);

  // ✅ program ที่เลือกอยู่ (ใช้เลข programId)
  const [selectedProgramId, setSelectedProgramId] = useState<number | null>(null);

  // โหลดข้อมูลอาจารย์
  useEffect(() => {
    GetTeacherDetailUser(teacherId).then((data) => {
      if (!data) return;
      const normalized = { ...data, birthDate: toISODate(data.birthDate) };
      setFormData(normalized);
      setOriginalData(normalized);

      // เดา field programId จาก response หลายรูปแบบที่เจอได้บ่อย
      const pid =
        (data as any).programId ??
        (data as any).ProgramId ??
        (data as any)?.program?.programId ??
        null;
      setSelectedProgramId(pid ? Number(pid) : null);
    });
  }, [teacherId]);

  // โหลด Programs
  useEffect(() => {
    const load = async () => {
      try {
        setLoadingPrograms(true);
        setProgramsError(null);
        const data = await GetAllPrograms();
        const rows = Array.isArray(data) ? data : [];
        // เรียงให้อ่านง่าย
        rows.sort((a, b) =>
          `${a.facultyName}|${a.programName}|${a.subProgramName}`.localeCompare(
            `${b.facultyName}|${b.programName}|${b.subProgramName}`,
            "th",
            { sensitivity: "base" }
          )
        );
        setProgramRows(rows);
      } catch (e) {
        console.error(e);
        setProgramsError("โหลดข้อมูลโปรแกรมไม่สำเร็จ");
      } finally {
        setLoadingPrograms(false);
      }
    };
    load();
  }, []);

  // program info ปัจจุบัน (สำหรับแสดงผลตอนดู/แก้)
  const programInfo = useMemo(() => {
    if (!selectedProgramId || !programRows.length) return null;
    return programRows.find((p) => p.programId === Number(selectedProgramId)) || null;
  }, [selectedProgramId, programRows]);

  const handleChange = (field: keyof GetTeacherDetailUserResponse, value: string) => {
    if (formData) setFormData({ ...formData, [field]: value });
  };

  const handleSave = async () => {
    if (!formData) return;

    if (!formData.firstName?.trim() || !formData.lastName?.trim()) {
      toast.error("กรุณากรอกชื่อและนามสกุล");
      return;
    }
    if (!formData.birthDate) {
      toast.error("กรุณาเลือกวันเกิด");
      return;
    }
    if (!selectedProgramId) {
      toast.error("กรุณาเลือก Program");
      return;
    }

    const userId = (formData as any)?.id ?? (formData as any)?.userId;
    if (!userId) {
      toast.error("ไม่พบรหัสผู้ใช้ (userId)");
      return;
    }

    // ✅ แนบ programId ไปด้วย (ถ้า backend รองรับ)
    const payload: UpdateUserDetailRequest & { programId?: number } = {
      id: String(userId),
      prefix: formData.prefix ?? "",
      firstName: formData.firstName ?? "",
      lastName: formData.lastName ?? "",
      phoneNumber: formData.phoneNumber ?? "",
      citizenId: formData.citizenId ?? "",
      gender: formData.gender ?? "",
      nationality: formData.nationality ?? "",
      birthDate: toISODate(formData.birthDate),
      programId: Number(selectedProgramId),
    };

    try {
      setSaving(true);
      const ok = await UpdateUserDetails(payload);
      if (ok) {
        toast.success("บันทึกข้อมูลเรียบร้อย");
        // sync ค่าเดิม
        setOriginalData((prev) =>
          prev ? { ...prev, ...(formData as any) } : (formData as any)
        );
        setIsEditing(false);
      } else {
        toast.error("บันทึกข้อมูลไม่สำเร็จ");
      }
    } catch (err: any) {
      const errors = err?.response?.data?.errors;
      if (errors && typeof errors === "object") {
        const firstKey = Object.keys(errors)[0];
        const firstMsg = Array.isArray(errors[firstKey]) ? errors[firstKey][0] : String(errors[firstKey]);
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
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData(originalData);
    // รีเซ็ต program ที่เลือกกลับตามเดิม
    const pid =
      (originalData as any)?.programId ??
      (originalData as any)?.ProgramId ??
      (originalData as any)?.program?.programId ??
      null;
    setSelectedProgramId(pid ? Number(pid) : null);

    setIsEditing(false);
  };

  if (!formData) return <div className="p-10">Loading...</div>;
  const userId = (formData as any)?.id ?? (formData as any)?.userId ?? "";

  return (
    <div className="w-full p-10">
      <div className="flex items-center justify-between mb-6">
        <div className="flex py-3 px-10 justify-start">
          <h1 className="px-8 py-2 rounded-3xl flex gap-2 items-center text-xl w-fit border border-gray-100 shadow-md text-blue-700">
            <UserPen className="h-8 w-8" />
            รายละเอียดอาจารย์
          </h1>
        </div>
        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <button
                className="w-[170px] bg-amber-500 hover:bg-amber-600 rounded-md flex justify-center items-center gap-2 py-1 text-white disabled:opacity-60"
                onClick={() => setOpenChangePassword(true)}
                disabled={!userId || saving}
                title={!userId ? "ไม่พบ userId" : ""}
              >
                <KeyRound className="w-5 h-5" />
                เปลี่ยนรหัสผ่าน
              </button>
              <button
                className="w-[120px] bg-green-500 rounded-md flex justify-center items-center gap-2 py-1 text-white disabled:opacity-60"
                onClick={handleSave}
                disabled={saving}
              >
                <Save className="w-5 h-5" />
                {saving ? "กำลังบันทึก..." : "บันทึก"}
              </button>
              <button
                className="w-[120px] bg-red-500 rounded-md flex justify-center items-center gap-2 py-1 text-white"
                onClick={handleCancel}
                disabled={saving}
              >
                <CircleX className="w-5 h-5" />
                ยกเลิก
              </button>
              <button
                className="w-[120px] bg-red-700 hover:bg-red-800 rounded-md flex justify-center items-center gap-2 py-1 text-white disabled:opacity-60"
                onClick={() => setOpenDeletePopup(true)}
                disabled={!userId || saving}
                title={!userId ? "ไม่พบ userId" : ""}
              >
                <Trash2 className="w-5 h-5" />
                ลบผู้ใช้
              </button>
            </>
          ) : (
            <>
              <button
                className="w-[120px] bg-blue-500 hover:bg-blue-600 rounded-md flex justify-center items-center gap-2 py-1 text-white"
                onClick={() => setIsEditing(true)}
              >
                <Pencil className="w-5 h-5" />
                แก้ไข
              </button>
              <button
                className="w-[120px] bg-red-700 hover:bg-red-800 rounded-md flex justify-center items-center gap-2 py-1 text-white disabled:opacity-60"
                onClick={() => setOpenDeletePopup(true)}
                disabled={!userId}
                title={!userId ? "ไม่พบ userId" : ""}
              >
                <Trash2 className="w-5 h-5" />
                ลบผู้ใช้
              </button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 bg-white shadow-md rounded-lg p-6">
        {/* account */}
        <Info label="ชื่อผู้ใช้" value={formData.username} editable={false} />

        <Info label="คำนำหน้า" value={formData.prefix} editable={isEditing} onChange={(v) => handleChange("prefix", v)} type="select" options={["นาย", "นาง", "นางสาว"]} />
        <Info label="ชื่อจริง" value={formData.firstName} editable={isEditing} onChange={(v) => handleChange("firstName", v)} />
        <Info label="นามสกุล" value={formData.lastName} editable={isEditing} onChange={(v) => handleChange("lastName", v)} />
        <Info label="เพศ" value={formData.gender} editable={isEditing} onChange={(v) => handleChange("gender", v)} type="select" options={["ชาย", "หญิง"]} />
        <Info label="วันเกิด" value={formData.birthDate} editable={isEditing} onChange={(v) => handleChange("birthDate", toISODate(v))} type="date" />
        <Info label="รหัสอาจารย์" value={formData.teacherCode} editable={isEditing} onChange={(v) => handleChange("teacherCode", v)} />
        <Info label="รหัสประชาชน" value={formData.citizenId} editable={isEditing} onChange={(v) => handleChange("citizenId", v)} />
        <Info label="เบอร์โทร" value={formData.phoneNumber} editable={isEditing} onChange={(v) => handleChange("phoneNumber", v)} />
        <Info label="สัญชาติ" value={formData.nationality} editable={isEditing} onChange={(v) => handleChange("nationality", v)} />

        {/* ---------- Program: dropdown เมื่อแก้ไข / แสดงผลเมื่อดู ---------- */}
        <div className="col-span-2">
          {!isEditing ? (
            <div className="grid grid-cols-4 gap-4">
              <ReadOnlyBox label="คณะ (Faculty)" value={programInfo?.facultyName || (loadingPrograms ? "กำลังโหลด..." : programsError ? "โหลดข้อมูลไม่สำเร็จ" : "—")} />
              <ReadOnlyBox label="สาขา (Program)" value={programInfo?.programName || (loadingPrograms ? "กำลังโหลด..." : programsError ? "โหลดข้อมูลไม่สำเร็จ" : "—")} />
              <ReadOnlyBox label="แขนง (Sub Program)" value={programInfo?.subProgramName || (loadingPrograms ? "กำลังโหลด..." : programsError ? "โหลดข้อมูลไม่สำเร็จ" : "—")} />
              <ReadOnlyBox label="Program ID" value={selectedProgramId ? String(selectedProgramId) : "—"} />
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-4 items-end">
              <div className="col-span-4">
                <label className="text-sm text-gray-700">เลือก Program</label>
                <select
                  value={selectedProgramId ?? ""}
                  onChange={(e) => setSelectedProgramId(e.target.value === "" ? null : Number(e.target.value))}
                  className="w-full border px-3 py-2 rounded"
                  disabled={loadingPrograms || !!programsError}
                >
                  <option value="">
                    {loadingPrograms
                      ? "กำลังโหลดข้อมูล..."
                      : programsError
                      ? "โหลดข้อมูลไม่สำเร็จ"
                      : "— เลือก Program —"}
                  </option>
                  {programRows.map((p) => (
                    <option key={p.programId} value={p.programId}>
                      {p.programName} — {p.subProgramName || "-"} ({p.facultyName})
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  * จะบันทึกเป็น Program ID: <b>{selectedProgramId ?? "-"}</b>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {openChangePassword && !!userId && (
        <ChangePasswordPopup
          userId={String(userId)}
          onClosePopUp={(changed) => {
            setOpenChangePassword(false);
            if (changed) toast.success("เปลี่ยนรหัสผ่านเรียบร้อย");
          }}
        />
      )}

      {openDeletePopup && !!userId && (
        <DeleteUserPopup userId={String(userId)} onClose={() => setOpenDeletePopup(false)} />
      )}
    </div>
  );
}

/* ---------------- Small helpers ---------------- */
function Info({
  label,
  value,
  editable,
  onChange,
  type = "text",
  options,
}: {
  label: string;
  value: string | null | undefined;
  editable?: boolean;
  onChange?: (value: string) => void;
  type?: "text" | "tel" | "date" | "select";
  options?: string[];
}) {
  const isDate = type === "date";

  if (!editable) {
    const display = isDate ? (value ? isoToDMY(String(value)) : "—") : value && String(value).trim() !== "" ? String(value) : "—";
    return (
      <div>
        <label className="text-sm text-gray-500">{label}</label>
        <p className="w-full border px-3 py-2 rounded">{display}</p>
      </div>
    );
  }

  if (type === "select" && options) {
    return (
      <div>
        <label className="text-sm text-gray-500">{label}</label>
        <select value={value ?? ""} onChange={(e) => onChange?.(e.target.value)} className="w-full border px-3 py-2 rounded">
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
    );
  }

  if (isDate) {
    return (
      <div>
        <label className="text-sm text-gray-500">{label}</label>
        <input type="date" value={value ?? ""} onChange={(e) => onChange?.(e.target.value)} className="w-full border px-3 py-2 rounded" lang="th-TH" />
      </div>
    );
  }

  return (
    <div>
      <label className="text-sm text-gray-500">{label}</label>
      <input type={type} value={value ?? ""} onChange={(e) => onChange?.(e.target.value)} className="w-full border px-3 py-2 rounded" />
    </div>
  );
}

function ReadOnlyBox({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <label className="text-sm text-gray-500">{label}</label>
      <p className="w-full border px-3 py-2 rounded bg-white">{value || "—"}</p>
    </div>
  );
}
