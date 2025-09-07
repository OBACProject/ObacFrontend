"use client";

import { UpdateStudentGroupDetail } from "@/api/studentGroup/route";
import {
  StudentGroupItem,
  UpdateStudentGroupRequest,
} from "@/dto/studentGroupItem";
import { useState } from "react";
import { toast } from "react-toastify";

type EditGroupPopupProps = {
  onClosePopUp: (value: boolean) => void;
  payload: StudentGroupItem;
};

export const EditGroupPopup = ({
  onClosePopUp,
  payload,
}: EditGroupPopupProps) => {
  const [section, setSection] = useState<string>(payload.section ?? "เช้า");
  // const [facultyName, setFacultyName] = useState<string>(
  //   payload.facultyName ?? ""
  // );
  // const [programName, setProgramName] = useState<string>(
  //   payload.programName ?? ""
  // );
  // const [subProgramName, setSubProgramName] = useState<string>(
  //   payload.subProgramName ?? ""
  // );

  const [saving, setSaving] = useState(false);

  const onUpdate = async () => {
    const req: UpdateStudentGroupRequest = {
      id: payload.id,
      groupName: payload.groupName,
      class: payload.class,
      groupCode: payload.groupCode,
      level: payload.level,
      programId: payload.programId,
      isPublish: payload.isPublish,
      isComplete: payload.isComplete,
      isActive: payload.isActive,
      year: payload.year,
      term: payload.term,
      section,
    };

    try {
      setSaving(true);
      const ok = await UpdateStudentGroupDetail(req);
      if (!ok) throw new Error("อัปเดตไม่สำเร็จ");
      toast.success("อัปเดตข้อมูลกลุ่มเรียนเรียบร้อย");
      onClosePopUp(false);
      setTimeout(() => {
        window.location.reload()
      }, 500);
    } catch (err: any) {
      const msg =
        err?.response?.data?.responseMessage ||
        err?.response?.data?.title ||
        err?.message ||
        "เกิดข้อผิดพลาดจากเซิร์ฟเวอร์";
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="fixed duration-1000 animate-appearance inset-0 flex items-center justify-center bg-gray-700 bg-opacity-45"
      onClick={() => onClosePopUp(false)}
    >
      <div
        className="bg-white rounded-md z-50 shadow-lg shadow-gray-500 py-5  grid px-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="font-prompt w-full text-xl flex justify-center items-center">
          แก้ไขข้อมูลห้อง
        </div>

        <div className="grid gap-3 py-4">
          <div className="w-full text-base  flex items-center gap-4">
            <div className="flex items-center gap-3">
              ห้อง{" "}
              <p className="px-3 py-1 rounded-md bg-slate-200">
                {payload.class}.{payload.groupName}
              </p>
            </div>
            <div className="flex items-center gap-3">
              รหัสห้อง
              <p className="px-3 py-1 rounded-md bg-slate-200">
                {payload.groupCode}
              </p>
            </div>
          </div>
          <div className="w-full text-base  flex items-center gap-4">
            <p>หลักสูตร</p>
            <input
              className="px-3 py-1 border cursor-not-allowed border-gray-300 rounded-md"
              type="text"
              disabled
              defaultValue={payload.facultyName}
            />
          </div>
          <div className="w-full text-base  flex items-center gap-4">
            <p>สาขา</p>
            <input
              className="px-3 py-1 border cursor-not-allowed border-gray-300 rounded-md"
              type="text"
              disabled
              defaultValue={payload.programName}
            />
          </div>
          <div className="w-full text-base  flex items-center gap-4">
            <p>สาขาย่อย</p>
            <input
              className="px-3 py-1 border cursor-not-allowed border-gray-300 rounded-md"
              type="text"
              disabled
              defaultValue={payload.subProgramName}
            />
          </div>
          <div className="w-full text-base  flex items-center gap-4">
            <div className="flex items-center gap-3">
              เทอม
              <p className="px-3 py-1 rounded-md bg-slate-200">
                {payload.term}
              </p>
            </div>
            <div className="flex items-center gap-3">
              ปีการศึกษา
              <p className="px-3 py-1 rounded-md bg-slate-200">
                {payload.year}
              </p>
            </div>
          </div>
          <div className="w-full text-base flex items-center gap-4">
            <p>รอบ</p>
            <select
              className="border border-gray-300 rounded-md px-3 py-1"
              value={section}
              onChange={(e) => setSection(e.target.value)}
              disabled={saving}
            >
              <option value="เช้า">เช้า</option>
              <option value="บ่าย">บ่าย</option>
            </select>
          </div>
        </div>
        <div className="flex justify-center items-center pt-3  gap-4">
          <button
            onClick={() => onClosePopUp(false)}
            className="px-4 py-1 rounded-md bg-gray-400 text-white hover:bg-gray-600"
          >
            ยกเลิก
          </button>
          <button
            onClick={onUpdate}
            className="px-4 py-1 rounded-md bg-blue-500 text-white hover:bg-blue-600"
          >
            บันทึก
          </button>
        </div>
      </div>
    </div>
  );
};
