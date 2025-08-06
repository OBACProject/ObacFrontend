"use client";
import React, { useState } from "react";
import { Box, Pencil, Save, CircleX } from "lucide-react";

const mockAcademicDetail = {
  userName: "academic.john",
  password: "********",
  firstName: "John",
  lastName: "Smith",
  academicCode: "A123456",
  gender: "ชาย",
  citizenId: "9876543210123",
  phoneNumber: "0898765432",
  nationality: "ไทย",
  birthDate: "1980-12-25",
  prefix: "นาย",
};

type Props = {
  academicId: number;
};

export default function AcademicDetailForm({ academicId }: Props) {
  const [formData, setFormData] = useState(mockAcademicDetail);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log("Saving", formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(mockAcademicDetail);
    setIsEditing(false);
  };

  return (
    <div className="w-full p-10">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Box className="h-6 w-6 text-blue-600" />
          <h1 className="text-2xl font-bold text-blue-700">รายละเอียดบุคลากรภายใน</h1>
        </div>
        <div className="flex items-center">
          {isEditing ? (
            <div className="flex gap-2">
              <button
                className="w-[120px] h-fit bg-green-500 rounded-md hover:opacity-75 pl-2 gap-2 flex justify-center py-1 text-white"
                onClick={handleSave}
              >
                <Save className="w-5 h-5" />
                บันทึก
              </button>
              <button
                className="w-[120px] h-fit bg-red-500 rounded-md hover:opacity-75 pl-2 gap-2 flex justify-center py-1 text-white"
                onClick={handleCancel}
              >
                <CircleX className="w-5 h-5" />
                ยกเลิก
              </button>
            </div>
          ) : (
            <button
              className="w-[120px] h-fit bg-blue-400 hover:bg-blue-600 rounded-md hover:opacity-75 pl-2 gap-2 flex justify-center py-1 text-white"
              onClick={() => setIsEditing(true)}
            >
              <Pencil className="w-5 h-5" />
              แก้ไข
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 bg-white shadow-md rounded-lg p-6">
        <Info label="ชื่อผู้ใช้" value={formData.userName} editable={isEditing} onChange={(v) => handleChange("userName", v)} />
        <Info label="รหัสผ่าน" value={formData.password} editable={isEditing} onChange={(v) => handleChange("password", v)} type="password" />

        <Info label="คำนำหน้า" value={formData.prefix} editable={isEditing} onChange={(v) => handleChange("prefix", v)} type="select" options={["นาย", "นาง", "นางสาว"]} />
        <Info label="ชื่อจริง" value={formData.firstName} editable={isEditing} onChange={(v) => handleChange("firstName", v)} />
        <Info label="นามสกุล" value={formData.lastName} editable={isEditing} onChange={(v) => handleChange("lastName", v)} />

        <Info label="เพศ" value={formData.gender} editable={isEditing} onChange={(v) => handleChange("gender", v)} type="select" options={["ชาย", "หญิง"]} />
        <Info label="วันเกิด" value={formData.birthDate} editable={isEditing} onChange={(v) => handleChange("birthDate", v)} type="date" />

        <Info label="รหัสบุคลากรภายใน" value={formData.academicCode} editable={isEditing} onChange={(v) => handleChange("academicCode", v)} />
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
  return (
    <div>
      <label className="text-sm text-gray-500">{label}</label>
      {editable ? (
        type === "select" && options ? (
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
      ) : (
        <p className="text-lg mt-1">{value}</p>
      )}
    </div>
  );
}
