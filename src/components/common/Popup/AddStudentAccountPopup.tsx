"use client";

import { CreateStudent } from "@/api/student/route";
import { GetAllStudentGroup } from "@/api/studentGroup/route";
import { GetAllStudentGroupRequest } from "@/dto/studentGroupItem";
import React, { useEffect, useMemo, useRef, useState } from "react";
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

// helper: แปลงข้อความแสดงใน dropdown
function formatGroupLabel(g: GetAllStudentGroupRequest) {
  const cls = g.class ?? "-";
  const name = g.groupName ?? "-";
  const term = g.term ? String(g.term) : "-";
  const year = g.year ? String(g.year) : "-";
  return `${cls}. ${name} (เทอม ${term} ปีการศึกษา ${year})`;
}

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

  // groups state
  const [groups, setGroups] = useState<GetAllStudentGroupRequest[]>([]);
  const [loadingGroups, setLoadingGroups] = useState<boolean>(false);
  const [groupsError, setGroupsError] = useState<string | null>(null);

  // ✅ Combobox state (ช่องเดียว)
  const [comboOpen, setComboOpen] = useState(false);
  const [comboInput, setComboInput] = useState(""); // ข้อความในช่อง (ค้นหา/แสดง label)
  const [highlightIndex, setHighlightIndex] = useState<number>(-1);
  const comboRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);

  // โหลดห้องเรียน
  useEffect(() => {
    const loadGroups = async () => {
      try {
        setLoadingGroups(true);
        setGroupsError(null);
        const data = await GetAllStudentGroup();

        const active = data.filter((g) => g.isActive !== false);

        // เรียงตาม groupCode > class > groupName
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

  // ตั้งค่า label ในช่องเมื่อเลือกห้องเรียนแล้ว
  useEffect(() => {
    if (!studentGroupId) {
      setComboInput("");
      return;
    }
    const found = groups.find((g) => g.id === studentGroupId);
    if (found) setComboInput(formatGroupLabel(found));
  }, [studentGroupId, groups]);

  // กรองรายการตามที่พิมพ์ในช่อง combobox
  const filteredGroups = useMemo(() => {
    const q = comboInput.trim().toLowerCase();
    if (!q) return groups;
    return groups.filter((g) => {
      const hay = [
        g.groupCode,
        g.groupName,
        g.class,
        g.term,
        g.year?.toString(),
        formatGroupLabel(g),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
  }, [groups, comboInput]);

  // ปิด dropdown เมื่อคลิกนอก
  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (comboRef.current && !comboRef.current.contains(e.target as Node)) {
        setComboOpen(false);
        setHighlightIndex(-1);
        // ถ้าไม่ได้เลือก (studentGroupId == null) และพิมพ์ไว้ ให้คงข้อความไว้เป็น search ก็ได้
        // หรือจะเคลียร์ก็ได้: setComboInput("")
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  // คีย์บอร์ดควบคุม combobox
  const onComboKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!comboOpen && (e.key === "ArrowDown" || e.key === "Enter")) {
      setComboOpen(true);
      setHighlightIndex(0);
      return;
    }

    if (!comboOpen) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((i) => Math.min(i + 1, filteredGroups.length - 1));
      scrollHighlightedIntoView();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((i) => Math.max(i - 1, 0));
      scrollHighlightedIntoView();
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (highlightIndex >= 0 && filteredGroups[highlightIndex]) {
        const g = filteredGroups[highlightIndex];
        setStudentGroupId(g.id ?? null);
        setComboInput(formatGroupLabel(g));
        setComboOpen(false);
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      setComboOpen(false);
      setHighlightIndex(-1);
    }
  };

  const scrollHighlightedIntoView = () => {
    // เลื่อนให้ option ที่ไฮไลต์อยู่ในวิวง่ายๆ
    if (!listRef.current) return;
    const el = listRef.current.querySelector('[data-highlighted="true"]') as HTMLElement | null;
    if (el) {
      el.scrollIntoView({ block: "nearest" });
    }
  };

  const handleChooseGroup = (g: GetAllStudentGroupRequest) => {
    setStudentGroupId(g.id ?? null);
    setComboInput(formatGroupLabel(g));
    setComboOpen(false);
  };

  const clearGroup = () => {
    setStudentGroupId(null);
    setComboInput("");
    setHighlightIndex(-1);
    setComboOpen(false);
  };

  // Submit
  const handleSubmit = async () => {
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
      birthDate,
      prefix,
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

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[650px] space-y-4 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold text-blue-700">เพิ่มบัญชีนักเรียน</h2>

        {/* แถว 1 */}
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-1">
            <label className="text-sm">รหัสนักเรียน</label>
            <input
              type="text"
              value={studentCode}
              onChange={(e) => setStudentCode(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div ref={comboRef} className="relative col-span-2">
            <label className="text-sm">กลุ่มเรียน (เลือกห้อง)</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder={
                  loadingGroups
                    ? "กำลังโหลดข้อมูล..."
                    : groupsError
                      ? "โหลดข้อมูลไม่สำเร็จ"
                      : "พิมพ์เพื่อค้นหาและเลือกห้อง..."
                }
                value={comboInput}
                onChange={(e) => {
                  setComboInput(e.target.value);
                  setComboOpen(true);
                  setHighlightIndex(0);
                }}
                onFocus={() => setComboOpen(true)}
                onKeyDown={onComboKeyDown}
                className="w-full border px-3 py-2 rounded"
                disabled={loadingGroups || !!groupsError}
                aria-expanded={comboOpen}
                aria-controls="group-combobox-list"
                aria-autocomplete="list"
              />
              {studentGroupId && (
                <button
                  type="button"
                  onClick={clearGroup}
                  className="text-sm text-red-800 hover:text-gray-800 px-2"
                  title="ล้างค่า"
                >
                  ล้าง
                </button>
              )}
            </div>

            {comboOpen && !loadingGroups && !groupsError && (
              <ul
                id="group-combobox-list"
                ref={listRef}
                role="listbox"
                className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-white shadow-lg"
              >
                {filteredGroups.length === 0 ? (
                  <li className="px-3 py-2 text-sm text-gray-500">ไม่พบรายการที่ตรงกับคำค้น</li>
                ) : (
                  filteredGroups.map((g, idx) => {
                    const isHighlighted = idx === highlightIndex;
                    return (
                      <li
                        key={g.id}
                        role="option"
                        aria-selected={isHighlighted}
                        data-highlighted={isHighlighted ? "true" : "false"}
                        className={`px-3 py-2 cursor-pointer text-sm ${isHighlighted ? "bg-blue-100" : "hover:bg-gray-100"
                          }`}
                        onMouseEnter={() => setHighlightIndex(idx)}
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => handleChooseGroup(g)}
                      >
                        {formatGroupLabel(g)}
                      </li>
                    );
                  })
                )}
              </ul>
            )}

            <p className="text-xs text-gray-500 mt-1">
              {studentGroupId
                ? (() => {
                  const selected = groups.find((g) => g.id === studentGroupId);
                  if (!selected) return "* ยังไม่ได้เลือกกลุ่มเรียน";
                  return `* ระบบจะบันทึกเป็น กลุ่มเรียน : ${selected.class ?? ""} ${selected.groupName ?? ""} (เทอม ${selected.term ?? "-"} ปีการศึกษา ${selected.year ?? "-"})`;
                })()
                : "* ยังไม่ได้เลือกกลุ่มเรียน"}
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
                if (onlyDigits.length <= 10) setPhone(onlyDigits);
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
