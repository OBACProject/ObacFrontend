"use client";

import React, { useEffect, useState } from "react";
import { Box, Pencil, Save, CircleX, EyeOff, Eye } from "lucide-react";
import { GetTeacherDetailUser } from "@/api/teacher/route";
import { GetTeacherDetailUserResponse } from "@/dto/teacherDto";

// กำหนด Props รับ teacherId มาด้วย
type Props = {
  teacherId: number;
};

export default function TeacherDetailForm({ teacherId }: Props) {
  const [formData, setFormData] = useState<GetTeacherDetailUserResponse | null>(null);
  const [originalData, setOriginalData] = useState<GetTeacherDetailUserResponse | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    GetTeacherDetailUser(teacherId).then((data) => {
      if (data) {
        setFormData(data);
        setOriginalData(data);
      }
    });
  }, [teacherId]);

  const handleChange = (field: keyof GetTeacherDetailUserResponse, value: string) => {
    if (formData) {
      setFormData({ ...formData, [field]: value });
    }
  };

  const handleSave = () => {
    setOriginalData(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(originalData);
    setIsEditing(false);
  };

  if (!formData) return <div className="p-10">Loading...</div>;

  return (
    <div className="w-full p-10">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Box className="h-6 w-6 text-blue-600" />
          <h1 className="text-2xl font-bold text-blue-700">รายละเอียดอาจารย์</h1>
        </div>
        <div className="flex items-center">
          {isEditing ? (
            <div className="flex gap-2">
              <button
                className="w-[120px] h-fit bg-green-500 rounded-md items-center hover:opacity-75 pl-2 gap-2 flex justify-center py-1 text-white"
                onClick={handleSave}
              >
                <Save className="w-5 h-5" />
                บันทึก
              </button>
              <button
                className="w-[120px] h-fit bg-red-500 rounded-md hover:opacity-75 pl-2 gap-2 flex justify-center items-center py-1 text-white"
                onClick={handleCancel}
              >
                <CircleX className="w-5 h-5" />
                ยกเลิก
              </button>
            </div>
          ) : (
            <button
              className="w-[120px] h-fit bg-blue-400 hover:bg-blue-600 rounded-md items-center hover:opacity-75 pl-2 gap-2 flex justify-center py-1 items-center text-white"
              onClick={() => setIsEditing(true)}
            >
              <Pencil className="w-5 h-5" />
              แก้ไข
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 bg-white shadow-md rounded-lg p-6">
        <Info label="ชื่อผู้ใช้" value={formData.username} editable={isEditing} onChange={(v) => handleChange("username", v)} />
        <Info label="รหัสผ่าน" value={formData.password} editable={isEditing} onChange={(v) => handleChange("password", v)} type="password" />

        <Info label="คำนำหน้า" value={formData.prefix} editable={isEditing} onChange={(v) => handleChange("prefix", v)} type="select" options={["นาย", "นาง", "นางสาว"]} />
        <Info label="ชื่อจริง" value={formData.firstName} editable={isEditing} onChange={(v) => handleChange("firstName", v)} />
        <Info label="นามสกุล" value={formData.lastName} editable={isEditing} onChange={(v) => handleChange("lastName", v)} />

        <Info label="เพศ" value={formData.gender} editable={isEditing} onChange={(v) => handleChange("gender", v)} type="select" options={["ชาย", "หญิง"]} />
        <Info label="วันเกิด" value={formData.birthDate} editable={isEditing} onChange={(v) => handleChange("birthDate", v)} type="date" />

        <Info label="รหัสอาจารย์" value={formData.teacherCode} editable={isEditing} onChange={(v) => handleChange("teacherCode", v)} />
        <Info label="รหัสประชาชน" value={formData.citizenId} editable={isEditing} onChange={(v) => handleChange("citizenId", v)} />
        <Info label="เบอร์โทร" value={formData.phoneNumber} editable={isEditing} onChange={(v) => handleChange("phoneNumber", v)} />
        <Info label="สัญชาติ" value={formData.nationality} editable={isEditing} onChange={(v) => handleChange("nationality", v)} />
      </div>
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
  value: string;
  editable?: boolean;
  onChange?: (value: string) => void;
  type?: "text" | "tel" | "date" | "select" | "password";
  options?: string[];
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div>
      <label className="text-sm text-gray-500">{label}</label>

      {editable ? (
        isPassword ? (
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={value}
              onChange={(e) => onChange?.(e.target.value)}
              className="w-full border px-3 py-2 rounded pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-2 text-gray-500 hover:text-gray-800"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        ) : type === "select" && options ? (
          <select
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          >
            {options.map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        )
      ) : isPassword ? (
        <p className="text-lg mt-1">••••••••</p> // แสดงเป็นจุดตอนไม่ได้แก้ไข
      ) : (
        <p className="text-lg mt-1">{value}</p>
      )}
    </div>
  );
}
