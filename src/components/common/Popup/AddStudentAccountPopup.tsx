"use client";

import { CreateStudent } from "@/api/student/route";
import { GetAllStudentGroup } from "@/api/studentGroup/route";
import { GetAllStudentGroupRequest } from "@/dto/studentGroupItem";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

type Props = {
  onClosePopUp: (val: boolean) => void;
};

type CreateStudentRequest = {
  userName: string;
  password: string;
  firstName: string;
  lastName: string;
  studentCode: string;
  gender: string;
  citizenId: string;
  phoneNumber: string;
  nationality: string;
  birthDate: string; // "YYYY-MM-DD"
  prefix: string;
  studentGroupId: number;
};

export default function AddStudentAccountPopup({ onClosePopUp }: Props) {
  // form states
  const [studentCode, setStudentCode] = useState("");
  const [studentGroupId, setStudentGroupId] = useState<number | null>(null);

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

  // groups dropdown state
  const [groups, setGroups] = useState<GetAllStudentGroupRequest[]>([]);
  const [loadingGroups, setLoadingGroups] = useState<boolean>(false);
  const [groupsError, setGroupsError] = useState<string | null>(null);

  useEffect(() => {
    const loadGroups = async () => {
      try {
        setLoadingGroups(true);
        setGroupsError(null);
        const data = await GetAllStudentGroup();

        // เอาเฉพาะ active (ถ้าต้องการทั้งหมดให้เอา filter ออก)
        const active = data.filter((g) => g.isActive !== false);

        // เรียงสวย ๆ: groupCode > class > groupName (natural sort/locale TH)
        active.sort((a, b) =>
          `${a.groupCode ?? ""}|${a.class ?? ""}|${a.groupName ?? ""}`.localeCompare(
            `${b.groupCode ?? ""}|${b.class ?? ""}|${b.groupName ?? ""}`,
            "th",
            { numeric: true, sensitivity: "base" }
          )
        );

        setGroups(active);
      } catch (e) {
        console.error(e);
        setGroupsError("โหลดรายการห้องเรียนไม่สำเร็จ");
      } finally {
        setLoadingGroups(false);
      }
    };

    loadGroups();
  }, []);

  const handleSubmit = async () => {
    // validate
    if (
      !username.trim() ||
      !password ||
      !firstName.trim() ||
      !lastName.trim() ||
      !birthDate ||
      !studentCode.trim() ||
      !studentGroupId
    ) {
      toast.error(
        "กรุณากรอกข้อมูลที่จำเป็นให้ครบ: Username, Password, ชื่อ, นามสกุล, วันเกิด, รหัสนักเรียน, กลุ่มเรียน"
      );
      return;
    }
    if (password !== confirmPassword) {
      toast.error("รหัสผ่านไม่ตรงกัน");
      return;
    }

    const payload: CreateStudentRequest = {
      userName: username.trim(),
      password,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      studentCode: studentCode.trim(),
      gender: gender || "",
      citizenId: citizenId || "",
      phoneNumber: phone || "",
      nationality: nationality || "",
      birthDate, // "YYYY-MM-DD" จาก <input type="date">
      prefix,
      studentGroupId: Number(studentGroupId),
    };

    try {
      await CreateStudent(payload);
      toast.success("สร้างบัญชีนักเรียนสำเร็จ");
      onClosePopUp(true); // แจ้งให้หน้า parent reload
    } catch (err: any) {
      console.error("CreateStudent error:", err?.response?.data || err);

      // ดึงข้อความจาก backend (ProblemDetails / ModelState)
      const modelErrors = err?.response?.data?.errors;
      if (modelErrors && typeof modelErrors === "object") {
        const firstKey = Object.keys(modelErrors)[0];
        const firstMsg = Array.isArray(modelErrors[firstKey])
          ? modelErrors[firstKey][0]
          : String(modelErrors[firstKey]);
        toast.error(firstMsg);
      } else {
        const backendMsg =
          err?.response?.data?.responseMessage ||
          err?.response?.data?.title ||
          err?.message ||
          "เกิดข้อผิดพลาดจากเซิร์ฟเวอร์";
        toast.error(backendMsg);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[650px] space-y-4 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold text-blue-700">เพิ่มบัญชีนักเรียน</h2>

        {/* แถว 1 */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm">รหัสนักเรียน</label>
            <input
              type="text"
              value={studentCode}
              onChange={(e) => setStudentCode(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          {/* Student Group dropdown */}
          <div>
            <label className="text-sm">กลุ่มเรียน (เลือกห้อง)</label>
            <select
              value={studentGroupId ?? ""}
              onChange={(e) => {
                const val = e.target.value;
                setStudentGroupId(val === "" ? null : Number(val));
              }}
              className="w-full border px-3 py-2 rounded"
              disabled={loadingGroups || !!groupsError}
            >
              <option value="">
                {loadingGroups
                  ? "กำลังโหลดข้อมูล..."
                  : groupsError
                  ? "โหลดข้อมูลไม่สำเร็จ"
                  : "-- เลือกกลุ่มเรียน --"}
              </option>

              {groups.map((g) => (
                <option key={g.id} value={g.id}>
                  {/* แสดง groupCode | class groupName */}
                  {`${g.groupCode ?? "-"} | ${(g.class ?? "") + (g.class ? " " : "") + (g.groupName ?? "")}`}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">
              * ระบบจะบันทึกเป็น StudentGroup ID: <b>{studentGroupId ?? "-"}</b>
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
            <label className="text-sm">ชื่อผู้ใช้ (Username)</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        </div>

        {/* แถว 6 */}
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

        {/* แถว 7 */}
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
            disabled={loadingGroups && studentGroupId === null}
          >
            บันทึกข้อมูล
          </button>
        </div>
      </div>
    </div>
  );
}
