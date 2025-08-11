"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { CreateTeacher } from "@/api/teacher/route";
import { CreateTeacherRequest } from "@/dto/teacherDto";

import { GetAllProgramWithStudentGroupResponse } from "@/dto/programDto";
import { GetAllProgramWithStudentGroup } from "@/api/program/rount";

type Props = {
  onClosePopUp: (val: boolean) => void;
};

export default function AddTeacherAccountPopup({ onClosePopUp }: Props) {
  const [teacherCode, setTeacherCode] = useState("");
  const [program, setProgram] = useState<number | null>(null);

  const [prefix, setPrefix] = useState("นาย");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("ชาย");
  const [phone, setPhone] = useState("");
  const [citizenId, setCitizenId] = useState("");
  const [nationality, setNationality] = useState("ไทย");
  const [birthDate, setBirthDate] = useState("");
  const [hiredDate, setHiredDate] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // programs dropdown state
  const [programs, setPrograms] = useState<GetAllProgramWithStudentGroupResponse[]>([]);
  const [loadingPrograms, setLoadingPrograms] = useState<boolean>(false);
  const [programsError, setProgramsError] = useState<string | null>(null);

  useEffect(() => {
    const loadPrograms = async () => {
      try {
        setLoadingPrograms(true);
        setProgramsError(null);
        const data = await GetAllProgramWithStudentGroup();
        // อยากให้แสดงสวย ๆ: เรียงตาม facultyName > programName > groupName
        data.sort((a, b) =>
          `${a.facultyName}|${a.programName}|${a.groupName}`.localeCompare(
            `${b.facultyName}|${b.programName}|${b.groupName}`,
            "th"
          )
        );
        setPrograms(data);
      } catch (e) {
        console.error(e);
        setProgramsError("โหลดรายการแผนกไม่สำเร็จ");
      } finally {
        setLoadingPrograms(false);
      }
    };

    loadPrograms();
  }, []);


 // ใน AddTeacherAccountPopup.tsx
const handleSubmit = async () => {
  if (!teacherCode || !username || !password || !firstName || !lastName || !birthDate || !hiredDate || !program) {
    toast.error("กรุณากรอกข้อมูลที่จำเป็นให้ครบ: รหัสอาจารย์, Username, Password, ชื่อ, นามสกุล, วันเกิด, วันที่เริ่มงาน, แผนก/ห้อง");
    return;
  }
  if (password !== confirmPassword) {
    toast.error("รหัสผ่านไม่ตรงกัน");
    return;
  }

  const payload: CreateTeacherRequest = {
    prefix,
    teacherCode: teacherCode.trim(),
    hiredDate,                      // ✅ FIX: ส่ง hiredDate ตรง ๆ
    programId: Number(program),
    userName: username.trim(),
    password,
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    gender: gender || "",           // ตามตัวอย่างที่บอกว่าส่งค่าว่างได้
    citizenId: citizenId || "",
    phoneNumber: phone || "",
    nationality: nationality || "",
    birthDate,                      // ✅ รูปแบบ "YYYY-MM-DD"
  };
  try {
        await CreateTeacher(payload);
        toast.success("เพิ่มวิชาสำเร็จ");
        onClosePopUp(false);
      } catch (err) {
        console.error("Error saving teacher:", err);
        toast.error("บันทึกวิชาไม่สำเร็จ");
      }
};



  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[650px] space-y-4 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold text-blue-700">เพิ่มบัญชีอาจารย์</h2>

        {/* แถว 1 */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm">รหัสอาจารย์</label>
            <input
              type="text"
              value={teacherCode}
              onChange={(e) => setTeacherCode(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          {/* เปลี่ยนจาก input number -> dropdown */}
          <div>
            <label className="text-sm">รหัสแผนก (เลือกจากห้อง/แผนก)</label>
            <select
              value={program ?? ""}
              onChange={(e) => {
                const val = e.target.value;
                setProgram(val === "" ? null : Number(val));
              }}
              className="w-full border px-3 py-2 rounded"
              disabled={loadingPrograms || !!programsError}
            >
              <option value="">
                {loadingPrograms
                  ? "กำลังโหลดข้อมูล..."
                  : programsError
                  ? "โหลดข้อมูลไม่สำเร็จ"
                  : "-- เลือกห้อง (แสดง groupName) --"}
              </option>

              {programs.map((p) => (
                <option
                  key={`${p.programId}-${p.groupId}`}
                  value={p.programId}
                >
                  {p.groupName} — {p.programName} ({p.facultyName})
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">
              * ระบบจะบันทึกเป็น Program ID:{" "}
              <b>{program ?? "-"}</b>
            </p>
          </div>
        </div>

        {/* แถว 2 */}
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

        {/* แถว 3 */}
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
              onChange={(e) => {
                const onlyDigits = e.target.value.replace(/\D/g, "");
                setPhone(onlyDigits);
              }}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        </div>

        {/* แถว 4 */}
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

        {/* แถว 5 */}
        <div className="grid grid-cols-2 gap-4">
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
            <label className="text-sm">วันที่เริ่มงาน</label>
            <input
              type="date"
              value={hiredDate}
              onChange={(e) => setHiredDate(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        </div>

        {/* แถว 6 */}
        <div>
          <label className="text-sm">ชื่อผู้ใช้ (Username)</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* แถว 7 */}
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

        {/* แถว 8 */}
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

        {/* ปุ่ม */}
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
            disabled={loadingPrograms && program === null}
          >
            บันทึกข้อมูล
          </button>
        </div>
      </div>
    </div>
  );
}
function renderErrorFromAxios(err: any) {
  throw new Error("Function not implemented.");
}

