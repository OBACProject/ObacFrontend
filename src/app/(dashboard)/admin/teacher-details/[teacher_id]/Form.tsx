
"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Pencil, Save, CircleX, KeyRound, Trash2, UserPen, LoaderCircle } from "lucide-react";
import { toast } from "react-toastify";

import { GetTeacherDetailUser } from "@/api/teacher/route";
import type { GetTeacherDetailUserResponse } from "@/dto/teacherDto";

import { GetAllPrograms } from "@/api/program/route";
import type { GetAllProgramsResponse } from "@/dto/programDto";

import ChangePasswordPopup from "@/components/common/Popup/ChangePasswordPopup";
import DeleteUserPopup from "@/components/common/Popup/DeleteUserPopup";

import { UpdateTeacherUser } from "@/api/teacher/route";
import type { UpdateTeacherUserRequest } from "@/dto/teacherDto";


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
      } catch (e) {
        console.error(e);
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
    if (!selectedProgramId) {
      toast.error("กรุณาเลือก คณะ / สาขา / แขนง ให้ครบ");
      return;
    }

    const teacherIdNum =
      Number((formData as any)?.teacherId) ||
      Number(teacherId) || 0;

    if (!teacherIdNum) {
      toast.error("ไม่พบรหัสอาจารย์ (teacherId)");
      return;
    }

    const birthDateStr = toISODateOnly((formData as any).birthDate);
    const hiredDateStr = toISODateOnly((formData as any).hiredDate);
    if (!birthDateStr) { toast.error("รูปแบบวันเกิดไม่ถูกต้อง"); return; }
    if (!hiredDateStr) { toast.error("กรุณาเลือกวันที่เข้าทำงาน"); return; }

    const isActive =
      typeof (formData as any)?.isActive === "boolean" ? (formData as any).isActive : true;

    const payload: UpdateTeacherUserRequest = {
      teacherId: teacherIdNum,
      prefix: formData.prefix ?? "",
      firstName: formData.firstName ?? "",
      lastName: formData.lastName ?? "",
      gender: formData.gender ?? "",
      teacherCode: (formData as any).teacherCode ?? "",
      programId: Number(selectedProgramId),
      isActive,
      hiredDate: hiredDateStr,
      birthDate: birthDateStr,
      phoneNumber: formData.phoneNumber ?? "",
      nationality: formData.nationality ?? "",
      citizenId: formData.citizenId ?? "",
    };


    try {
      setSaving(true);
      const ok = await UpdateTeacherUser(payload);
      if (ok) {
        toast.success("บันทึกข้อมูลเรียบร้อย");
       
        setFormData((prev) =>
          prev
            ? ({
              ...prev,
              programId: Number(selectedProgramId),
              birthDate: birthDateStr,
              hiredDate: hiredDateStr,
            } as any)
            : prev
        );
        setOriginalData((prev) =>
          prev
            ? ({
              ...prev,
              ...(formData as any),
              programId: Number(selectedProgramId),
              birthDate: birthDateStr,
              hiredDate: hiredDateStr,
            } as any)
            : (formData as any)
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
          <h1 className="px-8 py-2 rounded-3xl flex gap-2 items-center text-xl w-fit border border-gray-100 shadow-md text-blue-700">
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
                disabled={saving}
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
        {/* account */}
        <Info label="ชื่อผู้ใช้" value={(formData as any).username} editable={false} />

        <Info label="คำนำหน้า" value={(formData as any).prefix} editable={isEditing} onChange={(v) => handleChange("prefix", v)} type="select" options={["นาย", "นาง", "นางสาว"]} />
        <Info label="ชื่อจริง" value={(formData as any).firstName} editable={isEditing} onChange={(v) => handleChange("firstName", v)} />
        <Info label="นามสกุล" value={(formData as any).lastName} editable={isEditing} onChange={(v) => handleChange("lastName", v)} />
        <Info label="เพศ" value={(formData as any).gender} editable={isEditing} onChange={(v) => handleChange("gender", v)} type="select" options={["ชาย", "หญิง"]} />

        {/* วันเกิด */}
        <Info
          label="วันเกิด"
          value={(formData as any).birthDate}
          editable={isEditing}
          onChange={(v) => handleChange("birthDate", toISODateOnly(v))}
          type="date"
        />

        <Info label="รหัสอาจารย์" value={(formData as any).teacherCode} editable={isEditing} onChange={(v) => handleChange("teacherCode", v)} />
        <Info label="รหัสประชาชน" value={(formData as any).citizenId} editable={isEditing} onChange={(v) => handleChange("citizenId", v)} />
        <Info label="เบอร์โทร" value={(formData as any).phoneNumber} editable={isEditing} onChange={(v) => handleChange("phoneNumber", v)} />
        <Info label="สัญชาติ" value={(formData as any).nationality} editable={isEditing} onChange={(v) => handleChange("nationality", v)} />

        {/* วันที่เข้าทำงาน */}
        <Info
          label="วันที่เข้าทำงาน (hiredDate)"
          value={(formData as any).hiredDate as any}
          editable={isEditing}
          onChange={(v) => handleChange("hiredDate", toISODateOnly(v))}
          type="date"
        />

        {/* ---------- Program (View / Edit) ---------- */}
        <div className="col-span-2">
          {!isEditing ? (
            <div className="grid grid-cols-3 gap-4">
              <ReadOnlyBox label="คณะ " value={programInfo?.facultyName || (loadingPrograms ? "กำลังโหลด..." : programsError ? "โหลดข้อมูลไม่สำเร็จ" : "—")} />
              <ReadOnlyBox label="สาขา  " value={programInfo?.programName || (loadingPrograms ? "กำลังโหลด..." : programsError ? "โหลดข้อมูลไม่สำเร็จ" : "—")} />
              <ReadOnlyBox label="แขนง  " value={programInfo?.subProgramName || (loadingPrograms ? "กำลังโหลด..." : programsError ? "โหลดข้อมูลไม่สำเร็จ" : "—")} />
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-4">
              {/* Faculty */}
              <div>
                <label className="text-sm text-gray-700">คณะ </label>
                <select
                  value={selectedFaculty}
                  onChange={(e) => onSelectFaculty(e.target.value)}
                  className="w-full border px-3 py-2 rounded"
                  disabled={loadingPrograms || !!programsError || faculties.length === 0}
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

              {/* Program */}
              <div>
                <label className="text-sm text-gray-700">สาขา  </label>
                <select
                  value={selectedProgramName}
                  onChange={(e) => onSelectProgramName(e.target.value)}
                  className="w-full border px-3 py-2 rounded"
                  disabled={!selectedFaculty || loadingPrograms || !!programsError}
                >
                  <option value="">
                    {!selectedFaculty ? "— เลือกคณะก่อน —" : "— เลือกสาขา —"}
                  </option>
                  {programNames.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sub Program */}
              <div>
                <label className="text-sm text-gray-700">แขนง  </label>
                <select
                  value={selectedSubProgramName}
                  onChange={(e) => onSelectSubProgramName(e.target.value)}
                  className="w-full border px-3 py-2 rounded"
                  disabled={!selectedProgramName || loadingPrograms || !!programsError}
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
            </div>
          )}
        </div>
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

      {openDeletePopup && !!userId && (
        <DeleteUserPopup userId={String(userId)} onClose={() => setOpenDeletePopup(false)} />
      )}
    </div>
  );
}

/* ---------------- Small helpers ---------------- */
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
      isDate ? (value ? isoToDMY(String(value)) : "—") : value && String(value).trim() !== "" ? String(value) : "—";
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
        <select value={value ?? ""} onChange={(e) => onChange?.(e.target.value)} className="w-full border px-3 py-2 rounded">
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
