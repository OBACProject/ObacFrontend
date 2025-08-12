"use client";

import React, { useEffect, useState } from "react";
import { Box, Pencil, Save, CircleX, KeyRound, Trash2, UserPen } from "lucide-react";
import { GetTeacherDetailUser } from "@/api/teacher/route";
import { GetTeacherDetailUserResponse } from "@/dto/teacherDto";
import ChangePasswordPopup from "@/components/common/Popup/ChangePasswordPopup";
import { toast } from "react-toastify";
import { UpdateUserDetails } from "@/api/user/userAPI";
import type { UpdateUserDetailRequest } from "@/dto/userDto";
import DeleteUserPopup from "@/components/common/Popup/DeleteUserPopup"; 


function toISODate(input?: string | null): string {
  if (!input) return "";
  const t = input.match(/^(\d{4})-(\d{2})-(\d{2})T/);
  if (t) return `${t[1]}-${t[2]}-${t[3]}`;
  if (/^\d{4}-\d{2}-\d{2}$/.test(input)) return input;
  const dmy = input.match(/^(\d{1,2})[\/-](\d{1,2})[\/-](\d{4})$/);
  if (dmy) {
    const dd = dmy[1].padStart(2, "0");
    const mm = dmy[2].padStart(2, "0");
    const yy = dmy[3];
    return `${yy}-${mm}-${dd}`;
  }
  const d = new Date(input);
  if (!isNaN(d.getTime())) {
    const yy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yy}-${mm}-${dd}`;
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


type Props = {
  teacherId: number;
};

export default function TeacherDetailForm({ teacherId }: Props) {
  const [formData, setFormData] = useState<GetTeacherDetailUserResponse | null>(null);
  const [originalData, setOriginalData] = useState<GetTeacherDetailUserResponse | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const [openDeletePopup, setOpenDeletePopup] = useState(false); 
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    GetTeacherDetailUser(teacherId).then((data) => {
      if (!data) return;
      const normalized = { ...data, birthDate: toISODate(data.birthDate) };
      setFormData(normalized);
      setOriginalData(normalized);
    });
  }, [teacherId]);

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

    const userId = (formData as any)?.id ?? (formData as any)?.userId;
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
                className="w-[170px] h-fit bg-amber-500 hover:bg-amber-600 rounded-md flex justify-center items-center gap-2 py-1 text-white disabled:opacity-60"
                onClick={() => setOpenChangePassword(true)}
                disabled={!userId || saving}
                title={!userId ? "ไม่พบ userId" : ""}
              >
                <KeyRound className="w-5 h-5" />
                เปลี่ยนรหัสผ่าน
              </button>
              <button
                className="w-[120px] h-fit bg-green-500 rounded-md flex justify-center items-center gap-2 py-1 text-white disabled:opacity-60"
                onClick={handleSave}
                disabled={saving}
              >
                <Save className="w-5 h-5" />
                {saving ? "กำลังบันทึก..." : "บันทึก"}
              </button>
              <button
                className="w-[120px] h-fit bg-red-500 rounded-md flex justify-center items-center gap-2 py-1 text-white"
                onClick={handleCancel}
                disabled={saving}
              >
                <CircleX className="w-5 h-5" />
                ยกเลิก
              </button>
             
              <button
                className="w-[120px] h-fit bg-red-700 hover:bg-red-800 rounded-md flex justify-center items-center gap-2 py-1 text-white disabled:opacity-60"
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
                className="w-[120px] h-fit bg-blue-400 hover:bg-blue-600 rounded-md flex justify-center items-center gap-2 py-1 text-white"
                onClick={() => setIsEditing(true)}
              >
                <Pencil className="w-5 h-5" />
                แก้ไข
              </button>
              
              <button
                className="w-[120px] h-fit bg-red-700 hover:bg-red-800 rounded-md flex justify-center items-center gap-2 py-1 text-white disabled:opacity-60"
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
        <Info label="รหัสอาจารย์" value={formData.teacherCode} editable={isEditing} onChange={(v) => handleChange("teacherCode", v)} />
        <Info label="รหัสประชาชน" value={formData.citizenId} editable={isEditing} onChange={(v) => handleChange("citizenId", v)} />
        <Info label="เบอร์โทร" value={formData.phoneNumber} editable={isEditing} onChange={(v) => handleChange("phoneNumber", v)} />
        <Info label="สัญชาติ" value={formData.nationality} editable={isEditing} onChange={(v) => handleChange("nationality", v)} />
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
  value: string | null | undefined;
  editable?: boolean;
  onChange?: (value: string) => void;
  type?: "text" | "tel" | "date" | "select";
  options?: string[];
}) {
  const isDate = type === "date";

  if (!editable) {
    const display =
      isDate
        ? value
          ? isoToDMY(String(value))
          : "—"
        : value && String(value).trim() !== ""
          ? String(value)
          : "—";
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
        <select
          value={value ?? ""}
          onChange={(e) => onChange?.(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        >
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
