// src/app/admin/student-details/[id]/StudentDetailForm.tsx
"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  GraduationCap,
  Pencil,
  Save,
  CircleX,
  KeyRound,
  Trash2,
} from "lucide-react";
import { toast } from "react-toastify";

import { GetStudentDetailResponse } from "@/dto/studentDto";
import { GetStudentDetailById } from "@/api/student/route";

import { UpdateUserDetails } from "@/api/user/userAPI";
import type { UpdateUserDetailRequest } from "@/dto/userDto";

import { GetAllStudentGroup } from "@/api/studentGroup/route";
import type { GetAllStudentGroupRequest } from "@/dto/studentGroupItem";

import { GetAllPrograms } from "@/api/program/rount";
import type { GetAllProgramsResponse } from "@/dto/programDto";

import ChangePasswordPopup from "@/components/common/Popup/ChangePasswordPopup";
import DeleteUserPopup from "@/components/common/Popup/DeleteUserPopup";

/* -------------------- Utils -------------------- */
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
  if (!iso) return "—";
  const m = String(iso).match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return String(iso);
  const [, y, mm, dd] = m;
  return `${dd}/${mm}/${y}`;
}

function cx(...s: Array<string | false | undefined>) {
  return s.filter(Boolean).join(" ");
}

/* -------------------- Types -------------------- */
type Props = { studentId: string };

type MergedGroup = GetAllStudentGroupRequest & {
  facultyName?: string;
  programName?: string;
  subProgramName?: string;
};

/* -------------------- Component -------------------- */
export default function StudentDetailForm({ studentId }: Props) {
  const [formData, setFormData] = useState<GetStudentDetailResponse | null>(
    null
  );
  const [originalData, setOriginalData] =
    useState<GetStudentDetailResponse | null>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);

  // data sources
  const [rawGroups, setRawGroups] = useState<GetAllStudentGroupRequest[]>([]);
  const [programs, setPrograms] = useState<GetAllProgramsResponse[]>([]);
  const [groups, setGroups] = useState<MergedGroup[]>([]);

  const [loadingSources, setLoadingSources] = useState(true);
  const [sourcesError, setSourcesError] = useState<string | null>(null);

  // cascade selections
  const [selectedFaculty, setSelectedFaculty] = useState<string>("");
  const [selectedProgramName, setSelectedProgramName] = useState<string>("");
  const [selectedSubProgramName, setSelectedSubProgramName] =
    useState<string>("");
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoadingSources(true);
        setSourcesError(null);

        const [detail, prog, grp] = await Promise.all([
          GetStudentDetailById(Number(studentId)),
          GetAllPrograms(),
          GetAllStudentGroup(),
        ]);

        if (detail) {
          const normalized = {
            ...detail,
            birthDate: toISODate(detail.birthDate),
          };
          setFormData(normalized);
          setOriginalData(normalized);
          // @ts-ignore - backend อาจคืน studentGroupId มาด้วย
          if ((detail as any)?.studentGroupId) {
            setSelectedGroupId(Number((detail as any).studentGroupId));
          }
        }

        setPrograms(Array.isArray(prog) ? prog : []);
        setRawGroups(Array.isArray(grp) ? grp : []);
      } catch (e) {
        console.error(e);
        setSourcesError("โหลดข้อมูลไม่สำเร็จ");
      } finally {
        setLoadingSources(false);
      }
    };
    load();
  }, [studentId]);

  // merge program-names into groups
  useEffect(() => {
    if (!rawGroups.length) {
      setGroups([]);
      return;
    }
    const pMap = new Map<number, GetAllProgramsResponse>();
    for (const p of programs) pMap.set(p.programId, p);

    const merged: MergedGroup[] = rawGroups
      .filter((g) => g.isActive !== false)
      .map((g) => {
        const p = pMap.get(Number(g.programId));
        return {
          ...g,
          facultyName: p?.facultyName,
          programName: p?.programName,
          subProgramName: p?.subProgramName,
        };
      });

    merged.sort((a, b) =>
      `${a.facultyName ?? ""}|${a.programName ?? ""}|${a.subProgramName ?? ""}|${a.class ?? ""}|${a.groupName ?? ""}`.localeCompare(
        `${b.facultyName ?? ""}|${b.programName ?? ""}|${b.subProgramName ?? ""}|${b.class ?? ""}|${b.groupName ?? ""}`,
        "th",
        { numeric: true, sensitivity: "base" }
      )
    );
    setGroups(merged);
  }, [rawGroups, programs]);

  // When we know selectedGroupId, set cascade names for read mode convenience
  useEffect(() => {
    if (!selectedGroupId || !groups.length) return;
    const g = groups.find((x) => x.id === selectedGroupId);
    if (!g) return;
    setSelectedFaculty(g.facultyName || "");
    setSelectedProgramName(g.programName || "");
    setSelectedSubProgramName(g.subProgramName || "");
  }, [selectedGroupId, groups]);

  // lists for cascade
  const faculties = useMemo(() => {
    const s = new Set(groups.map((g) => g.facultyName).filter(Boolean) as string[]);
    return Array.from(s).sort((a, b) =>
      a.localeCompare(b, "th", { sensitivity: "base" })
    );
  }, [groups]);

  const programNames = useMemo(() => {
    const s = new Set(
      groups
        .filter((g) => !selectedFaculty || g.facultyName === selectedFaculty)
        .map((g) => g.programName)
        .filter(Boolean) as string[]
    );
    return Array.from(s).sort((a, b) =>
      a.localeCompare(b, "th", { sensitivity: "base" })
    );
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
    return Array.from(s).sort((a, b) =>
      a.localeCompare(b, "th", { sensitivity: "base" })
    );
  }, [groups, selectedFaculty, selectedProgramName]);

  const groupsByCascade = useMemo(() => {
    return groups.filter((g) => {
      if (selectedFaculty && g.facultyName !== selectedFaculty) return false;
      if (selectedProgramName && g.programName !== selectedProgramName)
        return false;
      if (selectedSubProgramName && g.subProgramName !== selectedSubProgramName)
        return false;
      return true;
    });
  }, [
    groups,
    selectedFaculty,
    selectedProgramName,
    selectedSubProgramName,
  ]);

  const handleChange = (
    field: keyof GetStudentDetailResponse,
    value: string
  ) => {
    if (!formData) return;
    setFormData({ ...formData, [field]: value });
  };

  const onSelectFaculty = (val: string) => {
    setSelectedFaculty(val);
    setSelectedProgramName("");
    setSelectedSubProgramName("");
    setSelectedGroupId(null);
  };
  const onSelectProgramName = (val: string) => {
    setSelectedProgramName(val);
    setSelectedSubProgramName("");
    setSelectedGroupId(null);
  };
  const onSelectSubProgramName = (val: string) => {
    setSelectedSubProgramName(val);
    setSelectedGroupId(null);
  };

  const handleSave = async () => {
    if (!formData) return;

    if (!formData.prefix) {
      toast.error("กรุณาเลือกคำนำหน้า");
      return;
    }
    if (!formData.firstName?.trim() || !formData.lastName?.trim()) {
      toast.error("กรุณากรอกชื่อและนามสกุล");
      return;
    }
    if (!formData.birthDate) {
      toast.error("กรุณาเลือกวันเกิด");
      return;
    }
    if (!/^\d+$/.test(String(formData.studentCode || ""))) {
      toast.error("รหัสนักเรียนต้องเป็นตัวเลขเท่านั้น");
      return;
    }
    if (!selectedGroupId) {
      toast.error("กรุณาเลือกห้อง (Student Group)");
      return;
    }

    const userId = (formData as any)?.id ?? (formData as any)?.userId;
    if (!userId) {
      toast.error("ไม่พบรหัสผู้ใช้ (userId)");
      return;
    }

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

        // sync class/groupName on UI
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
        const firstMsg = Array.isArray(errors[firstKey])
          ? errors[firstKey][0]
          : String(errors[firstKey]);
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
    if (originalData) {
      // @ts-ignore
      const ogId = (originalData as any)?.studentGroupId ?? null;
      setSelectedGroupId(ogId);
    } else setSelectedGroupId(null);
    setIsEditing(false);
  };

  if (loadingSources) {
    return (
      <div className="p-10">
        <div className="animate-pulse h-8 w-64 bg-gray-200 rounded mb-6" />
        {[...Array(8)].map((_, i) => (
          <div key={i} className="animate-pulse h-10 bg-gray-200 rounded mb-2" />
        ))}
      </div>
    );
  }
  if (!formData) return <div className="p-10">ไม่พบข้อมูล</div>;

  const userId = (formData as any)?.id ?? (formData as any)?.userId ?? "";

  /* -------------------- UI -------------------- */
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
              >
                <KeyRound className="w-4 h-4" />
                เปลี่ยนรหัสผ่าน
              </button>
              <button
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded flex items-center gap-2 disabled:opacity-60"
                onClick={handleSave}
                disabled={saving}
              >
                <Save className="w-4 h-4" />
                {saving ? "กำลังบันทึก..." : "บันทึก"}
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded flex items-center gap-2"
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
              >
                <Trash2 className="w-5 h-5" />
                ลบผู้ใช้
              </button>
            </>
          ) : (
            <>
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded flex items-center gap-2"
                onClick={() => setIsEditing(true)}
              >
                <Pencil className="w-4 h-4" />
                แก้ไข
              </button>
              <button
                className="w-[140px] bg-red-700 hover:bg-red-800 rounded-md px-4 py-1 text-white flex items-center justify-center gap-2 disabled:opacity-60"
                onClick={() => setOpenDeletePopup(true)}
                disabled={!userId}
              >
                <Trash2 className="w-5 h-5" />
                ลบผู้ใช้
              </button>
            </>
          )}
        </div>
      </div>

      {/* GRID: 2 columns, rows ตามภาพ */}
      <div className="grid grid-cols-2 gap-4 bg-white shadow-md rounded-lg p-6">
        {/* Row1: username / prefix */}
        <ReadWrite
          label="ชื่อผู้ใช้"
          value={formData.username}
          editable={false}
        />
        <SelectRW
          label="คำนำหน้า"
          value={formData.prefix ?? ""}
          editable={isEditing}
          options={["นาย", "นาง", "นางสาว"]}
          onChange={(v) => handleChange("prefix", v)}
        />

        {/* Row2: first / last */}
        <ReadWrite
          label="ชื่อจริง"
          value={formData.firstName}
          editable={isEditing}
          onChange={(v) => handleChange("firstName", v)}
        />
        <ReadWrite
          label="นามสกุล"
          value={formData.lastName}
          editable={isEditing}
          onChange={(v) => handleChange("lastName", v)}
        />

        {/* Row3: gender / birth */}
        <SelectRW
          label="เพศ"
          value={formData.gender ?? ""}
          editable={isEditing}
          options={["ชาย", "หญิง"]}
          onChange={(v) => handleChange("gender", v)}
        />
        <DateRW
          label="วันเกิด"
          value={formData.birthDate ?? ""}
          editable={isEditing}
          onChange={(v) => handleChange("birthDate", toISODate(v))}
        />

        {/* Row4: studentCode / faculty */}
        <ReadWrite
          label="รหัสนักเรียน"
          value={formData.studentCode}
          editable={isEditing}
          onChange={(v) =>
            /^\d*$/.test(v) ? handleChange("studentCode", v) : null
          }
          placeholder="ตัวเลขเท่านั้น"
        />
        {/* Faculty */}
        <SelectRW
          label="คณะ"
          value={selectedFaculty}
          editable={isEditing}
          options={faculties}
          onChange={onSelectFaculty}
          disabled={!!sourcesError || faculties.length === 0}
        />

        {/* Row5: program / subProgram */}
        <SelectRW
          label="สาขา"
          value={selectedProgramName}
          editable={isEditing}
          options={programNames}
          onChange={onSelectProgramName}
          disabled={!selectedFaculty}
        />
        <SelectRW
          label="แขนง/สาขาย่อย"
          value={selectedSubProgramName}
          editable={isEditing}
          options={subProgramNames}
          onChange={onSelectSubProgramName}
          disabled={!selectedProgramName}
        />

        {/* Row6: group / citizenId */}
        <SelectRW
          label="ห้อง"
          value={String(selectedGroupId ?? "")}
          editable={isEditing}
          onChange={(v) => setSelectedGroupId(v ? Number(v) : null)}
          options={groupsByCascade.map((g) => ({
            value: String(g.id),
            label: `${g.class ?? ""} ${g.groupName ?? ""} (เทอม ${g.term ?? "-"} ปี ${g.year ?? "-"})`,
          }))}
          optionMode="object"
          disabled={!selectedSubProgramName}
        />
        <ReadWrite
          label="รหัสบัตรประชาชน"
          value={formData.citizenId}
          editable={isEditing}
          onChange={(v) =>
            /^\d*$/.test(v) && v.length <= 13
              ? handleChange("citizenId", v)
              : null
          }
        />

        {/* Row7: phone / nationality */}
        <ReadWrite
          label="เบอร์โทร"
          value={formData.phoneNumber}
          editable={isEditing}
          onChange={(v) =>
            /^\d*$/.test(v) && v.length <= 10
              ? handleChange("phoneNumber", v)
              : null
          }
        />
        <ReadWrite
          label="สัญชาติ"
          value={formData.nationality}
          editable={isEditing}
          onChange={(v) => handleChange("nationality", v)}
        />
      </div>

      {/* popups */}
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
        <DeleteUserPopup
          userId={String(userId)}
          onClose={() => setOpenDeletePopup(false)}
        />
      )}
    </div>
  );
}

/* -------------------- Small Inputs -------------------- */
function ReadWrite({
  label,
  value,
  editable,
  onChange,
  placeholder,
}: {
  label: string;
  value?: string | null;
  editable: boolean;
  onChange?: (v: string) => void;
  placeholder?: string;
}) {
  if (!editable) {
    return (
      <div>
        <label className="text-sm text-gray-500">{label}</label>
        <p className="w-full border px-3 py-2 rounded">
          {value && String(value).trim() !== "" ? String(value) : "—"}
        </p>
      </div>
    );
  }
  return (
    <div>
      <label className="text-sm text-gray-500">{label}</label>
      <input
        type="text"
        value={value ?? ""}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="w-full border px-3 py-2 rounded"
      />
    </div>
  );
}

function DateRW({
  label,
  value,
  editable,
  onChange,
}: {
  label: string;
  value?: string | null;
  editable: boolean;
  onChange?: (v: string) => void;
}) {
  if (!editable) {
    return (
      <div>
        <label className="text-sm text-gray-500">{label}</label>
        <p className="w-full border px-3 py-2 rounded">{isoToDMY(value)}</p>
      </div>
    );
  }
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

function SelectRW({
  label,
  value,
  editable,
  options,
  onChange,
  disabled,
  optionMode = "string",
}: {
  label: string;
  value?: string | null;
  editable: boolean;
  options: string[] | { value: string; label: string }[];
  onChange?: (v: string) => void;
  disabled?: boolean;
  /** "string" = array ของ string / "object" = array ของ {value,label} */
  optionMode?: "string" | "object";
}) {
  if (!editable) {
    let display = "—";
    if (value && String(value).trim() !== "") {
      if (optionMode === "object" && Array.isArray(options)) {
        const found = (options as { value: string; label: string }[]).find(
          (o) => o.value === String(value)
        );
        display = found?.label ?? String(value);
      } else display = String(value);
    }
    return (
      <div>
        <label className="text-sm text-gray-500">{label}</label>
        <p className="w-full border px-3 py-2 rounded">{display}</p>
      </div>
    );
  }

  return (
    <div>
      <label className="text-sm text-gray-500">{label}</label>
      <select
        value={value ?? ""}
        onChange={(e) => onChange?.(e.target.value)}
        className={cx(
          "w-full border px-3 py-2 rounded",
          disabled && "bg-gray-100 text-gray-400 cursor-not-allowed"
        )}
        disabled={disabled}
      >
        <option value="">— กรุณาเลือก —</option>
        {optionMode === "object"
          ? (options as { value: string; label: string }[]).map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))
          : (options as string[]).map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
      </select>
    </div>
  );
}
