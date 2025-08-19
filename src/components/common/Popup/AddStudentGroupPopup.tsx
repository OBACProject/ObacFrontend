"use client";

import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { CreateStudentGroup } from "@/api/studentGroup/route";
import type { CreateStudentGroupRequest } from "@/dto/studentGroupItem";
import { GetAllPrograms } from "@/api/program/route";
import type { GetAllProgramsResponse } from "@/dto/programDto";

type Props = {
    onClosePopUp: (val: boolean) => void;
};

function ProgramBreadcrumb({
    faculty,
    program,
    subProgram,
}: {
    faculty?: string;
    program?: string;
    subProgram?: string;
}) {
    if (!faculty && !program && !subProgram) return null;
    return (
        <div className="text-sm text-gray-600 bg-gray-50 border rounded px-3 py-2">
            เลือกแล้ว: <span className="font-medium">{faculty || "-"}{program ? ` › ${program}` : ""}{subProgram ? ` › ${subProgram}` : ""}</span>
        </div>
    );
}

export default function AddStudentGroupPopup({ onClosePopUp }: Props) {
    const [groupClass, setGroupClass] = useState<"ปวช" | "ปวส" | "">("");
    const [level, setLevel] = useState<1 | 2 | 3 | "">("");
    const [groupName, setGroupName] = useState("");
    const [groupCode, setGroupCode] = useState("");
    const [year, setYear] = useState<number | "">("");
    const [term, setTerm] = useState<"1" | "2">("1");

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
            } catch {
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
        const found = programRows.find(
            (r) =>
                r.facultyName === selectedFaculty &&
                r.programName === selectedProgramName &&
                r.subProgramName === val
        );
        setResolvedProgramId(found ? found.programId : null);
    };

    useEffect(() => {
        if (level === "" || !level) return;
        if (!groupName.startsWith(`${level}/`)) {
            const stripped = groupName.replace(/^\d\//, "");
            setGroupName(`${level}/${stripped}`);
        }
    }, [level]); 

    const onChangeGroupName = (val: string) => {
        if (level) {
            const withoutAnyPrefix = val.replace(/^\d\//, "");
            setGroupName(`${level}/${withoutAnyPrefix}`);
        } else {
            setGroupName(val);
        }
    };

    const validate = () => {
        if (!groupClass) {
            toast.error("กรุณาเลือกชั้นเรียน (ปวช/ปวส)");
            return false;
        }
        if (level === "" || ![1, 2, 3].includes(Number(level) as 1 | 2 | 3)) {
            toast.error("กรุณาเลือกระดับ (1/2/3)");
            return false;
        }
        if (!groupName.trim()) {
            toast.error("กรุณาระบุชื่อห้อง (เช่น 1/1, 2/3)");
            return false;
        }
        if (!groupCode.trim()) {
            toast.error("กรุณารหัสกลุ่ม (Group Code)");
            return false;
        }
        if (year === "" || isNaN(Number(year))) {
            toast.error("กรุณาระบุปีการศึกษา (ตัวเลข)");
            return false;
        }
        if (!term) {
            toast.error("กรุณาเลือกเทอม");
            return false;
        }
        if (!selectedFaculty || !selectedProgramName || !selectedSubProgramName || !resolvedProgramId) {
            toast.error("กรุณาเลือก คณะ → สาขา → แขนง ให้ครบ");
            return false;
        }
        return true;
    };

    const handleSubmit = async () => {
        if (!validate()) return;
        const payload: CreateStudentGroupRequest = {
            groupName: groupName.trim(),
            class: groupClass,
            groupCode: groupCode.trim(),
            level: Number(level),
            programId: Number(resolvedProgramId),
            isPublish: false,
            isComplete: false,
            isActive: true,
            year: Number(year),
            term,
        };
        try {
            const ok = await CreateStudentGroup(payload);
            if (ok) {
                toast.success("สร้างกลุ่มเรียนสำเร็จ");
                onClosePopUp(true);
            } else {
                toast.error("สร้างกลุ่มเรียนไม่สำเร็จ");
            }
        } catch (err: any) {
            const modelErrors = err?.response?.data?.errors;
            if (modelErrors && typeof modelErrors === "object") {
                const firstKey = Object.keys(modelErrors)[0];
                const firstMsg = Array.isArray(modelErrors[firstKey]) ? modelErrors[firstKey][0] : String(modelErrors[firstKey]);
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
            <div className="bg-white rounded-2xl shadow-xl p-7 w-[820px] space-y-6 max-h-[92vh] overflow-y-auto">
                <h2 className="text-xl font-bold text-blue-700">เพิ่มกลุ่มเรียน</h2>

                <div className="space-y-5">
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label className="text-sm">ชั้นเรียน</label>
                            <select
                                value={groupClass}
                                onChange={(e) => setGroupClass(e.target.value as "ปวช" | "ปวส" | "")}
                                className="w-full border px-3 py-2 rounded"
                            >
                                <option value="">— เลือกชั้นเรียน —</option>
                                <option value="ปวช">ปวช</option>
                                <option value="ปวส">ปวส</option>
                            </select>
                        </div>

                        <div>
                            <label className="text-sm">ระดับ (Level)</label>
                            <select
                                value={level}
                                onChange={(e) =>
                                    setLevel(e.target.value === "" ? "" : (Number(e.target.value) as 1 | 2 | 3))
                                }
                                className="w-full border px-3 py-2 rounded"
                            >
                                <option value="">— เลือกระดับ —</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </select>
                            <p className="text-xs text-gray-500 mt-1">
                                * เมื่อเลือกระดับแล้ว ระบบจะบังคับให้ชื่อห้องขึ้นต้นด้วย <b>{level || "x"}/</b>
                            </p>
                        </div>

                        <div>
                            <label className="text-sm">ห้อง (เช่น 1/1, 2/3)</label>
                            <input
                                type="text"
                                value={groupName}
                                onChange={(e) => onChangeGroupName(e.target.value)}
                                className="w-full border px-3 py-2 rounded"
                                placeholder={level ? `${level}/1` : "เช่น 1/1"}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-1.5">
                            <label className="text-sm">รหัสกลุ่ม (Group Code)</label>
                            <input
                                type="text"
                                value={groupCode}
                                onChange={(e) => setGroupCode(e.target.value)}
                                className="w-full border px-3 py-2 rounded"
                                placeholder="รหัสภายใน เช่น VEC-101"
                            />
                        </div>

                        <div>
                            <label className="text-sm">เทอม (Term)</label>
                            <select
                                value={term}
                                onChange={(e) => setTerm(e.target.value as "1" | "2")}
                                className="w-full border px-3 py-2 rounded"
                            >
                                <option value="1">1</option>
                                <option value="2">2</option>
                            </select>
                        </div>

                        <div>
                            <label className="text-sm">ปีการศึกษา (Year)</label>
                            <input
                                type="number"
                                value={year}
                                onChange={(e) =>
                                    setYear(e.target.value === "" ? "" : Number(e.target.value))
                                }
                                className="w-full border px-3 py-2 rounded"
                                placeholder="เช่น 2567"
                            />
                        </div>
                    </div>

                </div>

                <div className="h-px bg-gray-200" />

                <div className="space-y-4">
                    <h3 className="text-base font-semibold text-gray-800">เลือกแผนก / สาขา</h3>
                    <div className="grid grid-cols-3 gap-4">
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

                    <ProgramBreadcrumb
                        faculty={selectedFaculty}
                        program={selectedProgramName}
                        subProgram={selectedSubProgramName}
                    />
                </div>

                <div className="flex justify-end gap-3 pt-1">
                    <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded" onClick={() => onClosePopUp(false)}>
                        ยกเลิก
                    </button>
                    <button
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
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
