"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Box, Pencil, Save, CircleX, KeyRound, Trash2, GraduationCap } from "lucide-react";
import { GetStudentDetailResponse } from "@/dto/studentDto";
import { GetStudentDetailById } from "@/api/student/route";
import { toast } from "react-toastify";
import ChangePasswordPopup from "@/components/common/Popup/ChangePasswordPopup";
import { UpdateUserDetails } from "@/api/user/userAPI";
import type { UpdateUserDetailRequest } from "@/dto/userDto";
import DeleteUserPopup from "@/components/common/Popup/DeleteUserPopup";
import { GetAllStudentGroup } from "@/api/studentGroup/route";
import type { GetAllStudentGroupRequest } from "@/dto/studentGroupItem";

/* ---------- Date helpers ---------- */
function toISODate(input?: string | null): string {
  if (!input) return "";
  const isoT = input?.match?.(/^(\d{4})-(\d{2})-(\d{2})T/);
  if (isoT) return `${isoT[1]}-${isoT[2]}-${isoT[3]}`;
  if (/^\d{4}-\d{2}-\d{2}$/.test(String(input))) return String(input);
  const dmy = String(input).match(/^(\d{1,2})[\/-](\d{1,2})[\/-](\d{4})$/);
  if (dmy) {
    const dd = dmy[1].padStart(2, "0");
    const mm = dmy[2].padStart(2, "0");
    const yyyy = dmy[3];
    return `${yyyy}-${mm}-${dd}`;
  }
  const d = new Date(String(input));
  if (!isNaN(d.getTime())) {
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }
  return String(input ?? "");
}
function isoToDMY(iso?: string | null): string {
  if (!iso) return "";
  const m = String(iso).match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return String(iso);
  const [, y, mm, dd] = m;
  return `${dd}/${mm}/${y}`;
}

/* ---------- Group helpers ---------- */
function formatGroupLabel(g: Pick<GetAllStudentGroupRequest, "class" | "groupName" | "term" | "year">) {
  const cls = g.class ?? "-";
  const name = g.groupName ?? "-";
  const term = g.term ?? "-";
  const year = g.year ?? "-";
  return `${cls} (เทอม ${term} ปีการศึกษา ${year})`;
}

type Props = {
  studentId: string;
};

export default function StudentDetailForm({ studentId }: Props) {
  const [formData, setFormData] = useState<GetStudentDetailResponse | null>(null);
  const [originalData, setOriginalData] = useState<GetStudentDetailResponse | null>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [saving, setSaving] = useState(false);

  // ====== Groups / Combobox states ======
  const [groups, setGroups] = useState<GetAllStudentGroupRequest[]>([]);
  const [loadingGroups, setLoadingGroups] = useState(false);
  const [groupsError, setGroupsError] = useState<string | null>(null);

  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
  const [comboOpen, setComboOpen] = useState(false);
  const [comboInput, setComboInput] = useState(""); // แสดง/ค้นหาในช่องเดียว
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const comboRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    GetStudentDetailById(Number(studentId)).then((data) => {
      if (!data) return;
      const normalized = { ...data, birthDate: toISODate(data.birthDate) };
      setFormData(normalized);
      setOriginalData(normalized);
      // เดาง่าย ๆ: ถ้า response มี studentGroupId ให้ตั้งค่าเริ่มต้น
      // (ถ้าไม่มี ให้ใช้ class/groupName จาก formData ทำ label แสดงแทน)
      // @ts-ignore
      if ((data as any)?.studentGroupId) setSelectedGroupId((data as any).studentGroupId);
    });
  }, [studentId]);

  // โหลดรายการกลุ่มเรียน
  useEffect(() => {
    const loadGroups = async () => {
      try {
        setLoadingGroups(true);
        setGroupsError(null);
        const data = await GetAllStudentGroup();
        const active = data.filter((g) => g.isActive !== false);
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
        setGroupsError("โหลดรายการกลุ่มเรียนไม่สำเร็จ");
      } finally {
        setLoadingGroups(false);
      }
    };
    loadGroups();
  }, []);

  // เมื่อมี selectedGroupId หรือ formData เข้ามา กำหนดข้อความในช่อง combobox
  useEffect(() => {
    if (selectedGroupId && groups.length) {
      const found = groups.find((g) => g.id === selectedGroupId);
      if (found) setComboInput(formatGroupLabel(found));
      return;
    }
    // ถ้ายังไม่มี selectedGroupId ใช้ข้อมูลเดิมจาก formData เพื่อแสดงผลสวย ๆ
    if (formData) {
      setComboInput(
        formatGroupLabel({
          class: formData.class,
          groupName: formData.groupName,
          // @ts-ignore (ถ้า response มี term/year ก็เอามาใช้)
          term: (formData as any)?.term ?? "-",
          // @ts-ignore
          year: (formData as any)?.year ?? "-",
        })
      );
    }
  }, [selectedGroupId, groups, formData]);

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

  // ปิด dropdown เมื่อคลิคนอก
  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (comboRef.current && !comboRef.current.contains(e.target as Node)) {
        setComboOpen(false);
        setHighlightIndex(-1);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const scrollHighlightedIntoView = () => {
    if (!listRef.current) return;
    const el = listRef.current.querySelector('[data-highlighted="true"]') as HTMLElement | null;
    if (el) el.scrollIntoView({ block: "nearest" });
  };

  const onComboKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isEditing) return; // โหมดดูห้ามแก้
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
        setSelectedGroupId(g.id ?? null);
        setComboInput(formatGroupLabel(g));
        setComboOpen(false);
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      setComboOpen(false);
      setHighlightIndex(-1);
    }
  };

  const handleChooseGroup = (g: GetAllStudentGroupRequest) => {
    if (!isEditing) return;
    setSelectedGroupId(g.id ?? null);
    setComboInput(formatGroupLabel(g));
    setComboOpen(false);
  };

  const clearGroup = () => {
    if (!isEditing) return;
    setSelectedGroupId(null);
    setComboInput("");
    setHighlightIndex(-1);
    setComboOpen(false);
  };

  const handleChange = (field: keyof GetStudentDetailResponse, value: string) => {
    if (!formData) return;
    setFormData({ ...formData, [field]: value });
  };

  const handleSave = async () => {
    if (!formData) return;

    if (!formData.firstName?.trim() || !formData.lastName?.trim()) {
      toast.error("กรุณากรอกชื่อและนามสกุล");
      return;
    }
    if (!formData.birthDate) {
      toast.error("กรุณาเลือกวันเกิด");
      return;
    }

    // ต้องมี group เช่นเดียวกับตอนสร้าง
    if (!selectedGroupId) {
      toast.error("กรุณาเลือกกลุ่มเรียน");
      return;
    }

    const userId = (formData as any)?.id ?? (formData as any)?.userId;
    if (!userId) {
      toast.error("ไม่พบรหัสผู้ใช้ (userId)");
      return;
    }

    // NOTE: สมมติ backend รองรับ studentGroupId ใน UpdateUserDetails เช่นเดียวกับ Create
    const payload: UpdateUserDetailRequest & { studentGroupId?: number } = {
      id: String(userId),
      prefix: formData.prefix ?? "",
      firstName: formData.firstName ?? "",
      lastName: formData.lastName ?? "",
      phoneNumber: formData.phoneNumber ?? "",
      citizenId: formData.citizenId ?? "",
      gender: formData.gender ?? "",
      nationality: formData.nationality ?? "",
      birthDate: toISODate(formData.birthDate),
      studentGroupId: Number(selectedGroupId),
    };

    try {
      setSaving(true);
      const ok = await UpdateUserDetails(payload);
      if (ok) {
        toast.success("บันทึกข้อมูลเรียบร้อย");
        // อัปเดตค่าแสดงผล class/groupName จาก group ที่เลือก เพื่อให้สอดคล้อง UI
        const found = groups.find((g) => g.id === selectedGroupId);
        setFormData((prev) =>
          prev
            ? {
                ...prev,
                class: found?.class ?? prev.class,
                groupName: found?.groupName ?? prev.groupName,
              }
            : prev
        );
        setOriginalData((prev) =>
          prev
            ? {
                ...prev,
                class: found?.class ?? prev.class,
                groupName: found?.groupName ?? prev.groupName,
              }
            : prev
        );
        setIsEditing(false);
      } else {
        toast.error("บันทึกข้อมูลไม่สำเร็จ");
      }
    } catch (err: any) {
      const errors = err?.response?.data?.errors;
      if (errors && typeof errors === "object") {
        const firstKey = Object.keys(errors)[0];
        const firstMsg = Array.isArray(errors[firstKey]) ? errors[firstKey][0] : String(errors[firstKey]);
        toast.error(firstMsg);
      } else {
        const msg =
          err?.response?.data?.responseMessage ||
          err?.response?.data?.title ||
          err?.message ||
          "เกิดข้อผิดพลาดจากเซิร์ฟเวอร์";
        toast.error(msg);
      }
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData(originalData);
    // รีเซ็ต combobox กลับตามข้อมูลเดิม
    if (originalData) {
      // @ts-ignore
      const ogId = (originalData as any)?.studentGroupId ?? null;
      setSelectedGroupId(ogId);
      setComboInput(
        formatGroupLabel({
          class: originalData.class,
          groupName: originalData.groupName,
          // @ts-ignore
          term: (originalData as any)?.term ?? "-",
          // @ts-ignore
          year: (originalData as any)?.year ?? "-",
        })
      );
    } else {
      setSelectedGroupId(null);
      setComboInput("");
    }
    setIsEditing(false);
  };

  if (!formData) return <div className="p-10">Loading...</div>;
  const userId = (formData as any)?.id ?? (formData as any)?.userId ?? "";

  return (
    <div className="w-full p-10">
      <div className="flex items-center justify-between mb-6">
        <div className="flex py-3 px-10 justify-start">
          <h1 className="px-8 py-2 rounded-3xl flex gap-2 items-center text-xl w-fit border border-gray-100 shadow-md text-blue-700">
            <GraduationCap className="h-8 w-8" />
            รายละเอียดนักเรียน
          </h1>
        </div>
        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <button
                className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-1 rounded flex items-center gap-2 disabled:opacity-60"
                onClick={() => setOpenChangePassword(true)}
                disabled={!userId || saving}
                title={!userId ? "ไม่พบ userId" : ""}
              >
                <KeyRound className="w-4 h-4" />
                เปลี่ยนรหัสผ่าน
              </button>
              <button
                className="bg-green-500 text-white px-4 py-1 rounded flex items-center gap-2 disabled:opacity-60"
                onClick={handleSave}
                disabled={saving}
              >
                <Save className="w-4 h-4" />
                {saving ? "กำลังบันทึก..." : "บันทึก"}
              </button>
              <button
                className="bg-red-500 text-white px-4 py-1 rounded flex items-center gap-2"
                onClick={handleCancel}
                disabled={saving}
              >
                <CircleX className="w-4 h-4" />
                ยกเลิก
              </button>
              <button
                className="w-[140px] bg-red-700 hover:bg-red-800 rounded-md px-4 py-1 text-white flex items-center justify-center gap-2 disabled:opacity-60"
                onClick={() => setOpenDeletePopup(true)}
                disabled={!userId || saving}
                title={!userId ? "ไม่พบ userId" : ""}
              >
                <Trash2 className="w-5 h-5" />
                ลบผู้ใช้
              </button>
            </>
          ) : (
            <>
              <button className="bg-blue-500 text-white px-4 py-1 rounded flex items-center gap-2" onClick={() => setIsEditing(true)}>
                <Pencil className="w-4 h-4" />
                แก้ไข
              </button>
              <button
                className="w-[140px] bg-red-700 hover:bg-red-800 rounded-md px-4 py-1 text-white flex items-center justify-center gap-2 disabled:opacity-60"
                onClick={() => setOpenDeletePopup(true)}
                disabled={!userId}
                title={!userId ? "ไม่พบ userId" : ""}
              >
                <Trash2 className="w-5 h-5" />
                ลบผู้ใช้
              </button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 bg-white shadow-md rounded-lg p-6">
        {/* username ไม่อยู่ใน payload UpdateUserDetails -> ล็อกไม่ให้แก้ */}
        <Info label="ชื่อผู้ใช้" value={formData.username} editable={false} />

        <Info label="คำนำหน้า" value={formData.prefix} editable={isEditing} onChange={(v) => handleChange("prefix", v)} type="select" options={["นาย", "นาง", "นางสาว"]} />
        <Info label="ชื่อจริง" value={formData.firstName} editable={isEditing} onChange={(v) => handleChange("firstName", v)} />
        <Info label="นามสกุล" value={formData.lastName} editable={isEditing} onChange={(v) => handleChange("lastName", v)} />
        <Info label="เพศ" value={formData.gender} editable={isEditing} onChange={(v) => handleChange("gender", v)} type="select" options={["ชาย", "หญิง"]} />

        <Info label="วันเกิด" value={formData.birthDate} editable={isEditing} onChange={(v) => handleChange("birthDate", toISODate(v))} type="date" />

        <Info label="รหัสนักเรียน" value={formData.studentCode} editable={isEditing} onChange={(v) => handleChange("studentCode", v)} />

        {/* ===== กลุ่มเรียน: โหมดดู = แสดงสวย ๆ / โหมดแก้ = Combobox ช่องเดียว ===== */}
        {!isEditing ? (
          <div className="">
            <label className="text-sm text-gray-500">กลุ่มเรียน</label>
            <p className="w-full border px-3 py-2 rounded">
              {formatGroupLabel({
                class: formData.class,
                groupName: formData.groupName,
                // @ts-ignore
                term: (formData as any)?.term ?? "-",
                // @ts-ignore
                year: (formData as any)?.year ?? "-",
              })}
            </p>
          </div>
        ) : (
          <div className="col-span-1" ref={comboRef}>
            <label className="text-sm text-gray-500">กลุ่มเรียน (เลือกห้อง)</label>
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
              {!!selectedGroupId && (
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
                className="absolute z-10 mt-1 max-h-60 w-[calc(50%-1rem)] sm:w-[calc(50%-1.5rem)] md:w-[calc(50%-2rem)] overflow-auto rounded-md border bg-white shadow-lg"
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
                        className={`px-3 py-2 cursor-pointer text-sm ${
                          isHighlighted ? "bg-blue-100" : "hover:bg-gray-100"
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
              {selectedGroupId
                ? (() => {
                    const selected = groups.find((g) => g.id === selectedGroupId);
                    if (!selected) return "* ยังไม่ได้เลือกกลุ่มเรียน";
                    return `* ระบบจะบันทึกเป็น กลุ่มเรียน : ${formatGroupLabel(selected)}`;
                  })()
                : "* ยังไม่ได้เลือกกลุ่มเรียน"}
            </p>
          </div>
        )}

        {/* ช่องอื่น ๆ */}
        <Info label="รหัสประชาชน" value={formData.citizenId} editable={isEditing} onChange={(v) => handleChange("citizenId", v)} />
        <Info label="เบอร์โทร" value={formData.phoneNumber} editable={isEditing} onChange={(v) => handleChange("phoneNumber", v)} />
        <Info label="สัญชาติ" value={formData.nationality} editable={isEditing} onChange={(v) => handleChange("nationality", v)} />
      </div>

      {openChangePassword && !!userId && (
        <ChangePasswordPopup
          userId={String(userId)}
          onClosePopUp={(changed) => {
            setOpenChangePassword(false);
            if (changed) toast.success("เปลี่ยนรหัสผ่านเรียบร้อย");
          }}
        />
      )}
      {openDeletePopup && userId && (
        <DeleteUserPopup userId={String(userId)} onClose={() => setOpenDeletePopup(false)} />
      )}
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
  value: string | null | undefined;
  editable?: boolean;
  onChange?: (value: string) => void;
  type?: "text" | "tel" | "date" | "select";
  options?: string[];
}) {
  const isDate = type === "date";

  if (!editable) {
    const display =
      isDate
        ? value
          ? isoToDMY(String(value))
          : "—"
        : value && String(value).trim() !== ""
        ? String(value)
        : "—";
    return (
      <div>
        <label className="text-sm text-gray-500">{label}</label>
        <p className="w-full border px-3 py-2 rounded">{display}</p>
      </div>
    );
  }

  if (type === "select" && options) {
    return (
      <div>
        <label className="text-sm text-gray-500">{label}</label>
        <select
          value={value ?? ""}
          onChange={(e) => onChange?.(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
    );
  }

  if (isDate) {
    return (
      <div>
        <label className="text-sm text-gray-500">{label}</label>
        <input
          type="date"
          value={value ?? ""}
          onChange={(e) => onChange?.(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          lang="th-TH"
        />
      </div>
    );
  }

  return (
    <div>
      <label className="text-sm text-gray-500">{label}</label>
      <input
        type={type}
        value={value ?? ""}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full border px-3 py-2 rounded"
      />
    </div>
  );
}
