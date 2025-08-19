"use client";
import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

import { CreateTeacher } from "@/api/teacher/route";
import type { CreateTeacherRequest } from "@/dto/teacherDto";

import { GetAllPrograms } from "@/api/program/route";
import type { GetAllProgramsResponse } from "@/dto/programDto";

type Props = {
  onClosePopUp: (val: boolean) => void;
  onCreated?: () => Promise<void> | void; 
};

export default function AddTeacherAccountPopup({ onClosePopUp, onCreated }: Props) {
  const [teacherCode, setTeacherCode] = useState("");
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

  const [programRows, setProgramRows] = useState<GetAllProgramsResponse[]>([]);
  const [loadingPrograms, setLoadingPrograms] = useState(false);
  const [programsError, setProgramsError] = useState<string | null>(null);

  const [selectedFaculty, setSelectedFaculty] = useState<string>("");
  const [selectedProgramName, setSelectedProgramName] = useState<string>("");
  const [selectedSubProgramName, setSelectedSubProgramName] = useState<string>("");
  const [resolvedProgramId, setResolvedProgramId] = useState<number | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoadingPrograms(true);
        setProgramsError(null);
        const data = await GetAllPrograms();
        setProgramRows(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error(e);
        setProgramsError("โหลดรายการโปรแกรมไม่สำเร็จ");
      } finally {
        setLoadingPrograms(false);
      }
    };
    load();
  }, []);

  const faculties = useMemo(() => {
    const set = new Set(programRows.map((r) => r.facultyName).filter(Boolean));
    return Array.from(set).sort((a, b) => a.localeCompare(b, "th", { sensitivity: "base" }));
  }, [programRows]);

  const programNames = useMemo(() => {
    const set = new Set(
      programRows
        .filter((r) => !selectedFaculty || r.facultyName === selectedFaculty)
        .map((r) => r.programName)
        .filter(Boolean)
    );
    return Array.from(set).sort((a, b) => a.localeCompare(b, "th", { sensitivity: "base" }));
  }, [programRows, selectedFaculty]);

  const subProgramNames = useMemo(() => {
    const set = new Set(
      programRows
        .filter(
          (r) =>
            (!selectedFaculty || r.facultyName === selectedFaculty) &&
            (!selectedProgramName || r.programName === selectedProgramName)
        )
        .map((r) => r.subProgramName)
        .filter(Boolean)
    );
    return Array.from(set).sort((a, b) => a.localeCompare(b, "th", { sensitivity: "base" }));
  }, [programRows, selectedFaculty, selectedProgramName]);

  useEffect(() => {
    if (!selectedFaculty || !selectedProgramName || !selectedSubProgramName) {
      setResolvedProgramId(null);
      return;
    }
    const found = programRows.find(
      (r) =>
        r.facultyName === selectedFaculty &&
        r.programName === selectedProgramName &&
        r.subProgramName === selectedSubProgramName
    );
    setResolvedProgramId(found ? found.programId : null);
  }, [selectedFaculty, selectedProgramName, selectedSubProgramName, programRows]);

  const onSelectFaculty = (val: string) => {
    setSelectedFaculty(val);
    setSelectedProgramName("");
    setSelectedSubProgramName("");
    setResolvedProgramId(null);
  };
  const onSelectProgramName = (val: string) => {
    setSelectedProgramName(val);
    setSelectedSubProgramName("");
    setResolvedProgramId(null);
  };
  const onSelectSubProgramName = (val: string) => {
    setSelectedSubProgramName(val);
  };

  const handleSubmit = async () => {
    if (
      !teacherCode ||
      !username ||
      !password ||
      !firstName ||
      !lastName ||
      !birthDate ||
      !hiredDate ||
      !resolvedProgramId
    ) {
      toast.error(
        "กรุณากรอกข้อมูลที่จำเป็นให้ครบ: รหัสอาจารย์, Username, Password, ชื่อ, นามสกุล, วันเกิด, วันที่เริ่มงาน และเลือกคณะ/สาขา/แขนงให้ครบ"
      );
      return;
    }
    if (password !== confirmPassword) {
      toast.error("รหัสผ่านไม่ตรงกัน");
      return;
    }

    if (!/^\d+$/.test(teacherCode)) {
      toast.error("รหัสอาจารย์ต้องเป็นตัวเลขเท่านั้น");
      return;
    }
    if (phone && !/^\d{10}$/.test(phone)) {
      toast.error("เบอร์โทรต้องเป็นตัวเลข 10 หลัก");
      return;
    }
    if (citizenId && !/^\d{13}$/.test(citizenId)) {
      toast.error("รหัสประชาชนต้องเป็นตัวเลข 13 หลัก");
      return;
    }

    const payload: CreateTeacherRequest = {
      prefix,
      teacherCode: teacherCode.trim(),
      hiredDate, // YYYY-MM-DD จาก input type="date"
      programId: Number(resolvedProgramId),
      userName: username.trim(),
      password,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      gender: gender || "",
      citizenId: citizenId || "",
      phoneNumber: phone || "",
      nationality: nationality || "",
      birthDate, // YYYY-MM-DD
    };

    try {
      await CreateTeacher(payload);
      toast.success("เพิ่มบัญชีอาจารย์สำเร็จ");
      // ✅ แจ้งหน้าแม่ให้รีเฟรช
      await onCreated?.();
      // ✅ ปิดป็อปอัป
      onClosePopUp(false);
    } catch (err: any) {
      console.error("Error saving teacher:", err?.response?.data || err);
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
          "บันทึกข้อมูลไม่สำเร็จ";
        toast.error(backendMsg);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[720px] space-y-4 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold text-blue-700">เพิ่มบัญชีอาจารย์</h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm">รหัสอาจารย์</label>
            <input
              type="text"
              value={teacherCode}
              onChange={(e) => {
                const v = e.target.value;
                if (/^\d*$/.test(v)) setTeacherCode(v);
              }}
              className="w-full border px-3 py-2 rounded"
              placeholder="ตัวเลขเท่านั้น"
            />
          </div>

          <div>
            <label className="text-sm">คณะ (Faculty)</label>
            <select
              value={selectedFaculty}
              onChange={(e) => onSelectFaculty(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              disabled={loadingPrograms || !!programsError}
            >
              <option value="">
                {loadingPrograms
                  ? "กำลังโหลดข้อมูล..."
                  : programsError
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
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm">สาขา (Program)</label>
            <select
              value={selectedProgramName}
              onChange={(e) => onSelectProgramName(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              disabled={!selectedFaculty || loadingPrograms || !!programsError}
            >
              <option value="">{!selectedFaculty ? "— เลือกคณะก่อน —" : "— เลือกสาขา —"}</option>
              {programNames.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm">แขนง/สาขาย่อย (Sub Program)</label>
            <select
              value={selectedSubProgramName}
              onChange={(e) => onSelectSubProgramName(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              disabled={!selectedProgramName || loadingPrograms || !!programsError}
            >
              <option value="">{!selectedProgramName ? "— เลือกสาขาก่อน —" : "— เลือกแขนง —"}</option>
              {subProgramNames.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
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
              placeholder="เช่น 0812345678"
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
              placeholder="13 หลัก"
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
            <label className="text-sm">วันที่เริ่มงาน</label>
            <input
              type="date"
              value={hiredDate}
              onChange={(e) => setHiredDate(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
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
          <button className="px-4 py-1 bg-gray-300 rounded" onClick={() => onClosePopUp(false)}>
            ยกเลิก
          </button>
          <button
            className="px-4 py-1 bg-blue-600 text-white rounded"
            onClick={handleSubmit}
            disabled={loadingPrograms}
          >
            บันทึกข้อมูล
          </button>
        </div>
      </div>
    </div>
  );
}
