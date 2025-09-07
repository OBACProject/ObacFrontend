"use client";

import React, { useEffect, useMemo, useState } from "react";
import { GraduationCap, Pencil, Save, CircleX, KeyRound, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { GetStudentDetailResponse, UpdateStudentUserRequest } from "@/dto/studentDto";
import { GetStudentDetailById, UpdateStudentUser } from "@/api/student/route";
import { GetAllStudentGroup } from "@/api/studentGroup/route";
import type { GetAllStudentGroupRequest } from "@/dto/studentGroupItem";
import { GetAllPrograms } from "@/api/program/route";
import type { GetAllProgramsResponse } from "@/dto/programDto";
import ChangePasswordPopup from "@/components/common/Popup/ChangePasswordPopup";
import DeleteUserPopup from "@/components/common/Popup/DeleteUserPopup";
import { educationOptions } from "@/resource/academics/options/studentOption";

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

type Props = { studentId: string };

type MergedGroup = GetAllStudentGroupRequest & {
  facultyName?: string;
  programName?: string;
  subProgramName?: string;
};

export default function StudentDetailForm({ studentId }: Props) {
  const [formData, setFormData] = useState<GetStudentDetailResponse | null>(null);
  const [originalData, setOriginalData] = useState<GetStudentDetailResponse | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [rawGroups, setRawGroups] = useState<GetAllStudentGroupRequest[]>([]);
  const [programs, setPrograms] = useState<GetAllProgramsResponse[]>([]);
  const [groups, setGroups] = useState<MergedGroup[]>([]);
  const [loadingSources, setLoadingSources] = useState(true);
  const [sourcesError, setSourcesError] = useState<string | null>(null);
  const [selectedFaculty, setSelectedFaculty] = useState<string>("");
  const [selectedProgramName, setSelectedProgramName] = useState<string>("");
  const [selectedSubProgramName, setSelectedSubProgramName] = useState<string>("");
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
  const [selectedTerm, setSelectedTerm] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<number>(0);
  const currentBEYear = new Date().getFullYear() + 543;

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
          const normalized = { ...detail, birthDate: toISODate(detail.birthDate) };
          setFormData(normalized);
          setOriginalData(normalized);
          if ((detail as any)?.studentGroupId) {
            setSelectedGroupId(Number((detail as any).studentGroupId));
          }
        }
        setPrograms(Array.isArray(prog) ? prog : []);
        setRawGroups(Array.isArray(grp) ? grp : []);
      } catch {
        setSourcesError("โหลดข้อมูลไม่สำเร็จ");
      } finally {
        setLoadingSources(false);
      }
    };
    load();
  }, [studentId]);

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

  useEffect(() => {
    if (!selectedGroupId || !groups.length) return;
    const g = groups.find((x) => x.id === selectedGroupId);
    if (!g) return;
    setSelectedFaculty(g.facultyName || "");
    setSelectedProgramName(g.programName || "");
    setSelectedSubProgramName(g.subProgramName || "");
    const termStr = String(g.term ?? "");
    const yearNum = Number(g.year ?? 0);
    setSelectedTerm(termStr);
    setSelectedYear(Number.isFinite(yearNum) ? yearNum : 0);
  }, [selectedGroupId, groups]);

  const faculties = useMemo(() => {
    const s = new Set(groups.map((g) => g.facultyName).filter(Boolean) as string[]);
    return Array.from(s).sort((a, b) => a.localeCompare(b, "th", { sensitivity: "base" }));
  }, [groups]);

  const programNames = useMemo(() => {
    const s = new Set(
      groups.filter((g) => !selectedFaculty || g.facultyName === selectedFaculty).map((g) => g.programName).filter(Boolean) as string[]
    );
    return Array.from(s).sort((a, b) => a.localeCompare(b, "th", { sensitivity: "base" }));
  }, [groups, selectedFaculty]);

  const subProgramNames = useMemo(() => {
    const s = new Set(
      groups
        .filter((g) => (!selectedFaculty || g.facultyName === selectedFaculty) && (!selectedProgramName || g.programName === selectedProgramName))
        .map((g) => g.subProgramName)
        .filter(Boolean) as string[]
    );
    return Array.from(s).sort((a, b) => a.localeCompare(b, "th", { sensitivity: "base" }));
  }, [groups, selectedFaculty, selectedProgramName]);

  const groupsByCascade = useMemo(() => {
    return groups.filter((g) => {
      if (selectedFaculty && g.facultyName !== selectedFaculty) return false;
      if (selectedProgramName && g.programName !== selectedProgramName) return false;
      if (selectedSubProgramName && g.subProgramName !== selectedSubProgramName) return false;
      return true;
    });
  }, [groups, selectedFaculty, selectedProgramName, selectedSubProgramName]);

  const roomOptions = useMemo(() => {
    return groups
      .filter((g) => {
        if (selectedFaculty && g.facultyName !== selectedFaculty) return false;
        if (selectedProgramName && g.programName !== selectedProgramName) return false;
        if (selectedSubProgramName && g.subProgramName !== selectedSubProgramName) return false;
        if (selectedTerm && String(g.term ?? "") !== selectedTerm) return false;
        if (selectedYear && Number(g.year ?? 0) !== selectedYear) return false;
        return true;
      })
      .sort((a, b) =>
        `${a.class ?? ""}|${a.groupName ?? ""}`.localeCompare(`${b.class ?? ""}|${b.groupName ?? ""}`, "th", {
          numeric: true,
          sensitivity: "base",
        })
      )
      .map((g) => ({
        value: String(g.id),
        label: `${g.class ?? ""} ${g.groupName ?? ""} (เทอม ${g.term ?? "-"} ปี ${g.year ?? "-"})`,
      }));
  }, [groups, selectedFaculty, selectedProgramName, selectedSubProgramName, selectedTerm, selectedYear]);

  const noRoomsForTermYear = useMemo(
    () => !!selectedTerm && !!selectedYear && roomOptions.length === 0,
    [selectedTerm, selectedYear, roomOptions]
  );

  const handleChange = (field: keyof GetStudentDetailResponse, value: string) => {
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

  const onSelectTerm = (val: string) => {
    setSelectedTerm(val);
    setSelectedYear(0);
    setSelectedGroupId(null);
  };
  const onSelectYear = (val: string) => {
    const y = Number(val) || 0;
    setSelectedYear(y);
    setSelectedGroupId(null);
  };

  const handleSave = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    if (!formData) return;
    if (!formData.prefix) {
      toast.error("กรุณาเลือกคำนำหน้า");
      setIsSubmitting(false);
      return;
    }
    if (!formData.firstName?.trim() || !formData.lastName?.trim()) {
      toast.error("กรุณากรอกชื่อและนามสกุล");
      setIsSubmitting(false);
      return;
    }
    if (!formData.birthDate) {
      toast.error("กรุณาเลือกวันเกิด");
      setIsSubmitting(false);
      return;
    }
    if (!/^\d+$/.test(String(formData.studentCode || ""))) {
      toast.error("รหัสนักเรียนต้องเป็นตัวเลขเท่านั้น");
      setIsSubmitting(false);
      return;
    }
    if (!selectedGroupId) {
      toast.error("กรุณาเลือกห้อง");
      setIsSubmitting(false);
      return;
    }
    const chosenGroup = groups.find((g) => g.id === selectedGroupId);
    if (!chosenGroup) {
      toast.error("ไม่พบข้อมูลห้องที่เลือก");
      setIsSubmitting(false);
      return;
    }
    const studentIdNum =
      Number((formData as any)?.studentId) ||
      Number((formData as any)?.id) ||
      Number((formData as any)?.userId);
    if (!studentIdNum) {
      toast.error("ไม่พบรหัสนักเรียน (studentId)");
      setIsSubmitting(false);
      return;
    }
    const enrollYearRaw = (formData as any)?.enrollYear ?? (formData as any)?.year ?? new Date().getFullYear();
    const currentLevelRaw = (formData as any)?.currentLevel ?? (formData as any)?.level ?? chosenGroup?.level ?? 1;
    const graduateYearRaw = (formData as any)?.graduateYear ?? 0;
    const enrollYear = Number(enrollYearRaw);
    const currentLevel = Number(currentLevelRaw);
    const graduateYear = Number(graduateYearRaw);
    if ([enrollYear, currentLevel, graduateYear].some((n) => Number.isNaN(n))) {
      toast.error("รูปแบบตัวเลขของปี/ชั้นปีไม่ถูกต้อง");
      setIsSubmitting(false);
      return;
    }
    const programId = Number((formData as any)?.programId) || Number(chosenGroup?.programId);
    if (!programId) {
      toast.error("ไม่พบ Program ของห้องที่เลือก");
      setIsSubmitting(false);
      return;
    }
    const isActive = typeof (formData as any)?.isActive === "boolean" ? (formData as any).isActive : true;
    const statusCandidate = String((formData as any)?.status ?? "");
    const status = educationOptions.includes(statusCandidate)
      ? statusCandidate
      : "กำลังศึกษา";
    const birth = new Date(formData.birthDate as string);
    if (isNaN(birth.getTime())) {
      toast.error("รูปแบบวันเกิดไม่ถูกต้อง");
      setIsSubmitting(false);
      return;
    }
    const payload: UpdateStudentUserRequest = {
      studentId: studentIdNum,
      prefix: formData.prefix ?? "",
      firstName: formData.firstName ?? "",
      lastName: formData.lastName ?? "",
      gender: formData.gender ?? "",
      studentGroupId: Number(selectedGroupId),
      studentCode: formData.studentCode ?? "",
      birthDate: toISODate(formData.birthDate),
      enrollYear,
      currentLevel,
      graduateYear,
      nationality:formData.nationality ?? "",
      citizenId: formData.citizenId ?? "",
      phoneNumber: formData.phoneNumber ?? "",
      programId,
      isActive,
      status,
    };
    try {
      setSaving(true);
      const res = await UpdateStudentUser(payload);
      if (res) {
        toast.success("บันทึกข้อมูลเรียบร้อย");
        const found = groups.find((g) => g.id === selectedGroupId);
        setFormData((prev) =>
          prev
            ? {
              ...prev,
              class: found?.class ?? prev.class,
              groupName: found?.groupName ?? prev.groupName,
              prefix: payload.prefix,
              firstName: payload.firstName,
              lastName: payload.lastName,
              gender: payload.gender,
              studentCode: payload.studentCode,
              birthDate: toISODate(formData.birthDate),
              enrollYear: payload.enrollYear,
              currentLevel: payload.currentLevel,
              graduateYear: payload.graduateYear,
              programId: payload.programId,
              isActive: payload.isActive,
              status: payload.status,
              studentGroupId: payload.studentGroupId,
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
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setFormData(originalData);
    if (originalData) {
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

  return (
    <div className="w-full p-10">
      <div className="flex items-center justify-between mb-6">
        <div className="flex py-3 px-10 justify-start">
          <h1 className="px-8 py-2 rounded-3xl flex gap-2 items-center text-xl w-fit border border-gray-100 shadow-md text-blue-700 bg-white">
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
                disabled={saving || isSubmitting}
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

      <div className="grid grid-cols-2 gap-4 bg-white shadow-md rounded-lg p-6">
        <ReadWrite label="ชื่อผู้ใช้ของนักเรียน" value={formData.username} editable={false} />
        <SelectRW
          label="คำนำหน้า"
          value={formData.prefix ?? ""}
          editable={isEditing}
          options={["นาย", "นาง", "นางสาว"]}
          onChange={(v) => handleChange("prefix", v)}
        />
        <ReadWrite label="ชื่อจริง" value={formData.firstName} editable={isEditing} onChange={(v) => handleChange("firstName", v)} />
        <ReadWrite label="นามสกุล" value={formData.lastName} editable={isEditing} onChange={(v) => handleChange("lastName", v)} />
        <SelectRW label="เพศ" value={formData.gender ?? ""} editable={isEditing} options={["ชาย", "หญิง"]} onChange={(v) => handleChange("gender", v)} />
        <DateRW label="วันเกิด" value={formData.birthDate ?? ""} editable={isEditing} onChange={(v) => handleChange("birthDate", toISODate(v))} />
        <ReadWrite
          label="รหัสนักเรียน"
          value={formData.studentCode}
          editable={isEditing}
          onChange={(v) => (/^\d*$/.test(v) ? handleChange("studentCode", v) : null)}
          placeholder="ตัวเลขเท่านั้น"
        />
        <SelectRW
          label="คณะ"
          value={selectedFaculty}
          editable={isEditing}
          options={[
            { value: "", label: "— เลือกคณะ —" },
            ...faculties.map((f) => ({ value: f, label: f })),
          ]}
          optionMode="object"
          onChange={onSelectFaculty}
          disabled={!!sourcesError || faculties.length === 0}
        />

        <SelectRW
          label="สาขา"
          value={selectedProgramName}
          editable={isEditing}
          options={[
            { value: "", label: "— เลือกสาขา —" },
            ...programNames.map((p) => ({ value: p, label: p })),
          ]}
          optionMode="object"
          onChange={onSelectProgramName}
          disabled={!selectedFaculty}
        />

        <SelectRW
          label="แขนง/สาขาย่อย"
          value={selectedSubProgramName}
          editable={isEditing}
          options={[
            { value: "", label: "— เลือกแขนง —" },
            ...subProgramNames.map((s) => ({ value: s, label: s })),
          ]}
          optionMode="object"
          onChange={onSelectSubProgramName}
          disabled={!selectedProgramName}
        />
        <SelectRW
          label="เทอม"
          value={selectedTerm}
          editable={isEditing}
          options={[
            { value: "1", label: "1" },
            { value: "2", label: "2" },
            { value: "s1", label: "ฤดูร้อน1" },
            { value: "s2", label: "ฤดูร้อน2" },
          ]}
          optionMode="object"
          onChange={onSelectTerm}
          disabled={!selectedSubProgramName}
        />
        <SelectRW
          label="ปีการศึกษา (พ.ศ.)"
          value={selectedYear ? String(selectedYear) : ""}
          editable={isEditing}
          options={[
            { value: "", label: "— กรุณาเลือก —" },
            ...Array.from({ length: 6 }, (_, i) => {
              const y = String(currentBEYear + 1 - i);
              return { value: y, label: y };
            }),
          ]}
          optionMode="object"
          onChange={onSelectYear}
          disabled={!selectedSubProgramName || !selectedTerm}
        />
        <div>
          <SelectRW
            label="ห้อง"
            value={String(selectedGroupId ?? "")}
            editable={isEditing}
            onChange={(v) => setSelectedGroupId(v ? Number(v) : null)}
            options={[
              { value: "", label: "— เลือกห้อง —" },
              ...roomOptions,
            ]}
            optionMode="object"
            disabled={
              !selectedSubProgramName ||
              !selectedTerm ||
              !selectedYear ||
              noRoomsForTermYear
            }
          />
          {noRoomsForTermYear && (
            <p className="text-xs text-red-600 mt-1">
              ไม่มีห้องในเทอม/ปีการศึกษาดังกล่าว
            </p>
          )}
        </div>
        <SelectRW
          label="สถานะนักเรียน"
          value={(formData as any)?.status ?? ""}
          editable={isEditing}
          options={[
            { value: "", label: "— เลือกสถานะนักเรียน —" },
            ...educationOptions.map((s) => ({ value: s, label: s })),
          ]}
          optionMode="object"
          onChange={(v) => handleChange("status" as keyof GetStudentDetailResponse, v)}
        />

        <ReadWrite
          label="รหัสบัตรประชาชน"
          value={formData.citizenId}
          editable={isEditing}
          onChange={(v) => (/^\d*$/.test(v) && v.length <= 13 ? handleChange("citizenId", v) : null)}
        />
        <ReadWrite
          label="เบอร์โทร"
          value={formData.phoneNumber}
          editable={isEditing}
          onChange={(v) => (/^\d*$/.test(v) && v.length <= 10 ? handleChange("phoneNumber", v) : null)}
        />
        <ReadWrite label="สัญชาติ" value={formData.nationality} editable={isEditing} onChange={(v) => handleChange("nationality", v)} />
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
      {openDeletePopup && userId && <DeleteUserPopup userId={String(userId)} onClose={() => setOpenDeletePopup(false)} />}
    </div>
  );
}

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
        <p className="w-full border px-3 py-2 rounded">{value && String(value).trim() !== "" ? String(value) : "—"}</p>
      </div>
    );
  }
  return (
    <div>
      <label className="text-sm text-gray-500">{label}</label>
      <input type="text" value={value ?? ""} onChange={(e) => onChange?.(e.target.value)} placeholder={placeholder} className="w-full border px-3 py-2 rounded" />
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
      <input type="date" value={value ?? ""} onChange={(e) => onChange?.(e.target.value)} className="w-full border px-3 py-2 rounded" lang="th-TH" />
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
  optionMode?: "string" | "object";
}) {
  if (!editable) {
    let display = "—";
    if (value && String(value).trim() !== "") {
      if (optionMode === "object" && Array.isArray(options)) {
        const found = (options as { value: string; label: string }[]).find((o) => o.value === String(value));
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
        className={cx("w-full border px-3 py-2 rounded", disabled && "bg-gray-100 text-gray-400 cursor-not-allowed")}
        disabled={disabled}
      >
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
