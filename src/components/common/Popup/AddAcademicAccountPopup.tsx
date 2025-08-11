"use client";
import { CreateAcademic } from "@/api/user/userAPI";
import { CreateAcademicRequest } from "@/dto/userDto";
import React, { useState } from "react";
// import { CreateAcademic } from "@/api/academic/route";
// import { CreateAcademicRequest } from "@/dto/academicDto";
import { toast } from "react-toastify";

type Props = {
  onClosePopUp: (val: boolean) => void;
};

export default function AddAcademicAccountPopup({ onClosePopUp }: Props) {
  const [academicCode, setAcademicCode] = useState("");
  const [prefix, setPrefix] = useState("นาย");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("ชาย");
  const [phone, setPhone] = useState("");
  const [citizenId, setCitizenId] = useState("");
  const [nationality, setNationality] = useState("ไทย");
  const [birthDate, setBirthDate] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async () => {
    if (
      !academicCode ||
      !firstName ||
      !lastName ||
      !phone ||
      !username ||
      !password ||
      !confirmPassword ||
      !citizenId ||
      !birthDate
    ) {
      toast.error("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("รหัสผ่านไม่ตรงกัน");
      return;
    }

    const payload: CreateAcademicRequest = {
      prefix,
      academicCode,
      username: username,
      password,
      firstName,
      lastName,
      gender,
      citizenId,
      phoneNumber: phone,
      nationality,
      birthDate,
    };

    try {
      await CreateAcademic(payload);
      toast.success("เพิ่มวิชาสำเร็จ");
      onClosePopUp(false);
    } catch (err) {
      console.error("Error saving teacher:", err);
      toast.error("บันทึกวิชาไม่สำเร็จ");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[600px] space-y-4 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold text-blue-700">เพิ่มบัญชีฝ่ายทะเบียน</h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm">รหัสบุคลากร</label>
            <input
              type="text"
              value={academicCode}
              onChange={(e) => setAcademicCode(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="text-sm">คำนำหน้า</label>
            <select
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            >
              <option>นาย</option>
              <option>นาง</option>
              <option>นางสาว</option>
            </select>
          </div>
          <div>
            <label className="text-sm">ชื่อจริง</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="text-sm">นามสกุล</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm">เพศ</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            >
              <option>ชาย</option>
              <option>หญิง</option>
            </select>
          </div>
          <div>
            <label className="text-sm">เบอร์โทร</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm">รหัสประชาชน</label>
            <input
              type="text"
              value={citizenId}
              onChange={(e) => setCitizenId(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="text-sm">สัญชาติ</label>
            <input
              type="text"
              value={nationality}
              onChange={(e) => setNationality(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        </div>

        <div>
          <label className="text-sm">วันเกิด</label>
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="text-sm">ชื่อผู้ใช้ (Username)</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="text-sm">รหัสผ่าน</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border px-3 py-2 rounded pr-10"
            />
            <button
              type="button"
              className="absolute top-1/2 right-3 -translate-y-1/2 text-sm text-gray-500"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? "ซ่อน" : "แสดง"}
            </button>
          </div>
        </div>

        <div>
          <label className="text-sm">ยืนยันรหัสผ่าน</label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border px-3 py-2 rounded pr-10"
            />
            <button
              type="button"
              className="absolute top-1/2 right-3 -translate-y-1/2 text-sm text-gray-500"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
            >
              {showConfirmPassword ? "ซ่อน" : "แสดง"}
            </button>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            className="px-4 py-1 bg-gray-300 rounded"
            onClick={() => onClosePopUp(false)}
          >
            ยกเลิก
          </button>
          <button
            className="px-4 py-1 bg-blue-600 text-white rounded"
            onClick={handleSubmit}
          >
            บันทึกข้อมูล
          </button>
        </div>
      </div>
    </div>
  );
}
