"use client";

import React, { useEffect, useState } from "react";
import { Box, Pencil, Save, CircleX, KeyRound, Trash2, LibraryBig } from "lucide-react";
import { GetAcademicDetailUser, UpdateUserDetails } from "@/api/user/userAPI";
import { GetAcademicDetailUserResponse, UpdateUserDetailRequest } from "@/dto/userDto";
import { toast } from "react-toastify";
import ChangePasswordPopup from "@/components/common/Popup/ChangePasswordPopup";
import DeleteUserPopup from "@/components/common/Popup/DeleteUserPopup";

type Props = {
  academicId: number;
};

/* -------------------- Date helpers -------------------- */
function toISODate(input?: string | null): string {
  if (!input) return "";
  const isoT = input.match(/^(\d{4})-(\d{2})-(\d{2})T/);
  if (isoT) return `${isoT[1]}-${isoT[2]}-${isoT[3]}`;
  if (/^\d{4}-\d{2}-\d{2}$/.test(input)) return input;
  const dmy = input.match(/^(\d{1,2})[\/-](\d{1,2})[\/-](\d{4})$/);
  if (dmy) {
    const dd = dmy[1].padStart(2, "0");
    const mm = dmy[2].padStart(2, "0");
    const yyyy = dmy[3];
    return `${yyyy}-${mm}-${dd}`;
  }
  const d = new Date(input);
  if (!isNaN(d.getTime())) {
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }
  return input;
}
function isoToDMY(iso?: string | null): string {
  if (!iso) return "";
  const m = iso.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return iso;
  const [, y, mm, dd] = m;
  return `${dd}/${mm}/${y}`;
}
/* ------------------------------------------------------ */

export default function AcademicDetailForm({ academicId }: Props) {
  const [formData, setFormData] = useState<GetAcademicDetailUserResponse | null>(null);
  const [originalData, setOriginalData] = useState<GetAcademicDetailUserResponse | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const [openDeletePopup, setOpenDeletePopup] = useState(false); // ⬅️ state popup ลบ
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    GetAcademicDetailUser(academicId).then((data) => {
      if (!data) return;
      const normalized = { ...data, birthDate: toISODate(data.birthDate) };
      setFormData(normalized);
      setOriginalData(normalized);
    });
  }, [academicId]);

  const handleChange = (field: keyof GetAcademicDetailUserResponse, value: string) => {
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

    const userId = (formData as any)?.id ?? (formData as any)?.userId;
    console.log(userId, "userId in handleSave");
    if (!userId) {
      toast.error("ไม่พบรหัสผู้ใช้ (userId)");
      return;
    }

    const payload: UpdateUserDetailRequest = {
      id: String(userId),
      prefix: formData.prefix ?? "",
      firstName: formData.firstName ?? "",
      lastName: formData.lastName ?? "",
      phoneNumber: formData.phoneNumber ?? "",
      citizenId: formData.citizenId ?? "",
      gender: formData.gender ?? "",
      nationality: formData.nationality ?? "",
      birthDate: toISODate(formData.birthDate),
    };

    try {
      setSaving(true);
      const ok = await UpdateUserDetails(payload);
      if (ok) {
        toast.success("บันทึกข้อมูลเรียบร้อย");
        setOriginalData(formData);
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
    setIsEditing(false);
  };

  if (!formData) return <div className="p-10">Loading...</div>;
  const userId = (formData as any)?.id ?? (formData as any)?.userId;

  return (
    <div className="w-full p-10">
      <div className="flex items-center justify-between mb-6">
        <div className="flex py-3 px-10 justify-start">
          <h1 className="px-8 py-2 rounded-3xl flex gap-2 items-center text-xl w-fit border border-gray-100 shadow-md text-blue-700">
            <LibraryBig className="h-8 w-8" />
            รายละเอียดฝ่ายทะเบียน
          </h1>
        </div>

        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <button
                className="w-[180px] bg-amber-500 hover:bg-amber-600 rounded-md px-4 py-1 text-white flex items-center justify-center gap-2 disabled:opacity-60"
                onClick={() => setOpenChangePassword(true)}
                disabled={!userId || saving}
                title={!userId ? "ไม่พบ userId" : ""}
              >
                <KeyRound className="w-5 h-5" />
                เปลี่ยนรหัสผ่าน
              </button>
              <button
                className="w-[150px] bg-green-500 rounded-md px-4 py-1 text-white flex items-center justify-center gap-2 disabled:opacity-60"
                onClick={handleSave}
                disabled={saving}
              >
                <Save className="w-5 h-5" />
                {saving ? "กำลังบันทึก..." : "บันทึก"}
              </button>
              <button
                className="w-[150px] bg-red-500 rounded-md px-4 py-1 text-white flex items-center justify-center gap-2"
                onClick={handleCancel}
                disabled={saving}
              >
                <CircleX className="w-5 h-5" />
                ยกเลิก
              </button>

              {/* ปุ่ม Delete */}
              <button
                className="w-[140px] bg-red-700 hover:bg-red-800 rounded-md px-4 py-1 text-white flex items-center justify-center gap-2 disabled:opacity-60"
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
                className="w-[120px] bg-blue-400 hover:bg-blue-600 rounded-md px-4 py-1 text-white flex items-center justify-center gap-2"
                onClick={() => setIsEditing(true)}
              >
                <Pencil className="w-5 h-5" />
                แก้ไข
              </button>

              {/* ปุ่ม Delete */}
              <button
                className="w-[140px] bg-red-700 hover:bg-red-800 rounded-md px-4 py-1 text-white flex items-center justify-center gap-2 disabled:opacity-60"
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
        <Info label="ชื่อผู้ใช้" value={formData.username} editable={false} />
        <Info label="คำนำหน้า" value={formData.prefix} editable={isEditing} onChange={(v) => handleChange("prefix", v)} type="select" options={["นาย", "นาง", "นางสาว"]} />
        <Info label="ชื่อจริง" value={formData.firstName} editable={isEditing} onChange={(v) => handleChange("firstName", v)} />
        <Info label="นามสกุล" value={formData.lastName} editable={isEditing} onChange={(v) => handleChange("lastName", v)} />
        <Info label="เพศ" value={formData.gender} editable={isEditing} onChange={(v) => handleChange("gender", v)} type="select" options={["ชาย", "หญิง"]} />
        <Info label="วันเกิด" value={formData.birthDate} editable={isEditing} onChange={(v) => handleChange("birthDate", toISODate(v))} type="date" />
        <Info label="รหัสประชาชน" value={formData.citizenId} editable={isEditing} onChange={(v) => handleChange("citizenId", v)} />
        <Info label="เบอร์โทร" value={formData.phoneNumber} editable={isEditing} onChange={(v) => handleChange("phoneNumber", v)} />
        <Info label="สัญชาติ" value={formData.nationality} editable={isEditing} onChange={(v) => handleChange("nationality", v)} />
      </div>

      {openChangePassword && (
        <ChangePasswordPopup
          userId={String(userId)}
          onClosePopUp={(changed) => {
            setOpenChangePassword(false);
          }}
        />
      )}

      {/* Popup ลบผู้ใช้ */}
      {openDeletePopup && userId && (
        <DeleteUserPopup
          userId={String(userId)}
          onClose={() => setOpenDeletePopup(false)}
        />
      )}
    </div>
  );
}

function Info({
  label,
  value,
  editable,
  onChange,
  type = "text",
  options,
}: {
  label: string;
  value?: string | null;
  editable?: boolean;
  onChange?: (value: string) => void;
  type?: "text" | "tel" | "date" | "select";
  options?: string[];
}) {
  const display =
    type === "date"
      ? value
        ? isoToDMY(String(value))
        : "-"
      : value && String(value).trim() !== ""
        ? String(value)
        : "-";

  if (!editable) {
    return (
      <div>
        <label className="text-sm text-gray-500">{label}</label>
        <p className="border px-3 py-2 rounded">{display}</p>
      </div>
    );
  }

  if (type === "select" && options) {
    return (
      <div>
        <label className="text-sm text-gray-500">{label}</label>
        <select
          value={value ?? ""}
          onChange={(e) => onChange?.(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="" disabled>
            เลือก {label}
          </option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
    );
  }

  if (type === "date") {
    return (
      <div>
        <label className="text-sm text-gray-500">{label}</label>
        <input
          type="date"
          value={value ?? ""}
          onChange={(e) => onChange?.(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          lang="th-TH"
        />
      </div>
    );
  }

  return (
    <div>
      <label className="text-sm text-gray-500">{label}</label>
      <input
        type={type}
        value={value ?? ""}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full border px-3 py-2 rounded"
      />
    </div>
  );
}
