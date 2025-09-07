"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Pencil, Save, CircleX, KeyRound, Trash2, UserPen, LoaderCircle } from "lucide-react";
import { toast } from "react-toastify";

import { GetTeacherDetailUser, UpdateTeacherUser } from "@/api/teacher/route";
import type { GetTeacherDetailUserResponse, UpdateTeacherUserRequest } from "@/dto/teacherDto";

import { GetAllPrograms } from "@/api/program/route";
import type { GetAllProgramsResponse } from "@/dto/programDto";

import ChangePasswordPopup from "@/components/common/Popup/ChangePasswordPopup";
import DeleteUserPopup from "@/components/common/Popup/DeleteUserPopup";

function toISODateOnly(input?: string | null): string {
  if (!input) return "";
  if (/^\d{4}-\d{2}-\d{2}$/.test(String(input))) return String(input);
  const t = String(input).match(/^(\d{4})-(\d{2})-(\d{2})T/);
  if (t) return `${t[1]}-${t[2]}-${t[3]}`;
  const dmy = String(input).match(/^(\d{1,2})[\/-](\d{1,2})[\/-](\d{4})$/);
  if (dmy) {
    const dd = dmy[1].padStart(2, "0");
    const mm = dmy[2].padStart(2, "0");
    const yy = dmy[3];
    return `${yy}-${mm}-${dd}`;
  }
  const d = new Date(String(input));
  if (!isNaN(d.getTime())) {
    const yy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yy}-${mm}-${dd}`;
  }
  return "";
}

function isoToDMY(iso?: string | null): string {
  if (!iso) return "";
  const m = String(iso).match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return String(iso);
  const [, y, mm, dd] = m;
  return `${dd}/${mm}/${y}`;
}

type Props = { teacherId: number };

export default function TeacherDetailForm({ teacherId }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<GetTeacherDetailUserResponse | null>(null);
  const [originalData, setOriginalData] = useState<GetTeacherDetailUserResponse | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [saving, setSaving] = useState(false);

  const [programRows, setProgramRows] = useState<GetAllProgramsResponse[]>([]);
  const [loadingPrograms, setLoadingPrograms] = useState(false);
  const [programsError, setProgramsError] = useState<string | null>(null);

  const [selectedFaculty, setSelectedFaculty] = useState<string>("");
  const [selectedProgramName, setSelectedProgramName] = useState<string>("");
  const [selectedSubProgramName, setSelectedSubProgramName] = useState<string>("");
  const [selectedProgramId, setSelectedProgramId] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      const data = await GetTeacherDetailUser(teacherId);
      if (!data) return;
      const normalized = {
        ...data,
        birthDate: toISODateOnly((data as any).birthDate),
        hiredDate: toISODateOnly((data as any).hiredDate),
      } as GetTeacherDetailUserResponse & { hiredDate?: string | null };
      setFormData(normalized);
      setOriginalData(normalized);

      const tc = (normalized as any)?.teacherCode ?? (normalized as any)?.TeacherCode;
      const forceEdit =
        typeof window !== "undefined" &&
        new URLSearchParams(window.location.search).get("edit") === "1";
      if (forceEdit && (tc == null || String(tc).trim() === "")) {
        setIsEditing(true);
      }
    })();
  }, [teacherId]);

  useEffect(() => {
    const load = async () => {
      try {
        setLoadingPrograms(true);
        setProgramsError(null);
        const data = await GetAllPrograms();
        const rows = Array.isArray(data) ? data : [];
        rows.sort((a, b) =>
          `${a.facultyName}|${a.programName}|${a.subProgramName}`.localeCompare(
            `${b.facultyName}|${b.programName}|${b.subProgramName}`,
            "th",
            { sensitivity: "base" }
          )
        );
        setProgramRows(rows);
      } catch {
        setProgramsError("โหลดข้อมูลโปรแกรมไม่สำเร็จ");
      } finally {
        setLoadingPrograms(false);
      }
    };
    load();
  }, []);

  useEffect(() => {
    if (!formData || programRows.length === 0) return;
    const pid =
      (formData as any)?.programId ??
      (formData as any)?.ProgramId ??
      (formData as any)?.program?.programId ??
      null;
    const found = programRows.find((r) => r.programId === Number(pid));
    if (found) {
      setSelectedFaculty(found.facultyName || "");
      setSelectedProgramName(found.programName || "");
      setSelectedSubProgramName(found.subProgramName || "");
      setSelectedProgramId(found.programId);
    } else {
      setSelectedFaculty("");
      setSelectedProgramName("");
      setSelectedSubProgramName("");
      setSelectedProgramId(null);
    }
  }, [formData, programRows]);

  const faculties = useMemo(() => {
    const s = new Set(programRows.map((p) => p.facultyName).filter(Boolean) as string[]);
    return Array.from(s).sort((a, b) => a.localeCompare(b, "th", { sensitivity: "base" }));
  }, [programRows]);

  const programNames = useMemo(() => {
    const s = new Set(
      programRows
        .filter((p) => !selectedFaculty || p.facultyName === selectedFaculty)
        .map((p) => p.programName)
        .filter(Boolean) as string[]
    );
    return Array.from(s).sort((a, b) => a.localeCompare(b, "th", { sensitivity: "base" }));
  }, [programRows, selectedFaculty]);

  const subProgramNames = useMemo(() => {
    const s = new Set(
      programRows
        .filter(
          (p) =>
            (!selectedFaculty || p.facultyName === selectedFaculty) &&
            (!selectedProgramName || p.programName === selectedProgramName)
        )
        .map((p) => p.subProgramName)
        .filter(Boolean) as string[]
    );
    return Array.from(s).sort((a, b) => a.localeCompare(b, "th", { sensitivity: "base" }));
  }, [programRows, selectedFaculty, selectedProgramName]);

  const onSelectFaculty = (val: string) => {
    setSelectedFaculty(val);
    setSelectedProgramName("");
    setSelectedSubProgramName("");
    setSelectedProgramId(null);
  };
  const onSelectProgramName = (val: string) => {
    setSelectedProgramName(val);
    setSelectedSubProgramName("");
    setSelectedProgramId(null);
  };
  const onSelectSubProgramName = (val: string) => {
    setSelectedSubProgramName(val);
    const found = programRows.find(
      (p) =>
        p.facultyName === selectedFaculty &&
        p.programName === selectedProgramName &&
        p.subProgramName === val
    );
    setSelectedProgramId(found ? found.programId : null);
  };

  const programInfo = useMemo(() => {
    if (!selectedProgramId) return null;
    return programRows.find((p) => p.programId === selectedProgramId) || null;
  }, [selectedProgramId, programRows]);

  const handleChange = (field: keyof GetTeacherDetailUserResponse | "hiredDate", value: string) => {
    if (!formData) return;
    setFormData({ ...(formData as any), [field]: value } as any);
  };

  const resetToSaved = (next: GetTeacherDetailUserResponse) => {
    setFormData(next);
    setOriginalData(next);

    const pid =
      (next as any)?.programId ??
      (next as any)?.ProgramId ??
      (next as any)?.program?.programId ??
      null;
    const found = programRows.find((r) => r.programId === Number(pid));
    if (found) {
      setSelectedFaculty(found.facultyName || "");
      setSelectedProgramName(found.programName || "");
      setSelectedSubProgramName(found.subProgramName || "");
      setSelectedProgramId(found.programId);
    } else {
      setSelectedFaculty("");
      setSelectedProgramName("");
      setSelectedSubProgramName("");
      setSelectedProgramId(null);
    }
    setIsEditing(false);
    setIsSubmitting(false);
    setSaving(false);
    setOpenChangePassword(false);
    setOpenDeletePopup(false);
  };

  const handleSave = async () => {
    if (!formData) return;

    const rawTeacherCode = (formData as any)?.teacherCode;
    const teacherCodeStr = rawTeacherCode == null ? "" : String(rawTeacherCode).trim();
    const teacherCodeToSend = teacherCodeStr === "" ? null : teacherCodeStr;

    if (!formData.firstName?.trim() || !formData.lastName?.trim()) {
      toast.error("กรุณากรอกชื่อและนามสกุล");
      return;
    }

    const today = toISODateOnly(new Date().toISOString().slice(0, 10));
    const birthDateStr = toISODateOnly((formData as any).birthDate) || today;
    const hiredDateStr = toISODateOnly((formData as any).hiredDate) || today;
    const isActive = typeof (formData as any)?.isActive === "boolean" ? (formData as any).isActive : true;
    const teacherIdNum = Number((formData as any)?.teacherId) || Number(teacherId) || 0;
    if (!teacherIdNum) {
      toast.error("ไม่พบรหัสอาจารย์ (teacherId)");
      return;
    }

    const fallbackProgramId =
      (formData as any)?.programId ??
      (formData as any)?.ProgramId ??
      programInfo?.programId ??
      null;

    const programIdToSend: number | null =
      selectedProgramId != null
        ? selectedProgramId
        : fallbackProgramId != null && Number.isFinite(Number(fallbackProgramId))
        ? Number(fallbackProgramId)
        : null;

    const payload: UpdateTeacherUserRequest = {
      teacherId: teacherIdNum,
      prefix: (formData as any).prefix ?? "",
      firstName: (formData as any).firstName ?? "",
      lastName: (formData as any).lastName ?? "",
      gender: (formData as any).gender ?? "",
      teacherCode: teacherCodeToSend as any,
      programId: programIdToSend as any,
      isActive,
      hiredDate: hiredDateStr,
      birthDate: birthDateStr,
      phoneNumber: (formData as any).phoneNumber ?? "",
      nationality: (formData as any).nationality ?? "",
      citizenId: (formData as any).citizenId ?? "",
    };

    if (isSubmitting) return;
    setIsSubmitting(true);
    setSaving(true);
    try {
      const ok = await UpdateTeacherUser(payload);
      if (ok) {
        toast.success("บันทึกข้อมูลเรียบร้อย");
        const next: GetTeacherDetailUserResponse = {
          ...(formData as any),
          teacherCode: teacherCodeToSend as any,
          programId: programIdToSend as any,
          birthDate: birthDateStr,
          hiredDate: hiredDateStr,
        };
        resetToSaved(next);
      } else {
        toast.error("บันทึกข้อมูลไม่สำเร็จ");
        setSaving(false);
        setIsSubmitting(false);
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
      setSaving(false);
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setFormData(originalData);
    const pid =
      (originalData as any)?.programId ??
      (originalData as any)?.ProgramId ??
      (originalData as any)?.program?.programId ??
      null;
    const found = programRows.find((r) => r.programId === Number(pid));
    if (found) {
      setSelectedFaculty(found.facultyName || "");
      setSelectedProgramName(found.programName || "");
      setSelectedSubProgramName(found.subProgramName || "");
      setSelectedProgramId(found.programId);
    } else {
      setSelectedFaculty("");
      setSelectedProgramName("");
      setSelectedSubProgramName("");
      setSelectedProgramId(null);
    }
    setIsEditing(false);
  };

  if (!formData)
    return (
      <div className="w-full h-full bg-white border-[1px] border-blue-400 rounded-xl py-5 lg:py-10 flex gap-5 lg:gap-10 items-center justify-center">
        <LoaderCircle className="w-12 h-12 text-blue-400 animate-spin" />
        <h1 className="text-xl text-gray-600 font-prompt">กำลังโหลดข้อมูล... </h1>
      </div>
    );

  const userId = (formData as any)?.id ?? (formData as any)?.userId ?? "";

  return (
    <div className="w-full p-10">
      <div className="flex items-center justify-between mb-6">
        <div className="flex py-3 px-10 justify-start">
          <h1 className="px-8 py-2 rounded-3xl flex gap-2 items-center text-xl w-fit border border-gray-100 shadow-md text-blue-700 bg-white">
            <UserPen className="h-8 w-8" />
            รายละเอียดอาจารย์
          </h1>
        </div>
        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <button
                className="w-[170px] bg-amber-500 hover:bg-amber-600 rounded-md flex justify-center items-center gap-2 py-1 text-white disabled:opacity-60"
                onClick={() => setOpenChangePassword(true)}
                disabled={!userId || saving}
                title={!userId ? "ไม่พบ userId" : ""}
              >
                <KeyRound className="w-5 h-5" />
                เปลี่ยนรหัสผ่าน
              </button>
              <button
                className="w-[120px] bg-green-500 rounded-md flex justify-center items-center gap-2 py-1 text-white disabled:opacity-60"
                onClick={handleSave}
                disabled={saving || isSubmitting}
              >
                <Save className="w-5 h-5" />
                {saving ? "กำลังบันทึก..." : "บันทึก"}
              </button>
              <button
                className="w-[120px] bg-red-500 rounded-md flex justify-center items-center gap-2 py-1 text-white"
                onClick={handleCancel}
                disabled={saving}
              >
                <CircleX className="w-5 h-5" />
                ยกเลิก
              </button>
              <button
                className="w-[120px] bg-red-700 hover:bg-red-800 rounded-md flex justify-center items-center gap-2 py-1 text-white disabled:opacity-60"
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
              <button
                className="w-[120px] bg-blue-500 hover:bg-blue-600 rounded-md flex justify-center items-center gap-2 py-1 text-white"
                onClick={() => setIsEditing(true)}
              >
                <Pencil className="w-5 h-5" />
                แก้ไข
              </button>
              <button
                className="w-[120px] bg-red-700 hover:bg-red-800 rounded-md flex justify-center items-center gap-2 py-1 text-white disabled:opacity-60"
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
        <Info label="ชื่อผู้ใช้ของอาจารย์" value={(formData as any).username} editable={false} />
        <Info label="คำนำหน้า" value={(formData as any).prefix} editable={isEditing} onChange={(v) => handleChange("prefix", v)} type="select" options={["-", "นาย", "นาง", "นางสาว"]} />
        <Info label="ชื่อจริง" value={(formData as any).firstName} editable={isEditing} onChange={(v) => handleChange("firstName", v)} />
        <Info label="นามสกุล" value={(formData as any).lastName} editable={isEditing} onChange={(v) => handleChange("lastName", v)} />
        <Info label="เพศ" value={(formData as any).gender} editable={isEditing} onChange={(v) => handleChange("gender", v)} type="select" options={["ชาย", "หญิง"]} />
        <Info label="วันเกิด" value={(formData as any).birthDate} editable={isEditing} onChange={(v) => handleChange("birthDate", toISODateOnly(v))} type="date" />
        <div>
          <label className="text-sm text-gray-500">รหัสอาจารย์</label>
          {isEditing ? (
            <input
              type="text"
              value={String((formData as any).teacherCode ?? "")}
              onChange={(e) => {
                const v = e.target.value;
                if (/^\d*$/.test(v)) handleChange("teacherCode", v);
              }}
              className="w-full border px-3 py-2 rounded"
              placeholder="กรุณากรอกรหัสอาจารย์"
            />
          ) : (
            <p className="w-full border px-3 py-2 rounded">
              {(formData as any).teacherCode && String((formData as any).teacherCode).trim() !== "" ? String((formData as any).teacherCode) : "—"}
            </p>
          )}
        </div>
        {!isEditing ? (
          <ReadOnlyBox
            label="คณะ "
            value={programInfo?.facultyName || (loadingPrograms ? "กำลังโหลด..." : programsError ? "โหลดข้อมูลไม่สำเร็จ" : "—")}
          />
        ) : (
          <div>
            <label className="text-sm text-gray-700">คณะ </label>
            <select
              value={selectedFaculty}
              onChange={(e) => onSelectFaculty(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              disabled={loadingPrograms || !!programsError || faculties.length === 0}
            >
              <option value="">
                {loadingPrograms ? "กำลังโหลดข้อมูล..." : programsError ? "โหลดข้อมูลไม่สำเร็จ" : "— เลือกคณะ —"}
              </option>
              {faculties.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </div>
        )}
        {!isEditing ? (
          <ReadOnlyBox
            label="สาขา  "
            value={programInfo?.programName || (loadingPrograms ? "กำลังโหลด..." : programsError ? "โหลดข้อมูลไม่สำเร็จ" : "—")}
          />
        ) : (
          <div>
            <label className="text-sm text-gray-700">สาขา  </label>
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
        )}
        {!isEditing ? (
          <ReadOnlyBox
            label="แขนง  "
            value={programInfo?.subProgramName || (loadingPrograms ? "กำลังโหลด..." : programsError ? "โหลดข้อมูลไม่สำเร็จ" : "—")}
          />
        ) : (
          <div>
            <label className="text-sm text-gray-700">แขนง  </label>
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
        )}
        <Info label="รหัสประชาชน" value={(formData as any).citizenId} editable={isEditing} onChange={(v) => handleChange("citizenId", v)} />
        <Info label="เบอร์โทร" value={(formData as any).phoneNumber} editable={isEditing} onChange={(v) => handleChange("phoneNumber", v)} />
        <Info label="สัญชาติ" value={(formData as any).nationality} editable={isEditing} onChange={(v) => handleChange("nationality", v)} />
        <Info label="วันที่เข้าทำงาน" value={(formData as any).hiredDate as any} editable={isEditing} onChange={(v) => handleChange("hiredDate", toISODateOnly(v))} type="date" />
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
      {openDeletePopup && !!userId && <DeleteUserPopup userId={String(userId)} onClose={() => setOpenDeletePopup(false)} />}
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
    const display = isDate ? (value ? isoToDMY(String(value)) : "—") : value && String(value).trim() !== "" ? String(value) : "—";
    return (
      <div>
        <label className="text-sm text-gray-500">{label}</label>
        <p className="w-full border px-3 py-2 rounded">{display}</p>
      </div>
    );
  }
  if (type === "select" && options) {
    const safeValue = options.includes(String(value ?? "")) ? String(value ?? "") : options[0];
    return (
      <div>
        <label className="text-sm text-gray-500">{label}</label>
        <select value={safeValue} onChange={(e) => onChange?.(e.target.value)} className="w-full border px-3 py-2 rounded">
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
        <input type="date" value={value ?? ""} onChange={(e) => onChange?.(e.target.value)} className="w-full border px-3 py-2 rounded" lang="th-TH" />
      </div>
    );
  }
  return (
    <div>
      <label className="text-sm text-gray-500">{label}</label>
      <input type={type} value={value ?? ""} onChange={(e) => onChange?.(e.target.value)} className="w-full border px-3 py-2 rounded" />
    </div>
  );
}

function ReadOnlyBox({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <label className="text-sm text-gray-500">{label}</label>
      <p className="w-full border px-3 py-2 rounded bg-white">{value || "—"}</p>
    </div>
  );
}
