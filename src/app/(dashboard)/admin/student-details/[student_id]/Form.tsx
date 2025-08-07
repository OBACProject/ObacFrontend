"use client";
import React, { useEffect, useState } from "react";
import { Box, Pencil, Save, CircleX, Eye, EyeOff } from "lucide-react";
import { GetStudentDetailResponse } from "@/dto/studentDto";
import { GetStudentDetailById } from "@/api/student/route";

type Props = {
  studentId: string;
};

export default function StudentDetailForm({ studentId }: Props) {
  console.log("Rendering StudentDetailForm for studentId:", studentId);
  const [formData, setFormData] = useState<GetStudentDetailResponse | null>(null);
  const [originalData, setOriginalData] = useState<GetStudentDetailResponse | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    GetStudentDetailById(Number(studentId)).then((data) => {
      if (data) {
        console.log("Fetched student data:", data);
        setFormData(data);
        setOriginalData(data);
      }
    });
  }, [studentId]);

  const handleChange = (field: keyof GetStudentDetailResponse, value: string) => {
    if (!formData) return;
    setFormData({ ...formData, [field]: value });
  };

  const handleSave = () => {
    console.log("Saving student data:", formData);
    setOriginalData(formData);
    setIsEditing(false);
    // 🔁 TODO: call updateStudent API
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
          <h1 className="text-2xl font-bold text-blue-700">รายละเอียดนักเรียน</h1>
        </div>
        <div className="flex items-center">
          {isEditing ? (
            <div className="flex gap-2">
              <button className="bg-green-500 text-white px-4 py-1 rounded flex items-center gap-2" onClick={handleSave}>
                <Save className="w-4 h-4" />
                บันทึก
              </button>
              <button className="bg-red-500 text-white px-4 py-1 rounded flex items-center gap-2" onClick={handleCancel}>
                <CircleX className="w-4 h-4" />
                ยกเลิก
              </button>
            </div>
          ) : (
            <button className="bg-blue-500 text-white px-4 py-1 rounded flex items-center gap-2" onClick={() => setIsEditing(true)}>
              <Pencil className="w-4 h-4" />
              แก้ไข
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 bg-white shadow-md rounded-lg p-6">
        <Info label="ชื่อผู้ใช้" value={formData.username} editable={isEditing} onChange={(v) => handleChange("username", v)} />
        <Info
          label="รหัสผ่าน"
          value={formData.password}
          editable={isEditing}
          onChange={(v) => handleChange("password", v)}
          type={showPassword ? "text" : "password"}
          suffixIcon={
            isEditing && (
              <button onClick={() => setShowPassword(!showPassword)} type="button" className="ml-2">
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            )
          }
        />
        <Info label="คำนำหน้า" value={formData.prefix} editable={isEditing} onChange={(v) => handleChange("prefix", v)} type="select" options={["นาย", "นาง", "นางสาว"]} />
        <Info label="ชื่อจริง" value={formData.firstName} editable={isEditing} onChange={(v) => handleChange("firstName", v)} />
        <Info label="นามสกุล" value={formData.lastName} editable={isEditing} onChange={(v) => handleChange("lastName", v)} />
        <Info label="เพศ" value={formData.gender} editable={isEditing} onChange={(v) => handleChange("gender", v)} type="select" options={["ชาย", "หญิง"]} />
        <Info label="วันเกิด" value={formData.birthDate} editable={isEditing} onChange={(v) => handleChange("birthDate", v)} type="date" />
        <Info label="รหัสนักเรียน" value={formData.studentCode} editable={isEditing} onChange={(v) => handleChange("studentCode", v)} />
        <Info label="ชั้นเรียน" value={formData.class} editable={isEditing} onChange={(v) => handleChange("class", v)} />
        <Info label="ห้อง" value={formData.groupName} editable={isEditing} onChange={(v) => handleChange("groupName", v)} />
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
  suffixIcon,
}: {
  label: string;
  value: string;
  editable?: boolean;
  onChange?: (value: string) => void;
  type?: "text" | "tel" | "date" | "select" | "password";
  options?: string[];
  suffixIcon?: React.ReactNode;
}) {
  return (
    <div>
      <label className="text-sm text-gray-500">{label}</label>
      {editable ? (
        type === "select" && options ? (
          <select value={value} onChange={(e) => onChange?.(e.target.value)} className="w-full border px-3 py-2 rounded">
            {options.map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>
        ) : (
          <div className="flex items-center">
            <input type={type} value={value} onChange={(e) => onChange?.(e.target.value)} className="w-full border px-3 py-2 rounded" />
            {suffixIcon}
          </div>
        )
      ) : (
        <p className="text-lg mt-1">{type === "password" ? "••••••••" : value}</p>
      )}
    </div>
  );
}
