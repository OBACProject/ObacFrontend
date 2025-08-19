"use client";

import { CreateStudent } from "@/api/student/route";
import { GetAllStudentGroup } from "@/api/studentGroup/route";
import { GetAllStudentGroupRequest } from "@/dto/studentGroupItem";
import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

import { GetAllPrograms } from "@/api/program/route";
import type { GetAllProgramsResponse } from "@/dto/programDto";

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

type MergedGroup = GetAllStudentGroupRequest & {
  facultyName?: string;
  programName?: string;
  subProgramName?: string;
};

function formatRoomLabel(g: MergedGroup) {
  const cls = g.class ?? "-";
  const name = g.groupName ?? "-";
  return `${cls}. ${name}`;
}

export default function AddStudentAccountPopup({ onClosePopUp }: Props) {
  // form states
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

  // data state
  const [rawGroups, setRawGroups] = useState<GetAllStudentGroupRequest[]>([]);
  const [programs, setPrograms] = useState<GetAllProgramsResponse[]>([]);
  const [groups, setGroups] = useState<MergedGroup[]>([]);

  const [loadingGroups, setLoadingGroups] = useState<boolean>(false);
  const [groupsError, setGroupsError] = useState<string | null>(null);

  // cascading selects (คณะ → สาขา → แขนง)
  const [selectedFaculty, setSelectedFaculty] = useState<string>("");
  const [selectedProgramName, setSelectedProgramName] = useState<string>("");
  const [selectedSubProgramName, setSelectedSubProgramName] = useState<string>("");

  // ⬇️ ขั้นใหม่: เทอม → ปีการศึกษา → ห้อง
  const [selectedTerm, setSelectedTerm] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");

  useEffect(() => {
    const load = async () => {
      try {
        setLoadingGroups(true);
        setGroupsError(null);
        const [prog, grp] = await Promise.all([GetAllPrograms(), GetAllStudentGroup()]);
        setPrograms(Array.isArray(prog) ? prog : []);
        setRawGroups(Array.isArray(grp) ? grp : []);
      } catch (e) {
        console.error(e);
        setGroupsError("โหลดข้อมูลไม่สำเร็จ");
      } finally {
        setLoadingGroups(false);
      }
    };
    load();
  }, []);

  // map group + program
  useEffect(() => {
    if (!rawGroups.length) {
      setGroups([]);
      return;
    }
    const map = new Map<number, GetAllProgramsResponse>();
    for (const p of programs) map.set(p.programId, p);

    const activeMerged: MergedGroup[] = rawGroups
      .filter((g) => g.isActive !== false)
      .map((g) => {
        const p = map.get(Number(g.programId));
        return {
          ...g,
          facultyName: p?.facultyName,
          programName: p?.programName,
          subProgramName: p?.subProgramName,
        };
      });

    activeMerged.sort((a, b) =>
      `${a.facultyName ?? ""}|${a.programName ?? ""}|${a.subProgramName ?? ""}|${a.class ?? ""}|${a.groupName ?? ""}`.localeCompare(
        `${b.facultyName ?? ""}|${b.programName ?? ""}|${b.subProgramName ?? ""}|${b.class ?? ""}|${b.groupName ?? ""}`,
        "th",
        { numeric: true, sensitivity: "base" }
      )
    );

    setGroups(activeMerged);
  }, [rawGroups, programs]);

  // ขั้นคณะ/สาขา/แขนง
  const faculties = useMemo(() => {
    const s = new Set(groups.map((g) => g.facultyName).filter(Boolean) as string[]);
    return Array.from(s).sort((a, b) => a.localeCompare(b, "th", { sensitivity: "base" }));
  }, [groups]);

  const programNames = useMemo(() => {
    const s = new Set(
      groups
        .filter((g) => !selectedFaculty || g.facultyName === selectedFaculty)
        .map((g) => g.programName)
        .filter(Boolean) as string[]
    );
    return Array.from(s).sort((a, b) => a.localeCompare(b, "th", { sensitivity: "base" }));
  }, [groups, selectedFaculty]);

  const subProgramNames = useMemo(() => {
    const s = new Set(
      groups
        .filter(
          (g) =>
            (!selectedFaculty || g.facultyName === selectedFaculty) &&
            (!selectedProgramName || g.programName === selectedProgramName)
        )
        .map((g) => g.subProgramName)
        .filter(Boolean) as string[]
    );
    return Array.from(s).sort((a, b) => a.localeCompare(b, "th", { sensitivity: "base" }));
  }, [groups, selectedFaculty, selectedProgramName]);

  // กลุ่มที่ถูกกรองตาม คณะ/สาขา/แขนง
  const filteredBySubProgram = useMemo(() => {
    return groups.filter((g) => {
      if (selectedFaculty && g.facultyName !== selectedFaculty) return false;
      if (selectedProgramName && g.programName !== selectedProgramName) return false;
      if (selectedSubProgramName && g.subProgramName !== selectedSubProgramName) return false;
      return true;
    });
  }, [groups, selectedFaculty, selectedProgramName, selectedSubProgramName]);

  // ⬇️ options ของ เทอม / ปี / ห้อง จาก filteredBySubProgram
  const termOptions = useMemo(() => {
    const s = new Set(
      filteredBySubProgram.map((g) => String(g.term ?? "")).filter((x) => x && x !== "-")
    );
    return Array.from(s).sort((a, b) => a.localeCompare(b, "th", { numeric: true, sensitivity: "base" }));
  }, [filteredBySubProgram]);

  const yearOptions = useMemo(() => {
    const s = new Set(
      filteredBySubProgram
        .filter((g) => !selectedTerm || String(g.term ?? "") === selectedTerm)
        .map((g) => String(g.year ?? ""))
        .filter((x) => x && x !== "-")
    );
    // ปีอยากให้เรียงจากมากไปน้อย (ล่าสุดก่อน)
    return Array.from(s).sort((a, b) => Number(b) - Number(a));
  }, [filteredBySubProgram, selectedTerm]);

  const roomOptions = useMemo(() => {
    return filteredBySubProgram
      .filter((g) => (!selectedTerm || String(g.term ?? "") === selectedTerm) && (!selectedYear || String(g.year ?? "") === selectedYear))
      .sort((a, b) =>
        `${a.class ?? ""}|${a.groupName ?? ""}`.localeCompare(
          `${b.class ?? ""}|${b.groupName ?? ""}`,
          "th",
          { numeric: true, sensitivity: "base" }
        )
      );
  }, [filteredBySubProgram, selectedTerm, selectedYear]);

  // เปลี่ยนค่าส่วนบน ให้รีเซ็ตค่าถัดไป
  const onSelectFaculty = (val: string) => {
    setSelectedFaculty(val);
    setSelectedProgramName("");
    setSelectedSubProgramName("");
    setSelectedTerm("");
    setSelectedYear("");
    setStudentGroupId(null);
  };
  const onSelectProgramName = (val: string) => {
    setSelectedProgramName(val);
    setSelectedSubProgramName("");
    setSelectedTerm("");
    setSelectedYear("");
    setStudentGroupId(null);
  };
  const onSelectSubProgramName = (val: string) => {
    setSelectedSubProgramName(val);
    setSelectedTerm("");
    setSelectedYear("");
    setStudentGroupId(null);
  };

  // เปลี่ยนค่า เทอม/ปี → รีเซ็ตส่วนถัดไป
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
    if (!prefix) {
      toast.error("กรุณาเลือกคำนำหน้า");
      return;
    }
    if (
      !username.trim() ||
      !password ||
      !firstName.trim() ||
      !lastName.trim() ||
      !birthDate ||
      !studentCode.trim() ||
      !studentGroupId
    ) {
      toast.error("กรุณากรอกข้อมูลที่จำเป็นให้ครบ");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("รหัสผ่านไม่ตรงกัน");
      return;
    }
    if (!/^\d{13}$/.test(citizenId)) {
      toast.error("รหัสประชาชนต้องเป็นตัวเลข 13 หลัก");
      return;
    }
    if (!/^\d{10}$/.test(phone)) {
      toast.error("เบอร์โทรต้องเป็นตัวเลข 10 หลัก");
      return;
    }

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
      birthDate, // จาก input type="date" เป็นรูปแบบ YYYY-MM-DD อยู่แล้ว
      prefix: prefix || "",
      studentGroupId: Number(studentGroupId),
    };

    try {
      await CreateStudent(payload);
      toast.success("สร้างบัญชีนักเรียนสำเร็จ");
      onClosePopUp(true);
    } catch (err: any) {
      console.error("CreateStudent error:", err?.response?.data || err);
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

  const selectedRoom = useMemo(
    () => groups.find((g) => g.id === studentGroupId),
    [groups, studentGroupId]
  );

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl p-7 w-[780px] space-y-6 max-h-[92vh] overflow-y-auto">
        <h2 className="text-xl font-bold text-blue-700">เพิ่มบัญชีนักเรียน</h2>

        {/* เลือกคณะ → สาขา → แขนง → เทอม → ปี → ห้อง */}
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-sm">รหัสนักเรียน</label>
              <input
                type="text"
                value={studentCode}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*$/.test(value)) {
                    setStudentCode(value);
                  }
                }}
                className="w-full border px-3 py-2 rounded"
                placeholder="เช่น 65001"
              />
            </div>

            <div>
              <label className="text-sm">คณะ </label>
              <select
                value={selectedFaculty}
                onChange={(e) => onSelectFaculty(e.target.value)}
                className="w-full border px-3 py-2 rounded"
                disabled={loadingGroups || !!groupsError || faculties.length === 0}
              >
                <option value="">
                  {loadingGroups
                    ? "กำลังโหลดข้อมูล..."
                    : groupsError
                      ? "โหลดข้อมูลไม่สำเร็จ"
                      : "— เลือกคณะ —"}
                </option>
                {faculties.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm">สาขา  </label>
              <select
                value={selectedProgramName}
                onChange={(e) => onSelectProgramName(e.target.value)}
                className="w-full border px-3 py-2 rounded"
                disabled={!selectedFaculty || loadingGroups || !!groupsError}
              >
                <option value="">{!selectedFaculty ? "— เลือกคณะก่อน —" : "— เลือกสาขา —"}</option>
                {programNames.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-sm">แขนง/สาขาย่อย  </label>
              <select
                value={selectedSubProgramName}
                onChange={(e) => onSelectSubProgramName(e.target.value)}
                className="w-full border px-3 py-2 rounded"
                disabled={!selectedProgramName || loadingGroups || !!groupsError}
              >
                <option value="">
                  {!selectedProgramName ? "— เลือกสาขาก่อน —" : "— เลือกแขนง —"}
                </option>
                {subProgramNames.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {/* ⬇️ เทอม */}
            <div>
              <label className="text-sm">เทอม  </label>
              <select
                value={selectedTerm}
                onChange={(e) => onSelectTerm(e.target.value)}
                className="w-full border px-3 py-2 rounded"
                disabled={!selectedSubProgramName || loadingGroups || !!groupsError || termOptions.length === 0}
              >
                <option value="">
                  {!selectedSubProgramName ? "— เลือกแขนงก่อน —" : "— เลือกเทอม —"}
                </option>
                {termOptions.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            {/* ⬇️ ปีการศึกษา */}
            <div>
              <label className="text-sm">ปีการศึกษา </label>
              <select
                value={selectedYear}
                onChange={(e) => onSelectYear(e.target.value)}
                className="w-full border px-3 py-2 rounded"
                disabled={!selectedTerm || loadingGroups || !!groupsError || yearOptions.length === 0}
              >
                <option value="">
                  {!selectedTerm ? "— เลือกเทอมก่อน —" : "— เลือกปีการศึกษา —"}
                </option>
                {yearOptions.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* ⬇️ ห้องเรียน */}
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-3">
              <label className="text-sm">ห้อง  </label>
              <select
                value={studentGroupId ?? ""}
                onChange={(e) => setStudentGroupId(e.target.value === "" ? null : Number(e.target.value))}
                className="w-full border px-3 py-2 rounded"
                disabled={!selectedYear || loadingGroups || !!groupsError}
              >
                <option value="">
                  {!selectedYear ? "— เลือกปีการศึกษาก่อน —" : "— เลือกห้อง —"}
                </option>
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
          </div>
        </div>

        {/* ข้อมูลผู้ใช้ */}
        <div className="grid grid-cols-3 gap-4">
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
              onChange={(e) => {
                const onlyDigits = e.target.value.replace(/\D/g, "");
                if (onlyDigits.length <= 10) setPhone(onlyDigits);
              }}
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
        </div>

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
            <label className="text-sm">ชื่อผู้ใช้ </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
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

        <div className="flex justify-end gap-3 pt-2">
          <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded" onClick={() => onClosePopUp(false)}>
            ยกเลิก
          </button>
          <button
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
            onClick={handleSubmit}
            disabled={loadingGroups}
          >
            บันทึกข้อมูล
          </button>
        </div>
      </div>
    </div>
  );
}
