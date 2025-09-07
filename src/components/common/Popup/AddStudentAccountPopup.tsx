"use client";

import { CreateStudent } from "@/api/student/route";
import { GetAllStudentGroup } from "@/api/studentGroup/route";
import { GetAllStudentGroupRequest } from "@/dto/studentGroupItem";
import { getCurrentThaiTermYear } from "@/lib/utils";
import { educationOptions } from "@/resource/academics/options/studentOption";
import React, { useEffect, useMemo, useState } from "react";
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
  birthDate: string;
  prefix: string;
  studentGroupId: number;
  status: string;
};

type MergedGroup = GetAllStudentGroupRequest;

function formatRoomLabel(g: MergedGroup) {
  const cls = g.class ?? "-";
  const name = g.groupName ?? "-";
  return `${cls}. ${name}`;
}

function toThaiErrorMessage(err: any) {
  const data = err?.response?.data ?? {};
  const status = err?.response?.status as number | undefined;
  const rawMsg =
    data?.responseMessage ??
    data?.title ??
    data?.message ??
    err?.message ??
    "";

  if (typeof rawMsg === "string") {
    if (rawMsg.includes("This UserName Already Exists")) {
      return "ชื่อผู้ใช้นี้ถูกใช้แล้ว โปรดใช้ชื่อผู้ใช้อื่น";
    }
    if (rawMsg.includes("This StudentCode Already Exists")) {
      return "รหัสนักเรียนนี้ถูกใช้แล้ว โปรดใช้รหัสอื่น";
    }
  }
  if (status === 400) return "คำขอไม่ถูกต้อง กรุณาตรวจสอบข้อมูลอีกครั้ง";
  if (status === 401) return "คุณไม่มีสิทธิ์เข้าถึง (401)";
  if (status === 409) return "ข้อมูลซ้ำในระบบ (409)";
  if (status && status >= 500) return "ระบบขัดข้องชั่วคราว กรุณาลองใหม่อีกครั้ง";
  return typeof rawMsg === "string" && rawMsg ? rawMsg : "เกิดข้อผิดพลาดจากเซิร์ฟเวอร์";
}

export default function AddStudentAccountPopup({ onClosePopUp }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [studentCode, setStudentCode] = useState("");
  const [studentGroupId, setStudentGroupId] = useState<number | null>(null);
  const [prefix, setPrefix] = useState<string>("");
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
  const [status, setStatus] = useState<string>("");

  const [rawGroups, setRawGroups] = useState<GetAllStudentGroupRequest[]>([]);
  const [groups, setGroups] = useState<MergedGroup[]>([]);
  const [loadingGroups, setLoadingGroups] = useState<boolean>(false);
  const [groupsError, setGroupsError] = useState<string | null>(null);

  const [selectedTerm, setSelectedTerm] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");

  const {currentYear} = getCurrentThaiTermYear();

  const resetForm = () => {
    setIsSubmitting(false);
    setStudentCode("");
    setStudentGroupId(null);
    setPrefix("");
    setFirstName("");
    setLastName("");
    setGender("ชาย");
    setPhone("");
    setCitizenId("");
    setNationality("ไทย");
    setBirthDate("");
    setUsername("");
    setPassword("");
    setConfirmPassword("");
    setShowPassword(false);
    setShowConfirmPassword(false);
    setStatus("");
    setSelectedTerm("");
    setSelectedYear("");
  };

  const closeAndReset = (result: boolean) => {
    resetForm();
    onClosePopUp(result);
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAndReset(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  useEffect(() => {
    const load = async () => {
      try {
        setLoadingGroups(true);
        setGroupsError(null);
        const grp = await GetAllStudentGroup();
        setRawGroups(Array.isArray(grp) ? grp : []);
      } catch {
        setGroupsError("โหลดข้อมูลไม่สำเร็จ");
      } finally {
        setLoadingGroups(false);
      }
    };
    load();
  }, []);

  useEffect(() => {
    if (!rawGroups.length) {
      setGroups([]);
      return;
    }
    const activeMerged: MergedGroup[] = rawGroups.filter((g) => g.isActive !== false);
    activeMerged.sort((a, b) =>
      `${a.class ?? ""}|${a.groupName ?? ""}`.localeCompare(
        `${b.class ?? ""}|${b.groupName ?? ""}`,
        "th",
        { numeric: true, sensitivity: "base" }
      )
    );
    setGroups(activeMerged);
  }, [rawGroups]);

  const roomOptions = useMemo(() => {
    return groups
      .filter(
        (g) =>
          (!selectedTerm || String(g.term ?? "") === selectedTerm) &&
          (!selectedYear || String(g.year ?? "") === selectedYear)
      )
      .sort((a, b) =>
        `${a.class ?? ""}|${a.groupName ?? ""}`.localeCompare(
          `${b.class ?? ""}|${b.groupName ?? ""}`,
          "th",
          { numeric: true, sensitivity: "base" }
        )
      );
  }, [groups, selectedTerm, selectedYear]);

  const onSelectTerm = (val: string) => {
    setSelectedTerm(val);
    setSelectedYear("");
    setStudentGroupId(null);
  };

  const onSelectYear = (val: string) => {
    setSelectedYear(val);
    setStudentGroupId(null);
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    if (!prefix) {
      toast.error("กรุณาเลือกคำนำหน้า");
      setIsSubmitting(false);
      return;
    }
    if (
      !username.trim() ||
      !password ||
      !firstName.trim() ||
      !lastName.trim() ||
      !studentCode.trim() ||
      !studentGroupId
    ) {
      toast.error("กรุณากรอกข้อมูลที่จำเป็นให้ครบ");
      setIsSubmitting(false);
      return;
    }
    if (password !== confirmPassword) {
      toast.error("รหัสผ่านไม่ตรงกัน");
      setIsSubmitting(false);
      return;
    }

    const today = new Date();
    const formattedToday = today.toISOString().split("T")[0];
    const finalBirthDate = birthDate || formattedToday;

    const payload: CreateStudentRequest = {
      userName: username.trim(),
      password,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      studentCode: studentCode.trim(),
      gender: gender || "",
      citizenId: citizenId.trim(),
      phoneNumber: phone.trim(),
      nationality: nationality || "",
      birthDate: finalBirthDate,
      prefix: prefix || "",
      studentGroupId: Number(studentGroupId),
      status: status || "กำลังศึกษา",
    };

    try {
      const res = await CreateStudent(payload as any);
      if (res?.success) {
        toast.success(res?.message || "สร้างบัญชีนักเรียนสำเร็จ");
        closeAndReset(true);
      } else {
        toast.error(res?.message || "เกิดข้อผิดพลาด กรุณาลองอีกครั้ง");
        setIsSubmitting(false);
      }
    } catch (err: any) {
      const modelErrors = err?.response?.data?.errors;
      if (modelErrors && typeof modelErrors === "object") {
        const firstKey = Object.keys(modelErrors)[0];
        const firstMsg = Array.isArray(modelErrors[firstKey])
          ? modelErrors[firstKey][0]
          : String(modelErrors[firstKey]);
        toast.error(firstMsg || "กรุณาตรวจสอบข้อมูลอีกครั้ง");
        setIsSubmitting(false);
        return;
      }
      const thaiMsg = toThaiErrorMessage(err);
      toast.error(thaiMsg);
      setIsSubmitting(false);
    }
  };

  const selectedRoom = useMemo(
    () => groups.find((g) => g.id === studentGroupId),
    [groups, studentGroupId]
  );

  return (
    <div
      className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center"
      onClick={() => closeAndReset(false)}
    >
      <div
        className="bg-white rounded-2xl shadow-xl p-7 w-[780px] space-y-6 max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold text-blue-700">เพิ่มบัญชีนักเรียน</h2>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="text-sm">รหัสนักเรียน</label>
            <input
              type="text"
              value={studentCode}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) setStudentCode(value);
              }}
              className="w-full border px-3 py-2 rounded"
              placeholder="เช่น 65001"
            />
          </div>

          <div>
            <label className="text-sm">เทอม</label>
            <select
              value={selectedTerm}
              onChange={(e) => onSelectTerm(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              disabled={loadingGroups || !!groupsError}
            >
              <option value="">
                {loadingGroups ? "กำลังโหลดข้อมูล..." : groupsError ? "โหลดข้อมูลไม่สำเร็จ" : "— เลือกเทอม —"}
              </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="s1">ฤดูร้อน1</option>
              <option value="s2">ฤดูร้อน2</option>
            </select>
          </div>

          <div>
            <label className="text-sm">ปีการศึกษา</label>
            <select
              value={selectedYear}
              onChange={(e) => onSelectYear(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              disabled={!selectedTerm || loadingGroups || !!groupsError}
            >
              <option value="">{!selectedTerm ? "— เลือกเทอมก่อน —" : "— เลือกปีการศึกษา —"}</option>
              {Array.from({ length: 6 }, (_, i) => String(currentYear + 1 - i)).map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="text-sm">ห้อง</label>
            <select
              value={studentGroupId ?? ""}
              onChange={(e) => setStudentGroupId(e.target.value === "" ? null : Number(e.target.value))}
              className="w-full border px-3 py-2 rounded"
              disabled={!selectedYear || loadingGroups || !!groupsError}
            >
              <option value="">{!selectedYear ? "— เลือกปีการศึกษาก่อน —" : "— เลือกห้อง —"}</option>
              {roomOptions.map((g) => (
                <option key={g.id} value={g.id ?? ""}>
                  {formatRoomLabel(g)}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">
              {studentGroupId && selectedRoom
                ? `* กลุ่มเรียน: ${selectedRoom.class ?? ""} ${selectedRoom.groupName ?? ""} (เทอม ${selectedRoom.term ?? "-"} ปี ${selectedRoom.year ?? "-"})`
                : "* ยังไม่ได้เลือกกลุ่มเรียน"}
            </p>
          </div>

          <div>
            <label className="text-sm">คำนำหน้า</label>
            <select
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="">— เลือกคำนำหน้า —</option>
              <option value="นาย">นาย</option>
              <option value="นาง">นาง</option>
              <option value="นางสาว">นางสาว</option>
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
                if (onlyDigits.length <= 10) setPhone(onlyDigits);
              }}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="text-sm">สถานะนักเรียน</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="">— เลือกสถานะนักเรียน —</option>
              {educationOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm">รหัสประชาชน</label>
            <input
              type="text"
              value={citizenId}
              onChange={(e) => {
                const onlyDigits = e.target.value.replace(/\D/g, "");
                if (onlyDigits.length <= 13) setCitizenId(onlyDigits);
              }}
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
            <label className="text-sm">ชื่อผู้ใช้ของนักเรียน</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
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
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded" onClick={() => closeAndReset(false)}>
            ยกเลิก
          </button>
          <button
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
            onClick={handleSubmit}
            disabled={loadingGroups || isSubmitting}
          >
            {isSubmitting ? "กำลังบันทึก..." : "บันทึกข้อมูล"}
          </button>
        </div>
      </div>
    </div>
  );
}
